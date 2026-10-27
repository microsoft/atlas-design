import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { mock, test } from 'node:test';
import {
	assemblePages,
	commentOnReports,
	renderReportIndex,
	selectPullRequestRun
} from './publish-visual-diff.mjs';

const repository = 'microsoft/atlas-design';
const sha = 'a'.repeat(40);
const pr = {
	number: 42,
	title: '<script>PR title</script>',
	head: { sha, repo: { full_name: repository } }
};
const run = {
	id: 20,
	event: 'pull_request',
	head_sha: sha,
	head_repository: { full_name: repository },
	pull_requests: [{ number: 42 }],
	status: 'completed',
	conclusion: 'success'
};

test('selects only the latest matching PR run, including failed reruns and fork associations', () => {
	assert.equal(selectPullRequestRun([run, { ...run, id: 21, conclusion: 'failure' }], pr).id, 21);
	assert.equal(selectPullRequestRun([{ ...run, head_sha: 'b'.repeat(40) }], pr), undefined);
	assert.equal(selectPullRequestRun([{ ...run, event: 'workflow_dispatch' }], pr), undefined);
	assert.equal(selectPullRequestRun([{ ...run, pull_requests: [{ number: 99 }] }], pr), undefined);
	const forkPr = { ...pr, head: { sha, repo: { full_name: 'contributor/atlas-design' } } };
	assert.equal(
		selectPullRequestRun([{ ...run, pull_requests: [], head_repository: forkPr.head.repo }], forkPr)
			.id,
		20
	);
});

test('escapes PR titles and never links pending reports as current', () => {
	const html = renderReportIndex([
		{ number: 42, title: '<script>bad()</script>', headSha: sha, status: 'pending' }
	]);
	assert.ok(!html.includes('<script>'));
	assert.ok(!html.includes('href="pr-42/"'));
	assert.ok(html.includes('pending'));
});

test('requests repository metadata without the unsupported trailing slash', async () => {
	const requests = [];
	const fetchMock = mock.method(globalThis, 'fetch', async url => {
		requests.push(url);
		return Response.json(
			url.endsWith(`/repos/${repository}`) ? { default_branch: 'main' } : { workflow_runs: [] }
		);
	});
	try {
		await assert.rejects(
			assemblePages({ repository, token: 'test', output: 'unused', linksFile: 'unused' }),
			/No successful default-branch/
		);
		assert.ok(requests[0].endsWith(`/repos/${repository}`));
	} finally {
		fetchMock.mock.restore();
	}
});

