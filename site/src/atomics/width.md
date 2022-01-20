---
title: Width Atomics
description: Width related atomic css classes for the Atlas Design System
template: standard
---

# Width Atomics

Need to specifiy a specific width for an element? You've come to the right place! These classes should be used sparingly, and only used after testing heavily at all screen widths (starting with mobile). That said, if you need to specify and min, max or normal width, they can be a useful tool in the utility belt.

Values are in pixels. Keep in mind that the `min-width` and `max-width` properties override the standard `width` property. If you aren't using the Atlas core folder as a base for you styles, these classes work best when [you're setting `box-sizing` to be `border-box` in some way](https://css-tricks.com/box-sizing/#aa-present-day-box-sizing).

| cssproperty                                      | value (px)                               | screensize                                         |
| ------------------------------------------------ | ---------------------------------------- | -------------------------------------------------- |
| `width`                                          | `100`, `150`, `200`, `250`, `300`, `350` | all screensizes, `tablet`, `desktop`, `widescreen` |
| `width` (available on tablet screens and larger) | `400`, `450`                             | `tablet`, `desktop`, `widescreen`                  |

## Usage

Set the `width` of an element.

```html
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
```

### Responsive rules

Certain widths are too large for most mobile screens, so they are only available on larger screensizes. However, all helpers can be applied to any screensize.

```html
<div
	class="width-250 width-300-tablet width-350-desktop width-450-widescreen border padding-sm font-weight-semibold"
>
	<p>250 ➡ 300 ➡ 350 ➡ 450</p>
</div>
```

## Available classes

List of all available classes:

```atomics-filter
.width-100
.width-150
.width-200
.width-250
.width-300
.width-350
.width-400
.width-450
.width-100-tablet
.width-150-tablet
.width-200-tablet
.width-250-tablet
.width-300-tablet
.width-350-tablet
.width-400-tablet
.width-450-tablet
.width-100-desktop
.width-150-desktop
.width-200-desktop
.width-250-desktop
.width-300-desktop
.width-350-desktop
.width-400-desktop
.width-450-desktop
.width-100-widescreen
.width-150-widescreen
.width-200-widescreen
.width-250-widescreen
.width-300-widescreen
.width-350-widescreen
.width-400-widescreen
.width-450-widescreen
```
