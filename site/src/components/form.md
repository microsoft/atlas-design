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

`.form-grouped` can be used to group controls together.

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

`.field-horizontal`

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

`.control-icon`

```html
<div class="field">
	<div class="control control-icon">
		<input class="input input-small" placeholder="www.microsoft.com" />
		<span class="icon border" aria-hidden="true"> </span>
	</div>
</div>
```

`.control-icon-right`

```html
<div class="field">
	<div class="control control-icon control-icon-right">
		<input class="input input-small" placeholder="www.microsoft.com" />
		<span class="icon border" aria-hidden="true"> </span>
	</div>
</div>
```

```html
<div class="field">
	<div class="control control-icon control-icon-right">
		<div class="select">
			<select>
				<option>A</option>
				<option>B</option>
			</select>
			<span class="icon border" aria-hidden="true"> </span>
		</div>
	</div>
</div>
```

`.is-loading`

```html
<div class="field">
	<div class="control is-loading">
		<input class="input input-small" placeholder="www.microsoft.com" />
	</div>
</div>
```
