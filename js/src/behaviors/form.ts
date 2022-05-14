import { generateElementId } from '../utilities/util';

const defaultLocStrings = `{
	loc_formBehavior_contentHasChanged:
		'Content has changed, please reload the page to get the latest changes.',
	loc_formBehavior_inputMaxLength: '{inputLabel} cannot be longer than {maxLength} characters.',
	loc_formBehavior_inputMinLength: '{inputLabel} must be at least {minLength} characters.',
	loc_formBehavior_inputRequired: '{inputLabel} is required.',
	loc_formBehavior_pleaseFixTheseIssues: 'Please fix these issues:',
	loc_formBehavior_thereAreNoEditsToSubmit: 'There are no edits to submit',
	loc_formBehavior_weEncounteredAnUnexpectedError:
		'We encountered an unexpected error. Please try again later. If this issue continues, please contact site support.',
	loc_youMustSelectBetweenMinAndMaxTags: 'You must select between {min} and {max} {tagLabel}.'
}`;
// <form-behavior>
class FormBehaviorElement extends HTMLElement {
	submitting = false as boolean;
	initialData = new FormData();
	toDispose: (() => void)[] = [];
	isDirty = false;
	commitTimeout = 0;
	locStrings = JSON.parse(this.dataset.locStrings ?? defaultLocStrings) as LocStrings;
	validators: Validator[] = [
		this.validateMinLength.bind(this), // min length before required
		this.validateRequired.bind(this),
		this.validateMaxLength.bind(this),
		this.validateTagSelector.bind(this)
	];

	constructor() {
		super();
		this.locStrings = this.locStrings;
	}

	// use the new attribute when you want to ignore isDirty validation (for example, if the only user action on the form is to click a button)
	get isNew() {
		return this.hasAttribute('new');
	}

	get canSave() {
		return this.isDirty || this.isNew;
	}

	connectedCallback() {
		const form = this.parentElement;
		if (!(form instanceof HTMLFormElement)) {
			return;
		}

		form.setAttribute('novalidate', '');

		this.initialData = new FormData(form);

		if (this.ownerDocument.readyState === 'loading') {
			this.ownerDocument.addEventListener(
				'readystatechange',
				() => (this.initialData = new FormData(form))
			);
		}

		this.subscribe(form, 'input', this);
		this.subscribe(form, 'change', this);
		this.subscribe(form, 'submit', this);
		this.subscribe(window, 'beforeunload', this);
	}

	disconnectedCallback() {
		for (const dispose of this.toDispose) {
			dispose();
		}
	}

	subscribe(target: EventTarget, type: string, listener: EventListenerObject) {
		target.addEventListener(type, listener);
		this.toDispose.push(() => target.removeEventListener(type, listener));
	}

	setDirty() {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const initial = new URLSearchParams(this.initialData as any).toString();
		const current = new URLSearchParams(
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			new FormData(this.parentElement as HTMLFormElement) as any
		).toString();
		this.isDirty = current !== initial;
	}

	handleEvent(event: Event) {
		switch (event.type) {
			case 'submit':
				this.handleSubmitEvent(event);
				break;
			case 'beforeunload':
				this.handleUnloadEvent(event);
				break;
			case 'input':
				this.clearValidationErrors(event.target as HTMLInputElement);
				this.scheduleCommit(event);
				break;
			case 'change':
				this.clearValidationErrors(event.target as HTMLInputElement);
				this.commit(event);
				break;
			default:
				throw new Error(`Unexpected event ${event.type}.`);
		}
	}

	navigate(href: string | null) {
		if (href) {
			navigateAfterSubmit(href, this.getAttribute('navigation'));
		}
	}

	scheduleCommit(event: Event) {
		clearTimeout(this.commitTimeout);
		setTimeout(this.commit, 300, event);
	}

	commit = (event: Event) => {
		if (
			!isValueElement(event.target) ||
			!event.target?.form ||
			event.target?.form !== this.parentElement
		) {
			return;
		}

		clearTimeout(this.commitTimeout);

		if (event.type === 'change') {
			normalizeInputValue(event.target);
		}
		this.setDirty();
	};

