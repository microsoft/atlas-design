---
title: Table
description: Table element and it's modifiers.
template: standard
---

# Table

Table element helps organize content into rows and columns. `table` class adds basic styles to the tables fast and easily. Adding supported modifiers will get a custom and responsive look to the table.

## Usage

Here is an example of applying `table` class to the table element:

```html
<table class="table">
	<caption>
		Table caption
	</caption>
	<thead>
		<tr>
			<th>Heading row</th>
			<th>Heading cell</th>
			<th>Heading cell</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Row one</td>
			<td>Cell</td>
			<td>Cell</td>
		</tr>
		<tr>
			<td>Row two</td>
			<td>Cell</td>
			<td>Cell</td>
		</tr>
		<tr>
			<td>Row three</td>
			<td>Cell</td>
			<td>Cell</td>
		</tr>
	</tbody>
	<tfoot>
		<tr>
			<th>Footer row</th>
			<th>Cell</th>
			<th>Cell</th>
		</tr>
	</tfoot>
</table>
```

For cases there are quite a lot of columns in the table - the `table-wrapper` class available, that should be applied to the table's parent element, to handle the overflow case:

```html
<div class="table-wrapper">
	<table class="table">
		<thead>
			<tr>
				<th>Heading row</th>
				<th>Heading cell</th>
				<th>Heading cell</th>
				<th>Heading cell</th>
				<th>Heading cell</th>
				<th>Heading cell</th>
				<th>Heading cell</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Row one</td>
				<td>Cell</td>
				<td>Cell</td>
				<td>Cell</td>
				<td>Cell</td>
				<td>Cell</td>
				<td>Cell</td>
			</tr>
			<tr>
				<td>Row two</td>
				<td>Cell</td>
				<td>Cell</td>
				<td>Cell</td>
				<td>Cell</td>
				<td>Cell</td>
				<td>Cell</td>
			</tr>
		</tbody>
	</table>
</div>
```

## Modifiers

_`table-stacked-mobile`_ - stacks table cells on mobile screen sizes.

```html
<table class="table table-stacked-mobile">
	<thead>
		<tr>
			<th>Heading row</th>
			<th>Heading cell</th>
			<th>Heading cell</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Row one</td>
			<td>Cell</td>
			<td>Cell</td>
		</tr>
		<tr>
			<td>Row two</td>
			<td>Cell</td>
			<td>Cell</td>
		</tr>
		<tr>
			<td>Row three</td>
			<td>Cell</td>
			<td>Cell</td>
		</tr>
	</tbody>
</table>
```
