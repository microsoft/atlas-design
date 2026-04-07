---
title: Reading Width
description: The reading width component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - reading-width
---

# Reading width

The reading width component constrains an element's maximum width to an optimal reading measure. This improves readability for long-form text content by preventing lines from becoming too wide, which can make it difficult for readers to track from the end of one line to the beginning of the next.

## Usage

Apply the `.reading-width` class to any container whose content should be constrained to a comfortable reading width. This page's text uses this very class!

```html-no-example
<div class="reading-width">
	<p>
		This paragraph is constrained to an optimal reading width. Long lines of text are harder to
		read because the eye has to travel further from the end of one line to the beginning of the
		next, making it easy to lose your place. By limiting the maximum width, we ensure a
		comfortable reading experience.
	</p>
</div>
```

## Recommended implementation

Use `.reading-width` within a container that is centered in the viewport or a parent element. Pair it with `.margin-inline-auto` to automatically center the content horizontally. If used in a grid, ensure the grid column containing the `.reading-width` container uses the `minmax` function so that margin-inline-auto does not cause content to break outside the layout.
