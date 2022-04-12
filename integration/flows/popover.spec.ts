import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	// Go to http://localhost:1111/components/popover.html
	await page.goto('http://localhost:1111/components/popover.html');

	const summaryElt = await page.locator('.popover > .popover-content', {
		hasText: 'Popover aligned to the left Popover content.'
	});

	expect(await summaryElt.isVisible()).toBe(false);

	// Click summary:has-text("Popover aligned to the left")
	await page.locator('.popover > summary', { hasText: 'Popover aligned to the left' }).click();
	// Our click should have triggered the popover to show up.
	expect(await summaryElt.isVisible()).toBe(true);
});
