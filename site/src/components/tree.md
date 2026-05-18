---
title: Tree
description: The tree component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - tree
---

# Tree

A hierarchical list component for navigable structures like tables of contents, file browsers, or nested menus. Intended to style the [WAI-ARIA TreeView pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/).

## Basic collapsible tree

A tree with expandable branch nodes and selectable leaf nodes. Branch nodes use `aria-expanded` to communicate state.

```html
<ul class="tree" role="tree" aria-label="Table of contents">
	<li class="tree-item" role="treeitem" aria-expanded="true" aria-level="1" aria-setsize="3" aria-posinset="1">
		<span class="tree-expander">
			Getting started
		</span>
		<ul class="tree-group" role="group">
			<li role="none">
				<a class="tree-item tree-leaf is-selected" role="treeitem" aria-current="page" aria-level="2" aria-setsize="2" aria-posinset="1" href="#">Overview</a>
			</li>
			<li role="none">
				<a class="tree-item tree-leaf" role="treeitem" aria-level="2" aria-setsize="2" aria-posinset="2" href="#">Installation</a>
			</li>
		</ul>
	</li>
	<li class="tree-item" role="treeitem" aria-expanded="false" aria-level="1" aria-setsize="3" aria-posinset="2">
		<span class="tree-expander">
			Configuration
		</span>
	</li>
	<li role="none">
		<a class="tree-item tree-leaf" role="treeitem" aria-level="1" aria-setsize="3" aria-posinset="3" href="#">FAQ</a>
	</li>
</ul>
```

## Static tree

A tree without expanders — all items are leaf nodes. Simply omit `.tree-expander` elements.

```html
<ul class="tree" role="tree" aria-label="Page sections">
	<li role="none">
		<a class="tree-item tree-leaf is-selected" role="treeitem" aria-current="page" aria-level="1" aria-setsize="4" aria-posinset="1" href="#">Introduction</a>
	</li>
	<li role="none">
		<a class="tree-item tree-leaf" role="treeitem" aria-level="1" aria-setsize="4" aria-posinset="2" href="#">Prerequisites</a>
	</li>
	<li role="none">
		<a class="tree-item tree-leaf" role="treeitem" aria-level="1" aria-setsize="4" aria-posinset="3" href="#">Steps</a>
	</li>
	<li role="none">
		<a class="tree-item tree-leaf" role="treeitem" aria-level="1" aria-setsize="4" aria-posinset="4" href="#">Next steps</a>
	</li>
</ul>
```

## Accessibility

The tree component relies on ARIA attributes — `aria-expanded`, `aria-level`, `aria-setsize`, and `aria-posinset` — to convey structure and state to assistive technologies. Keyboard navigation (arrow keys, Home, End) and focus management should be handled by the consuming application's JavaScript.