	async handleUnloadEvent(event: BeforeUnloadEvent) {
		if (!this.isDirty) {
			return;
		}

		event.preventDefault();
		event.returnValue = 'You have unsaved work.'; // browser overrides this text
	}

	async handleSubmitEvent(event: Event) {
		event.preventDefault();

		if (this.submitting) {
			return;
		}

		const form = event.currentTarget as HTMLFormElement;

		// reject the submit if no edits have been made (overridable with the new attribute)
		if (!this.canSave) {
			this.showNoChangesMessage(form);
			return;
		}

		try {
			this.submitting = true;
			setBusySubmitButton(form, this.submitting);
			const valid = await this.validateForm(
				form,
				undefined,
				undefined,
				collectCustomElementsByName(form)
			);
			if (!valid.valid) {
				return;
			}

			const url = form.action;
			const params = new URL(form.action).searchParams;
			const formData = new FormData(form);
			// set and read headers:
			const headers = new Headers();
			headers.set('content-type', 'application/json');
			for (const { name, value } of this.attributes) {
				if (name.startsWith('header-')) {
					headers.set(name.substring(7), value);
				}
			}

			// form.method does not support PUT or DELETE events, use method queryParam if it exists.
			const method = params.get('_method') || form.method || ('GET' as string);

			const init: RequestInit = {
				method,
				body: JSON.stringify(toObject(formData)),
				headers
			};

			const event = new CustomEvent('beforesubmit', {
				detail: {
					url,
					init,
					form
				},
				bubbles: true,
				cancelable: true
			});

			const canceled = !this.dispatchEvent(event);
			if (canceled) {
				return;
			}

			const request = new Request(event.detail.url, event.detail.init);
			const response = await fetch(request);
			if (response.ok) {
				this.removeAttribute('new');
				this.initialData = formData;
				this.setDirty();

				this.dispatchEvent(
					new CustomEvent('aftersubmit', {
						detail: {
							request,
							response
						},
						bubbles: true
					})
				);
				this.navigate(response.headers.get('location') ?? this.getAttribute('navigation-href'));
			} else {
				const { errorAlert, errorList } = this.getErrorAlert(form);
				const errorText = document.createElement('li');
				errorText.innerText = this.locStrings.loc_formBehavior_weEncounteredAnUnexpectedError;
				// custom text for version mismatch
				if (response.status === 412) {
					errorText.innerText = this.locStrings.loc_formBehavior_contentHasChanged;
				}

				errorList.appendChild(errorText);
				errorAlert.hidden = false;
				errorAlert.focus();
			}
		} finally {
			this.submitting = false;
			setBusySubmitButton(form, this.submitting);
		}
	}

	createErrorAlert(form: HTMLFormElement): {
		errorAlert: HTMLDivElement;
		errorList: HTMLUListElement;
	} {
		const formLayout = form.querySelector('.error-container') || form;
		formLayout.setAttribute('role', 'alert');
		const alertId = generateElementId();

		const errorAlert = document.createElement('div');
		errorAlert.className = 'alert help help-danger border border-color-danger padding-xs';
		errorAlert.setAttribute('role', 'group');
		errorAlert.setAttribute('aria-labelledby', alertId);
		errorAlert.setAttribute('tabindex', '-1');
		errorAlert.hidden = true;

		const alertText = document.createElement('p');
		alertText.id = alertId;
		alertText.className = 'font-size-md font-weight-semibold margin-bottom-xs';
		alertText.innerText = this.locStrings.loc_formBehavior_pleaseFixTheseIssues;

		const errorList = document.createElement('ul');
		errorList.setAttribute('aria-label', 'Validation errors');

		errorAlert.append(alertText, errorList);
		formLayout.appendChild(errorAlert);

		return { errorAlert, errorList };
	}

