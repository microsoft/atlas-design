---
title: Border Atomics
description: Border related atomic css classes for the Atlas Design System
template: standard
---

# Border Atomics

Various classes can be used to apply borders to the elements. Applying the `border` class to the element will add a 1px border to it.

Mixing the `directions`, `visibility` and `screensize` values will give you more specificity.

| modifiers | direction                        | screensize | visibility |
| --------- | -------------------------------- | ---------- | ---------- |
| values    | `top`, `right`, `bottom`, `left` | `tablet`   | `none`     |

Should be applied in this order:

```css
border-{direction}-{screensize}-{visibility}
```

## Usage

Here is an example of `border` class usage:

```html
<div class="border padding-sm">
	<p>Text block</p>
</div>
```

Here is an example of applying border to specific side of the element:

```html
<div class="border-top padding-sm">
	<p>Border top</p>
</div>
```

```html
<div class="border-right padding-sm">
	<p>Border right</p>
</div>
```

```html
<div class="border-left padding-sm">
	<p>Border left</p>
</div>
```

```html
<div class="border-bottom padding-sm">
	<p>Border bottom</p>
</div>
```

### Radius

Currently two classes are available to set border radius:

| class              | size      |
| ------------------ | --------- |
| `border-radius`    | `0.25rem` |
| `border-radius-lg` | `0.5rem`  |

```html
<div class="border border-radius padding-sm">
	<p>Default radius</p>
</div>
```

```html
<div class="border border-radius-lg padding-sm">
	<p>Large radius</p>
</div>
```

### Size

Additionally `-lg` may be added for a thicker border.

```html
<div class="border-lg padding-sm">
	<p>Large border</p>
</div>
```

### Colors

The color of a border can be modified using the following classes.

| modifiers | color name                                        | screensize |
| --------- | ------------------------------------------------- | ---------- |
| colors    | `primary`, `danger`, `warning`, `success`, `info` | n/a        |

```html
<div class="border-color-info border-left-lg padding-block-md border-radius">
	<p class="margin-inline-md">Custom Color</p>
</div>
```
