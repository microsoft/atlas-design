---
title: Segmented Controls
description: Segmented controls component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - segmented-controls
---

# Segmented Control

Segmented control component consists of navigating to the previous or next segmented control item by using the arrow keys or clicking on a segmented control. The result will change the content to display the current selected item. To do this the `[data-segmented-control="1"]` and `[data-segmented-control-item="1"]` must have matching numbers as these act as the index for navigation.

```html
<tab-container data-segmented-controls-container>
	<div class="segmented-controls">
		<button
			type="button"
			class="segmented-control-previous"
			title="Previous segment"
			data-segmented-control-nav="previous"
		>
			<span class="icon" aria-hidden="true">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448">
					<path
						class="fill-current-color"
						d="M448 224H62.625l148.688 148.688-22.625 22.625L1.375 208 188.688 20.688l22.625 22.625L62.625 192H448v32z"
					/>
				</svg>
			</span>
		</button>
		<div class="segmented-control-list" role="tablist" aria-orientation="horizontal">
			<button
				class="segmented-control"
				type="button"
				id="sc-one-1"
				role="tab"
				aria-selected="true"
				data-segmented-control="1"
			>
				Define Strategy
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-one-2"
				role="tab"
				data-segmented-control="2"
			>
				Plan
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-one-3"
				role="tab"
				data-segmented-control="3"
			>
				Prepare
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-one-4"
				role="tab"
				data-segmented-control="4"
			>
				Adopt
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-one-5"
				role="tab"
				data-segmented-control="5"
			>
				Govern
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-one-6"
				role="tab"
				data-segmented-control="6"
			>
				Manage
			</button>
		</div>
		<button
			type="button"
			class="segmented-control-next"
			title="Next segment"
			data-segmented-control-nav="next"
		>
			<span class="icon" aria-hidden="true">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="-255 57 448 448">
					<path
						class="fill-current-color"
						d="M-253.625 281v-32H131.75L-16.938 100.313 5.687 77.688 193 265 5.687 452.313l-22.625-22.625L131.75 281h-385.375z"
					/>
				</svg>
			</span>
		</button>
	</div>
	<div class="margin-block-md text-align-center">
		<div role="tabpanel" aria-labelledby="sc-one-1" data-segmented-control-item="1">
			<p>Tab Item 1</p>
		</div>
		<div role="tabpanel" aria-labelledby="sc-one-2" data-segmented-control-item="2" hidden>
			<p>Tab Item 2</p>
		</div>
		<div role="tabpanel" aria-labelledby="sc-one-3" data-segmented-control-item="3" hidden>
			<p>Tab Item 3</p>
		</div>
		<div role="tabpanel" aria-labelledby="sc-one-4" data-segmented-control-item="4" hidden>
			<p>Tab Item 4</p>
		</div>
		<div role="tabpanel" aria-labelledby="sc-one-5" data-segmented-control-item="5" hidden>
			<p>Tab Item 5</p>
		</div>
		<div role="tabpanel" aria-labelledby="sc-one-6" data-segmented-control-item="6" hidden>
			<p>Tab Item 6</p>
		</div>
	</div>
</tab-container>
```

## Size modification

Using the `segmented-controls-md` or `segmented-controls-lg` will increase the padding of the buttons.

```html
<tab-container data-segmented-controls-container>
	<div class="segmented-controls segmented-controls-lg">
		<button
			type="button"
			class="segmented-control-previous"
			title="Previous segment"
			data-segmented-control-nav="previous"
		>
			<span class="icon" aria-hidden="true">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448">
					<path
						class="fill-current-color"
						d="M448 224H62.625l148.688 148.688-22.625 22.625L1.375 208 188.688 20.688l22.625 22.625L62.625 192H448v32z"
					/>
				</svg>
			</span>
		</button>
		<div class="segmented-control-list" role="tablist" aria-orientation="horizontal">
			<button
				class="segmented-control"
				type="button"
				id="sc-two-1"
				role="tab"
				aria-selected="true"
				data-segmented-control="1"
			>
				Define Strategy
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-two-2"
				role="tab"
				data-segmented-control="2"
			>
				Plan
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-two-3"
				role="tab"
				data-segmented-control="3"
			>
				Prepare
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-two-4"
				role="tab"
				data-segmented-control="4"
			>
				Adopt
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-two-5"
				role="tab"
				data-segmented-control="5"
			>
				Govern
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-two-6"
				role="tab"
				data-segmented-control="6"
			>
				Manage
			</button>
		</div>
		<button
			type="button"
			class="segmented-control-next"
			title="Next segment"
			data-segmented-control-nav="next"
		>
			<span class="icon" aria-hidden="true">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="-255 57 448 448">
					<path
						class="fill-current-color"
						d="M-253.625 281v-32H131.75L-16.938 100.313 5.687 77.688 193 265 5.687 452.313l-22.625-22.625L131.75 281h-385.375z"
					/>
				</svg>
			</span>
		</button>
	</div>
	<div class="margin-block-md text-align-center">
		<div role="tabpanel" aria-labelledby="sc-two-1" data-segmented-control-item="1">
			<p>Tab Item 1</p>
		</div>
		<div role="tabpanel" aria-labelledby="sc-two-2" data-segmented-control-item="2" hidden>
			<p>Tab Item 2</p>
		</div>
		<div role="tabpanel" aria-labelledby="sc-two-3" data-segmented-control-item="3" hidden>
			<p>Tab Item 3</p>
		</div>
		<div role="tabpanel" aria-labelledby="sc-two-4" data-segmented-control-item="4" hidden>
			<p>Tab Item 4</p>
		</div>
		<div role="tabpanel" aria-labelledby="sc-two-5" data-segmented-control-item="5" hidden>
			<p>Tab Item 5</p>
		</div>
		<div role="tabpanel" aria-labelledby="sc-two-6" data-segmented-control-item="6" hidden>
			<p>Tab Item 6</p>
		</div>
	</div>
</tab-container>
```
