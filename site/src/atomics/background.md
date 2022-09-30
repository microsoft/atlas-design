---
title: Backgrounds
description: Background pattern component in the Atlas Design System
template: standard
classType: Atomics
classPrefixes:
  - background-image-pattern
  - background-size
---

# Background atomics

Background atomics are single classes that can be added to other components to affect how their background is rendered.

| cssproperty                | value                                           | screensize |
| -------------------------- | ----------------------------------------------- | ---------- |
| `background-size`          | `100`, `200`                                    | n/a        |
| `background-image-pattern` | Applies `var(--background-image-pattern)` value | n/a        |

## Usage

First in order to apply a background pattern, specify the `--background-image-pattern` variable in a style tag. Then include the `background-image-pattern` class. Note: if you intend to apply a background color as well, you should ensure your asset is transparent. You can do this by authoring a transparent png, or by adding [`fill-opacity`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-opacity) (try `.1`) to an existing opaque svg. You may also combine this with background color classes from color atomics.

```html
<section
	class="padding-lg background-image-pattern background-color-primary color-primary-invert"
	style="--background-image-pattern: url('https://learn.microsoft.com/en-us/media/background-patterns/pixie-sticks.svg')"
>
	<h2 class="font-size-h2">A confetti background</h2>
	<p>with <code>fill-opacity=".1"</code> on an svg</p>
</section>
```

## Adjusting background sizes

You can adjust the look and feel of your pattern with different `background-size` values.

```html
<section
	class="background-size-100 background-image-pattern padding-lg background-color-primary color-primary-invert"
	style="--background-image-pattern: url('https://learn.microsoft.com/en-us/media/background-patterns/plus.svg')"
>
	<p><code>background-size-100</code></p>
</section>
<section
	class="background-size-200 background-image-pattern padding-lg margin-top-xxs background-color-primary color-primary-invert"
	style="--background-image-pattern: url('https://learn.microsoft.com/en-us/media/background-patterns/plus.svg')"
>
	<p><code>background-size-200</code></p>
</section>
```

## Theming and accessibility concerns

Be aware that a transparent svg will not be themeable, so while background colors will differ on different themes, your svg or png will not. With semi-transparent greyscale images, this can still look good, but you should ensure you test carefully on different themes to achieve the result you're looking for. Additionally, if your image is not made transparent enough, it may negatively affect the readability (contrast ratio) of text on your background.

```html
<section
	class="padding-lg background-color-primary color-primary-invert background-image-pattern background-size-100"
	style="--background-image-pattern: url('https://learn.microsoft.com/en-us/media/background-patterns/plus.svg')"
>
	<p><code>background-size-100</code></p>
</section>
```

## Why don't we just inline these SVGs into Atlas?

Keeping svg source code out of Atlas reduces our file sizes, and maintains flexibility for you the developer.

## Available classes

List of all available classes:

```atomics-filter
background-image-pattern
background-size-100
background-size-200
```
