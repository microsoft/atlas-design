import { test, expect } from '@playwright/test';

const setSingleLayoutSelector = '[data-set-layout="layout-single"]';
const setHolyGrailLayoutSelector = '[data-set-layout="layout-holy-grail"]';
const setTwinLayoutSelector = '[data-set-layout="layout-twin"]';
const setSidecarLeftLayoutSelector = '[data-set-layout="layout-sidecar-left"]';
const setSidecarRightLayoutSelector = '[data-set-layout="layout-sidecar-right"]';
const toggleMenuCollapsedSelector = '#main [data-menu-collapse-toggle]';
const toggleAsideCollapsedSelector = '#main [data-aside-collapse-toggle]';
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

test('menu-collapsed modifier collapses menu on holy-grail layout at widescreen @desktop', async ({
	page
}, testInfo) => {
	test.skip(
		testInfo.project.name !== 'Widescreen Chromium',
		'Skip test if display screen is not widescreen'
	);

	await page.goto('/components/layout.html');
	await page.waitForLoadState('domcontentloaded');

	// Ensure we're on holy-grail layout (default)
	const layoutHtml = page.locator('.layout.layout-holy-grail');
	await expect(layoutHtml).toBeVisible();

	// Menu and its content should be visible before collapse
	const menu = page.locator('.layout-body-menu');
	const menuContent = page.locator('.hide-on-menu-collapsed');
	const collapsedButton = page.locator('.show-on-menu-collapsed');
	await expect(menu).toBeVisible();
	await expect(menuContent).toBeVisible();
	await expect(collapsedButton).toBeHidden();

	// Toggle menu-collapsed modifier
	await page.locator(toggleMenuCollapsedSelector).click();

	// Layout should now have both holy-grail and menu-collapsed classes
	const layoutWithModifier = page.locator('.layout.layout-holy-grail.layout-menu-collapsed');
	await expect(layoutWithModifier).toBeVisible();

	// Menu area should still be visible but content should be hidden and collapsed button shown
	await expect(menu).toBeVisible();
	await expect(menuContent).toBeHidden();
	await expect(collapsedButton).toBeVisible();

	// Main and aside should still be visible
	const main = layoutWithModifier.locator('.layout-body-main');
	const aside = layoutWithModifier.locator('.layout-body-aside');
	await expect(main).toBeVisible();
	await expect(aside).toBeVisible();

	// Toggle again to expand menu
	await page.locator(toggleMenuCollapsedSelector).click();
	await expect(menuContent).toBeVisible();
	await expect(collapsedButton).toBeHidden();
});

test('menu-collapsed modifier collapses menu on sidecar-left layout at widescreen @desktop', async ({
	page
}, testInfo) => {
	test.skip(
		testInfo.project.name !== 'Widescreen Chromium',
		'Skip test if display screen is not widescreen'
	);

	await page.goto('/components/layout.html');
	await page.waitForLoadState('domcontentloaded');

	// Switch to sidecar-left layout
	await page.locator(setSidecarLeftLayoutSelector).click();
	await page.waitForTimeout(300);

	const layoutHtml = page.locator('.layout.layout-sidecar-left');
	await expect(layoutHtml).toBeVisible();

	// Menu and its content should be visible before collapse
	const menu = page.locator('.layout-body-menu');
	const menuContent = page.locator('.hide-on-menu-collapsed');
	const collapsedButton = page.locator('.show-on-menu-collapsed');
	await expect(menu).toBeVisible();
	await expect(menuContent).toBeVisible();
	await expect(collapsedButton).toBeHidden();

	// Toggle menu-collapsed modifier
	await page.locator(toggleMenuCollapsedSelector).click();

	// Layout should now have both sidecar-left and menu-collapsed classes
	const layoutWithModifier = page.locator('.layout.layout-sidecar-left.layout-menu-collapsed');
	await expect(layoutWithModifier).toBeVisible();

	// Menu area should still be visible but content should be hidden and collapsed button shown
	await expect(menu).toBeVisible();
	await expect(menuContent).toBeHidden();
	await expect(collapsedButton).toBeVisible();

	// Main should still be visible
	const main = layoutWithModifier.locator('.layout-body-main');
	await expect(main).toBeVisible();

	// Toggle again to expand menu
	await page.locator(toggleMenuCollapsedSelector).click();
	await expect(menuContent).toBeVisible();
	await expect(collapsedButton).toBeHidden();
});

