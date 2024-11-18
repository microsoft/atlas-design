---
title: Thread history
description: Common thread history patterns in the Atlas Design System
template: standard
---

# Thread history

The thread history pattern is used to display a list of events.

```html
<div class="border-md border-radius-lg padding-md font-size-md line-height-md">
	<div class="display-flex justify-content-space-between margin-bottom-sm">
		<p class="font-size-h5">Thread History</p>
		<button id="button-close" class="button button-clear" aria-label="Button Close">
			<span class="icon" aria-hidden="true">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="100"
					height="100"
					viewBox="0 0 50 50"
				>
					<path
						class="fill-current-color"
						d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
					></path>
				</svg>
			</span>
		</button>
	</div>
	<ol class="timeline">
		<li class="timeline-item">
			<div class="timeline-item-badge">
				<span class="badge badge-success">
					<span class="icon" aria-hidden="true">
						<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								class="fill-current-color"
								d="M10 3C6.13401 3 3 6.13401 3 10C3 11.7547 3.64565 13.3586 4.71233 14.5872L8.94781 10.4185C9.5316 9.84393 10.4684 9.84393 11.0522 10.4185L15.2877 14.5872C16.3544 13.3586 17 11.7547 17 10C17 6.13401 13.866 3 10 3ZM10 17C11.7513 17 13.3525 16.3568 14.5801 15.2938L10.3507 11.1312C10.1561 10.9397 9.84387 10.9397 9.64927 11.1312L5.41994 15.2938C6.64753 16.3568 8.24866 17 10 17ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5Z"
							/>
						</svg>
					</span>
				</span>
			</div>
			<div class="timeline-item-template">
				<p class="timeline-item-template-title">
					Question escalated by ModeratorEmily to Microsoft moderators
				</p>
				<p class="timeline-item-template-time">Sept 19, 2024, 11:30 AM</p>
				<p class="timeline-item-template-description">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
					sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum. Curabitur pretium tincidunt lacus.
				</p>
			</div>
		</li>
		<li class="timeline-item">
			<div class="timeline-item-badge">
				<span class="badge badge-warning">
					<span class="icon" aria-hidden="true">
						<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								class="fill-current-color"
								d="M10 3C6.13401 3 3 6.13401 3 10C3 11.7547 3.64565 13.3586 4.71233 14.5872L8.94781 10.4185C9.5316 9.84393 10.4684 9.84393 11.0522 10.4185L15.2877 14.5872C16.3544 13.3586 17 11.7547 17 10C17 6.13401 13.866 3 10 3ZM10 17C11.7513 17 13.3525 16.3568 14.5801 15.2938L10.3507 11.1312C10.1561 10.9397 9.84387 10.9397 9.64927 11.1312L5.41994 15.2938C6.64753 16.3568 8.24866 17 10 17ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5Z"
							/>
						</svg>
					</span>
				</span>
			</div>
			<div class="timeline-item-template">
				<p class="timeline-item-template-title">Answer escalated by User789 to Microsoft moderators</p>
				<p class="timeline-item-template-time">July 4, 2024 12:00 PM</p>
				<p class="timeline-item-template-description">
					Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate
					vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor
					congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum
					consequat.
				</p>
			</div>
		</li>
		<li class="timeline-item">
			<div class="timeline-item-badge">
				<span class="badge badge-info">
					<span class="icon" aria-hidden="true">
						<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								class="fill-current-color"
								d="M10 3C6.13401 3 3 6.13401 3 10C3 11.7547 3.64565 13.3586 4.71233 14.5872L8.94781 10.4185C9.5316 9.84393 10.4684 9.84393 11.0522 10.4185L15.2877 14.5872C16.3544 13.3586 17 11.7547 17 10C17 6.13401 13.866 3 10 3ZM10 17C11.7513 17 13.3525 16.3568 14.5801 15.2938L10.3507 11.1312C10.1561 10.9397 9.84387 10.9397 9.64927 11.1312L5.41994 15.2938C6.64753 16.3568 8.24866 17 10 17ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5Z"
							/>
						</svg>
					</span>
				</span>
			</div>
			<div class="timeline-item-template">
				<p class="timeline-item-template-title">Answer created by User456</p>
				<p class="timeline-item-template-time">Dec 25, 2023 1:30 PM</p>
				<p class="timeline-item-template-description">
					Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et
					commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
					Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.
					Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros
					est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat.
				</p>
			</div>
		</li>
		<li class="timeline-item">
			<div class="timeline-item-badge">
				<span class="badge badge-danger">
					<span class="icon" aria-hidden="true">
						<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								class="fill-current-color"
								d="M10 3C6.13401 3 3 6.13401 3 10C3 11.7547 3.64565 13.3586 4.71233 14.5872L8.94781 10.4185C9.5316 9.84393 10.4684 9.84393 11.0522 10.4185L15.2877 14.5872C16.3544 13.3586 17 11.7547 17 10C17 6.13401 13.866 3 10 3ZM10 17C11.7513 17 13.3525 16.3568 14.5801 15.2938L10.3507 11.1312C10.1561 10.9397 9.84387 10.9397 9.64927 11.1312L5.41994 15.2938C6.64753 16.3568 8.24866 17 10 17ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5Z"
							/>
						</svg>
					</span>
				</span>
			</div>
			<div class="timeline-item-template">
				<p class="timeline-item-template-title">Question created by User123</p>
				<p class="timeline-item-template-time">Oct 31, 2023 9:30 AM</p>
			</div>
		</li>
	</ol>
</div>
```
