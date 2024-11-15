---
title: Timeline
description: Common timeline component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - timeline
---

# Timeline

The timeline component is designed to present a chronological sequence of events in a vertical list format. Each item in the timeline represents a specific event. The component is structured to enhance readability and user engagement by providing clear visual markers for each event.

## Timeline badge

The `timeline-item-badge` is recommended to used with the badge component. For component documentation [visit the badge component](../components/badge.md)


```html
<ol class="timeline">
	<li class="timeline-item">
		<div class="timeline-item-badge">
			<span class="badge badge-success">
				<span class="icon" aria-hidden="true">
					<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							class="fill-current-color"
							d="M10 3C6.13401 3 3 6.13401 3 10C3 11.7547 3.64565 13.3586 4.71233 14.5872L8.94781 10.4185C9.5316 9.84393 10.4684 9.84393 11.0522 10.4185L15.2877 14.5872C16.3544 13.3586 17 11.7547 17 10C17 6.13401 13.866 3 10 3ZM10 17C11.7513 17 13.3525 16.3568 14.5801 15.2938L10.3507 11.1312C10.1561 10.9397 9.84387 10.9397 9.64927 11.1312L5.41994 15.2938C6.64753 16.3568 8.24866 17 10 17ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5Z"
							fill="white"
						/>
					</svg>
				</span>
			</span>
		</div>
		<div class="timeline-item-template">
			<p class="timeline-item-template-title">Timeline title</p>
			<p class="timeline-item-template-time">Sept 19, 2024, 11:30 AM</p>
		</div>
	</li>
</ol>
```

## Timeline template

The timeline template contains the `timeline-item-template-title` and `timeline-item-template-time`.

Use the optional `timeline-item-template-description` that comes with prescriptive styling. If `timeline-item-template-description` is omitted, will need to style the contents using atomics instead.

```html
<ol class="timeline">
	<li class="timeline-item">
		<div class="timeline-item-badge">
			<span class="badge badge-danger">
				<span class="icon" aria-hidden="true">
					<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							class="fill-current-color"
							d="M10 3C6.13401 3 3 6.13401 3 10C3 11.7547 3.64565 13.3586 4.71233 14.5872L8.94781 10.4185C9.5316 9.84393 10.4684 9.84393 11.0522 10.4185L15.2877 14.5872C16.3544 13.3586 17 11.7547 17 10C17 6.13401 13.866 3 10 3ZM10 17C11.7513 17 13.3525 16.3568 14.5801 15.2938L10.3507 11.1312C10.1561 10.9397 9.84387 10.9397 9.64927 11.1312L5.41994 15.2938C6.64753 16.3568 8.24866 17 10 17ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5Z"
							fill="white"
						/>
					</svg>
				</span>
			</span>
		</div>
		<div class="timeline-item-template">
			<p class="timeline-item-template-title">Timeline title</p>
			<p class="timeline-item-template-time">Sept 19, 2024, 11:30 AM</p>
			<p class="timeline-item-template-description">Timeline description</p>
		</div>
	</li>
</ol>
```
