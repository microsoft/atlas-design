import { test, expect } from '@playwright/test';
import { pages } from '../config/page';
import { LocalPageConfig } from '../config/typings';

/**
 * By default tests are run in serial manner in a single file.
 * We can opt for parallel with the following line.
 */
test.describe.configure({ mode: 'parallel' });

// ((route: Route, request: Request) => void)

const axilliaryThemes = ['dark', 'high-contrast']; // light is always included
const includeAllThemes = process.env.argv?.includes('--full-diff');

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

		for (const theme in ['light', ...moreThemes]) {
			// await Promise.all(pageConfig.routes.map(route => ));
			await page.goto(pageConfig.pathname);
			// const pathname = '' + pageConfig.name.replace(/\s|\\|\//g, '_') + '.png';
			await page.screenshot({
				...screenshotSettings,
				path: getVisualDiffFilePath(pageConfig, projectName, theme, width, height)
			});
		}
	});
}

function getVisualDiffFilePath(
	pageConfig: LocalPageConfig,
	projectName: string,
	theme: string,
	width: number,
	height: number
): string {
	const pagename = pageConfig.name.replace(/(\s|\\|\/)/g, '-');
	return `./visual-diff/snapshots/${pagename}__${theme}__${width}x${height}__${projectName}.png`;
}
