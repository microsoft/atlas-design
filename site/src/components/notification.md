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

Notification is a colored block meant to alert users of something.

## Usage

Here is an example of a standard usage of notification component.

```html
<div class="notification">
	<p>A notification about something happening in the world <a href="#">Link Text</a></p>
</div>
```

### Notification with title

You can add a title to the notification with an optional icon.

```html
<div class="notification">
	<p class="notification-title">
		<span class="icon" aria-hidden="true">
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M8 0C8.73438 0 9.44271 0.09375 10.125 0.28125C10.8073 0.46875 11.4427 0.739583 12.0312 1.09375C12.6198 1.44792 13.1589 1.86458 13.6484 2.34375C14.138 2.82292 14.5573 3.36198 14.9062 3.96094C15.2552 4.5599 15.5234 5.19792 15.7109 5.875C15.8984 6.55208 15.9948 7.26042 16 8C16 8.73438 15.9062 9.44271 15.7188 10.125C15.5312 10.8073 15.2604 11.4427 14.9062 12.0312C14.5521 12.6198 14.1354 13.1589 13.6562 13.6484C13.1771 14.138 12.638 14.5573 12.0391 14.9062C11.4401 15.2552 10.8021 15.5234 10.125 15.7109C9.44792 15.8984 8.73958 15.9948 8 16C7.26562 16 6.55729 15.9062 5.875 15.7188C5.19271 15.5312 4.55729 15.2604 3.96875 14.9062C3.38021 14.5521 2.84115 14.1354 2.35156 13.6562C1.86198 13.1771 1.44271 12.638 1.09375 12.0391C0.744792 11.4401 0.476562 10.8021 0.289062 10.125C0.101562 9.44792 0.00520833 8.73958 0 8C0 7.26562 0.09375 6.55729 0.28125 5.875C0.46875 5.19271 0.739583 4.55729 1.09375 3.96875C1.44792 3.38021 1.86458 2.84115 2.34375 2.35156C2.82292 1.86198 3.36198 1.44271 3.96094 1.09375C4.5599 0.744792 5.19792 0.476562 5.875 0.289062C6.55208 0.101562 7.26042 0.00520833 8 0ZM9 12V10H7V12H9ZM9 9V4H7V9H9Z"
					fill="currentColor"
				/>
			</svg>
		</span>
		<span>Title</span>
	</p>
	<p>A notification about something happening in the world <a href="#">Link Text</a></p>
</div>
```

### Dismissing notification

Notifications can be dismissed by adding the `data-dismissable` attribute to the `.notification` and `data-dismiss`to the closing button.

If `data-dismissable` attribute is also assigned a `dissapearing` value - notification would slowly fade out.

**Note**: notification's content should be wrapped up with `notification-content` container which helps with correct positioning and spacing of content.

