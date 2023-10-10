---
title: Chat
description: The chat pattern in the Atlas Design System
template: standard
---

# Chat Pattern

The message conversation would be used in the following manner.

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
				<div class="persona message-content-header">
					<div class="persona-details">
						<p class="persona-name font-weight-semibold">Q&A Moderator</p>
						<p class="font-size-xs">Moderator</p>
					</div>
					<details class="message-content-options popover popover-right">
						<summary class="button button-clear button-primary">
							<span class="icon">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="1.5 1.5 13 13">
									<path
										d="M8 5.25C7.30964 5.25 6.75 4.69036 6.75 4C6.75 3.30964 7.30964 2.75 8 2.75C8.69036 2.75 9.25 3.30964 9.25 4C9.25 4.69036 8.69036 5.25 8 5.25ZM8 9.25C7.30964 9.25 6.75 8.69036 6.75 8C6.75 7.30964 7.30964 6.75 8 6.75C8.69036 6.75 9.25 7.30964 9.25 8C9.25 8.69036 8.69036 9.25 8 9.25ZM6.75 12C6.75 12.6904 7.30964 13.25 8 13.25C8.69036 13.25 9.25 12.6904 9.25 12C9.25 11.3096 8.69036 10.75 8 10.75C7.30964 10.75 6.75 11.3096 6.75 12Z"
										fill="#75b6e7"
									/>
								</svg>
							</span>
						</summary>
						<div class="popover-content padding-none">
							<button
								data-page-action-item="overflow-mobile"
								type="button"
								class="justify-content-flex-start button-block button-sm has-inner-focus button button-clear"
								data-bi-name="contents-expand"
								data-contents-button=""
								data-popover-close=""
							>
								<span class="contents-expand-title">Edit message</span>
							</button>
							<button
								data-page-action-item="overflow-mobile"
								type="button"
								class="justify-content-flex-start button-block button-sm has-inner-focus button button-clear"
								data-bi-name="contents-expand"
								data-contents-button=""
								data-popover-close=""
							>
								<span class="contents-expand-title">Delete message</span>
							</button>
						</div>
					</details>
				</div>
				<p class="font-size-md">
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
				<div class="persona message-content-header">
					<div class="persona-details">
						<p class="persona-name font-weight-semibold">Kay Smith</p>
					</div>
					<details class="message-content-options popover popover-right">
						<summary class="button button-clear button-primary">
							<span class="icon">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="1.5 1.5 13 13">
									<path
										d="M8 5.25C7.30964 5.25 6.75 4.69036 6.75 4C6.75 3.30964 7.30964 2.75 8 2.75C8.69036 2.75 9.25 3.30964 9.25 4C9.25 4.69036 8.69036 5.25 8 5.25ZM8 9.25C7.30964 9.25 6.75 8.69036 6.75 8C6.75 7.30964 7.30964 6.75 8 6.75C8.69036 6.75 9.25 7.30964 9.25 8C9.25 8.69036 8.69036 9.25 8 9.25ZM6.75 12C6.75 12.6904 7.30964 13.25 8 13.25C8.69036 13.25 9.25 12.6904 9.25 12C9.25 11.3096 8.69036 10.75 8 10.75C7.30964 10.75 6.75 11.3096 6.75 12Z"
										fill="#75b6e7"
									/>
								</svg>
							</span>
						</summary>
						<div class="popover-content padding-none">
							<button
								data-page-action-item="overflow-mobile"
								type="button"
								class="justify-content-flex-start button-block button-sm has-inner-focus button button-clear"
								data-bi-name="contents-expand"
								data-contents-button=""
								data-popover-close=""
							>
								<span class="contents-expand-title">Edit message</span>
							</button>
							<button
								data-page-action-item="overflow-mobile"
								type="button"
								class="justify-content-flex-start button-block button-sm has-inner-focus button button-clear"
								data-bi-name="contents-expand"
								data-contents-button=""
								data-popover-close=""
							>
								<span class="contents-expand-title">Delete message</span>
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
