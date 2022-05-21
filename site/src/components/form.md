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
It can be used to hold `.field-section` containers, which holds the individual elements.

`.field-section-label` is used on the label. Adding `field-section-label-sm`/`field-section-label-lg` makes the label a little smaller or bigger than the default.

```html
<div class="field">
	<div class="field-section">
		<label class="field-section-label field-section-label-sm label" for="sample-form-input-sm">
			Input
		</label>
		<input
			id="sample-form-input-sm"
			name="title"
			class="input"
			type="text"
			placeholder="e.g., Why is the sky blue?"
		/>
	</div>
</div>
<div class="field">
	<div class="field-section">
		<label class="field-section-label label" for="sample-form-input"> Input </label>
		<input
			id="sample-form-input"
			name="title"
			class="input"
			type="text"
			placeholder="e.g., Why is the sky blue?"
		/>
	</div>
</div>
<div class="field">
	<div class="field-section">
		<label class="field-section-label field-section-label-lg label" for="sample-form-input-lg">
			Input
		</label>
		<input
			id="sample-form-input-lg"
			name="title"
			class="input"
			type="text"
			placeholder="e.g., Why is the sky blue?"
		/>
	</div>
</div>
<div class="field display-flex">
	<div class="field-section">
		<button class="button button-primary margin-right-xxs">Submit</button>
		<button class="button button-danger">Cancel</button>
	</div>
</div>
```

### Modifiers

`.field-addons` is added to attach controls together.

```html
<div class="field field-addons">
	<div class="field-section">
		<div class="select">
			<select>
				<option>$</option>
				<option>€</option>
			</select>
		</div>
	</div>
	<div class="field-section">
		<input class="input" type="text" placeholder="Transfer money" />
	</div>
	<div class="field-section">
		<a class="button button-primary"> Transfer </a>
	</div>
</div>
```

## Form Section

Form control elements are wrapped with a `.field-section` container.

`.field-section-note` is placed after the element for form validation messages.

```html
<div class="field">
	<div class="field-section">
		<label class="field-section-label field-section-label-lg label" for="sample-form-input-note">
			Input
		</label>
		<input
			id="sample-form-input-note"
			name="title"
			class="input"
			type="text"
			placeholder="e.g., Why is the sky blue?"
			aria-describedby="section-note"
		/>
	</div>
	<p id="section-note" class="field-section-note help help-danger">Sample warning message.</p>
</div>
```

### Modifiers

`.field-section-icons` is used when the control element contains icons.

```html
<div class="field">
	<div class="field-section field-section-icons">
		<input class="input input-sm" placeholder="www.microsoft.com" />
		<span class="icon border" aria-hidden="true"> </span>
	</div>
	<div class="field-section field-section-icons margin-top-xxs">
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

`.field-section-icon-right` is used to display the icon on the right side of the element.

```html
<div class="field">
	<div class="field-section field-section-icons field-section-icon-right">
		<input class="input input-sm" placeholder="www.microsoft.com" />
		<span class="icon border" aria-hidden="true"> </span>
	</div>
</div>
```

### Required Indicator

For control elements that are required for form submission, you can add a span element with the `.required-indicator` class inside the label or adjacent to the element.

```html
<div class="field">
	<p class="margin-bottom-xs">
		Required fields are marked with an
		<span class="required-indicator" aria-label="required"></span>
	</p>
	<div class="field-section">
		<label class="field-section-label label margin-bottom-xxs" for="sample-form-input-2">
			First name
			<span class="required-indicator"></span>
		</label>
		<input class="input" type="text" placeholder="First name" id="sample-form-input-2" required />
	</div>
</div>
```
