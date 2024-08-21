---
title: Accordion
description: Accordion patterns in the Atlas Design System
template: standard
# figmaEmbed: https://www.figma.com/design/a5gqz0qtUMAKF36lNS6b61/Adaptive-Learning---Phase-I-(2024)?node-id=2581-106784&t=lkaa1re80XFTF9O3-0
---

# Accordion patterns

Because the `details` component has so many possible permutations, it can be helpful to provide examples of certain styles.

## Accordion

This accordion uses the `open` attribute to expand a designated panel on page load. Grouping `.accordion` components together using the `name` attribute, prevents more than 1 panel from being open at a time. Atomics classes are used to style the accordion `<details>` and `<summary>` elements.

```html
<details
	name="accordion-group-1"
	class="accordion background-color-body-accent border-radius margin-block-xxs"
>
	<summary class="font-weight-semibold">Advanced Design Techniques with Microsoft Tools</summary>
	<div class="accordion-content">
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
		<article class="card margin-block-xs">
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
	</div>
</details>
<details
	name="accordion-group-1"
	class="accordion background-color-body-accent border-radius margin-block-xxs"
>
	<summary class="font-weight-semibold">Prepare data for analysis with Power BI</summary>
	<div class="accordion-content">
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
	</div>
</details>
```

```html
<details open name="accordion-group-1" class="accordion accordion-lg">
	<summary>
		<div>
			<h3 class="font-weight-semibold font">Advanced Design Techniques with Microsoft Tools</h3>
			<p class="font-size-md color-text-subtle">lorem ipsum</p>
		</div>
	</summary>
	<div class="accordion-content background-color-body-medium">
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
	</div>
</details>
<details name="accordion-group-1" class="accordion accordion-lg border-top">
	<summary>
		<div>
			<h3 class="font-weight-semibold font">Advanced Design Techniques with Microsoft Tools</h3>
			<p class="font-size-md color-text-subtle">lorem ipsum</p>
		</div>
	</summary>
	<div class="accordion-content background-color-body-medium">
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
	</div>
</details>
<details name="accordion-group-1" class="accordion accordion-lg border-top">
	<summary>
		<div>
			<h3 class="font-weight-semibold font">Advanced Design Techniques with Microsoft Tools</h3>
			<p class="font-size-md color-text-subtle">lorem ipsum</p>
		</div>
	</summary>
	<div class="accordion-content background-color-body-medium">
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
	</div>
</details>
```

```html
<div class="border-bottom">
	<details open name="accordion-group-1" class="accordion accordion-lg">
		<summary class="accordion-icon-end">
			<div>
				<h3 class="font-weight-semibold font">Advanced Design Techniques with Microsoft Tools</h3>
				<p class="font-size-md color-text-subtle">lorem ipsum</p>
			</div>
		</summary>
		<div class="accordion-content background-color-body-medium">
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
		</div>
	</details>
	<details name="accordion-group-1" class="accordion accordion-lg border-top">
		<summary class="accordion-icon-end">
			<div>
				<h3 class="font-weight-semibold font">Advanced Design Techniques with Microsoft Tools</h3>
				<p class="font-size-md color-text-subtle">lorem ipsum</p>
			</div>
		</summary>
		<div class="accordion-content background-color-body-medium">
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
		</div>
	</details>
	<details name="accordion-group-1" class="accordion accordion-lg border-top">
		<summary class="accordion-icon-end">
			<div>
				<h3 class="font-weight-semibold font">Advanced Design Techniques with Microsoft Tools</h3>
				<p class="font-size-md color-text-subtle">lorem ipsum</p>
			</div>
		</summary>
		<div class="accordion-content background-color-body-medium">
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
		</div>
	</details>
</div>
```
