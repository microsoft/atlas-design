// Appends explicit `.js` extensions to relative import/export specifiers in the
// compiled output (`dist/**/*.js` and `dist/**/*.d.ts`).
//
// `tsc` copies module specifiers verbatim, so extensionless source like
// `export * from './behaviors/dismiss'` is emitted unchanged. That is valid for
// `moduleResolution: bundler`, but invalid for Node ESM / `moduleResolution:
// nodenext`, which require fully specified relative paths. Adding the extensions
// here keeps the source extensionless (so the existing eslint node resolver and
// the site's source imports keep working) while making the published package
// resolve correctly under both `bundler` and `nodenext`.

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

const KNOWN_EXTENSIONS = ['.js', '.mjs', '.cjs', '.json', '.node'];

// Captures the module specifier in `... from '<spec>'`, `import('<spec>')` and
// side-effect `import '<spec>'` for relative specifiers only.
const SPECIFIER_RE = /(\bfrom\s+|\bimport\s*\(\s*|\bimport\s+)(['"])(\.\.?\/[^'"]*)\2/g;

async function fileExists(path) {
	try {
		await stat(path);
		return true;
	} catch {
		return false;
	}
}

async function rewriteSpecifier(fileDir, specifier) {
	if (KNOWN_EXTENSIONS.some(extension => specifier.endsWith(extension))) {
		return specifier;
	}
	const absolute = resolve(fileDir, specifier);
	if (await fileExists(`${absolute}.js`)) {
		return `${specifier}.js`;
	}
	if (await fileExists(join(absolute, 'index.js'))) {
		return `${specifier}/index.js`;
	}
	console.warn(`[append-js-extensions] Could not resolve "${specifier}" from ${fileDir}`);
	return specifier;
}

async function processFile(filePath) {
	const original = await readFile(filePath, 'utf8');
	const fileDir = dirname(filePath);

	const matches = [];
	for (const match of original.matchAll(SPECIFIER_RE)) {
		matches.push(match);
	}
	if (matches.length === 0) {
		return false;
	}

	let result = '';
	let cursor = 0;
	let changed = false;
	for (const match of matches) {
		const [full, prefix, quote, specifier] = match;
		const rewritten = await rewriteSpecifier(fileDir, specifier);
		if (rewritten === specifier) {
			continue;
		}
		result += original.slice(cursor, match.index) + `${prefix}${quote}${rewritten}${quote}`;
		cursor = match.index + full.length;
		changed = true;
	}
	if (!changed) {
		return false;
	}
	result += original.slice(cursor);
	await writeFile(filePath, result, 'utf8');
	return true;
}

async function* walk(directory) {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const entryPath = join(directory, entry.name);
		if (entry.isDirectory()) {
			yield* walk(entryPath);
		} else if (entry.name.endsWith('.js') || entry.name.endsWith('.d.ts')) {
			yield entryPath;
		}
	}
}

let count = 0;
for await (const filePath of walk(distDir)) {
	if (await processFile(filePath)) {
		count += 1;
	}
}
console.log(`[append-js-extensions] Added .js extensions in ${count} file(s).`);
