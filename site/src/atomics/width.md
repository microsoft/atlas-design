---
title: Width Atomics
description: Width related atomic css classes for the Atlas Design System
template: standard
---

# Width Atomics

Need to specifiy a specific width for an element? You've come to the right place! These classes should be used sparingly, and only used after testing heavily at all screen widths (starting with mobile). That said, if you need to specify and min, max or normal width, they can be a useful tool in the utility belt.

Values are in pixels. Keep in mind that the `min-width` and `max-width` properties override the standard `width` property. If you aren't using the Atlas core folder as a base for you styles, these classes work best when [you're setting `box-sizing` to be `border-box` in some way](https://css-tricks.com/box-sizing/#aa-present-day-box-sizing).

| cssproperty                       | value (px)                                                    | screensize                        |
| --------------------------------- | ------------------------------------------------------------- | --------------------------------- |
| `width`, `max-width`, `min-width` | `100`, `150`, `200`, `250`, `300`, `350`, `400`, `450`, `500` | `tablet`, `desktop`, `widescreen` |

## Usage

Set the `width`, `min-width`, or `max-width` of an element. of an element

```html
<div class="width-100 box-shadow-heavy padding-sm font-weight-semibold">
	<p>100</p>
</div>
<div class="width-150 box-shadow-heavy padding-sm font-weight-semibold">
	<p>150</p>
</div>
<div class="width-200 box-shadow-heavy padding-sm font-weight-semibold">
	<p>200</p>
</div>
<div class="width-250 box-shadow-heavy padding-sm font-weight-semibold">
	<p>250</p>
</div>
<div class="width-300 box-shadow-heavy padding-sm font-weight-semibold">
	<p>300</p>
</div>
<div class="width-350 box-shadow-heavy padding-sm font-weight-semibold">
	<p>350</p>
</div>
<div class="width-400 box-shadow-heavy padding-sm font-weight-semibold">
	<p>400</p>
</div>
<div class="width-450 box-shadow-heavy padding-sm font-weight-semibold">
	<p>450</p>
</div>
<div class="width-500 box-shadow-heavy padding-sm font-weight-semibold">
	<p>500</p>
</div>
```

### Responsive rules

If there are screen-specific class variations available they can be described in this section.

```html
<div class="width-200 width-400-tablet box-shadow-heavy padding-sm font-weight-semibold">
	<p>300 ➡ 500</p>
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
.width-500
.width-100-tablet
.width-150-tablet
.width-200-tablet
.width-250-tablet
.width-300-tablet
.width-350-tablet
.width-400-tablet
.width-450-tablet
.width-500-tablet
.width-100-desktop
.width-150-desktop
.width-200-desktop
.width-250-desktop
.width-300-desktop
.width-350-desktop
.width-400-desktop
.width-450-desktop
.width-500-desktop
.width-100-widescreen
.width-150-widescreen
.width-200-widescreen
.width-250-widescreen
.width-300-widescreen
.width-350-widescreen
.width-400-widescreen
.width-450-widescreen
.width-500-widescreen
.max-width-100
.max-width-150
.max-width-200
.max-width-250
.max-width-300
.max-width-350
.max-width-400
.max-width-450
.max-width-500
.max-width-100-tablet
.max-width-150-tablet
.max-width-200-tablet
.max-width-250-tablet
.max-width-300-tablet
.max-width-350-tablet
.max-width-400-tablet
.max-width-450-tablet
.max-width-500-tablet
.max-width-100-desktop
.max-width-150-desktop
.max-width-200-desktop
.max-width-250-desktop
.max-width-300-desktop
.max-width-350-desktop
.max-width-400-desktop
.max-width-450-desktop
.max-width-500-desktop
.max-width-100-widescreen
.max-width-150-widescreen
.max-width-200-widescreen
.max-width-250-widescreen
.max-width-300-widescreen
.max-width-350-widescreen
.max-width-400-widescreen
.max-width-450-widescreen
.max-width-500-widescreen
.min-width-100
.min-width-150
.min-width-200
.min-width-250
.min-width-300
.min-width-350
.min-width-400
.min-width-450
.min-width-500
.min-width-100-tablet
.min-width-150-tablet
.min-width-200-tablet
.min-width-250-tablet
.min-width-300-tablet
.min-width-350-tablet
.min-width-400-tablet
.min-width-450-tablet
.min-width-500-tablet
.min-width-100-desktop
.min-width-150-desktop
.min-width-200-desktop
.min-width-250-desktop
.min-width-300-desktop
.min-width-350-desktop
.min-width-400-desktop
.min-width-450-desktop
.min-width-500-desktop
.min-width-100-widescreen
.min-width-150-widescreen
.min-width-200-widescreen
.min-width-250-widescreen
.min-width-300-widescreen
.min-width-350-widescreen
.min-width-400-widescreen
.min-width-450-widescreen
.min-width-500-widescreen
```
