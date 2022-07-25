import { generateElementId, kebabToCamelCase } from '../utilities/util';

const defaultMessageStrings = {
	contentHasChanged: 'Content has changed, please reload the page to get the latest changes.',
	inputMaxLength: '{inputLabel} cannot be longer than {maxLength} characters.',
	inputMinLength: '{inputLabel} must be at least {minLength} characters.',
	inputRequired: '{inputLabel} is required.',
	pleaseFixTheFollowingIssues: 'Please fix the following issues to continue:',
	thereAreNoEditsToSubmit: 'There are no edits to submit.',
	weEncounteredAnUnexpectedError:
		'We encountered an unexpected error. Please try again later. If this issue continues, please contact site support.',
	youMustSelectBetweenMinAndMaxTags: 'You must select between {min} and {max} {tagLabel}.'
};
// <form-behavior>
class FormBehaviorElement extends HTMLElement {
	submitting = false as boolean;
	initialData = new FormData();
	toDispose: (() => void)[] = [];
	isDirty = false;
	commitTimeout = 0;
	locStrings = Object.assign(
		{},
		defaultMessageStrings,
		Array.from(this.attributes)
			.filter(a => a.name.startsWith('loc-'))
			.reduce((map: { [key: string]: string }, a) => {
				map[kebabToCamelCase(a.name.substring(4)) as keyof LocStrings] = a.value;
				return map;
			}, {})
	);

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

	get form() {
		return this.closest(`form`);
	}

