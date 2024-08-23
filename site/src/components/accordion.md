---
title: Accordion
description: The accordion component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - accordion
---

# Accordion

Accordion is a component for grouping sections of related content that can be opened or closed. Accordion is built on top of the `<details>` HTML element.

## Usage

Here is an example of a standard `.accordion` usage. By default, accordion items are closed and allow multiple items to be open at once.

```html
<details class="accordion">
	<summary>Accordion header 1</summary>
	<div class="accordion-content">
		<p>Accordion panel 1</p>
	</div>
</details>
<details class="accordion">
	<summary>Accordion header 2</summary>
	<div class="accordion-content">
		<p>Accordion panel 2</p>
	</div>
</details>
<details class="accordion">
	<summary>Accordion header 3</summary>
	<div class="accordion-content">
		<p>Accordion panel 3</p>
	</div>
</details>
```

## Attributes

### Open

There is an option to have the accordion component load in the expanded state by adding the `open` attribute to one of the items.

```html
<details class="accordion" open>
	<summary>Accordion header 1</summary>
	<div class="accordion-content">
		<p>Accordion panel 1</p>
	</div>
</details>
<details class="accordion">
	<summary>Accordion header 2</summary>
	<div class="accordion-content">
		<p>Accordion panel 2</p>
	</div>
</details>
<details class="accordion">
	<summary>Accordion header 3</summary>
	<div class="accordion-content">
		<p>Accordion panel 3</p>
	</div>
</details>
```

### Name

Applying the `name` attribute to all accordion items with the same value will allow opening only one of the items at a time.

```html
<details class="accordion" name="accordion-group-1">
	<summary>Accordion header 1</summary>
	<div class="accordion-content">
		<p>Accordion panel 1</p>
	</div>
</details>
<details class="accordion" name="accordion-group-1">
	<summary>Accordion header 2</summary>
	<div class="accordion-content">
		<p>Accordion panel 2</p>
	</div>
</details>
<details class="accordion" name="accordion-group-1">
	<summary>Accordion header 3</summary>
	<div class="accordion-content">
		<p>Accordion panel 3</p>
	</div>
</details>
```

## Icon location

By default, the expansion indicator icon is located before the accordion item's header. Applying the `.accordion-icon-end` class to the `<summary>` element will change the icon's position to the end of the header.

<details class="accordion">
  <summary>Accordion icon's default position</summary>
  <div class="accordion-content">
  	<p>Accordion panel 1</p>
  </div>
</details>
<details class="accordion border-top">
  <summary class="accordion-icon-end">Accordion icon's end position</summary>
  <div class="accordion-content">
  	<p>Accordion panel 2</p>
  </div>
</details>

## Sizes

`accordion-sm`/`accordion-lg` modifier classes make the text size and padding a little bigger or smaller than the default.

```html
<details class="accordion accordion-sm">
	<summary>Small accordion header</summary>
	<div class="accordion-content">
		<p>Accordion panel content</p>
	</div>
</details>
<details class="accordion">
	<summary>Default accordion header</summary>
	<div class="accordion-content">
		<p>Accordion panel content</p>
	</div>
</details>
<details class="accordion accordion-lg">
	<summary>Large accordion header</summary>
	<div class="accordion-content">
		<p>Accordion panel content</p>
	</div>
</details>
```

## Patterns

This page discusses the component and subcomponents that make up `.accordion`, but it does not prescribe particular patterns. For examples of specific accordion builds, look to the [accordion patterns page](../patterns/accordion.md) for guidance.