	getErrorAlert(form: HTMLFormElement) {
		const errorAlert = form.querySelector<HTMLDivElement>('.error-container .alert');
		if (errorAlert) {
			return {
				errorAlert,
				errorList: errorAlert.lastElementChild as HTMLUListElement
			};
		}
		return this.createErrorAlert(form);
	}

	validateRequired(input: HTMLValueElement, label: string): string | null {
		if (input.validity.valueMissing) {
			return `${this.locStrings.loc_formBehavior_inputRequired.replace(
				'{inputLabel}',
				input.localName === 'star-rating' ? `A selection for "${label}"` : label
			)}`;
		}
		return null;
	}

	validateMinLength(input: HTMLValueElement | HTMLInputElement, label: string): string | null {
		if (
			(input instanceof HTMLTextAreaElement || input instanceof HTMLInputElement) &&
			(input.validity.tooShort || (input.minLength > 0 && input.value.length < input.minLength))
		) {
			return `${this.locStrings.loc_formBehavior_inputMinLength
				.replace('{inputLabel}', label)
				.replace('{minLength}', input.minLength.toString())}`;
		}
		return null;
	}

	validateMaxLength(input: HTMLValueElement, label: string): string | null {
		if (
			(input instanceof HTMLTextAreaElement || input instanceof HTMLInputElement) &&
			(input.validity.tooLong || (input.maxLength > 0 && input.value.length > input.maxLength))
		) {
			return `${this.locStrings.loc_formBehavior_inputMaxLength
				.replace('{inputLabel}', label)
				.replace('{maxLength}', input.maxLength.toString())}`;
		}
		return null;
	}

	validateTagSelector(input: HTMLInputElement | HTMLValueElement, label: string): string | null {
		if (input instanceof HTMLInputElement && input.classList.contains('tag-input')) {
			const min = input.getAttribute('minTags');
			const max = input.getAttribute('maxTags');
			const tagCount = input.value === '' ? 0 : input.value.split(',').length;

			// if no min or max, no need to validate
			if (!min || !max) {
				return null;
			}

			if (!tagCount || tagCount < Number(min) || tagCount > Number(max)) {
				return `${this.locStrings.loc_youMustSelectBetweenMinAndMaxTags
					.replace('{min}', min)
					.replace('{max}', max)
					.replace('{tagLabel}', label.toLocaleLowerCase())}`;
			}
			return null;
		}
		return null;
	}

	async validateForm(
		form: HTMLFormElement,
		displayValidity = true,
		scope: Element = form,
		customElements?: Element[]
	): Promise<FormValidationResult> {
		const errors: FormValidationError[] = [];
		const { errorAlert, errorList } = this.getErrorAlert(form);

		if (displayValidity) {
			errorAlert.hidden = true;
			errorList.innerHTML = '';
		}

		if (customElements) {
			for (const input of customElements) {
				if (!scope.contains(input) || !canValidate(input)) {
					continue;
				}
				this.runBasicValidation(input, displayValidity, errors, errorList, false, true);
			}
		}
		for (const input of form.elements) {
			if (input instanceof HTMLButtonElement) {
				continue;
			}

			if (!scope.contains(input) || !canValidate(input)) {
				continue;
			}

			const isTagSelector = input.classList.contains('tag-input');
			if (input.hasAttribute('aria-hidden') && !isTagSelector) {
				continue;
			}

			// Don't check combobox
			if (input.getAttribute('role') === 'combobox') {
				continue;
			}

			// Don't check elements that are part of markdown editor
			if (input.closest('docs-markdown-editor')) {
				continue;
			}

			this.runBasicValidation(input, displayValidity, errors, errorList, isTagSelector, false);
		}

		if (errors.length === 0) {
			return { valid: true };
		}

		if (displayValidity) {
			errorAlert.hidden = false;
			errorAlert.focus();
		}

		return { valid: false, errors };
	}

