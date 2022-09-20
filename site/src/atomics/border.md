---
title: Border Atomics
description: Border related atomic css classes for the Atlas Design System
template: standard
documentedClassPrefixes:
  - border
  - border-radius
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

There are a few classes available to set border radius:

| class                   | size       |
| ----------------------- | ---------- |
| `border-radius-sm`      | `0.125rem` |
| `border-radius`         | `0.25rem`  |
| `border-radius-lg`      | `0.375rem` |
| `border-radius-rounded` | `290486px` |

```html
<div class="border border-radius-sm padding-sm">
	<p>Small radius</p>
</div>
<div class="border border-radius padding-sm margin-top-xs">
	<p>Default radius</p>
</div>
<div class="border border-radius-lg padding-sm margin-top-xs">
	<p>Large radius</p>
</div>
<div class="border border-radius-rounded padding-sm margin-top-xs">
	<p>Rounded</p>
</div>
```

### Size

Additionally `-md` and `-lg` may be added for a thicker border.

```html
<div class="border-md padding-sm">
	<p>Medium border</p>
</div>
<div class="border-md-tablet padding-sm margin-top-xs">
	<p>Medium border on tablet+</p>
</div>
<div class="border-lg padding-sm margin-top-xs">
	<p>Large border</p>
</div>
<div class="border-lg-tablet padding-sm margin-top-xs">
	<p>Large border on tablet+</p>
</div>
```

### Colors

The color of a border can be modified using the following classes.

| modifiers | color name                                                  | screensize |
| --------- | ----------------------------------------------------------- | ---------- |
| colors    | `primary`, `danger`, `warning`, `success`, `info`, `accent` | n/a        |

```html
<div class="border-color-accent border-left-lg padding-block-md border-radius">
	<p class="margin-inline-md">Custom Color</p>
</div>
```
