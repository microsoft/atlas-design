---
title: Badge
description: The Badge component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fm%3Dauto%26node-id%3D3381-10722%26t%3DZhpJOvxIFDBwfkR7-1
classType: Component
classPrefixes:
  - badge
---

# Badge

Badges are informative, non-interactive components that add extra context around the associated component.

## Usage

Badges use short text, color, and an optional icon for quick recognition.

```html
<span class="badge">Badge</span>
```

### Sizes

The following classes are available for resizing: `badge-sm`, `badge-lg`.

```html
<span class="badge badge-sm">Badge</span>
<span class="badge">Badge</span>
<span class="badge badge-lg">Badge</span>
```

### Semantic colors & types

By default, badges are secondary badges.

| State   | Class                                                                                                   | Default                                        | Clear                                                      | Filled                                                       |
| ------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| Default | `.badge`<br />`.badge.badge-clear`<br />`.badge.badge-filled`                                           | <span class="badge">Badge</span>               | <span class="badge badge-clear">Clear</span>               | <span class="badge badge-filled">Filled</span>               |
| Primary | `.badge.badge-primary`<br />`.badge.badge-primary.badge-clear`<br />`.badge.badge-primary.badge-filled` | <span class="badge badge-primary">Badge</span> | <span class="badge badge-primary badge-clear">Clear</span> | <span class="badge badge-primary badge-filled">Filled</span> |
| Info    | `.badge.badge-info`<br />`.badge.badge-info.badge-clear`<br />`.badge.badge-info.badge-filled`          | <span class="badge badge-info">Badge</span>    | <span class="badge badge-info badge-clear">Clear</span>    | <span class="badge badge-info badge-filled">Filled</span>    |
| Danger  | `.badge.badge-danger`<br />`.badge.badge-danger.badge-clear`<br />`.badge.badge-danger.badge-filled`    | <span class="badge badge-danger">Badge</span>  | <span class="badge badge-danger badge-clear">Clear</span>  | <span class="badge badge-danger badge-filled">Filled</span>  |
| Warning | `.badge.badge-warning`<br />`.badge.badge-warning.badge-clear`<br />`.badge.badge-warning.badge-filled` | <span class="badge badge-warning">Badge</span> | <span class="badge badge-warning badge-clear">Clear</span> | <span class="badge badge-warning badge-filled">Filled</span> |
| Success | `.badge.badge-success`<br />`.badge.badge-success.badge-clear`<br />`.badge.badge-success.badge-filled` | <span class="badge badge-success">Badge</span> | <span class="badge badge-success badge-clear">Clear</span> | <span class="badge badge-success badge-filled">Filled</span> |

### Badge with icon

Badges can include icons and text. To do this, nest the [icon component](./icon.md) inside a badge.

```html
<span class="badge">
	<span class="icon" aria-hidden="true">
		<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="fill-current-color">
			<path
				d="M8 0C8.73438 0 9.44271 0.09375 10.125 0.28125C10.8073 0.46875 11.4427 0.739583 12.0312 1.09375C12.6198 1.44792 13.1589 1.86458 13.6484 2.34375C14.138 2.82292 14.5573 3.36198 14.9062 3.96094C15.2552 4.5599 15.5234 5.19792 15.7109 5.875C15.8984 6.55208 15.9948 7.26042 16 8C16 8.73438 15.9062 9.44271 15.7188 10.125C15.5312 10.8073 15.2604 11.4427 14.9062 12.0312C14.5521 12.6198 14.1354 13.1589 13.6562 13.6484C13.1771 14.138 12.638 14.5573 12.0391 14.9062C11.4401 15.2552 10.8021 15.5234 10.125 15.7109C9.44792 15.8984 8.73958 15.9948 8 16C7.26562 16 6.55729 15.9062 5.875 15.7188C5.19271 15.5312 4.55729 15.2604 3.96875 14.9062C3.38021 14.5521 2.84115 14.1354 2.35156 13.6562C1.86198 13.1771 1.44271 12.638 1.09375 12.0391C0.744792 11.4401 0.476562 10.8021 0.289062 10.125C0.101562 9.44792 0.00520833 8.73958 0 8C0 7.26562 0.09375 6.55729 0.28125 5.875C0.46875 5.19271 0.739583 4.55729 1.09375 3.96875C1.44792 3.38021 1.86458 2.84115 2.34375 2.35156C2.82292 1.86198 3.36198 1.44271 3.96094 1.09375C4.5599 0.744792 5.19792 0.476562 5.875 0.289062C6.55208 0.101562 7.26042 0.00520833 8 0ZM9 12V10H7V12H9ZM9 9V4H7V9H9Z"
			/>
		</svg>
	</span>
	<span>Badge</span>
</span>
```

