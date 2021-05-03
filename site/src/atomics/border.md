---
title: Border Atomics
description: Border related atomic css classes for the Atlas Design System
template: standard
---

# Border Atomics

Various classes can be used to apply borders to the elements.

- `.border`: adds a border
- `.border-none`: removes a border
- `.border-{direction}`: sets the border for a specific side
- `.border-{direction}-none`: removes the border on a specific side
- `.border-{direction}-{screensize}`: sets the border for a specific side on a particular screen size
- `.border-{direction}-{screensize}-none`: removes the border for a specific side on a particular screen size

Currently, the only `{screensize}` available is `tablet`.

## Example

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

<div class="border-right padding-s">
	<p>Border right</p>
</div>

<div class="border-left padding-s">
	<p>Border left</p>
</div>

<div class="border-bottom padding-s">
	<p>Border bottom</p>
</div>
```

### Radius

Setting up border radius. Currently two classes are available:

- `.border-radius`
- `.border-radius-l`

#### Example

```html
<div class="border border-radius padding-s">
	<p>Default radius</p>
</div>

<div class="border border-radius-l padding-s margin-top-s">
	<p>Large radius</p>
</div>
```
