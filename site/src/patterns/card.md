---
title: Card
description: Card patterns in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwKIbxNQ2kXnglOPc2cDE1y%2FFINAL-REBRAND-DESIGNS%3Fnode-id%3D70%253A2398
---

# Card patterns

Because the `.card` component has so many possible permutations, it can be helpful to provide examples of certain styles.

## Content type card

This card type contains a super title labelled the card's type, a title, an icon, and a section to place metadata specific to the content type. Its footer has two sections: a lefthand secton for status and progress, and a righthand section for buttons. It also uses border atomics to create a lefthand border.

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
			<button class="button button-clear button-sm">Save</button>
			<button class="button button-primary button-filled button-sm">Start</button>
		</div>
	</div>
</div>
```
