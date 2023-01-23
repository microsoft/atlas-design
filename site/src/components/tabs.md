---
title: Tabs
description: Tabs component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - tabs
---

## Tabs

Tabs component consists of navigating to the previous or next tab and well and clicking on a tab. The result will change the content in the `tab-item-container` to display the current selected item. To do this the `[data-tab-control="1"]` and `[data-tab-item="1"]` must have matching numbers as these act as the index for navigation.

```html
<tab-container data-tab-container>
	<div class="tabs">
		<button type="button" class="tab-previous" title="Previous tab" data-tab-nav="previous">
			<span class="icon" aria-hidden="true">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448">
					<path
						class="fill-current-color"
						d="M448 224H62.625l148.688 148.688-22.625 22.625L1.375 208 188.688 20.688l22.625 22.625L62.625 192H448v32z"
					/>
				</svg>
			</span>
		</button>
		<div class="tab-list" role="tablist" aria-orientation="horizontal">
			<button
				class="tab-control"
				type="button"
				id="tab-one"
				role="tab"
				aria-selected="true"
				data-tab-control="1"
			>
				Define Strategy
			</button>
			<button class="tab-control" type="button" id="tab-two" role="tab" data-tab-control="2">
				Plan
			</button>
			<button class="tab-control" type="button" id="tab-three" role="tab" data-tab-control="3">
				Prepare
			</button>
			<button class="tab-control" type="button" id="tab-four" role="tab" data-tab-control="4">
				Adopt
			</button>
			<button class="tab-control" type="button" id="tab-five" role="tab" data-tab-control="5">
				Govern
			</button>
			<button class="tab-control" type="button" id="tab-six" role="tab" data-tab-control="6">
				Manage
			</button>
		</div>
		<button type="button" class="tab-next" title="Next tab" data-tab-nav="next">
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
		<div role="tabpanel" aria-labelledby="tab-one" data-tab-item="1">
			<p>Tab Item 1</p>
		</div>
		<div role="tabpanel" aria-labelledby="tab-two" data-tab-item="2" hidden>
			<p>Tab Item 2</p>
		</div>
		<div role="tabpanel" aria-labelledby="tab-three" data-tab-item="3" hidden>
			<p>Tab Item 3</p>
		</div>
		<div role="tabpanel" aria-labelledby="tab-four" data-tab-item="4" hidden>
			<p>Tab Item 4</p>
		</div>
		<div role="tabpanel" aria-labelledby="tab-five" data-tab-item="5" hidden>
			<p>Tab Item 5</p>
		</div>
		<div role="tabpanel" aria-labelledby="tab-six" data-tab-item="6" hidden>
			<p>Tab Item 6</p>
		</div>
	</div>
</tab-container>
```

### Tab Large

Using the `tabs-lg` will increase the padding of the buttons.

```html
<tab-container data-tab-container>
	<div class="tabs tabs-lg">
		<button type="button" class="tab-previous" title="Previous tab" data-tab-nav="previous">
			<span class="icon" aria-hidden="true">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448">
					<path
						class="fill-current-color"
						d="M448 224H62.625l148.688 148.688-22.625 22.625L1.375 208 188.688 20.688l22.625 22.625L62.625 192H448v32z"
					/>
				</svg>
			</span>
		</button>
		<div class="tab-list" role="tablist" aria-orientation="horizontal">
			<button
				class="tab-control"
				type="button"
				id="tab-one"
				role="tab"
				aria-selected="true"
				data-tab-control="1"
			>
				Define Strategy
			</button>
			<button class="tab-control" type="button" id="tab-two" role="tab" data-tab-control="2">
				Plan
			</button>
			<button class="tab-control" type="button" id="tab-three" role="tab" data-tab-control="3">
				Prepare
			</button>
			<button class="tab-control" type="button" id="tab-four" role="tab" data-tab-control="4">
				Adopt
			</button>
			<button class="tab-control" type="button" id="tab-five" role="tab" data-tab-control="5">
				Govern
			</button>
			<button class="tab-control" type="button" id="tab-six" role="tab" data-tab-control="6">
				Manage
			</button>
		</div>
		<button type="button" class="tab-next" title="Next tab" data-tab-nav="next">
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
