---
title: Site header
description: The Site header component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - site-header
---

# Site header

Site header component allows adding full width container to hold everything site's header might need - the logo, brand link, navigation, and other controls.

**This page is best viewed with the content section full screened because banners are intended to be full width elements. Go full screen by clicking the button in the top right corner.**

## Usage

The site header is composed of the following elements:

| Component             | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| `site-header`         | The main container for the site header.                     |
| `site-header-button`  | Buttons within the site header.                             |
| `site-header-logo`    | The logo displayed in the site header.                      |
| `site-header-divider` | A vertical divider between elements.                        |
| `site-header-brand`   | The brand name or title in the site header.                 |
| `site-header-nav`     | The navigation container within the site header.            |
| `site-header-panel`   | A panel that can be expanded to display additional content. |

Below is the example of the site header with logo, brand and navigation links.

```html-no-indent
<div class="site-header">
	<!-- Microsoft logo -->
	<a href="https://www.microsoft.com" aria-label="Microsoft">
		<svg
			class="site-header-logo"
			aria-hidden="true"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M11.5216 0.5H0V11.9067H11.5216V0.5Z" fill="#f25022" />
			<path d="M24.2418 0.5H12.7202V11.9067H24.2418V0.5Z" fill="#7fba00" />
			<path d="M11.5216 13.0933H0V24.5H11.5216V13.0933Z" fill="#00a4ef" />
			<path d="M24.2418 13.0933H12.7202V24.5H24.2418V13.0933Z" fill="#ffb900" />
		</svg>
	</a>

	<!-- Divider -->
	<div class="site-header-divider"></div>

	<!-- Brand -->
	<a href="~/src/index.md" class="site-header-brand">
		<span>Brand</span>
	</a>

	<!-- Navigation -->
	<nav class="site-header-nav">
		<ul class="display-flex gap-xxs">
			<li>
				<a href="#!" class="site-header-button">
                    <span>Link 1</span>
                </a>
			</li>
			<li>
				<a href="#!" class="site-header-button">
                    <span>Link 2</span>
                </a>
			</li>
			<li>
				<a href="#!" class="site-header-button">
                    <span>Link 3</span>
                </a>
			</li>
		</ul>
	</nav>
</div>
```

### Logo

There is an atomic available to position the logo right in the middle of header - `site-header-logo-centered`.

```html-no-indent
<div class="site-header justify-content-space-between">
	<!-- Brand -->
	<a href="~/src/index.md" class="site-header-brand">
		<span>Brand</span>
	</a>

    <!-- Microsoft logo -->
	<a href="https://www.microsoft.com" aria-label="Microsoft" class="site-header-logo-centered">
		<svg
			class="site-header-logo"
			aria-hidden="true"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M11.5216 0.5H0V11.9067H11.5216V0.5Z" fill="#f25022" />
			<path d="M24.2418 0.5H12.7202V11.9067H24.2418V0.5Z" fill="#7fba00" />
			<path d="M11.5216 13.0933H0V24.5H11.5216V13.0933Z" fill="#00a4ef" />
			<path d="M24.2418 13.0933H12.7202V24.5H24.2418V13.0933Z" fill="#ffb900" />
		</svg>
	</a>

	<a href="#!" class="link-button font-size-sm">
		<span>Link</span>
	</a>
</div>
```

### Panel

There is a Panel sub-component available to use within site header. Panel provides additional space to hold more content. Panel is composed of the following elements:

| Component                            | Description                                                                                          |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `site-header-panel`                  | The main container for the site header panel.                                                        |
| `site-header-panel-featured-content` | Featured section in the panel. Located on the right side and it's recommended to hold up to 2 cards. |
| `site-header-panel-content`          | Container that holds the main content. It should be either the set of links or cards.                |
| `site-header-panel-links`            | Section with set of links. Recommended to have up to 21 links.                                       |
| `site-header-panel-cards`            | Section with set of cards. Recommended to have up to 9 cards.                                        |

Below are the examples of both content options - with a set of links and a set of cards:

