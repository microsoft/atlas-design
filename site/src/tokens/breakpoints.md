---
title: Breakpoints
description: Atlas CSS breakpoints tokens and media queries tokens
template: token
token: breakpoints
---

# Breakpoints and media queries

Available media queries:

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
	@media screen and (max-aspect-ratio: 1/1),
		screen and (min-resolution: 120dpi) and (max-aspect-ratio: 1/1) {
		@content;
	}
}

@mixin orientation-landscape {
	@media screen and (min-aspect-ratio: 1/1),
		screen and (min-resolution: 120dpi) and (min-aspect-ratio: 1/1) {
		@content;
	}
}

@mixin orientation-square {
	@media screen and (aspect-ratio: 1/1),
		screen and (min-resolution: 120dpi) and (aspect-ratio: 1/1) {
		@content;
	}
}
```
