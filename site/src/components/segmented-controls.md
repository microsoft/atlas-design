---
title: Segmented Controls
description: Segmented controls component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - segmented-control
  - segmented-controls
---

## Segmented Control

The segmented controls component is a tabs-like widget, containing a list of buttons for toggling an active view from a list. The view can be set by clicking the appropriate segmented control button, pressing the left or right arrow keys, or by clicking an optional previous or next button.

```html
<tab-container>
	<div class="segmented-controls" slot="tablist-wrapper">
		<button
			type="button"
			class="segmented-control-previous"
			title="Previous segment"
			data-tab-container-nav="previous"
		>
			<span class="icon" aria-hidden="true">
				<svg class="fill-current-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448">
					<path
						d="M448 224H62.625l148.688 148.688-22.625 22.625L1.375 208 188.688 20.688l22.625 22.625L62.625 192H448v32z"
					/>
				</svg>
			</span>
		</button>

		<div class="segmented-control-list" role="tablist" aria-orientation="horizontal">
			<button class="segmented-control" type="button" id="sc-one-1" role="tab" aria-selected="true">
				Define Strategy
			</button>
			<button class="segmented-control" type="button" id="sc-one-2" role="tab">Plan</button>
			<button class="segmented-control" type="button" id="sc-one-3" role="tab">Prepare</button>
			<button class="segmented-control" type="button" id="sc-one-4" role="tab">Adopt</button>
			<button class="segmented-control" type="button" id="sc-one-5" role="tab">Govern</button>
			<button class="segmented-control" type="button" id="sc-one-6" role="tab">Manage</button>
		</div>
		<button
			type="button"
			class="segmented-control-next"
			title="Next segment"
			data-tab-container-nav="next"
		>
			<span class="icon" aria-hidden="true">
				<svg
					class="fill-current-color"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="-255 57 448 448"
				>
					<path
						d="M-253.625 281v-32H131.75L-16.938 100.313 5.687 77.688 193 265 5.687 452.313l-22.625-22.625L131.75 281h-385.375z"
					/>
				</svg>
			</span>
		</button>
	</div>

	<div role="tabpanel" aria-labelledby="sc-one-1">
		<div class="margin-block-md text-align-center">
			<p>Tab Item 1</p>
		</div>
	</div>
	<div role="tabpanel" aria-labelledby="sc-one-2" hidden>
		<div class="margin-block-md text-align-center">
			<p>Tab Item 2</p>
		</div>
	</div>
	<div role="tabpanel" aria-labelledby="sc-one-3" hidden>
		<div class="margin-block-md text-align-center">
			<p>Tab Item 3</p>
		</div>
	</div>
	<div role="tabpanel" aria-labelledby="sc-one-4" hidden>
		<div class="margin-block-md text-align-center">
			<p>Tab Item 4</p>
		</div>
	</div>
	<div role="tabpanel" aria-labelledby="sc-one-5" hidden>
		<div class="margin-block-md text-align-center">
			<p>Tab Item 5</p>
		</div>
	</div>
	<div role="tabpanel" aria-labelledby="sc-one-6" hidden>
		<div class="margin-block-md text-align-center">
			<p>Tab Item 6</p>
		</div>
	</div>
</tab-container>
```
