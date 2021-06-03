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

## Modifiers

These classes are available to style tables in different ways, feel free to mix and match them!

| Class                      | Usage                                               |
| -------------------------- | --------------------------------------------------- |
| `table-striped`            | Adds background color to every odd row              |
| `is-inner-borders`         | Adds inner borders to the table                     |
| `is-header-background`     | Adds background color to the header row             |
| `is-row-header-background` | Adds background color to the first cell of each row |
| `is-stacked-mobile`        | Stacks table cells on mobile screen sizes.          |
| `min`                      | Resets table's `width`                              |

### `table-striped`

```html
<table class="table table-striped">
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
		<tr>
			<td>Row four</td>
			<td>Cell</td>
			<td>Cell</td>
		</tr>
	</tbody>
</table>
```

### `is-inner-borders`

```html
<table class="table is-inner-borders">
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

### `is-header-background`

```html
<table class="table is-header-background">
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

### `is-row-header-background`

```html
<table class="table is-row-header-background">
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

### `is-stacked-mobile`

```html
<table class="table is-stacked-mobile">
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

### `min`

```html
<table class="table min">
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
