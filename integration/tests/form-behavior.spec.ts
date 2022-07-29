import { test as base, expect } from '@playwright/test';

// form validation fixture
export const test = base.extend({
	page: async ({ baseURL, page }, use) => {
		await page.goto(`${baseURL}/components/form.html`);
		await use(page);
	},
	errorContainer: async ({ page }, use) => {
		const errorContainer = await page.locator('#sample-form-complex .form-error-container');
		await use(errorContainer);
	},
	submitBtn: async ({ page }, use) => {
		const submitBtn = await page.locator('#sample-form-complex button[type="submit"]');
		await use(submitBtn);
	}
});

test.describe('form behavior validation', () => {
	test('show inputMinLength message when input length is below minlength', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		const input = page.locator('#sample-input-min');
		const label = await input.textContent();
		const minLength = await input.getAttribute('minlength');

		page.fill('#sample-input-min', 'Lorem');

		await submitBtn.click();

		const messageId = (await input.getAttribute('aria-describedby')).split(' ')[0];
		const message = await page.locator(`#${messageId}`);
		expect(message).toContainText(`${label} must be at least ${minLength} characters.`);
		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText([`${label} must be at least ${minLength} characters.`], {
			useInnerText: true
		});
	});

	test('show inputRequired message when required input is missing value', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		const input = page.locator('#sample-input');
		const label = await input.textContent();

		page.fill('#sample-input-min', `Lorem ipsum`);
		page.fill('#sample-text-area', 'Lorem ipsum');

		await submitBtn.click();

		const messageId = (await input.getAttribute('aria-describedby')).split(' ')[0];
		const message = await page.locator(`#${messageId}`);
		expect(message).toContainText(`${label} is required.`);
		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText([`${label} is required.`]);
	});

	test('show thereAreNoEditsToSubmit message when no edits are made on the form', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		const formBehavior = page.locator('form-behavior');
		await page.$eval('form-behavior', el => el.removeAttribute('new'));
		await submitBtn.click();

		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText(['There are no edits to submit.']);
	});
});
