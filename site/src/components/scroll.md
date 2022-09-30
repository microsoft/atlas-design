---
title: Scroll
description: Scroll related components in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - scroll
---

# Scrolling

There are two components that help modify the scroll direction of a particular container.

## Horizontal scrolling

Force an elements overflow to be horizontally scrollable by using `.scroll-horizontal`.

<div class="scroll-horizontal background-color-success padding-xl margin-top-md">
	<p class="color-success-invert font-size-xl">
		This container has a horizontal scrollbar if the content exceeds its width.
		<pre class="color-success-invert ">-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------></pre>
	</p>
</div>

## Vertical scrolling

Force an elements overflow to be horizontally scrollable by using `.scroll-vertical`. Note that this will only occur if the elements height is constrained.

<div class="scroll-vertical max-height-30vh background-color-success margin-top-md padding-xl">
	<p class="color-success-invert font-size-xl margin-bottom">
		This container has a vertical scrollbar if its height is constrained.
		<pre class="color-success-invert">
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		|
		▼
		</pre>
	</p>
</div>

## Side scrolling container with pagination

On narrow widths, this pattern provides a horizontally scrolling swipe-friend container. It also provides pagination support for better keyboard navigation. This pattern should be used for small screens (`mobile`, `tablet`) only and should be hidden on large screens (`desktop`, `widescreen`).

A word of warning, if your inner elements contain focusable elements, you will need to implement a custom "skip focus" interaction to allow a user navigating with a keyboard to skip this section and go directly to pagination if they so choose.

Additionally, if your element is injected into the DOM after the `initSnapScroll` function has been run initially, then you will need to manually run `initSnapScrollScrollListeners(yourElement)` to achieve correct pagination highlighting. See `js/behaviors/snap-scroll.ts` for relevant code.

```html
<section id="snap-scroll-1" class="width-full width-500-tablet display-none-widescreen" data-snap-scroll="first-one">
	<div class="scroll-horizontal scroll-snap-container display-flex padding-bottom-xs" data-snap-scroll-slides>
		<article class="padding-sm border scroll-snap-item" id="one" data-snap-scroll-slide="first-one-1">
			<h3 class="font-size-lg">1</h3>
			<p>Description text is here and goes on for a little while.</p>
		</article>
		<article class="padding-sm border scroll-snap-item" id="two" data-snap-scroll-slide="first-one-2">
			<h3 class="font-size-lg">2</h3>
			<p>Description text is here and goes on for a little while.</p>
		</article>
		<article class="padding-sm border scroll-snap-item" id="three" data-snap-scroll-slide="first-one-3">
			<h3 class="font-size-lg">3</h3>
			<p>Description text is here and goes on for a little while.</p>
		</article>
		<article class="padding-sm border scroll-snap-item" id="four" data-snap-scroll-slide="first-one-4">
			<h3 class="font-size-lg">4</h3>
			<p>Description text is here and goes on for a little while.</p>
		</article>
		<article class="padding-sm border scroll-snap-item" id="five" data-snap-scroll-slide="first-one-5">
			<h3 class="font-size-lg">5</h3>
			<p>Description text is here and goes on for a little while.</p>
		</article>
		<article class="padding-sm border scroll-snap-item" id="six" data-snap-scroll-slide="first-one-6">
			<h3 class="font-size-lg">6</h3>
			<p>Description text is here and goes on for a little while.</p>
		</article>
		<article class="padding-sm border scroll-snap-item" id="seven" data-snap-scroll-slide="first-one-7">
			<h3 class="font-size-lg">7</h3>
			<p>
				Description text is here and goes on for a little while. <br />
				Even more text.
			</p>
		</article>
	</div>
	<nav class="pagination" role="navigation" aria-label="pagination" data-snap-scroll-nav="first-one">
    <ul class="pagination-list">
        <li>
            <a href="#first-one-1" class="pagination-link is-current" data-snap-scroll-nav-item="first-one-1">1</a>
        </li>
        <li>
            <a href="#first-one-2" class="pagination-link" data-snap-scroll-nav-item="first-one-2">2</a>
        </li>
        <li>
            <a href="#first-one-3" class="pagination-link" data-snap-scroll-nav-item="first-one-3">3</a>
        </li>
        <li>
            <a href="#first-one-4" class="pagination-link" data-snap-scroll-nav-item="first-one-4">4</a>
        </li>
        <li>
            <a href="#first-one-5" class="pagination-link" data-snap-scroll-nav-item="first-one-5">5</a>
        </li>
        <li>
            <a href="#first-one-6" class="pagination-link" data-snap-scroll-nav-item="first-one-6">6</a>
        </li>
        <li>
            <a href="#first-one-7" class="pagination-link" data-snap-scroll-nav-item="first-one-7">7</a>
        </li>
	</nav>
</section>
```
