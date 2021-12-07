---
title: Popover
description: The Popover component in the Atlas Design System
template: standard
---

# Popover

The popover component allows content to be placed in the popup that appears after clicking on a button. Popover is based on top of the [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#customizing_the_disclosure_widget) HTML component.

```html
<details class="popover">
	<summary class="popover-summary">Click for details</summary>
	<div class="popover-content">
		<p class="margin-bottom-xs">It can be a paragraph of text.</p>
		<p class="margin-bottom-xxs">Or a list:</p>
		<ul>
			<li>
				<a href="#">List item</a>
			</li>
			<li>
				<a href="#">List item</a>
			</li>
			<li>
				<a href="#">List item</a>
			</li>
		</ul>
		<p class="margin-top-xs">Or basically anything else you can think of.</p>
	</div>
</details>
```

You can also use the `.button` class in combination with `.popover-summary` to get the button look.

```html
<details class="popover">
	<summary class="popover-summary button border">
		<span class="icon color-primary">
			<svg class="fill-current-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
				<path
					d="M256 896q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm768 0q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm768 0q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10z"
				/>
			</svg>
		</span>
	</summary>
	<div class="popover-content">
		<p>Popover content.</p>
	</div>
</details>
```

## Alignments

Popover is left aligned by default, but also can be centered or right aligned. Apply any of the corresponding classes to the `popover` element: `popover-right`, `popover-center`.

```html
<details class="popover margin-xxs">
	<summary class="popover-summary button color-text">Popover aligned to the left</summary>
	<div class="popover-content">Popover content.</div>
</details>

<details class="popover popover-center margin-xxs">
	<summary class="popover-summary button color-text">Popover centered</summary>
	<div class="popover-content">Popover content.</div>
</details>

<details class="popover popover-right margin-xxs">
	<summary class="popover-summary button color-text">Popover aligned to the right</summary>
	<div class="popover-content">Popover content.</div>
</details>
```
