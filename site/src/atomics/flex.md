---
title: Flex Atomics
description: Flex related atomic css classes for the Atlas Design System
template: standard
---

# Flex Atomics

Flex atomics are used to modify the layout of elements using flexbox and grid properties.

## Usage

### Flex-direction

The flex-drection property sets the main axis and direction of items within a flexbox container. The default flex direction is `row`, which places items in a line in the same way as the text direction on the main axis.

- `row-reverse`: items are placed in opposite way as the text direction.
- `column`: items are stacked in same way as the text direction on the cross axis.
- `column-reverse`: items are stacked in opposite way as the text direction on the cross axis.

```html
<div class="display-flex border border-bottom-none">
	<div class="margin-right-xs">Default row item 1</div>
	<div>Default row item 2</div>
</div>
<div class="display-flex border border-bottom-none flex-direction-row-reverse">
	<div>flex-direction-row-reverse item 1</div>
	<div class="margin-right-xs">flex-direction-row-reverse item 2</div>
</div>
<div class="display-flex border border-bottom-none flex-direction-column">
	<div>flex-direction-column item 1</div>
	<div>flex-direction-column item 2</div>
</div>
<div class="display-flex border flex-direction-column-reverse">
	<div>flex-direction-column-reverse item 1</div>
	<div>flex-direction-column-reverse item 2</div>
</div>
```

### Justify-content

The justify-content property sets the space around and between flex items along the main axis.

- `justify-content-flex-start`: items are placed towards the start of the main axis.
- `justify-content-flex-end`: items are placed towards the end of the main axis.
- `justify-content-flex-center`: items are placed at the center of the main axis.
- `justify-content-flex-space-around`: any remaining space is placed before, between, and after the items.
- `justify-content-flex-space-between`: any remaining space is placed between the items.
- `justify-content-flex-space-evenly`: any remaining space is placed around the items evenly.

```html
<div class="display-flex border border-bottom-none justify-content-flex-start">
	justify-content-flex-start
</div>
<div class="display-flex border border-bottom-none justify-content-flex-end">
	justify-content-flex-end
</div>
<div class="display-flex border border-bottom-none justify-content-center">
	justify-content-center
</div>
<div class="display-flex border border-bottom-none justify-content-space-around">
	justify-content-space-around
</div>
<div class="display-flex border border-bottom-none justify-content-space-between">
	<div>justify-content-space-between</div>
	<div>justify-content-space-between</div>
</div>
<div class="display-flex border justify-content-space-evenly">
	<div>justify-content-space-evenly</div>
	<div>justify-content-space-evenly</div>
</div>
```

### Align-items

The align-items property sets the `align-self` value on all direct children and aligns them within a line along the cross axis. By default, the cross axis is vertical.

- `align-items-flex-start`: items are aligned at the start of the cross axis, so at the top.
- `align-items-flex-end`: items are aligned at the end of the cross axis, so at the bottom.
- `align-items-center`: items are aligned at the center of the cross axis.
- `align-items-baseline`: the items are aligned at the baseline of the cross axis, meaning that the items will align themselves to have the baseline of their text along a horizontal line.
- `align-items-stretch`: items will fill all available vertical space.

```html
<div class="display-flex border border-bottom-none align-items-flex-start">
	<div class="margin-block-xs"></div>
	<div>align-items-flex-start</div>
</div>
<div class="display-flex border border-bottom-none align-items-flex-end">
	<div class="margin-block-xs"></div>
	<div>align-items-flex-end</div>
</div>
<div class="display-flex border border-bottom-none align-items-center">
	<div class="margin-block-xs"></div>
	<div>align-items-center</div>
</div>
<div class="display-flex border border-bottom-none align-items-baseline">
	<div class="margin-block-xs"></div>
	<div>align-items-baseline</div>
</div>
<div class="display-flex border align-items-stretch">
	<div class="margin-block-xs"></div>
	<div>align-items-stretch</div>
</div>
```

### Align-self

The align-self property overrides a flex or grid item's `align-items` value for a single item.

```html
<div class="display-flex border align-items-center example-lg">
	<div class="border border-top-none padding-inline-xs align-self-flex-start">
		align-self-flex-start
	</div>
	<div class="border border-bottom-none padding-inline-xs align-self-flex-end">
		align-self-flex-end
	</div>
	<div class="border padding-inline-xs align-self-center">align-self-center</div>
	<div class="border-left border-bottom padding-inline-xs align-self-baseline">
		align-self-baseline
	</div>
	<div class="border-left padding-inline-xs align-self-stretch ">align-self-stretch</div>
</div>
```

### Flex-wrap

The flex-wrap property determines whether flex items appear on a single line or on multiple lines. The default value is `nowrap`, in which items will remain on one line and will overflow.

- `flex-wrap-wrap`: items will be placed onto multiple lines if needed.
- `flex-wrap-wrap-reverse`: items will be placed onto multiple lines if needed, but in reverse order.

