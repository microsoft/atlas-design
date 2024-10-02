---
title: Spacing Atomics
description: Spacing related atomic css classes for the Atlas Design System
template: standard
classType: Atomics
classPrefixes:
  - margin
  - padding
---

# Spacing Atomics

Spacing atomics can be used to add margin or padding on elements. They are especially helpful when composing layouts. Note that while traditional names have been kept for property values, in their declarations these classes use css logical properties. This means that while the class name may be `.margin-left-<size>`, the rule is in fact `.margin-left-<size> { margin-inline-start: <size> !important; }`. We do this to achieve great multidirectional support that requires no extra mental overhead for developers. [Read more about logical props on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties). Note also the existence of `gap` property atomics, the documentation for which can be viewed on the [Gap Atomics page](./gap.md).

| cssproperty                                                                                                                                                                                                            | value                                                      | screensize                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------- |
| `margin`, `padding`, `margin-block`, `padding-block`,`margin-inline`, `padding-inline`, `margin-top`, `padding-top`, `margin-right`, `padding-right`, `margin-bottom`, `padding-bottom`, `margin-left`, `padding-left` | `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`, `none` | `tablet`, `desktop`, `widescreen` |
| `margin-inline` `margin-right`, `margin-left`, `margin-top`                                                                                                                                                            | `auto`                                                     | `tablet`, `desktop`, `widescreen` |

## Usage

Use `margin` or `padding` with a size value to add uniform spacing around an element.

```html
<div class="margin-xxs border">XXS</div>
<div class="margin-xs border">XS</div>
<div class="margin-sm border">SM</div>
<div class="margin-md border">MD</div>
<div class="margin-lg border">LG</div>
<div class="margin-xl border">XL</div>
<div class="margin-xxl border">XXL</div>
<div class="margin-xxxl border">XXXL</div>
```

Use `margin-inline` and `padding-inline` with a size value to apply both left and right spacing.

```html
<div class="margin-inline-xl border">Margin-inline</div>
<div class="padding-inline-xl border">Padding-inline</div>
```

Use `margin-block` and `padding-block` for top and bottom spacing.

```html
<div class="margin-block-xxl border">Margin-block</div>
<div class="padding-block-xxl border">Padding-block</div>
```

Use `margin-<sides>` or `padding-<sides>` with a size value to add spacing to a particular side.

```html
<div class="margin-left-sm margin-bottom-md padding-sm border">Small left margin</div>
<div class="margin-right-lg margin-bottom-md padding-sm border">Large right margin</div>
```

### Responsive rules

Appending a screen size to an atomic class can be used to apply responsive sizing.

```html
<div
	class="padding-left-sm padding-left-lg-tablet padding-left-xl-desktop padding-left-xxl-widescreen border"
>
	Left padding
</div>
```

### The auto value

Because the `auto` value is inapplicable to padding, and less useful when used with top, bottom, and block margin properties, it has a much smaller subset of properties: `margin-left`, `margin-right`, and `margin-inline`. You can still use responsive rules just like any other spacing atomic.

```html
<div class="display-flex">
	<div class="display-flex flex-direction-column flex-grow-1 border">
		<div class="margin-left-auto margin-bottom-md padding-sm border">Auto left margin</div>
		<div class="margin-right-auto margin-bottom-md padding-sm border">Auto right margin</div>
		<div class="margin-inline-auto margin-bottom-md padding-sm border">Auto side margin</div>
	</div>
	<div class="display-flex flex-direction-column border">
		<div class="margin-top-auto padding-sm border">Auto top margin</div>
	</div>
</div>
```

## Available classes

