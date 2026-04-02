---
title: Reading width
description: The reading width component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - reading-width
---

# Reading width

The reading width component constrains an element's maximum width to an optimal reading measure (`688px`). This improves readability for long-form text content by preventing lines from becoming too wide, which can make it difficult for readers to track from the end of one line to the beginning of the next.

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
