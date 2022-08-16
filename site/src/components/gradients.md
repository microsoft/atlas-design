---
title: Gradients
description: Gradient related components in the Atlas Design System
template: standard
---

# Gradients

There are two main types of gradients.

1. Gradients displayed with font (`.gradient-text-`).
2. Gradients for blending colors between elements and contains (`.gradient-border-*`).

## Text color gradients

Currently there is only one available gradient for text. Because gradients transitions take up the entire width of a particular element, it's recommended to highlight inline elements or a portion of a heading, not the entire heading itself.

```html
<h3 class="font-size-h3 font-weight-bold">
	A gradient from <span class="gradient-text-purple-blue">purple to blue</span>
</h2>
```

## Gradient borders usage

The `.gradient-border` component is a moderately pluggable component used to blend the boundaries between colors. Because of the near-infinite number of steps, color variations, and gradient types involved in creating a gradient, we've scoped these to be linear gradients that transition between `transparent` and a given color represented by the `--border-gradient-end-color` custom property. Each gradient combination requires a minimum of two class, one specifying the color and one specifying the direction.

Border gradients are hidden in forced colors mode.

| base class name               | interpolated value    | screensize |
| ----------------------------- | --------------------- | ---------- |
| `gradient-border-<direction>` | `right`, `bottom`     | `tablet`   |
| `gradient-border-<colorname>` | `body`, `body-accent` | n/a        |

Note: you can also view the [Accent hero on the hero patterns page](../patterns/hero.md) page to see an example that uses this gradient to blend an image to the background.

## A gradient on the left side

Here is a horizontal example. As you can see, not all colors look good with this style of gradient over them. These gradients are best uses to blend certain images and background when colors match.

```html
<div class="display-flex">
	<div
		class="gradient-border-right background-color-info color-primary-invert gradient-border-body padding-xl flex-grow-1"
	>
		A left gradient is applied and a different background color.
	</div>
	<div class="background-color-body-background padding-xl flex-grow-1">
		A background color is applied.
	</div>
</div>
```

## A bottom gradient

The follow shows an example with two elements. The top element contains a bottom gradient that blends toward the bottom element, which has a matching background color class applied. _There is a middle border class applied that is purely used to show the distinction between the two elements._

```html
<div class="gradient-border-bottom gradient-border-body-accent padding-xl">
	A bottom gradient is applied.
</div>
<div class="background-color-body-accent padding-xl">A background color is applied</div>
```

The inverse ...

```html
<div class="gradient-border-bottom background-color-body-accent gradient-border-body padding-xl">
	A bottom gradient is applied.
</div>
<div class="padding-xl ">A background color is applied</div>
```

### Extending gradient directions and colors

By default Atlas has only a few gradient colors and directions to fit a few specific use cases.

If you need to make a new color available, look to the `$border-gradient-color` Sass map in `src/gradients/components`, and add a new color. Alternatively, for downstream projects, specify your own implementation of `$border-gradient-colors` without the default keyword. See [Sass variables documentation](https://sass-lang.com/documentation/variables#advanced-variable-functions) for relevant information.

```scss
$border-gradient-colors: (
	'body-background': $body-background,
	'body-background-accent': $body-background-accent,
	'primary': $primary // an additional color
) !default;
```

To extend directions, it's the same process but extending `$border-gradient-direction` in the same file.

```scss
$border-gradient-direction: (
	'right': 'inline-end',
	'bottom': 'block-end',
	'top': 'block-start' // an additional direction
) !default;
```
