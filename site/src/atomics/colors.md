---
title: Color
description: Color and background-color related atomic css classes for the Atlas Design System
template: standard
classType: Atomics
classPrefixes:
  - color
  - background-color
---

# Color Atomics

Atlas has CSS classes that allow you to easily apply themed background and text colors. Change the site's theme to see how each looks in different themes.

## Accessibility concerns

Altas components take care of ensuring accessible text-to-background color contrast ratios. However, when apply specific colors yourself via atomics always remember to test contrast.

## Text colors

Atlas has three themed text colors.

<table class="table">
	<caption>
		Text color classes
	</caption>
	<thead>
		<tr>
			<th>Text color</th>
			<th>Text class</th>
		</tr>
	</thead>
	<tbody>
		<tr class="color-text">
			<td>Text</td>
			<td><code>.color-text</code></td>
		</tr>
		<tr class="color-text-subtle">
			<td>Text subtle</td>
			<td><code>.color-text-subtle</code></td>
		</tr>
		<tr class="color-text-invert background-color-alternate">
			<td>Text invert</td>
			<td><code>.color-text-invert</code></td>
		</tr>
	</tbody>
</table>

## Background colors

Atlas has five themed (non-semantic) background colors.

<table class="table">
	<caption>
		Body color classes
	</caption>
	<thead>
		<tr>
			<th>Background color</th>
			<th>Background class</th>
		</tr>
	</thead>
	<tbody>
		<tr class="background-color-body">
			<td>Body</td>
			<td><code>.background-color-body</code></td>
		</tr>
		<tr class="background-color-body-medium">
			<td>Body medium</td>
			<td><code>.background-color-body-medium</code></td>
		</tr>
		<tr class="background-color-body-accent">
			<td>Body accent</td>
			<td><code>.background-color-body-accent</code></td>
		</tr>
		<tr class="background-color-alternate color-text-invert">
			<td>Alternate</td>
			<td><code>.background-color-alternate</code></td>
		</tr>
		<tr class="background-color-alternate-medium color-text-invert">
			<td>Alternate medium </td>
			<td><code>.background-color-alternate-medium</code></td>
		</tr>
	</tbody>
</table>

## Semantic colors

Semantic colors are themed colors that vary depending on the active theme. They have names that pertain to their usage. Generally speaking, these are the colors used to paint components too.

<table class="table">
	<caption>
		Primary color classes
	</caption>
	<thead>
		<tr>
			<th>Background color /<br>Text color</th>
			<th>Font class</th>
			<th>Background class</th>
		</tr>
	</thead>
	<tbody>
		<tr class="background-color-primary-invert color-primary">
			<td>Primary invert /<br>Primary</td>
			<td><code>.color-primary</code></td>
			<td><code>.background-color-primary-invert</code></td>
		</tr>
		<tr class="background-color-primary-light" style="color: var(--theme-primary-dark)">
			<td>Primary light /<br> Primary dark</td>
			<td>N/A</td>
			<td><code>.background-color-primary-light</code></td>
		</tr>
		<tr class="background-color-primary color-primary-invert">
			<td>Primary /<br>Primary invert</td>
			<td><code>.color-primary-invert</code></td>
			<td><code>.background-color-primary</code></td>
		</tr>
		<tr class="background-color-primary-dark color-primary-invert">
			<td>Primary dark /<br>Primary invert</td>
			<td><code>.color-primary-invert</code></td>
			<td><code>.background-color-primary-dark</code></td>
		</tr>
	</tbody>
</table>

<table class="table">
	<caption>
		Success color classes
	</caption>
	<thead>
		<tr>
			<th>Background color /<br>Text color</th>
			<th>Font class</th>
			<th>Background class</th>
		</tr>
	</thead>
	<tbody>
		<tr class="background-color-success-invert color-success">
			<td>Success invert /<br>Success</td>
			<td><code>.color-success</code></td>
			<td><code>.background-color-success-invert</code></td>
		</tr>
		<tr class="background-color-success-light" style="color: var(--theme-success-dark)">
			<td>Success light /<br> Success dark</td>
			<td>N/A</td>
			<td><code>.background-color-success-light</code></td>
		</tr>
		<tr class="background-color-success color-success-invert">
			<td>Success /<br>Success invert</td>
			<td><code>.color-success-invert</code></td>
			<td><code>.background-color-success</code></td>
		</tr>
		<tr class="background-color-success-dark color-success-invert">
			<td>Success dark /<br>Success invert</td>
			<td><code>.color-success-invert</code></td>
			<td><code>.background-color-success-dark</code></td>
		</tr>
	</tbody>
</table>

<table class="table">
	<caption>
		Info color classes
	</caption>
	<thead>
		<tr>
			<th>Background color /<br>Text color</th>
			<th>Font class</th>
			<th>Background class</th>
		</tr>
	</thead>
	<tbody>
		<tr class="background-color-info-invert color-info">
			<td>Info invert /<br>Info</td>
			<td><code>.color-info</code></td>
			<td><code>.background-color-info-invert</code></td>
		</tr>
		<tr class="background-color-info-light" style="color: var(--theme-info-dark)">
			<td>Info light /<br> Info dark</td>
			<td>N/A</td>
			<td><code>.background-color-info-light</code></td>
		</tr>
		<tr class="background-color-info color-info-invert">
			<td>Info /<br>Info invert</td>
			<td><code>.color-info-invert</code></td>
			<td><code>.background-color-info</code></td>
		</tr>
		<tr class="background-color-info-dark color-info-invert">
			<td>Info dark /<br>Info invert</td>
			<td><code>.color-info-invert</code></td>
			<td><code>.background-color-info-dark</code></td>
		</tr>
	</tbody>
</table>

<table class="table">
	<caption>
		Danger color classes
	</caption>
	<thead>
		<tr>
			<th>Background color /<br>Text color</th>
			<th>Font class</th>
			<th>Background class</th>
		</tr>
	</thead>
	<tbody>
		<tr class="background-color-danger-invert color-danger">
			<td>Danger invert /<br>Danger</td>
			<td><code>.color-danger</code></td>
			<td><code>.background-color-danger-invert</code></td>
		</tr>
		<tr class="background-color-danger-light" style="color: var(--theme-danger-dark)">
			<td>Danger light /<br> Danger dark</td>
			<td>N/A</td>
			<td><code>.background-color-danger-light</code></td>
		</tr>
		<tr class="background-color-danger color-danger-invert">
			<td>Danger /<br>Danger invert</td>
			<td><code>.color-danger-invert</code></td>
			<td><code>.background-color-danger</code></td>
		</tr>
		<tr class="background-color-danger-dark color-danger-invert">
			<td>Danger dark /<br>Danger invert</td>
			<td><code>.color-danger-invert</code></td>
			<td><code>.background-color-danger-dark</code></td>
		</tr>
	</tbody>
</table>
