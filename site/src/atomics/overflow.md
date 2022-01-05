---
title: Overflow
description: Border related atomic css classes for the Atlas Design System
template: standard
---

# Overflow

At times, you'll need to determine the overflow behavior of an element. Atlas provides several classes to do this.

| cssproperty                            | value    | screensize |
| -------------------------------------- | -------- | ---------- |
| `overflow`, `overflow-x`, `overflow-y` | `hidden` | N/A        |

## Usage

As an examplem we'll use a parent element's border radius in combination with `.overflow-hidden` to ensure a child element's background is clipped. This is primarily useful with images nested deeploy in content, but here we'll use a background color for ease.

```html
<div class="overflow-hidden border-radius-l">
	<div class="background-color-primary padding-xl">
		<p class="color-primary-invert font-size-xl">
			This box's borders are rounded because we gave the parent container overflow-hidden
		</p>
	</div>
</div>
```

## Available classes

List of all available classes:

```atomics-filter
.overflow-hidden
.overflow-x-hidden
.overflow-y-hidden
.overflow-hidden-tablet
.overflow-x-hidden-tablet
.overflow-y-hidden-tablet
```