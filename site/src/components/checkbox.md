---
title: Checkbox
description: The checkbox component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D509%253A616%26t%3DMi9Bg3tcqIe8LtND-1
classType: Component
classPrefixes:
  - checkbox
---

# Checkbox

A checkbox is a square box that allows you to select the displayed option when activated. It is usually associated with form submissions.

| Type      | Default State                                                                                                                                                                                       | Disabled                                                                                                                                                                                                      |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unchecked | <label class="checkbox font-size-md"><input type="checkbox" /><span class="checkbox-check" role="presentation" aria-hidden="true"></span><span class="checkbox-text">Default</span></label>         | <label class="checkbox font-size-md"><input type="checkbox" disabled /><span class="checkbox-check" role="presentation" aria-hidden="true"></span><span class="checkbox-text">Disabled</span></label>         |
| Checked   | <label class="checkbox font-size-md"><input type="checkbox" checked /><span class="checkbox-check" role="presentation" aria-hidden="true"></span><span class="checkbox-text">Default</span></label> | <label class="checkbox font-size-md"><input type="checkbox" disabled checked /><span class="checkbox-check" role="presentation" aria-hidden="true"></span><span class="checkbox-text">Disabled</span></label> |

## Usage

Here is an example of a group of checkboxes. Default spacing is added between each `.checkbox` when there is more than one checkbox.

```html
<label class="checkbox">
	<input type="checkbox" name="checkbox-example" />
	<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
	<span class="checkbox-text">Checkbox 1</span>
</label>

<label class="checkbox">
	<input type="checkbox" checked name="checkbox-example" />
	<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
	<span class="checkbox-text">Checkbox 2</span>
</label>
```

## Modifiers

### Styles

`.checkbox-muted` can be used with `.checkbox` to change the checkbox background color.

```html
<label class="checkbox checkbox-muted">
	<input type="checkbox" checked name="checkbox-muted" />
	<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
	<span class="checkbox-text">Checked</span>
</label>
```

`is-checked` can be used with `.checkbox-check` to create the appearance of a checkbox with a checked state, without having a clickable `.checkbox` input element.

```html
<label class="checkbox">
	<span class="checkbox-check is-checked" role="presentation" aria-hidden="true"></span>
	<span class="checkbox-text">Checked</span>
</label>
```

### Sizes

`.checkbox-sm`/`.checkbox-lg` can be used to make a checkbox bigger or smaller than the default.

```html
<label class="checkbox checkbox-sm">
	<input type="checkbox" name="checkbox-size" />
	<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
	<span class="checkbox-text">Checkbox small</span>
</label>
<label class="checkbox">
	<input type="checkbox" name="checkbox-size" />
	<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
	<span class="checkbox-text">Checkbox default</span>
</label>
<label class="checkbox checkbox-lg">
	<input type="checkbox" name="checkbox-size" />
	<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
	<span class="checkbox-text">Checkbox large</span>
</label>
```

### Validation states

We can use `.is-invalid` to reflect an invalid validation state. Note that the state should also be display to the user in another way, since by itself color is not enough.

| State   | Class                   |                                                                                                                                                                                                                       |
| ------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Invalid | `.checkbox .is-invalid` | <label class="checkbox is-invalid"><input type="checkbox" name="checkbox-validation" /><span class="checkbox-check" role="presentation" aria-hidden="true"></span><span class="checkbox-text">Checkbox</span></label> |

```html
<label class="checkbox is-invalid">
	<input type="checkbox" name="checkbox-validation-demo" />
	<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
	<span class="checkbox-text">Checkbox</span>
</label>
```
