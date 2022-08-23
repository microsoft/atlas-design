---
title: Card
description: Card patterns in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwKIbxNQ2kXnglOPc2cDE1y%2FFINAL-REBRAND-DESIGNS%3Fnode-id%3D70%253A2398
---

# Card patterns

Because the `.card` component has so many possible permutations, it can be helpful to provide examples of certain styles.

## Content type card

This card type contains a super title labelled by the card's type, a title, an icon, and a section to place metadata specific to the content type. Its footer has two sections: a lefthand section for status and progress, and a righthand section for buttons. It also uses border atomics to create a lefthand border.

```html
<div class="card border-left-lg border-left-color-accent">
	<div class="card-template">
		<p class="card-supertitle">content type</p>
		<a href="#" class="card-title">The headline of the content item</a>
		<img
			aria-hidden="true"
			class="card-template-icon"
			src="https://docs.microsoft.com/en-us/learn/achievements/review-microsoft-azure-pricing-slas-lifecycles.svg"
		/>
		<div class="card-template-detail">
			<p>Place card details items here.</p>
		</div>
	</div>
	<div class="card-footer">
		<div class="card-footer-item">
			<span class="color-success">
				<span>Completed</span>
				<span class="icon"
					><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color">
						<path
							d="M160 397.255L9.373 246.627l45.255-45.254L160 306.745 393.373 73.373l45.254 45.255L160 397.255z"
						/></svg></span
			></span>
		</div>
		<div class="card-footer-item">
			<div class="buttons">
				<button class="button button-clear button-sm">Share</button>
				<button class="button button-primary button-sm">Save</button>
			</div>
		</div>
	</div>
</div>
```

## Resource card

This card pattern makes use of the outer `.card` class and includes the use of the [`.media`](../components/media.md) and [`.image`](../components/image.md) components inside it.

```html
<article class="card position-relative">
	<div class="card-content">
		<div class="media">
			<div class="media-left">
				<div class="image image-64x64">
					<img src="~/src/scaffold/media/video-media.png" />
				</div>
			</div>
			<div class="media-content">
				<p class="text-transform-uppercase margin-bottom-xxs">Videos</p>
				<p class="font-size-lg font-weight-semibold margin-bottom-xxs">
					Media content is a place to put your text content.
				</p>
				<p class="color-text-subtle margin-bottom-xs">Videos to help you get started.</p>
				<a class="text-decoration-none stretched-link" href="#">Watch videos</a>
			</div>
		</div>
	</div>
</article>
```
