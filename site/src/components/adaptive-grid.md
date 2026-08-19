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

The wrapper, content, and item classes are required. `.adaptive-grid` establishes the named query
container, its direct `.adaptive-grid-content` child receives the grid layout, and each direct
grid child uses `.adaptive-grid-item`. A CSS container cannot query its own size to style itself,
so the separate inner element makes the component self-contained.

## Two-column adaptive grid

Resize the available content area to see this example switch between one and two columns.

```html
<div class="adaptive-grid adaptive-grid-columns-2">
	<div class="adaptive-grid-content">
		<div class="adaptive-grid-item border border-radius padding-sm">Item 1</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Item 2</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Item 3</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Item 4</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Item 5</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Item 6</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Item 7</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Item 8</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Item 9</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Item 10</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Item 11</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Item 12</div>
	</div>
</div>
```

## Interactive container size

Use the slider to change this grid's inline size. The control updates a CSS custom property on the
demo parent, making the grid switch to two columns at exactly 400px without changing the viewport.

```html
<div class="adaptive-grid-demo" data-adaptive-grid-resizer>
	<div class="adaptive-grid-demo-controls">
		<label for="adaptive-grid-width">Container width</label>
		<input
			class="adaptive-grid-demo-slider"
			id="adaptive-grid-width"
			type="range"
			min="240"
			max="800"
			value="600"
			data-adaptive-grid-resizer-input
		/>
		<output for="adaptive-grid-width" data-adaptive-grid-resizer-output>600px</output>
	</div>
	<div class="adaptive-grid adaptive-grid-columns-2 adaptive-grid-demo-preview">
		<div class="adaptive-grid-content">
			<div class="adaptive-grid-item border border-radius padding-sm">Item 1</div>
			<div class="adaptive-grid-item border border-radius padding-sm">Item 2</div>
			<div class="adaptive-grid-item border border-radius padding-sm">Item 3</div>
			<div class="adaptive-grid-item border border-radius padding-sm">Item 4</div>
			<div class="adaptive-grid-item border border-radius padding-sm">Item 5</div>
			<div class="adaptive-grid-item border border-radius padding-sm">Item 6</div>
			<div class="adaptive-grid-item border border-radius padding-sm">Item 7</div>
			<div class="adaptive-grid-item border border-radius padding-sm">Item 8</div>
			<div class="adaptive-grid-item border border-radius padding-sm">Item 9</div>
			<div class="adaptive-grid-item border border-radius padding-sm">Item 10</div>
			<div class="adaptive-grid-item border border-radius padding-sm">Item 11</div>
			<div class="adaptive-grid-item border border-radius padding-sm">Item 12</div>
		</div>
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
		<div class="adaptive-grid-item border border-radius padding-sm">Narrow item 1</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Narrow item 2</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Narrow item 3</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Narrow item 4</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Narrow item 5</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Narrow item 6</div>
	</div>
</div>
```

```html
<div class="adaptive-grid adaptive-grid-columns-2 width-500-tablet">
	<div class="adaptive-grid-content">
		<div class="adaptive-grid-item border border-radius padding-sm">Wide item 1</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Wide item 2</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Wide item 3</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Wide item 4</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Wide item 5</div>
		<div class="adaptive-grid-item border border-radius padding-sm">Wide item 6</div>
	</div>
</div>
```

## Intrinsic sizing

Every track uses `minmax(0, 1fr)`, and direct `.adaptive-grid-item` children have
`min-inline-size: 0`. This allows long code, tables, and other intrinsically wide content to
shrink within a track instead of forcing the grid wider than its container. Consumers can apply
an appropriate overflow or wrapping treatment to the content itself.

The default gap and two-column threshold can be configured before loading Atlas Sass with
`$adaptive-grid-gap` and `$adaptive-grid-columns-2-min-width`. Future column counts or weighted
presets can be added as component-prefixed modifiers without changing the wrapper and content
structure.
