---
title: Stretched link
description: The stretched link component in the Atlas Design System
template: standard
---

# Stretched link

The stretched link element can be used to expand a link's clickable area to its nearest parent with `position: relative`. You can place the `.position-relative` atomic class on parent element and `.stretched-link` to the anchor tag itself.

```html
<article class="padding-lg position-relative border">
	<a href="#" class="stretched-link">This entire card is clickable.</a>
	<p>Ensure you place position-relative on the parent</p>
</article>
```
