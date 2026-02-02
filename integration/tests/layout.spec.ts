import { test, expect } from '@playwright/test';

const setSingleLayoutSelector = '[data-set-layout="layout-single"]';
const setHolyGrailLayoutSelector = '[data-set-layout="layout-holy-grail"]';
const setTwinLayoutSelector = '[data-set-layout="layout-twin"]';
const setSidecarLeftLayoutSelector = '[data-set-layout="layout-sidecar-left"]';
const setSidecarRightLayoutSelector = '[data-set-layout="layout-sidecar-right"]';
const setMenuCollapsedLayoutSelector = '[data-set-layout="layout-menu-collapsed"]';
const constrainLayoutSelector = '[data-toggle-layout-height-constraint]';
const hideHeroSelector = '[data-toggle-hero-visibility]';
const toggleFlyoutSelector = '[data-toggle-flyout-visibility]';

test('any unconstrained layout does not have a constrained height (twin) @desktop', async ({
	page
}, testInfo) => {
	test.skip(
		testInfo.project.name !== 'Widescreen Chromium',
		'Skip test if display screen is not widescreen'
	);

	await page.goto('/components/layout.html');
	await page.waitForLoadState('domcontentloaded');

	const twinLayoutButton = await page.locator(setTwinLayoutSelector);
	const constrainHeightButton = await page.locator(constrainLayoutSelector);
	const hideHeroButton = await page.locator(hideHeroSelector);

	expect(twinLayoutButton).toBeTruthy();
	expect(constrainHeightButton).toBeTruthy();
	expect(hideHeroButton).toBeTruthy();

	await twinLayoutButton.click();

	await page.waitForTimeout(300);

	let result: { [key: string]: boolean | null | string | number } = {};

	result = await page.evaluate(arg => {
		const layoutHtml = document.querySelector('.layout.layout-twin');
		if (!layoutHtml) {
			throw new Error('Did not find expected layout element');
		}
		const mainElement = layoutHtml.querySelector('.layout-body-main');
		if (!mainElement) {
			throw new Error('Did not find expected layout main element');
		}
		const mainIsScrolled = mainElement.scrollHeight > mainElement.clientHeight;
		const layoutIsConstrained =
			layoutHtml.scrollHeight === window.innerHeight &&
			window.innerHeight === layoutHtml.clientHeight;
		arg.exceedsScreenHeight = mainIsScrolled;
		arg.layoutIsConstrained = layoutIsConstrained;
		return arg;
	}, result);

	expect(result.exceedsScreenHeight).toBe(false);
	expect(result.layoutIsConstrained).toBe(false);
});

test('single layout is never constrained, even on desktop @desktop', async ({ page }, testInfo) => {
	test.skip(
		testInfo.project.name !== 'Widescreen Chromium',
		'Skip test if display screen is not widescreen'
	);

	await page.goto('/components/layout.html');
	await page.waitForLoadState('domcontentloaded');

	const singleLayoutButton = await page.locator(setSingleLayoutSelector);
	const constrainHeightButton = await page.locator(constrainLayoutSelector);

	expect(singleLayoutButton).toBeTruthy();
	expect(constrainHeightButton).toBeTruthy();

	await singleLayoutButton.click();

	await page.waitForTimeout(300);

	let result: { [key: string]: boolean | null | string | number } = {};

	result = await page.evaluate(arg => {
		const layoutHtml = document.querySelector('.layout.layout-single');
		if (!layoutHtml) {
			throw new Error('Did not find expected layout element');
		}
		const mainElement = layoutHtml.querySelector('.layout-body-main');
		if (!mainElement) {
			throw new Error('Did not find expected layout main element');
		}
		const mainIsScrolled = mainElement.scrollHeight > mainElement.clientHeight;
		const layoutIsConstrained =
			layoutHtml.scrollHeight === window.innerHeight &&
			window.innerHeight === layoutHtml.clientHeight;
		arg.exceedsScreenHeight = mainIsScrolled;
		arg.layoutIsConstrained = layoutIsConstrained;
		return arg;
	}, result);

	expect(result.exceedsScreenHeight).toBe(false);
	expect(result.layoutIsConstrained).toBe(false);
});

