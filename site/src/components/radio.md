---
title: Radio
description: The radio component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D838%253A1096"
---

# Radio

A radio button allows users to select a single option. It is usually associated with form submissions.

| Type      | Default State                                                                                                                                                | Disabled                                                                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unchecked | <label class="radio" title=""><input type="radio" name="question-0" value="0" class="radio-dot"> <span class="radio-label-text">50%</span></label>           | <label class="radio" title=""><input type="radio" name="question-0" value="1" class="radio-dot" disabled> <span class="radio-label-text">70%</span></label>           |
| Checked   | <label class="radio" title=""><input type="radio" name="question-0-1" value="0" class="radio-dot" checked> <span class="radio-label-text">50%</span></label> | <label class="radio" title=""><input type="radio" name="question-0-2" value="1" class="radio-dot" checked disabled> <span class="radio-label-text">70%</span></label> |

## Usage

Here is an example of radio buttons. You can group multiple ratio buttons together within a `radios` container.
Make sure to use the same value for the `name` attribute within a group of radio buttons.

```html
<div class="radios">
	<label class="radio">
		<input checked name="question-1" type="radio" class="radio-dot" value="0" />
		<span class="radio-label-text">Yes</span>
	</label>
	<label class="radio">
		<input name="question-1" type="radio" class="radio-dot" value="1" />
		<span class="radio-label-text">No</span>
	</label>
	<label class="radio">
		<input name="question-1" type="radio" class="radio-dot" value="2" />
		<span class="radio-label-text">Maybe</span>
	</label>
</div>
```

## Modifiers

### Styles

You can add `radios-vertical` to the `radios` container to display a vertical alignment.

```html
<div class="radios radios-vertical">
	<label class="radio">
		<input name="question-3" type="radio" class="radio-dot" value="0" />
		<span class="radio-label-text">0%</span>
	</label>
	<label class="radio">
		<input name="question-3" type="radio" class="radio-dot" value="1" />
		<span class="radio-label-text">50%</span>
	</label>
	<label class="radio">
		<input name="question-3" type="radio" class="radio-dot" value="2" />
		<span class="radio-label-text">100%</span>
	</label>
</div>
```
