---
title: Display Atomics
description: Display related atomic css classes for the Atlas Design System
template: standard
---

# Display Atomics

The following displays are covered: `block`, `flex`, `inline`, `inline-block`, `inline-flex`, and `none`.

The following breakpoints are supported for each display value:

```Text
.position-{value}-tablet
.position-{value}-desktop
.position-{value}-widescreen
```

## Block

```html
<div class="border">
	<button class="button display-block border">Foo</button>
	<button class="button display-block border">Bar</button>
	<button class="button display-block border">Baz</button>
</div>
```

## Flex

```html
<div class="display-flex border">
	<button class="button border">Foo</button>
	<button class="button border">Bar</button>
	<button class="button border">Baz</button>
</div>
```

## Inline

`display: inline` is the default value for elements.

```html
<div class="border">
	<button class="button display-inline border">Foo</button>
	<button class="button display-inline border">Bar</button>
	<button class="button display-inline border">Baz</button>
</div>
```

## Inline-block

```html
<div class="border">
	<button class="button display-inline-block border">Foo</button>
	<button class="button display-inline-block border">Bar</button>
	<button class="button display-inline-block border">Baz</button>
</div>
```

## Inline-flex

```html
<div class="display-inline-flex border">
	<button class="button border">Foo</button>
	<button class="button border">Bar</button>
	<button class="button border">Baz</button>
</div>
```

## None

```html
<div class="display-none border">
	<button class="button border">Foo</button>
	<button class="button border">Bar</button>
	<button class="button border">Baz</button>
</div>
```
