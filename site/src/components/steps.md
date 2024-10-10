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
<p class="visually-hidden">Step 1 of 5</p>
<div class="steps padding-xxs" aria-hidden="true">
	<div class="step step-selected"></div>
	<div class="step"></div>
	<div class="step"></div>
	<div class="step"></div>
	<div class="step"></div>
</div>
<p class="visually-hidden">Step 2 of 5</p>
<div class="steps padding-xxs" aria-hidden="true">
	<div class="step"></div>
	<div class="step step-selected"></div>
	<div class="step"></div>
	<div class="step"></div>
	<div class="step"></div>
</div>
<p class="visually-hidden">Step 3 of 5</p>
<div class="steps padding-xxs" aria-hidden="true">
	<div class="step"></div>
	<div class="step"></div>
	<div class="step step-selected"></div>
	<div class="step"></div>
	<div class="step"></div>
</div>
<p class="visually-hidden">Step 4 of 5</p>
<div class="steps padding-xxs" aria-hidden="true">
	<div class="step"></div>
	<div class="step"></div>
	<div class="step"></div>
	<div class="step step-selected"></div>
	<div class="step"></div>
</div>
<p class="visually-hidden">Step 5 of 5</p>
<div class="steps padding-xxs" aria-hidden="true">
	<div class="step"></div>
	<div class="step"></div>
	<div class="step"></div>
	<div class="step"></div>
	<div class="step step-selected"></div>
</div>
```

## Accessibility concerns

Although the step component is not interactive, it is also not entirely presentational. Thus, it's recommended that you put `aria-hidden` on the component, while including a `visually-hidden` element that communicates the current state of the user's progress through the steps.
