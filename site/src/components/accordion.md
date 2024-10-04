---
title: Accordion
description: The accordion component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - accordion
---

# Accordion

Accordion is a component for grouping sections of related content that can be opened or closed. Accordion is built on top of the [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#customizing_the_disclosure_widget) HTML element.

## Usage

Here is an example of a standard `.accordion` usage. By default, accordion items are closed and allow multiple items to be open at once.

```html
<details class="accordion">
	<summary>
		<div class="accordion-header">Accordion header 1</div>
	</summary>
	<div class="accordion-content">
		<p>Accordion panel</p>
	</div>
</details>

<details class="accordion margin-top-xxs">
	<summary>
		<div class="accordion-header">Accordion header 2</div>
	</summary>
	<div class="accordion-content">
		<p>Accordion panel</p>
	</div>
</details>

<details class="accordion margin-top-xxs">
	<summary>
		<div class="accordion-header">Accordion header 3</div>
	</summary>
	<div class="accordion-content">
		<p>Accordion panel</p>
	</div>
</details>
```

## Attributes

### Open

To load the accordion component in the expanded state by default, add the `open` attribute to the `<details>` element.

```html
<details class="accordion" open>
	<summary>
		<div class="accordion-header">Accordion header 1</div>
	</summary>
	<div class="accordion-content">
		<p>Accordion panel</p>
	</div>
</details>

<details class="accordion margin-top-xxs">
	<summary>
		<div class="accordion-header">Accordion header 2</div>
	</summary>
	<div class="accordion-content">
		<p>Accordion panel</p>
	</div>
</details>

<details class="accordion margin-top-xxs">
	<summary>
		<div class="accordion-header">Accordion header 3</div>
	</summary>
	<div class="accordion-content">
		<p>Accordion panel</p>
	</div>
</details>
```

### Name

Applying the `name` attribute to all accordion items with the same value will allow opening only one of the items at a time.

```html
<details class="accordion" name="accordion-group-1">
	<summary>
		<div class="accordion-header">Accordion header 1</div>
	</summary>
	<div class="accordion-content">
		<p>Accordion panel</p>
	</div>
</details>

<details class="accordion margin-top-xxs" name="accordion-group-1">
	<summary>
		<div class="accordion-header">Accordion header 2</div>
	</summary>
	<div class="accordion-content">
		<p>Accordion panel</p>
	</div>
</details>

<details class="accordion margin-top-xxs" name="accordion-group-1">
	<summary>
		<div class="accordion-header">Accordion header 3</div>
	</summary>
	<div class="accordion-content">
		<p>Accordion panel</p>
	</div>
</details>
```

## Icon location

By default, the expansion indicator icon is located before the accordion item's header. Applying the `.accordion-icon-end` class to the item will change the icon's position to the end of the header.

```html
<details class="accordion accordion-icon-end">
	<summary>
		<div class="accordion-header">Accordion icon's end position</div>
	</summary>
	<div class="accordion-content">
		<p>Accordion panel</p>
	</div>
</details>
```

## Sizes

Modifier classes to make the`.accordion-header's font size and icon size a little smaller or bigger than the default.

```html
<details class="accordion accordion-sm">
	<summary>
		<div class="accordion-header">Small accordion header</div>
	</summary>
	<div class="accordion-content">
		<p>Accordion panel</p>
	</div>
</details>

<details class="accordion margin-top-xxs">
	<summary>
		<div class="accordion-header">Default accordion header</div>
	</summary>
	<div class="accordion-content">
		<p>Accordion panel</p>
	</div>
</details>

<details class="accordion accordion-lg margin-top-xxs">
	<summary>
		<div class="accordion-header">Large accordion header</div>
	</summary>
	<div class="accordion-content">
		<p>Accordion panel</p>
	</div>
</details>

<details class="accordion accordion-xl margin-top-xxs">
	<summary>
		<div class="accordion-header">Extra large accordion header</div>
	</summary>
	<div class="accordion-content">
		<p>Accordion panel</p>
	</div>
</details>

<details class="accordion accordion-xxl margin-top-xxs">
	<summary>
		<div class="accordion-header">Extra extra larger accordion header</div>
	</summary>
	<div class="accordion-content">
		<p>Accordion panel</p>
	</div>
</details>
```
