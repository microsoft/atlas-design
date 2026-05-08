---
title: Tree
description: The tree component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - tree
---

# Tree

A hierarchical list component implementing the [WAI-ARIA TreeView pattern](https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-2/treeview-2a.html). Used for navigable structures like tables of contents, file browsers, or nested menus.

## Basic collapsible tree

A tree with expandable branch nodes and selectable leaf nodes. Branch nodes use `aria-expanded` to communicate state.

```html
<ul class="tree" role="tree" aria-label="Table of contents">
	<li class="tree-item is-expanded" role="treeitem" aria-expanded="true" tabindex="0" aria-level="1" aria-setsize="3" aria-posinset="1">
		<span class="tree-expander">
			Getting started
		</span>
		<ul class="tree-group" role="group">
			<li role="none">
				<a class="tree-item tree-leaf is-selected" role="treeitem" tabindex="-1" aria-current="page" aria-level="2" aria-setsize="2" aria-posinset="1" href="#">Overview</a>
			</li>
			<li role="none">
				<a class="tree-item tree-leaf" role="treeitem" tabindex="-1" aria-level="2" aria-setsize="2" aria-posinset="2" href="#">Installation</a>
			</li>
		</ul>
	</li>
	<li class="tree-item" role="treeitem" aria-expanded="false" tabindex="-1" aria-level="1" aria-setsize="3" aria-posinset="2">
		<span class="tree-expander">
			Configuration
		</span>
	</li>
	<li role="none">
		<a class="tree-item tree-leaf" role="treeitem" tabindex="-1" aria-level="1" aria-setsize="3" aria-posinset="3" href="#">FAQ</a>
	</li>
</ul>
```

## Static tree

A non-collapsible tree where all items are visible. Add the `tree-static` class to the root element.

```html
<ul class="tree tree-static" role="tree" aria-label="Page sections">
	<li role="none">
		<a class="tree-item tree-leaf is-selected" role="treeitem" tabindex="0" aria-current="page" aria-level="1" aria-setsize="4" aria-posinset="1" href="#">Introduction</a>
	</li>
	<li role="none">
		<a class="tree-item tree-leaf" role="treeitem" tabindex="-1" aria-level="1" aria-setsize="4" aria-posinset="2" href="#">Prerequisites</a>
	</li>
	<li role="none">
		<a class="tree-item tree-leaf" role="treeitem" tabindex="-1" aria-level="1" aria-setsize="4" aria-posinset="3" href="#">Steps</a>
	</li>
	<li role="none">
		<a class="tree-item tree-leaf" role="treeitem" tabindex="-1" aria-level="1" aria-setsize="4" aria-posinset="4" href="#">Next steps</a>
	</li>
</ul>
```

## DOM contract

| Class | Element | Purpose |
|---|---|---|
| `.tree` | `ul` | Root tree container |
| `.tree-static` | modifier | Non-collapsible tree variant (no expanders) |
| `.tree-group` | `ul` | Nested group of child items |
| `.tree-item` | `li` or `a` | A tree node (branch or leaf) |
| `.tree-leaf` | `a` | Leaf node (no children) |
| `.tree-expander` | `span` | Clickable expander for branch nodes (chevron drawn via CSS `::before`) |
| `.is-expanded` | modifier | Applied to expanded branch nodes |
| `.is-selected` | modifier | Applied to the currently active item |

## Accessibility

- Branch nodes (`li.tree-item`) carry `role="treeitem"` and `aria-expanded`.
- Leaf nodes (`a.tree-item.tree-leaf`) carry `role="treeitem"`. Their parent `li` uses `role="none"`.
- Focus is managed via `tabindex`: only one item has `tabindex="0"` at a time (roving tabindex).
- Keyboard navigation (arrow keys, Home, End) should be handled by the consuming application's JavaScript.
