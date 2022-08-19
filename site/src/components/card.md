---
title: Card
description: The card component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D2719%253A10497" allowfullscreen
---

# Card

The card component is useful for representing data and actions associated with a singular entity within a particular content model. A card can represent an article, page, module, learning path, course, certification, or nearly anything else. The component itself can be used in simple or complex ways. It can be used in a highly prescriptive manner or only as a freeform bucket within which other elements can be placed. Because of its many ins-and-outs, several optional subcomponents, and general flexibility, card can yield many different visual outcomes.

This page discusses the component and subcomponents that make up `.card`, but it does not prescribe particular patterns. For examples of specific card builds, look to the [card patterns page](../patterns/card.md) for guidance.

Also note that while many examples below use a width atomic, it's generally advisable not to do this, and to let your card width fit within an otherwise specified layout or grid.

```html
<div class="card width-300">
	<div class="card-template">
		<p class="card-supertitle">Course</p>
		<a href="#" class="card-title">Learn how to create a card component</a>
		<img
			aria-hidden="true"
			class="card-template-icon"
			src="https://docs.microsoft.com/en-us/learn/achievements/review-microsoft-azure-pricing-slas-lifecycles.svg"
		/>
		<div class="card-template-detail">
			<p>Additional details or elements can be placed here.</p>
		</div>
	</div>
	<div class="card-footer">
		<div class="card-footer-item">
			<div class="buttons">
				<button class="button button-clear button-sm">Save</button>
				<button class="button button-primary button-filled button-sm">Start</button>
			</div>
		</div>
	</div>
</div>
```

## Patterns for more accessible content

In each card, you'll also be presented with a choice for what element to assign to the card's title text. It can be tempting to assign this a heading value outside or inside an anchor (`h1-h6 > a`), but be wary that when many cards are presented together, this pattern can severely muddy landmark navigation for screenreader users. For this reason, if a section presents a large set of cards, especially those that lack significant contextual information beyond the title, the recommended element is a simple anchor (`<a>`) for a linked card.

As you'll see in the examples below, the recommended containing element to pair with a `.card` is [`<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article).

Additionally, you can increase the the clickable area of a card with the `.stretched-link` class. However, you should ensure this only happens on cards with a single clickable element. Visit the [stretched link documentation for example usage](./stretched-link.md).

## Card's main subcomponents

The card element encapsulates several subcomponents.

- `.card-header` - an optional section on top of the card.
- `.card-template` - a highly prescriptive layout for the card's main contents. Not intented for compatibility with `.card-content`.
- `.card-content` - a free-form box within which a card's main content can be placed. Intended for use instead of `.card-template` not in addition to it.
- `.card-footer` - an optional section at the bottom of the card. Usually contains actions relevant to the card's subject.

Each of these subcomponents has their own optional subcomponents. They are discussed below.

## The main content area of card

In styling the main content area of a card, it's recommended you look first to `.card-template`, and if that fails, fall back to the less prescriptive `.card-content`.

Both `.card-template` and `.card-content` support the use of several subcomponents. Because they can be used in both `.card-template` and `.card-content`, they are not namespaced by their parent elements, but rather only by `.card-`

- `.card-supertitle` - a uppercase piece of text above the title.
- `.card-title` - the title of the card.

The following can be used only inside `.card-content`.

- `.card-content-description` - a body of text truncated at four lines.

The following can be used only inside `.card-template`.

- `.card-template-icon` - a grid area that houses a small image.
- `.card-template-detail` - a catch all that sits next to the card icon.

```html
<article class="card width-300">
	<div class="card-template">
		<p class="card-supertitle">Course</p>
		<a href="#" class="card-title">Learn how to create a card component</a>
		<img
			aria-hidden="true"
			class="card-template-icon"
			src="https://docs.microsoft.com/en-us/learn/achievements/review-microsoft-azure-pricing-slas-lifecycles.svg"
		/>
		<div class="card-template-detail">
			<p>Additional details might be listed here.</p>
		</div>
		</div>
	</div>
</article>
```

