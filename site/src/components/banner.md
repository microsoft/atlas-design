---
title: Banner
description: The Banner component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D35687%253A253899%26t%3DMgxlZCy8on3CKZ9O-1
classType: Component
classPrefixes:
  - banner
---

# Banner

Banner component allows adding a full width message block to the page to notify user about something that’s not directly related to the page content.

**This page is best viewed with the content section full screened because banners are intended to be full width elements. Go full screen by clicking the button in the top right corner.**

## Usage

Here is an example of a standard usage of banner component.

```html-no-indent
<div class="banner">
	<p>A banner about something happening in the world <a href="#">Link</a></p>
</div>
```

### Loading banner

Ensure the user knows they need to wait for some event in order to interact with a banner.

```html-no-indent
<div class="banner is-loading">
	<p>Loading banner.</p>
</div>
```
