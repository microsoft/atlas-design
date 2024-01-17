import { generateElementId, kebabToCamelCase } from '../utilities/util';

export const defaultMessageStrings = {
	contentHasChanged: 'Content has changed, please reload the page to get the latest changes.',
	inputMaxLength: '{inputLabel} cannot be longer than {maxLength} characters.',
	inputMinLength: '{inputLabel} must be at least {minLength} characters.',
	inputRequired: '{inputLabel} is required.',
	notAuthenticated:
		'You are not authenticated. Please refresh the page and try again. If this issue persists, please log out and log back in.',
	notAuthorized:
		'You are not authorized to make this response. If you believe this to be in error, please refresh the page and try again.',
	pleaseFixTheFollowingIssues: 'Please fix the following issues to continue:',
	thereAreNoEditsToSubmit: 'There are no edits to submit.',
	tooManyRequests: 'You have sent too many requests. Please wait a few minutes and try again.',
	weEncounteredAnUnexpectedError:
		'We encountered an unexpected error. Please try again later. If this issue continues, please contact site support.'
};
// <form-behavior>
export class FormBehaviorElement extends HTMLElement {
	submitting = false as boolean;
	initialData = new FormData();
	toDispose: (() => void)[] = [];
	isDirty = false;
	commitTimeout = 0;
	locStrings = defaultMessageStrings;

	validators: Validator[] = [
		this.validateMinLength.bind(this), // min length before required
		this.validateRequired.bind(this),
		this.validateMaxLength.bind(this)
	];

	constructor() {
		super();
		this.locStrings = this.locStrings;
	}

	get canSave() {
		return this.isDirty || this.isNew;
	}

	get form() {
		return this.closest(`form`);
	}

	// disable browser message when leaving page
	get hideUnloadMessage() {
		return this.hasAttribute('nounload');
	}

	// use the new attribute when you want to ignore isDirty validation (for example, if the only user action on the form is to click a button)
	get isNew() {
		return this.hasAttribute('new');
	}

	// Currently only used for Feedback form-behavior.
	// Use the `nosubmit` attibute to bypass automatic form submission if a form contains a body but does not need to send a POST request.
	get noSubmit() {
		return this.hasAttribute('nosubmit');
	}

