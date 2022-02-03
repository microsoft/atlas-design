---
title: Help
description: Help component in the Atlas Design System
template: standard
---

# Help

Help component can be paired with form's elements and contain additional information such as an error message, hints, etc.

## Usage

Here is an example of a help component textarea usage paired with an input and a label.

```html
<label class="label" for="input-demo">Label</label>
<input class="input" id="input-demo" type="text" placeholder="Placeholder" />
<p class="help">Help message</p>
```

## Sizes

`help-sm`/`help-lg` makes help component a little bigger or smaller than the default.

```html
<div>
	<label class="label label-sm">
		Label
		<input class="input input-sm" type="text" placeholder="Placeholder" />
	</label>
	<p class="help help-sm">Help message</p>
</div>
<div class="margin-top-sm">
	<label class="label">
		Label
		<input class="input" type="text" placeholder="Placeholder" />
	</label>
	<p class="help">Help message</p>
</div>
<div class="margin-top-sm">
	<label class="label label-lg">
		Label
		<input class="input input-lg" type="text" placeholder="Placeholder" />
	</label>
	<p class="help help-lg">Help message</p>
</div>
```

### Validation states

`help-error`/`help-warning`/`help-success` helps with visual reflection of validation states.

| State   | Class                 | Preview                                                          |
| ------- | --------------------- | ---------------------------------------------------------------- |
| Error   | `.help .help-error`   | <p class="help help-error margin-top-none">Error message</p>     |
| Warning | `.help .help-warning` | <p class="help help-warning margin-top-none">Warning message</p> |
| Success | `.help .help-success` | <p class="help help-success margin-top-none">Success message</p> |

```html
<label class="label">
	Label
	<input class="input input-error" type="text" placeholder="Placeholder" />
</label>
<p class="help help-error">Error message</p>
```
