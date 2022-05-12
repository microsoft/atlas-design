---
title: Form
description: The form related components in the Atlas Design System
template: standard
---

# Form

Forms can contain the following form control elements:

- [`.button`](./button.md)
- [`.checkbox`](./checkbox.md)
- [`.help`](./help.md)
- [`.input`](./input.md)
- [`.label`](./label.md)
- [`.radio`](./radio.md)
- [`.select`](./select.md)
- [`.textarea`](./textarea.md)

### Form Validation

The [`form-behavior`](../patterns/form-validation.md) component is also used within a form for validation.

### Form Field

The `.field` component is a container for form control elements to provide consistency.
It can be used to hold `.control` containers, which contains the individual control elements.

```html
<div class="field margin-bottom-xs">
	<label class="field-label label" for="sample-form-input"> Input </label>
	<span id="sample-form-input-note" class="help margin-bottom-xxs">Input description</span>
	<div class="control">
		<input
			id="sample-form-input"
			name="title"
			aria-describedby="sample-form-input-note"
			class="input"
			type="text"
			placeholder="e.g., Why is the sky blue?"
		/>
	</div>
</div>
```

### Modifiers

`.form-addon` can be added for attaching controls together.

```html
<div class="field field-addons">
	<div class="control">
		<div class="select">
			<select>
				<option>$</option>
				<option>€</option>
			</select>
		</div>
	</div>
	<div class="control">
		<input class="input" type="text" placeholder="Transfer money" />
	</div>
	<div class="control">
		<a class="button button-primary"> Transfer </a>
	</div>
</div>
```