test('any constrained layout is not actually constrained on mobile (twin) @desktop', async ({
	page
}, testInfo) => {
	test.skip(
		testInfo.project.name === 'Widescreen Chromium',
		'Skip test if display screen is not mobile'
	);

	await page.goto('/components/layout.html');
	await page.waitForLoadState('domcontentloaded');

	const twinLayoutButton = await page.locator(setTwinLayoutSelector);
	const constrainHeightButton = await page.locator(constrainLayoutSelector);
	const hideHeroButton = await page.locator(hideHeroSelector);

	expect(twinLayoutButton).toBeTruthy();
	expect(constrainHeightButton).toBeTruthy();
	expect(hideHeroButton).toBeTruthy();

	await twinLayoutButton.click();

	await page.waitForTimeout(300);

	let result: { [key: string]: boolean | null | string | number } = {};

	result = await page.evaluate(arg => {
		const layoutHtml = document.querySelector('.layout.layout-twin');
		if (!layoutHtml) {
			throw new Error('Did not find expected layout element');
		}
		const mainElement = layoutHtml.querySelector('.layout-body-main');
		if (!mainElement) {
			throw new Error('Did not find expected layout main element');
		}
		const mainIsScrolled = mainElement.scrollHeight > mainElement.clientHeight;
		const layoutIsConstrained =
			layoutHtml.scrollHeight === window.innerHeight &&
			window.innerHeight === layoutHtml.clientHeight;
		arg.exceedsScreenHeight = mainIsScrolled;
		arg.layoutIsConstrained = layoutIsConstrained;
		return arg;
	}, result);

	expect(result.exceedsScreenHeight).toBe(false);
	expect(result.layoutIsConstrained).toBe(false);
});

test('twin layout can have its height constrained to 100vh with hero hidden @desktop', async ({
	page
}, testInfo) => {
	test.skip(
		testInfo.project.name !== 'Widescreen Chromium',
		'Skip test if display screen is not widescreen'
	);

	await page.goto('/components/layout.html');
	await page.waitForLoadState('domcontentloaded');

	const twinLayoutButton = await page.locator(setTwinLayoutSelector);
	const constrainHeightButton = await page.locator(constrainLayoutSelector);
	const hideHeroButton = await page.locator(hideHeroSelector);

	expect(twinLayoutButton).toBeTruthy();
	expect(constrainHeightButton).toBeTruthy();
	expect(hideHeroButton).toBeTruthy();

	await twinLayoutButton.click();

	await page.waitForTimeout(300);

	await hideHeroButton.click(); // remove hero
	await constrainHeightButton.click(); // apply .layout-constrained

	let result: { [key: string]: boolean | null | string | number } = {};

	result = await page.evaluate(arg => {
		const layoutHtml = document.querySelector('.layout.layout-twin');
		if (!layoutHtml) {
			throw new Error('Did not find expected layout element');
		}
		const mainElement = layoutHtml.querySelector('.layout-body-main');
		if (!mainElement) {
			throw new Error('Did not find expected layout main element');
		}
		const mainIsScrolled = mainElement.scrollHeight > mainElement.clientHeight;
		const layoutIsConstrained =
			layoutHtml.scrollHeight === window.innerHeight &&
			window.innerHeight === layoutHtml.clientHeight;
		arg.exceedsScreenHeight = mainIsScrolled;
		arg.layoutIsConstrained = layoutIsConstrained;
		return arg;
	}, result);

	expect(result.exceedsScreenHeight).toBe(true);
	expect(result.layoutIsConstrained).toBe(true);
});

test('holy grail layout can have its height constrained to 100vh with hero hidden @desktop', async ({
	page
}, testInfo) => {
	test.skip(
		testInfo.project.name !== 'Widescreen Chromium',
		'Skip test if display screen is not widescreen'
	);

	await page.goto('/components/layout.html');
	await page.waitForLoadState('domcontentloaded');

	const holyGrailLayoutButton = await page.locator(setHolyGrailLayoutSelector);
	const constrainHeightButton = await page.locator(constrainLayoutSelector);
	const hideHeroButton = await page.locator(hideHeroSelector);

	expect(holyGrailLayoutButton).toBeTruthy();
	expect(constrainHeightButton).toBeTruthy();
	expect(hideHeroButton).toBeTruthy();

	await holyGrailLayoutButton.click();

	await page.waitForTimeout(300);

	await hideHeroButton.click(); // remove hero
	await constrainHeightButton.click(); // apply .layout-constrained

	let result: { [key: string]: boolean | null | string | number } = {};

	result = await page.evaluate(arg => {
		const layoutHtml = document.querySelector('.layout.layout-holy-grail');
		if (!layoutHtml) {
			throw new Error('Did not find expected layout element');
		}
		const mainElement = layoutHtml.querySelector('.layout-body-main');
		if (!mainElement) {
			throw new Error('Did not find expected layout main element');
		}
		const mainIsScrolled = mainElement.scrollHeight > mainElement.clientHeight;
		const layoutIsConstrained =
			layoutHtml.scrollHeight === window.innerHeight &&
			window.innerHeight === layoutHtml.clientHeight;
		arg.exceedsScreenHeight = mainIsScrolled;
		arg.layoutIsConstrained = layoutIsConstrained;
		return arg;
	}, result);

	expect(result.exceedsScreenHeight).toBe(true);
	expect(result.layoutIsConstrained).toBe(true);
});

