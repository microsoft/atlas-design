---
title: Pagination
description: Pagination related components in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - pagination
  - is-current
---

# Pagination

The pagination component consists of several elements:

- `pagination-previous` and `pagination-next` for incremental navigation
- `pagination-list` which displays page items for navigation to individual pages
- `pagination-link` for page numbers and `pagination-ellipsis` for range numbers

All elements are optional so you can compose your pagination as you wish.

```html
<nav class="pagination" role="navigation" aria-label="pagination">
	<a class="pagination-previous" aria-label="previous">
		<span class="icon" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448">
				<path
					class="fill-current-color"
					d="M448 224H62.625l148.688 148.688-22.625 22.625L1.375 208 188.688 20.688l22.625 22.625L62.625 192H448v32z"
				/>
			</svg>
		</span>
	</a>
	<a class="pagination-next" aria-label="next">
		<span class="icon" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="-255 57 448 448">
				<path
					class="fill-current-color"
					d="M-253.625 281v-32H131.75L-16.938 100.313 5.687 77.688 193 265 5.687 452.313l-22.625-22.625L131.75 281h-385.375z"
				/>
			</svg>
		</span>
	</a>
	<ul class="pagination-list">
		<li>
			<a class="pagination-link" aria-label="Go to page 1">1</a>
		</li>
		<li>
			<span class="pagination-ellipsis">&hellip;</span>
		</li>
		<li>
			<a class="pagination-link" aria-label="Go to page 45">45</a>
		</li>
		<li>
			<a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
		</li>
		<li>
			<a class="pagination-link" aria-label="Go to page 47">47</a>
		</li>
		<li>
			<span class="pagination-ellipsis">&hellip;</span>
		</li>
		<li>
			<a class="pagination-link" aria-label="Go to page 86">86</a>
		</li>
	</ul>
</nav>
```

### Disabling links and specifying page numbers available

You can disable some links if they are not active, or change the amount of page numbers available.

```html
<nav class="pagination" role="navigation" aria-label="pagination">
	<a href class="pagination-previous" aria-label="previous" title="This is the first page" disabled>
		<span class="icon" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448">
				<path
					class="fill-current-color"
					d="M448 224H62.625l148.688 148.688-22.625 22.625L1.375 208 188.688 20.688l22.625 22.625L62.625 192H448v32z"
				/>
			</svg>
		</span>
	</a>
	<a href class="pagination-next" aria-label="next">
		<span class="icon" aria-hidden="true">
			<span class="icon" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="-255 57 448 448">
					<path class="fill-current-color"
						d="M-253.625 281v-32H131.75L-16.938 100.313 5.687 77.688 193 265 5.687 452.313l-22.625-22.625L131.75 281h-385.375z"
					/>
      </svg>
		</span>
	</a>
	<ul class="pagination-list">
		<li>
			<a href class="pagination-link is-current" aria-label="Page 1" aria-current="page">1</a>
		</li>
		<li>
			<a href class="pagination-link" aria-label="Go to page 2">2</a>
		</li>
		<li>
			<a href class="pagination-link" aria-label="Go to page 3">3</a>
		</li>
	</ul>
</nav>
```

## Modifiers

### Current page

The current page can be specified using the `is-current` modifier.

### Positioning and ordering

By default on tablet, the list is located on the left, and the previous/next buttons on the right.
But you can change the positioning and order of these elements by using the `pagination-center` modifier.

#### Centered

```html
<nav class="pagination pagination-center" role="navigation" aria-label="pagination">
	<a href class="pagination-previous" aria-label="previous">
		<span class="icon" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448">
				<path
					class="fill-current-color"
					d="M448 224H62.625l148.688 148.688-22.625 22.625L1.375 208 188.688 20.688l22.625 22.625L62.625 192H448v32z"
				/>
			</svg>
		</span>
	</a>
	<a href class="pagination-next" aria-label="next">
		<span class="icon" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="-255 57 448 448">
				<path
					class="fill-current-color"
					d="M-253.625 281v-32H131.75L-16.938 100.313 5.687 77.688 193 265 5.687 452.313l-22.625-22.625L131.75 281h-385.375z"
				/>
			</svg>
		</span>
	</a>
	<ul class="pagination-list">
		<li><a href class="pagination-link" aria-label="Go to page 1">1</a></li>
		<li><span class="pagination-ellipsis">&hellip;</span></li>
		<li><a href class="pagination-link" aria-label="Go to page 45">45</a></li>
		<li>
			<a href class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
		</li>
		<li><a href class="pagination-link" aria-label="Go to page 47">47</a></li>
		<li><span class="pagination-ellipsis">&hellip;</span></li>
		<li><a href class="pagination-link" aria-label="Go to page 86">86</a></li>
	</ul>
</nav>
```
