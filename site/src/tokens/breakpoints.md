---
title: Breakpoints
description: Atlas CSS breakpoints tokens, media query mixins, and container query mixins
template: token
token: breakpoints
---

# Breakpoints and media queries

Atlas provides viewport-based media query mixins for responsive layouts. These follow a mobile-first approach — styles apply from the specified breakpoint and up.

```scss
@use '@microsoft/atlas-css/src/mixins' as mixins;

.my-element {
	display: block;

	@include mixins.tablet {
		display: flex;
	}
}
```

Available media query mixins:

```scss
@mixin tablet {
	@media screen and (min-width: $breakpoint-tablet), print {
		@content;
	}
}

@mixin desktop {
	@media screen and (min-width: $breakpoint-desktop) {
		@content;
	}
}

@mixin widescreen {
	@media screen and (min-width: $breakpoint-widescreen) {
		@content;
	}
}

// Orientation

@mixin orientation-portrait {
	@media screen and (aspect-ratio <= 1/1),
		screen and (resolution >= 120dpi) and (aspect-ratio <= 1/1) {
		@content;
	}
}

@mixin orientation-landscape {
	@media screen and (aspect-ratio >= 1/1),
		screen and (resolution >= 120dpi) and (aspect-ratio >= 1/1) {
		@content;
	}
}

@mixin orientation-square {
	@media screen and (aspect-ratio <= 1/1),
		screen and (resolution >= 120dpi) and (aspect-ratio <= 1/1) {
		@content;
	}
}
```

## Container queries

Container queries let a component respond to the size of its _parent container_ rather than the viewport. This is useful when the same component can appear in different layout contexts (sidebar, main content, full-width) and should adapt accordingly.

Atlas provides two types of container query mixins: one for marking a parent element as a container, and size-based query mixins for applying styles at specific container widths.

### Marking a container

Use the `container` mixin on the parent element that child elements should respond to.

```scss
@use '@microsoft/atlas-css/src/mixins' as mixins;

.card-grid {
	@include mixins.container;
}
```

You can also pass an optional name to target a specific container:

```scss
.card-grid {
	@include mixins.container('card-grid');
}
```

### Container query breakpoints

Container query breakpoints use pixel values in their names rather than t-shirt sizes. This makes the exact threshold immediately clear and avoids confusion with the viewport breakpoints, which serve a different purpose.

| Token | Value | Mixin |
| --- | --- | --- |
| `$container-query-320` | 320px | `container-320` |
| `$container-query-480` | 480px | `container-480` |
| `$container-query-640` | 640px | `container-640` |
| `$container-query-800` | 800px | `container-800` |

### Querying a container

Use the container query mixins inside child elements. Like viewport media queries, these are mobile-first — styles apply when the container is _at least_ the specified width.

```scss
@use '@microsoft/atlas-css/src/mixins' as mixins;

.card {
	// Stack by default
	display: block;

	// Side-by-side when the container is >= 480px
	@include mixins.container-480 {
		display: flex;
	}
}
```

To target a named container, pass the name as an argument:

```scss
.card {
	@include mixins.container-480('card-grid') {
		display: flex;
	}
}
```

### When to use container queries vs media queries

| Scenario | Use |
| --- | --- |
| Page-level layout changes (e.g., sidebar collapses) | Media queries (`tablet`, `desktop`) |
| Component adapts to the space it's placed in | Container queries (`container-480`, etc.) |
| Component appears in only one layout context | Either works — media queries are simpler |
