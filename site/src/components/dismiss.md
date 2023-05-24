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

Dismissal functionality requires two parts:

1. The dismiss component, which has the `data-dismiss` attribute
2. The parent element/container to dismiss, which has the `data-dismissable` attribute

Below is an example usage with `notification` component.

```html
<div class="notification" id="example-notification-01" data-dismissable>
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

To animate component's disappearance, add `data-dismiss-animation` attribute to the dismissable component with one of these values:

- `fade` will make component slowly fade out.
- `slide-up` will make component fading while sliding up.

```html
<div
	class="notification"
	id="example-notification-02"
	data-dismissable
	data-dismiss-animation="fade"
>
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
	data-dismiss-animation="slide-up"
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
