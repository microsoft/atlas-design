---
title: Overflow
description: Overflow related atomic css classes for the Atlas Design System
template: standard
classType: Atomics
classPrefixes:
  - overflow
  - scrollbar-gutter
---

# Overflow

At times, you'll need to determine the overflow behavior of an element. Atlas provides several classes to do this.

| cssproperty        | value                         | screensize |
| ------------------ | ----------------------------- | ---------- |
| `overflow`         | `hidden`                      | `tablet`   |
| `overflow-x`       | `hidden`                      | `tablet`   |
| `scrollbar-gutter` | `stable`, `stable-both-edges` |            |

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

## Scrollbar gutter

When using automatic overflow, as with the [scrolling components](../components/scroll.md), the sudden appearance or disappearance of a container's scrollbar can cause the container's content to jump around. While this might be fine if the scrollbar appears or disappears as a result of the user zooming or resizing their browser, it can look clunky otherwise — such as when messages are appended to a constrained-width or constrained-height chat container, resulting in a scrollbar where there wasn't one previously.

To see this default behavior, resize the below example until its scrollbar appears.

<div class="scroll-vertical max-height-30vh background-color-primary inner-focus margin-top-xs" data-focusable-if-scrollable style="resize: vertical">
	<p class="color-success-invert font-size-xl margin-bottom">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		<pre class="color-success-invert">
		|
		|
		|
		|
    	▼
    	</pre>
    </p>
</div>

The scrollbar gutter atomics can be used to reserve space for the scrollbar when it's not visible. That way, when the scrollbar appears, it uses that reserved space, and no content jumps around.

`.scrollbar-gutter-stable` reserves only the space for the scrollbar. In this example, notice the padding-like space on the right side of the container. When you resize the container, the scrollbar appears in that space, and none of the text shifts.

<div class="scroll-vertical scrollbar-gutter-stable max-height-30vh background-color-primary inner-focus margin-top-xs" data-focusable-if-scrollable style="resize: vertical">
	<p class="color-success-invert font-size-xl margin-bottom">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		<pre class="color-success-invert">
		|
		|
		|
		|
    	▼
    	</pre>
    </p>
</div>

`.scrollbar-gutter-stable-both-edges` reserves space for the scrollbar and an equal amount of space on the opposite side, so that the content appears more centered within its container. In this example, padding-like space is added to both the left and right sides of the container, centering the text a little. When the scrollbar appears, it appears on the right side of the container, with no change to that extra spacing on the left.

<div class="scroll-vertical scrollbar-gutter-stable-both-edges max-height-30vh background-color-primary inner-focus margin-top-xs" data-focusable-if-scrollable style="resize: vertical">
	<p class="color-success-invert font-size-xl margin-bottom">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		<pre class="color-success-invert">
		|
		|
		|
		|
    	▼
    	</pre>
    </p>
</div>
