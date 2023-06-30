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

| modifiers | ratio                          |
| --------- | ------------------------------ |
| values    | `16-9`,`9-16`, `4-3`, `square` |

## Usage

Here are examples of ratio atomics, used on `iframe`, `video` and `img` elements. When used on a `video` element or `iframe` video with the matching aspect ratio, it will remove the black bars and scale responsively. When used on an `img` of a different aspect ratio it will crop the image.

```html
  <div class="padding-sm width-500-desktop">
  	<video controls name="media" class="width-500 aspect-ratio-16-9" poster="~/src/scaffold/media/sample-learn-video-thumbnail.jpg" src="~/src/scaffold/media/sample-learn-video.mp4" type="video/mp4" />
  	</video>
  </div>
```

```html
<div class="width-250 padding-sm">
	<iframe
		class="aspect-ratio-9-16"
		src="~/src/scaffold/media/sample-learn-vertical-video.mp4"
		title="Vertical video player"
		frameborder="0"
		sandbox
	></iframe>
</div>
```

```html
<div class="width-350 padding-sm">
	<img class="aspect-ratio-16-9" src="~/src/scaffold/media/learn-training.jpg" />
</div>
<div class="width-350 padding-sm">
	<img class="aspect-ratio-4-3" src="~/src/scaffold/media/learn-training.jpg" />
</div>
<div class="width-350 padding-sm">
	<img class="aspect-ratio-square" src="~/src/scaffold/media/learn-training.jpg" />
</div>
```

## Available classes

List of all available classes:

```atomics-filter
.aspect-ratio-16-9
.aspect-ratio-4-3
.aspect-ratio-square
.aspect-ratio-9-16
```
