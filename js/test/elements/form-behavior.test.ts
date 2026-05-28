import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
	collectCustomElementsByName,
	defaultMessageStrings,
	FormBehaviorElement,
	getField,
	getFieldBody,
	getLabel,
	HTMLValueElement,
	navigateAfterSubmit,
	setValidationMessage
} from '../../src/elements/form-behavior';

/* -------------------------------------------------------------------------- */
/* Test helpers                                                               */
/*                                                                            */
/* `form-behavior` registers a `<form-behavior>` custom element at import     */
/* time. We exercise it as a real DOM element, building small but valid       */
/* fixtures so each test reads like a black-box description of the behavior.  */
/* -------------------------------------------------------------------------- */

function makeForm(innerHTML: string): {
	form: HTMLFormElement;
	behavior: FormBehaviorElement;
} {
	const form = document.createElement('form');
	form.action = 'https://example.test/submit';
	form.innerHTML = `
		<form-behavior></form-behavior>
		${innerHTML}
	`;
	document.body.appendChild(form);
	const behavior = form.querySelector('form-behavior') as FormBehaviorElement;
	return { form, behavior };
}

beforeEach(() => {
	document.body.innerHTML = '';
});

afterEach(() => {
	document.body.innerHTML = '';
});

/* -------------------------------------------------------------------------- */
/* defaultMessageStrings                                                      */
/* -------------------------------------------------------------------------- */

describe('defaultMessageStrings', () => {
	it('exposes every localization key the validators rely on [ai generated]', () => {
		expect(defaultMessageStrings.inputRequired).toMatch('{inputLabel}');
		expect(defaultMessageStrings.inputMinLength).toMatch('{inputLabel}');
		expect(defaultMessageStrings.inputMinLength).toMatch('{minLength}');
		expect(defaultMessageStrings.inputMaxLength).toMatch('{inputLabel}');
		expect(defaultMessageStrings.inputMaxLength).toMatch('{maxLength}');
		expect(typeof defaultMessageStrings.weEncounteredAnUnexpectedError).toBe('string');
		expect(typeof defaultMessageStrings.thereAreNoEditsToSubmit).toBe('string');
	});
});

/* -------------------------------------------------------------------------- */
/* navigateAfterSubmit (pure-ish helper)                                      */
/* -------------------------------------------------------------------------- */

describe('navigateAfterSubmit', () => {
	let originalLocation: Location;
	beforeEach(() => {
		originalLocation = window.location;
		const fakeLocation = {
			href: 'https://example.test/',
			pathname: '/',
			search: '',
			hash: '',
			assign: vi.fn(),
			replace: vi.fn(),
			reload: vi.fn()
		};
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: fakeLocation,
			writable: true
		});
	});
	afterEach(() => {
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: originalLocation,
			writable: true
		});
	});

	it('returns false and does nothing when navigationStep is null [ai generated]', () => {
		expect(navigateAfterSubmit('/next', null)).toBe(false);
		expect(window.location.assign as ReturnType<typeof vi.fn>).not.toHaveBeenCalled();
	});

	it('"follow" sets location.href and returns true when href is provided [ai generated]', () => {
		expect(navigateAfterSubmit('/next', 'follow')).toBe(true);
		expect(window.location.href).toBe('/next');
	});

	it('"follow" returns false when no href is provided [ai generated]', () => {
		expect(navigateAfterSubmit(null, 'follow')).toBe(false);
	});

	it('"replace" calls location.replace with href and returns true [ai generated]', () => {
		expect(navigateAfterSubmit('/somewhere', 'replace')).toBe(true);
		expect(window.location.replace).toHaveBeenCalledWith('/somewhere');
	});

	it('"replace" returns false when no href is provided [ai generated]', () => {
		expect(navigateAfterSubmit(null, 'replace')).toBe(false);
		expect(window.location.replace).not.toHaveBeenCalled();
	});

	it('"reload" calls location.reload and returns true regardless of href [ai generated]', () => {
		expect(navigateAfterSubmit(null, 'reload')).toBe(true);
		expect(window.location.reload).toHaveBeenCalledTimes(1);
	});

	it('"hash-reload" pushes history state, then reloads when href is provided [ai generated]', () => {
		const pushSpy = vi.spyOn(window.history, 'pushState').mockImplementation(() => {});
		try {
			expect(navigateAfterSubmit('#section', 'hash-reload')).toBe(true);
			expect(pushSpy).toHaveBeenCalledTimes(1);
			expect(window.location.reload).toHaveBeenCalledTimes(1);
		} finally {
			pushSpy.mockRestore();
		}
	});

	it('"hash-reload" returns false when no href is provided [ai generated]', () => {
		expect(navigateAfterSubmit(null, 'hash-reload')).toBe(false);
		expect(window.location.reload).not.toHaveBeenCalled();
	});

	it('throws on an unexpected navigationStep value [ai generated]', () => {
		expect(() => navigateAfterSubmit('/any', 'mystery' as unknown as null)).toThrow(
			/Unexpected navigation attribute/
		);
	});
});

