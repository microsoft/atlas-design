---
title: Chat
description: The chat pattern in the Atlas Design System
template: standard
---

# Chat

The chat pattern is one that composes an input with messages between the user and one or more other entities.

## Chat input

For a copilot-friendly input, with a series of buttons placed within the visual (not semantic) boundaries of the textarea, use the [.textarea-form](../components/textarea.md#textarea-with-footer) component.

```html
<div class="textarea-form">
	<textarea
		class="textarea"
		rows="3"
		placeholder="Ask a question or describe what you'd like to do"
	></textarea>
	<div class="textarea-form-footer">
		<div class="textarea-form-footer-left">
			<span class="margin-left-xxs color-text-subtle">0 / 500</span>
		</div>
		<div class="textarea-form-footer-right">
			<button class="button button-clear" aria-label="Attach (non functional)">
				<span class="icon font-size-lg">
					<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g>
							<path
								class="fill-current-color"
								d="M4.82841 10.4848L10.4853 4.8279C11.6568 3.65633 13.5563 3.65633 14.7279 4.8279C15.8995 5.99947 15.8995 7.89897 14.7279 9.07054L8.01039 15.7881C7.4246 16.3738 6.47485 16.3738 5.88907 15.7881C5.30328 15.2023 5.30328 14.2525 5.88907 13.6667L11.8995 7.65633C12.0947 7.46106 12.0947 7.14448 11.8995 6.94922C11.7042 6.75396 11.3876 6.75396 11.1924 6.94922L5.18196 12.9596C4.20565 13.9359 4.20565 15.5189 5.18196 16.4952C6.15827 17.4715 7.74118 17.4715 8.71749 16.4952L15.435 9.77765C16.9971 8.21555 16.9971 5.68289 15.435 4.12079C13.8729 2.55869 11.3403 2.55869 9.77815 4.12079L4.1213 9.77765C3.92604 9.97291 3.92604 10.2895 4.1213 10.4848C4.31656 10.68 4.63315 10.68 4.82841 10.4848Z"
							/>
						</g>
					</svg>
				</span>
			</button>
			<span class="textarea-form-footer-divider" aria-hidden="true"></span>
			<button class="button button-clear" aria-label="Send">
				<span class="icon font-size-lg">
					<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
						<path
							class="fill-current-color"
							d="M4.12775 6.9639C3.50837 5.06496 5.48618 3.36055 7.27283 4.2536L42.7565 21.9901C44.4152 22.8192 44.4152 25.1862 42.7565 26.0153L7.27283 43.7518C5.48618 44.6448 3.50837 42.9404 4.12775 41.0415L9.68537 24.0027L4.12775 6.9639ZM11.9073 25.2527L6.68995 41.2482L41.1914 24.0027L6.68995 6.75717L11.9073 22.7527H28.7502C29.4405 22.7527 30.0002 23.3123 30.0002 24.0027C30.0002 24.693 29.4405 25.2527 28.7502 25.2527H11.9073Z"
						/>
					</svg>
				</span>
			</button>
		</div>
	</div>
</div>
```

### Error / Help message

Show an error or help message for the `textarea-form` by using the `help` component. According to Copilot standard, the textarea stays outlined in blue instead of outlined in red, even if the help message is using the `danger` color.

```html
<div class="textarea-form">
	<textarea
		class="textarea"
		rows="2"
		placeholder="Ask a question or describe what you'd like to do"
	></textarea>
	<div class="help help-danger margin-left-xxs">
		<span class="icon" aria-hidden="true">
			<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="fill-current-color">
				<path
					d="M8 0C8.73438 0 9.44271 0.09375 10.125 0.28125C10.8073 0.46875 11.4427 0.739583 12.0312 1.09375C12.6198 1.44792 13.1589 1.86458 13.6484 2.34375C14.138 2.82292 14.5573 3.36198 14.9062 3.96094C15.2552 4.5599 15.5234 5.19792 15.7109 5.875C15.8984 6.55208 15.9948 7.26042 16 8C16 8.73438 15.9062 9.44271 15.7188 10.125C15.5312 10.8073 15.2604 11.4427 14.9062 12.0312C14.5521 12.6198 14.1354 13.1589 13.6562 13.6484C13.1771 14.138 12.638 14.5573 12.0391 14.9062C11.4401 15.2552 10.8021 15.5234 10.125 15.7109C9.44792 15.8984 8.73958 15.9948 8 16C7.26562 16 6.55729 15.9062 5.875 15.7188C5.19271 15.5312 4.55729 15.2604 3.96875 14.9062C3.38021 14.5521 2.84115 14.1354 2.35156 13.6562C1.86198 13.1771 1.44271 12.638 1.09375 12.0391C0.744792 11.4401 0.476562 10.8021 0.289062 10.125C0.101562 9.44792 0.00520833 8.73958 0 8C0 7.26562 0.09375 6.55729 0.28125 5.875C0.46875 5.19271 0.739583 4.55729 1.09375 3.96875C1.44792 3.38021 1.86458 2.84115 2.34375 2.35156C2.82292 1.86198 3.36198 1.44271 3.96094 1.09375C4.5599 0.744792 5.19792 0.476562 5.875 0.289062C6.55208 0.101562 7.26042 0.00520833 8 0ZM9 12V10H7V12H9ZM9 9V4H7V9H9Z"
				/>
			</svg>
		</span>
		<span>Please type a message to continue</span>
	</div>
	<div class="textarea-form-footer">
		<div class="textarea-form-footer-left">
			<span class="margin-left-xxs color-text-subtle">0 / 500</span>
		</div>
		<div class="textarea-form-footer-right">
			<button class="button button-clear" aria-label="Attach (non functional)">
				<span class="icon font-size-lg">
					<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g>
							<path
								class="fill-current-color"
								d="M4.82841 10.4848L10.4853 4.8279C11.6568 3.65633 13.5563 3.65633 14.7279 4.8279C15.8995 5.99947 15.8995 7.89897 14.7279 9.07054L8.01039 15.7881C7.4246 16.3738 6.47485 16.3738 5.88907 15.7881C5.30328 15.2023 5.30328 14.2525 5.88907 13.6667L11.8995 7.65633C12.0947 7.46106 12.0947 7.14448 11.8995 6.94922C11.7042 6.75396 11.3876 6.75396 11.1924 6.94922L5.18196 12.9596C4.20565 13.9359 4.20565 15.5189 5.18196 16.4952C6.15827 17.4715 7.74118 17.4715 8.71749 16.4952L15.435 9.77765C16.9971 8.21555 16.9971 5.68289 15.435 4.12079C13.8729 2.55869 11.3403 2.55869 9.77815 4.12079L4.1213 9.77765C3.92604 9.97291 3.92604 10.2895 4.1213 10.4848C4.31656 10.68 4.63315 10.68 4.82841 10.4848Z"
							/>
						</g>
					</svg>
				</span>
			</button>
			<span class="textarea-form-footer-divider" aria-hidden="true"></span>
			<button class="button button-clear" aria-label="Send">
				<span class="icon font-size-lg">
					<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
						<path
							class="fill-current-color"
							d="M4.12775 6.9639C3.50837 5.06496 5.48618 3.36055 7.27283 4.2536L42.7565 21.9901C44.4152 22.8192 44.4152 25.1862 42.7565 26.0153L7.27283 43.7518C5.48618 44.6448 3.50837 42.9404 4.12775 41.0415L9.68537 24.0027L4.12775 6.9639ZM11.9073 25.2527L6.68995 41.2482L41.1914 24.0027L6.68995 6.75717L11.9073 22.7527H28.7502C29.4405 22.7527 30.0002 23.3123 30.0002 24.0027C30.0002 24.693 29.4405 25.2527 28.7502 25.2527H11.9073Z"
						/>
					</svg>
				</span>
			</button>
		</div>
	</div>
</div>
```

## Copilot-like chat messages

To mimic a copilot chat experience, apply `message-sm`, `message-sender`, and `width-auto` to automatically fit to the width of the sender's message. For the AI responses (`message-sm`), the message will take up the full width.

```html
<article class="message message-sm message-sender width-auto">
	<div class="message-content">
		<p>Ask a short question</p>
	</div>
</article>
<article class="message message-sm">
	<div class="message-content">
		<p>
			Respond with a much longer answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
			sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper velit sed
			ullamcorper morbi tincidunt ornare massa eget egestas. Pellentesque elit ullamcorper dignissim
			cras tincidunt lobortis feugiat.
		</p>
	</div>
</article>
<article class="message message-sm message-sender">
	<div class="message-content">
		<p>
			Ask a very long question. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
			eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper velit sed ullamcorper
			morbi tincidunt ornare massa eget egestas. Pellentesque elit ullamcorper dignissim cras
			tincidunt lobortis feugiat.
		</p>
	</div>
</article>
<article class="message message-sm">
	<div class="message-content">
		<p>Short response.</p>
	</div>
</article>
```

If you want the full-width message, then only use `message-sm` and `message-sender` on the sender's message.

```html
<article class="message message-sm message-sender">
	<div class="message-content">
		<p>Ask a short question</p>
	</div>
</article>
<article class="message message-sm">
	<div class="message-content">
		<p>Short response.</p>
	</div>
</article>
```

## Messages

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
