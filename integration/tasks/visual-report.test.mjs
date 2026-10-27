import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { importReport, renderReport, summarize, validateManifest } from './visual-report.mjs';

const id = '0123456789abcdef-light-390';

function manifest(status = 'changed') {
	const entry = {
		id,
		page: '/components/button.html',
		theme: 'light',
		width: 390,
		status,
		pixels: 20
	};
	if (['changed', 'removed'].includes(status)) entry.before = `${id}-before.png`;
	if (['changed', 'added'].includes(status)) entry.after = `${id}-after.png`;
	if (status === 'changed') entry.diff = `${id}-diff.png`;
	return { version: 1, entries: [entry] };
}

test('renders before, after, and diff images while escaping PR-supplied labels', () => {
	const data = manifest();
	data.entries[0].page = '<script>alert("PR")</script>';
	const html = renderReport(data, { number: 42 });
	assert.ok(html.includes('Before'));
	assert.ok(html.includes('After'));
	assert.ok(html.includes('Difference'));
	assert.ok(html.includes('&lt;script&gt;'));
	assert.ok(!html.includes('<script>'));
	assert.ok(!html.includes('https://'));
	assert.deepEqual(summarize(data), { changed: 1, added: 0, removed: 0, unchanged: 0 });
});

test('shows no differences only for a valid nonempty unchanged manifest', () => {
	assert.ok(renderReport(manifest('unchanged')).includes('No visual differences detected'));
	assert.throws(() => renderReport({ version: 1, entries: [] }), /Invalid/);
});

test('rejects traversing filenames, duplicate entries, and missing diff images', () => {
	const traversal = manifest();
	traversal.entries[0].before = '../../index.html';
	assert.throws(() => validateManifest(traversal), /image/);
	const duplicate = manifest();
	duplicate.entries.push({ ...duplicate.entries[0] });
	assert.throws(() => validateManifest(duplicate), /entry/);
	const missing = manifest();
	delete missing.entries[0].diff;
	assert.throws(() => validateManifest(missing), /image/);
});

test('imports only referenced PNGs and regenerates HTML instead of copying PR HTML', async () => {
	const temporary = await mkdtemp(path.join(os.tmpdir(), 'atlas-report-test-'));
	try {
		const data = manifest('added');
		await writeFile(path.join(temporary, 'manifest.json'), JSON.stringify(data));
		await writeFile(
			path.join(temporary, data.entries[0].after),
			Buffer.from('89504e470d0a1a0a', 'hex')
		);
		await writeFile(path.join(temporary, 'index.html'), '<script>untrusted()</script>');
		await writeFile(path.join(temporary, 'extra.js'), 'untrusted()');
		const output = path.join(temporary, 'published');
		await importReport(temporary, output, { number: 42 });
		const files = await readdir(output);
		assert.deepEqual(files.sort(), [`${id}-after.png`, 'index.html'].sort());
		const html = await readFile(path.join(output, 'index.html'), 'utf8');
		assert.ok(html.includes('PR #42'));
		assert.ok(!html.includes('untrusted'));
	} finally {
		await rm(temporary, { recursive: true, force: true });
	}
});

test('rejects non-PNG content in an otherwise valid artifact', async () => {
	const temporary = await mkdtemp(path.join(os.tmpdir(), 'atlas-report-test-'));
	try {
		const data = manifest('added');
		await writeFile(path.join(temporary, 'manifest.json'), JSON.stringify(data));
		await writeFile(path.join(temporary, data.entries[0].after), '<svg onload="bad()">');
		await assert.rejects(
			importReport(temporary, path.join(temporary, 'published'), {}),
			/must be PNGs/
		);
	} finally {
		await rm(temporary, { recursive: true, force: true });
	}
});
