import { test, expect } from '@playwright/test';

test('popover closes .popover-content when an outer element is clicked', async ({ page }) => {
	// Go to http://localhost:1111/components/popover.html
	await page.goto('http://localhost:1111/components/popover.html');

	const summary = page.locator('#test-popover-summary');
	const content = page.locator('#test-popover-content');

	expect(content).not.toBeVisible();

	// Click summary:has-text("Popover centered")
	await page.locator('#test-popover-summary').click();

	expect(content).toBeVisible();

	await page.locator('h1').click();

	expect(content).not.toBeVisible();
});
