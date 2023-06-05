import { test, expect } from '@playwright/test';

test('dismiss removes parent component from the DOM after clicked', async ({ page }) => {
	await page.goto('/components/dismiss.html');

	// targeting notification component
	const dismissableEl = page.locator('#example-dismiss-01');
	expect(dismissableEl).toHaveCount(1);
	expect(dismissableEl).toHaveAttribute('data-dismissable', '');

	const dismissEl = dismissableEl.locator('[data-dismiss]');
	expect(dismissEl).toHaveAttribute('type', 'button');

	await dismissEl.click();

	// Verifying there is no more notification component on a page
	expect(page.locator('#example-dismiss-01')).toHaveCount(0);
});