test('assembles documentation and validated open-PR reports without trusting PR HTML', async () => {
	const temporary = await mkdtemp(path.join(os.tmpdir(), 'atlas-publisher-test-'));
	try {
		const output = path.join(temporary, 'site');
		const linksFile = path.join(temporary, 'links.json');
		const client = {
			async api(route) {
				if (route === '') return { default_branch: 'main' };
				return {
					workflow_runs: route.includes('event=push')
						? [
								{
									id: 10,
									event: 'push',
									head_branch: 'main',
									head_repository: { full_name: repository }
								}
						  ]
						: []
				};
			},
			async list(route) {
				if (route === 'actions/runs/10/artifacts') return [{ name: 'atlas-site', expired: false }];
				if (route.startsWith('pulls?')) {
					return [pr, { ...pr, number: 43, head: { ...pr.head, sha: 'b'.repeat(40) } }];
				}
				if (route.startsWith('actions/workflows/visual-diff')) {
					return route.includes('head_sha=' + sha)
						? [run]
						: [{ ...run, id: 21, head_sha: 'b'.repeat(40), pull_requests: [{ number: 43 }] }];
				}
				if (['actions/runs/20/artifacts', 'actions/runs/21/artifacts'].includes(route))
					return [{ name: 'visual-diff-report', expired: false }];
				throw new Error(`Unexpected request: ${route}`);
			}
		};
		const download = async (_repo, runId, name, destination) => {
			await mkdir(destination, { recursive: true });
			if (name === 'atlas-site') {
				await writeFile(path.join(destination, 'index.html'), 'Trusted documentation');
			} else if (runId === 21) {
				await writeFile(path.join(destination, 'manifest.json'), '{"version": 999}');
			} else {
				await writeFile(path.join(destination, 'index.html'), '<script>untrusted()</script>');
				await writeFile(
					path.join(destination, 'manifest.json'),
					JSON.stringify({
						version: 1,
						entries: [
							{
								id: '0123456789abcdef-light-390',
								page: '/components/button.html',
								theme: 'light',
								width: 390,
								status: 'unchanged',
								pixels: 0
							}
						]
					})
				);
			}
		};
		await assemblePages({ repository, token: 'test', output, linksFile }, { client, download });
		assert.equal(await readFile(path.join(output, 'index.html'), 'utf8'), 'Trusted documentation');
		assert.deepEqual((await readdir(path.join(output, 'visual-diff'))).sort(), [
			'index.html',
			'pr-42',
			'pr-43'
		]);
		const report = await readFile(path.join(output, 'visual-diff', 'pr-42', 'index.html'), 'utf8');
		assert.ok(report.includes('No visual differences detected'));
		assert.ok(!report.includes('untrusted'));
		const unavailable = await readFile(
			path.join(output, 'visual-diff', 'pr-43', 'index.html'),
			'utf8'
		);
		assert.ok(unavailable.includes('Report status: <strong>invalid</strong>'));
		const links = JSON.parse(await readFile(linksFile, 'utf8'));
		assert.equal(links[0].status, 'ready');
		assert.equal(links[1].status, 'invalid');
	} finally {
		await rm(temporary, { recursive: true, force: true });
	}
});

test('posts links only after deployment and updates only its own bot comment for the current head', async () => {
	const temporary = await mkdtemp(path.join(os.tmpdir(), 'atlas-comment-test-'));
	const requests = [];
	const fetchMock = mock.method(globalThis, 'fetch', async (url, options) => {
		requests.push({ url, ...options });
		const route = new URL(url).pathname;
		let result;
		if (route.endsWith('/pulls/42')) result = { state: 'open', head: { sha } };
		else if (route.endsWith('/pulls/43')) result = { state: 'open', head: { sha: 'new-head' } };
		else if (route.endsWith('/issues/42/comments')) {
			result = [
				{ id: 1, user: { login: 'human' }, body: '<!-- atlas-visual-diff --> My notes' },
				{
					id: 2,
					user: { login: 'github-actions[bot]' },
					body: '<!-- atlas-visual-diff --> Old link'
				}
			];
		} else if (route.endsWith('/issues/comments/2')) result = {};
		else throw new Error(`Unexpected request: ${url}`);
		return Response.json(result);
	});
	try {
		const linksFile = path.join(temporary, 'links.json');
		const report = {
			number: 42,
			status: 'ready',
			headSha: sha,
			summary: { changed: 1, added: 2, removed: 0, unchanged: 10 }
		};
		await writeFile(linksFile, JSON.stringify([report, { ...report, number: 43 }]));
		await commentOnReports({
			repository,
			token: 'test',
			linksFile,
			pagesUrl: 'https://microsoft.github.io/atlas-design/'
		});
		const writes = requests.filter(request => request.method !== 'GET');
		assert.equal(writes.length, 1);
		assert.ok(writes[0].url.endsWith('/issues/comments/2'));
		assert.equal(writes[0].method, 'PATCH');
		assert.ok(JSON.parse(writes[0].body).body.includes('/visual-diff/pr-42/'));
		assert.ok(
			requests.every(request => !request.url.endsWith('/pulls/42') || request.method === 'GET')
		);
	} finally {
		fetchMock.mock.restore();
		await rm(temporary, { recursive: true, force: true });
	}
});
