import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { PNG } from 'pngjs';
import { compareImages, discoverPages, serveSite, visualDiff } from './visual-diff.mjs';

function image(width, height, color) {
	const png = new PNG({ width, height });
	for (let i = 0; i < png.data.length; i += 4) {
		png.data.set([...color, 255], i);
	}
	return PNG.sync.write(png);
}

test('detects changed pixels and image-size changes, including transparent padding', () => {
	const white = image(4, 4, [255, 255, 255]);
	assert.equal(compareImages(white, white).changed, false);
	const changed = compareImages(white, image(4, 4, [0, 0, 0]));
	assert.equal(changed.changed, true);
	assert.equal(changed.pixels, 16);
	const transparent = size => PNG.sync.write(new PNG({ width: size, height: size }));
	assert.equal(compareImages(transparent(1), transparent(2)).changed, true);
});

test('discovers new nested documentation pages without a manually maintained list', async () => {
	const temporary = await mkdtemp(path.join(os.tmpdir(), 'atlas-discovery-test-'));
	try {
		await mkdir(path.join(temporary, 'components', 'nested'), { recursive: true });
		await writeFile(path.join(temporary, 'index.html'), 'Home');
		await writeFile(path.join(temporary, 'components', 'nested', 'new.html'), 'New');
		await writeFile(path.join(temporary, 'components', 'ignored.txt'), 'Ignored');
		assert.deepEqual(await discoverPages(temporary), [
			'/components/nested/new.html',
			'/index.html'
		]);
		const server = await serveSite(temporary);
		try {
			assert.equal((await fetch(server.origin + '/index.html')).status, 200);
			assert.equal((await fetch(server.origin + '/missing.html')).status, 404);
			assert.equal((await fetch(server.origin + '/..%2f..%2foutside.html')).status, 403);
		} finally {
			await server.close();
		}
	} finally {
		await rm(temporary, { recursive: true, force: true });
	}
});

test('compares real static sites across themes and viewports, including below-fold changes', async () => {
	const temporary = await mkdtemp(path.join(os.tmpdir(), 'atlas-browser-test-'));
	try {
		const before = path.join(temporary, 'before');
		const after = path.join(temporary, 'after');
		for (const directory of [before, after]) {
			await mkdir(path.join(directory, 'components'), { recursive: true });
		}
		const html = (color, initialMax = 340) => `<!doctype html><html><head><style>
			body { margin: 0; } .spacer { height: 1100px; } .example { height: 80px; background: ${color}; }
			html[data-theme="dark"] body { color: white; background: #222; }
			html[data-theme="high-contrast"] body { color: yellow; background: black; }
			</style></head><body><h1>Fixture</h1>
			<input id="slider" type="range" min="240" max="1000" value="600"><output id="output"></output>
			<div class="spacer"></div><div class="example">Example below fold</div>
			<script>window.setTheme = theme => document.documentElement.dataset.theme = theme;
			window.setTheme(new URLSearchParams(location.search).get('theme'));
			const slider = document.getElementById('slider'), output = document.getElementById('output');
			slider.max = '${initialMax}'; slider.max = '340'; output.value = slider.value;
			slider.addEventListener('input', () => output.value = slider.value);
			</script></body></html>`;
		await writeFile(path.join(before, 'index.html'), html('white', 240));
		await writeFile(path.join(after, 'index.html'), html('white', 340));
		await writeFile(path.join(before, 'components', 'changed.html'), html('red'));
		await writeFile(path.join(after, 'components', 'changed.html'), html('blue'));
		await writeFile(path.join(before, 'components', 'removed.html'), html('white'));
		await writeFile(path.join(after, 'components', 'added.html'), html('white'));
		const output = path.join(temporary, 'report');
		const counts = await visualDiff({ before, after, output });
		assert.deepEqual(counts, { changed: 6, added: 6, removed: 6, unchanged: 6 });
		const report = JSON.parse(await readFile(path.join(output, 'manifest.json'), 'utf8'));
		assert.equal(report.entries.length, 24);
		const added = report.entries.filter(entry => entry.status === 'added' && entry.width === 390);
		const themeImages = await Promise.all(
			added.map(entry => readFile(path.join(output, entry.after)))
		);
		assert.ok(compareImages(themeImages[0], themeImages[1]).changed);
		assert.ok(compareImages(themeImages[1], themeImages[2]).changed);
		assert.ok(report.entries.filter(entry => entry.status === 'changed').every(e => e.pixels > 0));
		assert.ok((await readFile(path.join(output, 'index.html'), 'utf8')).includes('Difference'));
	} finally {
		await rm(temporary, { recursive: true, force: true });
	}
});

test('fails on broken site scripts instead of presenting a successful comparison', async () => {
	const temporary = await mkdtemp(path.join(os.tmpdir(), 'atlas-broken-site-test-'));
	try {
		const html = `<!doctype html><html><body><h1>Broken site</h1>
			<script>window.setTheme = () => {}; throw new Error('Broken site initialization');</script>
			</body></html>`;
		await writeFile(path.join(temporary, 'index.html'), html);
		await assert.rejects(
			visualDiff({
				before: temporary,
				after: temporary,
				output: path.join(temporary, 'report'),
				concurrency: 1
			}),
			/Broken site initialization/
		);
		await assert.rejects(readFile(path.join(temporary, 'report', 'manifest.json')), {
			code: 'ENOENT'
		});
	} finally {
		await rm(temporary, { recursive: true, force: true });
	}
});
