---
title: Flex Atomics
description: Flex related atomic css classes for the Atlas Design System
template: standard
classType: Atomics
classPrefixes:
  - align-content
  - align-items
  - align-self
  - flex-direction
  - flex-grow
  - flex-shrink
  - flex-basis
  - flex-wrap
  - justify-content
---

# Flex Atomics

Flex atomics are useful when composing layouts and patterns containing other components.

| cssproperty       | value                                                                               | screensize |
| ----------------- | ----------------------------------------------------------------------------------- | ---------- |
| `flex-direction`  | `row`, `column`, `row-reverse`, `column-reverse`                                    | `tablet`   |
| `justify-content` | `flex-start`, `flex-end`, `center`, `space-around`, `space-between`, `space-evenly` | `tablet`   |
| `align-items`     | `flex-start`, `flex-end`, `center`, `baseline`, `stretch`                           | `tablet`   |
| `align-self`      | `flex-start`, `flex-end`, `center`, `baseline`, `stretch`                           | `tablet`   |
| `flex-wrap`       | `nowrap`, `wrap`, `wrap-reverse`                                                    | `tablet`   |
| `align-content`   | `flex-start`, `flex-end`, `space-around`, `space-between`, `stretch`                | `tablet`   |
| `flex-grow`       | `0`, `1`                                                                            | `tablet`   |
| `flex-shrink`     | `0`, `1`                                                                            | `tablet`   |
| `flex-basis`      | `0`, `auto`                                                                         | `tablet`   |

## Usage

The following example uses a combination of mobile-first flex atomics to achieve a responsive card layout.

```html
<article
	id="example-layout"
	class="background-color-body-medium border border-radius-lg display-flex flex-direction-column flex-direction-row-tablet"
>
	<div
		class="background-color-info color-info-invert padding-md border-radius-lg display-flex align-items-center flex-shrink-0 flex-grow-0 "
	>
		<h2 class="font-size-h2">Hesiod</h2>
	</div>
	<div class="padding-md display-flex flex-shrink-1 flex-grow-1 align-items-center">
		<p class="font-size-lg">
			"Atlas through hard constraint upholds the wide heaven with unwearying head and arms, standing
			at the borders of the earth before the clear-voiced Hesperides (Ladies of the West); for this
			lot wise Zeus assigned to him."
		</p>
	</div>
</article>
```

## Available classes

```atomics-filter
.flex-direction-row
.flex-direction-column
.flex-direction-row-reverse
.flex-direction-column-reverse
.justify-content-flex-start
.justify-content-flex-end
.justify-content-center
.justify-content-space-around
.justify-content-space-between
.justify-content-space-evenly
.align-items-flex-start
.align-items-flex-end
.align-items-center
.align-items-baseline
.align-items-stretch
.align-self-flex-start
.align-self-flex-end
.align-self-center
.align-self-baseline
.align-self-stretch
.flex-wrap-nowrap
.flex-wrap-wrap
.flex-wrap-wrap-reverse
.align-content-flex-start
.align-content-flex-end
.align-content-space-around
.align-content-space-between
.align-content-stretch
.flex-grow-0
.flex-grow-1
.flex-shrink-0
.flex-shrink-1
.flex-basis-0
.flex-basis-auto
.flex-direction-row-tablet
.flex-direction-column-tablet
.flex-direction-row-reverse-tablet
.flex-direction-column-reverse-tablet
.justify-content-flex-start-tablet
.justify-content-flex-end-tablet
.justify-content-center-tablet
.justify-content-space-around-tablet
.justify-content-space-between-tablet
.justify-content-space-evenly-tablet
.align-items-flex-start-tablet
.align-items-flex-end-tablet
.align-items-center-tablet
.align-items-baseline-tablet
.align-items-stretch-tablet
.align-self-flex-start-tablet
.align-self-flex-end-tablet
.align-self-center-tablet
.align-self-baseline-tablet
.align-self-stretch-tablet
.flex-wrap-nowrap-tablet
.flex-wrap-wrap-tablet
.flex-wrap-wrap-reverse-tablet
.align-content-flex-start-tablet
.align-content-flex-end-tablet
.align-content-space-around-tablet
.align-content-space-between-tablet
.align-content-stretch-tablet
.flex-grow-0-tablet
.flex-grow-1-tablet
.flex-shrink-0-tablet
.flex-shrink-1-tablet
.flex-basis-0-tablet
.flex-basis-auto-tablet
```
