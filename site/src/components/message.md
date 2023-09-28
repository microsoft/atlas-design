---
title: Message
description: The message component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - message
---

# Message

Use message component for chat or messaging communications.

## Usage

Here is an example of a standard usage of message component.

```html
<article class="message">
	<p class="message-time">May 29, 2023, 4:50PM</p>
	<div class="persona message-persona">
		<figure class="persona-avatar">
			<img src="~/src/scaffold/media/avatar.png" alt="Avatar for Jane Doe" />
		</figure>
	</div>
	<div class="message-content">
		<div class="margin-bottom-xxs">
			<div class="message-content-header">
				<div class="display-grid align-items-center">
					<p class="message-content-display-name">Q&A Moderator</p>
					<p class="font-size-xs">Moderator</p>
				</div>
				<div class="message-content-options">
					<span>⋮</span>
				</div>
			</div>
		</div>
		<p class="font-size-md">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa
			eget egestas. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat.
		</p>
	</div>
</article>
```

Use the `message-sender` class to indicate message sent by the user.

```html
<article class="message message-sender">
	<p class="message-time">May 29, 2023, 4:55PM</p>
	<div class="persona message-persona">
		<figure class="persona-avatar">
			<img src="~/src/scaffold/media/avatar.png" alt="Avatar for Jane Doe" />
		</figure>
	</div>
	<div class="message-content">
		<div class="margin-bottom-xxs">
			<div class="message-content-header">
				<div class="display-grid align-items-center">
					<p class="message-content-display-name">Kay Smith</p>
				</div>
				<div class="message-content-options">
					<span>⋮</span>
				</div>
			</div>
		</div>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Viverra aliquet eget sit amet tellus cras. Nisl nisi
			scelerisque eu ultrices vitae. Condimentum id venenatis a condimentum. Ut eu sem integer
			vitae.
		</p>
	</div>
</article>
```
