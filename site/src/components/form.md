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
	<p class="field-description" id="drink-description">Field description</p>
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

## Form Validation

`.field-error` is placed after the element for form validation error messages.

```html
<form>
	<p class="margin-bottom-xs visually-hidden">Required fields are marked with asterisk/star</p>
	<div class="field">
		<label class="field-label" for="sample-form-validation-input"
			>Input <span class="required-indicator"></span
		></label>
		<p class="field-description">
			Optional field description
			<!-- 👈 optional -->
		</p>
		<div class="field-body">
			<input
				id="sample-form-validation-input"
				name="sample-input"
				class="input"
				type="text"
				required
			/>
		</div>
		<p class="field-error">Input is required.</p>
	</div>
	<div class="display-flex">
		<button class="button button-primary margin-right-xxs">Submit</button>
		<button class="button button-danger">Cancel</button>
	</div>
</form>
```

### Required Indicator

For control elements that are required for form submission, you can add a span element with the `.required-indicator` class inside the label or adjacent to the element.

```html
<form>
	<p class="margin-bottom-xs visually-hidden">Required fields are marked with asterisk/star</p>
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