	clearValidationErrors(target: EventTarget | null) {
		if (!canValidate(target)) {
			return;
		}

		clearInputErrorBorder(target);

		setValidationMessage(target, '');
		getField(target).classList.remove('errored');

		if (target.form) {
			const { errorAlert, errorList } = this.getErrorAlert(target.form);
			errorList.querySelectorAll(`a[href="#${target.id}"]`).forEach(a => a.parentElement?.remove());
			// clear no edits error if it exists as well
			errorList.querySelector('#no-edits-error')?.remove();

			if (!errorList.firstElementChild) {
				errorAlert.hidden = true;
			}
		}
	}

	showNoChangesMessage(form: HTMLFormElement) {
		const { errorAlert, errorList } = this.getErrorAlert(form);
		if (errorList.childElementCount > 0) {
			while (errorList.firstChild) {
				errorList.lastChild?.remove();
			}
			// clear no edits error if it exists as well
			errorList.querySelector('#no-edits-error')?.remove();
		}
		const errorText = document.createElement('li');
		errorText.id = 'no-edits-error';
		errorText.innerText = this.locStrings.loc_formBehavior_thereAreNoEditsToSubmit;

		errorList.appendChild(errorText);
		errorAlert.hidden = false;
		errorAlert.focus();
	}

	runBasicValidation(
		input: Element,
		displayValidity: boolean = true,
		errors: FormValidationError[],
		errorList: HTMLElement,
		isTagSelector: boolean,
		isCustomElement: boolean
	) {
		if (!canValidate(input)) {
			return;
		}

		const label = getLabel(input);
		const group = getField(input);

		if (displayValidity) {
			setValidationMessage(input, '');
			group.classList.remove('errored');
		}

		for (const validator of this.validators) {
			const message = validator(input, label);
			if (!message) {
				if (!isCustomElement) {
					clearInputErrorBorder(input);
				}
				continue;
			}

			errors.push({ input, message });
			if (displayValidity) {
				const inputWithError = isTagSelector
					? input.parentElement?.querySelector('input.autocomplete-input')
					: input;

				if (!inputWithError?.id) {
					continue;
				}

				setValidationMessage(input, message);
				group.classList.add('errored');
				const child = document.createElement('li');
				child.classList.add('margin-bottom-xs', 'font-weight-semibold');

				const a = document.createElement('a');
				a.href = `#${inputWithError.id}`;
				a.textContent = message;
				a.classList.add('help', 'help-danger');

				child.appendChild(a);
				errorList.appendChild(child);

				if (!isCustomElement) {
					if (isTagSelector) {
						input.nextElementSibling?.classList.add('border-color-danger');
					}
					input.classList.add(`${input.localName}-danger`);
				}
			}

			break;
		}
	}
}

declare global {
	interface Window {
		FormBehaviorElement: typeof FormBehaviorElement;
	}
	interface HTMLElementTagNameMap {
		'form-behavior': FormBehaviorElement;
	}
}

if (!window.customElements.get('form-behavior')) {
	window.FormBehaviorElement = FormBehaviorElement;
	window.customElements.define('form-behavior', FormBehaviorElement);
}

// Start <form behavior> Helper functions
interface HTMLValueElement extends HTMLElement {
	form: HTMLFormElement;
	labels: NodeListOf<HTMLLabelElement> | null;
	name: string;
	type: string;
	value: string;
	validity: ValidityState;
}

interface LocStrings {
	loc_formBehavior_contentHasChanged: string;
	loc_formBehavior_inputMaxLength: string;
	loc_formBehavior_inputMinLength: string;
	loc_formBehavior_inputRequired: string;
	loc_formBehavior_pleaseFixTheseIssues: string;
	loc_formBehavior_thereAreNoEditsToSubmit: string;
	loc_formBehavior_weEncounteredAnUnexpectedError: string;
	loc_youMustSelectBetweenMinAndMaxTags: string;
}

// Check if the required value related properties exist rather than an instance of a form related element.
function isValueElement(target: EventTarget | null): target is HTMLValueElement {
	if (target) {
		const element = target as HTMLValueElement;
		return (
			element.value !== undefined &&
			element.validity !== undefined &&
			element.form !== undefined &&
			element.localName !== 'button'
		);
	}
	return false;
}

