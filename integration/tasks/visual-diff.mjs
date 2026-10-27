import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { summarize, writeReport } from './visual-report.mjs';

const themes = ['light', 'dark', 'high-contrast'];
const widths = [390, 1280];
const contentTypes = {
	'.html': 'text/html',
	'.css': 'text/css',
	'.js': 'application/javascript',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.woff2': 'font/woff2'
};

export async function discoverPages(root) {
	const pages = ['/index.html'];
	for (const category of ['components', 'atomics', 'patterns']) {
		const directory = path.join(root, category);
		try {
			for (const entry of await readdir(directory, { recursive: true, withFileTypes: true })) {
				if (entry.isFile() && entry.name.endsWith('.html')) {
					const relative = path.relative(root, path.join(entry.parentPath, entry.name));
					pages.push('/' + relative.split(path.sep).join('/'));
				}
			}
		} catch (error) {
			if (error.code !== 'ENOENT') throw error;
		}
	}
	if (!(await stat(path.join(root, 'index.html'))).isFile()) {
		throw new Error(`Missing site index in ${root}`);
	}
	return pages.sort();
}

export async function serveSite(directory) {
	const root = path.resolve(directory);
	const server = createServer(async (request, response) => {
		try {
			const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
			const filename = path.resolve(root, '.' + pathname.split('/').join(path.sep));
			if (!filename.startsWith(root + path.sep)) {
				response.writeHead(403).end();
				return;
			}
			const body = await readFile(filename);
			response.writeHead(200, {
				'Content-Type': contentTypes[path.extname(filename)] || 'application/octet-stream',
				'X-Content-Type-Options': 'nosniff'
			});
			response.end(body);
		} catch {
			response.writeHead(404).end();
		}
	});
	await new Promise((resolve, reject) => {
		server.once('error', reject);
		server.listen(0, '127.0.0.1', resolve);
	});
	return {
		origin: `http://127.0.0.1:${server.address().port}`,
		close: () => new Promise(resolve => server.close(resolve))
	};
}

export function compareImages(beforeBuffer, afterBuffer) {
	if (beforeBuffer.equals(afterBuffer)) return { changed: false, pixels: 0 };
	const before = PNG.sync.read(beforeBuffer);
	const after = PNG.sync.read(afterBuffer);
	const width = Math.max(before.width, after.width);
	const height = Math.max(before.height, after.height);
	const images = [before, after].map(image => {
		const padded = new PNG({ width, height });
		PNG.bitblt(image, padded, 0, 0, image.width, image.height, 0, 0);
		return padded;
	});
	const diff = new PNG({ width, height });
	const pixels = pixelmatch(images[0].data, images[1].data, diff.data, width, height, {
		threshold: 0.1
	});
	return {
		changed: pixels > 0 || before.width !== after.width || before.height !== after.height,
		pixels,
		diff: PNG.sync.write(diff)
	};
}

async function capture(browser, origin, pathname, theme, width) {
	const context = await browser.newContext({
		viewport: { width, height: 900 },
		deviceScaleFactor: 1,
		colorScheme: 'light',
		reducedMotion: 'reduce',
		locale: 'en-US',
		timezoneId: 'UTC',
		serviceWorkers: 'block'
	});
	try {
		context.setDefaultTimeout(30000);
		const page = await context.newPage();
		const errors = [];
		page.on('pageerror', error => errors.push(error.message));
		page.on('response', response => {
			if (
				response.url().startsWith(origin + '/') &&
				response.status() >= 400 &&
				['script', 'stylesheet'].includes(response.request().resourceType())
			) {
				errors.push(`HTTP ${response.status()}: ${response.url()}`);
			}
		});
		await context.route('**/*', route => {
			if (
				!route
					.request()
					.url()
					.startsWith(origin + '/')
			)
				return route.abort();
			return route.continue();
		});
		const response = await page.goto(`${origin}${pathname}?theme=${theme}`);
		if (!response?.ok()) throw new Error(`Cannot load ${pathname}: ${response?.status()}`);
		await page.waitForFunction(() => typeof window.setTheme === 'function');
		await page.evaluate(theme => window.setTheme(theme), theme);
		await page.evaluate(() => document.fonts.ready);
		await page.mouse.move(-1, -1);
		const options = {
			fullPage: true,
			animations: 'disabled',
			caret: 'hide',
			style:
				'video::-webkit-media-controls, audio::-webkit-media-controls { display: none !important; }'
		};
		const screenshot = async () => {
			await page.evaluate(async () => {
				// Full-page layout and ResizeObserver can transiently clamp sliders.
				for (const input of document.querySelectorAll('input[type="range"]')) {
					input.value = input.defaultValue;
					input.dispatchEvent(new Event('input', { bubbles: true }));
				}
				await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
			});
			return page.screenshot(options);
		};
		let previous = await screenshot();
		// Consecutive matching captures reject animation, font, or image-loading noise.
		for (let attempt = 0; attempt < 5; attempt++) {
			const next = await screenshot();
			if (!compareImages(previous, next).changed) {
				if (errors.length) throw new Error(errors.join('\n'));
				return next;
			}
			previous = next;
		}
		throw new Error(`Screenshot did not stabilize: ${pathname}, ${theme}, ${width}px`);
	} finally {
		await context.close();
	}
}

