---
title: Chevron
description: The chevron mixin in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - chevron
---

# Chevron

The chevron is a CSS-only directional indicator built with two visible borders on a rotated box. It's provided as a SCSS placeholder and mixin, designed to be extended into your own components via `@extend %chevron` or `@include mixins.chevron`.

All visual properties are driven by CSS custom properties, making the chevron easy to configure in different contexts — including RTL, expanded states, and theming.

## Usage

The chevron is most commonly applied to a pseudo-element (`::before` or `::after`). Use `@extend %chevron` or `@include mixins.chevron` to apply the base styles, then set `--chevron-rotate` to control the direction.

```scss
@use '@microsoft/atlas-css/src/mixins/index.scss' as mixins;

.my-trigger::after {
	@include mixins.chevron;
}
```

### Directions

Set `--chevron-rotate` to point the chevron in any direction. Or use the direction mixins for convenience.

```html
<span class="chevron-demo display-inline-flex align-items-center gap-xs padding-xs">Right (default)</span>
<span class="chevron-demo-down display-inline-flex align-items-center gap-xs padding-xs">Down</span>
<span class="chevron-demo-up display-inline-flex align-items-center gap-xs padding-xs">Up</span>
```

```scss
// Direction mixins set --chevron-rotate for you
.pointing-right::after {
	@include mixins.chevron-right; // --chevron-rotate: -135deg
}
.pointing-down::after {
	@include mixins.chevron-down; // --chevron-rotate: -45deg
}
.pointing-up::after {
	@include mixins.chevron-up; // --chevron-rotate: -225deg
}
```

## RTL support

The chevron automatically adapts to RTL. Because `border-inline-end: 0` mirrors the L-shape in RTL, different rotation values are needed for the same visual direction. Use the RTL rotation variables when writing `:dir(rtl)` overrides.

```html
<div dir="ltr" class="display-flex gap-sm align-items-center padding-sm border">
	<span class="chevron-demo display-inline-flex align-items-center gap-xs padding-xs">LTR: points right</span>
</div>
<div dir="rtl" class="display-flex gap-sm align-items-center padding-sm border margin-top-xxs">
	<span class="chevron-demo display-inline-flex align-items-center gap-xs padding-xs">RTL: auto-mirrors to left</span>
</div>
```

```scss
// In RTL context, use the -rtl rotation tokens
.my-trigger:dir(rtl)::after {
	--chevron-rotate: #{tokens.$rotate-right-rtl};
}
```

### Direction rotation reference

| Visual direction | LTR value                    | RTL value                        |
| ---------------- | ---------------------------- | -------------------------------- |
| Right            | `$rotate-right`              | `$rotate-right-rtl`              |
| Down             | `$rotate-down`               | `$rotate-down-rtl`               |
| Up               | `$rotate-up`                 | `$rotate-up-rtl`                 |
| Left             | `$rotate-left`               | `$rotate-left-rtl`               |

## Animated chevron

Use `%chevron-animated` (or `@include mixins.chevron-animated`) for smooth rotation transitions. The transition respects `prefers-reduced-motion`.

Click the buttons below to see the animation. The chevron rotates when `aria-expanded="true"` is set on the parent.

```html
<button
	class="chevron-demo-animated button display-inline-flex align-items-center gap-xs"
	aria-expanded="false"
	data-chevron-toggle
>
	Toggle expand
</button>
```

### RTL animated example

```html
<div dir="rtl">
	<button
		class="chevron-demo-animated button display-inline-flex align-items-center gap-xs"
		aria-expanded="false"
		data-chevron-toggle
	>
		RTL toggle expand
	</button>
</div>
```

### Setting up animated rotation

Map your component's state to `--chevron-rotate`. The chevron's built-in transition handles the animation.

```scss
@use '@microsoft/atlas-css/src/tokens/index.scss' as tokens;
@use '@microsoft/atlas-css/src/mixins/index.scss' as mixins;

// Base: animated chevron pointing right
.my-trigger::after {
	@include mixins.chevron-animated;
}

// Expanded: rotate to down
.my-trigger[aria-expanded='true']::after {
	--chevron-rotate: #{tokens.$rotate-down};
}

// RTL: expanded rotation must use RTL value
.my-trigger:dir(rtl)[aria-expanded='true']::after {
	--chevron-rotate: #{tokens.$rotate-down-rtl};
}
```

This pattern works with any state trigger — `[aria-expanded]`, `[open]`, `.is-active`, etc.

## CSS custom properties

All visual properties can be overridden via CSS custom properties on the chevron element or any ancestor.

| Property                         | Default                       | Description              |
| -------------------------------- | ----------------------------- | ------------------------ |
| `--chevron-size`                 | `max(0.4em, 7px)`            | Width and height         |
| `--chevron-color`                | `var(--theme-text-subtle)`    | Border color             |
| `--chevron-border-width`         | `1px`                         | Border thickness         |
| `--chevron-rotate`               | `-135deg` (right)             | Rotation angle           |
| `--chevron-vertical-align`       | `0.1em`                       | Vertical alignment       |
| `--chevron-transition-duration`  | `0.15s`                       | Animation duration       |

### Customization example

```html
<span
	class="chevron-demo display-inline-flex align-items-center gap-xs padding-xs"
	style="--chevron-size: 12px; --chevron-color: var(--theme-primary-base); --chevron-border-width: 2px"
>
	Custom chevron
</span>
```

## Sass API

### Placeholders

| Placeholder          | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| `%chevron`           | Base chevron shape with CSS variable defaults.                              |
| `%chevron-animated`  | Extends `%chevron` with a `rotate` transition and reduced-motion support.   |

### Mixins

| Mixin                  | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `chevron`              | Applies `%chevron`.                                |
| `chevron-animated`     | Applies `%chevron-animated`.                       |
| `chevron-right`        | Chevron pointing right (left in RTL).              |
| `chevron-right-rtl`    | Chevron pointing left — RTL override.              |
| `chevron-down`         | Chevron pointing down.                             |
| `chevron-down-rtl`     | Chevron pointing down — RTL override.              |
| `chevron-up`           | Chevron pointing up.                               |

### Sass variables

All Sass variables use `!default` and can be overridden before importing.

**Chevron variables** (in `mixins/chevron.scss`):

| Variable                         | Default                  |
| -------------------------------- | ------------------------ |
| `$chevron-size`                  | `max(0.4em, 7px)`       |
| `$chevron-color`                 | `tokens.$text-subtle`   |
| `$chevron-border-width`          | `1px`                   |

**Rotation tokens** (in `tokens/rotation.scss`, reusable across components):

| Variable                         | Default                  |
| -------------------------------- | ------------------------ |
| `$rotate-right`                  | `-135deg`               |
| `$rotate-down`                   | `-45deg`                |
| `$rotate-up`                     | `-225deg`               |
| `$rotate-left`                   | `-315deg`               |
| `$rotate-right-rtl`              | `-225deg`               |
| `$rotate-down-rtl`               | `-315deg`               |
| `$rotate-up-rtl`                 | `-135deg`               |
| `$rotate-left-rtl`               | `-45deg`                |
