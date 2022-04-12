import { test, expect } from '@playwright/test';
import { pages } from '../config/page';

/**
 * By default tests are run in serial manner in a single file.
 * We can opt for parallel with the following line.
 */
test.describe.configure({ mode: 'parallel' });

for (const pageConfig of pages) {
	const screenshotSettings = pageConfig?.options?.screenshot || {};

	test(`"${pageConfig.pathname}"`, async ({ page }) => {
		await page.goto(pageConfig.pathname);
		// const pathname = '' + pageConfig.name.replace(/\s|\\|\//g, '_') + '.png';
		expect(await page.screenshot({ ...screenshotSettings })).toMatchSnapshot();
	});
}
