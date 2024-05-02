---
title: Hero
description: Common hero patterns in the Atlas Design System
template: standard
---

# Hero Patterns

This page catalogues some of the common combinations that might be used with the hero component. For component documentation, [visit the hero component page](../components/hero.md).

**This page is best viewed with the content section full screened because heroes are intended to be full width elements. Go full screen by clicking the button in the top right corner.**

## Wayfinding hero

This hero can be used on hub type pages, and provides quick feed of where the user has landed.

```html-no-indent
<section class="hero hero-xs background-color-primary color-primary-invert background-image-pattern background-size-200" style="--background-image-pattern: url('https://learn.microsoft.com/en-us/media/background-patterns/pixie-sticks.svg')">
	<div class="hero-content">
		<p class="letter-spacing-wide text-transform-uppercase font-size-sm">LOREM IPSUM DOLOR SIT AMET</p>
		<h1 class="font-size-h1 font-weight-semibold">Wayfinding hero</h1>
		<p class="font-size-lg font-weight-semibold margin-block-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
		<div class="buttons margin-top-md">
			<button class="button border button-clear">Click me</button>
		</div>
	</div>
</section>
```

## Accent hero

Hero with a theme-aware companion image.

```html-no-indent
<section
    class="hero hero-image background-color-body-accent gradient-border-right gradient-border-body-accent"
    style="
        --hero-background-image-light: url('https://learn.microsoft.com/en-us/media/home-and-directory/home-hero_light.png');
        --hero-background-image-dark: url('https://learn.microsoft.com/en-us/media/home-and-directory/home-hero_dark.png');
    ">
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

## Accent hero with details
This component variant, known as 'Accent Hero with Details', overlays an element on top of the hero's image. Note that to lay out the hero's children correctly across screen sizes, the hero component should also have the `.flex-direction-row-tablet` atomic.

```html-no-indent
<section
    class="hero hero-image flex-direction-row-tablet border background-color-body-accent gradient-border-right gradient-border-body-accent"
    style="
        --hero-background-image-light: url('https://learn.microsoft.com/en-us/media/learn/plans/skilling_plan_hero.png?branch=main');
		--hero-background-image-dark: url('https://learn.microsoft.com/en-us/media/learn/plans/skilling_plan_hero.png?branch=main');
    ">
	<div class="hero-content">
		<p class="letter-spacing-wide text-transform-uppercase font-size-sm">LOREM IPSUM DOLOR SIT AMET</p>
		<h1 class="font-size-h1 font-weight-semibold">Hero</h1>
		<p class="font-size-lg font-weight-semibold margin-block-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
		<div class="buttons margin-top-md">
			<button class="button border button-clear">Click me</button>
		</div>
	</div>
	<div class="hero-details">
		<div class="hero-details-card border border-radius-lg box-shadow-heavy padding-sm">
			<p class="font-weight-bold">Some titles</p>
			<p class="margin-top-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		</div>
	</div>
</section>
```
