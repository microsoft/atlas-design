---
title: Banner
description: The Banner component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D1002%253A7106%26t%3DWU64bU98uaT1nU7A-1
classType: Component
classPrefixes:
  - banner
---

# Banner

Banner component allows adding a full width notification block to the page.

**This page is best viewed with the content section full screened because banners are intended to be full width elements. Go full screen by clicking the button in the top right corner.**

## Usage

Here is an example of a standard usage of banner component.

```html-no-indent
<section class="banner">
	<p>A banner about something happening in the world <a href="#">Link Text</a></p>
</section>
```

### Banner with title

You can add a title to the banner with an optional icon.

```html-no-indent
<section class="banner">
	<p class="banner-title">
		<span class="icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path d="M7 10.3c-.6 0-1.2-.2-1.7-.5-.5-.2-.9-.6-1.2-1.1S3.7 7.6 3.7 7s.2-1.2.5-1.7.7-.9 1.2-1.2c1-.6 2.3-.6 3.4 0 .5.3.9.7 1.2 1.2s.5 1.1.5 1.7-.2 1.2-.5 1.7c-.4.5-.8.9-1.3 1.2-.5.3-1.1.4-1.7.4zm0-5.6c-.4 0-.8.1-1.1.3-.4.3-.6.5-.9.9-.2.3-.3.7-.3 1.1s.1.8.3 1.1c.3.4.5.6.9.9.7.4 1.6.4 2.2 0 .4-.3.6-.5.9-.9.2-.3.3-.7.3-1.1s-.1-.8-.3-1.1c-.3-.4-.5-.6-.9-.9-.3-.2-.7-.3-1.1-.3zM6.4 0h1.1v2.8H6.4zm0 11.2h1.1V14H6.4zm4.8-4.8H14v1.1h-2.8zm-1.561 3.606l.778-.778 1.98 1.98-.779.778zm.075-6.065l1.98-1.98.778.778-1.98 1.98zM0 6.4h2.8v1.1H0zm1.461-3.567l.778-.777 1.98 1.98-.778.777zm.067 8.429l1.98-1.981.777.777-1.978 1.98z"/></svg>
        </span>
		<span>Title</span>
	</p>
	<p>A banner about something happening in the world <a href="#">Link Text</a></p>
</section>
```

### Dismissing banner

Banners can be dismissed by adding the `data-dismissable` attribute to the `.banner` and `data-dismiss`to the closing button.

If `data-dismissable` attribute is also assigned a `dissapearing` value - banner would slowly slide up.

**Note**: banner's content should be wrapped up with `banner-content` container which helps with correct positioning and spacing of content.

