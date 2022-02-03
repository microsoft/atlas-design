---
title: Input
description: The input component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D506%253A1176
---

# Input component

Input elements are used to accept data from the user.

| Class    | Default                                                       | Disabled                                                               |
| -------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `.input` | <input class="input" type="text" placeholder="Placeholder" /> | <input class="input" type="text" placeholder="Placeholder" disabled /> |

```abut-html
<input class="input" type="text" placeholder="Placeholder" />
```

## Usage

Inputs are normally paired with a label, but there times when they can be used without a label. Placeholder text should primarily be used as a content prompt and only provided when needed.

```html
<label class="label">Label</label>
<input class="input" type="text" placeholder="Placeholder text" />
```

## Sizes

`input-sm`/`input-lg` makes input a little bigger or smaller than the default.

```html
<input class="input input-sm" type="text" placeholder="Placeholder" />
<input class="input margin-top-xs" type="text" placeholder="Placeholder" />
<input class="input input-lg margin-top-xs" type="text" placeholder="Placeholder" />
```

`input-narrow`/`input-narrow-tablet` resets input's width.

```html
<input class="input input-narrow" type="text" placeholder="Placeholder" />
<div class="display-flex align-items-center padding-sm color-danger font-size-sm">
	<div class="flex-grow-1 margin-right-xs border-color-danger border-top"></div>
	<p>The following are only applied above the tablet breakpoint</p>
	<div class="flex-grow-1 margin-left-xs border-color-danger border-top"></div>
</div>
<input class="input input-narrow-tablet margin-top-xs" type="text" placeholder="Placeholder" />
```

## Validation states

`input-error`/`input-warning`/`input-success` helps with visual reflection of validation states.

| State   | Class                   |                                                                             |
| ------- | ----------------------- | --------------------------------------------------------------------------- |
| Error   | `.input .input-error`   | <input class="input input-error" type="text" placeholder="Placeholder" />   |
| Warning | `.input .input-warning` | <input class="input input-warning" type="text" placeholder="Placeholder" /> |
| Success | `.input .input-success` | <input class="input input-success" type="text" placeholder="Placeholder" /> |

```abut-html
<input class="input .input-error" type="text" placeholder="Placeholder" />
```
