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
<div class="progress-bar">
	<div
		role="progressbar"
		class="progress-bar-body"
		style="width: 45%;"
		aria-label="demo progress bar"
		aria-valuenow="45"
	></div>
</div>
```

Set the size and the shape of the progress bar on the container. Nest the progress bar within the `progress-bar` and optionally set the color and indeterminate property on the `progress-bar`.

See below for more examples.

## Size

There are two sizes of the progress bar: `progress-bar-md` / `progress-bar-lg`. The default size is `progress-bar-md`.

```html
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-md">Medium</label>
<div id="progress-bar-md" class="progress-bar">
	<div
		role="progressbar"
		class="progress-bar-body"
		style="width: 75%;"
		aria-label="demo size medium progress bar"
		aria-valuenow="75"
	></div>
</div>
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-lg">Large</label>
<div id="progress-bar-lg" class="progress-bar progress-bar-lg">
	<div
		role="progressbar"
		class="progress-bar-body"
		style="width: 75%;"
		aria-label="demo size large progress bar"
		aria-valuenow="75"
	></div>
</div>
```

## Shape

Progress bars can have rounded corners or sharp corners. The default shape is round, but if you want square corners, apply the `border-radius-none` atomic.

```html
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-rounded">Rounded</label>
<div id="progress-bar-rounded" class="progress-bar progress-bar-lg">
	<div
		role="progressbar"
		class="progress-bar-body"
		aria-label="demo round shaped progress bar"
		aria-valuenow="100"
	></div>
</div>
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-square">Square</label>
<div id="progress-bar-square" class="progress-bar progress-bar-lg border-radius-none">
	<div
		role="progressbar"
		class="progress-bar-body"
		aria-label="demo square shaped progress bar"
		aria-valuenow="100"
	></div>
</div>
```

## Indeterminate

Use an indeterminate progress bar to show that an operation is being executed. An indeterminate bar will continue to cycle on repeat, unlike a determinate progress bar.

```html
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-indeterminate"
	>Indeterminate</label
>
<div id="progress-bar-indeterminate" class="progress-bar progress-bar-lg">
	<div
		role="progressbar"
		class="progress-bar-body indeterminate"
		aria-label="demo indeterminate progress bar"
	></div>
</div>
```

## Color

`progress-bar-danger`, `progress-bar-warning`, and `progress-bar-success` will change the color of the bar to indicate a validation state.

```html
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-danger">Danger</label>
<div id="progress-bar-danger" class="progress-bar progress-bar-lg">
	<div
		role="progressbar"
		class="progress-bar-body progress-bar-danger indeterminate"
		aria-label="demo indeterminate danger color progress bar"
	></div>
</div>
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-warning">Warning</label>
<div id="progress-bar-warning" class="progress-bar progress-bar-lg">
	<div
		role="progressbar"
		class="progress-bar-body progress-bar-warning indeterminate"
		aria-label="demo indeterminate warning color progress bar"
	></div>
</div>
<label class="label margin-top-xs margin-bottom-xs" for="progress-bar-success">Success</label>
<div id="progress-bar-success" class="progress-bar progress-bar-lg">
	<div
		role="progressbar"
		class="progress-bar-body progress-bar-success indeterminate"
		aria-label="demo indeterminate success color progress bar"
	></div>
</div>
```
