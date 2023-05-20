import { test, expect } from '@playwright/test';

test('dismiss removes parent component from the DOM after clicked', async ({ page }) => {
	await page.goto('/components/dismiss.html');

	// targeting notification component
	const notificationEl = page.getByTestId('notification');
	expect(notificationEl).toHaveCount(1);
	expect(notificationEl).toHaveAttribute('data-dismissable', '');

	const dismissEl = notificationEl.getByTestId('notification-dismiss');
	expect(dismissEl).toHaveAttribute('data-dismiss', '');

	await dismissEl.click();

	// Verifying there is no more notification component on a page
	expect(page.getByTestId('notification')).toHaveCount(0);
});
