---
title: Notification
description: The Notification component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D1002%253A7106%26t%3DWU64bU98uaT1nU7A-1
classType: Component
classPrefixes:
  - notification
---

# Notification

Notification is a colored block meant to inform users of something.

## Usage

Here is an example of a standard usage of notification component.

```html
<div class="notification">
	<p>A notification about something happening in the world <a href="#">Link</a></p>
</div>
```

### Notification with title

You can add a title to the notification with an optional icon.

```html
<div class="notification">
	<p class="notification-title">
		<span class="icon" aria-hidden="true">
			<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="fill-current-color">
				<path
					d="M8 0C8.73438 0 9.44271 0.09375 10.125 0.28125C10.8073 0.46875 11.4427 0.739583 12.0312 1.09375C12.6198 1.44792 13.1589 1.86458 13.6484 2.34375C14.138 2.82292 14.5573 3.36198 14.9062 3.96094C15.2552 4.5599 15.5234 5.19792 15.7109 5.875C15.8984 6.55208 15.9948 7.26042 16 8C16 8.73438 15.9062 9.44271 15.7188 10.125C15.5312 10.8073 15.2604 11.4427 14.9062 12.0312C14.5521 12.6198 14.1354 13.1589 13.6562 13.6484C13.1771 14.138 12.638 14.5573 12.0391 14.9062C11.4401 15.2552 10.8021 15.5234 10.125 15.7109C9.44792 15.8984 8.73958 15.9948 8 16C7.26562 16 6.55729 15.9062 5.875 15.7188C5.19271 15.5312 4.55729 15.2604 3.96875 14.9062C3.38021 14.5521 2.84115 14.1354 2.35156 13.6562C1.86198 13.1771 1.44271 12.638 1.09375 12.0391C0.744792 11.4401 0.476562 10.8021 0.289062 10.125C0.101562 9.44792 0.00520833 8.73958 0 8C0 7.26562 0.09375 6.55729 0.28125 5.875C0.46875 5.19271 0.739583 4.55729 1.09375 3.96875C1.44792 3.38021 1.86458 2.84115 2.34375 2.35156C2.82292 1.86198 3.36198 1.44271 3.96094 1.09375C4.5599 0.744792 5.19792 0.476562 5.875 0.289062C6.55208 0.101562 7.26042 0.00520833 8 0ZM9 12V10H7V12H9ZM9 9V4H7V9H9Z"
				/>
			</svg>
		</span>
		<span>Title</span>
	</p>
	<p>A notification about something happening in the world <a href="#">Link</a></p>
</div>
```

### Loading notification

Ensure the user knows they need to wait for some event in order to interact with a notification.

```html
<div class="notification is-loading">
	<p>Loading notification.</p>
</div>
```

## Semantic colors

| State   | Class                                 | Example                                                                                                                          |
| ------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Default | `.notification`                       | <div class="notification"><p class="margin-top-none">Default notification <a href="#">Link</a></p></div>                         |
| Success | `.notification .notification-success` | <div class="notification notification-success"><p class="margin-top-none">Success notification <a href="#">Link</a></p></div>    |
| Danger  | `.notification .notification-danger`  | <div class="notification notification-danger"><p class="margin-top-none">Danger notification <a href="#">Link</a></p></div>      |
| Info    | `.notification .notification-info`    | <div class="notification notification-info"><p class="margin-top-none">Informational notification <a href="#">Link</a></p></div> |
| Primary | `.notification .notification-primary` | <div class="notification notification-primary"><p class="margin-top-none">Primary notification <a href="#">Link</a></p></div>    |

```abut-html
<div class="notification notification-success">
	<p>Success notification.</p>
</div>
```
