import { test } from '@playwright/test';
import { auxillaryViewports, pages } from '../config/page';
import { LocalPageConfig, VisualDiffManifest } from '../config/typings';
import * as pixelmatch from 'pixelmatch';
// const { PNG } = require('pngjs');

/**
 * By default tests are run in serial manner in a single file.
 * We can opt for parallel with the following line.
 */
test.describe.configure({ mode: 'parallel' });

// ((route: Route, request: Request) => void)

const visualDiffManifest: VisualDiffManifest = {
	name: 'visual-diff',
	/** Source */
	main: {
		light: {},
		dark: {},
		'high-contrast': {}
	},
	/** Source */
	actual: {
		light: {},
		dark: {},
		'high-contrast': {}
	}
};

const axilliaryThemes = ['dark', 'high-contrast']; // light is always included

const includeAllThemes = process.argv?.includes('--full-diff');
// const updateSnapshots = process.argv?.includes('--update-snapshots');

for (const pageConfig of pages) {
	const screenshotSettings = pageConfig?.options?.screenshot || {};

	test(`"${pageConfig.pathname}"`, async ({ page, context, browser }) => {
		await Promise.all(pageConfig.routes.map(r => context.route(r.url, r.handler, r.options)));

		const moreThemes = includeAllThemes ? axilliaryThemes : [];
		await page.goto(pageConfig.pathname);

		// move to change theme based on theme

		for (const theme of ['light', ...moreThemes]) {
			// first one (above is widescreen)
			for (const project of [test.info().project, ...auxillaryViewports]) {
				const {
					name: projectName,
					use: {
						viewport: { width, height }
					}
				} = project;

				const filepath = getVisualDiffFilePath(pageConfig, projectName, theme, width, height);
				await page.setViewportSize({ width, height });
				// const pathname = '' + pageConfig.name.replace(/\s|\\|\//g, '_') + '.png';
				const imageBuffer = await page.screenshot({
					...screenshotSettings,
					path: filepath
				});
			}

			const result = pixelmatch(imageBuffer, imageBuffer);

			// visualDiffManifest[]
		}
	});
}

test.afterAll(() => {});

function getVisualDiffFilePath(
	pageConfig: LocalPageConfig,
	project: string,
	theme: string,
	width: number,
	height: number
): string {
	const pagename = pageConfig.name.replace(/(\s|\\|\/)/g, '-');
	const projectName = project.replace(/(\s|\\|\/)/g, '-');
	return `./visual-diff/snapshots/${pagename}__${theme}__${width}x${height}__${projectName}.png`;
}
