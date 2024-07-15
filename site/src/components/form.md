---
title: Form
description: The form related components in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - field
  - required-indicator
---

# Form

Forms contain form control elements such as the following:

- [`.button`](./button.md)
- [`.checkbox`](./checkbox.md)
- [`.help`](./help.md)
- [`.input`](./input.md)
- [`.label`](./label.md)
- [`.radio`](./radio.md)
- [`.select`](./select.md)
- [`.textarea`](./textarea.md)
- custom form elements

## Form field

The `.field` component is a container for form control elements to provide consistency.

It can be used to hold `.field-body` containers, which holds the individual elements.

`field-label` is used for the element's label. Use `.field-label-inline` and `.field-body-inline` to display the label and body inline.

```html
<fieldset class="field">
	<legend class="field-label">Field label</legend>
	<p class="field-description">Field description</p>
	<div class="field-body">
		<label class="checkbox">
			<input type="checkbox" name="field-checkbox" />
			<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
			<span class="checkbox-text">Checkbox 1</span>
		</label>
		<label class="checkbox">
			<input type="checkbox" name="field-checkbox" />
			<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
			<span class="checkbox-text">Checkbox 2</span>
		</label>
	</div>
</fieldset>
```

## Required indicator

For elements that are required for form submission, you can add a span element with the `.required-indicator` class inside the label or adjacent to the element.

```html
<form>
	<p class="visually-hidden">Required fields are marked with asterisk/star</p>
	<fieldset class="field">
		<legend class="field-label">Radio group <span class="required-indicator"></span></legend>
		<div class="field-body">
			<label class="radio">
				<input checked name="question-1" type="radio" class="radio-dot" value="Yes" required />
				<span class="radio-label-text">Yes</span>
			</label>
			<label class="radio">
				<input checked name="question-1" type="radio" class="radio-dot" value="No" />
				<span class="radio-label-text">No</span>
			</label>
		</div>
	</fieldset>
</form>
```

## Form behavior

Use the `form-behavior` component within a form to ensure accessible form validation. Form elements should be contained by `.field` and `.field-body` class.

`.field-error` is placed after the element for form validation error messages.

The form behavior component can accept certain HTML attributes.

| Attribute                | Description                                                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| navigation="hash-reload" | After form submission, add a hash and reload the current page while navigating to the hash.                                             |
| navigation="follow"      | After form submission, redirect to the url provided by the API response header or `navigation-href` attribute value.                    |
| navigation="reload"      | After form submission, reload the current page.                                                                                         |
| navigation="replace"     | After form submission, replace the current page with the url provided by the API response header or `navigation-href` attribute value.  |
| navigation-href=         | The url to navigate to.                                                                                                                 |
| header-\*=               | For attributes that start with `header-`, the name after `header-` and the attribute value is added to the submit request header.       |
| nounload                 | Disables the browser warning message that appears when you try to navigate away from the current page with a partially filled out form. |
| new                      | When the form does not require any edits (i.e the only action is to submit), adding the `new` attribute will override the validation.   |
| nosubmit                 | Use the `nosubmit` attibute to bypass automatic form submission if a form contains a body but does not need to send a POST request.     |

### Custom validation

Aside from basic input validation, you can use event listeners to listen for the `form-validating` custom event to inject custom validation logic.

If you want to skip the basic validation on an input, apply a `data-skip-validation` attribute.

### Form with edits required

