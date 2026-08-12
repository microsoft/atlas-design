---
title: Border Atomics
description: Border related atomic css classes for the Atlas Design System
template: standard
classType: Atomics
classPrefixes:
  - border
  - border-radius
---

# Border Atomics

Applying the `border` atomic to the element will add a 1px border to it.

`border-none` removes border from the element.

Various atomics available to modify different options.

| modifier                | value                                                                      | screensize | visibility |
| ----------------------- | -------------------------------------------------------------------------- | ---------- | ---------- |
| [direction](#direction) | `top`, `right`, `bottom`, `left`                                           | `tablet`   | `none`     |
| [size](#size)           | `md`, `lg`, `xl`                                                           | `tablet`   | N\A        |
| [radius](#radius)       | `sm`, `lg`, `xl`, `rounded`, `none`, `{corner}-none`                       | N\A        | N\A        |
| [colors](#colors)       | `primary`, `danger`, `warning`, `success`, `info`, `accent`, `transparent` | N\A        | N\A        |

## Usage

Here is an example of `border` class usage:

```html
<div class="border padding-sm">
	<p>Text block</p>
</div>
```

### Direction

To apply border to the specific side of the element the directional atomics are available:

| direction                        | screensize | visibility |
| -------------------------------- | ---------- | ---------- |
| `top`, `right`, `bottom`, `left` | `tablet`   | `none`     |

Should be applied in this order:

```css
border-{direction}-{screensize}-{visibility}
```

```html
<div class="border-top padding-sm">
	<p>Border top</p>
</div>

<div class="border-right padding-sm margin-top-sm">
	<p>Border right</p>
</div>

<div class="border-left padding-sm margin-top-sm">
	<p>Border left</p>
</div>

<div class="border-bottom padding-sm margin-top-sm">
	<p>Border bottom</p>
</div>
```

### Size

Border thickness can be adjusted with following atomics:

| name        | size       | screensize |
| ----------- | ---------- | ---------- |
| `border-md` | `0.125rem` | `tablet`   |
| `border-lg` | `0.25rem`  | `tablet`   |
| `border-xl` | `0.5rem`   | `tablet`   |

```html
<div class="border-md padding-sm">
	<p>Medium border</p>
</div>
<div class="border-md-tablet padding-sm margin-top-xs">
	<p>Medium border on tablet+</p>
</div>
<div class="border-lg padding-sm margin-top-xs">
	<p>Large border</p>
</div>
<div class="border-lg-tablet padding-sm margin-top-xs">
	<p>Large border on tablet+</p>
</div>
<div class="border-xl padding-sm margin-top-xs">
	<p>Extra large border</p>
</div>
<div class="border-xl-tablet padding-sm margin-top-xs">
	<p>Extra large border on tablet+</p>
</div>
```

### Radius

To add/modify border radius the following atomics are available:

| name                    | size       | screensize | visibility |
| ----------------------- | ---------- | ---------- | ---------- |
| `border-radius-sm`      | `0.125rem` | N\A        | N\A        |
| `border-radius`         | `0.25rem`  | N\A        | `none`     |
| `border-radius-lg`      | `0.375rem` | N\A        | N\A        |
| `border-radius-xl`      | `0.5rem`   | N\A        | N\A        |
| `border-radius-rounded` | `290486px` | N\A        | N\A        |

```html
<div class="border border-radius-sm padding-sm">
	<p>Small radius</p>
</div>
<div class="border border-radius padding-sm margin-top-xs">
	<p>Default radius</p>
</div>
<div class="border border-radius-lg padding-sm margin-top-xs">
	<p>Large radius</p>
</div>
<div class="border border-radius-xl padding-sm margin-top-xs">
	<p>Extra large radius</p>
</div>
<div class="border border-radius-rounded padding-sm margin-top-xs">
	<p>Rounded</p>
</div>
```

#### Radius resets

Border radius can be removed from the element by using the `border-radius-none` atomic. If radius needs to be reset on specific corner only, following atomics available as well:

| name                              | screensize |
| --------------------------------- | ---------- |
| `border-top-left-radius-none`     | N\A        |
| `border-top-right-radius-none`    | N\A        |
| `border-bottom-left-radius-none`  | N\A        |
| `border-bottom-right-radius-none` | N\A        |

```html
<div
	class="border border-radius-xl border-bottom-left-radius-none border-bottom-right-radius-none padding-sm"
>
	<p>Border radius reset on bottom</p>
</div>
```

### Colors

The color of a border can be modified using the following atomics.

| modifiers | color name                                                                 | screensize |
| --------- | -------------------------------------------------------------------------- | ---------- |
| colors    | `primary`, `danger`, `warning`, `success`, `info`, `accent`, `transparent` | N\A        |

```html
<div class="border-color-success border-left-lg border-radius padding-block-sm">
	<p class="margin-inline-md">Success Color</p>
</div>
```
