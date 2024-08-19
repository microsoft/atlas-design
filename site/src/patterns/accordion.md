---
title: Accordion
description: Accordion patterns in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwKIbxNQ2kXnglOPc2cDE1y%2FFINAL-REBRAND-DESIGNS%3Fnode-id%3D70%253A2398
---

# Accordion patterns

Because the `details` component has so many possible permutations, it can be helpful to provide examples of certain styles.

## Accordion

This accordion uses the `open` attribute to expand a designated panel on page load. Grouping `<details>` elements together using the `name` attribute, prevents more than 1 panel from being open at a time. Atomics classes are used to style the accordion `<details>` and `summary` elements.

```html
<details
	open
	name="accordion-group-1"
	class="background-color-body-accent border-radius margin-block-xxs padding-xs"
>
	<summary class="font-weight-semibold">Advanced Design Techniques with Microsoft Tools</summary>
	<p class="margin-bottom-xxs">
		Advanced features in Microsoft Azure, optimizing engineering workflows, and leveraging cloud
		services for engineering solutions.
	</p>
	<p><strong class="font-weight-semibold">Hours to milestone completion</strong> 14</p>
	<article class="card margin-block-xs">
		<div class="card-template">
			<p class="card-supertitle">MODULES</p>
			<a href="#" class="card-title margin-bottom-none">Extend Microsoft 365 — Fundamental</a>
		</div>
	</article>
	<article class="card">
		<div class="card-template">
			<p class="card-supertitle">Learning Path</p>
			<a href="#" class="card-title margin-bottom-none">Introduction to Azure Open AI</a>
		</div>
	</article>
	<article class="card">
		<div class="card-template">
			<p class="card-supertitle">Learning Path</p>
			<a href="#" class="card-title margin-bottom-none">Implementing Azure DevOps for CI/CD</a>
		</div>
	</article>
</details>
<details
	name="accordion-group-1"
	class="background-color-body-accent border-radius margin-block-xxs padding-xs"
>
	<summary class="font-weight-semibold">Prepare data for analysis with Power BI</summary>
	<p class="margin-bottom-xxs">
		You'll learn how to use Power Query to extract data from different data sources, choose a
		storage mode, and connectivity type. You'll also learn to profile, clean, and load data into
		Power BI before you model your data.
	</p>
	<p><strong class="font-weight-semibold">Hours to milestone completion</strong> 7</p>
	<article class="card margin-block-xs">
		<div class="card-template">
			<p class="card-supertitle">Modules</p>
			<a href="#" class="card-title margin-bottom-none">Get data in Power BI</a>
		</div>
	</article>
	<article class="card">
		<div class="card-template">
			<p class="card-supertitle">Modules</p>
			<a href="#" class="card-title margin-bottom-none"
				>Clean, transform, and load data in Power BI</a
			>
		</div>
	</article>
</details>
```
