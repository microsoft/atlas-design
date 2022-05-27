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
<fieldset class="field border-none">
	<legend class="field-label label margin-bottom-xs" aria-describedby="drink-description">
		Favorite drink
	</legend>
	<p class="field-description margin-bottom-xxs" id="drink-description">Which do you prefer?</p>
	<div class="field-body">
		<label class="checkbox margin-bottom-xxs">
			<input type="checkbox" />
			<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
			<span class="checkbox-text" aria-hidden="true">Coca-cola</span>
		</label>
		<label class="checkbox">
			<input type="checkbox" />
			<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
			<span class="checkbox-text" aria-hidden="true">Pepsi</span>
		</label>
	</div>
</fieldset>
```

### Modifiers

`.field-body-icons` is used when the control element contains icons.

```html
<div class="field">
	<div class="field-body field-body-icons">
		<input class="input input-sm" />
		<span class="icon border" aria-hidden="true"> </span>
	</div>
	<div class="field-body field-body-icons margin-top-xxs">
		<div class="select select-sm">
			<select>
				<option>A</option>
				<option>B</option>
			</select>
			<span class="icon border" aria-hidden="true"> </span>
		</div>
	</div>
</div>
```

`.field-body-icon-right` is used to display the icon on the right side of the element.

```html
<div class="field">
	<div class="field-body field-body-icons field-body-icon-right">
		<input class="input input-sm" />
		<span class="icon border" aria-hidden="true"> </span>
	</div>
</div>
```

## Form Validation

`.field-section-message` is placed after the element for form validation messages.

```html
<form>
	<div class="field">
		<label class="field-label label" for="sample-form-validation-input">Input</label>
		<div class="field-body">
			<input
				id="sample-form-validation-input"
				name="title"
				class="input"
				type="text"
				aria-describedby="section-note"
			/>
		</div>
		<p class="field-validation-message help help-danger">Input is required.</p>
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
<fieldset class="field border-none">
	<legend class="field-label label margin-bottom-xs">Radio group</legend>
	<p class="margin-bottom-xs">
		Required fields are marked with
		<span class="required-indicator"></span>
	</p>
	<div class="field-body">
		<label class="radio field-label">
			<input checked name="question-1" type="radio" class="radio-dot" value="Yes" required />
			<span class="radio-label-text">Yes</span>
		</label>
		<label class="radio field-label">
			<input checked name="question-1" type="radio" class="radio-dot" value="No" />
			<span class="radio-label-text">No</span>
		</label>
		<span class="required-indicator"></span>
	</div>
</fieldset>
```
