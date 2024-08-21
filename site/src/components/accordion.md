---
title: Accordion
description: The accordion component in the Atlas Design System
template: standard
# need design to create
# figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D1488%253A35182
classType: Component
classPrefixes:
  - accordion
---

# Accordion

The Accordion component contains a disclosure widget, where information is only visible when the element is toggled to an "open" state. A Summary or label must be provided using the `<summary>` element.

## Usage

Here is an example of a standard `.accordion` usage. By default `<details>` elements are closed on page load and toggle open or closed when the user clicks the `<summary>`.

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

There is an option to have the accordion component load in the expanded state by adding the `open` attribute.

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

Using the `name` attribute, there is an option to group multiple accordion components, which allows only one open panel at a time.

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

By default the expansion indicator icon is before the summary content. Using the `.accordion-icon-end` class, the icon can be positioned at the end of the summary. The icon is absolutely positioned to remain at the top if Summary content wraps or contains multiple lines.

<details class="accordion">
  <summary>Accordion header 1</summary>
  <div class="accordion-content">
  	<p>Accordion panel 1</p>
  </div>
</details>
<details class="accordion border-top">
  <summary class="accordion-icon-end">Accordion header 2</summary>
  <div class="accordion-content">
  	<p>Accordion panel 2</p>
  </div>
</details>

## Sizes

`accordion-sm`/`accordion-lg` modifier classes make the text size and padding a little bigger or smaller than the default.

```html
<details class="accordion accordion-sm" name="accordion-group-1">
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
<details class="accordion accordion-lg" name="accordion-group-1">
	<summary>Accordion header 3</summary>
	<div class="accordion-content">
		<p>Accordion panel 3</p>
	</div>
</details>
```

## Patterns

For accordion patterns styled with Atomics, visit the [Accordion patterns page](../patterns/accordion.md).
