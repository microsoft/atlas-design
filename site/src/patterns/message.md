---
title: Message
description: The message component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FamgDNGgGYy2v2Unc6Eet46%2FQ%2526A-Private-Messages%3Fpage-id%3D0%253A1%26type%3Ddesign%26node-id%3D337-533145%26viewport%3D-15969%252C-17033%252C0.75%26scaling%3Dmin-zoom%26starting-point-node-id%3D337%253A548136%26show-proto-sidebar%3D1%26mode%3Ddesign%26t%3DXzNRwbG95jzc2Fvd-1
classType: Component
classPrefixes:
  - messages
---

# Message

Use messages component for chat or messaging communications.

## Usage

Here is an example of a standard usage of messages component.

```html
<section class="display-grid gap-sm">
	<article class="display-grid">
		<div class="message">
			<p class="message-time">May 29, 2023, 4:50PM</p>
			<div class="persona message-persona">
				<div class="persona-avatar">
					<span>QA</span>
				</div>
			</div>
			<div class="message-content">
				<div class="margin-bottom-xxs">
					<div class="message-content-header">
						<p class="message-content-display-name">Q&A Moderator</p>
						<details class="message-content-options popover popover-right">
							<summary>
								<span class="icon color-primary">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="1.5 1.5 13 13">
										<path
											d="M8 5.25C7.30964 5.25 6.75 4.69036 6.75 4C6.75 3.30964 7.30964 2.75 8 2.75C8.69036 2.75 9.25 3.30964 9.25 4C9.25 4.69036 8.69036 5.25 8 5.25ZM8 9.25C7.30964 9.25 6.75 8.69036 6.75 8C6.75 7.30964 7.30964 6.75 8 6.75C8.69036 6.75 9.25 7.30964 9.25 8C9.25 8.69036 8.69036 9.25 8 9.25ZM6.75 12C6.75 12.6904 7.30964 13.25 8 13.25C8.69036 13.25 9.25 12.6904 9.25 12C9.25 11.3096 8.69036 10.75 8 10.75C7.30964 10.75 6.75 11.3096 6.75 12Z"
											fill="#75b6e7"
										/>
									</svg>
								</span>
							</summary>
							<div class="popover-content">
								<ul>
									<li>
										<a href="#">Edit Item</a>
									</li>
									<li>
										<a href="#">Remove item</a>
									</li>
								</ul>
							</div>
						</details>
					</div>
					<p class="font-size-xs">Moderator</p>
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
				<figure class="persona-avatar image image-36x36">
					<img src="~/src/scaffold/media/video-media.png" alt="username" />
				</figure>
			</div>
			<div class="message-content">
				<div class="margin-bottom-xxs">
					<div class="message-content-header">
						<p class="message-content-display-name">Kay Smith</p>
						<details class="message-content-options popover popover-right">
							<summary>
								<span class="icon color-primary">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="1.5 1.5 13 13">
										<path
											d="M8 5.25C7.30964 5.25 6.75 4.69036 6.75 4C6.75 3.30964 7.30964 2.75 8 2.75C8.69036 2.75 9.25 3.30964 9.25 4C9.25 4.69036 8.69036 5.25 8 5.25ZM8 9.25C7.30964 9.25 6.75 8.69036 6.75 8C6.75 7.30964 7.30964 6.75 8 6.75C8.69036 6.75 9.25 7.30964 9.25 8C9.25 8.69036 8.69036 9.25 8 9.25ZM6.75 12C6.75 12.6904 7.30964 13.25 8 13.25C8.69036 13.25 9.25 12.6904 9.25 12C9.25 11.3096 8.69036 10.75 8 10.75C7.30964 10.75 6.75 11.3096 6.75 12Z"
											fill="#75b6e7"
										/>
									</svg>
								</span>
							</summary>
							<div class="popover-content">
								<ul>
									<li>
										<a href="#">Edit Item</a>
									</li>
									<li>
										<a href="#">Remove item</a>
									</li>
								</ul>
							</div>
						</details>
					</div>
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
