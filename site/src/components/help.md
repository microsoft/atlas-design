---
title: Help
description: Help component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - help
---

# Help

Help component can be paired with form's elements and contain additional information such as an error message, hints, etc.

## Usage

Here is an example of a help component textarea usage paired with an input and a label.

```html
<label class="label margin-bottom-xxs" for="input-demo">Label</label>
<input class="input" id="input-demo" type="text" placeholder="Placeholder" />
<p class="help margin-top-xxs">Help message</p>
```

### Validation states

`help-danger`/`help-success` helps with visual reflection of validation states.

| State   | Class                 | Preview                                                          |
| ------- | --------------------- | ---------------------------------------------------------------- |
| Danger  | `.help .help-danger`  | <p class="help help-danger margin-top-none">Error message</p>    |
| Success | `.help .help-success` | <p class="help help-success margin-top-none">Success message</p> |

```html
<label class="label">
	Label
	<input class="input input-danger margin-top-xxs" type="text" placeholder="Placeholder" />
</label>
<p class="help help-danger margin-top-xxs">Error message</p>
```
