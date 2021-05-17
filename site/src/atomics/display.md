---
title: Display Atomics
description: Display related atomic css classes for the Atlas Design System
template: standard
---

# Display Atomics

The following displays are covered: `block`, `flex`, `inline`, `inline-block`, `inline-flex`, `grid`, and `none`.

The following breakpoints are supported for each display value:

```Text
.display-{value}-tablet
.display-{value}-desktop
.display-{value}-widescreen
```

## Example

```html
<div class="display-block border">
	<div>Foo</div>
	<div>Foo</div>
</div>
<div class="display-flex-tablet border">
	<div>Bar</div>
	<div>Bar</div>
</div>
<div class="display-inline-desktop border">
	<div>Baz</div>
	<div>Baz</div>
</div>
<div class="display-inline-flex-widescreen border">
	<div>Foo</div>
	<div>Foo</div>
</div>
```
