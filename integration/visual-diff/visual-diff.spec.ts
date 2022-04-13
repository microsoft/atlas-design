import { test } from '@playwright/test';
import { pages } from '../config/page';
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
console.log(process.argv);
const includeAllThemes = process.argv?.includes('--full-diff');
// const updateSnapshots = process.argv?.includes('--update-snapshots');

for (const pageConfig of pages) {
	const screenshotSettings = pageConfig?.options?.screenshot || {};

	test(`"${pageConfig.pathname}"`, async ({ page, context }) => {
		await Promise.all(pageConfig.routes.map(r => context.route(r.url, r.handler, r.options)));

		const moreThemes = includeAllThemes ? axilliaryThemes : [];
		const {
			name: projectName,
			use: {
				viewport: { width, height }
			}
		} = test.info().project;

		for (const theme of ['light', ...moreThemes]) {
			// await Promise.all(pageConfig.routes.map(route => ));
			const filepath = getVisualDiffFilePath(pageConfig, projectName, theme, width, height);
			await page.goto(pageConfig.pathname);
			// const pathname = '' + pageConfig.name.replace(/\s|\\|\//g, '_') + '.png';
			const imageBuffer = await page.screenshot({
				...screenshotSettings,
				path: filepath
			});

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
