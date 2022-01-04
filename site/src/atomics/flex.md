---
title: Flex Atomics
description: Flex related atomic css classes for the Atlas Design System
template: standard
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
.align-items-flex-center
.align-items-flex-baseline
.align-items-flex-stretch
.align-self-flex-start
.align-self-flex-end
.align-self-flex-center
.align-self-flex-baseline
.align-self-flex-stretch
.flex-wrap-nowrap
.flex-wrap-wrap
.flex-wrap-wrap-reverse
.align-content-flex-start
.align-content-flex-end
.align-content-flex-space-around
.align-content-flex-space-between
.align-content-flex-stretch
.flex-grow-0
.flex-grow-1
.flex-shrink-0
.flex-shrink-1
```
