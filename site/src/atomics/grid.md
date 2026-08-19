---
title: Grid Atomics
description: Grid-related atomic CSS classes for the Atlas Design System
template: standard
classType: Atomics
classPrefixes:
  - grid-template-columns
---

# Grid Atomics

Grid atomics provide reusable equal-width column templates. Use them with `.display-grid` and a
gap atomic when needed.

| cssproperty             | value              | screensize |
| ----------------------- | ------------------ | ---------- |
| `grid-template-columns` | `1`, `2`, `3`, `4` | N/A        |

Each column is defined with `minmax(0, 1fr)` so intrinsic content does not establish a minimum
track width. Apply overflow or wrapping styles to grid children when their content cannot shrink.

## Usage

```html
<div class="display-grid grid-template-columns-4 gap-xs">
	<div class="border border-radius padding-sm">1</div>
	<div class="border border-radius padding-sm">2</div>
	<div class="border border-radius padding-sm">3</div>
	<div class="border border-radius padding-sm">4</div>
</div>
```

These atomics set a fixed number of tracks. For a layout that adapts to its own available inline
size, use the [adaptive grid component](~/src/components/adaptive-grid.md).

## Available classes

```atomics-filter
.grid-template-columns-1
.grid-template-columns-2
.grid-template-columns-3
.grid-template-columns-4
```
