---
title: Checkbox
description: The checkbox component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D855%253A1014"
---

# Checkbox

A selectable menu list from which an user can make one or more selections.

<div class="table-wrapper margin-top-xs">
	<table class="table">
		<thead>
			<tr>
				<th>Type</th>
				<th>Default</th>
				<th>Disabled</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Unchecked</td>
				<td>
					<label class="checkbox">
						<input type="checkbox" />
						<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
						<span class="checkbox-text" aria-hidden="true">Default</span>
					</label>
				</td>
				<td>
					<label class="checkbox">
						<input type="checkbox" disabled />
						<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
						<span class="checkbox-text" aria-hidden="true">Disabled</span>
					</label>
				</td>
			</tr>
			<tr>
				<td>Checked</td>
				<td>
					<label class="checkbox">
						<input type="checkbox" checked />
						<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
						<span class="checkbox-text" aria-hidden="true">Default</span>
					</label>
				</td>
				<td>
					<label class="checkbox">
						<input type="checkbox" disabled checked />
						<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
						<span class="checkbox-text" aria-hidden="true">Disabled</span>
					</label>
				</td>
			</tr>
		</tbody>
	</table>
</div>

## Usage

Here is an example of a group of checkboxes. Default spacing is added between each `.checkbox` when there is more than one checkbox.

```html
<label class="checkbox">
	<input type="checkbox" />
	<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
	<span class="checkbox-text" aria-hidden="true">Checkbox 1</span>
</label>

<label class="checkbox">
	<input type="checkbox" checked />
	<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
	<span class="checkbox-text" aria-hidden="true">Checkbox 2</span>
</label>
```

## Modifiers

### Styles

For secondary checkboxes, `.is-secondary` can be used with `.checkbox` to change the checkbox background color.

```html
<label class="checkbox is-secondary">
	<input type="checkbox" checked />
	<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
	<span class="checkbox-text" aria-hidden="true">Checked</span>
</label>
```

### Size

`.checkbox-sm` is used with `.checkbox` to display a smaller checkbox.

```html
<label class="checkbox checkbox-sm">
	<input type="checkbox" checked />
	<span class="checkbox-check" role="presentation" aria-hidden="true"></span>
	<span class="checkbox-text" aria-hidden="true">Checked</span>
</label>
```
