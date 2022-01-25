---
title: Width Atomics
description: Width related atomic css classes for the Atlas Design System
template: standard
---

# Width Atomics

Need to specifiy a specific width for an element? You've come to the right place! These classes should be used sparingly, and only used after testing heavily at all screen widths (starting with mobile). That said, if you need to specify and min, max or normal width, they can be a useful tool in the utility belt.

Values are in pixels. Keep in mind that the `min-width` and `max-width` properties override the standard `width` property. If you aren't using the Atlas core folder as a base for your styles, these classes work best when [you're setting `box-sizing` to be `border-box` in some way](https://css-tricks.com/box-sizing/#aa-present-day-box-sizing). Values represent pixel unless they are a string or otherwise specified.

| cssproperty                                      | value                                                    | screensize                            |
| ------------------------------------------------ | -------------------------------------------------------- | ------------------------------------- |
| `width`                                          | `auto`, `100`, `150`, `200`, `250`, `300`. `full` (100%) | all screensizes, `tablet`, `desktop`, |
| `width` (available on tablet screens and larger) | `350`, `400`, `450`, `unset`                             | `tablet`, `desktop`,                  |

## Usage

Set the `width` of an element.

```html
<div class="width-auto border padding-sm font-weight-semibold">
	<p>Auto</p>
</div>
<div class="width-100 border padding-sm font-weight-semibold">
	<p>100</p>
</div>
<div class="width-150 border padding-sm font-weight-semibold">
	<p>150</p>
</div>
<div class="width-200 border padding-sm font-weight-semibold">
	<p>200</p>
</div>
<div class="width-250 border padding-sm font-weight-semibold">
	<p>250</p>
</div>
<div class="width-300 border padding-sm font-weight-semibold">
	<p>300</p>
</div>
<div class="width-350 border padding-sm font-weight-semibold">
	<p>350</p>
</div>
<div class="display-flex align-items-center padding-sm color-danger font-size-sm">
	<div class="flex-grow-1 margin-right-xs border-color-danger border-top"></div>
	<p>The following are only applied above the tablet breakpoint</p>
	<div class="flex-grow-1 margin-left-xs border-color-danger border-top"></div>
</div>
<div class="width-400-tablet border padding-sm font-weight-semibold">
	<p>400</p>
</div>
<div class="width-450-tablet border padding-sm font-weight-semibold">
	<p>450</p>
</div>
```

### Responsive rules

Certain widths are too large for many mobile screens, so they are only available on larger screensizes. See the table above for information on which helpers can be applied universally.

```html
<div class="width-250 width-300-tablet width-400-desktop border padding-sm">
	<p>250 ➡ 300 ➡ 400</p>
</div>
```

### Unsetting widths

Another possible pattern may be that a container needs to be constrained on smaller screens but not on larger screens. In this case you can follow a mobile first approach, applying a universal width class to the element, and then undoing it on larger screens with `width-unset-<screensize>`.

```html
<div class="width-150 width-unset-tablet border padding-sm">
	<p>A narrow container on small screens, then no fixed width</p>
</div>
```

## Available classes

List of all available classes:

```atomics-filter
.width-full
.width-auto
.width-100
.width-150
.width-200
.width-250
.width-300
.width-350
.width-full-tablet
.width-auto-tablet
.width-100-tablet
.width-150-tablet
.width-200-tablet
.width-250-tablet
.width-300-tablet
.width-350-tablet
.width-400-tablet
.width-450-tablet
.width-unset-tablet
.width-full-desktop
.width-auto-desktop
.width-100-desktop
.width-150-desktop
.width-200-desktop
.width-250-desktop
.width-300-desktop
.width-350-desktop
.width-400-desktop
.width-450-desktop
.width-unset-desktop
```