A similar example using `.card-content`, including its only optional subcomponent `card-content-description`.

```html
<article class="card width-300">
	<div class="card-content">
		<p class="card-supertitle">Course</p>
		<a href="#" class="card-title">Learn how to create a card component</a>
		<p class="card-content-description">Additional details might be listed here.</p>
	</div>
</article>
```

## Card footer

The `.card-footer` class is an optional that is often used to display actions related to the card's subject (like "save" or "follow"). Or for display information that doesn't fit well elsewhere, such as progress. It has a child component called `.card-footer-item`. Place `.card-footer-left` or `.card-footer-right` on `.card-footer` (or use flex atomics) to align its inner items as you see fit. Note that the `.buttons` class is well supported in this context and can be added if space between buttons is desired. It's recommended that you use small buttons (`.button-sm`) if placing buttons in this area.

```html
<article class="card width-350">
	<div class="card-content">
		<p class="card-supertitle">Course</p>
		<a href="#" class="card-title">Learn how to create a card component</a>
		<p class="card-content-description">Additional details might be listed here.</p>
	</div>
	<div class="card-footer">
		<div class="card-footer-item">
			<progress style="width: 60px;" max="100" value="70"></progress>
		</div>
		<div class="card-footer-item">
			<div class="buttons">
				<button class="button button-clear button-primary button-sm">Share</button>
				<button class="button button-primary button-filled button-sm">Save</button>
			</div>
		</div>
	</div>
</article>
```

## The card header

The optional `.card-header` class can be used as a container to display anything you'd like pinned at the top of the card. It has only one possible subcomponent, `.card-header-image`. The example below uses several atomics to create a flavorful pattern and tag. Note that this is not a recommended pattern, just an example of the possibilities.

```html
<article class="card width-350">
	<div
		class="card-header position-relative background-size-100 background-image-pattern background-color-body-accent"
		style="--background-image-pattern: url('https://docs.microsoft.com/en-us/media/background-patterns/plus.svg')"
	>
		<div class="card-header-image">
			<img
				aria-hidden="true"
				class="card-template-icon"
				src="https://docs.microsoft.com/en-us/learn/achievements/review-microsoft-azure-pricing-slas-lifecycles.svg"
			/>
		</div>
		<div class="position-absolute top-0 right-0 margin-top-xs margin-right-xxs">
			<span class="border-radius  background-color-body-accent padding-xxs border">NEW</span>
		</div>
	</div>
	<div class="card-content">
		<p class="card-supertitle">Course</p>
		<a href="#" class="card-title">Learn how to create a card component</a>
	</div>
</article>
```

## Wider cards

On certain views, it may be desirable for a particular card to take up a wider space. There are two options for such views.

### A wide card using `.card-template`

The prescriptive `.card-template` subcomponent grows and shrinks well in this scenario with no changes to markup. This should likely be your first choice for this situation.

```html
<article class="card">
	<div class="card-template">
		<p class="card-supertitle">Course</p>
		<a href="#" class="card-title">Learn how to create a card component</a>
		<img
			aria-hidden="true"
			class="card-template-icon"
			src="https://docs.microsoft.com/en-us/learn/achievements/review-microsoft-azure-pricing-slas-lifecycles.svg"
		/>
		<div class="card-template-detail">
			<p>Additional details might be listed here.</p>
		</div>
	</div>
</article>
```

### A wide card using `.card-horizontal`

Another available option is using the `.card-content` inner container, and placing `.card-horizontal` on the `.card` element.

```html
<article class="card card-horizontal">
	<div class="card-header" aria-hidden="true">
		<div class="card-header-image">
			<img src="~/src/scaffold/media/path.svg" />
		</div>
	</div>
	<div class="card-content">
		<p class="card-supertitle">Content type</p>
		<a class="card-title">The title of your content item here.</a>
		<p>Additional metadata can be placed here.</p>
	</div>
</article>
```
