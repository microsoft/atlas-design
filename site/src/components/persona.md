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

Persona component comes in handy for user's representation. It consists of two parts - user's avatar and details. Details has their name and optional metadata.

| Class pattern             | Sizes                  |
| ------------------------- | ---------------------- |
| `.persona.persona-<size>` | `xs`, `sm`, `lg`, `xl` |

## Usage

Below are examples of the most common persona component use-cases - one with an image avatar and another with user's initials.

```html
<div class="persona">
	<figure class="persona-avatar">
		<img src="~/src/scaffold/media/avatar.png" alt="Avatar for Jane Doe" />
	</figure>
	<div class="persona-details">
		<p class="persona-name">Jane Doe</p>
		<p>Software Engineer</p>
	</div>
</div>

<div class="persona margin-top-md">
	<div class="persona-avatar">
		<span role="img" aria-label="Avatar for John Doe">JD</span>
	</div>
	<div class="persona-details">
		<p class="persona-name">John Doe</p>
		<p>Software Engineer</p>
	</div>
</div>
```

Persona's details may contain a link to user's profile, and with help of the [`.stretched-link` component](../components/stretched-link.md) the whole area persona takes becomes clickable:

```html
<div class="persona position-relative">
	<div class="persona-avatar">
		<span role="img" aria-label="Avatar for John Doe">JD</span>
	</div>
	<div class="persona-details">
		<a class="persona-name justify-self-stretch stretched-link" href="#">John Doe</a>
		<p>Software Engineer</p>
	</div>
</div>
```

Persona might have both avatar and details parts presented at the same time or just one of them.

```html
<div class="persona">
	<figure class="persona-avatar">
		<img src="~/src/scaffold/media/avatar.png" alt="Avatar for Jane Doe" />
	</figure>
</div>

<div class="persona margin-top-md">
	<div class="persona-details">
		<p class="persona-name">John Doe</p>
		<p>Software Engineer</p>
	</div>
</div>
```

### Sizes

The following classes are available for resizing avatar: `persona-xs`, `persona-sm`, `persona-lg`, `persona-xl`.

```html
<div class="display-flex flex-wrap-wrap gap-xxs">
	<div class="persona persona-xs">
		<figure class="persona-avatar">
			<img src="~/src/scaffold/media/avatar.png" alt="Avatar for Jane Doe" />
		</figure>
	</div>
	<div class="persona persona-sm">
		<figure class="persona-avatar">
			<img src="~/src/scaffold/media/avatar.png" alt="Avatar for Jane Doe" />
		</figure>
	</div>
	<div class="persona">
		<figure class="persona-avatar">
			<img src="~/src/scaffold/media/avatar.png" alt="Avatar for Jane Doe" />
		</figure>
	</div>
	<div class="persona persona-lg">
		<figure class="persona-avatar">
			<img src="~/src/scaffold/media/avatar.png" alt="Avatar for Jane Doe" />
		</figure>
	</div>
	<div class="persona persona-xl">
		<figure class="persona-avatar">
			<img src="~/src/scaffold/media/avatar.png" alt="Avatar for Jane Doe" />
		</figure>
	</div>
</div>

<div class="display-flex flex-wrap-wrap gap-xxs margin-top-md">
	<div class="persona persona-xs">
		<div class="persona-avatar">
			<span role="img" aria-label="Avatar for WW">ww</span>
		</div>
	</div>
	<div class="persona persona-sm">
		<div class="persona-avatar">
			<span role="img" aria-label="Avatar for WW">ww</span>
		</div>
	</div>
	<div class="persona">
		<div class="persona-avatar">
			<span role="img" aria-label="Avatar for WW">ww</span>
		</div>
	</div>
	<div class="persona persona-lg">
		<div class="persona-avatar">
			<span role="img" aria-label="Avatar for WW">ww</span>
		</div>
	</div>
	<div class="persona persona-xl">
		<div class="persona-avatar">
			<span role="img" aria-label="Avatar for WW">ww</span>
		</div>
	</div>
</div>
```
