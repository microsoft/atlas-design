---
title: Adaptive grid
description: Container-aware adaptive grid component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - adaptive-grid
---

# Adaptive grid

The adaptive grid arranges content according to the space available to the grid itself, rather
than the viewport. It uses one equal-width column by default. Add
`.adaptive-grid-columns-2` to use two equal-width columns when the container is at least 400px
wide.

The wrapper and inner grid are both required. `.adaptive-grid` establishes the named query
container, while its direct `.adaptive-grid-content` child receives the grid layout. A CSS
container cannot query its own size to style itself, so the separate inner element makes the
component self-contained.

## Two-column adaptive grid

Resize the available content area to see this example switch between one and two columns.

```html
<div class="adaptive-grid adaptive-grid-columns-2">
	<div class="adaptive-grid-content">
		<div class="border border-radius padding-sm">First item</div>
		<div class="border border-radius padding-sm">Second item</div>
		<div class="border border-radius padding-sm">Third item</div>
		<div class="border border-radius padding-sm">Fourth item</div>
	</div>
</div>
```

## Container size, not viewport size

The same modifier can produce different layouts in the same viewport because each grid queries
its own wrapper. The 350px example remains one column, while the 500px example becomes two
columns when the viewport is wide enough to apply that width.

```html
<div class="adaptive-grid adaptive-grid-columns-2 width-350">
	<div class="adaptive-grid-content">
		<div class="border border-radius padding-sm">Narrow item one</div>
		<div class="border border-radius padding-sm">Narrow item two</div>
	</div>
</div>
```

```html
<div class="adaptive-grid adaptive-grid-columns-2 width-500-tablet">
	<div class="adaptive-grid-content">
		<div class="border border-radius padding-sm">Wide item one</div>
		<div class="border border-radius padding-sm">Wide item two</div>
	</div>
</div>
```

## Intrinsic sizing

Every track uses `minmax(0, 1fr)`, and direct grid children have `min-inline-size: 0`. This allows
long code, tables, and other intrinsically wide content to shrink within a track instead of
forcing the grid wider than its container. Consumers can apply an appropriate overflow or
wrapping treatment to the content itself.

The default gap and two-column threshold can be configured before loading Atlas Sass with
`$adaptive-grid-gap` and `$adaptive-grid-columns-2-min-width`. Future column counts or weighted
presets can be added as component-prefixed modifiers without changing the wrapper and content
structure.
