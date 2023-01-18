---
title: Tabs
description: Tabs component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - tabs
---

# Tabs

```html
<section
	id="tab-test"
	class="display-flex-tablet flex-direction-column justify-content-start align-items-center padding-block-lg"
>
	<div class="tabs">
		<button role="nav" class="tab-nav tab-previous margin-right-sm" data-nav="previous">
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
					Item 1
				</button>
			</div>
			<div class="tab-parent">
				<button class="tab-control" role="tab" aria-controls="tab-item-2" data-tab-control="2">
					Item 2
				</button>
			</div>
			<div class="tab-parent">
				<button class="tab-control" role="tab" aria-controls="tab-control-3" data-tab-control="3">
					Item 3
				</button>
			</div>
		</div>
		<button role="nav" class="tab-nav tab-next margin-left-sm" data-nav="next">
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
	<div id="tab-item-container" class="justify-content-center">
		<div
			id="tab-item-1"
			class="display-flex justify-content-start flex-direction-column flex-direction-row-tablet margin-bottom-none"
			data-tab-item="tab-item-1"
			aria-labelledby="tab-item-1"
			role="tabpanel"
		>
			<p class="margin-sm">Tab Item 1</p>
		</div>
		<div
			id="tab-item-2"
			class="display-none justify-content-start flex-direction-column flex-direction-row-tablet margin-bottom-none"
			data-tab-item="tab-item-2"
			aria-labelledby="tab-item-2"
			role="tabpanel"
		>
			<p class="margin-sm">Tab Item 2</p>
		</div>
		<div
			id="tab-item-3"
			class="display-none justify-content-start flex-direction-column flex-direction-row-tablet margin-bottom-none"
			data-tab-item="tab-item-3"
			aria-labelledby="tab-item-3"
			role="tabpanel"
		>
			<p class="margin-sm">Tab Item 3</p>
		</div>
	</div>
</section>
```
