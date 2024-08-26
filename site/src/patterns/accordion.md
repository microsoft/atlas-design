---
title: Accordion
description: Accordion patterns in the Atlas Design System
template: standard
---

# Accordion patterns

Because the `details` component has so many possible permutations, it can be helpful to provide examples of certain styles.

## Accordion

This accordion uses the `open` attribute to expand a designated panel on page load. Grouping `.accordion` components together using the `name` attribute, prevents more than 1 panel from being open at a time. Atomics classes are used to style the accordion `<details>` and `<summary>` elements.

```html
<details class="accordion background-color-body-accent border-radius margin-block-xxs">
	<summary class="font-weight-semibold padding-xs">
		<div class="accordion-header font-weight-semibold">Accordion headline 1 text</div>
	</summary>
	<div class="accordion-content padding-xs">
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
<details class="accordion background-color-body-accent border-radius margin-block-xxs">
	<summary class="padding-xs">
		<div class="accordion-header font-weight-semibold">Accordion headline 2 text</div>
	</summary>
	<div class="accordion-content padding-xs">
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
<details class="accordion accordion-lg border-top">
	<summary>
		<div class="accordion-header margin-left-xxs">
			<p class="font-weight-semibold font-size-h5 line-height-normal">Accordion header 1 text</p>
			<p class="font-size-md color-text-subtle">Accordion subheader text</p>
		</div>
	</summary>
	<div class="accordion-content background-color-body-medium font-size-md padding-xs">
		<article class="card margin-bottom-xs">
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
		<div class="text-align-center margin-top-xs">
			<a href="#" class="button button-sm button-primary">Button text</a>
		</div>
	</div>
</details>
<details class="accordion accordion-lg border-top">
	<summary>
		<div class="accordion-header  margin-left-xxs">
			<p class="font-weight-semibold font-size-h5 line-height-normal">Accordion header 2 text</p>
			<p class="font-size-md color-text-subtle">Accordion subheader text</p>
		</div>
	</summary>
	<div class="accordion-content background-color-body-medium font-size-md padding-xs">
		<article class="card margin-bottom-xs">
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
		<div class="text-align-center margin-top-xs">
			<a href="#" class="button button-sm button-primary">Button text</a>
		</div>
	</div>
</details>
<details class="accordion accordion-lg border-top">
	<summary>
		<div class="accordion-header  margin-left-xxs">
			<p class="font-weight-semibold font-size-h5 line-height-normal">Accordion header 3 text</p>
			<p class="font-size-md color-text-subtle">Accordion subheader text</p>
		</div>
	</summary>
	<div class="accordion-content background-color-body-medium font-size-md padding-xs">
		<article class="card margin-bottom-xs">
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
		<div class="text-align-center margin-top-xs">
			<a href="#" class="button button-sm button-primary">Button text</a>
		</div>
	</div>
</details>
```

```html
<div class="border-bottom">
	<details class="accordion accordion-icon-end  border-top">
		<summary>
			<div class="accordion-header font-weight-semibold">Accordion header text</div>
		</summary>
		<div class="accordion-content background-color-body-medium padding-xs">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua.
			</p>
		</div>
	</details>
	<details class="accordion accordion-icon-end  border-top">
		<summary>
			<div class="accordion-header font-weight-semibold">Accordion header text</div>
		</summary>
		<div class="accordion-content background-color-body-medium padding-xs">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua.
			</p>
		</div>
	</details>
</div>
```
