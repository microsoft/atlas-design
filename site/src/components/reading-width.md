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

It's a good idea to use `.reading-width` in combination with a container that is centered either within the viewport or a parent element. Try using it in combination with `margin-inline-auto` to automatically center the content horizontally. If used in a grid, you may need to ensure the grid-column that container the reading-width container uses the `minmax` function to ensure it `margin-inline-auto` does not break outside the layout.
