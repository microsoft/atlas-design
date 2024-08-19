---
title: Details
description: The details component in the Atlas Design System
template: standard
# need design to create
# figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D1488%253A35182
classType: Component
classPrefixes:
  - details
---

# Details

The Details element represents a disclosure widget, where information is only visible when the element is toggled to an "open" state. A Summary or label must be provided using the `<summary>` element.

## Usage

Here is an example of a standard details usage paired with a summary. By default details elements are closed on page load and toggle open and closed when the user clicks the widget.

```html
<details>
	<summary>Details header 1</summary>
	<p>Details panel 1</p>
</details>
<details>
	<summary>Details header 2</summary>
	<p>Details panel 2</p>
</details>
<details>
	<summary>Details header 3</summary>
	<p>Details panel 3</p>
</details>
```

## Attributes

### Open

There is an option to have the `<details>` element load in the expanded state by adding the `open` attribute.

```html
<details open>
	<summary>Details header 1</summary>
	<p>Details panel 1</p>
</details>
<details>
	<summary>Details header 2</summary>
	<p>Details panel 2</p>
</details>
<details>
	<summary>Details header 3</summary>
	<p>Details panel 3</p>
</details>
```

### Name

There is an option to group multiple `<details>` elements, with only one open at a time, using the `name` attribute. This behavior is also known as an accordion.

```html
<details name="accordion-group-1">
	<summary>Details header 1</summary>
	<p>Details panel 1</p>
</details>
<details name="accordion-group-1">
	<summary>Details header 2</summary>
	<p>Details panel 2</p>
</details>
<details name="accordion-group-1">
	<summary>Details header 3</summary>
	<p>Details panel 3</p>
</details>
```

For stylized accordion patterns used on Learn, visit the [Accordion pattern page](../patterns/accordion.md).