export async function visualDiff({ before, after, output, metadata = {}, pages, concurrency = 4 }) {
	const beforePages = new Set(await discoverPages(before));
	const afterPages = new Set(await discoverPages(after));
	const selected = pages || [...new Set([...beforePages, ...afterPages])].sort();
	const cases = selected.flatMap(page =>
		themes.flatMap(theme => widths.map(width => ({ page, theme, width })))
	);
	if (cases.length === 0) throw new Error('No visual comparison cases selected');
	await mkdir(output, { recursive: true });
	const servers = [];
	let browser;
	const entries = [];
	try {
		servers.push(await serveSite(before));
		servers.push(await serveSite(after));
		browser = await chromium.launch();
		const queue = [...cases];
		await Promise.all(
			Array.from({ length: concurrency }, async () => {
				while (queue.length) {
					const entry = queue.shift();
					const { page, theme, width } = entry;
					entry.id = `${createHash('sha256')
						.update(page)
						.digest('hex')
						.slice(0, 16)}-${theme}-${width}`;
					const beforeImage = beforePages.has(page)
						? await capture(browser, servers[0].origin, page, theme, width)
						: undefined;
					const afterImage = afterPages.has(page)
						? await capture(browser, servers[1].origin, page, theme, width)
						: undefined;
					if (!beforeImage && !afterImage) throw new Error(`Unknown page: ${page}`);
					const comparison =
						beforeImage && afterImage ? compareImages(beforeImage, afterImage) : undefined;
					entry.status = !beforeImage
						? 'added'
						: !afterImage
						? 'removed'
						: comparison.changed
						? 'changed'
						: 'unchanged';
					entry.pixels = comparison?.pixels || 0;
					if (entry.status !== 'unchanged') {
						for (const [key, image] of Object.entries({
							before: beforeImage,
							after: afterImage,
							diff: comparison?.diff
						})) {
							if (!image) continue;
							entry[key] = `${entry.id}-${key}.png`;
							await writeFile(path.join(output, entry[key]), image);
						}
					}
					entries.push(entry);
					console.log(`${entry.status}: ${page} (${theme}, ${width}px)`);
				}
			})
		);
		const manifest = {
			version: 1,
			baseSha: metadata.baseSha,
			mergeSha: metadata.mergeSha,
			entries: entries.sort((a, b) => a.id.localeCompare(b.id))
		};
		await writeFile(path.join(output, 'manifest.json'), JSON.stringify(manifest));
		await writeReport(output, manifest, metadata);
		return summarize(manifest);
	} finally {
		if (browser) await browser.close();
		await Promise.all(servers.map(server => server.close()));
	}
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	const [before, after, output] = process.argv.slice(2);
	if (!before || !after || !output) {
		throw new Error('Usage: node visual-diff.mjs <base-site> <merge-site> <report-output>');
	}
	const summary = await visualDiff({
		before: path.resolve(before),
		after: path.resolve(after),
		output: path.resolve(output),
		metadata: {
			number: process.env.PR_NUMBER,
			baseSha: process.env.BASE_SHA,
			mergeSha: process.env.MERGE_SHA
		}
	});
	console.log(summary);
	if (process.env.GITHUB_STEP_SUMMARY) {
		await writeFile(
			process.env.GITHUB_STEP_SUMMARY,
			`## Visual diff\n\n${summary.changed} changed, ${summary.added} added, ${summary.removed} removed, ${summary.unchanged} unchanged captures.\n\nVisual differences are advisory. The Pages publisher posts the browsable report link on the PR.\n`,
			{ flag: 'a' }
		);
	}
}
