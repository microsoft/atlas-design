---
title: Aspect ratio
description: Aspect ratio related atomic css classes for the Atlas Design System
template: standard
classType: Atomics
classPrefixes:
  - aspect-ratio
---

# Aspect Ratio Atomics

Aspect ratio atomics are used to set the width-to-height ratio of an element, even if the parent container or viewport size changes.

| cssproperty  | ratio                               | screensize |
| ------------ | ----------------------------------- | ---------- |
| aspect-ratio | `1-1`, `2-1`, `4-3`, `9-16`, `16-9` | N/A        |

## Usage

Aspect ratio atomics are used to set the width-to-height ratio of an element, even if the parent container or viewport size changes.

```html
<div class="padding-sm width-500-tablet">
	<img
		alt="An example image with an aspect ratio of 2 by 1"
		class="aspect-ratio-2-1"
		src="~/src/scaffold/media/aspect-ratio-2-1.png"
	/>
</div>
```

## Additional information

If the `video` or `iframe` container is wider or taller than the video content, the remaining space is filled with a black background. Using the most common video ratio `aspect-ratio-16-9` will remove the black background and scale the element responsively.

```html
<div class="padding-sm width-500">
	<video
		controls
		name="media"
		class="aspect-ratio-16-9"
		src="~/src/scaffold/media/aspect-ratio-video-16-9.mp4"
		type="video/mp4"
	></video>
</div>
```

If the element's intrinsic size is smaller than its container size, the ratio isn't calculated. These elements will need to have its width set to `width: 100%` to calculate the height. This can be done with the use of [width atomics](./width.md) or [ image components](../components/image.md).

```html
<div class="width-150 image padding-xxs">
	<img
		class="aspect-ratio-1-1"
		alt="An example image with an aspect ratio of 1 by 1"
		src="~/src/scaffold/media/aspect-ratio-1-1.png"
	/>
</div>
```

If the source image has a different intrinsic aspect ratio than the atomic ratio the image will be stretched. This scenario can be prevented with [image atomic](../atomics/image.md) `object-fit-cover`.

```html
<div class="padding-xxs width-350">
	<img
		class="aspect-ratio-4-3 object-fit-cover"
		alt="An example image resized to an aspect ratio of 4 by 3"
		src="~/src/scaffold/media/aspect-ratio-16-9.png"
	/>
</div>
```

## Available classes

List of all available classes:

```atomics-filter
.aspect-ratio-1-1
.aspect-ratio-2-1
.aspect-ratio-4-3
.aspect-ratio-9-16
.aspect-ratio-16-9
```
