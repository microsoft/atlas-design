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
`field-label` is used for the element's label.

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

## Form Validation

Use the form behavior component within a form to ensure accessible form validation. Form elements should be contained by `.field` and `.field-body` class.
When the form do not require any edits (i.e the only action is to submit), you can add a `new` attribute to override the validation.

`.field-error` is placed after the element for form validation error messages.

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
		loc-you-must-select-between-min-and-max-tags="You must select between {min} and {max} {tagLabel}."
	></form-behavior>
	<p class="visually-hidden">Required fields are marked with asterisk/star</p>
	<div class="field">
		<label class="field-label margin-none" for="sample-input">
			Input
			<span class="required-indicator"></span>
		</label>
		<div class="field-body">
			<input id="sample-input" name="input" class="input" type="text" value="" required />
		</div>
	</div>
	<div class="field">
		<label class="field-label margin-none" for="sample-input-min">
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
		<label class="label" for="sample-select">
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
		<label class="label" for="sample-tags">
			Tags
			<span class="required-indicator"></span>
		</label>
		<span id="sample-tags-description" class="field-description"> Select up to 5 tags. </span>
		<div class="field-body">
			<input
				id="sample-tags"
				name="tags"
				class="tag-input input"
				aria-describedby="sample-select-description"
				hidden
				aria-hidden="true"
				value=""
				mintags="1"
				maxtags="5"
			/>
			<div class="tag-input-holder margin-bottom-xxs has-height-auto">
				<div class="tags"></div>
				<input
					role="combobox"
					maxlength="100"
					id="tag-input"
					class="autocomplete-input input"
					type="text"
					aria-label="Tag selector"
					placeholder="Enter tags..."
					hidden
				/>
			</div>
			<button class="add-tags-button" type="button">Add tags</button>
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

	<div class="field">
		<div class="field-body">
			<star-rating id="star-rating-1" name="star-rating-1" required>
				<legend slot="legend">Star rating</legend>
				<span slot="label-1">Terrible</span>
				<span slot="label-2">Poor</span>
				<span slot="label-3">Fair</span>
				<span slot="label-4">Good</span>
				<span slot="label-5">Great</span>
			</star-rating>
		</div>
	</div>
	<div class="display-flex">
		<button type="submit" class="button button-primary button-filled">Submit form</button>
		<button type="button" class="button">Cancel</button>
	</div>
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
		loc-you-must-select-between-min-and-max-tags="You must select between {min} and {max} {tagLabel}."
	></form-behavior>
	<div class="field display-flex">
		<button
			type="submit"
			class="button button-primary button-filled margin-right-xxs"
			value="yes"
			name="simple-form"
		>
			Yes
		</button>
	</div>
</form>
```
