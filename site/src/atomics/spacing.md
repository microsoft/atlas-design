---
title: Spacing Atomics
description: Spacing related atomic css classes for the Atlas Design System
template: standard
---

# Spacing Atomics

Spacing Atomics can be used to add margin or padding on elements. They are especially helpful when composing layouts.

## Class Pattern

`<css-property-name>-<value>-<screensize>`

For general information about the pattern, visit the [Atomics page](https://github.com/microsoft/atlas-design/blob/main/css/src/atomics/README.md).

The following `<css-property-names>-<values>-<screensizes>` are supported.

Accepted property names

- `margin`, `padding`
- `margin|padding-inline`
- `margin|padding-block`
- `margin|padding-top|right|bottom|left`

Accepted values

- `none, xs, s, m, l, xl, xxl, xxxl`

Accepted screensizes

- `tablet, desktop, widescreen`

## Usages

Adding uniform spacing

```html
<div class="margin-xs border">XS</div>
<div class="margin-s border">X</div>
<div class="margin-m border">M</div>
<div class="margin-l border">L</div>
<div class="margin-xl border">XL</div>
<div class="margin-xxl border">XXL</div>
<div class="margin-xxxl border">XXXL</div>
```

Adding spacing to a side

```html
<div class="margin-left-s margin-bottom-m padding-s border">Small left margin</div>
<div class="margin-right-l margin-bottom-m padding-s border">Large right margin</div>
```

Adding horizontal and vertical spacing

```html
<div class="margin-inline-xl border">Margin-inline</div>
<div class="padding-inline-xl border">Padding-inline</div>
<div class="margin-block-xxl border">Margin-block</div>
<div class="padding-block-xxl border">Padding-block</div>
```

Adding spacing on a particular screen size

```html
<div
	class="padding-left-s padding-left-l-tablet padding-left-xl-desktop padding-left-xxl-widescreen border"
>
	Left padding
</div>
```

Available Classes

```atomics-filter
.margin-xs
.margin-s
.margin-m
.margin-l
.margin-xl
.margin-xxl
.margin-xxxl
.margin-none
.margin-inline-xs
.margin-inline-s
.margin-inline-m
.margin-inline-l
.margin-inline-xl
.margin-inline-xxl
.margin-inline-xxxl
.margin-inline-none
.margin-block-xs
.margin-block-s
.margin-block-m
.margin-block-l
.margin-block-xl
.margin-block-xxl
.margin-block-xxxl
.margin-block-none
.margin-top-xs
.margin-top-s
.margin-top-m
.margin-top-l
.margin-top-xl
.margin-top-xxl
.margin-top-xxxl
.margin-top-none
.margin-bottom-xs
.margin-bottom-s
.margin-bottom-m
.margin-bottom-l
.margin-bottom-xl
.margin-bottom-xxl
.margin-bottom-xxxl
.margin-bottom-none
.margin-left-xs
.margin-left-s
.margin-left-m
.margin-left-l
.margin-left-xl
.margin-left-xxl
.margin-left-xxxl
.margin-left-none
.margin-right-xs
.margin-right-s
.margin-right-m
.margin-right-l
.margin-right-xl
.margin-right-xxl
.margin-right-xxxl
.margin-right-none
.padding-xs
.padding-s
.padding-m
.padding-l
.padding-xl
.padding-xxl
.padding-xxxl
.padding-none
.padding-inline-xs
.padding-inline-s
.padding-inline-m
.padding-inline-l
.padding-inline-xl
.padding-inline-xxl
.padding-inline-xxxl
.padding-inline-none
.padding-block-xs
.padding-block-s
.padding-block-m
.padding-block-l
.padding-block-xl
.padding-block-xxl
.padding-block-xxxl
.padding-block-none
.padding-top-xs
.padding-top-s
.padding-top-m
.padding-top-l
.padding-top-xl
.padding-top-xxl
.padding-top-xxxl
.padding-top-none
.padding-bottom-xs
.padding-bottom-s
.padding-bottom-m
.padding-bottom-l
.padding-bottom-xl
.padding-bottom-xxl
.padding-bottom-xxxl
.padding-bottom-none
.padding-left-xs
.padding-left-s
.padding-left-m
.padding-left-l
.padding-left-xl
.padding-left-xxl
.padding-left-xxxl
.padding-left-none
.padding-right-xs
.padding-right-s
.padding-right-m
.padding-right-l
.padding-right-xl
.padding-right-xxl
.padding-right-xxxl
.padding-right-none
.margin-xs-tablet
.margin-s-tablet
.margin-m-tablet
.margin-l-tablet
.margin-xl-tablet
.margin-xxl-tablet
.margin-xxxl-tablet
.margin-none-tablet
.margin-inline-xs-tablet
.margin-inline-s-tablet
.margin-inline-m-tablet
.margin-inline-l-tablet
.margin-inline-xl-tablet
.margin-inline-xxl-tablet
.margin-inline-xxxl-tablet
.margin-inline-none-tablet
.margin-block-xs-tablet
.margin-block-s-tablet
.margin-block-m-tablet
.margin-block-l-tablet
.margin-block-xl-tablet
.margin-block-xxl-tablet
.margin-block-xxxl-tablet
.margin-block-none-tablet
.margin-top-xs-tablet
.margin-top-s-tablet
.margin-top-m-tablet
.margin-top-l-tablet
.margin-top-xl-tablet
.margin-top-xxl-tablet
.margin-top-xxxl-tablet
.margin-top-none-tablet
.margin-bottom-xs-tablet
.margin-bottom-s-tablet
.margin-bottom-m-tablet
.margin-bottom-l-tablet
.margin-bottom-xl-tablet
.margin-bottom-xxl-tablet
.margin-bottom-xxxl-tablet
.margin-bottom-none-tablet
.margin-left-xs-tablet
.margin-left-s-tablet
.margin-left-m-tablet
.margin-left-l-tablet
.margin-left-xl-tablet
.margin-left-xxl-tablet
.margin-left-xxxl-tablet
.margin-left-none-tablet
.margin-right-xs-tablet
.margin-right-s-tablet
.margin-right-m-tablet
.margin-right-l-tablet
.margin-right-xl-tablet
.margin-right-xxl-tablet
.margin-right-xxxl-tablet
.margin-right-none-tablet
.padding-xs-tablet
.padding-s-tablet
.padding-m-tablet
.padding-l-tablet
.padding-xl-tablet
.padding-xxl-tablet
.padding-xxxl-tablet
.padding-none-tablet
.padding-inline-xs-tablet
.padding-inline-s-tablet
.padding-inline-m-tablet
.padding-inline-l-tablet
.padding-inline-xl-tablet
.padding-inline-xxl-tablet
.padding-inline-xxxl-tablet
.padding-inline-none-tablet
.padding-block-xs-tablet
.padding-block-s-tablet
.padding-block-m-tablet
.padding-block-l-tablet
.padding-block-xl-tablet
.padding-block-xxl-tablet
.padding-block-xxxl-tablet
.padding-block-none-tablet
.padding-top-xs-tablet
.padding-top-s-tablet
.padding-top-m-tablet
.padding-top-l-tablet
.padding-top-xl-tablet
.padding-top-xxl-tablet
.padding-top-xxxl-tablet
.padding-top-none-tablet
.padding-bottom-xs-tablet
.padding-bottom-s-tablet
.padding-bottom-m-tablet
.padding-bottom-l-tablet
.padding-bottom-xl-tablet
.padding-bottom-xxl-tablet
.padding-bottom-xxxl-tablet
.padding-bottom-none-tablet
.padding-left-xs-tablet
.padding-left-s-tablet
.padding-left-m-tablet
.padding-left-l-tablet
.padding-left-xl-tablet
.padding-left-xxl-tablet
.padding-left-xxxl-tablet
.padding-left-none-tablet
.padding-right-xs-tablet
.padding-right-s-tablet
.padding-right-m-tablet
.padding-right-l-tablet
.padding-right-xl-tablet
.padding-right-xxl-tablet
.padding-right-xxxl-tablet
.padding-right-none-tablet
.margin-xs-desktop
.margin-s-desktop
.margin-m-desktop
.margin-l-desktop
.margin-xl-desktop
.margin-xxl-desktop
.margin-xxxl-desktop
.margin-none-desktop
.margin-inline-xs-desktop
.margin-inline-s-desktop
.margin-inline-m-desktop
.margin-inline-l-desktop
.margin-inline-xl-desktop
.margin-inline-xxl-desktop
.margin-inline-xxxl-desktop
.margin-inline-none-desktop
.margin-block-xs-desktop
.margin-block-s-desktop
.margin-block-m-desktop
.margin-block-l-desktop
.margin-block-xl-desktop
.margin-block-xxl-desktop
.margin-block-xxxl-desktop
.margin-block-none-desktop
.margin-top-xs-desktop
.margin-top-s-desktop
.margin-top-m-desktop
.margin-top-l-desktop
.margin-top-xl-desktop
.margin-top-xxl-desktop
.margin-top-xxxl-desktop
.margin-top-none-desktop
.margin-bottom-xs-desktop
.margin-bottom-s-desktop
.margin-bottom-m-desktop
.margin-bottom-l-desktop
.margin-bottom-xl-desktop
.margin-bottom-xxl-desktop
.margin-bottom-xxxl-desktop
.margin-bottom-none-desktop
.margin-left-xs-desktop
.margin-left-s-desktop
.margin-left-m-desktop
.margin-left-l-desktop
.margin-left-xl-desktop
.margin-left-xxl-desktop
.margin-left-xxxl-desktop
.margin-left-none-desktop
.margin-right-xs-desktop
.margin-right-s-desktop
.margin-right-m-desktop
.margin-right-l-desktop
.margin-right-xl-desktop
.margin-right-xxl-desktop
.margin-right-xxxl-desktop
.margin-right-none-desktop
.padding-xs-desktop
.padding-s-desktop
.padding-m-desktop
.padding-l-desktop
.padding-xl-desktop
.padding-xxl-desktop
.padding-xxxl-desktop
.padding-none-desktop
.padding-inline-xs-desktop
.padding-inline-s-desktop
.padding-inline-m-desktop
.padding-inline-l-desktop
.padding-inline-xl-desktop
.padding-inline-xxl-desktop
.padding-inline-xxxl-desktop
.padding-inline-none-desktop
.padding-block-xs-desktop
.padding-block-s-desktop
.padding-block-m-desktop
.padding-block-l-desktop
.padding-block-xl-desktop
.padding-block-xxl-desktop
.padding-block-xxxl-desktop
.padding-block-none-desktop
.padding-top-xs-desktop
.padding-top-s-desktop
.padding-top-m-desktop
.padding-top-l-desktop
.padding-top-xl-desktop
.padding-top-xxl-desktop
.padding-top-xxxl-desktop
.padding-top-none-desktop
.padding-bottom-xs-desktop
.padding-bottom-s-desktop
.padding-bottom-m-desktop
.padding-bottom-l-desktop
.padding-bottom-xl-desktop
.padding-bottom-xxl-desktop
.padding-bottom-xxxl-desktop
.padding-bottom-none-desktop
.padding-left-xs-desktop
.padding-left-s-desktop
.padding-left-m-desktop
.padding-left-l-desktop
.padding-left-xl-desktop
.padding-left-xxl-desktop
.padding-left-xxxl-desktop
.padding-left-none-desktop
.padding-right-xs-desktop
.padding-right-s-desktop
.padding-right-m-desktop
.padding-right-l-desktop
.padding-right-xl-desktop
.padding-right-xxl-desktop
.padding-right-xxxl-desktop
.padding-right-none-desktop
.margin-xs-widescreen
.margin-s-widescreen
.margin-m-widescreen
.margin-l-widescreen
.margin-xl-widescreen
.margin-xxl-widescreen
.margin-xxxl-widescreen
.margin-none-widescreen
.margin-inline-xs-widescreen
.margin-inline-s-widescreen
.margin-inline-m-widescreen
.margin-inline-l-widescreen
.margin-inline-xl-widescreen
.margin-inline-xxl-widescreen
.margin-inline-xxxl-widescreen
.margin-inline-none-widescreen
.margin-block-xs-widescreen
.margin-block-s-widescreen
.margin-block-m-widescreen
.margin-block-l-widescreen
.margin-block-xl-widescreen
.margin-block-xxl-widescreen
.margin-block-xxxl-widescreen
.margin-block-none-widescreen
.margin-top-xs-widescreen
.margin-top-s-widescreen
.margin-top-m-widescreen
.margin-top-l-widescreen
.margin-top-xl-widescreen
.margin-top-xxl-widescreen
.margin-top-xxxl-widescreen
.margin-top-none-widescreen
.margin-bottom-xs-widescreen
.margin-bottom-s-widescreen
.margin-bottom-m-widescreen
.margin-bottom-l-widescreen
.margin-bottom-xl-widescreen
.margin-bottom-xxl-widescreen
.margin-bottom-xxxl-widescreen
.margin-bottom-none-widescreen
.margin-left-xs-widescreen
.margin-left-s-widescreen
.margin-left-m-widescreen
.margin-left-l-widescreen
.margin-left-xl-widescreen
.margin-left-xxl-widescreen
.margin-left-xxxl-widescreen
.margin-left-none-widescreen
.margin-right-xs-widescreen
.margin-right-s-widescreen
.margin-right-m-widescreen
.margin-right-l-widescreen
.margin-right-xl-widescreen
.margin-right-xxl-widescreen
.margin-right-xxxl-widescreen
.margin-right-none-widescreen
.padding-xs-widescreen
.padding-s-widescreen
.padding-m-widescreen
.padding-l-widescreen
.padding-xl-widescreen
.padding-xxl-widescreen
.padding-xxxl-widescreen
.padding-none-widescreen
.padding-inline-xs-widescreen
.padding-inline-s-widescreen
.padding-inline-m-widescreen
.padding-inline-l-widescreen
.padding-inline-xl-widescreen
.padding-inline-xxl-widescreen
.padding-inline-xxxl-widescreen
.padding-inline-none-widescreen
.padding-block-xs-widescreen
.padding-block-s-widescreen
.padding-block-m-widescreen
.padding-block-l-widescreen
.padding-block-xl-widescreen
.padding-block-xxl-widescreen
.padding-block-xxxl-widescreen
.padding-block-none-widescreen
.padding-top-xs-widescreen
.padding-top-s-widescreen
.padding-top-m-widescreen
.padding-top-l-widescreen
.padding-top-xl-widescreen
.padding-top-xxl-widescreen
.padding-top-xxxl-widescreen
.padding-top-none-widescreen
.padding-bottom-xs-widescreen
.padding-bottom-s-widescreen
.padding-bottom-m-widescreen
.padding-bottom-l-widescreen
.padding-bottom-xl-widescreen
.padding-bottom-xxl-widescreen
.padding-bottom-xxxl-widescreen
.padding-bottom-none-widescreen
.padding-left-xs-widescreen
.padding-left-s-widescreen
.padding-left-m-widescreen
.padding-left-l-widescreen
.padding-left-xl-widescreen
.padding-left-xxl-widescreen
.padding-left-xxxl-widescreen
.padding-left-none-widescreen
.padding-right-xs-widescreen
.padding-right-s-widescreen
.padding-right-m-widescreen
.padding-right-l-widescreen
.padding-right-xl-widescreen
.padding-right-xxl-widescreen
.padding-right-xxxl-widescreen
.padding-right-none-widescreen
```
