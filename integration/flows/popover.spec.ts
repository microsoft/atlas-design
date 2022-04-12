import { test, expect } from '@playwright/test';

test('popover opens when clicked', async ({ page }) => {
	// Go to http://localhost:1111/components/popover.html
	await page.goto('http://localhost:1111/components/popover.html');
});
