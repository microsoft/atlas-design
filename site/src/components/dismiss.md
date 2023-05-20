---
title: Dismiss
description: The dismiss component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - dismiss
---

# Dismiss

Dismiss component can be used within any other component that can be removed from the page. For example, modal, notification, banner, etc.

```html
<button type="button" class="dismiss" data-dismiss data-bi-name="close">
	<span class="visually-hidden">Dismiss</span>
	<span class="icon" aria-hidden="true">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color">
			<path
				d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"
			/>
		</svg>
	</span>
</button>
```

## Usage

There are a few things to keep in mind when using dismiss component:

- dismiss component has to have the `data-dismiss` attribute
- the component it is used within has to have `data-dismissable` attribute

Below is an example usage with `notification` component.

```html
<div class="notification" id="example-notification-01" data-dismissable data-testid="notification">
	<p>Dismissable notification.</p>
	<button
		type="button"
		data-dismiss
		data-bi-name="close"
		class="dismiss"
		data-testid="notification-dismiss"
	>
		<span class="visually-hidden">Dismiss notification</span>
		<span class="icon" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color">
				<path
					d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"
				/>
			</svg>
		</span>
	</button>
</div>
```

### Animating disappearance

There are two options available to animate component's disappearance. Adding `disappearing` attribute to the dismissable component will make it slowly fade out.

Assigning `slide-up` value to the `disappearing` attribute will make component fading while sliding up.

```html
<div class="notification" id="example-notification-02" data-dismissable disappearing>
	<p>Dismissable notification that fades out.</p>
	<button type="button" data-dismiss data-bi-name="close" class="dismiss">
		<span class="visually-hidden">Dismiss notification</span>
		<span class="icon" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color">
				<path
					d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"
				/>
			</svg>
		</span>
	</button>
</div>

<div
	class="notification margin-top-sm"
	id="example-notification-03"
	data-dismissable
	disappearing="slide-up"
>
	<p>Dismissable notification that fades while sliding up.</p>
	<button type="button" data-dismiss data-bi-name="close" class="dismiss">
		<span class="visually-hidden">Dismiss notification</span>
		<span class="icon" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color">
				<path
					d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"
				/>
			</svg>
		</span>
	</button>
</div>
```