```html
<form id="sample-form-complex" data-form-type="question" action="#" method="POST" novalidate="">
	<form-behavior
		new=""
		navigation="follow"
		header-content-type="application/json"
		header-x-docsauth="cookie"
		loc-content-has-changed="Content has changed, please reload the page to get the latest changes."
		loc-input-max-length="{inputLabel} cannot be longer than {maxLength} characters."
		loc-input-min-length="{inputLabel} must be at least {minLength} characters."
		loc-input-required="{inputLabel} is required."
		loc-not-authenticated="You are not authenticated. Please refresh the page and try again. If this issue persists, please log out and log back in."
		loc-not-authorized="You are not authorized to make this response. If you believe this to be in error, please refresh the page and try again."
		loc-please-fix-the-following-issues="Please fix the following issues to continue:"
		loc-there-are-no-edits-to-submit="There are no edits to submit."
		loc-too-many-requests="You have sent too many requests. Please wait a few minutes and try again."
		loc-we-encountered-an-unexpected-error="We encountered an unexpected error. Please try again later. If this issue continues, please contact site support."
	></form-behavior>
	<p class="visually-hidden">Required fields are marked with asterisk/star</p>
	<div class="field">
		<label class="field-label" for="sample-input">
			Input
			<span class="required-indicator"></span>
		</label>
		<div class="field-body">
			<input id="sample-input" name="input" class="input" type="text" value="" required />
		</div>
	</div>
	<div class="field">
		<label class="field-label" for="sample-input-min">
			Input with min/max length
			<span class="required-indicator"></span>
		</label>
		<span class="field-description" id="sample-input-description">
			Optional field description
			<!-- 👈 optional -->
		</span>
		<div class="field-body">
			<input
				id="sample-input-min"
				name="input-min"
				class="input"
				type="text"
				value=""
				required
				minlength="10"
				maxlength="255"
				aria-describedby="sample-input-description"
			/>
		</div>
	</div>
	<div class="field">
		<label class="field-label" for="sample-select">
			Select
			<span class="required-indicator"></span>
		</label>
		<span id="sample-select-description" class="field-description"> Select 1 of 3 options. </span>
		<div class="field-body">
			<select
				id="sample-select"
				name="select"
				class="select"
				aria-describedby="sample-select-description"
			>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			</select>
		</div>
	</div>
	<div class="field">
		<label class="label" for="sample-text-area">
			Textarea
			<span class="required-indicator"></span>
		</label>
		<div class="field-body">
			<textarea
				id="sample-text-area"
				name="text-area"
				class="textarea"
				minlength="10"
				rows="4"
				cols="30"
				required
			></textarea>
		</div>
	</div>
	<div class="field">
		<label class="field-label" for="sample-skip-input">
			Input
			<span class="required-indicator"></span>
		</label>
		<div class="field-body">
			<input
				id="sample-skip-input"
				name="sample-skip-input"
				class="input"
				type="text"
				value=""
				required
				data-skip-validation
			/>
		</div>
	</div>
	<div class="field">
		<legend class="field-label">Checkbox Field label</legend>
		<div class="field-body">
			<label class="checkbox">
				<input
					type="checkbox"
					name="checkbox-example"
					required
					id="sample-checkbox"
					data-error-label="Checkbox Example"
				/>
				<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
				<span class="checkbox-text">
					Checkbox
					<span class="required-indicator"></span>
				</span>
			</label>
		</div>
	</div>
	<div class="field">
		<legend class="field-label">Radio Field label</legend>
		<div class="field-body">
			<label class="radio" for="question-id-1">
				<input
					name="question-1"
					id="question-id-1"
					type="radio"
					class="radio-dot"
					value="Yes"
					data-error-label="Radio Input selection"
					required
				/>
				<span class="radio-label-text">Yes</span>
			</label>
			<label class="radio" for="question-id-2">
				<input name="question-1" id="question-id-2" type="radio" class="radio-dot" value="No" />
				<span class="radio-label-text">No</span>
			</label>
			<label class="radio" for="question-id-3">
				<input
					name="question-1"
					id="question-id-3"
					type="radio"
					class="radio-dot"
					value="Option 3"
				/>
				<span class="radio-label-text">Option 3</span>
			</label>
			<label class="radio" for="question-id-4">
				<input
					name="question-1"
					id="question-id-4"
					type="radio"
					class="radio-dot"
					value="Option 4"
				/>
				<span class="radio-label-text">Option 4</span>
			</label>
		</div>
	</div>
	<div class="display-flex">
		<button type="submit" class="button button-primary button-filled">Submit form</button>
	</div>
	<div class="submitted-form-data-example"></div>
</form>
```

### Hiding the validation banner

If there is a need to hide the validation banner on top of the form, we can apply the `data-hide-validation-banner` attribute to the `form`.

