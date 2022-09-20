---
title: Overflow
description: Overflow related atomic css classes for the Atlas Design System
template: standard
documentedClassPrefixes:
  - overflow
---

# Overflow

At times, you'll need to determine the overflow behavior of an element. Atlas provides several classes to do this.

| cssproperty | value    | screensize |
| ----------- | -------- | ---------- |
| `overflow`  | `hidden` | `tablet`   |

## Usage

As an example we'll use a parent element's border radius in combination with `.overflow-hidden` to ensure a child element's background is clipped. This is primarily with images deeply nested in content, but here we'll use a background color for ease.

```html
<div class="overflow-hidden border-radius-lg">
	<div class="background-color-primary padding-xl">
		<p class="color-primary-invert font-size-xl">
			This box's borders are rounded because we gave the parent container overflow-hidden
		</p>
	</div>
</div>
```
