---
title: Accordion
description: Accordion patterns in the Atlas Design System
template: standard
---

# Accordion patterns

Because the `.accordion` component has so many possible permutations, it can be helpful to provide examples of certain styles.

## Accent accordion

This accordion uses standard `.accordion` subcomponents. This accordion pattern makes use of background color tokens and border atomics. Spacing atomics are used to separate the [`.accordion`](../components/accordion.md) components, as well as align the content in the `summary` and `accordion-content` subcomponents. Typography atomics are used for the `.accordion-header` subcomponent text.

```html
<details class="accordion background-color-body-accent border-radius margin-block-xxs">
	<summary class="padding-xs">
		<div class="accordion-header font-weight-semibold">Accordion headline 1 text</div>
	</summary>
	<div class="accordion-content padding-xs">
		<p class="margin-bottom-xs">
			Viverra aliquet eget sit amet tellus cras. Nisl nisi scelerisque eu ultrices vitae.
			Condimentum id venenatis a condimentum. Ut eu sem integer vitae.
		</p>
		<h4 class="font-weight-semibold">Accordion content subheading</h4>
		<article class="card card border-left-lg border-left-color-accent margin-top-xs">
			<div class="card-content">
				<p class="card-supertitle">Content Type</p>
				<a href="#" class="card-title">The headline of the content item</a>
			</div>
		</article>
	</div>
</details>
<details class="accordion background-color-body-accent border-radius margin-block-xxs">
	<summary class="padding-xs">
		<div class="accordion-header font-weight-semibold">Accordion headline 2 text</div>
	</summary>
	<div class="accordion-content padding-xs">
		<p class="margin-bottom-xs">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa
			eget egestas.
		</p>
		<h4 class="font-weight-semibold">Accordion content subheading</h4>
		<article class="card card border-left-lg border-left-color-accent margin-block-xs">
			<div class="card-content">
				<p class="card-supertitle">Content Type</p>
				<a href="#" class="card-title">The headline of the content item</a>
			</div>
		</article>
		<article class="card card border-left-lg border-left-color-accent">
			<div class="card-content">
				<p class="card-supertitle">Content Type</p>
				<a href="#" class="card-title">The headline of the content item</a>
			</div>
		</article>
	</div>
</details>
```

## Subheading accordion

These accordions uses standard `.accordion` subcomponents, border atomics are used to create decorative separators. Subheadings should only be added to `-xl` and `-xxl` [`.accordion` sizes](../components/accordion.md#sizes). Since the `<summary>` element [implictly has a default role of `button`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary#sect5), typography in the `<summary>` element should be contained in `<p>` tags and styled with typography atomics.

```html
<div class="border-bottom">
	<details class="accordion accordion-xxl border-top">
		<summary class="padding-xs">
			<div class="accordion-header">
				<p class="font-weight-semibold">Accordion header 1 text</p>
				<p class="font-size-md color-text-subtle">Accordion subheader text</p>
			</div>
		</summary>
		<div class="accordion-content background-color-body-medium padding-xs">
			<article class="card card border-left-lg border-left-color-accent margin-bottom-xs">
				<div class="card-content">
					<p class="card-supertitle">Content Type</p>
					<a href="#" class="card-title">The headline of the content item</a>
					<p>Place card details items here.</p>
				</div>
			</article>
			<article class="card card border-left-lg border-left-color-accent">
				<div class="card-content">
					<p class="card-supertitle">Content Type</p>
					<a href="#" class="card-title">The headline of the content item</a>
					<p>Place card details items here.</p>
				</div>
			</article>
			<div class="text-align-center margin-top-xs">
				<a href="#" class="button button-sm button-primary">Button text</a>
			</div>
		</div>
	</details>
	<details class="accordion accordion-xxl border-top">
		<summary class="padding-xs">
			<div class="accordion-header margin-left-xxs">
				<p class="font-weight-semibold">Accordion header 2 text</p>
				<p class="font-size-md color-text-subtle">Accordion subheader text</p>
			</div>
		</summary>
		<div class="accordion-content background-color-body-medium padding-xs">
			<article class="card card border-left-lg border-left-color-accent margin-bottom-xs">
				<div class="card-content">
					<p class="card-supertitle">Content Type</p>
					<a href="#" class="card-title">The headline of the content item</a>
					<p>Place card details items here.</p>
				</div>
			</article>
			<article class="card card border-left-lg border-left-color-accent">
				<div class="card-content">
					<p class="card-supertitle">Content Type</p>
					<a href="#" class="card-title">The headline of the content item</a>
					<p>Place card details items here.</p>
				</div>
			</article>
			<div class="text-align-center margin-top-xs">
				<a href="#" class="button button-sm button-primary">Button text</a>
			</div>
		</div>
	</details>
</div>
```

## Coda accordion

These accordions us standard `.accordion` subcomponents, border-atomics to create a . They use `.accordion-icon-end` to right align the icon. Background color atomics are used for the `.accordion-content` subcomponent. Due to the border and backgound color atomics used, a consistent spacing padding atomic is used to align the header and panel content. Note that is recommended right aligned icon accordions not be full-width elements at desktop sizes.

```html
<div class="border-bottom">
	<details class="accordion accordion-icon-end  border-top">
		<summary class="padding-xs">
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
		<summary class="padding-xs">
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
