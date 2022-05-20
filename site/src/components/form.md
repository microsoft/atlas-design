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

### Form Field

The `.field` component is a container for form control elements to provide consistency.
It can be used to hold `.control` containers, which holds the individual control elements.

```html
<div class="field margin-bottom-xs">
	<label class="field-label label margin-bottom-xxs" for="sample-form-input"> Input </label>
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

`.form-addons` can be added to attach controls together.

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

`.field-horizontal` can be used for displaying form label and field side by side.

```html
<div class="field field-horizontal">
	<div class="field-label field-label-sm">
		<label class="label" for="example-small-label">Search</label>
	</div>
	<div class="field-body">
		<div class="field">
			<div class="control">
				<input
					id="example-small-label"
					class="input input-sm"
					type="text"
					placeholder="www.microsoft.com"
				/>
			</div>
		</div>
	</div>
</div>
<div>
	<div class="field field-horizontal">
		<div class="field-label field-label-lg">
			<label class="label" for="example-large-label">Search</label>
		</div>
		<div class="field-body">
			<div class="field">
				<div class="control">
					<input
						id="example-large-label"
						class="input input-lg"
						type="text"
						placeholder="www.microsoft.com"
					/>
				</div>
			</div>
		</div>
	</div>
</div>
```

### Form Control

Form element can be used within a `.control` container.

### Modifiers

`.control-icons` is used when the control element contains icons.

```html
<div class="field">
	<div class="control control-icons">
		<input class="input input-sm" placeholder="www.microsoft.com" />
		<span class="icon border" aria-hidden="true"> </span>
	</div>
	<div class="control control-icons margin-top-xxs">
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

`.control-icon-right` is used to display the icon on the right side of the element.

```html
<div class="field">
	<div class="control control-icons control-icon-right">
		<input class="input input-sm" placeholder="www.microsoft.com" />
		<span class="icon border" aria-hidden="true"> </span>
	</div>
</div>
```

`.is-loading` is used to add a spinner icon.

```html
<div class="field">
	<div class="control is-loading">
		<input class="input input-sm" placeholder="www.microsoft.com" />
	</div>
</div>
```