test('sidecar-right layout can have its height constrained to 100vh with hero hidden @desktop', async ({
	page
}, testInfo) => {
	test.skip(
		testInfo.project.name !== 'Widescreen Chromium',
		'Skip test if display screen is not widescreen'
	);

	await page.goto('/components/layout.html');
	await page.waitForLoadState('domcontentloaded');

	const sidecarRightButton = await page.locator(setSidecarRightLayoutSelector);
	const constrainHeightButton = await page.locator(constrainLayoutSelector);
	const hideHeroButton = await page.locator(hideHeroSelector);

	expect(sidecarRightButton).toBeTruthy();
	expect(constrainHeightButton).toBeTruthy();
	expect(hideHeroButton).toBeTruthy();

	await sidecarRightButton.click();

	await page.waitForTimeout(300);

	await hideHeroButton.click(); // remove hero
	await constrainHeightButton.click(); // apply .layout-constrained

	let result: { [key: string]: boolean | null | string | number } = {};

	result = await page.evaluate(arg => {
		const layoutHtml = document.querySelector('.layout.layout-sidecar-right');
		if (!layoutHtml) {
			throw new Error('Did not find expected layout element');
		}
		const mainElement = layoutHtml.querySelector('.layout-body-main');
		if (!mainElement) {
			throw new Error('Did not find expected layout main element');
		}
		const mainIsScrolled = mainElement.scrollHeight > mainElement.clientHeight;
		const layoutIsConstrained =
			layoutHtml.scrollHeight === window.innerHeight &&
			window.innerHeight === layoutHtml.clientHeight;
		arg.exceedsScreenHeight = mainIsScrolled;
		arg.layoutIsConstrained = layoutIsConstrained;
		return arg;
	}, result);

	expect(result.exceedsScreenHeight).toBe(true);
	expect(result.layoutIsConstrained).toBe(true);
});

test('sidecar-left layout can have its height constrained to 100vh with hero hidden @desktop', async ({
	page
}, testInfo) => {
	test.skip(
		testInfo.project.name !== 'Widescreen Chromium',
		'Skip test if display screen is not widescreen'
	);

	await page.goto('/components/layout.html');
	await page.waitForLoadState('domcontentloaded');

	const sidecarLeftButton = await page.locator(setSidecarLeftLayoutSelector);
	const constrainHeightButton = await page.locator(constrainLayoutSelector);
	const hideHeroButton = await page.locator(hideHeroSelector);

	expect(sidecarLeftButton).toBeTruthy();
	expect(constrainHeightButton).toBeTruthy();
	expect(hideHeroButton).toBeTruthy();

	await sidecarLeftButton.click();

	await page.waitForTimeout(300);

	await hideHeroButton.click(); // remove hero
	await constrainHeightButton.click(); // apply .layout-constrained

	let result: { [key: string]: boolean | null | string | number } = {};

	result = await page.evaluate(arg => {
		const layoutHtml = document.querySelector('.layout.layout-sidecar-left');
		if (!layoutHtml) {
			throw new Error('Did not find expected layout element');
		}
		const mainElement = layoutHtml.querySelector('.layout-body-main');
		if (!mainElement) {
			throw new Error('Did not find expected layout main element');
		}
		const mainIsScrolled = mainElement.scrollHeight > mainElement.clientHeight;
		const layoutIsConstrained =
			layoutHtml.scrollHeight === window.innerHeight &&
			window.innerHeight === layoutHtml.clientHeight;
		arg.exceedsScreenHeight = mainIsScrolled;
		arg.layoutIsConstrained = layoutIsConstrained;
		return arg;
	}, result);

	expect(result.exceedsScreenHeight).toBe(true);
	expect(result.layoutIsConstrained).toBe(true);
});

