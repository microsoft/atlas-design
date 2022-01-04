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
	class="margin-top-md background-color-body-medium border border-radius-lg display-flex flex-direction-row"
>
	<div
		class="flex-shrink-0 flex-grow-0 background-color-info color-info-invert padding-md border-radius-lg"
	>
		<h1 class="font-size-h1">Hesiod</h1>
	</div>
	<div class="flex-shrink-1 flex-grow-1 padding-md display-flex align-items-center">
		<p class="font-size-lg">
			"Atlas through hard constraint upholds the wide heaven with unwearying head and arms, standing
			at the borders of the earth before the clear-voiced Hesperides (Ladies of the West); for this
			lot wise Zeus assigned to him."
		</p>
	</div>
</article>
```
