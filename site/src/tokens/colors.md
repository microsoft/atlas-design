---
title: Colors
description: Atlas CSS Theme Tokens
template: token
token: colors
---

# Colors

Atlas currently supports three themes out of the box.

## Stops

<div class="padding-top-sm">
Atlas colors are available in a number of stops from dark to light—100 being the darkest, and 10 being the lightest.
</div>

<div class="display-flex gap-xxs">
	<div class="padding-md background-color-black-static color-text-overlay-invert width-full border-radius">
		<p class="font-weight-bold font-size-h4 margin-bottom-xs">Black Static</p>
		<p class="font-weight-bold font-size-h6 margin-bottom-xs">aka “Black”</p>
		<p><code>#000000</code></p>
	</div>
	<div class="padding-md background-color-white-static width-full border-radius border--color-black">
		<p class="font-weight-bold font-size-h4 margin-bottom-xs">White</p>
		<p class="font-weight-bold font-size-h6 margin-bottom-xs">aka "White"</p>
		<p><code>#FFF</code></p>
	</div>
</div>

<div>

### Primary colors

Approved background colors.

</div>

<div class="display-flex gap-xxs">
	<div class="width-full">
		<h4 class="font-weight-bold font-size-h4 margin-bottom-xs"> Primary colors</h4>
		<p>Approved background colors.</p>
		<div class="display-flex">
			<div id="blueList" class="display-inline-block"></div>
			<div id="navyList" class="display-inline-block"></div>
			<div id="grayList" class="display-inline-block"></div>
		</div>
	</div>
	<div class="width-full">
		<h4 class="font-weight-bold font-size-h4 margin-bottom-xs"> Secondary colors</h4>
		<p>Secondary colors are used only for alerts.</p>
		<div class="display-flex">
			<div id="turquoiseList" class="display-inline-block"></div>
			<div id="yellowList" class="display-inline-block"></div>
			<div id="greenList" class="display-inline-block"></div>
			<div id="redList" class="display-inline-block"></div>
			<div id="purpleList" class="display-inline-block"></div>
		</div>
	</div>
</div>

## Theming

There are specific light themes

| Type             | Class                             | Default                                                                                                    |
| ---------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| background-light | `.background-color-primary-light` | <div class="padding-xs background-color-primary-light border-color-danger width-full border-radius"></div> |
| background-light | `.background-color-danger-light`  | <div class="padding-xs background-color-danger-light border-color-danger width-full border-radius"></div>  |

## Typography

| Typography        | Class              | Class                                                                                                  |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------ |
| Primary Text      | `.color-primary`   | <div class="padding-xs background-color-primary border-color-danger width-full border-radius"></div>   |
| Secondary Text    | `.color-secondary` | <div class="padding-xs background-color-secondary border-color-danger width-full border-radius"></div> |
| Disabled Text     | `.color-disabled`  | <div class="padding-xs background-color-disabled border-color-danger width-full border-radius"></div>  |
| Hyperlink Text    | `.color-hyperlink` | <div class="padding-xs background-color-hyperlink border-color-danger width-full border-radius"></div> |
| Hover Link Text   | `.color-hoverlink` | <div class="padding-xs background-color-hoverlink border-color-danger width-full border-radius"></div> |
| Visited Link Text | `.color-visited`   | <div class="padding-xs background-color-visited border-color-danger width-full border-radius"></div>   |

## Semantic Color

You can use semantic colors to visualize the status or state of business data.

Semantic colors denote standard value states (such as good, bad, or warning). Each color has the same basic meaning in all contexts.

### Danger

Danger colors are red. They help reiterate that the intended action is important or potentially dangerous (e.g., deleting an item or transferring ownership).

| Type   | Class                                             | Background class                                                                | Border class                                                                                                     |
| ------ | ------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Danger | `.background-color-danger` `.border-color-danger` | <div class="padding-xs background-color-danger width-full border-radius"></div> | <div class="padding-xs background-color-danger-light danger border-color-danger width-full border-radius"></div> |

### Success

Success colors are green. This color stands for a good, positive situation, or for the successful completion of a task.

| Type    | Class                                               | Background class                                                                 | Border class                                                                                                       |
| ------- | --------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Success | `.background-color-success` `.border-color-success` | <div class="padding-xs background-color-success width-full border-radius"></div> | <div class="padding-xs background-color-success-light danger border-color-success width-full border-radius"></div> |

### Warning

Warning colors are yellow.

| Type    | Class                                               | Background class                                                                 | Border class                                                                                                       |
| ------- | --------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Warning | `.background-color-warning` `.border-color-warning` | <div class="padding-xs background-color-warning width-full border-radius"></div> | <div class="padding-xs background-color-warning-light danger border-color-warning width-full border-radius"></div> |

### Information

Information colors are purple.

| Type        | Class                                                       | Background class                                                                     | Border class                                                                                                               |
| ----------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Information | `.background-color-information` `.border-color-information` | <div class="padding-xs background-color-information width-full border-radius"></div> | <div class="padding-xs background-color-information-light danger border-color-information width-full border-radius"></div> |

### Hyperlinks

| Type | Class                            | Default                                                                            | Hover                                                                                                          | Hover                                                                                                              |
| ---- | -------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Link | `.hyperlink` `.hover` `.visited` | <div class="padding-xs background-color-hyperlink width-full border-radius"></div> | <div class="padding-xs background-color-hover-light danger border-color-hover width-full border-radius"></div> | <div class="padding-xs background-color-visited-light danger border-color-visited width-full border-radius"></div> |
