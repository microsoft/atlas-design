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

The following classes are available for resizing: `badge-sm`, `badge-lg`, `badge-xl`.

```html
<span class="badge badge-sm">Badge Small</span>
<span class="badge">Badge</span>
<span class="badge badge-lg">Badge Large</span>
<span class="badge badge-xl">Badge Extra Large</span>
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
<span class="badge badge-sm">
	<span class="icon" aria-hidden="true">
		<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				class="fill-current-color"
				d="M10 3C6.13401 3 3 6.13401 3 10C3 11.7547 3.64565 13.3586 4.71233 14.5872L8.94781 10.4185C9.5316 9.84393 10.4684 9.84393 11.0522 10.4185L15.2877 14.5872C16.3544 13.3586 17 11.7547 17 10C17 6.13401 13.866 3 10 3ZM10 17C11.7513 17 13.3525 16.3568 14.5801 15.2938L10.3507 11.1312C10.1561 10.9397 9.84387 10.9397 9.64927 11.1312L5.41994 15.2938C6.64753 16.3568 8.24866 17 10 17ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5Z"
				fill="white"
			/>
		</svg>
	</span>
	<span>Badge Small</span>
</span>
<span class="badge">
	<span class="icon" aria-hidden="true">
		<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				class="fill-current-color"
				d="M10 3C6.13401 3 3 6.13401 3 10C3 11.7547 3.64565 13.3586 4.71233 14.5872L8.94781 10.4185C9.5316 9.84393 10.4684 9.84393 11.0522 10.4185L15.2877 14.5872C16.3544 13.3586 17 11.7547 17 10C17 6.13401 13.866 3 10 3ZM10 17C11.7513 17 13.3525 16.3568 14.5801 15.2938L10.3507 11.1312C10.1561 10.9397 9.84387 10.9397 9.64927 11.1312L5.41994 15.2938C6.64753 16.3568 8.24866 17 10 17ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5Z"
				fill="white"
			/>
		</svg>
	</span>
	<span>Badge</span>
</span>
<span class="badge badge-lg">
	<span class="icon" aria-hidden="true">
		<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				class="fill-current-color"
				d="M10 3C6.13401 3 3 6.13401 3 10C3 11.7547 3.64565 13.3586 4.71233 14.5872L8.94781 10.4185C9.5316 9.84393 10.4684 9.84393 11.0522 10.4185L15.2877 14.5872C16.3544 13.3586 17 11.7547 17 10C17 6.13401 13.866 3 10 3ZM10 17C11.7513 17 13.3525 16.3568 14.5801 15.2938L10.3507 11.1312C10.1561 10.9397 9.84387 10.9397 9.64927 11.1312L5.41994 15.2938C6.64753 16.3568 8.24866 17 10 17ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5Z"
				fill="white"
			/>
		</svg>
	</span>
	<span>Badge Large</span>
</span>
<span class="badge badge-xl">
	<span class="icon" aria-hidden="true">
		<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				class="fill-current-color"
				d="M10 3C6.13401 3 3 6.13401 3 10C3 11.7547 3.64565 13.3586 4.71233 14.5872L8.94781 10.4185C9.5316 9.84393 10.4684 9.84393 11.0522 10.4185L15.2877 14.5872C16.3544 13.3586 17 11.7547 17 10C17 6.13401 13.866 3 10 3ZM10 17C11.7513 17 13.3525 16.3568 14.5801 15.2938L10.3507 11.1312C10.1561 10.9397 9.84387 10.9397 9.64927 11.1312L5.41994 15.2938C6.64753 16.3568 8.24866 17 10 17ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5Z"
				fill="white"
			/>
		</svg>
	</span>
	<span>Badge Extra Large</span>
</span>
```

### Badge with Icon only

Badges with only icons, can be used with all badge sizes

```html
<span class="badge badge-sm badge-danger">
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
<span class="badge badge-lg badge-warning">
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
<span class="badge badge-xl badge-info">
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
```
