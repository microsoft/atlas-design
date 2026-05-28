// @ts-check

import { mkdir, readFile, rm, writeFile } from 'fs/promises';
import { basename, dirname, join, resolve, sep } from 'path';
import * as pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { promisify } from 'util';
import {
	baselineDirectory,
	diffDirectory,
	screenshotsOutputDir,
	screenshotsRoot
} from './locations';
import { generateHtmlReport } from './report';
export const glob = promisify(require('glob'));

export const diffExt = '.diff.png';
/**
 * Place where the image manifest will be written.
 */
const screenshotsManifestLocation = screenshotsRoot;
/**
 * Directory containing the screenshots pertaining to the changed branch.
 */
const _sourceDir = process.env.SOURCE_DIR || screenshotsOutputDir;
/**
 * Directory containing the comparison screenshots.
 */
const _targetDir = process.env.TARGET_DIR || baselineDirectory;
/**
 * Directory where the diff images are written.
 */
const _outDir = process.env.OUT_DIR || diffDirectory;

async function compareBuffers(source: Buffer, target: Buffer) {
	let sourcePng: PNG = PNG.sync.read(source);
	let targetPng: PNG = PNG.sync.read(target);

	// Align image sizes on mismatch
	if (sourcePng.height !== targetPng.height || sourcePng.width !== targetPng.width) {
		const createEmptyImage = (width: number, height: number) =>
			new PNG({ width, height, fill: true });
		const copyImage = (source: PNG, target: PNG) =>
			PNG.bitblt(source, target, 0, 0, source.width, source.height, 0, 0);
		const maxCommonWidth = Math.max(sourcePng.width, targetPng.width);
		const maxCommonHeight = Math.max(sourcePng.height, targetPng.height);
		const nextReceivedImage = createEmptyImage(maxCommonWidth, maxCommonHeight);
		const nextBaselineImage = createEmptyImage(maxCommonWidth, maxCommonHeight);
		copyImage(sourcePng, nextReceivedImage);
		copyImage(targetPng, nextBaselineImage);
		sourcePng = nextReceivedImage;
		targetPng = nextBaselineImage;
	}

	const { width, height } = sourcePng;

	const png = new PNG({ width, height });
	const pixelCount = pixelmatch(sourcePng.data, targetPng.data, png.data, width, height, {
		threshold: 0.05
	});

	const totalPixels = width * height;
	const ratio = pixelCount / totalPixels;

	return { png, pixelCount, ratio, width, height };
}

/**
 * Compares images in the source dir with images in the target dir, writing the results to the out dir.
 * @param {string} sourceDir Directory containing the source PNGs.
 * @param {string} targetDir Directory containing the target PNGs.
 * @param {string} outDir Directory containing the target PNGs.
 */
async function compare(
	sourceDir: string,
	targetDir: string,
	outDir: string
): Promise<VisualDiffReportManifest> {
	const pattern = '**/*.png';
	console.log(`Comparing screenshots in ${sourceDir} with ${targetDir}`);
	const [sourceKeys, targetKeys] = await Promise.all([
		glob(pattern, { cwd: sourceDir }),
		glob(pattern, { cwd: targetDir }),
		rm(outDir, { recursive: true, force: true }).then(() => mkdir(outDir, { recursive: true }))
	]);

	const sourceMap = sourceKeys.reduce(
		(m: { set: (arg0: any, arg1: string) => any }, f: any) => m.set(f, join(sourceDir, f)),
		new Map()
	);
	const targetMap = targetKeys.reduce(
		(m: { set: (arg0: any, arg1: string) => any }, f: any) => m.set(f, join(targetDir, f)),
		new Map()
	);
	const manifest: VisualDiffReportManifest = [];
	const writePromises = [];
	for (const [key, sourceFilename] of sourceMap) {
		if (!targetMap.has(key)) {
			console.log(`Skipping comparison: baseline dir does not contain '${key}'.`);
			continue;
		}

		const targetFilename = targetMap.get(key);
		const [source, target] = await Promise.all([
			readFile(sourceFilename),
			readFile(targetFilename)
		]);
		const diff = await compareBuffers(source, target);

		if (diff.pixelCount === 0) {
			continue;
		}

		const { pixelCount, ratio, width, height } = diff;

		const name = basename(key, '.png');
		const dir = resolve(outDir, dirname(key));
		await mkdir(dir, { recursive: true });
		const outfile = join(dir, `${name}${diffExt}`);

		const [title, theme, resolutionString, projectInfo, browser] = name.split('__');
		const [widthString, heightString] = resolutionString.split('x');

		manifest.push({
			pageName: title,
			name,
			pageUrl: title.replace(/\//g, '-') + '.html',
			projectInfo,
			theme,
			pixelCount,
			ratio,
			browser,
			width: widthString,
			height: heightString,
			//@ts-ignore
			viewport: {
				width,
				height
			},
			diff: outfile.replace(screenshotsRoot, '').split(sep).join('/'),
			source: sourceFilename.replace(screenshotsRoot, '').split(sep).join('/'),
			target: targetFilename.replace(screenshotsRoot, '').split(sep).join('/')
		});

		writePromises.push(writeFile(join(dir, `${name}.diff.png`), PNG.sync.write(diff.png)));
	}

	await Promise.all([writePromises]);
	const sortedManifest = sortManifest(manifest);

	await writeFile(
		join(screenshotsManifestLocation, 'manifest.json'),
		JSON.stringify(sortedManifest)
	);
	return sortedManifest;
}

async function performVisualDiff(
	sourceDir: string = _sourceDir,
	targetDir: string = _targetDir,
	outDir: string = _outDir
) {
	const manifest = await compare(sourceDir, targetDir, outDir);
	await generateHtmlReport(manifest);
}

function sortManifest(manifest: VisualDiffReportManifest) {
	return manifest.sort((a: DiffInfo, b: DiffInfo) => {
		if (a.pageName === b.pageName) {
			return a.viewport.width > b.viewport.width ? -1 : 1;
		}

		return a.pageName > b.pageName ? 1 : -1;
	});
}

performVisualDiff();

export type VisualDiffReportManifest = DiffInfo[];
export interface DiffInfo {
	pageName: string;
	name: string;
	pageUrl: string;
	projectInfo: string;
	theme: string;
	pixelCount: number;
	ratio: number;
	browser: string;
	width: string;
	height: string;
	viewport: Viewport;
	diff: string;
	source: string;
	target: string;
}

export interface Viewport {
	width: number;
	height: number;
}
