---
title: Display Atomics
description: Display related atomic css classes for the Atlas Design System
template: standard
classType: Atomics
classPrefixes:
  - display
  - content-visibility
---

# Display Atomics

Display atomics are used to set the display behavior of an element.

| cssproperty | value                                                                    | screensize                        |
| ----------- | ------------------------------------------------------------------------ | --------------------------------- |
| `display`   | `block`, `flex`, `inline`, `inline-block`, `inline-flex`, `grid`, `none` | `tablet`, `desktop`, `widescreen` |

## Usage

Here is an example of display atomics being used.

```html
<div class="display-block border">
	<div>Foo</div>
	<div>Foo</div>
</div>
```

### Responsive rules

Here are a few examples of display atomics being used for different screensizes.

```html
<div class="display-flex-tablet border">
	<div>Bar</div>
	<div>Bar</div>
</div>
```

```html
<div class="border">
	<div class="display-inline-desktop">Baz</div>
	<div class="display-inline-desktop">Baz</div>
</div>
```

```html
<div class="display-inline-flex-widescreen border">
	<div>Foo</div>
	<div>Foo</div>
</div>
```

## State-based display helpers

Display classes are also available scoped to [layout collapse states](~/src/components/layout.md#state-based-display-helpers). These classes (e.g., `.display-none-layout-menu-collapsed`) only take effect when the corresponding state is active on the `.layout` element.

## Content visibility

Use `.content-visibility-auto` to let the browser skip rendering off-screen content until it is
needed. Unlike `display: none`, the content remains available to accessibility tools and browser
features such as find-in-page. This class has no responsive variants.

```html
<section class="content-visibility-auto border padding-md">
	<h2 class="font-size-lg">Page section</h2>
	<p>The browser can defer rendering this section while it is off-screen.</p>
</section>
```

## Available classes

List of all available classes:

```atomics-filter
content-visibility-auto
display-block
display-flex
display-inline
display-inline-block
display-inline-flex
display-grid
display-none
display-block-tablet
display-flex-tablet
display-inline-tablet
display-inline-block-tablet
display-inline-flex-tablet
display-grid-tablet
display-none-tablet
display-block-desktop
display-flex-desktop
display-inline-desktop
display-inline-block-desktop
display-inline-flex-desktop
display-grid-desktop
display-none-desktop
display-block-widescreen
display-flex-widescreen
display-inline-widescreen
display-inline-block-widescreen
display-inline-flex-widescreen
display-grid-widescreen
display-none-widescreen
```
