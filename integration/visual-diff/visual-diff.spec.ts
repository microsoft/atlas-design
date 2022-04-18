import { test } from '@playwright/test';
import { auxillaryViewports, pages } from '../config/page';
import { LocalPageConfig } from '../config/typings';

/**
 * By default tests are run in serial manner in a single file.
 * We can opt for parallel with the following line.
 */
test.describe.configure({ mode: 'parallel' });

const allowedThemes = ['light', 'dark', 'high-contrast'];

const themes = process.env.THEMES?.split(',') ?? ['light'];
if (themes.find(t => !allowedThemes.includes(t))) {
	throw new Error(`Unexpected themes "${process.env.THEMES}"`);
}

for (const pageConfig of pages) {
	const screenshotSettings = pageConfig?.options?.screenshot || {};

	test(`"${pageConfig.pathname}"`, async ({ page, context }) => {
		await Promise.all(pageConfig.routes.map(r => context.route(r.url, r.handler)));

		await page.goto(pageConfig.pathname);

		// move to change theme based on theme

		const defaultProject = test.info().project;

		for (const theme of themes) {
			await page.evaluate(theme => {
				// @ts-ignore
				window.setTheme(theme);
			}, theme);

			for (const project of [defaultProject, ...auxillaryViewports]) {
				const {
					name: projectName,
					use: {
						viewport: { width, height }
					}
				} = project;

				const filepath = getVisualDiffFilePath(pageConfig, projectName, theme, width, height);
				await page.setViewportSize({ width, height });

				// const pathname = '' + pageConfig.name.replace(/\s|\\|\//g, '_') + '.png';
				await page.screenshot({
					...screenshotSettings,
					path: filepath
				});
			}
		}
	});
}

function getVisualDiffFilePath(
	pageConfig: LocalPageConfig,
	project: string,
	theme: string,
	width: number,
	height: number
): string {
	const pagename = pageConfig.name.replace(/(\s|\\|\/)/g, '-');
	const projectName = project.replace(/(\s|\\|\/)/g, '-');
	return `./visual-diff/screenshots/${pagename}__${theme}__${width}x${height}__${projectName}.png`;
}