	connectedCallback() {
		const form = this.parentElement;
		if (!(form instanceof HTMLFormElement)) {
			return;
		}

		form.setAttribute('novalidate', '');
		const errorSummaryContainer = document.createElement('div');
		errorSummaryContainer.classList.add('form-error-container', 'margin-bottom-sm');
		this.insertAdjacentElement('afterend', errorSummaryContainer);

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
			navigateAfterSubmit(href, this.getAttribute('navigation') as NavigationSteps);
		}
	}

	scheduleCommit(event: Event) {
		clearTimeout(this.commitTimeout);
		setTimeout(this.commit, 300, event);
	}

	commit = (event: Event) => {
		if (
			!isValueElement(event.target, this.form) ||
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
		this.setDirty();
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
		const validationErrorEvent = new CustomEvent('validationerror', {
			bubbles: true,
			cancelable: true
		});

		// reject the submit if no edits have been made (overridable with the new attribute)
		if (!this.canSave) {
			this.showNoChangesMessage(form);
			this.dispatchEvent(validationErrorEvent);
			return;
		}

		try {
			this.submitting = true;
			setBusySubmitButton(form, this.submitting);
			const valid = await this.validateForm(form);
			if (!valid.valid) {
				this.dispatchEvent(validationErrorEvent);
				return;
			}

			const url = handleSubmitButtonAction(event) ?? form.action;
			const params = new URL(url).searchParams;
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
				body: JSON.stringify(Object.fromEntries(formData)),
				headers
			};

			const beforeSubmitEvent = new CustomEvent('beforesubmit', {
				detail: {
					url,
					init,
					form
				},
				bubbles: true,
				cancelable: true
			});

			const cancelled = !this.dispatchEvent(beforeSubmitEvent);
			if (cancelled) {
				return;
			}

			const request = new Request(beforeSubmitEvent.detail.url, beforeSubmitEvent.detail.init);
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
				errorText.innerText = this.locStrings.weEncounteredAnUnexpectedError;
				// custom text for version mismatch
				if (response.status === 412) {
					errorText.innerText = this.locStrings.contentHasChanged;
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
		const formLayout = form.querySelector('.form-error-container') || form;
		const alertId = generateElementId();

		const errorAlert = document.createElement('div');
		errorAlert.className =
			'alert help help-danger border border-color-danger border-radius padding-xs';
		errorAlert.setAttribute('role', 'alert');
		errorAlert.setAttribute('aria-labelledby', alertId);
		errorAlert.setAttribute('tabindex', '-1');
		errorAlert.hidden = true;

		const alertText = document.createElement('p');
		alertText.id = alertId;
		alertText.className = 'font-size-md font-weight-semibold margin-bottom-xs display-inline-flex';
		alertText.innerText = this.locStrings.pleaseFixTheFollowingIssues;

		const errorList = document.createElement('ul');
		errorList.setAttribute('aria-label', 'Validation errors');
		errorList.classList.add('margin-left-sm-tablet');

		errorAlert.append(alertText, errorList);
		formLayout.appendChild(errorAlert);

		return { errorAlert, errorList };
	}

	getErrorAlert(form: HTMLFormElement) {
		const errorAlert = form.querySelector<HTMLDivElement>('.form-error-container .alert');
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
			return `${this.locStrings.inputRequired.replace(
				'{inputLabel}',
				customElements.get(input.localName) ? `A selection for "${label}"` : label
			)}`;
		}
		return null;
	}

	validateMinLength(input: HTMLValueElement | HTMLInputElement, label: string): string | null {
		if (
			(input instanceof HTMLTextAreaElement || input instanceof HTMLInputElement) &&
			(input.validity.tooShort || (input.minLength > 0 && input.value.length < input.minLength))
		) {
			return `${this.locStrings.inputMinLength
				.replace('{inputLabel}', label)
				.replace('{minLength}', input.minLength.toString())}`;
		}
		return null;
	}

	validateMaxLength(input: HTMLValueElement, label: string): string | null {
		if (
			(input instanceof HTMLTextAreaElement || input instanceof HTMLInputElement) &&
			(input.validity.tooLong ||
				(input.maxLength > 0 && input.value.length > input.maxLength) ||
				input.value.length > 255)
		) {
			return `${this.locStrings.inputMaxLength
				.replace('{inputLabel}', label)
				.replace('{maxLength}', input.maxLength > 0 ? input.maxLength.toString() : '255')}`;
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
				return `${this.locStrings.youMustSelectBetweenMinAndMaxTags
					.replace('{min}', min)
					.replace('{max}', max)
					.replace('{tagLabel}', label.toLocaleLowerCase())}`;
			}
		}
		return null;
	}

	async validateForm(
		form: HTMLFormElement,
		displayValidity = true,
		scope: Element = form
	): Promise<FormValidationResult> {
		const errors: FormValidationError[] = [];
		const { errorAlert, errorList } = this.getErrorAlert(form);

		if (displayValidity) {
			errorAlert.hidden = true;
			errorList.innerHTML = '';
		}

		const customElements = collectCustomElementsByName(form);
		for (const input of [...form.elements, ...customElements]) {
			if (!scope.contains(input) || !canValidate(input, form)) {
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

			const isCustomElement = !!customElements.find(el => el === input);

			this.runBasicValidation(
				input,
				displayValidity,
				errors,
				errorList,
				isTagSelector,
				isCustomElement
			);
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
		if (!canValidate(target, this.form)) {
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
		errorText.innerText = this.locStrings.thereAreNoEditsToSubmit;

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
		if (!canValidate(input, this.form)) {
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
				const inputId = isTagSelector
					? input.parentElement?.querySelector('input.autocomplete-input')?.id
					: input.id;

				if (!inputId) {
					continue;
				}

				setValidationMessage(input, message);
				group.classList.add('errored');
				const child = document.createElement('li');
				child.classList.add('margin-bottom-xs');

				const a = document.createElement('a');
				a.href = `#${inputId}`;
				a.textContent = message;
				a.classList.add('help', 'help-danger');

				// ensure focus is set on the custom element
				a.addEventListener('click', e => {
					if (isCustomElement) {
						const target = (e.target as HTMLAnchorElement).getAttribute('href');
						if (target) {
							(document.querySelector(target) as HTMLElement).focus();
						}
					}
				});

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
	contentHasChanged: string;
	inputMaxLength: string;
	inputMinLength: string;
	inputRequired: string;
	pleaseFixTheFollowingIssues: string;
	thereAreNoEditsToSubmit: string;
	weEncounteredAnUnexpectedError: string;
	youMustSelectBetweenMinAndMaxTags: string;
}

export type NavigationSteps = 'follow' | 'hash-reload' | 'replace' | 'reload' | null;

export interface FormValidationError {
	message: string;
	input: HTMLValueElement;
}

export type FormValidationResult =
	| { valid: true }
	| { valid: false; errors: FormValidationError[] };

type Validator = (input: HTMLValueElement, label: string) => string | null;

// Check if the required value related properties exist rather than an instance of a form related element.
function isValueElement(
	target: EventTarget | null,
	form: HTMLFormElement | null
): target is HTMLValueElement {
	const element = target as HTMLInputElement;
	if (element) {
		return (
			element instanceof HTMLElement &&
			'form' in element &&
			element.form === form &&
			'validity' in element &&
			element.validity instanceof ValidityState &&
			'value' in element &&
			typeof element.value === 'string' &&
			'type' in element &&
			typeof element.type === 'string' &&
			!['button', 'submit'].includes(element.type)
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

function getFieldBody(input: HTMLValueElement) {
	const body = input.closest('.field-body');
	if (!body) {
		throw new Error(
			`${input.nodeName} name="${input.name}" id="${input.id}" is not within a .field-body`
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
	note.classList.add('field-error');
	getFieldBody(input).after(note);
	return note;
}

function setValidationMessage(element: HTMLValueElement, message: string) {
	const group = getField(element);
	const note = group.querySelector('.field-error') || createErrorNote(element);
	note.textContent = message;
}

function canValidate(
	target: EventTarget | null,
	form: HTMLFormElement | null
): target is HTMLValueElement {
	return isValueElement(target, form) && (target as HTMLValueElement).type !== 'hidden';
}

export function navigateAfterSubmit(href: string, navigationStep: NavigationSteps) {
	switch (navigationStep) {
		case null:
			// do nothing.
			break;
		case 'follow':
			if (href) {
				location.href = href;
			}
			break;
		case 'hash-reload':
			if (href) {
				const search = href.includes('?') ? '' : window.location.search;
				if (href !== search + window.location.hash) {
					const state = (history.state || {}) as Record<string, any>;
					window.history.pushState(state, document.title, window.location.pathname + search + href); // prevents scrolling to spot until reload
				}
				location.reload();
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

/* Custom elements are not included in HTMLFormControlsCollection so they can't be retrieved by form.elements */
export function collectCustomElementsByName(form: HTMLFormElement): Element[] {
	// Compare FormData with form.elements to find missing elements.
	const formData = Object.fromEntries(new FormData(form));
	const customElementList: Element[] = [];
	const customElements = Object.keys(formData).filter(key => {
		return !form.elements.namedItem(key);
	});

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

function handleSubmitButtonAction(event: Event) {
	const submitter = (event as SubmitEvent).submitter;
	const formAction =
		submitter instanceof HTMLButtonElement && submitter.formAction ? submitter.formAction : null;

	return formAction;
}
