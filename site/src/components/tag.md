---
title: Tag
description: The Tag component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - tag
---

# Tag

A tag is a representation of a value that someone has picked.

Tags create a visual pattern that lets users know they can change or remove the selection. To show system-generated data that user can’t change, use a [badge](./badge.md) component instead.

## Usage

Tags use short text, color, and an optional icon for quick recognition.

```html
<span class="tag">Tag</span>
```

### Tag with icon

Tags can include icons. To do this, nest the [icon component](./icon.md) inside a tag.

```html
<span class="tag">
	<span class="icon" aria-hidden="true">
		<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="fill-current-color">
			<path
				d="M8 0C8.73438 0 9.44271 0.09375 10.125 0.28125C10.8073 0.46875 11.4427 0.739583 12.0312 1.09375C12.6198 1.44792 13.1589 1.86458 13.6484 2.34375C14.138 2.82292 14.5573 3.36198 14.9062 3.96094C15.2552 4.5599 15.5234 5.19792 15.7109 5.875C15.8984 6.55208 15.9948 7.26042 16 8C16 8.73438 15.9062 9.44271 15.7188 10.125C15.5312 10.8073 15.2604 11.4427 14.9062 12.0312C14.5521 12.6198 14.1354 13.1589 13.6562 13.6484C13.1771 14.138 12.638 14.5573 12.0391 14.9062C11.4401 15.2552 10.8021 15.5234 10.125 15.7109C9.44792 15.8984 8.73958 15.9948 8 16C7.26562 16 6.55729 15.9062 5.875 15.7188C5.19271 15.5312 4.55729 15.2604 3.96875 14.9062C3.38021 14.5521 2.84115 14.1354 2.35156 13.6562C1.86198 13.1771 1.44271 12.638 1.09375 12.0391C0.744792 11.4401 0.476562 10.8021 0.289062 10.125C0.101562 9.44792 0.00520833 8.73958 0 8C0 7.26562 0.09375 6.55729 0.28125 5.875C0.46875 5.19271 0.739583 4.55729 1.09375 3.96875C1.44792 3.38021 1.86458 2.84115 2.34375 2.35156C2.82292 1.86198 3.36198 1.44271 3.96094 1.09375C4.5599 0.744792 5.19792 0.476562 5.875 0.289062C6.55208 0.101562 7.26042 0.00520833 8 0ZM9 12V10H7V12H9ZM9 9V4H7V9H9Z"
			/>
		</svg>
	</span>
	<span>Tag</span>
</span>
```

### Sizes

The following classes are available for resizing: `tag-sm`, `tag-lg`.

```html
<span class="tag tag-sm">Tag</span>
<span class="tag">Tag</span>
<span class="tag tag-lg">Tag</span>
```

### Types

By default, tags are secondary outlined tags.

| State    | Class              | Example                                  |
| -------- | ------------------ | ---------------------------------------- |
| Outlined | `.tag`             | <span class="tag">Tag</span>             |
| Filled   | `.tag.tag-filled`  | <span class="tag tag-filled">Tag</span>  |
| Primary  | `.tag.tag-primary` | <span class="tag tag-primary">Tag</span> |

### Dismissable tags

The only possible action that can be taken is dismissal.

```html
<button type="button" class="tag">
	<span>Tag</span>
	<span class="tag-close">
		<span class="icon" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color">
				<path
					d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"
				/>
			</svg>
		</span>
	</span>
</button>
```

| State    | Class              | Example                                                                                                                                                                                                                                                                                                                                                                                                                                          | Hover                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Outlined | `.tag`             | <button type="button" class="tag"><span>Tag</span><span class="tag-close"><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color"><path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"/></svg></span></span></button>             | <button type="button" class="tag is-hovered"><span>Tag</span><span class="tag-close"><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color"><path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"/></svg></span></span></button>             |
| Filled   | `.tag.tag-filled`  | <button type="button" class="tag tag-filled"><span>Tag</span><span class="tag-close"><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color"><path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"/></svg></span></span></button>  | <button type="button" class="tag tag-filled is-hovered"><span>Tag</span><span class="tag-close"><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color"><path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"/></svg></span></span></button>  |
| Primary  | `.tag.tag-primary` | <button type="button" class="tag tag-primary"><span>Tag</span><span class="tag-close"><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color"><path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"/></svg></span></span></button> | <button type="button" class="tag tag-primary is-hovered"><span>Tag</span><span class="tag-close"><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color"><path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"/></svg></span></span></button> |

