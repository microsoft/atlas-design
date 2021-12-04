---
title: Breadcrumbs
description: The Breadcrumb component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F1xPKoajeYtL7JPQ4ZoENkr%2F%25F0%259F%258C%259E-Atlas-Design-UI-Kit-(Team-Guidance)%3Fnode-id%3D0%253A1
---

# Breadcrumbs

Use breadcrumbs to show navigation from the current location to less specific locations. Note that the final item representing the current page is not presented.

```html
<nav>
	<ol class="breadcrumbs">
		<li class="breadcrumbs-item">
			<a href="#">Domain</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="#">Kingdom</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="#">Phylum</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="#">Class</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="#">Order</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="#">Family</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="#">Genus</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="#">Species</a>
		</li>
	</ol>
</nav>
```

## Representing the current location

The final item representing the current page is omitted in the default example. If for some reason it must be included add `.breadcrumbs-item-slashless` to the final item to remove slash along with `aria-current="page"` attribute and wrap it into `span` instead of an `anchor` tag.

```html
<nav>
	<ol class="breadcrumbs">
		<li class="breadcrumbs-item">
			<a href="#">Family</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="#">Genus</a>
		</li>
		<li class="breadcrumbs-item breadcrumbs-item-slashless" aria-current="page">
			<span>Species</span>
		</li>
	</ol>
</nav>
```

## Size modification with Atomics

By default `.breadcrumbs` are just slightly smaller than the document's font size. However, you may use [font size atomics](~/src/atomics/typography.md) to easily change the size of all the breadcrumbs. See example below, where `font-size-xl` is applied the the `.breadcrumbs` element.

```html
<nav>
	<ol class="breadcrumbs font-size-xl">
		<li class="breadcrumbs-item">
			<a href="#">Domain</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="#">Kingdom</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="#">Phylum</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="#">Class</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="#">Order</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="#">Family</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="#">Genus</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="#">Species</a>
		</li>
	</ol>
</nav>
```
