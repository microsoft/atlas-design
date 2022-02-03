---
title: Label
description: Label component in the Atlas Design System
template: standard
---

# Label

Labels are normally paired with form's elements such as input, textarea, etc.

## Usage

Here is an example of a standard usage of label paired with an input.

```html
<label class="label" for="input-demo">Label</label>
<input class="input" id="input-demo" type="text" placeholder="Placeholder" />
```

### Sizes

`label-sm`/`label-lg` makes label a little bigger or smaller than the default.

```html
<div>
	<label class="label label-sm">
		Label
		<input class="input input-sm" type="text" placeholder="Placeholder" />
	</label>
</div>
<div class="margin-top-sm">
	<label class="label">
		Label
		<input class="input" type="text" placeholder="Placeholder" />
	</label>
</div>
<div class="margin-top-sm">
	<label class="label label-lg">
		Label
		<input class="input input-lg" type="text" placeholder="Placeholder" />
	</label>
</div>
```