/* -------------------------------------------------------------------------- */
/* DOM-bound helpers                                                          */
/* -------------------------------------------------------------------------- */

describe('getLabel', () => {
	it('returns the trimmed label text when an input has a <label> [ai generated]', () => {
		const { form } = makeForm(`
			<div class="field">
				<div class="field-body">
					<label for="name">  First name </label>
					<input id="name" name="name" type="text" />
				</div>
			</div>
		`);
		const input = form.querySelector('#name') as HTMLValueElement;
		expect(getLabel(input)).toBe('First name');
	});

	it('falls back to aria-label when no <label> is associated [ai generated]', () => {
		const { form } = makeForm(`
			<div class="field">
				<div class="field-body">
					<input id="email" name="email" type="text" aria-label="Email" />
				</div>
			</div>
		`);
		const input = form.querySelector('#email') as HTMLValueElement;
		expect(getLabel(input)).toBe('Email');
	});

	it('throws when no label can be resolved [ai generated]', () => {
		const { form } = makeForm(`
			<div class="field">
				<div class="field-body">
					<input id="anon" name="anon" type="text" />
				</div>
			</div>
		`);
		const input = form.querySelector('#anon') as HTMLValueElement;
		expect(() => getLabel(input)).toThrow(/has no associated label/);
	});

	it('reads the group label for a radio button [ai generated]', () => {
		const { form } = makeForm(`
			<div class="field">
				<div class="field-label">Color</div>
				<div class="field-body">
					<input id="r1" type="radio" name="color" value="red" />
				</div>
			</div>
		`);
		const radio = form.querySelector('#r1') as HTMLValueElement;
		expect(getLabel(radio)).toBe('Color');
	});

	it('falls back to aria-label for a radio without a group label [ai generated]', () => {
		const { form } = makeForm(`
			<div class="field">
				<div class="field-body">
					<input id="r1" type="radio" name="color" value="red" aria-label="Color" />
				</div>
			</div>
		`);
		const radio = form.querySelector('#r1') as HTMLValueElement;
		expect(getLabel(radio)).toBe('Color');
	});
});

describe('getField / getFieldBody', () => {
	it('returns the closest .field ancestor [ai generated]', () => {
		const { form } = makeForm(`
			<div class="field" id="field1">
				<div class="field-body">
					<input id="x" name="x" type="text" />
				</div>
			</div>
		`);
		const input = form.querySelector('#x') as HTMLValueElement;
		expect(getField(input).id).toBe('field1');
	});

	it('throws when an input is not inside a .field [ai generated]', () => {
		const form = document.createElement('form');
		form.innerHTML = `<input id="lonely" name="lonely" type="text" />`;
		document.body.appendChild(form);
		const input = form.querySelector('#lonely') as HTMLValueElement;
		expect(() => getField(input)).toThrow(/is not within a \.field/);
	});

	it('returns the closest .field-body ancestor [ai generated]', () => {
		const { form } = makeForm(`
			<div class="field">
				<div class="field-body" id="body1">
					<input id="y" name="y" type="text" />
				</div>
			</div>
		`);
		const input = form.querySelector('#y') as HTMLValueElement;
		expect(getFieldBody(input).id).toBe('body1');
	});

	it('throws when an input is not inside a .field-body [ai generated]', () => {
		const { form } = makeForm(`
			<div class="field">
				<input id="nobody" name="nobody" type="text" />
			</div>
		`);
		const input = form.querySelector('#nobody') as HTMLValueElement;
		expect(() => getFieldBody(input)).toThrow(/is not within a \.field-body/);
	});
});

describe('setValidationMessage', () => {
	it('creates a new field-error element when none exists [ai generated]', () => {
		const { form } = makeForm(`
			<div class="field">
				<div class="field-body">
					<input id="i" name="i" type="text" />
				</div>
			</div>
		`);
		const input = form.querySelector('#i') as HTMLValueElement;
		setValidationMessage(input, 'Too short');
		const note = form.querySelector('[data-field-error]') as HTMLParagraphElement;
		expect(note).not.toBeNull();
		expect(note.textContent).toBe('Too short');
		expect(note.classList.contains('field-error')).toBe(true);
		expect(input.getAttribute('aria-describedby')).toContain(note.id);
	});

	it('reuses an existing field-error element on subsequent calls [ai generated]', () => {
		const { form } = makeForm(`
			<div class="field">
				<div class="field-body">
					<input id="i" name="i" type="text" />
				</div>
			</div>
		`);
		const input = form.querySelector('#i') as HTMLValueElement;
		setValidationMessage(input, 'First');
		setValidationMessage(input, 'Second');
		const notes = form.querySelectorAll('[data-field-error]');
		expect(notes).toHaveLength(1);
		expect(notes[0].textContent).toBe('Second');
	});
});

