---
title: Textarea
description: The textarea component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D506%253A1176
classType: Component
classPrefixes:
  - textarea
---

# Textarea

Textarea element represents a multi-line plain-text editing control.

| Class       | Default                                                          | Disabled                                                                   |
| ----------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `.textarea` | <textarea class="textarea" placeholder="Placeholder"></textarea> | <textarea class="textarea" placeholder="Placeholder" disabled ></textarea> |

```abut-html
<textarea class="textarea" placeholder="Placeholder"></textarea>
```

## Usage

Here is an example of a standard textarea usage paired with a label.

```html
<label class="label margin-bottom-xxs" for="textarea-demo">Label</label>
<textarea class="textarea" id="textarea-demo" placeholder="Placeholder"></textarea>
```

### Sizes

`textarea-fixed-height` disables the ability to resize the textarea component in browser.

```html
<textarea class="textarea textarea-fixed-height" placeholder="Placeholder"></textarea>
```

### Validation states

`textarea-danger`/`textarea-success` helps with visual reflection of validation states.

| State   | Class                         |                                                                                   |
| ------- | ----------------------------- | --------------------------------------------------------------------------------- |
| Danger  | `.textarea .textarea-danger`  | <textarea class="textarea textarea-danger" placeholder="Placeholder"></textarea>  |
| Success | `.textarea .textarea-success` | <textarea class="textarea textarea-success" placeholder="Placeholder"></textarea> |

```abut-html
<textarea class="textarea textarea-danger" placeholder="Placeholder"></textarea>
```
