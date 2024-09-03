---
title: Layout
description: The layout component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - layout
hero: true
---

# Layout

The layout component provides a flexible and efficient way to structure the major containers of web pages.

## Try layouts here

This page is utilizing the holy grail layout, but you can use the buttons below to toggle layouts and test them out by resizing the screen. Try the "Toggle container labels" button below to see the css classes on each of the containers inside `.layout`.

<div class="buttons buttons-addons margin-top-sm display-inline-flex">
  <button class="button" data-set-layout="layout-holy-grail" aria-pressed="true">Holy grail</button>
  <button class="button" data-set-layout="layout-twin">Twin</button>
  <button class="button" data-set-layout="layout-single">Single</button>
  <button class="button" data-set-layout="layout-sidecar-left">Sidecar left</button>
  <button class="button" data-set-layout="layout-sidecar-right">Sidecar right</button>
</div>
<button class="button margin-top-sm" data-toggle-layout-height-constraint aria-pressed="false">Constrain height</button>
<button class="button margin-top-sm" data-toggle-debug aria-pressed="false">Toggle container labels</button>

## Important concepts

Thankfully, no one needs to be expert to use the `.layout` element. But it does help to understand a few important concepts before beginning.

### Markup structure

The `.layout` class is designed to be placed on the `<html>` element itself, while the `layout-body` element is designed to be placed on the `<body>` element. All other elements are children of `layout-body`. Specific layouts are applied by adding a class with the format `layout-{nameoflayout}` to the `html.layout` element.

Nearly all layouts have the same eight elements, and the `layout-body-hero` element is always optional. While the `layout`, `layout-body`, `layout-body-header`, `layout-body-footer`, and `layout-body-main` elements are always required. The behavior of `layout-body-menu` and `layout-body-aside` depend on the layout.

The basic boilerplate for a layout is as follows:

```html-no-example
<html class="layout layout-{nameoflayout}">
	<body class="layout-body">
		<header style="layout-body-header">Header</header>
		<section aria-label="hero" class="layout-body-hero">Hero</section>
		<nav class="layout-body-menu">Menu</nav>
		<main class="layout-body-main">Main</main>
		<aside class="layout-body-aside">Aside</aside>
		<footer class="layout-body-footer">Footer</footer>
	</body>
</html>
```

### Apply your own spacing

The `$layout-gap` token is used to generate two separate classes that can be used to apply spacing to containers _within_ each of the major layout areas. Spacing should _not_ be applied to the `layout-body-*` containers themselves, but rather to elements within them - most often a single container that is a direct child of the `layout-body-*` element.

| Class name        | Use case                             | Examples of use case                                                                  |
| ----------------- | ------------------------------------ | ------------------------------------------------------------------------------------- |
| `.layout-padding` | Layout areas that are not full width | The menu and aside areas. The main area when not in a single layout                   |
| `.layout-margin`  | Full width layout areas              | The header, footer, and hero. The main area when it is full width in a single layout. |

Why not use gap? You certainly can apply any [gap atomics](../atomics/gap.md) to the `layout-body` to change spacing as you see fit. However, to provide adequate space to display focus rectangles and to ensure enough space to render dynamic inline elements (like heading anchors), spacing applied to an inner container is still the best choice.

### Responsiveness

The layout components behavior is inextricably bound to Atlas's breakpoints. On narrow widths on all layouts, elements are stacked on top of one another. If you don't want an element to show on a particular screensize, you should either render nothing into it or hide the inner element.

## Available layouts

There are two available layouts.

