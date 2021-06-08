---
title: Title
description: Description
template: standard
---

# Page title (H1)

Here is the general description goes.

Next thing is the list of some general classes, or css style specific details. For example:

The following spacing sizes are supported:

- `xs`
- `s`
- `m`
- `l`
- `xl`
- `xxl`
- `xxxl`
- `none`

Another option is the table with css prop variations:

| cssproperty | value                                                   | screensize |
| ----------- | ------------------------------------------------------- | ---------- |
| `margin`    | `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`, `none` | `tablet`   |
| `padding`   | `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`, `none` | `tablet`   |

| Size   | Value         | Margin example | Padding example |
| ------ | ------------- | -------------- | --------------- |
| `xxs`  | .5rem / 8px   | .margin-xxs    | .padding-xxs    |
| `xs`   | 1rem / 16px   | .margin-xs     | .padding-xs     |
| `s`    | 1.5rem / 24px | .margin-s      | .padding-s      |
| `m`    | 2rem / 32px   | .margin-m      | .padding-m      |
| `l`    | 3rem / 48px   | .margin-l      | .padding-l      |
| `xl`   | 4rem / 64px   | .margin-xl     | .padding-xl     |
| `xxl`  | 6rem / 96px   | .margin-xxl    | .padding-xxl    |
| `xxxl` | 8rem / 128px  | .margin-xxxl   | .padding-xxxl   |
| `None` | 0             | .margin-none   | .padding-none   |

## Usage (H2)

Next block is a very general usage example.

```html
<div class="border padding-s">
	<p>Text block</p>
</div>
```

if there are tokens variations available such as font weight in typography, or radius rules in border, the next section should be about them.

### Radius (H3)

Currently two classes are available to set border radius:

- `.border-radius`
- `.border-radius-l`

_Example_

```html
<div class="border border-radius padding-s">
	<p>Default radius</p>
</div>
```

## Available classes

List of all available classes:

```atomics-filter
.margin-xs
.margin-s
.margin-m
.margin-l
.margin-xl
.margin-xxl
.margin-xxxl
.margin-none
.margin-inline-xs
.margin-inline-s
.margin-inline-m
.margin-inline-l
.margin-inline-xl
.margin-inline-xxl
.margin-inline-xxxl
.margin-inline-none
```
