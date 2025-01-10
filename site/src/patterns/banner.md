---
title: Banner
description: Banner patterns in the Atlas Design System
template: standard
---

# Banner patterns

This page showcases some of the common combinations that might be used with the banner component. For component documentation, [visit the banner component page](../components/banner.md).

**This page is best viewed with the content section full screened because heroes are intended to be full width elements. Go full screen by clicking the button in the top right corner.**

## Banner with CTA

Banner with an action button.

```html-no-indent
<div
	class="banner banner-dismissable"
	id="example-banner-01"
	data-dismissable
	data-dismiss-animation="slide-up"
>
	<span class="banner-icon">
		<span class="icon" aria-hidden="true">
			<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="fill-current-color">
				<path d="M8 0C8.73438 0 9.44271 0.09375 10.125 0.28125C10.8073 0.46875 11.4427 0.739583 12.0312 1.09375C12.6198 1.44792 13.1589 1.86458 13.6484 2.34375C14.138 2.82292 14.5573 3.36198 14.9062 3.96094C15.2552 4.5599 15.5234 5.19792 15.7109 5.875C15.8984 6.55208 15.9948 7.26042 16 8C16 8.73438 15.9062 9.44271 15.7188 10.125C15.5312 10.8073 15.2604 11.4427 14.9062 12.0312C14.5521 12.6198 14.1354 13.1589 13.6562 13.6484C13.1771 14.138 12.638 14.5573 12.0391 14.9062C11.4401 15.2552 10.8021 15.5234 10.125 15.7109C9.44792 15.8984 8.73958 15.9948 8 16C7.26562 16 6.55729 15.9062 5.875 15.7188C5.19271 15.5312 4.55729 15.2604 3.96875 14.9062C3.38021 14.5521 2.84115 14.1354 2.35156 13.6562C1.86198 13.1771 1.44271 12.638 1.09375 12.0391C0.744792 11.4401 0.476562 10.8021 0.289062 10.125C0.101562 9.44792 0.00520833 8.73958 0 8C0 7.26562 0.09375 6.55729 0.28125 5.875C0.46875 5.19271 0.739583 4.55729 1.09375 3.96875C1.44792 3.38021 1.86458 2.84115 2.34375 2.35156C2.82292 1.86198 3.36198 1.44271 3.96094 1.09375C4.5599 0.744792 5.19792 0.476562 5.875 0.289062C6.55208 0.101562 7.26042 0.00520833 8 0ZM9 12V10H7V12H9ZM9 9V4H7V9H9Z"/>
			</svg>
		</span>
	</span>
	<div class="banner-content">
		<div class="display-flex gap-xxs justify-content-space-between flex-wrap-wrap">
			<p><span class="banner-title">Descriptive title</span> A banner about something happening in the world.</p>
            <button type="button" class="button margin-left-auto">Action</button>
		</div>
	</div>
	<button type="button" class="banner-dismiss" data-bi-name="close" data-dismiss>
		<span class="visually-hidden">Dismiss banner</span>
		<span class="icon" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color">
				<path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"/>
			</svg>
		</span>
	</button>
</div>
```

Banner with a few buttons and a longer paragraph.

```html-no-indent
<div
	class="banner banner-dismissable"
	id="example-banner-02"
	data-dismissable
	data-dismiss-animation="slide-up"
>
	<span class="banner-icon">
		<span class="icon" aria-hidden="true">
			<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="fill-current-color">
				<path d="M8 0C8.73438 0 9.44271 0.09375 10.125 0.28125C10.8073 0.46875 11.4427 0.739583 12.0312 1.09375C12.6198 1.44792 13.1589 1.86458 13.6484 2.34375C14.138 2.82292 14.5573 3.36198 14.9062 3.96094C15.2552 4.5599 15.5234 5.19792 15.7109 5.875C15.8984 6.55208 15.9948 7.26042 16 8C16 8.73438 15.9062 9.44271 15.7188 10.125C15.5312 10.8073 15.2604 11.4427 14.9062 12.0312C14.5521 12.6198 14.1354 13.1589 13.6562 13.6484C13.1771 14.138 12.638 14.5573 12.0391 14.9062C11.4401 15.2552 10.8021 15.5234 10.125 15.7109C9.44792 15.8984 8.73958 15.9948 8 16C7.26562 16 6.55729 15.9062 5.875 15.7188C5.19271 15.5312 4.55729 15.2604 3.96875 14.9062C3.38021 14.5521 2.84115 14.1354 2.35156 13.6562C1.86198 13.1771 1.44271 12.638 1.09375 12.0391C0.744792 11.4401 0.476562 10.8021 0.289062 10.125C0.101562 9.44792 0.00520833 8.73958 0 8C0 7.26562 0.09375 6.55729 0.28125 5.875C0.46875 5.19271 0.739583 4.55729 1.09375 3.96875C1.44792 3.38021 1.86458 2.84115 2.34375 2.35156C2.82292 1.86198 3.36198 1.44271 3.96094 1.09375C4.5599 0.744792 5.19792 0.476562 5.875 0.289062C6.55208 0.101562 7.26042 0.00520833 8 0ZM9 12V10H7V12H9ZM9 9V4H7V9H9Z"/>
			</svg>
		</span>
	</span>
	<div class="banner-content">
		<div class="display-flex gap-xxs justify-content-space-between flex-wrap-wrap">
			<p><span class="banner-title">Descriptive title</span> A banner about something happening in the world. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			<div class="buttons flex-wrap-nowrap-tablet margin-left-auto">
                <button type="button" class="button">Action</button>
                <button type="button" class="button">Action</button>
            </div>
		</div>
	</div>
	<button type="button" class="banner-dismiss" data-bi-name="close" data-dismiss>
		<span class="visually-hidden">Dismiss banner</span>
		<span class="icon" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color">
				<path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"/>
			</svg>
		</span>
	</button>
</div>
```
