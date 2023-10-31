---
title: Chat
description: The chat pattern in the Atlas Design System
template: standard
---

# Chat Pattern

The following markup utilizes various components and atomics to create a chat experience. As you can see from the example below, we create a grid container and place several `.message` components within. In each message we make use of `.persona` to display a user's information, and a `popover` to house the overflow menu and its contents.

```html
<section class="display-grid gap-sm">
	<article class="display-grid">
		<div class="message">
			<p class="message-time">May 29, 2023, 4:50PM</p>
			<div class="persona message-persona">
				<figure class="persona-avatar">
					<img src="~/src/scaffold/media/avatar.png" alt="Avatar for Jane Doe" />
				</figure>
			</div>
			<div class="message-content">
				<div class="message-content-header">
					<div class="persona">
						<div class="persona-details">
							<p class="persona-name">Q&A Moderator</p>
							<p>Moderator</p>
						</div>
					</div>
					<details class="message-content-options popover popover-right">
						<summary class="button button-clear button-primary">⋮</summary>
						<div class="popover-content padding-none">
							<button
								data-page-action-item="overflow-mobile"
								type="button"
								class="justify-content-flex-start button-block button-sm has-inner-focus button button-clear"
								data-bi-name="contents-expand"
								data-contents-button=""
								data-popover-close=""
							>
								Edit message
							</button>
							<button
								data-page-action-item="overflow-mobile"
								type="button"
								class="justify-content-flex-start button-block button-sm has-inner-focus button button-clear"
								data-bi-name="contents-expand"
								data-contents-button=""
								data-popover-close=""
							>
								Delete message
							</button>
						</div>
					</details>
				</div>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ullamcorper velit sed ullamcorper morbi tincidunt ornare
					massa eget egestas. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis
					feugiat.
				</p>
			</div>
		</div>
	</article>
	<article class="display-grid">
		<div class="message message-sender">
			<p class="message-time">May 29, 2023, 4:55PM</p>
			<div class="persona message-persona">
				<figure class="persona-avatar">
					<img src="~/src/scaffold/media/avatar.png" alt="Avatar for Jane Doe" />
				</figure>
			</div>
			<div class="message-content">
				<div class="message-content-header">
					<div class="persona">
						<div class="persona-details">
							<p class="persona-name">Kay Smith</p>
						</div>
					</div>
					<details class="message-content-options popover popover-right">
						<summary class="button button-clear">⋮</summary>
						<div class="popover-content padding-none">
							<button
								data-page-action-item="overflow-mobile"
								type="button"
								class="justify-content-flex-start button-block button-sm has-inner-focus button button-clear"
								data-bi-name="contents-expand"
								data-contents-button=""
								data-popover-close=""
							>
								<span>Edit message</span>
							</button>
							<button
								data-page-action-item="overflow-mobile"
								type="button"
								class="justify-content-flex-start button-block button-sm has-inner-focus button button-clear"
								data-bi-name="contents-expand"
								data-contents-button=""
								data-popover-close=""
							>
								<span>Delete message</span>
							</button>
						</div>
					</details>
				</div>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Viverra aliquet eget sit amet tellus cras. Nisl nisi
					scelerisque eu ultrices vitae. Condimentum id venenatis a condimentum. Ut eu sem integer
					vitae.
				</p>
			</div>
		</div>
	</article>
</section>
```
