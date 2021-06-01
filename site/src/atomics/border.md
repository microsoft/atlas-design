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
<div class="border padding-s">
	<p>Text block</p>
</div>
```

Here is an example of applying border to specific side of the element:

```html
<div class="border-top padding-s">
	<p>Border top</p>
</div>
```

```html
<div class="border-right padding-s">
	<p>Border right</p>
</div>
```

```html
<div class="border-left padding-s">
	<p>Border left</p>
</div>
```

```html
<div class="border-bottom padding-s">
	<p>Border bottom</p>
</div>
```

### Radius

Currently two classes are available to set border radius:

| class             | size      |
| ----------------- | --------- |
| `border-radius`   | `0.25rem` |
| `border-radius-l` | `0.5rem`  |

```html
<div class="border border-radius padding-s">
	<p>Default radius</p>
</div>
```

```html
<div class="border border-radius-l padding-s margin-top-s">
	<p>Large radius</p>
</div>
```
