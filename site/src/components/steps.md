---
title: Steps
description: The steps component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com/design/7raji0IWkuBRxs5kLiADgI/Copilot-Web-UI-kit?node-id=70108-9255&node-type=frame&t=G0FoPLEXPee1yysa-0
classType: Component
classPrefixes:
  - steps
  - step
---

# Steps

Used to indicate the user's location in a finite progression. These steps are not interactive.

For example, as a user progresses through 5 items, you would see something like this:

```html
<div class="steps padding-xxs">
	<div class="step step-selected"></div>
	<div class="step"></div>
	<div class="step"></div>
	<div class="step"></div>
	<div class="step"></div>
</div>
<div class="steps padding-xxs">
	<div class="step"></div>
	<div class="step step-selected"></div>
	<div class="step"></div>
	<div class="step"></div>
	<div class="step"></div>
</div>
<div class="steps padding-xxs">
	<div class="step"></div>
	<div class="step"></div>
	<div class="step step-selected"></div>
	<div class="step"></div>
	<div class="step"></div>
</div>
<div class="steps padding-xxs">
	<div class="step"></div>
	<div class="step"></div>
	<div class="step"></div>
	<div class="step step-selected"></div>
	<div class="step"></div>
</div>
<div class="steps padding-xxs">
	<div class="step"></div>
	<div class="step"></div>
	<div class="step"></div>
	<div class="step"></div>
	<div class="step step-selected"></div>
</div>
```
