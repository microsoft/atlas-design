import { test, expect } from '@playwright/test';

test('dismiss removes parent component from the DOM after clicked', async ({ page }) => {
	await page.goto('/components/dismiss.html');

	// targeting notification component
	const notificationEl = page.locator('#example-notification-01');
	expect(notificationEl).toHaveCount(1);
	expect(notificationEl).toHaveAttribute('data-dismissable', '');
	expect(notificationEl).toHaveClass('notification notification-dismissable');

	const dismissEl = notificationEl.locator('[data-dismiss]');
	expect(dismissEl).toHaveAttribute('type', 'button');
	expect(dismissEl).toHaveClass('dismiss');

	await dismissEl.click();

	// Verifying there is no more notification component on a page
	expect(page.locator('#example-notification-01')).toHaveCount(0);
});
