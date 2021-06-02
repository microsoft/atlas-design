---
title: Table  Atomics
description: Border related atomic css classes for the Atlas Design System
template: standard
---

# Table Atomics

The `table` class helps you style tables fast and easily. Just adding the supported modifiers you'll get a custom and responsive table.

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

Extra classes are available to style tables in different ways, feel free to mix and match them!

| class                       | usage                                               |
| --------------------------- | --------------------------------------------------- |
| `table-striped`             | Adds background color to every odd row              |
| `has-inner-borders`         | Adds inner borders to the table                     |
| `has-header-background`     | Adds background color to the header row             |
| `has-row-header-background` | Adds background color to the first cell of each row |
| `min`                       | Resets table's `width`                              |

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

### `has-inner-borders`

```html
<table class="table has-inner-borders">
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

### `has-header-background`

```html
<table class="table has-header-background">
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

### `has-row-header-background`

```html
<table class="table has-row-header-background">
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