function normalizeInputValue(target: EventTarget | null) {
	if (target instanceof HTMLTextAreaElement) {
		target.value = target.value.trim();
	} else if (
		target instanceof HTMLInputElement &&
		(target.type === 'text' || target.type === 'email')
	) {
		target.value = target.value.trim();
	}
}

function setBusySubmitButton(form: HTMLFormElement, isLoading: boolean) {
	Array.from(form.elements).forEach(element => {
		if (element instanceof HTMLButtonElement && element.type === 'submit') {
			element.classList.toggle('is-loading', isLoading);
		}
	});
}

function getLabel(input: HTMLValueElement): string {
	const label =
		input.labels && input.labels.length
			? input.labels[0].textContent
			: input.getAttribute('aria-label');
	if (!label) {
		throw new Error(
			`${input.nodeName} name="${input.name}" id="${input.id}" has no associated label.`
		);
	}
	return label.trim();
}

function getField(input: HTMLValueElement) {
	const group = input.closest<HTMLElement>('.field');
	if (!group) {
		throw new Error(
			`${input.nodeName} name="${input.name}" id="${input.id}" is not within a .field`
		);
	}
	return group;
}

function getControl(input: HTMLValueElement) {
	const body = input.closest('.control');
	if (!body) {
		throw new Error(
			`${input.nodeName} name="${input.name}" id="${input.id}" is not within a .control`
		);
	}
	return body;
}

function createErrorNote(input: HTMLValueElement) {
	const note = document.createElement('p');
	note.id = generateElementId();
	input.setAttribute(
		'aria-describedby',
		`${note.id} ${input.getAttribute('aria-describedby') || ''}`
	);
	note.classList.add('help', 'help-danger');
	getControl(input).after(note);
	return note;
}

function setValidationMessage(element: HTMLValueElement, message: string) {
	const group = getField(element);
	const note = group.querySelector('.help.help-danger') || createErrorNote(element);
	note.textContent = message;
}

export interface FormValidationError {
	message: string;
	input: HTMLValueElement;
}

export type FormValidationResult =
	| { valid: true }
	| { valid: false; errors: FormValidationError[] };

type Validator = (input: HTMLValueElement, label: string) => string | null;

function canValidate(target: EventTarget | null): target is HTMLValueElement {
	return isValueElement(target) && (target as HTMLValueElement).type !== 'hidden';
}

/**
 * Convert to an object.
 */
export function toObject<TKey extends string | number | symbol, TValue>(
	formData: FormData
): Record<TKey, TValue> {
	const object = Object.create(null) as Record<TKey, TValue>;
	formData.forEach((value, key) => {
		// @ts-ignore any
		object[key] = value;
	});
	return object;
}

export function navigateAfterSubmit(href: string, navigationStep: string | null) {
	switch (navigationStep) {
		case null:
			// do nothing.
			break;
		case 'follow':
			if (href) {
				location.href = href;
			}
			break;
		case 'replace':
			if (href) {
				location.replace(href);
			}
			break;
		case 'reload':
			location.reload();
			break;
		default:
			throw new Error(`Unexpected navigation attribute value.`);
	}
}

/* Custom elements are not included in HTMLFormControlsCollection so can't be retrieved by form.elements */
export function collectCustomElementsByName(form: HTMLFormElement): Element[] {
	// Compare FormData with form.elements to find missing elements.
	const formData = Object.fromEntries(new FormData(form));
	const formElements = Object.keys(form.elements);
	const customElementList: Element[] = [];
	const customElements = Object.keys(formData).filter(el => formElements.indexOf(el) === -1);
	customElements.forEach(name => {
		const element = form.querySelector(`[name="${name}"]`);
		if (element) {
			customElementList.push(element);
		}
	});
	return customElementList;
}

function clearInputErrorBorder(input: HTMLValueElement) {
	const isTagSelector = input.classList.contains('tag-input');
	if (isTagSelector) {
		input.nextElementSibling?.classList.remove('border-color-danger');
	}
	input.classList.remove(`${input.localName}-danger`);
}
