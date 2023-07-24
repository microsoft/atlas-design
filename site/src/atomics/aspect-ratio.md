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

The `aspect-ratio` atomic allows you to define a predetermined width-to-height ratio of an element's box. The specified aspect ratio is used in the calculation of auto sizes and some other layout functions.

At least one of the box's sizes needs to be automatic in order for aspect-ratio to have any effect. If neither the width nor height is an automatic size, then the provided aspect ratio has no effect on the box's preferred sizes.

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

`video` or `iframe` elements should use a matching aspect ratio of 16:9 or 4:3. If a `video` or `iframe`'s container is wider or taller than the video content, it will fill the remaining space with black bars. Using `aspect-ratio-16-9` will remove the black bars and scale the element responsively.

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

In some scenarios, an element's intrinsic size is smaller than its container size, so the ratio isn't calculated. These elements will need to have its width set to `width: 100%` to calculate the height. This can be done with the use of [width atomics](./width.md) or [ image components](../components/image.md).

```html
<div class="width-150 image padding-xxs">
	<img
		class="aspect-ratio-1-1"
		alt="An example image with an aspect ratio of 1 by 1"
		src="~/src/scaffold/media/aspect-ratio-1-1.png"
	/>
</div>
```

In other scenarios, the source image has a different intrinsic aspect ratio. Changing the ratio without
squishing the image can be done with [image atomic](../atomics/image.md) `object-fit-cover`.

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