```html-no-indent
<section
	class="banner"
	data-uid="example-banner-uid"
	data-dismissable="disappearing"
>
	<div class="banner-content">
		<button
			type="button"
			data-bi-name="close"
            data-dismiss
			data-banner-dismiss="example-banner-uid"
			class="button-reset button-close line-height-0 border-radius-rounded position-absolute top-0 right-0"
		>
			<span class="visually-hidden">Dismiss banner</span>
			<span class="icon" aria-hidden="true">
				<svg
					width="12"
					height="11"
					viewBox="0 0 12 11"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.41406 0.40625C1.27865 0.40625 1.16146 0.455729 1.0625 0.554688C0.963542 0.653646 0.914062 0.770833 0.914062 0.90625C0.914062 0.96875 0.927083 1.03125 0.953125 1.09375C0.973958 1.15625 1.00781 1.21094 1.05469 1.25781L5.29688 5.5L1.05469 9.74219C0.960938 9.83594 0.914062 9.95312 0.914062 10.0938C0.914062 10.2292 0.963542 10.3464 1.0625 10.4453C1.16146 10.5443 1.27865 10.5938 1.41406 10.5938C1.47656 10.5938 1.53906 10.5833 1.60156 10.5625C1.66406 10.5365 1.71875 10.5 1.76562 10.4531L6.00781 6.21094L10.25 10.4531C10.3438 10.5469 10.4609 10.5938 10.6016 10.5938C10.737 10.5938 10.8542 10.5443 10.9531 10.4453C11.0521 10.3464 11.1016 10.2292 11.1016 10.0938C11.1016 9.95312 11.0547 9.83594 10.9609 9.74219L6.71875 5.5L10.9609 1.25781C11.0078 1.21094 11.0443 1.15625 11.0703 1.09375C11.0911 1.03125 11.1016 0.96875 11.1016 0.90625C11.1016 0.770833 11.0521 0.653646 10.9531 0.554688C10.8542 0.455729 10.737 0.40625 10.6016 0.40625C10.4609 0.40625 10.3438 0.453125 10.25 0.546875L6.00781 4.78906L1.76562 0.546875C1.71875 0.5 1.66406 0.466146 1.60156 0.445312C1.53906 0.419271 1.47656 0.40625 1.41406 0.40625Z"
						fill="currentColor"
					/>
				</svg>
			</span>
		</button>
		<p>A banner about something happening in the world <a href="#">Link Text</a></p>
	</div>
</section>

<section
	class="banner margin-top-xs"
	data-uid="example-banner-uid-2"
	data-dismissable
>
	<div class="banner-content">
		<button
			type="button"
			data-bi-name="close"
            data-dismiss
			data-banner-dismiss="example-banner-uid-2"
			class="button-reset button-close line-height-0 border-radius-rounded position-absolute top-0 right-0"
		>
			<span class="visually-hidden">Dismiss banner</span>
			<span class="icon" aria-hidden="true">
				<svg
					width="12"
					height="11"
					viewBox="0 0 12 11"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.41406 0.40625C1.27865 0.40625 1.16146 0.455729 1.0625 0.554688C0.963542 0.653646 0.914062 0.770833 0.914062 0.90625C0.914062 0.96875 0.927083 1.03125 0.953125 1.09375C0.973958 1.15625 1.00781 1.21094 1.05469 1.25781L5.29688 5.5L1.05469 9.74219C0.960938 9.83594 0.914062 9.95312 0.914062 10.0938C0.914062 10.2292 0.963542 10.3464 1.0625 10.4453C1.16146 10.5443 1.27865 10.5938 1.41406 10.5938C1.47656 10.5938 1.53906 10.5833 1.60156 10.5625C1.66406 10.5365 1.71875 10.5 1.76562 10.4531L6.00781 6.21094L10.25 10.4531C10.3438 10.5469 10.4609 10.5938 10.6016 10.5938C10.737 10.5938 10.8542 10.5443 10.9531 10.4453C11.0521 10.3464 11.1016 10.2292 11.1016 10.0938C11.1016 9.95312 11.0547 9.83594 10.9609 9.74219L6.71875 5.5L10.9609 1.25781C11.0078 1.21094 11.0443 1.15625 11.0703 1.09375C11.0911 1.03125 11.1016 0.96875 11.1016 0.90625C11.1016 0.770833 11.0521 0.653646 10.9531 0.554688C10.8542 0.455729 10.737 0.40625 10.6016 0.40625C10.4609 0.40625 10.3438 0.453125 10.25 0.546875L6.00781 4.78906L1.76562 0.546875C1.71875 0.5 1.66406 0.466146 1.60156 0.445312C1.53906 0.419271 1.47656 0.40625 1.41406 0.40625Z"
						fill="currentColor"
					/>
				</svg>
			</span>
		</button>
		<p>A banner about something happening in the world <a href="#">Link Text</a></p>
	</div>
</section>
```

### Loading banner

Ensure the user knows they need to wait for some event in order to interact with a banner.

```html
<section class="banner is-loading">
	<p>Loading banner.</p>
</section>
```

## Semantic colors (?)

| State   | Class                     |                                                                                                                        |
| ------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Success | `.banner .banner-success` | <section class="banner banner-success"><p class="margin-top-none">Success banner <a href="#">Link</a></p></section>    |
| Danger  | `.banner .banner-danger`  | <section class="banner banner-danger"><p class="margin-top-none">Danger banner <a href="#">Link</a></p></section>      |
| Info    | `.banner .banner-info`    | <section class="banner banner-info"><p class="margin-top-none">Informational banner <a href="#">Link</a></p></section> |
| Primary | `.banner .banner-primary` | <section class="banner banner-primary"><p class="margin-top-none">Primary banner <a href="#">Link</a></p></section>    |

```abut-html
<section class="banner banner-success">
	<p>Success banner.</p>
</section>
```