	connectedCallback() {
		const form = this.parentElement;
		if (!(form instanceof HTMLFormElement)) {
			return;
		}

		this.locStrings = this.getLocaleStrings();
		form.setAttribute('novalidate', '');
		const errorSummaryContainer = document.createElement('div');
		errorSummaryContainer.setAttribute('data-form-error-container', '');
		if (form.hasAttribute('data-hide-validation-banner')) {
			errorSummaryContainer.hidden = true;
		}
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

	getLocaleStrings() {
		const formLocaleStrings = Array.from(this.attributes)
			.filter(a => a.name.startsWith('loc-'))
			.reduce((map: { [key: string]: string }, a) => {
				map[kebabToCamelCase(a.name.substring(4)) as keyof LocStrings] = a.value;
				return map;
			}, {});

		return Object.assign({}, defaultMessageStrings, formLocaleStrings);
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
		const navigate = navigateAfterSubmit(href, this.getAttribute('navigation') as NavigationSteps);
		return navigate;
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
		if (!this.isDirty || this.hideUnloadMessage) {
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
			const validationErrorEvent = new CustomEvent('form-validating', {
				detail: {
					form
				},
				bubbles: true
			});
			this.dispatchEvent(validationErrorEvent);
			return;
		}
		let isNavigating = false;
		try {
			this.submitting = true;
			setBusySubmitButton(event, form, this.submitting);
			const result = await this.validateForm(form);
			if (!result.valid || this.noSubmit) {
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
					form,
					callback: async () => {}
				},
				bubbles: true,
				cancelable: true
			});

			const cancelled = !this.dispatchEvent(beforeSubmitEvent);
			if (beforeSubmitEvent.detail.callback) {
				try {
					await beforeSubmitEvent.detail.callback();
				} catch (error) {
					// on error return and allow for custom error handling
					return;
				}
			}

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
				isNavigating = this.navigate(
					response.headers.get('location') ?? this.getAttribute('navigation-href')
				);
			} else {
				const { errorAlert, errorList } = this.getErrorAlert(form);
				const errorText = document.createElement('li');
				errorText.innerText = this.locStrings.weEncounteredAnUnexpectedError;
				// custom text for version mismatch
				if (response.status === 401) {
					errorText.innerText = this.locStrings.notAuthenticated;
				}
				if (response.status === 403) {
					errorText.innerText = this.locStrings.notAuthorized;
				}
				if (response.status === 412) {
					errorText.innerText = this.locStrings.contentHasChanged;
				}
				if (response.status === 429) {
					errorText.innerText = this.locStrings.tooManyRequests;
				}
				this.dispatchEvent(
					new CustomEvent('submission-error', {
						detail: {
							form,
							request,
							response
						},
						bubbles: true
					})
				);

				errorList.appendChild(errorText);
				errorAlert.hidden = false;
				errorAlert.focus();
			}
		} finally {
			this.submitting = isNavigating;
			setBusySubmitButton(event, form, this.submitting);
		}
	}

	createErrorAlert(form: HTMLFormElement): {
		errorAlert: HTMLDivElement;
		errorList: HTMLUListElement;
	} {
		const formLayout = form.querySelector('[data-form-error-container]') || form;
		const alertId = generateElementId();

		const errorAlert = document.createElement('div');
		errorAlert.className =
			'help help-danger background-color-danger-light border border-color-danger border-radius padding-xs margin-bottom-sm';
		errorAlert.setAttribute('data-form-error-alert', '');
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
		const errorAlert = form.querySelector<HTMLDivElement>('[data-form-error-alert]');
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
			(input.validity.tooLong || (input.maxLength > 0 && input.value.length > input.maxLength))
		) {
			return `${this.locStrings.inputMaxLength
				.replace('{inputLabel}', label)
				.replace('{maxLength}', input.maxLength.toString())}`;
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

		if (displayValidity || form.hasAttribute('data-hide-validation-banner')) {
			errorAlert.hidden = true;
			errorList.innerHTML = '';
		}

		const customElements = collectCustomElementsByName(form);
		for (const input of [...form.elements, ...customElements]) {
			if (!scope.contains(input) || !canValidate(input, form)) {
				continue;
			}

			if (input.hasAttribute('aria-hidden') === true) {
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

			if (input.hasAttribute('data-skip-validation')) {
				const validationErrorEvent = new CustomEvent('form-validating', {
					detail: {
						errors,
						form
					},
					bubbles: true
				});
				this.dispatchEvent(validationErrorEvent);
				continue;
			}

			const isCustomElement = !!customElements.find(el => el === input);
			this.runBasicValidation(input, displayValidity, errors, errorList, isCustomElement);
			const validationErrorEvent = new CustomEvent('form-validating', {
				detail: {
					errors,
					form
				},
				bubbles: true
			});
			this.dispatchEvent(validationErrorEvent);
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

		const clearValidationEvent = new CustomEvent('clear-validation-errors', {
			detail: {
				target
			},
			bubbles: true
		});
		this.dispatchEvent(clearValidationEvent);
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
				if (!input.id) {
					continue;
				}

				setValidationMessage(input, message);
				group.classList.add('errored');
				const child = document.createElement('li');
				child.classList.add('margin-bottom-xs');

				const a = document.createElement('a');
				a.href = `#${input.id}`;
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
					if (input.type === 'checkbox') {
						input.closest('label.checkbox')?.classList.add(`is-invalid`);
					} else {
						input.classList.add(`${input.localName}-danger`);
					}
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
export interface HTMLValueElement extends HTMLElement {
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
	notAuthenticated: string;
	notAuthorized: string;
	pleaseFixTheFollowingIssues: string;
	thereAreNoEditsToSubmit: string;
	tooManyRequests: string;
	weEncounteredAnUnexpectedError: string;
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

function setBusySubmitButton(event: Event, form: HTMLFormElement, isLoading: boolean) {
	const submitter = (event as SubmitEvent).submitter;
	Array.from(form.elements).forEach(element => {
		if (element instanceof HTMLButtonElement && element.type === 'submit') {
			if (submitter && submitter === element) {
				element.classList.toggle('is-loading', isLoading);
			} else {
				element.disabled = isLoading;
			}
		}
	});
}

export function getLabel(input: HTMLValueElement): string {
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

export function getField(input: HTMLValueElement) {
	const group = input.closest<HTMLElement>('.field');
	if (!group) {
		throw new Error(
			`${input.nodeName} name="${input.name}" id="${input.id}" is not within a .field`
		);
	}
	return group;
}

export function getFieldBody(input: HTMLValueElement) {
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
	note.setAttribute('data-field-error', '');
	getFieldBody(input).after(note);
	return note;
}

export function setValidationMessage(element: HTMLValueElement, message: string) {
	const group = getField(element);
	const note = group.querySelector('[data-field-error]') || createErrorNote(element);
	note.textContent = message;
}

function canValidate(
	target: EventTarget | null,
	form: HTMLFormElement | null
): target is HTMLValueElement {
	return isValueElement(target, form) && (target as HTMLValueElement).type !== 'hidden';
}

export function navigateAfterSubmit(href: string | null, navigationStep: NavigationSteps) {
	switch (navigationStep) {
		case null:
			// do nothing.
			return false;
		case 'follow':
			if (href) {
				location.href = href;
				return true;
			}
			return false;
		case 'hash-reload':
			if (href) {
				const search = href.includes('?') ? '' : window.location.search;
				if (href !== search + window.location.hash) {
					const state = (history.state || {}) as Record<string, any>;
					window.history.pushState(state, document.title, window.location.pathname + search + href); // prevents scrolling to spot until reload
				}
				location.reload();
				return true;
			}
			return false;
		case 'replace':
			if (href) {
				location.replace(href);
				return true;
			}
			return false;
		case 'reload':
			location.reload();
			return true;
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
	if (input.type === 'checkbox') {
		input.closest('label.checkbox')?.classList.remove(`is-invalid`);
	} else {
		input.classList.remove(`${input.localName}-danger`);
	}
}

function handleSubmitButtonAction(event: Event) {
	const submitter = (event as SubmitEvent).submitter;
	const formAction =
		submitter instanceof HTMLButtonElement && submitter.formAction !== window.location.href
			? submitter.formAction
			: null;

	return formAction;
}
