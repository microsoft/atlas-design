---
title: Truncated
description: The truncated component in the Atlas Design System
template: standard
---

# Truncated

At times, we may want to constrain text to a specific number of lines. This is particularly useful in card descriptions, where the text may be longer than the UI can fit comfortably. In situations like this, we can use the `.truncated-<n>` class - where `<n>` is a number between 1 and 4 and equal to the number of desired lines.

In all examples below the text is the same length, but the `.truncated-<n>` class, which uses `line-clamp` under the hood, will cut text off at the desire line and place an ellipsis to indicate overflow is occuring.

## Usage

Use this component on the element that requires truncation - not on a parent element. It is best used on large bodies of plain text.

```html
<p class="truncated-1 color-text-subtle">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
	labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
	esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
	in culpa qui officia deserunt mollit anim id est laborum.
</p>
```

```html
<p class="truncated-2 color-text-subtle">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
	labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
	esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
	in culpa qui officia deserunt mollit anim id est laborum.
</p>
```

```html
<p class="truncated-3 color-text-subtle">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
	labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
	esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
	in culpa qui officia deserunt mollit anim id est laborum.
</p>
```

```html
<p class="truncated-4 color-text-subtle">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
	labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
	esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
	in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non
	proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat
	cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
```

## Additional information

If the text does not exceed `<n>` lines, then no ellipsis will be shown, but the element will still have `overflow-hidden`. For the reason, be wary of placing popovers or other relative/absolutel positioned elements inside truncated text.
