---
title: Breadcrumbs
description: The Breadcrumb component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FNWYugObOGcAOlekKyjkEkT%2F%25E2%25AD%2590%25EF%25B8%258F-Atlas---Page-Templating%3Fnode-id%3D204%253A1220
---

# Breadcrumbs

Use breadcrumbs to show navigation from the current location to less specific locations. Note that the final item representing the current page is not presented.

```html
<nav>
	<ol class="breadcrumbs">
		<li class="breadcrumb-item">
			<a href="#">Domain</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Kingdom</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Phylum</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Class</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Order</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Family</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Genus</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Species</a>
		</li>
	</ol>
</nav>
```

## Removing slashes

You can use `.breadcrumb-slashless` on any `.breadcrumb-item` to prevent a slash to be rendered.

```html
<nav>
	<ol class="breadcrumbs">
		<li class="breadcrumb-item">
			<a href="#">Family</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Genus</a>
		</li>
		<li class="breadcrumb-item breadcrumb-slashless">
			<a href="#">Species</a>
		</li>
	</ol>
</nav>
```

## Representing the current location

Note that the final item representing the current page is omitted in the default example. If for some reason it must be included add `.breadcrumb-slashless` to the final item along with `aria-current="page"` attribute and wrap it into `span` instead of an `anchor` tag.

```html
<nav>
	<ol class="breadcrumbs">
		<li class="breadcrumb-item">
			<a href="#">Family</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Genus</a>
		</li>
		<li class="breadcrumb-item breadcrumb-slashless" aria-current="page">
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
		<li class="breadcrumb-item">
			<a href="#">Domain</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Kingdom</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Phylum</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Class</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Order</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Family</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Genus</a>
		</li>
		<li class="breadcrumb-item">
			<a href="#">Species</a>
		</li>
	</ol>
</nav>
```