test('aside-collapsed modifier collapses aside on holy-grail layout at widescreen @desktop', async ({
	page
}, testInfo) => {
	test.skip(
		testInfo.project.name !== 'Widescreen Chromium',
		'Skip test if display screen is not widescreen'
	);

	await page.goto('/components/layout.html');
	await page.waitForLoadState('domcontentloaded');

	// Ensure we're on holy-grail layout (default)
	const layoutHtml = page.locator('.layout.layout-holy-grail');
	await expect(layoutHtml).toBeVisible();

	const aside = page.locator('.layout-body-aside');
	await expect(aside).toBeVisible();

	// Get aside width before collapse
	const boxBefore = await aside.boundingBox();
	expect(boxBefore).not.toBeNull();
	const widthBefore = boxBefore!.width;

	// Toggle aside-collapsed modifier
	await page.locator(toggleAsideCollapsedSelector).click();

	const layoutWithModifier = page.locator('.layout.layout-holy-grail.layout-aside-collapsed');
	await expect(layoutWithModifier).toBeVisible();

	// Aside should still be visible but narrower
	await expect(aside).toBeVisible();
	const boxAfter = await aside.boundingBox();
	expect(boxAfter).not.toBeNull();
	expect(boxAfter!.width).toBeLessThan(widthBefore);

	// Main should still be visible
	const main = layoutWithModifier.locator('.layout-body-main');
	await expect(main).toBeVisible();

	// Toggle again to expand aside
	await page.locator(toggleAsideCollapsedSelector).click();
	await expect(layoutWithModifier).toBeHidden();
	// Wait for view transition to complete and aside to reach expanded width
	await expect(async () => {
		const boxRestored = await aside.boundingBox();
		expect(boxRestored).not.toBeNull();
		expect(boxRestored!.width).toBeGreaterThan(boxAfter!.width);
	}).toPass();
});

test('aside-collapsed modifier collapses aside on sidecar-right layout at widescreen @desktop', async ({
	page
}, testInfo) => {
	test.skip(
		testInfo.project.name !== 'Widescreen Chromium',
		'Skip test if display screen is not widescreen'
	);

	await page.goto('/components/layout.html');
	await page.waitForLoadState('domcontentloaded');

	// Switch to sidecar-right layout
	await page.locator(setSidecarRightLayoutSelector).click();
	await page.waitForTimeout(300);

	const layoutHtml = page.locator('.layout.layout-sidecar-right');
	await expect(layoutHtml).toBeVisible();

	const aside = page.locator('.layout-body-aside');
	await expect(aside).toBeVisible();

	// Get aside width before collapse
	const boxBefore = await aside.boundingBox();
	expect(boxBefore).not.toBeNull();
	const widthBefore = boxBefore!.width;

	// Toggle aside-collapsed modifier
	await page.locator(toggleAsideCollapsedSelector).click();

	const layoutWithModifier = page.locator('.layout.layout-sidecar-right.layout-aside-collapsed');
	await expect(layoutWithModifier).toBeVisible();

	// Aside should still be visible but narrower
	await expect(aside).toBeVisible();
	const boxAfter = await aside.boundingBox();
	expect(boxAfter).not.toBeNull();
	expect(boxAfter!.width).toBeLessThan(widthBefore);

	// Main should still be visible
	const main = layoutWithModifier.locator('.layout-body-main');
	await expect(main).toBeVisible();

	// Toggle again to expand aside
	await page.locator(toggleAsideCollapsedSelector).click();
	await expect(layoutWithModifier).toBeHidden();
	// Wait for view transition to complete and aside to reach expanded width
	await expect(async () => {
		const boxRestored = await aside.boundingBox();
		expect(boxRestored).not.toBeNull();
		expect(boxRestored!.width).toBeGreaterThan(boxAfter!.width);
	}).toPass();
});
