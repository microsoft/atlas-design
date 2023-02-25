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

```html
<div class="pivot-stack">
	<nav class="pivot-stack-nav" role="navigation">
		<ul class="pivot-stack-nav-list">
			<li class="pivot-stack-item is-active has-hover-bg">
				<a id="profile-activity" class="pivot-stack-button" href="#">
					<span>Activity</span>
				</a>
			</li>
			<li class="pivot-stack-item has-hover-bg">
				<a id="profile-training" class="pivot-stack-button" href="#">
					<span>Training</span>
				</a>
			</li>
			<li class="pivot-stack-item has-hover-bg">
				<a id="profile-qna" class="pivot-stack-button" href="#">
					<span>Q&A</span>
				</a>
			</li>
		</ul>
	</nav>
</div>
```
