import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { promisify } from 'node:util';
import { escapeHtml, importReport, renderPage } from './visual-report.mjs';

const exec = promisify(execFile);
const marker = '<!-- atlas-visual-diff -->';

export function selectPullRequestRun(runs, pullRequest) {
	return runs
		.filter(
			run =>
				run.event === 'pull_request' &&
				run.head_sha === pullRequest.head.sha &&
				run.head_repository?.full_name === pullRequest.head.repo?.full_name &&
				(run.pull_requests.length === 0 ||
					run.pull_requests.some(pr => pr.number === pullRequest.number))
		)
		.sort((a, b) => b.id - a.id)[0];
}

export function renderReportIndex(reports) {
	const items = reports
		.map(report => {
			const name = `#${report.number}: ${escapeHtml(report.title)}`;
			return `<li>${report.status === 'ready' ? `<a href="pr-${report.number}/">${name}</a>` : name}
				&mdash; ${report.status} &middot; <code>${escapeHtml(report.headSha.slice(0, 7))}</code></li>`;
		})
		.join('');
	return renderPage(
		'Atlas PR visual reports',
		`<h1>Atlas PR visual reports</h1>
		<p>Reports compare each pull request's base with its proposed merge. Visual differences are advisory, not automatic failures.</p>
		<p><a href="../">Atlas documentation</a></p>
		${items ? `<ul>${items}</ul>` : '<p>No open pull requests.</p>'}
		<p>Only reports for the current PR head are linked. Pending, failed, or expired reports are not shown as up to date. Reports are removed when a PR closes.</p>`
	);
}

function githubClient(repository, token) {
	const base = process.env.GITHUB_API_URL || 'https://api.github.com';
	async function api(route, method = 'GET', body) {
		const response = await fetch(`${base}/repos/${repository}${route ? '/' + route : ''}`, {
			method,
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/vnd.github+json',
				'X-GitHub-Api-Version': '2022-11-28',
				...(body ? { 'Content-Type': 'application/json' } : {})
			},
			...(body ? { body: JSON.stringify(body) } : {})
		});
		if (!response.ok) {
			throw new Error(`GitHub ${method} ${route}: ${response.status}`);
		}
		return response.status === 204 ? undefined : response.json();
	}
	async function list(route, key) {
		const items = [];
		for (let page = 1; ; page++) {
			const result = await api(
				`${route}${route.includes('?') ? '&' : '?'}per_page=100&page=${page}`
			);
			const batch = key ? result[key] : result;
			items.push(...batch);
			if (batch.length < 100) return items;
		}
	}
	return { api, list };
}

async function downloadArtifact(repository, runId, name, destination) {
	await mkdir(destination, { recursive: true });
	await exec('gh', [
		'run',
		'download',
		String(runId),
		'--repo',
		repository,
		'--name',
		name,
		'--dir',
		destination
	]);
}

