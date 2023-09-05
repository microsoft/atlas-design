---
title: Persona
description: Persona component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Ftype%3Ddesign%26node-id%3D1284%253A2163%26mode%3Ddesign%26t%3DklysUJ7ALWgcF1SQ-1 allowfullscreen
classType: Component
classPrefixes:
  - persona
---

# Persona

Persona component comes in handy for user's representation. It consists of two parts - user's avatar and description. Description has their name and optional metadata.

| Class pattern             | Sizes                                             | screensize          |
| ------------------------- | ------------------------------------------------- | ------------------- |
| `.persona.persona-<size>` | `16x16` `24x24` `32x32 (default)` `36x36` `48x48` | `tablet`, `desktop` |

## Usage

Below are examples of the most common persona component use-cases - one with an image avatar and another with user's initials.

```html
<div class="persona">
	<figure class="persona-avatar">
		<img src="~/src/scaffold/media/avatar.png" alt="username" />
	</figure>
	<div class="persona-description">
		<p>Jane Doe</p>
		<p>Software Engineer</p>
	</div>
</div>

<div class="persona margin-top-md">
	<div class="persona-avatar">
		<span>JD</span>
	</div>
	<div class="persona-description">
		<p>John Doe</p>
		<p>Software Engineer</p>
	</div>
</div>
```

Persona component might contain a link to user's profile, with help of the [`.stretched-link` component](../components/stretched-link.md) the whole area persona takes becomes clickable:

```html
<div class="persona position-relative">
	<div class="persona-avatar">
		<span>JD</span>
	</div>
	<div class="persona-description">
		<a class="justify-self-stretch stretched-link" href="#">John Doe</a>
		<p>Software Engineer</p>
	</div>
</div>
```

Persona might have both avatar and description presetned at the same time or just one of them.

```html
<div class="persona">
	<figure class="persona-avatar">
		<img src="~/src/scaffold/media/avatar.png" alt="username" />
	</figure>
</div>

<div class="persona margin-top-md">
	<div class="persona-description">
		<p>John Doe</p>
		<p>Software Engineer</p>
	</div>
</div>
```

### Sizes

The following classes are available for resizing avatar.

```html
<div class="display-flex flex-wrap-wrap gap-xxs">
	<div class="persona persona-16x16">
		<figure class="persona-avatar">
			<img src="~/src/scaffold/media/avatar.png" alt="User name" />
		</figure>
	</div>
	<div class="persona persona-24x24">
		<figure class="persona-avatar">
			<img src="~/src/scaffold/media/avatar.png" alt="User name" />
		</figure>
	</div>
	<div class="persona persona-32x32">
		<figure class="persona-avatar">
			<img src="~/src/scaffold/media/avatar.png" alt="User name" />
		</figure>
	</div>
	<div class="persona persona-36x36">
		<figure class="persona-avatar">
			<img src="~/src/scaffold/media/avatar.png" alt="User name" />
		</figure>
	</div>
	<div class="persona persona-48x48">
		<figure class="persona-avatar">
			<img src="~/src/scaffold/media/avatar.png" alt="User name" />
		</figure>
	</div>
</div>

<div class="display-flex flex-wrap-wrap gap-xxs margin-top-md">
	<div class="persona persona-16x16">
		<div class="persona-avatar">
			<span>ww</span>
		</div>
	</div>
	<div class="persona persona-24x24">
		<div class="persona-avatar">
			<span>ww</span>
		</div>
	</div>
	<div class="persona persona-32x32">
		<div class="persona-avatar">
			<span>ww</span>
		</div>
	</div>
	<div class="persona persona-36x36">
		<div class="persona-avatar">
			<span>ww</span>
		</div>
	</div>
	<div class="persona persona-48x48">
		<div class="persona-avatar">
			<span>ww</span>
		</div>
	</div>
</div>
```

### Responsive sizes

Tablet and desktop versions of all classes are also available. Resize your browser window to see the differences in sizes.

```html
<div class="persona persona-16x16 persona-32x32-tablet persona-48x48-desktop">
	<figure class="persona-avatar">
		<img src="~/src/scaffold/media/avatar.png" alt="User name" />
	</figure>
</div>
```
