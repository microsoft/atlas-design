import AxeBuilder from '@axe-core/playwright';
import { test as base, expect } from '@playwright/test';

// form validation fixture
export const test = base.extend({
	page: async ({ page }, use) => {
		await page.goto('/components/form.html');
		await use(page);
	},
	errorContainer: async ({ page }, use) => {
		const errorContainer = await page.locator('#sample-form-complex [data-form-error-container]');
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
		const describedBy = await input.getAttribute('aria-describedby');
		if (!describedBy) {
			test.fail();
			return;
		}
		const messageId = describedBy.split(' ')[0];

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

		const describedBy = await input.getAttribute('aria-describedby');
		if (!describedBy) {
			test.fail();
			return;
		}
		const messageId = describedBy.split(' ')[0];
		const message = await page.locator(`#${messageId}`);
		expect(message).toContainText(`${label} is required.`);
		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText([`${label} is required.`]);
	});

	test('show required message with label from legend when radio group is missing a selection', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		const input = await page.locator('#question-id-1');
		const inputField = page.locator('fieldset', { has: input });
		const groupLabel = inputField.locator('legend');
		const label = (await groupLabel.textContent())?.trim();

		await submitBtn.click();

		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText([`A selection for "${label}" is required.`]);
	});

	test('show required message with label from aria-label when radio group is missing a selection', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		const input = await page.locator('#question-id-1');
		const inputField = page.locator('fieldset', { has: input });

		// remove legend from inputField
		const inputLabel = inputField.locator('legend');
		inputLabel.evaluate(el => el.remove());
		const label = await input.getAttribute('aria-label');

		await submitBtn.click();

		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText([`A selection for "${label}" is required.`]);
	});

	// Checkbox
	test('show inputGroupRequired field label message when checkbox group is missing a aria-label', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		const inputLabel = page.locator('label', { has: page.locator('#sample-checkbox') });
		const label = (await inputLabel.textContent())?.trim();

		await submitBtn.click();

		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText([`${label} is required.`]);
	});

	test('show inputGroupRequired message when checkbox group is missing a selection', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		const input = page.locator('#sample-multi-checkbox-2');
		const groupLabel = await input.getAttribute('aria-label');

		await submitBtn.click();

		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText([`${groupLabel} is required.`]);
	});

	test('show thereAreNoEditsToSubmit message when no edits are made on the form', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		await page.$eval('form-behavior', el => el.removeAttribute('new'));
		await submitBtn.click();

		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText(['There are no edits to submit.']);
	});

	test('axe finds no accessibility issues after form behavior validation has been triggered @accessibility', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		page.fill('#sample-input-min', `Lorem ipsum`);
		page.fill('#sample-text-area', 'Lorem ipsum');

		await submitBtn.click();

		// testing of what is displayed is carried out in previous tests
		// now we just have to run against the elements that have appeared
		const accessibilityScanResults = await new AxeBuilder({ page })
			.include('#sample-form-complex [data-form-error-container]')
			.analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});
