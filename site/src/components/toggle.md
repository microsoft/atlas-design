---
title: Toggle
description: The Toggle component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D838%253A851
---

# Toggle

A selectable form element that represents a binary state (on or off).

```html
<div class="toggle">
	<input id="toggle-id-0" type="checkbox" aria-label="Toggle me!" />
	<label for="toggle-id-0"></label>
</div>
```

## Disabled states

In order to achieve disabled styles, you'll need to add the `disabled` attribute to the inner input.

### Disabled and unselected

```html
<div class="toggle">
	<input id="toggle-id-2" type="checkbox" aria-label="Disabled toggle" disabled />
	<label for="toggle-id-2"></label>
</div>
```

### Disabled and selected

```html
<div class="toggle">
	<input id="toggle-id-2" type="checkbox" aria-label="Disabled toggle" checked disabled />
	<label for="toggle-id-2"></label>
</div>
```
