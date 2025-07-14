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

| Type                   | Class                     | Example                                                                                                                                                                                   |
| ---------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base                   | `.popover`                | <details class="popover"><summary class="button" style="white-space: nowrap;">Popover</summary><div class="popover-content">Popover content</div></details>                               |
| Popover with caret     | `.popover.popover-caret`  | <details class="popover popover-caret"><summary class="button" style="white-space: nowrap;">Popover with caret</summary><div class="popover-content">Popover content</div></details>      |
| Left-aligned content   | `.popover.popover-left`   | <details class="popover popover-left"><summary class="button" style="white-space: nowrap;">Content left-aligned</summary><div class="popover-content">Popover content</div></details>     |
| Right-aligned content  | `.popover.popover-right`  | <details class="popover popover-right"><summary class="button" style="white-space: nowrap;">Content right-aligned</summary><div class="popover-content">Popover content</div></details>   |
| Bottom-aligned content | `.popover.popover-bottom` | <details class="popover popover-bottom"><summary class="button" style="white-space: nowrap;">Content bottom-aligned</summary><div class="popover-content">Popover content</div></details> |
| Top-aligned content    | `.popover.popover-top`    | <details class="popover popover-top"><summary class="button" style="white-space: nowrap;">Content top-aligned</summary><div class="popover-content">Popover content</div></details>       |

## Usage

Here is an example of a standard usage of popover component.

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

Add a caret to the popover by applying the `popover-caret` class. The caret automatically points to the center of the button and adjusts its position based on whether the popover appears above or below the trigger.

```html
<details class="popover popover-caret margin-xxs">
	<summary class="button">Popover</summary>
	<div class="popover-content">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
		laboris nisi ut aliquip ex ea commodo consequat.
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
		laboris nisi ut aliquip ex ea commodo consequat.
	</div>
</details>

<div class="display-flex justify-content-center">
	<details class="popover margin-xxs">
		<summary class="button">Popover</summary>
		<div class="popover-content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</div>
	</details>
</div>

<div class="display-flex justify-content-flex-end">
	<details class="popover margin-xxs">
		<summary class="button">Popover</summary>
		<div class="popover-content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</div>
	</details>
</div>
```

## Fixed positioning

You can override the dynamic positioning behavior with the following classes.

### Vertical alignment

Use the `popover-top` class to force the popover to appear above the trigger element, regardless of available space.

```html
<div class="display-flex justify-content-center">
	<details class="popover popover-top margin-xxs">
		<summary class="button">Popover top</summary>
		<div class="popover-content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</div>
	</details>
</div>
```

Use the `popover-bottom` class to force the popover to appear below the trigger element.

```html
<div class="display-flex justify-content-center">
	<details class="popover popover-bottom margin-xxs">
		<summary class="button">Popover bottom</summary>
		<div class="popover-content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</div>
	</details>
</div>
```

### Horizontal alignment

By default, the popover content is centered with the popover button. You can use the `popover-left` or `popover-right` classes on the `.popover-content` element to align the popover content with the left or right edge of the button.

```html
<details class="popover popover-left popover-caret margin-xxs">
	<summary class="button">Left-aligned</summary>
	<div class="popover-content">Popover content.</div>
</details>

<details class="popover popover-center popover-caret margin-xxs">
	<summary class="button">Popover centered</summary>
	<div class="popover-content">Popover content.</div>
</details>

<details class="popover popover-right popover-caret margin-xxs">
	<summary class="button">Right-aligned</summary>
	<div class="popover-content">Popover content.</div>
</details>
```
