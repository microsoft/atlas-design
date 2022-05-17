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

`.form-grouped`

```html
<div class="field field-grouped">
	<div class="control">
		<a class="button is-primary"> Submit </a>
	</div>
	<div class="control">
		<a class="button is-danger"> Cancel </a>
	</div>
</div>
```

`.form-grouped-multiline`

```html
<div class="border">
	<div class="field field-grouped field-grouped-multiline">
		<div class="control">
			<a class="button"> One </a>
		</div>
		<div class="control">
			<a class="button"> Two </a>
		</div>
		<div class="control">
			<a class="button"> Twelve </a>
		</div>
		<div class="control">
			<a class="button"> Thirteen </a>
		</div>
	</div>
	<div class="field field-grouped field-grouped-multiline">
		<div class="control">
			<a class="button"> A </a>
		</div>
		<div class="control">
			<a class="button"> B </a>
		</div>
		<div class="control">
			<a class="button"> Y </a>
		</div>
		<div class="control">
			<a class="button"> Z </a>
		</div>
	</div>
</div>
```

`.form-horizontal`

```html
<div class="field display-flex-tablet">
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
	<div class="field display-flex-tablet">
		<div class="field-label field-label-lg">
			<label class="label" for="example-small-label">Search</label>
		</div>
		<div class="field-body">
			<div class="field">
				<div class="control">
					<input
						id="example-small-label"
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