/// to document

test('any layout can render a flyout menu on desktop+, with no side scroll @desktop', async ({
	page
}, testInfo) => {
	test.skip(
		testInfo.project.name !== 'Widescreen Chromium',
		'Skip test if display screen is not widescreen'
	);

	await page.goto('/components/layout.html');
	await page.waitForLoadState('domcontentloaded');

	const singleLayoutButton = await page.locator(setSingleLayoutSelector);
	const constrainHeightButton = await page.locator(constrainLayoutSelector);
	const toggleFlyoutButton = await page.locator(toggleFlyoutSelector);

	expect(singleLayoutButton).toBeTruthy();
	expect(constrainHeightButton).toBeTruthy();
	expect(toggleFlyoutButton).toBeTruthy();

	await singleLayoutButton.click();
	await toggleFlyoutButton.click();

	await page.waitForTimeout(300);

	let result: { [key: string]: boolean | null | string | number } = {};

	result = await page.evaluate(arg => {
		const layoutHtml = document.querySelector('.layout.layout-single');
		if (!layoutHtml) {
			throw new Error('Did not find expected layout element');
		}
		const mainElement = layoutHtml.querySelector('.layout-body-main');
		if (!mainElement) {
			throw new Error('Did not find expected layout main element');
		}
		const mainIsScrolled = mainElement.scrollHeight > mainElement.clientHeight;
		const layoutIsConstrained =
			layoutHtml.scrollHeight === window.innerHeight &&
			window.innerHeight === layoutHtml.clientHeight;
		arg.exceedsScreenHeight = mainIsScrolled;
		arg.layoutIsConstrained = layoutIsConstrained;
		arg.exceendsScreenWidth = layoutHtml.scrollWidth > window.innerWidth;
		return arg;
	}, result);

	const flyout = await page.locator('.layout-body-flyout');

	expect(flyout).toBeVisible();
	expect(result.exceendsScreenWidth).toBe(false); // key one
	expect(result.exceedsScreenHeight).toBe(false); // just ensuring this didn't change based on both flyout and constraint
	expect(result.layoutIsConstrained).toBe(false); // just ensuring this didn't change based on both flyout and constraint
});

test('flyout will not be shown on mobile and tablet ever @narrow', async ({ page }, testInfo) => {
	test.skip(
		testInfo.project.name === 'Widescreen Chromium',
		'Skip test if display screen is not mobile'
	);

	await page.goto('/components/layout.html');
	await page.waitForLoadState('domcontentloaded');

	const twinLayoutButton = await page.locator(setTwinLayoutSelector);
	const toggleFlyoutButton = await page.locator(toggleFlyoutSelector);

	expect(twinLayoutButton).toBeTruthy();
	expect(toggleFlyoutButton).toBeTruthy();

	await twinLayoutButton.click();
	await toggleFlyoutButton.click();

	const flyoutElt = await page.locator('.layout-body-flyout');
	expect(flyoutElt).not.toBeVisible();
});

test('menu-collapsed layout displays menu, main, and aside in correct order at widescreen @desktop', async ({
	page
}, testInfo) => {
	test.skip(
		testInfo.project.name !== 'Widescreen Chromium',
		'Skip test if display screen is not widescreen'
	);

	await page.goto('/components/layout.html');
	await page.waitForLoadState('domcontentloaded');

	await page.locator(setMenuCollapsedLayoutSelector).click();

	const layoutHtml = page.locator('.layout.layout-menu-collapsed');
	const menu = layoutHtml.locator('.layout-body-menu');
	const main = layoutHtml.locator('.layout-body-main');
	const aside = layoutHtml.locator('.layout-body-aside');

	// All elements should be visible
	await expect(layoutHtml).toBeVisible();
	await expect(menu).toBeVisible();
	await expect(main).toBeVisible();
	await expect(aside).toBeVisible();

	// Verify horizontal order: menu < main < aside
	const menuBox = await menu.boundingBox();
	const mainBox = await main.boundingBox();
	const asideBox = await aside.boundingBox();

	expect(menuBox).not.toBeNull();
	expect(mainBox).not.toBeNull();
	expect(asideBox).not.toBeNull();

	expect(menuBox!.x).toBeLessThan(mainBox!.x);
	expect(mainBox!.x).toBeLessThan(asideBox!.x);
});
