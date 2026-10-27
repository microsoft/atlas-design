import { copyFile, lstat, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const statuses = ['changed', 'added', 'removed', 'unchanged'];
const imageKeys = ['before', 'after', 'diff'];
const pngSignature = Buffer.from('89504e470d0a1a0a', 'hex');

export function escapeHtml(value) {
	return String(value).replace(/[&<>"']/g, character => {
		return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
	});
}

export function validateManifest(manifest) {
	if (
		manifest?.version !== 1 ||
		!Array.isArray(manifest.entries) ||
		manifest.entries.length === 0 ||
		manifest.entries.length > 10000
	) {
		throw new Error('Invalid visual report manifest');
	}
	for (const key of ['baseSha', 'mergeSha']) {
		if (manifest[key] !== undefined && !/^[a-f0-9]{40}$/.test(manifest[key])) {
			throw new Error('Invalid visual report revision');
		}
	}
	const ids = new Set();
	for (const entry of manifest.entries) {
		if (
			!/^[a-f0-9]{16}-[a-z-]+-\d+$/.test(entry.id) ||
			ids.has(entry.id) ||
			typeof entry.page !== 'string' ||
			entry.page.length > 300 ||
			!['light', 'dark', 'high-contrast'].includes(entry.theme) ||
			![390, 1280].includes(entry.width) ||
			!statuses.includes(entry.status) ||
			!Number.isSafeInteger(entry.pixels) ||
			entry.pixels < 0
		) {
			throw new Error('Invalid visual report entry');
		}
		ids.add(entry.id);
		const required = {
			changed: imageKeys,
			added: ['after'],
			removed: ['before'],
			unchanged: []
		}[entry.status];
		for (const key of imageKeys) {
			if (
				required.includes(key) ? entry[key] !== `${entry.id}-${key}.png` : entry[key] !== undefined
			) {
				throw new Error('Invalid visual report image');
			}
		}
	}
	return manifest;
}

export function summarize(manifest) {
	return Object.fromEntries(
		statuses.map(status => [
			status,
			manifest.entries.filter(entry => entry.status === status).length
		])
	);
}

export function renderReport(manifest, metadata = {}) {
	validateManifest(manifest);
	const counts = summarize(manifest);
	const changed = manifest.entries.filter(entry => entry.status !== 'unchanged');
	const title = metadata.number ? `Visual diff: PR #${metadata.number}` : 'Atlas visual diff';
	const revisions = metadata.baseSha
		? `<p>Base <code>${escapeHtml(
				metadata.baseSha
		  )}</code> &rarr; proposed merge <code>${escapeHtml(metadata.mergeSha)}</code></p>`
		: '';
	const entries = changed
		.map(entry => {
			const images = imageKeys
				.filter(key => entry[key])
				.map(
					key => `<figure><figcaption>${
						{ before: 'Before', after: 'After', diff: 'Difference' }[key]
					}</figcaption>
					<a href="${entry[key]}"><img loading="lazy" src="${entry[key]}" alt="${key}: ${escapeHtml(
						entry.page
					)}"></a></figure>`
				)
				.join('');
			return `<section id="${entry.id}">
				<h2>${escapeHtml(entry.page)}</h2>
				<p><strong>${entry.status}</strong> &middot; ${entry.theme} &middot; ${
				entry.width
			}px &middot; ${entry.pixels.toLocaleString('en-US')} changed pixels</p>
				<div class="images">${images}</div>
			</section>`;
		})
		.join('\n');
	const navigation = changed
		.map(
			entry =>
				`<li><a href="#${entry.id}">${escapeHtml(entry.page)} &mdash; ${entry.theme}, ${
					entry.width
				}px (${entry.status})</a></li>`
		)
		.join('');
	return renderPage(
		title,
		`${metadata.number ? '<p><a href="../">All visual reports</a></p>' : ''}
		<h1>${escapeHtml(title)}</h1>${revisions}
		<p>${counts.changed} changed, ${counts.added} added, ${counts.removed} removed, ${
			counts.unchanged
		} unchanged captures.</p>
		<p>Visual changes are advisory: review whether each change is intended. Open an image to inspect it at full resolution.</p>
		${
			changed.length
				? `<details><summary>Changed captures</summary><ul>${navigation}</ul></details>${entries}`
				: '<p class="success">No visual differences detected.</p>'
		}`
	);
}

export function renderPage(title, content) {
	return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'">
<title>${escapeHtml(title)}</title>
<style>
:root { color-scheme: light dark; font-family: system-ui, sans-serif; line-height: 1.5; }
body { max-width: 1800px; margin: auto; padding: 1.5rem; }
a { color: light-dark(#005a9e, #75c5ff); }
code { overflow-wrap: anywhere; }
section { margin-block: 2rem; padding-block-start: 1rem; border-block-start: 1px solid #888; }
h2 { overflow-wrap: anywhere; }
.images { display: flex; align-items: flex-start; gap: 1rem; }
figure { flex: 1; min-width: 0; margin: 0; }
figcaption { font-weight: 600; margin-block-end: .5rem; }
img { display: block; width: 100%; border: 1px solid #888; }
li { margin-block: .5rem; }
.success { font-size: 1.25rem; font-weight: 600; }
@media (max-width: 700px) { .images { flex-direction: column; } figure { width: 100%; } }
</style></head><body><main>${content}</main></body></html>`;
}

export async function writeReport(directory, manifest, metadata) {
	await mkdir(directory, { recursive: true });
	await writeFile(
		path.join(directory, 'index.html'),
		renderReport(manifest, {
			baseSha: manifest.baseSha,
			mergeSha: manifest.mergeSha,
			...metadata
		})
	);
}

// Only validated data and PNGs cross from an untrusted PR artifact into the Pages site.
export async function importReport(source, destination, metadata) {
	const manifestPath = path.join(source, 'manifest.json');
	const stat = await lstat(manifestPath);
	if (!stat.isFile() || stat.size > 5 * 1024 * 1024) {
		throw new Error('Invalid visual report manifest file');
	}
	const manifest = validateManifest(JSON.parse(await readFile(manifestPath, 'utf8')));
	await mkdir(destination, { recursive: true });
	for (const entry of manifest.entries) {
		for (const key of imageKeys) {
			if (!entry[key]) continue;
			const imagePath = path.join(source, entry[key]);
			const imageStat = await lstat(imagePath);
			if (!imageStat.isFile() || imageStat.size > 50 * 1024 * 1024) {
				throw new Error('Invalid visual report image file');
			}
			const image = await readFile(imagePath);
			if (!image.subarray(0, 8).equals(pngSignature)) {
				throw new Error('Visual report images must be PNGs');
			}
			await copyFile(imagePath, path.join(destination, entry[key]));
		}
	}
	await writeReport(destination, manifest, metadata);
	return summarize(manifest);
}