describe('collectCustomElementsByName', () => {
	it('returns an empty list when every form field is in form.elements [ai generated]', () => {
		const form = document.createElement('form');
		form.innerHTML = `<input name="real" value="hi" />`;
		document.body.appendChild(form);
		expect(collectCustomElementsByName(form)).toEqual([]);
	});

	it('returns elements with a name attribute that are not in form.elements [ai generated]', () => {
		const form = document.createElement('form');
		form.innerHTML = `
			<input name="real" value="hi" />
			<custom-input name="custom"></custom-input>
		`;
		document.body.appendChild(form);
		const customInput = form.querySelector('custom-input') as HTMLElement;

		// jsdom does not include unknown elements in FormData. Stub the
		// FormData iteration only for this test so the helper can see the
		// custom-named element.
		const originalFormData = window.FormData;
		class FakeFormData {
			[Symbol.iterator]() {
				return [['real', 'hi'] as [string, string], ['custom', 'world'] as [string, string]][
					Symbol.iterator
				]();
			}
			entries() {
				return this[Symbol.iterator]();
			}
		}
		window.FormData = FakeFormData as unknown as typeof FormData;
		try {
			const result = collectCustomElementsByName(form);
			expect(result).toContain(customInput);
		} finally {
			window.FormData = originalFormData;
		}
	});
});

/* -------------------------------------------------------------------------- */
/* FormBehaviorElement                                                        */
/* -------------------------------------------------------------------------- */