export async function assemblePages(
	{ repository, token, output, linksFile },
	{ client = githubClient(repository, token), download = downloadArtifact } = {}
) {
	const { api, list } = client;
	const repositoryInfo = await api('');
	const branch = repositoryInfo.default_branch;
	const buildRuns = await Promise.all(
		['push', 'workflow_dispatch'].map(async event => {
			const result = await api(
				`actions/workflows/main.yml/runs?branch=${encodeURIComponent(
					branch
				)}&event=${event}&status=success&per_page=1`
			);
			return result.workflow_runs;
		})
	);
	const build = buildRuns
		.flat()
		.sort((a, b) => b.id - a.id)
		.find(
			run =>
				run.head_branch === branch &&
				['push', 'workflow_dispatch'].includes(run.event) &&
				run.head_repository?.full_name === repository
		);
	if (!build) throw new Error('No successful default-branch documentation build found');
	const buildArtifacts = await list(`actions/runs/${build.id}/artifacts`, 'artifacts');
	if (!buildArtifacts.some(artifact => artifact.name === 'atlas-site' && !artifact.expired)) {
		throw new Error('The latest documentation build has no atlas-site artifact; rerun it');
	}
	await mkdir(output);
	await download(repository, build.id, 'atlas-site', output);
	const pullRequests = await list(`pulls?state=open&base=${encodeURIComponent(branch)}`);
	const reports = [];
	for (const pr of pullRequests) {
		const report = {
			number: pr.number,
			title: pr.title,
			headSha: pr.head.sha,
			status: 'pending'
		};
		const runs = await list(
			`actions/workflows/visual-diff.yml/runs?event=pull_request&head_sha=${pr.head.sha}`,
			'workflow_runs'
		);
		const run = selectPullRequestRun(runs, pr);
		if (run?.status === 'completed') {
			report.status = run.conclusion === 'success' ? 'expired' : 'failed';
			if (run.conclusion === 'success') {
				const artifacts = await list(`actions/runs/${run.id}/artifacts`, 'artifacts');
				const artifact = artifacts.find(
					item => item.name === 'visual-diff-report' && !item.expired
				);
				if (artifact) {
					const temporary = await mkdtemp(path.join(os.tmpdir(), 'atlas-visual-report-'));
					const destination = path.join(output, 'visual-diff', `pr-${pr.number}`);
					try {
						await download(repository, run.id, artifact.name, temporary);
						report.summary = await importReport(temporary, destination, { number: pr.number });
						report.status = 'ready';
					} catch (error) {
						report.status = 'invalid';
						await rm(destination, { recursive: true, force: true });
						console.warn(`Skipping invalid report for PR #${pr.number}: ${error.message}`);
					} finally {
						await rm(temporary, { recursive: true, force: true });
					}
				}
			}
		}
		if (report.status !== 'ready') {
			const directory = path.join(output, 'visual-diff', `pr-${pr.number}`);
			await mkdir(directory, { recursive: true });
			await writeFile(
				path.join(directory, 'index.html'),
				renderPage(
					`Visual diff: PR #${pr.number}`,
					`<h1>Visual diff: PR #${pr.number}</h1>
					<p>Report status: <strong>${report.status}</strong> for head <code>${escapeHtml(
						report.headSha
					)}</code>.</p>
					<p>No current comparison is available. Check the PR's Visual diff workflow and rerun it if needed.</p>
					<p><a href="../">All visual reports</a></p>`
				)
			);
		}
		reports.push(report);
	}
	const reportDirectory = path.join(output, 'visual-diff');
	await mkdir(reportDirectory, { recursive: true });
	await writeFile(path.join(reportDirectory, 'index.html'), renderReportIndex(reports));
	await writeFile(linksFile, JSON.stringify(reports));
	console.log(`Assembled documentation build ${build.id} and ${reports.length} PR statuses`);
}

export async function commentOnReports({ repository, token, linksFile, pagesUrl }) {
	const { api, list } = githubClient(repository, token);
	const reports = JSON.parse(await readFile(linksFile, 'utf8'));
	for (const report of reports.filter(item => item.status === 'ready')) {
		const pr = await api(`pulls/${report.number}`);
		if (pr.state !== 'open' || pr.head.sha !== report.headSha) continue;
		const { changed, added, removed, unchanged } = report.summary;
		const url = `${pagesUrl.replace(/\/?$/, '/')}visual-diff/pr-${report.number}/`;
		const body = `${marker}
### Visual comparison

[View the visual report](${url})

**${changed} changed · ${added} added · ${removed} removed · ${unchanged} unchanged** captures.

Head: \`${report.headSha}\`. Visual changes are advisory; check whether they are intended. This URL updates on subsequent PR runs.`;
		const comments = await list(`issues/${report.number}/comments`);
		const existing = comments.find(
			comment => comment.user.login === 'github-actions[bot]' && comment.body.startsWith(marker)
		);
		if (existing?.body === body) continue;
		if (existing) {
			await api(`issues/comments/${existing.id}`, 'PATCH', { body });
		} else {
			await api(`issues/${report.number}/comments`, 'POST', { body });
		}
	}
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	const options = {
		repository: process.env.GITHUB_REPOSITORY,
		token: process.env.GH_TOKEN,
		output: process.env.PAGES_OUTPUT,
		linksFile: process.env.REPORT_LINKS_FILE,
		pagesUrl: process.env.PAGES_URL
	};
	if (!options.repository || !options.token || !options.linksFile) {
		throw new Error('GITHUB_REPOSITORY, GH_TOKEN, and REPORT_LINKS_FILE are required');
	}
	if (process.argv.includes('--comment')) {
		if (!options.pagesUrl) throw new Error('PAGES_URL is required');
		await commentOnReports(options);
	} else {
		if (!options.output) throw new Error('PAGES_OUTPUT is required');
		await assemblePages(options);
	}
}
