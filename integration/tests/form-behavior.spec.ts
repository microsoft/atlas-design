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

	// The input value string is automatically reduced if input has maxlength
	test('show inputMaxLength message when input length is above maxlength', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		const input = page.locator('#sample-input');
		const label = await input.textContent();
		const maxLength = (await input.getAttribute('maxlength')) ?? 255;

		page.fill(
			'#sample-input',
			`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
			dolore magna aliqua. Imperdiet sed euismod nisi porta lorem mollis aliquam ut. Cursus metus aliquam eleifend 
			mi in nulla. Vel facilisis volutpat est velit.`
		);

		await submitBtn.click();

		const messageId = (await input.getAttribute('aria-describedby')).split(' ')[0];
		const message = await page.locator(`#${messageId}`);
		expect(message).toContainText(`${label} cannot be longer than ${maxLength} characters.`);
		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText(
			[`${label} cannot be longer than ${maxLength} characters.`],
			{
				useInnerText: true
			}
		);
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

	test('show inputRequired message when custom element is missing value', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		const input = page.locator('#star-rating-1');
		const label = await input.getAttribute('aria-label');

		page.fill('#sample-input-min', `Lorem ipsum`);
		page.fill('#sample-text-area', 'Lorem ipsum');

		await submitBtn.click();

		const messageId = (await input.getAttribute('aria-describedby')).split(' ')[0];
		const message = await page.locator(`#${messageId}`);
		expect(message).toContainText(`A selection for "${label}" is required.`);
		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText([`A selection for "${label}" is required.`]);
	});

	test('show youMustSelectBetweenMinAndMaxTags message when number of tags is below min', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		const input = page.locator('#sample-tags');
		const label = await (await page.locator('label[for="sample-tags"]').textContent())
			.trim()
			.toLocaleLowerCase();
		const min = await input.getAttribute('min');
		const max = await input.getAttribute('max');

		page.fill('#sample-input', 'Lorem ipsum');
		page.fill('#sample-text-area', 'Lorem ipsum');

		await submitBtn.click();

		const messageId = (await input.getAttribute('aria-describedby')).split(' ')[0];
		const message = await page.locator(`#${messageId}`);
		expect(message).toContainText(`You must select between ${min} and ${max} ${label}.`);
		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText([`You must select between ${min} and ${max} ${label}.`], {
			useInnerText: true
		});
	});

	test('show youMustSelectBetweenMinAndMaxTags message when number of tags is above max', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		const input = page.locator('#sample-tags');
		const label = await (await page.locator('label[for="sample-tags"]').textContent())
			.trim()
			.toLocaleLowerCase();
		const min = await input.getAttribute('min');
		const max = await input.getAttribute('max');

		page.fill('#sample-input', 'Lorem ipsum');
		page.fill('#sample-text-area', 'Lorem ipsum');

		const addTagsBtn = page.locator('.add-tags-button');
		for (let i = 0; i <= parseInt(max); i++) {
			await addTagsBtn.click();
		}

		await submitBtn.click();

		const messageId = (await input.getAttribute('aria-describedby')).split(' ')[0];
		const message = await page.locator(`#${messageId}`);
		expect(message).toContainText(`You must select between ${min} and ${max} ${label}.`);
		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText([`You must select between ${min} and ${max} ${label}.`], {
			useInnerText: true
		});
	});
});
