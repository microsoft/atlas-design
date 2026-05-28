import AxeBuilder from '@axe-core/playwright';
import { test as base, expect } from '@playwright/test';
import type { Locator } from '@playwright/test';
interface FormBehaviorFixtures {
	errorContainer: Locator;
	submitBtn: Locator;
}

// form validation fixture
export const test = base.extend<FormBehaviorFixtures>({
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

test.describe('form behavior - submission error handling', () => {
	// Helper to fill form with valid data using JavaScript
	async function fillFormWithValidData(page: any) {
		await page.evaluate(() => {
			(document.querySelector('#sample-form-complex') as HTMLFormElement)?.setAttribute(
				'data-test-allow-default-action',
				''
			);
			(document.querySelector('#sample-input') as HTMLInputElement).value = 'Test Input';
			(document.querySelector('#sample-input-min') as HTMLInputElement).value = 'Lorem ipsum';
			(document.querySelector('#sample-text-area') as HTMLTextAreaElement).value =
				'Lorem ipsum dolor sit amet';
			(document.querySelector('#question-id-1') as HTMLInputElement).checked = true;
			(document.querySelector('#sample-checkbox') as HTMLInputElement).checked = true;
			(document.querySelector('#sample-multi-checkbox-2') as HTMLInputElement).checked = true;
		});
	}

	test('show notAuthenticated message when form action returns 401', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		await fillFormWithValidData(page);

		// Intercept fetch and return 401 response
		await page.route('**/*', route => {
			if (route.request().method() === 'POST') {
				route.fulfill({
					status: 401,
					body: JSON.stringify({ error: 'Unauthorized' })
				});
				return;
			}
			route.continue();
		});

		await submitBtn.click();

		expect(errorContainer).toBeVisible();
		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText('You are not authenticated');
	});

	test('show notAuthorized message when form action returns 403', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		await fillFormWithValidData(page);

		await page.route('**/*', route => {
			if (route.request().method() === 'POST') {
				route.fulfill({
					status: 403,
					body: JSON.stringify({ error: 'Forbidden' })
				});
				return;
			}
			route.continue();
		});

		await submitBtn.click();

		expect(errorContainer).toBeVisible();
		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText('You are not authorized');
	});

	test('show contentHasChanged message when form action returns 412', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		await fillFormWithValidData(page);

		await page.route('**/*', route => {
			if (route.request().method() === 'POST') {
				route.fulfill({
					status: 412,
					body: JSON.stringify({ error: 'Precondition Failed' })
				});
				return;
			}
			route.continue();
		});

		await submitBtn.click();

		expect(errorContainer).toBeVisible();
		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText('Content has changed');
	});

	test('show tooManyRequests message when form action returns 429', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		await fillFormWithValidData(page);

		await page.route('**/*', route => {
			if (route.request().method() === 'POST') {
				route.fulfill({
					status: 429,
					body: JSON.stringify({ error: 'Too Many Requests' })
				});
				return;
			}
			route.continue();
		});

		await submitBtn.click();

		expect(errorContainer).toBeVisible();
		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText('too many requests');
	});

	test('show generic error message for other error responses', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		await fillFormWithValidData(page);

		await page.route('**/*', route => {
			if (route.request().method() === 'POST') {
				route.fulfill({
					status: 500,
					body: JSON.stringify({ error: 'Internal Server Error' })
				});
				return;
			}
			route.continue();
		});

		await submitBtn.click();

		expect(errorContainer).toBeVisible();
		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText('We encountered an unexpected error');
	});

	test('show generic error message when fetch throws an error', async ({
		page,
		errorContainer,
		submitBtn
	}) => {
		await fillFormWithValidData(page);

		// Mock fetch to throw an error
		await page.route('**/*', route => {
			if (route.request().method() === 'POST') {
				route.abort('failed');
				return;
			}
			route.continue();
		});

		await submitBtn.click();

		expect(errorContainer).toBeVisible();
		expect(errorContainer).toContainText('Please fix the following issues to continue:');
		expect(errorContainer).toContainText('We encountered an unexpected error');
	});

	test('dispatch submission-error event on failed response', async ({ page, submitBtn }) => {
		await fillFormWithValidData(page);

		// Listen for submission-error event
		const submissionErrorPromise = page.evaluate(() => {
			return new Promise(resolve => {
				document.querySelector('form-behavior')?.addEventListener('submission-error', (e: any) => {
					resolve({
						hasRequest: !!e.detail.request,
						hasResponse: !!e.detail.response,
						hasForm: !!e.detail.form
					});
				});
			});
		});

		await page.route('**/*', route => {
			if (route.request().method() === 'POST') {
				route.fulfill({
					status: 400,
					body: JSON.stringify({ error: 'Bad Request' })
				});
				return;
			}
			route.continue();
		});

		await submitBtn.click();

		const eventDetail = await submissionErrorPromise;
		expect(eventDetail).toEqual({ hasRequest: true, hasResponse: true, hasForm: true });
	});

	test('dispatch submission-error event on network error', async ({ page, submitBtn }) => {
		await fillFormWithValidData(page);

		// Listen for submission-error event
		const submissionErrorPromise = page.evaluate(() => {
			return new Promise(resolve => {
				document.querySelector('form-behavior')?.addEventListener('submission-error', (e: any) => {
					resolve({
						hasRequest: !!e.detail.request,
						hasResponse: !!e.detail.response,
						hasForm: !!e.detail.form
					});
				});
			});
		});

		await page.route('**/*', route => {
			if (route.request().method() === 'POST') {
				route.abort('failed');
				return;
			}
			route.continue();
		});

		await submitBtn.click();

		const eventDetail = await submissionErrorPromise;
		expect(eventDetail).toEqual({ hasRequest: true, hasResponse: false, hasForm: true });
	});
});
