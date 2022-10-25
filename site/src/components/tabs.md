---
title: Tabs
description: Tabs related components in the Atlas Design System
template: standard
classType: Component
---

# Tabs

The behaviors by default will update the active button. Additional functionality will need to be passed to initTabs()

```html
<section class="display-flex justify-content-center align-items-center">
	<div class="tabs" data-tabs-group="1">
		<div class="tab-list" role="tablist">
			<button class="tab-control is-active" role="tab" aria-controls="tab-button-1">tab-1</button>
			<button class="tab-control" role="tab" aria-controls="tab-button-2">tab-2</button>
			<button class="tab-control" role="tab" aria-controls="tab-button-3">tab-3</button>
			<button class="tab-control" role="tab" aria-controls="tab-button-4">tab-4</button>
			<button class="tab-control" role="tab" aria-controls="tab-button-5">tab-5</button>
			<button class="tab-control" role="tab" aria-controls="tab-button-6">tab-6</button>
		</div>
	</div>
</section>
```
