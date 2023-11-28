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
  <button class="button" data-set-layout="layout-single">Single</button>
</div>
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

### Layout Single

The `layout-single` class provides a simple stacked layout. It is equivalent to a series of marginless and paddingless stacked block level elements. All elements in a single layout should set their own margin somewhere within their nested containers. Most likely, you'll want to apply `.layout-margin` or some other container-like class to elements within the single layout. This is also the default layout that will render if no other class is provide.

How do I apply it? `layout-holy-grail` to the `layout` element.

Required elements: all, except `layout-body-hero`.

Allowed elements: all.

```Text
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
Required elements: all, except `layout-body-hero`.
Allowed elements: all.

The following block is arranged from narrow widths on the left to wider widths on the right.

```Text
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

## Accessibility and ARIA landmarks

Due to the [recommendation that all content be rendering into ARIA landmark regions](https://dequeuniversity.com/rules/axe/4.7/region), the hero element should be a `<section>` element with an unique aria-label (or aria-labelled by).

## Advanced topic - switching layouts on the fly

Because layouts generally contain the same elements and because the current layout is determined by a singular class on the `.layout` element, changing layout is as easy as swapping out a class.

```JavaScript
document.documentElement.classList.remove('layout-single');
document.documentElement.classList.remove('layout-holy-grail');
```

You'll seldom have occasion to do this in the middle of a user's visit, but it can be useful for things like opening a code editor in a wider layout or adopting a focused reading mode.
