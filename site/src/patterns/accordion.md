---
title: Accordion
description: Accordion patterns in the Atlas Design System
template: standard
# figmaEmbed: https://www.figma.com/design/a5gqz0qtUMAKF36lNS6b61/Adaptive-Learning---Phase-I-(2024)?node-id=2581-106784&t=lkaa1re80XFTF9O3-0
---

# Accordion patterns

Because the `details` component has so many possible permutations, it can be helpful to provide examples of certain styles.

## Accordion

This accordion uses the `open` attribute to expand a designated panel on page load. Grouping `.accordion` components together using the `name` attribute, prevents more than 1 panel from being open at a time. Atomics classes are used to style the accordion `<details>` and `<summary>` elements.

```html
<details
	name="accordion-group-1"
	class="accordion background-color-body-accent border-radius margin-block-xxs"
>
	<summary class="font-weight-semibold">Accordion headline 1 text</summary>
	<div class="accordion-content">
		<p class="margin-bottom-xxs">
			Viverra aliquet eget sit amet tellus cras. Nisl nisi scelerisque eu ultrices vitae.
			Condimentum id venenatis a condimentum. Ut eu sem integer vitae.
		</p>
		<h4 class="font-weight-semibold">Accordion content subheading</h4>
		<article class="card margin-top-xs">
			<div class="card-template">
				<p class="card-supertitle">Content Type</p>
				<a href="#" class="card-title margin-bottom-none">The headline of the content item</a>
			</div>
		</article>
	</div>
</details>
<details
	name="accordion-group-1"
	class="accordion background-color-body-accent border-radius margin-block-xxs"
>
	<summary class="font-weight-semibold">Accordion headline 2 text</summary>
	<div class="accordion-content">
		<p class="margin-bottom-xxs">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa
			eget egestas.
		</p>
		<h4 class="font-weight-semibold">Accordion content subheading</h4>
		<article class="card margin-block-xs">
			<div class="card-template">
				<p class="card-supertitle">Content Type</p>
				<a href="#" class="card-title margin-bottom-none">The headline of the content item</a>
			</div>
		</article>
		<article class="card">
			<div class="card-template">
				<p class="card-supertitle">Content Type</p>
				<a href="#" class="card-title margin-bottom-none">The headline of the content item</a>
			</div>
		</article>
	</div>
</details>
```

```html
<details name="accordion-group-2" class="accordion accordion-lg border-top">
	<summary>
		<h3 class="font-weight-semibold">Accordion header 1 text</h3>
		<p class="font-size-md color-text-subtle">Accordion subheader text</p>
	</summary>
	<div class="accordion-content background-color-body-medium">
		<p class="margin-bottom-xxs">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua.
		</p>
		<h4 class="font-weight-semibold">Accordion content subheading</h4>
		<article class="card margin-block-xs">
			<div class="card-template">
				<p class="card-supertitle">Content Type</p>
				<a href="#" class="card-title margin-bottom-none">The headline of the content item</a>
			</div>
		</article>
		<article class="card">
			<div class="card-template">
				<p class="card-supertitle">Content Type</p>
				<a href="#" class="card-title margin-bottom-none">The headline of the content item</a>
			</div>
		</article>
	</div>
</details>
<details name="accordion-group-2" class="accordion accordion-lg border-top">
	<summary>
		<h3 class="font-weight-semibold">Accordion header 2 text</h3>
		<p class="font-size-md color-text-subtle">Accordion subheader text</p>
	</summary>
	<div class="accordion-content background-color-body-medium">
		<p class="margin-bottom-xxs">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua.
		</p>
		<h4 class="font-weight-semibold">Accordion content subheading</h4>
		<article class="card margin-block-xs">
			<div class="card-template">
				<p class="card-supertitle">Content Type</p>
				<a href="#" class="card-title margin-bottom-none">The headline of the content item</a>
			</div>
		</article>
		<article class="card">
			<div class="card-template">
				<p class="card-supertitle">Content Type</p>
				<a href="#" class="card-title margin-bottom-none">The headline of the content item</a>
			</div>
		</article>
	</div>
</details>
<details name="accordion-group-2" class="accordion accordion-lg border-top">
	<summary>
		<h3 class="font-weight-semibold">Accordion header 3 text</h3>
		<p class="font-size-md color-text-subtle">Accordion subheader text</p>
	</summary>
	<div class="accordion-content background-color-body-medium">
		<p class="margin-bottom-xxs">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua.
		</p>
		<h4 class="font-weight-semibold">Accordion content subheading</h4>
		<article class="card margin-block-xs">
			<div class="card-template">
				<p class="card-supertitle">Content Type</p>
				<a href="#" class="card-title margin-bottom-none">The headline of the content item</a>
			</div>
		</article>
		<article class="card">
			<div class="card-template">
				<p class="card-supertitle">Content Type</p>
				<a href="#" class="card-title margin-bottom-none">The headline of the content item</a>
			</div>
		</article>
	</div>
</details>
```

```html
<div class="border-bottom">
	<details name="accordion-group-3" class="accordion border-top">
		<summary class="accordion-icon-end font-weight-semibold">Accordion header text</summary>
		<div class="accordion-content background-color-body-medium">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua.
			</p>
		</div>
	</details>
	<details name="accordion-group-3" class="accordion border-top">
		<summary class="accordion-icon-end font-weight-semibold">Accordion header text</summary>
		<div class="accordion-content background-color-body-medium">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua.
			</p>
		</div>
	</details>
</div>
```
