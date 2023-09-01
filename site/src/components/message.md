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
			<figure class="message-avatar image image-36x36">
				<img
					class="background-color-body-medium border-radius-rounded"
					src="~/src/scaffold/media/video-media.png"
					alt
				/>
			</figure>
			<div class="message-content">
				<div class="margin-bottom-xxs">
					<div class="message-content-head">
						<p class="message-content-display-name">Q&A Moderator</p>
						<details class="message-content-options popover">
							<summary>
								<span class="icon color-primary">
									<svg
										class="fill-current-color"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 2048 2048"
									>
										<path
											d="M256 896q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm768 0q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm768 0q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10z"
										/>
									</svg>
								</span>
							</summary>
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
		<div class="message message-right">
			<p class="message-time">May 29, 2023, 4:55PM</p>
			<figure class="message-avatar image image-36x36" aria-hidden="true">
				<img
					class="background-color-body-medium border-radius-rounded"
					src="~/src/scaffold/media/video-media.png"
					alt
				/>
			</figure>
			<div class="message-content">
				<div class="margin-bottom-xxs">
					<div class="message-content-head">
						<p class="message-content-display-name">Kay Smith</p>
						<details class="message-content-options popover">
							<summary>
								<span class="icon color-primary">
									<svg
										class="fill-current-color"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 2048 2048"
									>
										<path
											d="M256 896q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm768 0q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm768 0q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10z"
										/>
									</svg>
								</span>
							</summary>
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