```atomics-filter
.margin-left-auto
.margin-right-auto
.margin-inline-auto
.margin-top-auto
.margin-xxs
.margin-xs
.margin-sm
.margin-md
.margin-lg
.margin-xl
.margin-xxl
.margin-xxxl
.margin-none
.margin-inline-xxs
.margin-inline-xs
.margin-inline-sm
.margin-inline-md
.margin-inline-lg
.margin-inline-xl
.margin-inline-xxl
.margin-inline-xxxl
.margin-inline-none
.margin-block-xxs
.margin-block-xs
.margin-block-sm
.margin-block-md
.margin-block-lg
.margin-block-xl
.margin-block-xxl
.margin-block-xxxl
.margin-block-none
.margin-top-xxs
.margin-top-xs
.margin-top-sm
.margin-top-md
.margin-top-lg
.margin-top-xl
.margin-top-xxl
.margin-top-xxxl
.margin-top-none
.margin-bottom-xxs
.margin-bottom-xs
.margin-bottom-sm
.margin-bottom-md
.margin-bottom-lg
.margin-bottom-xl
.margin-bottom-xxl
.margin-bottom-xxxl
.margin-bottom-none
.margin-left-xxs
.margin-left-xs
.margin-left-sm
.margin-left-md
.margin-left-lg
.margin-left-xl
.margin-left-xxl
.margin-left-xxxl
.margin-left-none
.margin-right-xxs
.margin-right-xs
.margin-right-sm
.margin-right-md
.margin-right-lg
.margin-right-xl
.margin-right-xxl
.margin-right-xxxl
.margin-right-none
.padding-xxs
.padding-xs
.padding-sm
.padding-md
.padding-lg
.padding-xl
.padding-xxl
.padding-xxxl
.padding-none
.padding-inline-xxs
.padding-inline-xs
.padding-inline-sm
.padding-inline-md
.padding-inline-lg
.padding-inline-xl
.padding-inline-xxl
.padding-inline-xxxl
.padding-inline-none
.padding-block-xxs
.padding-block-xs
.padding-block-sm
.padding-block-md
.padding-block-lg
.padding-block-xl
.padding-block-xxl
.padding-block-xxxl
.padding-block-none
.padding-top-xxs
.padding-top-xs
.padding-top-sm
.padding-top-md
.padding-top-lg
.padding-top-xl
.padding-top-xxl
.padding-top-xxxl
.padding-top-none
.padding-bottom-xxs
.padding-bottom-xs
.padding-bottom-sm
.padding-bottom-md
.padding-bottom-lg
.padding-bottom-xl
.padding-bottom-xxl
.padding-bottom-xxxl
.padding-bottom-none
.padding-left-xxs
.padding-left-xs
.padding-left-sm
.padding-left-md
.padding-left-lg
.padding-left-xl
.padding-left-xxl
.padding-left-xxxl
.padding-left-none
.padding-right-xxs
.padding-right-xs
.padding-right-sm
.padding-right-md
.padding-right-lg
.padding-right-xl
.padding-right-xxl
.padding-right-xxxl
.padding-right-none
.margin-xxs-tablet
.margin-xs-tablet
.margin-sm-tablet
.margin-md-tablet
.margin-lg-tablet
.margin-xl-tablet
.margin-xxl-tablet
.margin-xxxl-tablet
.margin-none-tablet
.margin-inline-xxs-tablet
.margin-inline-xs-tablet
.margin-inline-sm-tablet
.margin-inline-md-tablet
.margin-inline-lg-tablet
.margin-inline-xl-tablet
.margin-inline-xxl-tablet
.margin-inline-xxxl-tablet
.margin-inline-none-tablet
.margin-block-xxs-tablet
.margin-block-xs-tablet
.margin-block-sm-tablet
.margin-block-md-tablet
.margin-block-lg-tablet
.margin-block-xl-tablet
.margin-block-xxl-tablet
.margin-block-xxxl-tablet
.margin-block-none-tablet
.margin-top-xxs-tablet
.margin-top-xs-tablet
.margin-top-sm-tablet
.margin-top-md-tablet
.margin-top-lg-tablet
.margin-top-xl-tablet
.margin-top-xxl-tablet
.margin-top-xxxl-tablet
.margin-top-none-tablet
.margin-bottom-xxs-tablet
.margin-bottom-xs-tablet
.margin-bottom-sm-tablet
.margin-bottom-md-tablet
.margin-bottom-lg-tablet
.margin-bottom-xl-tablet
.margin-bottom-xxl-tablet
.margin-bottom-xxxl-tablet
.margin-bottom-none-tablet
.margin-left-xxs-tablet
.margin-left-xs-tablet
.margin-left-sm-tablet
.margin-left-md-tablet
.margin-left-lg-tablet
.margin-left-xl-tablet
.margin-left-xxl-tablet
.margin-left-xxxl-tablet
.margin-left-none-tablet
.margin-right-xxs-tablet
.margin-right-xs-tablet
.margin-right-sm-tablet
.margin-right-md-tablet
.margin-right-lg-tablet
.margin-right-xl-tablet
.margin-right-xxl-tablet
.margin-right-xxxl-tablet
.margin-right-none-tablet
.padding-xxs-tablet
.padding-xs-tablet
.padding-sm-tablet
.padding-md-tablet
.padding-lg-tablet
.padding-xl-tablet
.padding-xxl-tablet
.padding-xxxl-tablet
.padding-none-tablet
.padding-inline-xxs-tablet
.padding-inline-xs-tablet
.padding-inline-sm-tablet
.padding-inline-md-tablet
.padding-inline-lg-tablet
.padding-inline-xl-tablet
.padding-inline-xxl-tablet
.padding-inline-xxxl-tablet
.padding-inline-none-tablet
.padding-block-xxs-tablet
.padding-block-xs-tablet
.padding-block-sm-tablet
.padding-block-md-tablet
.padding-block-lg-tablet
.padding-block-xl-tablet
.padding-block-xxl-tablet
.padding-block-xxxl-tablet
.padding-block-none-tablet
.padding-top-xxs-tablet
.padding-top-xs-tablet
.padding-top-sm-tablet
.padding-top-md-tablet
.padding-top-lg-tablet
.padding-top-xl-tablet
.padding-top-xxl-tablet
.padding-top-xxxl-tablet
.padding-top-none-tablet
.padding-bottom-xxs-tablet
.padding-bottom-xs-tablet
.padding-bottom-sm-tablet
.padding-bottom-md-tablet
.padding-bottom-lg-tablet
.padding-bottom-xl-tablet
.padding-bottom-xxl-tablet
.padding-bottom-xxxl-tablet
.padding-bottom-none-tablet
.padding-left-xxs-tablet
.padding-left-xs-tablet
.padding-left-sm-tablet
.padding-left-md-tablet
.padding-left-lg-tablet
.padding-left-xl-tablet
.padding-left-xxl-tablet
.padding-left-xxxl-tablet
.padding-left-none-tablet
.padding-right-xxs-tablet
.padding-right-xs-tablet
.padding-right-sm-tablet
.padding-right-md-tablet
.padding-right-lg-tablet
.padding-right-xl-tablet
.padding-right-xxl-tablet
.padding-right-xxxl-tablet
.padding-right-none-tablet
.margin-xxs-desktop
.margin-xs-desktop
.margin-sm-desktop
.margin-md-desktop
.margin-lg-desktop
.margin-xl-desktop
.margin-xxl-desktop
.margin-xxxl-desktop
.margin-none-desktop
.margin-inline-xxs-desktop
.margin-inline-xs-desktop
.margin-inline-sm-desktop
.margin-inline-md-desktop
.margin-inline-lg-desktop
.margin-inline-xl-desktop
.margin-inline-xxl-desktop
.margin-inline-xxxl-desktop
.margin-inline-none-desktop
.margin-block-xxs-desktop
.margin-block-xs-desktop
.margin-block-sm-desktop
.margin-block-md-desktop
.margin-block-lg-desktop
.margin-block-xl-desktop
.margin-block-xxl-desktop
.margin-block-xxxl-desktop
.margin-block-none-desktop
.margin-top-xxs-desktop
.margin-top-xs-desktop
.margin-top-sm-desktop
.margin-top-md-desktop
.margin-top-lg-desktop
.margin-top-xl-desktop
.margin-top-xxl-desktop
.margin-top-xxxl-desktop
.margin-top-none-desktop
.margin-bottom-xxs-desktop
.margin-bottom-xs-desktop
.margin-bottom-sm-desktop
.margin-bottom-md-desktop
.margin-bottom-lg-desktop
.margin-bottom-xl-desktop
.margin-bottom-xxl-desktop
.margin-bottom-xxxl-desktop
.margin-bottom-none-desktop
.margin-left-xxs-desktop
.margin-left-xs-desktop
.margin-left-sm-desktop
.margin-left-md-desktop
.margin-left-lg-desktop
.margin-left-xl-desktop
.margin-left-xxl-desktop
.margin-left-xxxl-desktop
.margin-left-none-desktop
.margin-right-xxs-desktop
.margin-right-xs-desktop
.margin-right-sm-desktop
.margin-right-md-desktop
.margin-right-lg-desktop
.margin-right-xl-desktop
.margin-right-xxl-desktop
.margin-right-xxxl-desktop
.margin-right-none-desktop
.padding-xxs-desktop
.padding-xs-desktop
.padding-sm-desktop
.padding-md-desktop
.padding-lg-desktop
.padding-xl-desktop
.padding-xxl-desktop
.padding-xxxl-desktop
.padding-none-desktop
.padding-inline-xxs-desktop
.padding-inline-xs-desktop
.padding-inline-sm-desktop
.padding-inline-md-desktop
.padding-inline-lg-desktop
.padding-inline-xl-desktop
.padding-inline-xxl-desktop
.padding-inline-xxxl-desktop
.padding-inline-none-desktop
.padding-block-xxs-desktop
.padding-block-xs-desktop
.padding-block-sm-desktop
.padding-block-md-desktop
.padding-block-lg-desktop
.padding-block-xl-desktop
.padding-block-xxl-desktop
.padding-block-xxxl-desktop
.padding-block-none-desktop
.padding-top-xxs-desktop
.padding-top-xs-desktop
.padding-top-sm-desktop
.padding-top-md-desktop
.padding-top-lg-desktop
.padding-top-xl-desktop
.padding-top-xxl-desktop
.padding-top-xxxl-desktop
.padding-top-none-desktop
.padding-bottom-xxs-desktop
.padding-bottom-xs-desktop
.padding-bottom-sm-desktop
.padding-bottom-md-desktop
.padding-bottom-lg-desktop
.padding-bottom-xl-desktop
.padding-bottom-xxl-desktop
.padding-bottom-xxxl-desktop
.padding-bottom-none-desktop
.padding-left-xxs-desktop
.padding-left-xs-desktop
.padding-left-sm-desktop
.padding-left-md-desktop
.padding-left-lg-desktop
.padding-left-xl-desktop
.padding-left-xxl-desktop
.padding-left-xxxl-desktop
.padding-left-none-desktop
.padding-right-xxs-desktop
.padding-right-xs-desktop
.padding-right-sm-desktop
.padding-right-md-desktop
.padding-right-lg-desktop
.padding-right-xl-desktop
.padding-right-xxl-desktop
.padding-right-xxxl-desktop
.padding-right-none-desktop
.margin-xxs-widescreen
.margin-xs-widescreen
.margin-sm-widescreen
.margin-md-widescreen
.margin-lg-widescreen
.margin-xl-widescreen
.margin-xxl-widescreen
.margin-xxxl-widescreen
.margin-none-widescreen
.margin-inline-xxs-widescreen
.margin-inline-xs-widescreen
.margin-inline-sm-widescreen
.margin-inline-md-widescreen
.margin-inline-lg-widescreen
.margin-inline-xl-widescreen
.margin-inline-xxl-widescreen
.margin-inline-xxxl-widescreen
.margin-inline-none-widescreen
.margin-block-xxs-widescreen
.margin-block-xs-widescreen
.margin-block-sm-widescreen
.margin-block-md-widescreen
.margin-block-lg-widescreen
.margin-block-xl-widescreen
.margin-block-xxl-widescreen
.margin-block-xxxl-widescreen
.margin-block-none-widescreen
.margin-top-xxs-widescreen
.margin-top-xs-widescreen
.margin-top-sm-widescreen
.margin-top-md-widescreen
.margin-top-lg-widescreen
.margin-top-xl-widescreen
.margin-top-xxl-widescreen
.margin-top-xxxl-widescreen
.margin-top-none-widescreen
.margin-bottom-xxs-widescreen
.margin-bottom-xs-widescreen
.margin-bottom-sm-widescreen
.margin-bottom-md-widescreen
.margin-bottom-lg-widescreen
.margin-bottom-xl-widescreen
.margin-bottom-xxl-widescreen
.margin-bottom-xxxl-widescreen
.margin-bottom-none-widescreen
.margin-left-xxs-widescreen
.margin-left-xs-widescreen
.margin-left-sm-widescreen
.margin-left-md-widescreen
.margin-left-lg-widescreen
.margin-left-xl-widescreen
.margin-left-xxl-widescreen
.margin-left-xxxl-widescreen
.margin-left-none-widescreen
.margin-right-xxs-widescreen
.margin-right-xs-widescreen
.margin-right-sm-widescreen
.margin-right-md-widescreen
.margin-right-lg-widescreen
.margin-right-xl-widescreen
.margin-right-xxl-widescreen
.margin-right-xxxl-widescreen
.margin-right-none-widescreen
.padding-xxs-widescreen
.padding-xs-widescreen
.padding-sm-widescreen
.padding-md-widescreen
.padding-lg-widescreen
.padding-xl-widescreen
.padding-xxl-widescreen
.padding-xxxl-widescreen
.padding-none-widescreen
.padding-inline-xxs-widescreen
.padding-inline-xs-widescreen
.padding-inline-sm-widescreen
.padding-inline-md-widescreen
.padding-inline-lg-widescreen
.padding-inline-xl-widescreen
.padding-inline-xxl-widescreen
.padding-inline-xxxl-widescreen
.padding-inline-none-widescreen
.padding-block-xxs-widescreen
.padding-block-xs-widescreen
.padding-block-sm-widescreen
.padding-block-md-widescreen
.padding-block-lg-widescreen
.padding-block-xl-widescreen
.padding-block-xxl-widescreen
.padding-block-xxxl-widescreen
.padding-block-none-widescreen
.padding-top-xxs-widescreen
.padding-top-xs-widescreen
.padding-top-sm-widescreen
.padding-top-md-widescreen
.padding-top-lg-widescreen
.padding-top-xl-widescreen
.padding-top-xxl-widescreen
.padding-top-xxxl-widescreen
.padding-top-none-widescreen
.padding-bottom-xxs-widescreen
.padding-bottom-xs-widescreen
.padding-bottom-sm-widescreen
.padding-bottom-md-widescreen
.padding-bottom-lg-widescreen
.padding-bottom-xl-widescreen
.padding-bottom-xxl-widescreen
.padding-bottom-xxxl-widescreen
.padding-bottom-none-widescreen
.padding-left-xxs-widescreen
.padding-left-xs-widescreen
.padding-left-sm-widescreen
.padding-left-md-widescreen
.padding-left-lg-widescreen
.padding-left-xl-widescreen
.padding-left-xxl-widescreen
.padding-left-xxxl-widescreen
.padding-left-none-widescreen
.padding-right-xxs-widescreen
.padding-right-xs-widescreen
.padding-right-sm-widescreen
.padding-right-md-widescreen
.padding-right-lg-widescreen
.padding-right-xl-widescreen
.padding-right-xxl-widescreen
.padding-right-xxxl-widescreen
.padding-right-none-widescreen
.margin-left-auto-tablet
.margin-right-auto-tablet
.margin-inline-auto-tablet
.margin-top-auto-tablet
.margin-left-auto-desktop
.margin-right-auto-desktop
.margin-inline-auto-desktop
.margin-top-auto-desktop
.margin-left-auto-widescreen
.margin-right-auto-widescreen
.margin-inline-auto-widescreen
.margin-top-auto-widescreen
```
