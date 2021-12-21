---
title: Table
description: Table element and its modifiers.
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F1xPKoajeYtL7JPQ4ZoENkr%2F%25F0%259F%258C%259E-Atlas-Design-UI-Kit-(Team-Guidance)%3Fnode-id%3D195%253A3262
---

# Table

The table element helps organize content into rows and columns. The `table` class adds basic styles to the tables fast and easily. Adding supported modifiers will get a custom and responsive look to the table.

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

For cases in which a table has many columns, the `table-wrapper` class is available to handle the overflow. This class should be applied to the table's parent element.

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

### Simple

_`table-simple`_ gives table has only horizontal cell borders.

```html
<table class="table table-simple">
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
	</tbody>
</table>
```

### Complex

_`table-complex`_ - complex table style is a completely bordered cell layout with a heavy stylized header row.

```html
<table class="table table-complex">
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
	</tbody>
</table>
```

### Borderless

_`table-borderless`_ removes all table cell borders.

```html
<table class="table table-borderless">
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
	</tbody>
</table>
```

### Striped

_`table-striped`_ adds background color to every even row.

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
		<tr>
			<td>Row five</td>
			<td>Cell</td>
			<td>Cell</td>
		</tr>
	</tbody>
</table>
```

### Size

_`table-sm`_/_`table-lg`_ makes table more or less condensed than the default.

```html
<table class="table table-sm">
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
	</tbody>
</table>

<table class="table table-lg margin-top-lg">
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
	</tbody>
</table>
```

### Stacked on mobile

_`table-stacked-mobile`_ stacks table cells on mobile screen sizes.

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
