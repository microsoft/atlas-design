---
title: Tabs
description: Tabs component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - tabs
---

# Tabs

Tabs component consists of navigating to the previous or next tab and well and clicking on a tab. The result will change the content in the `tab-item-container` to display the current selected item.

```html
<section
	id="tab-test"
	class="display-flex-tablet flex-direction-column justify-content-start align-items-center padding-block-lg"
>
	<div class="tabs">
		<button role="nav" class="tab-nav tab-previous" data-nav="previous">
			<span class="icon" aria-hidden="true">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448">
					<path
						class="fill-current-color"
						d="M448 224H62.625l148.688 148.688-22.625 22.625L1.375 208 188.688 20.688l22.625 22.625L62.625 192H448v32z"
					/>
				</svg>
			</span>
		</button>
		<div class="tab-list" role="tablist">
			<div class="tab-parent is-active">
				<button class="tab-control" role="tab" aria-controls="tab-control-1" data-tab-control="1">
					Define Strategy
				</button>
			</div>
			<div class="tab-parent">
				<button class="tab-control" role="tab" aria-controls="tab-item-2" data-tab-control="2">
					Plan
				</button>
			</div>
			<div class="tab-parent">
				<button class="tab-control" role="tab" aria-controls="tab-control-3" data-tab-control="3">
					Prepare
				</button>
			</div>
			<div class="tab-parent">
				<button class="tab-control" role="tab" aria-controls="tab-control-3" data-tab-control="4">
					Adopt
				</button>
			</div>
			<div class="tab-parent">
				<button class="tab-control" role="tab" aria-controls="tab-control-3" data-tab-control="5">
					Govern
				</button>
			</div>
			<div class="tab-parent">
				<button class="tab-control" role="tab" aria-controls="tab-control-3" data-tab-control="6">
					Manage
				</button>
			</div>
		</div>
		<button role="nav" class="tab-nav tab-next" data-nav="next">
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
	<div id="tab-item-container" class="tab-items justify-content-center">
		<div
			id="tab-item-1"
			class="tab-item display-flex"
			data-tab-item="tab-item-1"
			aria-labelledby="tab-item-1"
			role="tabpanel"
		>
			<p class="margin-sm">Tab Item 1</p>
		</div>
		<div
			id="tab-item-2"
			class="tab-item display-none"
			data-tab-item="tab-item-2"
			aria-labelledby="tab-item-2"
			role="tabpanel"
		>
			<p class="margin-sm">Tab Item 2</p>
		</div>
		<div
			id="tab-item-3"
			class="tab-item display-none"
			data-tab-item="tab-item-3"
			aria-labelledby="tab-item-3"
			role="tabpanel"
		>
			<p class="margin-sm">Tab Item 3</p>
		</div>
		<div
			id="tab-item-4"
			class="tab-item display-none"
			data-tab-item="tab-item-4"
			aria-labelledby="tab-item-4"
			role="tabpanel"
		>
			<p class="margin-sm">Tab Item 4</p>
		</div>
		<div
			id="tab-item-5"
			class="tab-item display-none"
			data-tab-item="tab-item-5"
			aria-labelledby="tab-item-5"
			role="tabpanel"
		>
			<p class="margin-sm">Tab Item 5</p>
		</div>
		<div
			id="tab-item-6"
			class="tab-item display-none"
			data-tab-item="tab-item-6"
			aria-labelledby="tab-item-6"
			role="tabpanel"
		>
			<p class="margin-sm">Tab Item 6</p>
		</div>
		<div
			id="tab-item-7"
			class="tab-item display-none"
			data-tab-item="tab-item-7"
			aria-labelledby="tab-item-7"
			role="tabpanel"
		>
			<p class="margin-sm">Tab Item 7</p>
		</div>
	</div>
</section>
```
