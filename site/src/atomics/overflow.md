---
title: Overflow
description: Overflow related atomic css classes for the Atlas Design System
template: standard
classType: Atomics
classPrefixes:
  - overflow
---

# Overflow

At times, you'll need to determine the overflow behavior of an element. Atlas provides several classes to do this.

| cssproperty | value    | screensize |
| ----------- | -------- | ---------- |
| `overflow`  | `hidden` | `tablet`   |
| `overflow-x`  | `hidden` | `tablet`   |

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

## Direction

You can use `.overflow-x-hidden` to set the clipping behavior for the left/right edges of the content only.

```html
<div class="border-radius-lg">
    <div class="">
        <div class="overflow-x-hidden" style="width: 100px">
          <p class="font-size-xl" style="width: 150px">
            This text is clipped on its right edge because we gave the parent container overflow-hidden.
          </p>
        </div>
    </div>
</div>
```
