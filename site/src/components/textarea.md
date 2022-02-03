---
title: Textarea
description: The textarea component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D506%253A1176
---

# Textarea component

Textarea element represents a multi-line plain-text editing control.

| Class       | Default                                                               | Disabled                                                                        |
| ----------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `.textarea` | <textarea class="textarea" placeholder="Default textarea"></textarea> | <textarea class="textarea" placeholder="Default textarea" disabled ></textarea> |

```abut-html
<textarea class="textarea" placeholder="Default textarea"></textarea>
```

## Usage

```html
<label class="label">Label</label>
<textarea class="textarea" placeholder="Textarea placeholder"></textarea>
```

## Sizes

`textarea-sm`/`textarea-lg` makes textarea a little bigger or smaller than the default.

```html
<textarea class="textarea textarea-sm" placeholder="Textarea placeholder"></textarea>
<textarea class="textarea margin-top-xs" placeholder="Textarea placeholder"></textarea>
<textarea class="textarea textarea-lg margin-top-xs" placeholder="Textarea placeholder"></textarea>
```

`textarea-narrow`/`textarea-narrow-tablet` resets textarea's width.

```html
<textarea class="textarea textarea-narrow" placeholder="Textarea placeholder"></textarea>
<div class="display-flex align-items-center padding-sm color-danger font-size-sm">
	<div class="flex-grow-1 margin-right-xs border-color-danger border-top"></div>
	<p>The following are only applied above the tablet breakpoint</p>
	<div class="flex-grow-1 margin-left-xs border-color-danger border-top"></div>
</div>
<textarea class="textarea textarea-narrow-tablet" placeholder="Textarea placeholder"></textarea>
```

## Validation states

`textarea-error`/`textarea-warning`/`textarea-success` helps with visual reflection of validation states.

| State   | Class                         |                                                                                        |
| ------- | ----------------------------- | -------------------------------------------------------------------------------------- |
| Error   | `.textarea .textarea-error`   | <textarea class="textarea textarea-error" placeholder="Default textarea"></textarea>   |
| Warning | `.textarea .textarea-warning` | <textarea class="textarea textarea-warning" placeholder="Default textarea"></textarea> |
| Success | `.textarea .textarea-success` | <textarea class="textarea textarea-success" placeholder="Default textarea"></textarea> |

```abut-html
<textarea class="textarea textarea-error" placeholder="Default textarea"></textarea>
```