### Badge Icon

Badges with only icons. To do this, the following classes are available for resizing: `icon-xs`, `icon-sm`, `icon-lg`.

```html
<span class="badge badge-success">
	<span class="icon icon-xs" aria-hidden="true">
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M10 3C6.13401 3 3 6.13401 3 10C3 11.7547 3.64565 13.3586 4.71233 14.5872L8.94781 10.4185C9.5316 9.84393 10.4684 9.84393 11.0522 10.4185L15.2877 14.5872C16.3544 13.3586 17 11.7547 17 10C17 6.13401 13.866 3 10 3ZM10 17C11.7513 17 13.3525 16.3568 14.5801 15.2938L10.3507 11.1312C10.1561 10.9397 9.84387 10.9397 9.64927 11.1312L5.41994 15.2938C6.64753 16.3568 8.24866 17 10 17ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5Z"
				fill="white"
			/>
		</svg>
	</span>
</span>
<span class="badge badge-primary">
	<span class="icon icon-sm" aria-hidden="true">
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M10 3C6.13401 3 3 6.13401 3 10C3 11.7547 3.64565 13.3586 4.71233 14.5872L8.94781 10.4185C9.5316 9.84393 10.4684 9.84393 11.0522 10.4185L15.2877 14.5872C16.3544 13.3586 17 11.7547 17 10C17 6.13401 13.866 3 10 3ZM10 17C11.7513 17 13.3525 16.3568 14.5801 15.2938L10.3507 11.1312C10.1561 10.9397 9.84387 10.9397 9.64927 11.1312L5.41994 15.2938C6.64753 16.3568 8.24866 17 10 17ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5Z"
				fill="white"
			/>
		</svg>
	</span>
</span>
<span class="badge badge-info">
	<span class="icon" aria-hidden="true">
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M10 3C6.13401 3 3 6.13401 3 10C3 11.7547 3.64565 13.3586 4.71233 14.5872L8.94781 10.4185C9.5316 9.84393 10.4684 9.84393 11.0522 10.4185L15.2877 14.5872C16.3544 13.3586 17 11.7547 17 10C17 6.13401 13.866 3 10 3ZM10 17C11.7513 17 13.3525 16.3568 14.5801 15.2938L10.3507 11.1312C10.1561 10.9397 9.84387 10.9397 9.64927 11.1312L5.41994 15.2938C6.64753 16.3568 8.24866 17 10 17ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5Z"
				fill="white"
			/>
		</svg>
	</span>
</span>
<span class="badge badge-warning">
	<span class="icon icon-lg" aria-hidden="true">
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M10 3C6.13401 3 3 6.13401 3 10C3 11.7547 3.64565 13.3586 4.71233 14.5872L8.94781 10.4185C9.5316 9.84393 10.4684 9.84393 11.0522 10.4185L15.2877 14.5872C16.3544 13.3586 17 11.7547 17 10C17 6.13401 13.866 3 10 3ZM10 17C11.7513 17 13.3525 16.3568 14.5801 15.2938L10.3507 11.1312C10.1561 10.9397 9.84387 10.9397 9.64927 11.1312L5.41994 15.2938C6.64753 16.3568 8.24866 17 10 17ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5Z"
				fill="white"
			/>
		</svg>
	</span>
</span>
</span>
```
