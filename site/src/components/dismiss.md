---
title: Dismiss
description: The dismiss component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - dismiss
---

# Dismiss

Dismiss is a component can be used within any other component that can be removed from the page. For example, modal, notification, banner, etc.

## Usage

Dismissal functionality requires two parts:

1. The dismiss component, which has the `data-dismiss` attribute
2. The parent component to dismiss, which has the `data-dismissable` attribute

Here is an example of a basic usage of dismiss component.

```html
<div class="padding-md border" id="example-dismiss-01" data-dismissable>
	<p class="margin-bottom-xs">Dismissable</p>
	<button type="button" data-bi-name="close" data-dismiss>Dismiss</button>
</div>
```

**Note:** the dismiss styles/positioning can be adjusted within the component it is applied to.

### Animating disappearance

To animate component's disappearance, add `data-dismiss-animation` attribute to the dismissable component with one of these values:

- `fade` will make component slowly fade out.
- `slide-up` will make component fading while sliding up.

```html
<div
	class="padding-md border"
	id="example-dismiss-02"
	data-dismissable
	data-dismiss-animation="fade"
>
	<p class="margin-bottom-xs">Dismissable. Fades out</p>
	<button type="button" data-bi-name="close" data-dismiss>Dismiss</button>
</div>

<div
	class="padding-md border margin-top-sm"
	id="example-dismiss-03"
	data-dismissable
	data-dismiss-animation="slide-up"
>
	<p class="margin-bottom-xs">Dismissable. Fades while sliding up.</p>
	<button type="button" data-bi-name="close" data-dismiss>Dismiss</button>
</div>
```
