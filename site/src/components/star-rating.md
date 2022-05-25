---
title: Star rating
description: The star rating component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D7644%253A40559
---

# Star rating

The star rating component allows the user to select a rating value. It is often used with forms to collect user feedback.

```html
<star-rating name="rating-1">
	<span slot="legend" class="padding-right-xxs">How are we doing?</span>
	<span slot="label-1">Terrible</span>
	<span slot="label-2">Poor</span>
	<span slot="label-3">Fair</span>
	<span slot="label-4">Good</span>
	<span slot="label-5">Great</span>
</star-rating>
```

Apply `disabled` attribute to make the element non-interactive and non-focusable.

```html
<star-rating name="rating-2" value="2" disabled>
	<legend slot="legend" class="padding-right-xxs">How are we doing?</legend>
	<span slot="label-1">Terrible</span>
	<span slot="label-2">Poor</span>
	<span slot="label-3">Fair</span>
	<span slot="label-4">Good</span>
	<span slot="label-5">Great</span>
</star-rating>
```
