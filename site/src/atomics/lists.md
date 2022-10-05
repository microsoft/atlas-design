---
title: Lists
description: List atomics in the Atlas Design system
template: standard
classType: Atomics
classPrefixes:
  - list-style
---

# Lists

This page details any Atomics css classes that target list styles.

| cssproperty  | value  | screensize |
| ------------ | ------ | ---------- |
| `list-style` | `none` | n/a        |

## Usage

If a list is displaying list styles when you don't want it to, reset it with the `.list-style-none` class.

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

**Accessibility note:** In WebKit, setting a list's style to none like this will cause that list to no longer be exposed as a list to assistive technologies such as screen readers. [This is intended behavior](https://twitter.com/cookiecrook/status/1337226933822603270), meant to prevent extra clutter in screen reader announcements, and should not be overridden in most cases. However, if you're certain that your list needs to be announced as a list, you can restore list announcements by also applying `role="list"` to the list element.
