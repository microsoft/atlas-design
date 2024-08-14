---
title: Progress Bar
description: The progress-bar component in the Atlas Design System
template: standard
figmaEmbed:
classType: Component
classPrefixes:
  - progress-bar
---

# Progress Bar

Use the progress-bar component to communicate how much of a task has been completed.

## Usage

Here is an example of a standard usage of the progress bar component.

```html
<div class="progress-bar-container progress-bar-md">
	<div class="progress-bar" style="width: 45%;"></div>
</div>
```

Set the size and the shape of the progress bar on the container. Nest the progress bar within the `progress-bar-container` and optionally set the color and indeterminate property on the `progress-bar`.

See below for more examples.

## Size

There are two sizes of the progress bar: `progress-bar-md` / `progress-bar-lg`.

```html
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-md">Medium</label>
<div id="progress-bar-md" class="progress-bar-container progress-bar-md">
	<div class="progress-bar" style="width: 75%;"></div>
</div>
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-lg">Large</label>
<div id="progress-bar-lg" class="progress-bar-container progress-bar-lg">
	<div class="progress-bar" style="width: 75%;"></div>
</div>
```

## Shape

Progress bars can have rounded corners or sharp corners: `progress-bar-rounded` / `progress-bar-square`.

```html
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-rounded">Rounded</label>
<div id="progress-bar-rounded" class="progress-bar-container progress-bar-lg progress-bar-rounded">
	<div class="progress-bar"></div>
</div>
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-square">Square</label>
<div id="progress-bar-square" class="progress-bar-container progress-bar-lg progress-bar-square">
	<div class="progress-bar"></div>
</div>
```

## Indeterminate

Use an indeterminate progress bar to show that an operation is being executed. An indeterminate bar will continue to cycle on repeat, unlike a determinate progress bar.

```html
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-indeterminate"
	>Indeterminate</label
>
<div
	id="progress-bar-indeterminate"
	class="progress-bar-container progress-bar-lg progress-bar-rounded"
>
	<div class="progress-bar indeterminate"></div>
</div>
```

## Color

`progress-bar-danger`, `progress-bar-warning`, and `progress-bar-success` will change the color of the bar to indicate a validation state.

```html
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-danger">Danger</label>
<div id="progress-bar-danger" class="progress-bar-container progress-bar-lg progress-bar-square">
	<div class="progress-bar progress-bar-danger indeterminate"></div>
</div>
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-warning">Warning</label>
<div id="progress-bar-warning" class="progress-bar-container progress-bar-lg progress-bar-square">
	<div class="progress-bar progress-bar-warning indeterminate"></div>
</div>
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-success">Success</label>
<div id="progress-bar-success" class="progress-bar-container progress-bar-lg progress-bar-square">
	<div class="progress-bar progress-bar-success indeterminate"></div>
</div>
```
