---
title: Star rating
description: The star rating component in the Atlas Design System
template: standard
---

# Star rating

Needs form connection.

```html
<star-rating name="rating-1" value="0">
	<legend slot="legend">How are we doing?</legend>
	<span slot="label-1">Terrible</span>
	<span slot="label-2">Poor</span>
	<span slot="label-3">Fair</span>
	<span slot="label-4">Good</span>
	<span slot="label-5">Great</span>
</star-rating>
```

Apply `readonly` attribute to make the element non-interactive.

```html
<star-rating name="rating-2" value="1" readonly>
	<legend slot="legend">How are we doing?</legend>
	<span slot="label-1">Terrible</span>
	<span slot="label-2">Poor</span>
	<span slot="label-3">Fair</span>
	<span slot="label-4">Good</span>
	<span slot="label-5">Great</span>
</star-rating>
```
