---
title: Form
description: The form related components in the Atlas Design System
template: standard
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

## Form Field

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

## Required Indicator

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

## Form Behavior

Use the `form-behavior` component within a form to ensure accessible form validation. Form elements should be contained by `.field` and `.field-body` class.
When the form does not require any edits (i.e the only action is to submit), you can add a `new` attribute to override the validation.

`.field-error` is placed after the element for form validation error messages.

The form behavior component can accept certain HTML attributes.

- `navigation` handles different navigation options after form submission.
  - `hash-reload` - add a hash and reload the current page while navigating to the hash.
  - `follow` - redirect to the url provided by the API response header or `navigation-href` attribute value.
  - `reload` - reload the current page
  - `replace` - replaces the current page with the url provided by the API response header or `navigation-href` attribute value.
- `navigation-href` - the url to navigate to.
- `header-` - attribute values are added to the submit request header.

##### Form with edits required

```html
<form
	id="sample-form-complex"
	data-form-type="question"
	action="#"
	method="POST"
	new=""
	novalidate=""
>
	<form-behavior
		new=""
		navigation="follow"
		header-content-type="application/json"
		header-x-docsauth="cookie"
		loc-content-has-changed="Content has changed, please reload the page to get the latest changes."
		loc-input-max-length="{inputLabel} cannot be longer than {maxLength} characters."
		loc-input-min-length="{inputLabel} must be at least {minLength} characters."
		loc-input-required="{inputLabel} is required."
		loc-please-fix-the-following-issues="Please fix the following issues to continue:"
		loc-there-are-no-edits-to-submit="There are no edits to submit."
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
			>
			</textarea>
		</div>
	</div>
	<div class="display-flex">
		<button type="submit" class="button button-primary button-filled">Submit form</button>
	</div>
	<div class="submitted-form-data-example"></div>
</form>
```

##### Simple form without edits

```html
<form
	id="sample-form-simple"
	data-form-type="question"
	action="#"
	method="POST"
	new=""
	novalidate=""
>
	<form-behavior
		navigation="reload"
		header-x-docsauth="cookie"
		new
		loc-content-has-changed="Content has changed, please reload the page to get the latest changes."
		loc-input-max-length="{inputLabel} cannot be longer than {maxLength} characters."
		loc-input-min-length="{inputLabel} must be at least {minLength} characters."
		loc-input-required="{inputLabel} is required."
		loc-please-fix-the-following-issues="Please fix the following issues to continue:"
		loc-there-are-no-edits-to-submit="There are no edits to submit."
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