```html
<div class="notification" data-uid="example-notification-uid" data-dismissable="disappearing">
	<div class="notification-content">
		<button
			type="button"
			data-dismiss
			data-notification-dismiss="example-notification-uid"
			class="button-reset button-close line-height-1 border-radius-rounded position-absolute top-0 right-0"
		>
			<span class="visually-hidden">Dismiss notification</span>
			<span class="icon" aria-hidden="true">
				<svg
					width="12"
					height="11"
					viewBox="0 0 12 11"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.41406 0.40625C1.27865 0.40625 1.16146 0.455729 1.0625 0.554688C0.963542 0.653646 0.914062 0.770833 0.914062 0.90625C0.914062 0.96875 0.927083 1.03125 0.953125 1.09375C0.973958 1.15625 1.00781 1.21094 1.05469 1.25781L5.29688 5.5L1.05469 9.74219C0.960938 9.83594 0.914062 9.95312 0.914062 10.0938C0.914062 10.2292 0.963542 10.3464 1.0625 10.4453C1.16146 10.5443 1.27865 10.5938 1.41406 10.5938C1.47656 10.5938 1.53906 10.5833 1.60156 10.5625C1.66406 10.5365 1.71875 10.5 1.76562 10.4531L6.00781 6.21094L10.25 10.4531C10.3438 10.5469 10.4609 10.5938 10.6016 10.5938C10.737 10.5938 10.8542 10.5443 10.9531 10.4453C11.0521 10.3464 11.1016 10.2292 11.1016 10.0938C11.1016 9.95312 11.0547 9.83594 10.9609 9.74219L6.71875 5.5L10.9609 1.25781C11.0078 1.21094 11.0443 1.15625 11.0703 1.09375C11.0911 1.03125 11.1016 0.96875 11.1016 0.90625C11.1016 0.770833 11.0521 0.653646 10.9531 0.554688C10.8542 0.455729 10.737 0.40625 10.6016 0.40625C10.4609 0.40625 10.3438 0.453125 10.25 0.546875L6.00781 4.78906L1.76562 0.546875C1.71875 0.5 1.66406 0.466146 1.60156 0.445312C1.53906 0.419271 1.47656 0.40625 1.41406 0.40625Z"
						fill="currentColor"
					/>
				</svg>
			</span>
		</button>
		<p>Dismissable notification. It would slowly fade out after closing.</p>
	</div>
</div>
<div class="notification margin-top-xs" data-uid="example-notification-uid-2" data-dismissable>
	<div class="notification-content">
		<button
			type="button"
			data-dismiss
			data-notification-dismiss="example-notification-uid-2"
			class="button-reset button-close line-height-1 border-radius-rounded position-absolute top-0 right-0"
		>
			<span class="visually-hidden">Dismiss notification</span>
			<span class="icon" aria-hidden="true">
				<svg
					width="12"
					height="11"
					viewBox="0 0 12 11"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.41406 0.40625C1.27865 0.40625 1.16146 0.455729 1.0625 0.554688C0.963542 0.653646 0.914062 0.770833 0.914062 0.90625C0.914062 0.96875 0.927083 1.03125 0.953125 1.09375C0.973958 1.15625 1.00781 1.21094 1.05469 1.25781L5.29688 5.5L1.05469 9.74219C0.960938 9.83594 0.914062 9.95312 0.914062 10.0938C0.914062 10.2292 0.963542 10.3464 1.0625 10.4453C1.16146 10.5443 1.27865 10.5938 1.41406 10.5938C1.47656 10.5938 1.53906 10.5833 1.60156 10.5625C1.66406 10.5365 1.71875 10.5 1.76562 10.4531L6.00781 6.21094L10.25 10.4531C10.3438 10.5469 10.4609 10.5938 10.6016 10.5938C10.737 10.5938 10.8542 10.5443 10.9531 10.4453C11.0521 10.3464 11.1016 10.2292 11.1016 10.0938C11.1016 9.95312 11.0547 9.83594 10.9609 9.74219L6.71875 5.5L10.9609 1.25781C11.0078 1.21094 11.0443 1.15625 11.0703 1.09375C11.0911 1.03125 11.1016 0.96875 11.1016 0.90625C11.1016 0.770833 11.0521 0.653646 10.9531 0.554688C10.8542 0.455729 10.737 0.40625 10.6016 0.40625C10.4609 0.40625 10.3438 0.453125 10.25 0.546875L6.00781 4.78906L1.76562 0.546875C1.71875 0.5 1.66406 0.466146 1.60156 0.445312C1.53906 0.419271 1.47656 0.40625 1.41406 0.40625Z"
						fill="currentColor"
					/>
				</svg>
			</span>
		</button>
		<p>Dismissable notification.</p>
	</div>
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

| State               | Class                                 |                                                                                                                                  |
| ------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Secondary (default) | `.notification`                       | <div class="notification"><p class="margin-top-none">Default notification <a href="#">Link</a></p></div>                         |
| Success             | `.notification .notification-success` | <div class="notification notification-success"><p class="margin-top-none">Success notification <a href="#">Link</a></p></div>    |
| Danger              | `.notification .notification-danger`  | <div class="notification notification-danger"><p class="margin-top-none">Danger notification <a href="#">Link</a></p></div>      |
| Info                | `.notification .notification-info`    | <div class="notification notification-info"><p class="margin-top-none">Informational notification <a href="#">Link</a></p></div> |
| Primary             | `.notification .notification-primary` | <div class="notification notification-primary"><p class="margin-top-none">Primary notification <a href="#">Link</a></p></div>    |

```abut-html
<div class="notification notification-success">
	<p>Success notification.</p>
</div>
```
