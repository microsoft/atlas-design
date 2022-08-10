---
title: Patterns
description: Background pattern component in the Atlas Design System
template: standard
---

# Background Patterns

Background patterns are single classes that can be added to other components to create a patterned background effect.

| cssproperty        | value                      | screensize |
| ------------------ | -------------------------- | ---------- |
| `background-image` | `pattern-plus`, `confetti` | n/a        |

## Usage

One common use case for these is on heroes.

```html-no-indent
<section class="hero background-color-primary color-primary-invert background-image-pattern-plus">
	<div class="hero-content">
		<h2 class="font-size-h2">Hero with plus pattern background</h2>
	</div>
</section>
```

```html-no-indent
<section class="hero background-color-primary color-primary-invert background-image-pattern-confetti">
	<div class="hero-content">
		<h2 class="font-size-h2">Hero with confetti pattern background</h2>
	</div>
</section>
```

## Pitfalls

Note that with a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) enabled, you will need to specify `img-src data:` in order for these Atomics to be effectual.