```html
<div class="display-flex border border-bottom-none">
	<div class="margin-inline-xxl">Item 1</div>
	<div class="margin-inline-xxl">Item 2</div>
	<div class="margin-inline-xxl">Item 3</div>
	<div class="margin-inline-xxl">Item 4</div>
	<div class="margin-inline-xxl">Item 5</div>
</div>
<div class="display-flex border border-bottom-none flex-wrap-wrap">
	<div class="margin-inline-xxl">flex-wrap-wrap item 1</div>
	<div class="margin-inline-xxl">flex-wrap-wrap item 2</div>
	<div class="margin-inline-xxl">flex-wrap-wrap item 3</div>
	<div class="margin-inline-xxl">flex-wrap-wrap item 4</div>
	<div class="margin-inline-xxl">flex-wrap-wrap item 5</div>
</div>
<div class="display-flex border flex-wrap-wrap-reverse">
	<div class="margin-inline-xxl">flex-wrap-wrap-reverse item 1</div>
	<div class="margin-inline-xxl">flex-wrap-wrap-reverse item 2</div>
	<div class="margin-inline-xxl">flex-wrap-wrap-reverse item 3</div>
	<div class="margin-inline-xxl">flex-wrap-wrap-reverse item 4</div>
	<div class="margin-inline-xxl">flex-wrap-wrap-reverse item 5</div>
</div>
```

### Align-content

The align-content property distributes space around and between items along a flexbox's cross-axis or grid's block axis. It is only applied when `flex-wrap-wrap` is used on container and it has multiple lines.

```html
<div
	class="display-flex border border-bottom-none example-lg flex-wrap-wrap align-content-flex-start"
>
	<div>align-content-flex-start</div>
</div>
<div
	class="display-flex border border-bottom-none example-lg flex-wrap-wrap align-content-flex-end"
>
	<div>align-content-flex-end</div>
</div>
<div
	class="display-flex border border-bottom-none example-lg flex-wrap-wrap align-content-space-around"
>
	<div>align-content-space-around</div>
	<div>align-content-space-around</div>
</div>
<div
	class="display-flex border border-bottom-none example-lg flex-wrap-wrap align-content-space-between"
>
	<div>align-content-space-between</div>
	<div>align-content-space-between</div>
</div>
<div class="display-flex border example-lg flex-wrap-wrap align-content-stretch">
	<div>align-content-stretch</div>
	<div>align-content-stretch</div>
</div>
```

### Flex-grow

The flex-grow property determines how much of available space is assigned to an item, depending on the container's flex-direction value.

- `flex-grow-0`: item will not grow.
- `flex-grow-1`: item will grow by a factor of 1 to fill any available space if no other flexbox item has a `flex-grow` value.

```html
<div class="display-flex border margin-bottom-xs">
	<div class="border-right padding-right-xs flex-grow-0 " style="width: 50px;">flex-grow-0</div>
	<div class="flex-grow-0" style="width: 50px;">flex-grow-0</div>
</div>
<div class="display-flex border">
	<div class="border-right flex-grow-1 " style="width: 250px;">flex-grow-1</div>
	<div class="flex-grow-1" style="width: 250px;">flex-grow-1</div>
</div>
```

### Flex-shrink

The flex-shrink property reduces the size of an item to fit its flex container.

- `flex-shrink-0`: item will not shrink.
- `flex-shrink-1`: item will shrink by a factor of 1 if there's not enough space in the container's main axis.

```html
<div class="display-flex border margin-bottom-xs">
	<div class="border-right padding-right-xxl flex-shrink-0">flex-shrink-0</div>
	<div class="border-right padding-right-xxl flex-shrink-0 ">flex-shrink-0</div>
	<div class="border-right padding-right-xxl flex-shrink-0 ">flex-shrink-0</div>
	<div class="border-right padding-right-xxl flex-shrink-0 ">flex-shrink-0</div>
	<div class="border-right-none padding-right-xxl flex-shrink-0 ">flex-shrink-0</div>
	<div class="padding-right-xxl flex-shrink-0 ">flex-shrink-0</div>
	<div class="border padding-right-xxl flex-shrink-0 ">flex-shrink-0</div>
</div>
<div class="display-flex border">
	<div class="border-right padding-right-xxl flex-shrink-1 ">flex-shrink-1</div>
	<div class="border-right padding-right-xxl flex-shrink-1 ">flex-shrink-1</div>
	<div class="border-right padding-right-xxl flex-shrink-1 ">flex-shrink-1</div>
	<div class="border-right padding-right-xxl flex-shrink-1 ">flex-shrink-1</div>
	<div class="border-right padding-right-xxl flex-shrink-1 ">flex-shrink-1</div>
	<div class="border-right padding-right-xxl flex-shrink-1 ">flex-shrink-1</div>
	<div class="flex-shrink-1">flex-shrink-1</div>
</div>
```
