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

### Dismissing banner

Banners can be dismissed by adding the `data-dismissable` attribute to the `.banner` and `data-dismiss`to the closing button.

```html-no-indent
<div class="banner" id="example-banner-id" data-dismissable>
	<p>Dismissable banner. It will slowly slide up after closing.</p>
	<button type="button" class="dismiss" data-bi-name="close" data-dismiss>
		<span class="visually-hidden">Dismiss banner</span>
		<span class="icon" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color">
				<path
					d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"
				/>
			</svg>
		</span>
	</button>
</div>
```

### Loading banner

Ensure the user knows they need to wait for some event in order to interact with a banner.

```html-no-indent
<div class="banner is-loading">
	<p>Loading banner.</p>
</div>
```
