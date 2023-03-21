---
title: Pivot Stack
description: Pivot Stack component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D2373%253A7743%26t%3DsDMM7LXwbJhYa2fx-1
classType: Component
classPrefixes:
  - pivot-stack
---

# Pivot Stack

Pivot Stack is a layout component that provides a tabbed interface to display multiple views of a page.

## Usage

Here is an example of a standard pivot stack usage.

```html
<div class="pivot-stack">
	<nav class="pivot-stack-nav" role="navigation" aria-label="Site">
		<ul class="pivot-stack-nav-list">
			<li class="pivot-stack-item is-active">
				<a id="item-1" class="pivot-stack-button" href="#">
					<span>Item 1</span>
				</a>
			</li>
			<li class="pivot-stack-item">
				<a id="item-2" class="pivot-stack-button" href="#">
					<span>Item 2</span>
				</a>
			</li>
			<li class="pivot-stack-item">
				<a id="item-3" class="pivot-stack-button" href="#">
					<span>Item 3</span>
				</a>
			</li>
			<li class="pivot-stack-item">
				<a id="item-4" class="pivot-stack-button" href="#">
					<span>Item 4</span>
				</a>
			</li>
			<li class="pivot-stack-item">
				<a id="item-5" class="pivot-stack-button" href="#">
					<span>Item 5</span>
				</a>
			</li>
		</ul>
	</nav>
</div>
```

### With icons

Pivot stack buttons can be decorated with custom icons for a more elaborate representation. Here is an example.

```html
<section class="margin-bottom-md">
	<h2>With leading icons</h2>
	<div class="pivot-stack">
		<nav class="pivot-stack-nav" role="navigation" aria-label="Site">
			<ul class="pivot-stack-nav-list">
				<li class="pivot-stack-item is-active">
					<a id="item-1" class="pivot-stack-button" href="#">
						<span class="icon border"></span>
						<span>Item 1</span>
					</a>
				</li>
				<li class="pivot-stack-item">
					<a id="item-2" class="pivot-stack-button" href="#">
						<span class="icon border"></span>
						<span>Item 2</span>
					</a>
				</li>
				<li class="pivot-stack-item">
					<a id="item-3" class="pivot-stack-button" href="#">
						<span class="icon border"></span>
						<span>Item 3</span>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</section>
<section>
	<h2>With trailing icons</h2>
	<div class="pivot-stack">
		<nav class="pivot-stack-nav" role="navigation" aria-label="Site">
			<ul class="pivot-stack-nav-list">
				<li class="pivot-stack-item is-active">
					<a id="item-1" class="pivot-stack-button" href="#">
						<span>Item 1</span>
						<span class="icon border"></span>
					</a>
				</li>
				<li class="pivot-stack-item">
					<a id="item-2" class="pivot-stack-button" href="#">
						<span>Item 2</span>
						<span class="icon border"></span>
					</a>
				</li>
				<li class="pivot-stack-item">
					<a id="item-3" class="pivot-stack-button" href="#">
						<span>Item 3</span>
						<span class="icon border"></span>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</section>
```
