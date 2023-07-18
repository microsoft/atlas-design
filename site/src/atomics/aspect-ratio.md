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

Here are examples of aspect ratio atomics being applied to `video` and `img` elements. When used on `video` or `iframe` elements with the matching aspect ratio, it will remove the black bars and scale responsively.

```html
<div class="padding-sm width-500-desktop">
	<video
		controls
		name="media"
		class="aspect-ratio-16-9"
		src="~/src/scaffold/media/aspect-ratio-video-16-9.mp4"
		type="video/mp4"
	></video>
</div>
```

```html
<div class="width-100 padding-xxs">
	<img
		class="aspect-ratio-1-1"
		alt="An example image with an aspect ratio of 1 by 1"
		src="~/src/scaffold/media/aspect-ratio-square.png"
	/>
</div>
<div class="width-200 padding-xxs">
	<img
		class="aspect-ratio-2-1 object-fit-cover"
		alt="An example image resized to an aspect ratio of 2 by 1"
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