- [`layout-single`](#layout-single)
- [`layout-holy-grail`](#holy-grail-layout)
- [`layout-sidecar-left`](#sidecar-left-layout)
- [`layout-sidecar-right`](#sidecar-right-layout)

### Layout Single

The `layout-single` class provides a simple stacked layout. It is equivalent to a series of marginless and paddingless stacked block level elements. All elements in a single layout should set their own margin somewhere within their nested containers. Most likely, you'll want to apply `.layout-margin` or some other container-like class to elements within the single layout. This is also the default layout that will render if no other class is provide.

How do I apply it? `layout-single` to the `layout` element.

Required elements: all except `layout-body-hero`.

Allowed elements: all.

```Text
   Narrow
  ┌────────────┐
  │ Header     │
  ├────────────┤
  │ Hero       │
  ├────────────┤
  │ Menu       │
  ├────────────┤
  │ Main       │
  ├────────────┤
  │ Aside      │
  ├────────────┤
  │ Footer     │
  └────────────┘
```

The specification for this layout is as follows.

| Screensize          | Behavior                  |
| ------------------- | ------------------------- |
| Narrow - Widescreen | All elements are stacked. |

### Holy Grail layout

Named after a layout that [historically was difficult to implement](<https://en.wikipedia.org/wiki/Holy_grail_(web_design)>) the holy grail is stacked on narrow widths and progressively shows up to three columns as the screen widens.

How do I apply it? `layout-holy-grail` to the `layout` element.

Required elements: all except `layout-body-hero`.

Allowed elements: all.

The following block is arranged from narrow widths on the left to wider widths on the right.

```Text
   Narrow         Tablet           Widescreen
  ┌────────────┐ ┌──────────────┐ ┌──────────────────────┐
  │ Header     │ │Header        │ │ Header               │
  ├────────────┤ ├──────────────┤ ├──────────────────────┤
  │ Hero       │ │Hero          │ │ Hero                 │
  ├────────────┤ ├─────┬────────┤ ├─────┬────────┬───────┤
  │ Menu       │ │Menu │ Main   │ │Menu │ Main   │ Aside │
  ├────────────┤ │     │        │ │     │        │       │
  │ Main       │ │     │        │ │     │        │       │
  ├────────────┤ │     ├────────┤ │     │        │       │
  │ Aside      │ │     │ Aside  │ │     │        │       │
  ├────────────┤ ├─────┴────────┤ ├─────┴────────┴───────┤
  │ Footer     │ │Footer        │ │ Footer               │
  └────────────┘ └──────────────┘ └──────────────────────┘
```

The specification for this layout is as follows.

| Screensize | Behavior                                                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Narrow     | All elements are stacked.                                                                                                     |
| Tablet     | Menu and main are side by side. Main is wider than menu. Aside has a collapsed height and is tucked under main.               |
| Desktop    | Menu, main, aside are side by side. Main is wider than menu.                                                                  |
| Widescreen | Same as desktop with scaling gutter that keeps combined width of menu, main, aside to the width of the widescreen breakpoint. |

### Sidecar left layout

A "sidecar" is a smaller companion container that sits beside the main content container on tablet screens and wider. In `layout-sidecar-left` the sidecar refers to the `layout-body-menu` element, which sits to the left of `layout-body-main`. Unlike other layouts, this layout does not allow the usage of the `layout-body-aside` containers.

How do I apply it? `layout-sidecar-left` to the `layout` element.

Required elements: all except `layout-body-hero` and `layout-body-aside` (see allowed elements).

Allowed elements: all except `layout-body-aside`.

The following block is arranged from narrow widths on the left to wider widths on the right.

```txt
   Narrow           Tablet           Widescreen
  ┌────────────┐   ┌──────────────┐ ┌──────────────────────┐
  │ Header     │   │Header        │ │ Header               │
  ├────────────┤   ├──────────────┤ ├──────────────────────┤
  │ Hero       │   │Hero          │ │ Hero                 │
  ├────────────┤   ├─────┬────────┤ ├──────┬───────────────┤
  │ Menu       │   │Menu │ Main   │ │ Menu │ Main          │
  ├────────────┤   │     │        │ │      │               │
  │ Main       │   │     │        │ │      │               │
  │            │   │     │        │ │      │               │
  │            │   │     │        │ │      │               │
  ├────────────┤   ├─────┴────────┤ ├──────┴───────────────┤
  │ Footer     │   │Footer        │ │ Footer               │
  └────────────┘   └──────────────┘ └──────────────────────┘
```

The specification for this layout is as follows.

| Screensize       | Behavior                                                                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Narrow           | All elements are stacked.                                                                                                        |
| Tablet - desktop | Menu and main are side by side. Main is wider than menu.                                                                         |
| Widescreen       | Same as tablet-desktop with scaling gutter that keeps combined width of menu and main to the width of the widescreen breakpoint. |

### Sidecar right layout

The "sidecar" remains as defined in the section above, but in `layout-sidecar-right` the sidecar refers to the `layout-body-aside` element, which sits to the right of `layout-body-main` on tablet screens and wider. Unlike other layouts, this layout does not allow the usage of the `layout-body-menu` containers.

How do I apply it? `layout-sidecar-right` to the `layout` element.

Required elements: all except `layout-body-hero` and `layout-body-menu` (see allowed elements).

Allowed elements: all except `layout-body-menu`.

The following block is arranged from narrow widths on the left to wider widths on the right.

```txt
  Narrow           Tablet                   Widescreen
 ┌──────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
 │Header        │ │ Header               │ │ Header               │
 ├──────────────┤ ├──────────────────────┤ ├──────────────────────┤
 │Hero          │ │ Hero                 │ │ Hero                 │
 ├──────────────┤ ├───────────────┬──────┤ ├───────────────┬──────┤
 │Main          │ │ Main          │ Aside│ │ Main          │ Aside│
 │              │ │               │      │ │               │      │
 │              │ │               │      │ │               │      │
 ├──────────────┤ │               │      │ │               │      │
 │Aside         │ │               │      │ │               │      │
 ├──────────────┤ ├───────────────┴──────┤ ├───────────────┴──────┤
 │Footer        │ │ Footer               │ │ Footer               │
 └──────────────┘ └──────────────────────┘ └──────────────────────┘
```

The specification for this layout is as follows.

| Screensize       | Behavior                                                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Narrow           | All elements are stacked.                                                                                                         |
| Tablet - desktop | Main and aside are side by side. Main is wider than aside.                                                                        |
| Widescreen       | Same as tablet-desktop with scaling gutter that keeps combined width of main and aside to the width of the widescreen breakpoint. |

## Accessibility Concerns

### ARIA landmarks

Due to the [recommendation that all content be rendering into ARIA landmark regions](https://dequeuniversity.com/rules/axe/4.7/region), the hero element should be a `<section>` element with an unique aria-label (or aria-labelled by).

### DOM order should reflect visual hierarchy

Grid areas, the CSS feature powering the layout component, have the potential to make DOM order different from visual hierarchy (i.e. which element seems like it is first on the page). This can cause confusion for keyboard users who use <kbd>tab</kbd> to navigate through web pages. The recommended order of elements within `layout-body` is as follows:

1. Header
1. Hero (if present)
1. Menu (if present)
1. Main
1. Aside (if present)
1. Footer

See WCAG on [Making the DOM order match the visual order](https://www.w3.org/TR/WCAG20-TECHS/C27.html) for more information on this topic.

## Advanced topic - switching layouts on the fly

Because layouts generally contain the same elements and because the current layout is determined by a singular class on the `.layout` element, changing layout is as easy as swapping out a class.

```JavaScript
document.documentElement.classList.remove('layout-single');
document.documentElement.classList.add('layout-holy-grail');
```

You'll seldom have occasion to do this in the middle of a user's visit, but it can be useful for things like opening a code editor in a wider layout or adopting a focused reading mode.
