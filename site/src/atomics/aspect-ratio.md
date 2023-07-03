---
title: Aspect ratio
description: Aspect ratio related atomic css classes for the Atlas Design System
template: standard
classType: Atomics
classPrefixes:
  - aspect-ratio
---

# Aspect ratio Atomics

Ratio atomics are used to add a fluid aspect ratio to an element. The element will scale to fill 100% width of the container while matching the height to the defined aspect ratio.

| modifiers | ratio                                                                                   |
| --------- | --------------------------------------------------------------------------------------- |
| values    | `square`, `1-2`, `2-1`, `2-3`, `3-1`, `3-2`, `3-4`, `4-3`, `4-5`, `5-4`, `9-16`, `16-9` |

## Usage

Here are examples of ratio atomics, used on `iframe`, `video` and `img` elements to scale elements. When used on a `video` element or `iframe` video with the matching aspect ratio, it will remove the black bars and scale responsively.

```html
  <div class="padding-sm width-500-desktop">
  	<video controls name="media" class="width-500 aspect-ratio-16-9" src="~/src/scaffold/media/aspect-ratio-video-16-9.mp4" type="video/mp4" />
  	</video>
  </div>
```

```html
<div class="width-250 padding-sm">
	<iframe
		class="aspect-ratio-9-16"
		src="~/src/scaffold/media/aspect-ratio-video-9-16.mp4"
		title="Vertical video player"
		frameborder="0"
		sandbox
	></iframe>
</div>
```

```html
<div class="width-100 padding-xxs">
	<img
		class="aspect-ratio-square"
		alt=""
		role="presentation"
		src="~/src/scaffold/media/aspect-ratio-square.png"
	/>
</div>
<div class="width-200 padding-xxs">
	<img
		class="aspect-ratio-16-9"
		alt=""
		role="presentation"
		src="~/src/scaffold/media/aspect-ratio-16-9.png"
	/>
</div>
<div class="width-350 padding-xxs">
	<img
		class="aspect-ratio-4-1"
		alt=""
		role="presentation"
		src="~/src/scaffold/media/aspect-ratio-4-1.png"
	/>
</div>
```

## Available classes

List of all available classes:

```atomics-filter
.aspect-ratio-square
.aspect-ratio-1-2
.aspect-ratio-2-1
.aspect-ratio-2-3
.aspect-ratio-3-1
.aspect-ratio-3-2
.aspect-ratio-3-4
.aspect-ratio-4-3
.aspect-ratio-4-5
.aspect-ratio-5-4
.aspect-ratio-9-16
.aspect-ratio-16-9
```