### Interactive tag

In addition to dismissibility, interaction tags can have one other action that can provide more information or actions related to what the tag represents.

To do this, nest the [popover component](./popover.md) inside a tag.

```html
<span class="tag tag-interactive">
	<details class="popover tag-popover">
		<summary class="tag-summary">Click</summary>
		<div class="popover-content">
			<p>Content.</p>
		</div>
	</details>
	<button type="button" class="tag-close">
		<span class="visually-hidden">Dismiss tag</span>
		<span class="icon" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color">
				<path
					d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"
				/>
			</svg>
		</span>
	</button>
</span>
```

<table class="table margin-top-md margin-bottom-xl">
	<thead>
		<tr>
			<th>State</th>
			<th>Example</th>
			<th>Tag hover</th>
			<th>Dismiss hover</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Outlined</td>
			<td>
				<span class="tag tag-interactive"><details class="popover tag-popover"><summary class="tag-summary">Click</summary><div class="popover-content"><p class="margin-top-none">Content.</p></div></details><button type="button" class="tag-close"><span class="visually-hidden">Dismiss tag</span><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color"><path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"></path></svg></span></button></span>
			</td>
			<td>
				<span class="tag tag-interactive"><details class="popover tag-popover"><summary class="tag-summary is-hovered">Click</summary><div class="popover-content"><p class="margin-top-none">Content.</p></div></details><button type="button" class="tag-close"><span class="visually-hidden">Dismiss tag</span><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color"><path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"></path></svg></span></button></span>
			</td>
			<td>
				<span class="tag tag-interactive"><details class="popover popover-right tag-popover"><summary class="tag-summary">Click</summary><div class="popover-content"><p class="margin-top-none">Content.</p></div></details><button type="button" class="tag-close is-hovered"><span class="visually-hidden">Dismiss tag</span><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color"><path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"></path></svg></span></button></span>
			</td>
		</tr>
		<tr>
			<td>Filled</td>
			<td>
				<span class="tag tag-filled tag-interactive"><details class="popover tag-popover"><summary class="tag-summary">Click</summary><div class="popover-content"><p class="margin-top-none">Content.</p></div></details><button type="button" class="tag-close"><span class="visually-hidden">Dismiss tag</span><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color"><path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"></path></svg></span></button></span>
			</td>
			<td>
				<span class="tag tag-filled tag-interactive"><details class="popover tag-popover"><summary class="tag-summary is-hovered">Click</summary><div class="popover-content"><p class="margin-top-none">Content.</p></div></details><button type="button" class="tag-close"><span class="visually-hidden">Dismiss tag</span><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color"><path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"></path></svg></span></button></span>
			</td>
			<td>
				<span class="tag tag-filled tag-interactive"><details class="popover popover-right tag-popover"><summary class="tag-summary">Click</summary><div class="popover-content"><p class="margin-top-none">Content.</p></div></details><button type="button" class="tag-close is-hovered"><span class="visually-hidden">Dismiss tag</span><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color"><path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"></path></svg></span></button></span>
			</td>
		</tr>
		<tr>
			<td>Primary</td>
			<td>
				<span class="tag tag-primary tag-interactive"><details class="popover tag-popover"><summary class="tag-summary">Click</summary><div class="popover-content"><p class="margin-top-none">Content.</p></div></details><button type="button" class="tag-close"><span class="visually-hidden">Dismiss tag</span><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color"><path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"></path></svg></span></button></span>
			</td>
			<td>
				<span class="tag tag-primary tag-interactive"><details class="popover tag-popover"><summary class="tag-summary is-hovered">Click</summary><div class="popover-content"><p class="margin-top-none">Content.</p></div></details><button type="button" class="tag-close"><span class="visually-hidden">Dismiss tag</span><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color"><path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"></path></svg></span></button></span>
			</td>
			<td>
				<span class="tag tag-primary tag-interactive"><details class="popover popover-right tag-popover"><summary class="tag-summary">Click</summary><div class="popover-content"><p class="margin-top-none">Content.</p></div></details><button type="button" class="tag-close is-hovered"><span class="visually-hidden">Dismiss tag</span><span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" class="fill-current-color"><path d="M269.254 224l137.373 137.373-45.254 45.254L224 269.254 86.627 406.627l-45.255-45.254L178.746 224 41.373 86.627l45.255-45.255L224 178.746 361.373 41.373l45.254 45.255L269.254 224z"></path></svg></span></button></span>
			</td>
		</tr>
	</tbody>
</table>