describe('FormBehaviorElement', () => {
	it('registers itself as the <form-behavior> custom element [ai generated]', () => {
		expect(customElements.get('form-behavior')).toBe(FormBehaviorElement);
	});

	it('inserts a form-error-container after itself when connected inside a form [ai generated]', () => {
		const { form, behavior } = makeForm(``);
		const container = form.querySelector('[data-form-error-container]');
		expect(container).not.toBeNull();
		expect(behavior.nextElementSibling).toBe(container);
	});

	it('honors the nounload attribute via hideUnloadMessage [ai generated]', () => {
		const { behavior } = makeForm(``);
		expect(behavior.hideUnloadMessage).toBe(false);
		behavior.setAttribute('nounload', '');
		expect(behavior.hideUnloadMessage).toBe(true);
	});

	it('treats the new attribute as isNew and forces canSave [ai generated]', () => {
		const { behavior } = makeForm(``);
		expect(behavior.isNew).toBe(false);
		expect(behavior.canSave).toBe(false);
		behavior.setAttribute('new', '');
		expect(behavior.isNew).toBe(true);
		expect(behavior.canSave).toBe(true);
	});

	it('honors the nosubmit attribute via noSubmit [ai generated]', () => {
		const { behavior } = makeForm(``);
		expect(behavior.noSubmit).toBe(false);
		behavior.setAttribute('nosubmit', '');
		expect(behavior.noSubmit).toBe(true);
	});

	it('exposes the enclosing form via the .form getter [ai generated]', () => {
		const { form, behavior } = makeForm(``);
		expect(behavior.form).toBe(form);
	});

	it('overlays loc-* attribute overrides onto defaultMessageStrings [ai generated]', () => {
		const { behavior } = makeForm(``);
		behavior.setAttribute('loc-input-required', 'You must fill {inputLabel}');
		const strings = behavior.getLocaleStrings();
		expect(strings.inputRequired).toBe('You must fill {inputLabel}');
		expect(strings.inputMinLength).toBe(defaultMessageStrings.inputMinLength);
	});

	it('marks the form as dirty when a field value diverges from initial [ai generated]', () => {
		const { form, behavior } = makeForm(`
			<input name="title" value="hello" />
		`);
		expect(behavior.isDirty).toBe(false);
		(form.querySelector('input') as HTMLInputElement).value = 'world';
		behavior.setDirty();
		expect(behavior.isDirty).toBe(true);
	});

	it('disposes of subscribed listeners on disconnect [ai generated]', () => {
		const { form, behavior } = makeForm(``);
		expect(behavior.toDispose.length).toBeGreaterThan(0);
		const disposeSpies = behavior.toDispose.map(d => vi.fn(d));
		behavior.toDispose = disposeSpies;
		form.removeChild(behavior);
		for (const spy of disposeSpies) {
			expect(spy).toHaveBeenCalled();
		}
	});

	it('does not throw on connect when not parented by a form [ai generated]', () => {
		const el = document.createElement('form-behavior');
		expect(() => document.body.appendChild(el)).not.toThrow();
	});

	it('validateRequired returns the localized message when value is missing [ai generated]', () => {
		const { form, behavior } = makeForm(`
			<div class="field">
				<div class="field-body">
					<input id="x" name="x" type="text" required />
				</div>
			</div>
		`);
		const input = form.querySelector('#x') as HTMLInputElement;
		const message = behavior.validateRequired(input as unknown as HTMLValueElement, 'Title');
		expect(message).toBe('Title is required.');
	});

	it('validateRequired returns null when the input has a value [ai generated]', () => {
		const { form, behavior } = makeForm(`
			<div class="field">
				<div class="field-body">
					<input id="x" name="x" type="text" required value="hi" />
				</div>
			</div>
		`);
		const input = form.querySelector('#x') as HTMLInputElement;
		expect(behavior.validateRequired(input as unknown as HTMLValueElement, 'Title')).toBeNull();
	});

	it('validateMinLength returns a message when the value is shorter than minLength [ai generated]', () => {
		const { form, behavior } = makeForm(`
			<div class="field">
				<div class="field-body">
					<input id="x" name="x" type="text" minlength="5" value="hi" />
				</div>
			</div>
		`);
		const input = form.querySelector('#x') as HTMLInputElement;
		const message = behavior.validateMinLength(input, 'Title');
		expect(message).toBe('Title must be at least 5 characters.');
	});

	it('validateMinLength returns null when the value meets minLength [ai generated]', () => {
		const { form, behavior } = makeForm(`
			<div class="field">
				<div class="field-body">
					<input id="x" name="x" type="text" minlength="2" value="hello" />
				</div>
			</div>
		`);
		const input = form.querySelector('#x') as HTMLInputElement;
		expect(behavior.validateMinLength(input, 'Title')).toBeNull();
	});

	it('validateMaxLength returns a message when the value exceeds maxLength [ai generated]', () => {
		const { form, behavior } = makeForm(`
			<div class="field">
				<div class="field-body">
					<input id="x" name="x" type="text" maxlength="3" />
				</div>
			</div>
		`);
		const input = form.querySelector('#x') as HTMLInputElement;
		// Browsers prevent typing past maxLength, but JS can still assign a
		// longer value programmatically.
		input.value = 'abcdefg';
		const message = behavior.validateMaxLength(input as unknown as HTMLValueElement, 'Title');
		expect(message).toBe('Title cannot be longer than 3 characters.');
	});

	it('validateMaxLength returns null when the value is within maxLength [ai generated]', () => {
		const { form, behavior } = makeForm(`
			<div class="field">
				<div class="field-body">
					<input id="x" name="x" type="text" maxlength="10" value="hi" />
				</div>
			</div>
		`);
		const input = form.querySelector('#x') as HTMLInputElement;
		expect(behavior.validateMaxLength(input as unknown as HTMLValueElement, 'Title')).toBeNull();
	});

	it('showNoChangesMessage renders the localized message in the error alert [ai generated]', () => {
		const { form, behavior } = makeForm(``);
		behavior.showNoChangesMessage(form);
		const message = form.querySelector('#no-edits-error') as HTMLLIElement;
		// Source code uses Element.innerText; jsdom stores innerText
		// separately from textContent, so we assert against innerText.
		expect(message?.innerText).toBe(defaultMessageStrings.thereAreNoEditsToSubmit);
		const alert = form.querySelector('[data-form-error-alert]') as HTMLDivElement;
		expect(alert.hidden).toBe(false);
	});

	it('submissionError appends the error and reveals the error alert [ai generated]', () => {
		const { form, behavior } = makeForm(``);
		behavior.submissionError(form, 'Boom!');
		const alert = form.querySelector('[data-form-error-alert]') as HTMLDivElement;
		expect(alert.hidden).toBe(false);
		const errorListItem = alert.querySelector('li') as HTMLLIElement;
		expect(errorListItem.innerText).toBe('Boom!');
	});

	it('submissionError dispatches a submission-error custom event [ai generated]', () => {
		const { form, behavior } = makeForm(``);
		const handler = vi.fn();
		behavior.addEventListener('submission-error', handler);
		behavior.submissionError(form, 'Oops');
		expect(handler).toHaveBeenCalledTimes(1);
		const event = handler.mock.calls[0][0] as CustomEvent<{ form: HTMLFormElement }>;
		expect(event.detail.form).toBe(form);
	});

	it('handleEvent throws on unexpected event types [ai generated]', () => {
		const { behavior } = makeForm(``);
		expect(() => behavior.handleEvent(new Event('weird'))).toThrow(/Unexpected event/);
	});
});
