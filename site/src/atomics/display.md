---
title: Display Atomics
description: Display related atomic css classes for the Atlas Design System
template: standard
---

# Display Atomics

Display atomics are used to set the display behavior of an element.

## Class Pattern

`display-<value>-<screensize>`

For general information about the pattern, visit the [Atomics page](https://github.com/microsoft/atlas-design/blob/main/css/src/atomics/README.md).

Accepted values

`block, flex, inline, inline-block, inline-flex, grid, none`

Accepted screensizes

`tablet, desktop, widescreen`

## Usage

```html
<div class="display-block border">
	<div>Foo</div>
	<div>Foo</div>
</div>
```

```html
<div class="display-flex-tablet border">
	<div>Bar</div>
	<div>Bar</div>
</div>
```

```html
<div class="display-inline-desktop border">
	<div>Baz</div>
	<div>Baz</div>
</div>
```

```html
<div class="display-inline-flex-widescreen border">
	<div>Foo</div>
	<div>Foo</div>
</div>
```

Available Classes

```atomics-filter
display-block
display-flex
display-inline
display-inline-block
display-inline-flex
display-grid
display-none
display-block-tablet
display-flex-tablet
display-inline-tablet
display-inline-block-tablet
display-inline-flex-tablet
display-grid-tablet
display-none-tablet
display-block-desktop
display-flex-desktop
display-inline-desktop
display-inline-block-desktop
display-inline-flex-desktop
display-grid-desktop
display-none-desktop
display-block-widescreen
display-flex-widescreen
display-inline-widescreen
display-inline-block-widescreen
display-inline-flex-widescreen
display-grid-widescreen
display-none-widescreen
```