<div class="site-header example full-width padding-block-md border-none" style="height: auto;">
    <div class="site-header-panel" style="position: unset;">
		<div class="site-header-panel-content">
			<ul class="site-header-panel-cards">
				<li>
					<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
						<div class="card-content">
							<a href="#!" class="card-title color-text stretched-link">
								Card 1
							</a>
							<p class="card-content-description line-clamp-2">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</article>
				</li>
				<li>
					<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
						<div class="card-content">
							<a href="#!" class="card-title color-text stretched-link">
								Card 2
							</a>
							<p class="card-content-description line-clamp-2">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</article>
				</li>
				<li>
					<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
						<div class="card-content">
							<a href="#!" class="card-title color-text stretched-link">
								Card 3
							</a>
							<p class="card-content-description line-clamp-2">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</article>
				</li>
				<li>
					<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
						<div class="card-content">
							<a href="#!" class="card-title color-text stretched-link">
								Card 4
							</a>
							<p class="card-content-description line-clamp-2">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</article>
				</li>
				<li>
					<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
						<div class="card-content">
							<a href="#!" class="card-title color-text stretched-link">
								Card 5
							</a>
							<p class="card-content-description line-clamp-2">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</article>
				</li>
				<li>
					<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
						<div class="card-content">
							<a href="#!" class="card-title color-text stretched-link">
								Card 6
							</a>
							<p class="card-content-description line-clamp-2">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</article>
				</li>
				<li>
					<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
						<div class="card-content">
							<a href="#!" class="card-title color-text stretched-link">
								Card 7
							</a>
							<p class="card-content-description line-clamp-2">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</article>
				</li>
				<li>
					<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
						<div class="card-content">
							<a href="#!" class="card-title color-text stretched-link">
								Card 8
							</a>
							<p class="card-content-description line-clamp-2">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</article>
				</li>
				<li>
					<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
						<div class="card-content">
							<a href="#!" class="card-title color-text stretched-link">
								Card 9
							</a>
							<p class="card-content-description line-clamp-2">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</article>
				</li>
			</ul>
		</div>
		<section class="site-header-panel-featured-content">
			<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
				<div class="card-content">
					<p class="card-supertitle">Supertitle</p>
					<a href="#!" class="card-title color-text stretched-link">
						Featured card 1
					</a>
					<p class="card-content-description line-clamp-2">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</p>
				</div>
			</article>
			<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
				<div class="card-content">
					<p class="card-supertitle">Supertitle</p>
					<a href="#!" class="card-title color-text stretched-link">
						Featured card 2
					</a>
					<p class="card-content-description line-clamp-2">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</p>
				</div>
			</article>
		</section>
	</div>
</div>

```html-no-example
<div class="site-header">
    ...

	<!-- Panel -->
    <div class="site-header-panel">
		<div class="site-header-panel-content">
            <!-- 9 cards max -->
			<ul class="site-header-panel-cards">
				<li>
					<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
						<div class="card-content">
							<a href="#!" class="card-title color-text stretched-link">
								Card 1
							</a>
							<p class="card-content-description line-clamp-2">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</article>
				</li>
                ...
			</ul>
		</div>

		<!-- Featured content -->
		<!-- 2 cards max -->
		<section class="site-header-panel-featured-content">
			<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
				<div class="card-content">
					<p class="card-supertitle">Supertitle</p>
					<a href="#!" class="card-title color-text stretched-link">
						Featured card 1
					</a>
					<p class="card-content-description line-clamp-2">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</p>
				</div>
			</article>
			...
		</section>
	</div>
</div>
```

<div class="site-header example full-width padding-block-md border-none" style="height: auto;">
    <div class="site-header-panel" style="position: unset;">
		<div class="site-header-panel-content">
			<ul class="site-header-panel-links">
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 1
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 2
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 3
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 4
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 5
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 6
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 7
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 8
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 9
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 10
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 11
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 12
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 13
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 14
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 15
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 16
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 17
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 18
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 19
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 20
					</a>
				</li>
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 21
					</a>
				</li>
			</ul>
			<a
				href="#!"
				class="button button-clear button-sm color-primary justify-content-flex-start border-none margin-top-sm"
			>
				Panel link
			</a>
		</div>
		<section class="site-header-panel-featured-content">
			<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
				<div class="card-content">
					<p class="card-supertitle">Supertitle</p>
					<a href="#!" class="card-title color-text stretched-link">
						Featured card 1
					</a>
					<p class="card-content-description line-clamp-2">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</p>
				</div>
			</article>
			<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
				<div class="card-content">
					<p class="card-supertitle">Supertitle</p>
					<a href="#!" class="card-title color-text stretched-link">
						Featured card 2
					</a>
					<p class="card-content-description line-clamp-2">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</p>
				</div>
			</article>
		</section>
	</div>
</div>

```html-no-example
<div class="site-header">
    ...

	<!-- Panel -->
    <div class="site-header-panel">
		<div class="site-header-panel-content">
	        <!-- 21 links max -->
			<ul class="site-header-panel-links site-header-panel-links">
				<li>
					<a href="#!"class="button button-clear button-sm button-block font-weight-normal justify-content-flex-start inner-focus border-none background-color-body-accent-onhover">
						Link 1
					</a>
				</li>
                ...
			</ul>

            <!-- Optional panel CTA -->
			<a href="#!" class="button button-clear button-sm color-primary justify-content-flex-start border-none margin-top-sm">
				Panel link
			</a>
		</div>

		<!-- Featured content -->
		<!-- 2 cards max -->
		<section class="site-header-panel-featured-content">
			<article class="card position-relative background-color-body-accent-onhover background-color-body-medium box-shadow-none">
				<div class="card-content">
					<p class="card-supertitle">Supertitle</p>
					<a href="#!" class="card-title color-text stretched-link">
						Featured card 1
					</a>
					<p class="card-content-description line-clamp-2">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</p>
				</div>
			</article>
			...
		</section>
	</div>
</div>
```
