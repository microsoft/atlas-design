---
title: Segmented Controls
description: Segmented controls component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - segmented-controls
---

## Segmented Control

Segmented control component consists of navigating to the previous or next segmented control item by using the arrow keys or clicking on a segmented control. The result will change the content to display the current selected item.

```html
<tab-container data-segmented-controls-container class="segmented-controlz">
	<div slot="tablist-wrapper" class="segmented-control-controls">
		<button
			type="button"
			class="segmented-control-previous margin-right-xxs"
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
				data-segmented-control
			>
				Define Strategy
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-one-2"
				role="tab"
				data-segmented-control
			>
				Plan
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-one-3"
				role="tab"
				data-segmented-control
			>
				Prepare
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-one-4"
				role="tab"
				data-segmented-control
			>
				Adopt
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-one-5"
				role="tab"
				data-segmented-control
			>
				Govern
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-one-6"
				role="tab"
				data-segmented-control
			>
				Manage
			</button>
		</div>
		<button
			type="button"
			class="segmented-control-next margin-left-xxs"
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

## Segmented Control with footer Next/Prev

Removing the next and previous buttons will still provide a seamless experience on the tabs control. Small restructuring allows for the tabs-container component to allocate the `after-tabpanel` footer.

```html
<tab-container class="segmented-controlz">
	<div class="segmented-control-list" role="tablist" aria-orientation="horizontal">
		<button
			class="segmented-control"
			type="button"
			id="sc-three-1"
			role="tab"
			aria-selected="true"
			data-segmented-control
		>
			Define Strategy
		</button>
		<button
			class="segmented-control"
			type="button"
			id="sc-three-2"
			role="tab"
			data-segmented-control
		>
			Plan
		</button>
		<button
			class="segmented-control"
			type="button"
			id="sc-three-3"
			role="tab"
			data-segmented-control
		>
			Prepare
		</button>
		<button
			class="segmented-control"
			type="button"
			id="sc-three-4"
			role="tab"
			data-segmented-control
		>
			Adopt
		</button>
		<button
			class="segmented-control"
			type="button"
			id="sc-three-5"
			role="tab"
			data-segmented-control
		>
			Govern
		</button>
		<button
			class="segmented-control"
			type="button"
			id="sc-three-6"
			role="tab"
			data-segmented-control
		>
			Manage
		</button>
	</div>

	<div role="tabpanel" aria-labelledby="sc-three-1">
		<div class="margin-block-md text-align-center">
			<p>Tab Item 1</p>
		</div>
	</div>
	<div role="tabpanel" aria-labelledby="sc-three-2" hidden>
		<div class="margin-block-md text-align-center">
			<p>Tab Item 2</p>
		</div>
	</div>
	<div role="tabpanel" aria-labelledby="sc-three-3" hidden>
		<div class="margin-block-md text-align-center">
			<p>Tab Item 3</p>
		</div>
	</div>
	<div role="tabpanel" aria-labelledby="sc-three-4" hidden>
		<div class="margin-block-md text-align-center">
			<p>Tab Item 4</p>
		</div>
	</div>
	<div role="tabpanel" aria-labelledby="sc-three-5" hidden>
		<div class="margin-block-md text-align-center">
			<p>Tab Item 5</p>
		</div>
	</div>
	<div role="tabpanel" aria-labelledby="sc-three-6" hidden>
		<div class="margin-block-md text-align-center">
			<p>Tab Item 6</p>
		</div>
	</div>

	<!-- After Tabpanels -->
	<div class="border-top display-flex padding-top-sm">
		<button
			type="button"
			class="button button-sm button-primary margin-right-sm"
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
			Previous
		</button>
		<button
			type="button"
			class="button button-primary button-filled"
			title="Next segment"
			data-segmented-control-nav="next"
		>
			Next
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
</tab-container>
```

## Size modification

Using the `segmented-controls-lg` will increase the padding of the buttons.

```html
<tab-container data-segmented-controls-container>
	<div class="segmented-controls segmented-controls-lg" slot="tablist-wrapper">
		<button
			type="button"
			class="segmented-control-previous margin-right-xxs"
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
				data-segmented-control
			>
				Define Strategy
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-two-2"
				role="tab"
				data-segmented-control
			>
				Plan
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-two-3"
				role="tab"
				data-segmented-control
			>
				Prepare
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-two-4"
				role="tab"
				data-segmented-control
			>
				Adopt
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-two-5"
				role="tab"
				data-segmented-control
			>
				Govern
			</button>
			<button
				class="segmented-control"
				type="button"
				id="sc-two-6"
				role="tab"
				data-segmented-control
			>
				Manage
			</button>
		</div>
		<button
			type="button"
			class="segmented-control-next margin-left-xxs"
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
