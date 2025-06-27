---
title: Popover
description: The Popover component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D961%253A928
classType: Component
classPrefixes:
  - popover
---

# Popover

The popover component allows content to be placed in the popup that appears after clicking on a button. Popover is build on top of the [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#customizing_the_disclosure_widget) HTML component.

```html
<details class="popover">
	<summary class="link-button">Click for details</summary>
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

Popover atomics: `popover-caret`, `popover-top`, `popover-left`, `popover-right`

## Styling the trigger

You can apply almost any class on the `summary` element to achieve the look you need. The following example applies `.button`.

```html
<details class="popover">
	<summary class="button border">
		<span class="icon color-primary">
			<svg class="fill-current-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
				<path
					d="M256 896q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm768 0q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm768 0q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10z"
				/>
			</svg>
		</span>
	</summary>
	<div class="popover-content">
		<p>
			Popover content will be centered by default, but will adjust positioning dynamically to
			prevent overflow.
		</p>
	</div>
</details>
```

## Caret

Show a caret on the popover content by applying the `popover-caret` class. The caret should point to the center of the popover button.

```html
<details class="popover popover-caret margin-xxs">
	<summary class="button">Popover</summary>
	<div class="popover-content">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
		laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
		voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
		non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	</div>
</details>
```

## Dynamic positioning

By default, the popover content is centered with the popover button and opens downward, but will dynamically shift location to avoid overflowing outside of the window.

```html
<details class="popover margin-xxs">
	<summary id="test-popover-summary" class="button">Popover</summary>
	<div id="test-popover-content" class="popover-content">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
		laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
		voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
		non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	</div>
</details>

<div class="display-flex justify-content-center">
	<details class="popover margin-xxs">
		<summary class="button">Popover</summary>
		<div class="popover-content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</div>
	</details>
</div>

<div class="display-flex justify-content-flex-end">
	<details class="popover margin-xxs">
		<summary class="button">Popover</summary>
		<div class="popover-content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</div>
	</details>
</div>
```

## Fixed positioning

### Vertical alignment

You can also fix the position of the popover, which will disable dynamic positioning of the popover content.

```html
<div class="display-flex justify-content-center">
	<details class="popover popover-top margin-xxs">
		<summary class="button">Popover top</summary>
		<div class="popover-content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</div>
	</details>
</div>
```

### Horizontal alignment

By default, the popover content is centered with the popover button. You can use the `popover-left` or `popover-right` classes on the `.popover-content` element to align the popover content with the left or right edge of the button.

```html
<details class="popover popover-left popover-caret margin-xxs">
	<summary class="button">Popover aligned to the left</summary>
	<div class="popover-content">Popover content.</div>
</details>

<details class="popover popover-center popover-caret margin-xxs">
	<summary class="button">Popover centered</summary>
	<div class="popover-content">Popover content.</div>
</details>

<details class="popover popover-right popover-caret margin-xxs">
	<summary class="button">Popover aligned to the right</summary>
	<div class="popover-content">Popover content.</div>
</details>
```
