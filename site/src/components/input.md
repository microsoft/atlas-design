---
title: Input
description: The input component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D506%253A1176
classType: Component
classPrefixes:
  - input
---

# Input

Input elements are used to accept data from the user.

| Class    | Default                             | Disabled                                     |
| -------- | ----------------------------------- | -------------------------------------------- |
| `.input` | <input class="input" type="text" /> | <input class="input" type="text" disabled /> |

```html
<input class="input" type="text" />
```

## Usage

Here is an example of a standard usage of input paired with a label.

```html
<label class="label margin-bottom-xxs" for="input-demo">Label</label>
<input class="input" id="input-demo" type="text" />
```

### Sizes

`input-sm`/`input-lg` makes input a little bigger or smaller than the default.

```html
<input class="input input-sm" type="text" />
<input class="input margin-top-xs" type="text" />
<input class="input input-lg margin-top-xs" type="text" />
```

### Validation states

`input-danger`/`input-success` helps with visual reflection of validation states.

| State   | Class                   |                                                                             |
| ------- | ----------------------- | --------------------------------------------------------------------------- |
| Danger  | `.input .input-danger`  | <input class="input input-danger" type="text" placeholder="Placeholder" />  |
| Success | `.input .input-success` | <input class="input input-success" type="text" placeholder="Placeholder" /> |

```html
<input class="input input-danger" type="text" />
```

### Modifiers

Use `input-icon` on the input in combination with a `.icon` sibling to add an icon to the input. If the icon needs to displayed at the end of the input, use `input-icon-right`.

```html
<div class="position-relative margin-bottom-xxs">
	<input class="input input-icon input-sm" type="text" />
	<span class="icon">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
			<path
				d="M1344 0q97 0 187 25t168 71 142 110 111 143 71 168 25 187q0 97-25 187t-71 168-110 142-143 111-168 71-187 25q-125 0-239-42t-211-121l-785 784q-19 19-45 19t-45-19-19-45q0-26 19-45l784-785q-79-96-121-210t-42-240q0-97 25-187t71-168 110-142T989 96t168-71 187-25zm0 1280q119 0 224-45t183-124 123-183 46-224q0-119-45-224t-124-183-183-123-224-46q-119 0-224 45T937 297 814 480t-46 224q0 119 45 224t124 183 183 123 224 46z"
			/></svg
	></span>
</div>
<div class="position-relative margin-bottom-xxs">
	<input class="input input-icon-right" type="text" />
	<span class="icon">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
			<path
				d="M1344 0q97 0 187 25t168 71 142 110 111 143 71 168 25 187q0 97-25 187t-71 168-110 142-143 111-168 71-187 25q-125 0-239-42t-211-121l-785 784q-19 19-45 19t-45-19-19-45q0-26 19-45l784-785q-79-96-121-210t-42-240q0-97 25-187t71-168 110-142T989 96t168-71 187-25zm0 1280q119 0 224-45t183-124 123-183 46-224q0-119-45-224t-124-183-183-123-224-46q-119 0-224 45T937 297 814 480t-46 224q0 119 45 224t124 183 183 123 224 46z"
			/></svg
	></span>
</div>
<div class="position-relative">
	<input class="input input-icon input-lg" type="text" />
	<span class="icon">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
			<path
				d="M1344 0q97 0 187 25t168 71 142 110 111 143 71 168 25 187q0 97-25 187t-71 168-110 142-143 111-168 71-187 25q-125 0-239-42t-211-121l-785 784q-19 19-45 19t-45-19-19-45q0-26 19-45l784-785q-79-96-121-210t-42-240q0-97 25-187t71-168 110-142T989 96t168-71 187-25zm0 1280q119 0 224-45t183-124 123-183 46-224q0-119-45-224t-124-183-183-123-224-46q-119 0-224 45T937 297 814 480t-46 224q0 119 45 224t124 183 183 123 224 46z"
			/></svg
	></span>
</div>
```
