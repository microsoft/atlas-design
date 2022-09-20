---
title: Image
description: Image component in the Atlas Design System
template: standard
documentedClassPrefixes:
  - image
---

# Image

The image component parents an image tag or svg and provides width based classes to constrain its children.

## Usage

The default image class takes up the full width of its container, but various sizes and screensizes modifiers are available.

| Class pattern         | Sizes                                                                                       | screensize          |
| --------------------- | ------------------------------------------------------------------------------------------- | ------------------- |
| `.image.image-<size>` | `16x16` `24x24` `32x32` `36x36` `48x48` `64x64` `76x76` `88x88` `96x96` `112x112` `128x128` | `tablet`, `desktop` |

```html
<div class="width-300">
	<div class="image">
		<img src="~/src/scaffold/media/video-media.png" alt="A video icon" />
	</div>
</div>
```

## Sizes

The following classes are available for resizing square images.

```html
<div class="display-flex flex-wrap-wrap">
	<div class="image image-16x16">
		<img src="~/src/scaffold/media/video-media.png" alt="A video icon" />
	</div>
	<div class="image image-24x24">
		<img src="~/src/scaffold/media/video-media.png" alt="A video icon" />
	</div>
	<div class="image image-32x32">
		<img src="~/src/scaffold/media/video-media.png" alt="A video icon" />
	</div>
	<div class="image image-36x36">
		<img src="~/src/scaffold/media/video-media.png" alt="A video icon" />
	</div>
	<div class="image image-48x48">
		<img src="~/src/scaffold/media/video-media.png" alt="A video icon" />
	</div>
	<div class="image image-64x64">
		<img src="~/src/scaffold/media/video-media.png" alt="A video icon" />
	</div>
	<div class="image image-76x76">
		<img src="~/src/scaffold/media/video-media.png" alt="A video icon" />
	</div>
	<div class="image image-88x88">
		<img src="~/src/scaffold/media/video-media.png" alt="A video icon" />
	</div>
	<div class="image image-96x96">
		<img src="~/src/scaffold/media/video-media.png" alt="A video icon" />
	</div>
	<div class="image image-112x112">
		<img src="~/src/scaffold/media/video-media.png" alt="A video icon" />
	</div>
	<div class="image image-128x128">
		<img src="~/src/scaffold/media/video-media.png" alt="A video icon" />
	</div>
</div>
```

## Responsive sizes

Tablet and desktop versions of all classes are also available. Resize your browser window to see the differences in sizes.

```html
<div class="image image-32x32 image-64x64-tablet image-96x96-desktop">
	<img src="~/src/scaffold/media/video-media.png" alt="A video icon" />
</div>
```
