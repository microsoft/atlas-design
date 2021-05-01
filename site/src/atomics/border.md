---
title: Border Atomics
description: Border related atomic css classes for the Atlas Design System
template: standard
---

# Border Atomics

Various classes can be used to apply/customize borders on elements.

- `.border`: sets a 1px border on an element
- `.border-none`: resets border to `none`
- `.border-{direction}`: sets a 1px border for specific element's side
- `.border-{direction}-none`: resets border to `none` for specific element's side
- `.border-{direction}-{screensize}`: sets a 1px border  for specific element's side on specific screen size
- `.border-{direction}-{screensize}-none`: resets border to `none` for specific element's side on specific screen size

Currently, the only `{screensize}` available is `tablet`.

## Example

Here is an example of simple `border` class usage:

```html
<div class="padding-s border">
	<p>Text block</p>
</div>
```

Here is an example of applying border to specific side of the element:

```html
<div class="padding-s border-top">
	<p>Border top</p>
</div>

<div class="padding-s border-right">
	<p>Border right</p>
</div>

<div class="padding-s border-bottom">
	<p>Border bottom</p>
</div>

<div class="padding-s border-left">
	<p>Border left</p>
</div>
```

## Modifiers

Additional classes to modify the border appearance.

### Radius

Setting up border radius. Currently two classes are available:

- `.border-radius`
- `.border-radius-l`

#### Example

```html
<div class="padding-s border border-radius">
	<p>Text block</p>
</div>

<div class="padding-s margin-top-s border border-radius-l">
	<p>Text block</p>
</div>
```
