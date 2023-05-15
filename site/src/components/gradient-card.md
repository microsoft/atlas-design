---
title: Gradient card
description: The gradient card component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - gradient-card
---

# Gradient card

The `.gradient-card` class contains a predefined gradient border, default border width and default border radius. The inner `.gradient-card-content` element has a default background color and padding but can be modified by Atomic classes.

```html
<div class="gradient-card tag border-radius-rounded">
	<div class="gradient-card-content">
		<p>Gradient card default</p>
	</div>
</div>
```

```html
<div class="gradient-card">
	<div class="gradient-card-content background-color-body-medium padding-md">
		<p>Gradient card with atomics</p>
	</div>
</div>
```

## Usage

Gradient cards are used to bring attention to a section or for notification messages. Here is a common use case.

```html
<div class="gradient-card">
	<div class="gradient-card-content">
		<p>
			<span class="icon border border-color-primary margin-right-xxs"></span>
			The gradient card calls attention to the notification text. <a href="#">Call to action</a>
		</p>
	</div>
</div>
```
