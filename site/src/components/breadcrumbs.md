---
title: Breadcrumbs
description: The Breadcrumb component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FNWYugObOGcAOlekKyjkEkT%2F%25E2%25AD%2590%25EF%25B8%258F-Atlas---Page-Templating%3Fnode-id%3D204%253A1220
---

# Breadcrumbs

Use breadcrumbs to show navigation from the current location to less specific locations. The internal structure of breadcrumbs is flexible, but at their simpliest they are a series of links. Note that the final item is not a link.

```html
<nav class="breadcrumbs">
	<a href="" class="breadcrumbs-item">Domain</a>
	<a href="" class="breadcrumbs-item">Kingdom</a>
	<a href="" class="breadcrumbs-item">Phylum</a>
	<a href="" class="breadcrumbs-item">Class</a>
	<a href="" class="breadcrumbs-item">Order</a>
	<a href="" class="breadcrumbs-item">Family</a>
	<a href="" class="breadcrumbs-item">Genus</a>
	<a href="" class="breadcrumbs-item">Species</a>
</nav>
```

## Mobile views and item overflow

Breadcrumbs often take up a great deal of horizontal space. Although Atlas provides no JavaScript to handle truncation of breadcrumbs, it does provide a the `.breadcrumbs-overflow` class, which adds a slash between the shown breadcrumb and a possible overflow menu. Note that this container is not presciptive, it can hold any inline or inline-block element.

```html
<nav class="breadcrumbs">
	<button class="breadcrumbs-overflow button-clear button button-sm button-primary">
		<span class="icon"
			><svg class="fill-current-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
				<path
					d="M256 896q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm768 0q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm768 0q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10z"
				/></svg
		></span>
	</button>
	<a href="" class="breadcrumbs-item">Family</a>
	<a href="" class="breadcrumbs-item">Genus</a>
	<a href="" class="breadcrumbs-item">Species</a>
</nav>
```

## Removing slashes

You can use `.breadcrumbs-slashless` on any `.breadcrumb-item` or the `.breadcrumb-overflow` to prevent a slash from behind rendered.

```html
<nav class="breadcrumbs">
	<button
		class="breadcrumbs-overflow button button-sm button-clear button-primary breadcrumbs-slashless"
	>
		<span class="icon"
			><svg class="fill-current-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
				<path
					d="M256 896q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm768 0q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm768 0q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10z"
				/></svg
		></span>
	</button>
	<a href="" class="breadcrumbs-item">Family</a>
	<a href="" class="breadcrumbs-item">Genus</a>
	<a href="" class="breadcrumbs-item breadcrumbs-slashless">Species</a>
</nav>
```

## Representing the current location

Note that the final item is ommitted in the default example. If for some reason it must be included can do so by `.breadcrumbs-slashless` to the final item. It should also be a `span` instead of an `anchor`.

```html
<nav class="breadcrumbs">
	<a href="" class="breadcrumbs-item">Domain</a>
	<a href="" class="breadcrumbs-item">Kingdom</a>
	<a href="" class="breadcrumbs-item">Phylum</a>
	<a href="" class="breadcrumbs-item">Class</a>
	<a href="" class="breadcrumbs-item">Order</a>
	<a href="" class="breadcrumbs-item">Family</a>
	<a href="" class="breadcrumbs-item">Genus</a>
	<a href="" class="breadcrumbs-item">Species</a>
	<span class="breadcrumbs-item breadcrumbs-item-linkless breadcrumbs-slashless">Individual</span>
</nav>
```

## Using list markup

If using a more semantic style of markup, for example a unordered list with list items containing anchors, you may need to adjust which elements you place `.breadcrumb-item` on.

```html
<nav class="breadcrumbs">
	<ul>
		<li class="breadcrumbs-item">
			<a href="">Domain</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="">Kingdom</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="">Phylum</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="">Class</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="">Order</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="">Family</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="">Genus</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="">Species</a>
		</li>
		<li class="breadcrumbs-item breadcrumbs-item-linkless breadcrumbs-slashless">
			<span>Individual</span>
		</li>
	</ul>
</nav>
```

## Size modification with Atomics

By default `.breadcrumb` are just slightly smaller than the document's font size. However, you may use [font size atomics](~/src/atomics/typography.md) to easily change the size of all the breadcrumbs. See example below, where `font-size-xs` is applied the the `.breadcrumbs` element.

<nav class="breadcrumbs font-size-xs margin-top-md">
	<ul>
		<li class="breadcrumbs-item">
			<a href="">Domain</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="">Kingdom</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="">Phylum</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="">Class</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="">Order</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="">Family</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="">Genus</a>
		</li>
		<li class="breadcrumbs-item">
			<a href="">Species</a>
		</li>
		<li class="breadcrumbs-item breadcrumbs-item-end">
			<span>Individual</span>
		</li>
	</ul>
</nav>