```html
<form
	id="sample-form-hide-validation-banner"
	data-form-type="question"
	data-hide-validation-banner
	action="#"
	method="POST"
	novalidate=""
>
	<form-behavior
		new
		navigation="follow"
		header-content-type="application/json"
		header-x-docsauth="cookie"
		loc-content-has-changed="Content has changed, please reload the page to get the latest changes."
		loc-input-max-length="{inputLabel} cannot be longer than {maxLength} characters."
		loc-input-min-length="{inputLabel} must be at least {minLength} characters."
		loc-input-required="{inputLabel} is required."
		loc-not-authenticated="You are not authenticated. Please refresh the page and try again. If this issue persists, please log out and log back in."
		loc-not-authorized="You are not authorized to make this response. If you believe this to be in error, please refresh the page and try again."
		loc-please-fix-the-following-issues="Please fix the following issues to continue:"
		loc-there-are-no-edits-to-submit="There are no edits to submit."
		loc-too-many-requests="You have sent too many requests. Please wait a few minutes and try again."
		loc-we-encountered-an-unexpected-error="We encountered an unexpected error. Please try again later. If this issue continues, please contact site support."
	></form-behavior>
	<p class="visually-hidden">Required fields are marked with asterisk/star</p>
	<div class="field">
		<label class="field-label" for="sample-input-demo">
			Input
			<span class="required-indicator"></span>
		</label>
		<div class="field-body">
			<input id="sample-input-demo" name="input" class="input" type="text" value="" required />
		</div>
	</div>
	<div class="field">
		<div class="field-body">
			<label class="checkbox">
				<input type="checkbox" name="checkbox-example" required id="required-checkbox-input-demo" />
				<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
				<span class="checkbox-text">
					Checkbox
					<span class="required-indicator"></span>
				</span>
			</label>
		</div>
	</div>
	<div class="field">
		<label class="label" for="sample-text-area-demo">Textarea</label>
		<div class="field-body">
			<textarea
				id="sample-text-area-demo"
				name="text-area"
				class="textarea"
				rows="4"
				cols="30"
			></textarea>
		</div>
	</div>
	<div class="display-flex">
		<button type="submit" class="button button-primary button-filled">Submit form</button>
	</div>
	<div class="submitted-form-data-example"></div>
</form>
```

### Simple form without edits

```html
<form id="sample-form-simple" data-form-type="question" action="#" method="POST" novalidate="">
	<form-behavior
		new
		navigation="reload"
		header-x-docsauth="cookie"
		loc-content-has-changed="Content has changed, please reload the page to get the latest changes."
		loc-input-max-length="{inputLabel} cannot be longer than {maxLength} characters."
		loc-input-min-length="{inputLabel} must be at least {minLength} characters."
		loc-input-required="{inputLabel} is required."
		loc-not-authenticated="You are not authenticated. Please refresh the page and try again. If this issue persists, please log out and log back in."
		loc-not-authorized="You are not authorized to make this response. If you believe this to be in error, please refresh the page and try again."
		loc-please-fix-the-following-issues="Please fix the following issues to continue:"
		loc-there-are-no-edits-to-submit="There are no edits to submit."
		loc-too-many-requests="You have sent too many requests. Please wait a few minutes and try again."
		loc-we-encountered-an-unexpected-error="We encountered an unexpected error. Please try again later. If this issue continues, please contact site support."
	></form-behavior>
	<div class="field">
		<button
			type="submit"
			class="button button-primary button-filled"
			value="yes"
			name="simple-form"
			formaction="{some_url}"
		>
			Yes
		</button>
	</div>
	<div class="submitted-form-data-example"></div>
</form>
```

### Async beforesubmit handler

To ensure that a submit event waits for an asynchronous beforesubmit handler to finish, you can set the event's detail callback property to your asynchronous logic. This will allow the event to wait for the completion of the asynchronous operation before proceeding with the submission.

```typescript
form.addEventListener(
	'beforesubmit',
	(event: CustomEventInit<{ callback: () => Promise<void> }>) => {
		if (event.detail) {
			event.detail.callback = async () => {
				// TODO: Your async logic here.
				return new Promise(resolve => setTimeout(resolve, 3000));
			};
		}
	}
);
```

```html
<form
	id="sample-async-form-simple"
	data-form-type="question"
	action="#"
	method="POST"
	novalidate=""
	test-async-before-submit
>
	<form-behavior
		new
		navigation="reload"
		header-x-docsauth="cookie"
		loc-content-has-changed="Content has changed, please reload the page to get the latest changes."
		loc-input-max-length="{inputLabel} cannot be longer than {maxLength} characters."
		loc-input-min-length="{inputLabel} must be at least {minLength} characters."
		loc-input-required="{inputLabel} is required."
		loc-not-authenticated="You are not authenticated. Please refresh the page and try again. If this issue persists, please log out and log back in."
		loc-not-authorized="You are not authorized to make this response. If you believe this to be in error, please refresh the page and try again."
		loc-please-fix-the-following-issues="Please fix the following issues to continue:"
		loc-there-are-no-edits-to-submit="There are no edits to submit."
		loc-too-many-requests="You have sent too many requests. Please wait a few minutes and try again."
		loc-we-encountered-an-unexpected-error="We encountered an unexpected error. Please try again later. If this issue continues, please contact site support."
	></form-behavior>
	<div class="field">
		<button
			type="submit"
			class="button button-primary button-filled"
			value="yes"
			name="simple-form"
			formaction="{some_url}"
		>
			Yes
		</button>
	</div>
	<div class="submitted-form-data-example"></div>
</form>
```
