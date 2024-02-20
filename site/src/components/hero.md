---
title: Hero
description: Hero component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - hero
---

# Hero

Hero is a layout component that provides a roomy place to display beautiful art work and emphasize important text and actions. It will often appear at the top of the page.

**This page is best viewed with the content section full screened because heroes are intended to be full width elements. Go full screen by clicking the button in the top right corner.**

## Usage

At its most basic, a hero is comprised of two elements, a container with the `.hero` class, and inner element called `.hero-content`. Note that the use of `.border` below is purely for the purposes of showing outline of the hero element within this site's example component.

```html-no-indent
<section class="hero border">
	<div class="hero-content">
        <p class="letter-spacing-wide text-transform-uppercase font-size-sm">LOREM IPSUM DOLOR SIT AMET</p>
        <h1 class="font-size-h1 font-weight-semibold">Hero</h1>
        <p class="font-size-lg font-weight-semibold margin-block-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <div class="buttons margin-top-md">
            <button class="button border button-clear">Click me</button>
        </div>
	</div>
</section>
```

## Permutations of the hero component

While at its core, the hero is a spacing element, it also has some extra functionality built into it. Combinations of these modifiers and subcomponents can be used together. You can visit the [hero patterns page](../patterns/hero.md) to get inspiration or view common combinations.

## Hero background colors and patterns

Atlas has no classes specifically for hero background colors. Instead, we provide a host of color related atomic classes to be used on any element; these can also be used to modify hero background colors and text.

```html-no-indent
<section class="hero background-color-primary color-primary-invert">
	<div class="hero-content">
		<h2 class="font-size-h2">A hero with a primary background color and inverted text</h2>
        <p class="margin-top-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	</div>
</section>
```

That is not quite where the story ends. You can also use certain classes on the `.hero` element to specify a background pattern.

### Hero sizes

Heroes have default spacing that relies on the `.hero-content` element, so be sure to include it. However, there are also a few modifiers that can be used to change the _minimum_ height of the hero. If you pack a hero with text, it will grow in height. Each size is denoted by a t-shirt size. For more on how Atlas creates its names [check out the explainer for component sizes](../components/overview.md).

```html-no-indent
<section class="hero hero-xs background-color-primary color-primary-invert">
	<div class="hero-content">
		<h2 class="font-size-h2">Extra small</h2>
        <p class="margin-top-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	</div>
</section>
```

```html-no-indent
<section class="hero hero-sm background-color-success color-success-invert">
	<div class="hero-content">
		<h2 class="font-size-h2">Small</h2>
        <p class="margin-top-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	</div>
</section>
```

```html-no-indent
<section class="hero background-color-danger color-danger-invert">
	<div class="hero-content">
		<h2 class="font-size-h2">Default</h2>
        <p class="margin-top-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	</div>
</section>
```

```html-no-indent
<section class="hero hero-lg background-color-tertiary color-tertiary-invert">
	<div class="hero-content">
		<h2 class="font-size-h2">Large</h2>
        <p class="margin-top-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	</div>
</section>
```

### Hero images

Heroes have two primary ways of displaying media. The first is with the `.hero-image` class, which should be placed adjacent to the `.hero` class. This subclass can be used in conjunction with inline css variable declarations to display images suitable for different themes. Image sources should be referenced in a style attribute as shown below. This allows for convenient image swapping between themes. These images display to the side of the hero's content. On narrow screens, no image will display.

Hero images are hidden in forced colors mode.

**Images are currently not intended to scale or shrink. They are not shown on smaller or zoomed screens. For this reason, it's required that these images are presentational only. They should not contain words, subjects that might look naff if cut off, or anything essential to understanding the material of the page.**

On RTL, the position of the hero image will remain on the right. The text within the hero content will be right aligned.

```html-no-indent
<section
    class="hero hero-image border"
	style="
        --hero-background-image-light: url('https://via.placeholder.com/1000x400');
		--hero-background-image-dark: url('https://via.placeholder.com/1000x400');
    ">
	<div class="hero-content">
		<h2 class="font-size-h2">Hero</h2>
        <p class="margin-top-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	</div>
</section>
```

## Heroes with full media backgrounds

Hero backgrounds with full-bleed media can be somewhat problematic. Always be sure that you can ensure accessible text colors between a background image and a piece of text. You may also need to apply a static theme class to your hero to ensure the text does not change with the theme. Images and videos included in this way will scale always cover the entire container, so responsive testing is particularly important when validating media choices.

You can include a video or image by using the `.hero-background` sub-component, and either a `video` or `img` tag. This media will scale (using `object-fit: cover`) to ensure the whole hero background is always covered by the media.

```html-no-indent
<section
    class="hero hero-lg theme-light ">
	<div class="hero-content color-primary-invert">
		<h2 class="font-size-h2">Hero</h2>
        <p class="margin-top-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	</div>
    <div class="hero-background">
        <img alt="placeholder image" src="https://via.placeholder.com/1920x1080/0000FF/808080">
    </div>
</section>
```
