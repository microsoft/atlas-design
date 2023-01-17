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
<section id="tab-test" class="display-flex-tablet flex-direction-column justify-content-start align-items-center padding-block-lg">
	<div class="tabs is-toggle display-none display-flex-tablet">
    <button class="tab-nav tab-previous margin-right-sm">Previous</button>
		<div class="tab-list" role="tablist">
				<div class="tab-parent is-active">
					<button
						class="tab-control"
						role="tab"
						aria-controls="tab-control-1"
						data-tab-control=1
					>
						Item 1
					</button>
				</div>
				<div class="tab-parent">
					<button
						class="tab-control"
						role="tab"
						aria-controls="tab-item-2"
						data-tab-control=2
					>
						Item 2
					</button>
				</div>
				<div class="tab-parent">
					<button
						class="tab-control"
						role="tab"
						aria-controls="tab-control-3"
						data-tab-control=3
					>
						Item 3
					</button>
				</div>
		</div>
    <button class="tab-nav tab-next margin-left-sm">Next</button>
	</div>
	<div id="tab-item-container" class="justify-content-center">
		<div id="tab-item-1" class="display-flex justify-content-start flex-direction-column flex-direction-row-tablet margin-bottom-none" data-tab-item="tab-item-1" aria-labelledby="tab-item-1" role="tabpanel">
        <p class="margin-sm">Tab Item 1</p>
		</div>
		<div id="tab-item-2" class="display-none justify-content-start flex-direction-column flex-direction-row-tablet margin-bottom-none" data-tab-item="tab-item-2" aria-labelledby="tab-item-2" role="tabpanel">
        <p class="margin-sm">Tab Item 2</p>
		</div>
		<div id="tab-item-3" class="display-none justify-content-start flex-direction-column flex-direction-row-tablet margin-bottom-none" data-tab-item="tab-item-3" aria-labelledby="tab-item-3" role="tabpanel">
        <p class="margin-sm">Tab Item 3</p>
		</div>
	</div>
</section>
```