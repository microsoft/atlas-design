---
title: Typography Atomics
description: Typography related atomic css classes for the Atlas Design System
template: standard
classType: Atomics
classPrefixes:
  - font-size
  - font-style
  - font-weight
  - letter-spacing
  - text-align
  - text-decoration
  - text-transform
  - line-height
---

# Typography Atomics

The typography scale is designed for great readability across the platform. This page covers the various classes available to modify text.

| cssproperty       | value                                                            | screensize |
| ----------------- | ---------------------------------------------------------------- | ---------- |
| `font-size`       | `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `xs`, `sm`, `md`, `lg`, `xl` | `tablet`   |
| `font-weight`     | `semilight`, `light`, `normal`, `semibold` `bold`                | N\A        |
| `font-style`      | `italic`                                                         | N\A        |
| `text-decoration` | `underline`, `none`                                              | N\A        |
| `letter-spacing`  | `wide`                                                           | N\A        |
| `text-transform`  | `uppercase`                                                      | N\A        |
| `text-align`      | `left`, `center`, `right`                                        | `tablet`   |
| `line-height`     | `normal`                                                         | N\A        |

## Font size

There are two avenues for modifying font size in Atlas.

## Heading sizes

The following classes can be used to accurately adopt a heading's size (h1- h6).
These sizes are tied to the default heading sizes renderer within the [markdown component](https://design.docs.microsoft.com/components/markdown.html).

```html
<p class="font-size-h1">Heading 1</p>
<p class="font-size-h2">Heading 2</p>
<p class="font-size-h3">Heading 3</p>
<p class="font-size-h4">Heading 4</p>
<p class="font-size-h5">Heading 5</p>
<p class="font-size-h6">Heading 6</p>
```

## Non-heading sizes

The following classes targets text that are not headings.

```html
<p class="font-size-xl">Extra large text</p>
<p class="font-size-lg">Large text</p>
<p class="font-size-md">Medium text</p>
<p class="font-size-sm">Small text</p>
<p class="font-size-xs">Extra small text</p>
```

## Tablet sizes

Appending `-tablet` to a font-size class will make that class applicable to tablet screen size and above. In this way, you may apply mobile-first font sizes, then apply a more fitting font-size for larger screens.

```html
<p class="font-size-h2 font-size-h1-tablet">Heading level two on mobile, level one on tablet</p>
<p class="font-size-md font-size-lg-tablet">Medium on mobile, large on tablet</p>
```

## Font weight and italics

There are 5 classes available to transform the font weight. There is 1 class to transform the font style.

```html
<p class="font-weight-semilight">Semilight weight text</p>
<p class="font-weight-light">Light weight text</p>
<p class="font-weight-normal">Normal weight text</p>
<p class="font-weight-semibold">Semibold weight text</p>
<p class="font-weight-bold">Bold weight text</p>
<p class="font-style-italic">Italic text</p>
```

## Underlining Text

Text can have underlining added or removed with the following classes.

```html
<p class="text-decoration-underline">Text with underline</p>
<p class="text-decoration-none">Text with decorations removed</p>
```

## Letter spacing

The following class is used to alter the letter spacing.

```html
<p>Text with normal letter spacing</p>
<p class="letter-spacing-wide">Text with wide letter spacing</p>
```

## Alignment

The following classes can be used to align text.

```html
<p class="text-align-left">Left aligned text</p>
<p class="text-align-center">Center aligned text</p>
<p class="text-align-right">Right aligned text</p>
```

Appending with `-tablet` to a text-align class will make that class applicable to tablet screen size and above. Resize the screen to see it in action.

```html
<p class="text-align-center-tablet">Text is centered on tablet size and above.</p>
```
