---
title: Scroll
description: Scroll related components in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F1xPKoajeYtL7JPQ4ZoENkr%2F%25F0%259F%258C%259E-Atlas-Design-UI-Kit-(Team-Guidance)%3Fnode-id%3D0%253A1
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

<div class="scroll-vertical example background-color-success max-height-30vh">
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
