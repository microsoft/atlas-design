---
title: Gap Atomics
description: Gap related atomic css classes for the Atlas Design System
template: standard
---

# Gap Atomics

The gap property can be used to set the distance between objects within the context of a `grid` or `flex` element.

| cssproperty | value                                 | screensize                        |
| ----------- | ------------------------------------- | --------------------------------- |
| `gap`       | `xxs`, `xs`, `sm`, `md`, `lg`, `none` | `tablet`, `desktop`, `widescreen` |

## Usage

Use `gap` with a size value to add uniform spacing between an element's children. Note that size values are a subset of those from the [spacing atomics](./spacing.md).

```html
<div class="display-grid gap-md" style="grid-template: 1fr 1fr / 1fr 1fr">
	<div class="padding-sm background-color-body-accent border-radius">1</div>
	<div class="padding-sm background-color-body-accent border-radius">2</div>
	<div class="padding-sm background-color-body-accent border-radius">3</div>
	<div class="padding-sm background-color-body-accent border-radius">4</div>
</div>
```

### Responsive rules

Appending a screen size to an atomic class can be used to apply responsive sizing.

```html
<div class="display-flex gap-xxs gap-sm-tablet gap-lg-desktop gap-xl-widescreen flex-wrap-wrap">
	<div class="padding-sm background-color-body-accent border-radius">1</div>
	<div class="padding-sm background-color-body-accent border-radius">2</div>
	<div class="padding-sm background-color-body-accent border-radius">3</div>
	<div class="padding-sm background-color-body-accent border-radius">4</div>
</div>
```

## Available classes

```atomics-filter
.gap-xxs
.gap-xs
.gap-sm
.gap-md
.gap-lg
.gap-none
.gap-xxs-tablet
.gap-xs-tablet
.gap-sm-tablet
.gap-md-tablet
.gap-lg-tablet
.gap-none-tablet
.gap-xxs-desktop
.gap-xs-desktop
.gap-sm-desktop
.gap-md-desktop
.gap-lg-desktop
.gap-none-desktop
.gap-xxs-widescreen
.gap-xs-widescreen
.gap-sm-widescreen
.gap-md-widescreen
.gap-lg-widescreen
.gap-none-widescreen
```
