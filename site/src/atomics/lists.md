---
title: Lists
description: List atomics in the Atlas Design system
template: standard
---

# Lists

This page details any Atomics css classes that target list styles.

| cssproperty  | value  | screensize |
| ------------ | ------ | ---------- |
| `list-style` | `none` | n/a        |

## Usage

If a list style has not been reset it with the `.list-style-none` class.

```html
<p class="font-weight-bold font-size-lg margin-bottom-sm">The following list is not reset.</p>
<ol>
	<li>First item</li>
	<li>Second item</li>
	<li>Third item</li>
</ol>

<p class="font-weight-bold font-size-lg margin-block-sm">
	The following list is reset with <code>.list-style-none</code>
</p>
<ol class="list-style-none">
	<li>First item</li>
	<li>Second item</li>
	<li>Third item</li>
</ol>
```
