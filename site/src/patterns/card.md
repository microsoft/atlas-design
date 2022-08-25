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
<article class="card border-left-lg border-left-color-accent">
	<div class="card-template">
		<p class="card-supertitle">content type</p>
		<a href="#" class="card-title">The headline of the content item</a>
		<img
			alt="Write alt text here or if image is presentational only add aria-hidden attribute"
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
</article>
```

## Icon card

This card pattern makes use of the outer `.card` class and includes the use of the [`.media`](../components/media.md) and [`.image`](../components/image.md) components inside it. Also, because there is only one clickable element inside, it uses the [`.stretched-link` component](../components/stretched-link.md). There are also several flexbox based atomics applied inside `.media` to ensure links justify at the ends of cards when placed in a grid.

```html
<article class="card position-relative">
	<div class="card-content display-flex">
		<div class="media align-items-stretch">
			<div class="media-left">
				<div class="image image-64x64">
					<img
						alt="Write alt text here or if image is presentational only add aria-hidden attribute"
						src="~/src/scaffold/media/video-media.png"
					/>
				</div>
			</div>
			<div class="media-content display-flex flex-direction-column">
				<div>
					<p class="text-transform-uppercase margin-bottom-xxs">Videos</p>
					<p class="font-size-lg font-weight-semibold margin-bottom-xxs">
						Media content is a place to put your text content.
					</p>
					<p class="color-text-subtle margin-bottom-xs">Videos to help you get started.</p>
				</div>
				<a class="justify-self-stretch stretched-link margin-top-auto" href="#">Watch videos</a>
			</div>
		</div>
	</div>
</article>
```

## Summary card

These cards use standard `.card` subcomponents, border atomics to create a left border, and (because they have only one clickable item inside) the [stretched-link component](../components/stretched-link.md). They use `.card-content-description` to truncate a string of summary text. Note that these will typically not be full-width elements, but will be displayed side-by-side with other cards of this type.

```html
<article class="card position-relative border-left-lg border-left-color-accent">
	<div class="card-content">
		<a href="#" class="card-title stretched-link">The title of the card</a>
		<p class="card-content-description">
			The longer description of the card, which will eventually become truncated the more we repeat
			this sentence. The longer description of the card, which will eventually become truncated the
			more we repeat this sentence. The longer description of the card, which will eventually become
			truncated the more we repeat this sentence. The longer description of the card, which will
			eventually become truncated the more we repeat this sentence.
		</p>
	</div>
</article>
```

## Testimonial card

The testimonial card provides a place for a user's opinion to be showcased. Notable modifications from Icon Card include using `border-radius-rounded` on the image, as well as slightly different font and text sizes. There are also several flexbox based atomics applied to ensure links justify at the ends of cards when placed in a grid.

```html
<article class="card">
	<div class="card-content font-size-lg display-flex flex-direction-column">
		<div class="media">
			<div class="media-left">
				<div class="image image-64x64">
					<img
						class="border-radius-rounded"
						alt="Write alt text here or if image is presentational only add aria-hidden attribute"
						src="~/src/scaffold/media/twitter-example.jpeg"
					/>
				</div>
			</div>
			<div class="media-content">
				<p class="font-size-xl font-weight-semibold margin-bottom-xxs">Full Name</p>
				<p href="#">Role</p>
			</div>
		</div>
		<p class="margin-block-xs color-text-subtle">
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
		</p>
		<a href="#" class="display-block margin-top-auto font-size-md">Read this person's story</a>
	</div>
</article>
```
