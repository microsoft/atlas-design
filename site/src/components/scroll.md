---
title: Scroll
description: Scroll related components in the Atlas Design System
template: standard
---

# Scrolling

There are two components that help modify the scroll direction of a particular container.

## Horizontal scrolling

Force an elements overflow to be horizontally scrollable by using `.scroll-horizontal`.

<div class="scroll-horizontal border background-color-success padding-xl margin-top-md">
	<div class="">
		<p class="color-success-invert font-size-xl">
			This container has a horizontal scrollbar if the content exceeds its width.
			----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
		</p>
	</div>
</div>

## Vertical scrolling

Force an elements overflow to be horizontally scrollable by using `.scroll-vertical`. Note that this will only occur if the elements height is constrained.

<div class="scroll-vertical example background-color-success max-height-30vh margin-top-md">
	<p class="color-success-invert font-size-h1 margin-bottom">
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
