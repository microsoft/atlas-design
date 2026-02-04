---
title: Code block
description: Displays code within a block.
template: standard
classType: Component
classPrefixes:
  - code-block
---

# Code block

The code block governs how a block of code is rendered. It has two parts, the header and the body.

## Usage

The code component might contain a few subcomponents.

- `.code-block-header` - an optional section on top of the block.
- `.code-block-body` - a box within which a code content can be placed.

Here is an example of a basic usage of code block component.

```html
<div class="code-block">
	<div class="code-block-header"></div>
	<div class="code-block-body">
		<pre>Hello, world! I'm the example!</pre>
	</div>
</div>
```

### Header section modifications

Header section can contain the language and/or action bar subcomponents.

<div class="code-block margin-top-md">
	<div class="code-block-header">
		<span class="code-block-header-language">JavaScript</span>
		<div class="code-block-header-action-bar">
			<button type="button" class="button">
				<span class="icon" aria-hidden="true">
					<svg class="fill-current-color" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M5 5.274c0-1.707 1.826-2.792 3.325-1.977l12.362 6.726c1.566.853 1.566 3.101 0 3.953L8.325 20.702C6.826 21.518 5 20.432 5 18.726V5.274Z"
						/>
					</svg>
				</span>
				<span>Run</span>
			</button>
			<button type="button" class="button">
				<span class="icon" aria-hidden="true">
					<svg class="fill-current-color" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M5.503 4.627 5.5 6.75v10.504a3.25 3.25 0 0 0 3.25 3.25h8.616a2.251 2.251 0 0 1-2.122 1.5H8.75A4.75 4.75 0 0 1 4 17.254V6.75c0-.98.627-1.815 1.503-2.123ZM17.75 2A2.25 2.25 0 0 1 20 4.25v13a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-13A2.25 2.25 0 0 1 8.75 2h9Z"
						/>
					</svg>
				</span>
				<span>Copy</span>
			</button>
		</div>
	</div>
	<div class="code-block-body">
		<pre><code>console.log('Hello, world! I'm the example!');</code></pre>
	</div>
</div>

#### Header with language

`code-block-header-language` subcomponent is located on the left side of the header.

```html
<div class="code-block">
	<div class="code-block-header">
		<span class="code-block-header-language">JavaScript</span>
	</div>
	<div class="code-block-body">
		<pre><code>console.log('Hello, world! I'm the example!');</code></pre>
	</div>
</div>
```

#### Header with action bar

`code-block-header-action-bar` is rendered on the right side of the header and might include a few action buttons.

```html
<div class="code-block">
	<div class="code-block-header">
		<div class="code-block-header-action-bar">
			<button type="button" class="button">
				<span class="icon" aria-hidden="true">
					<svg class="fill-current-color" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M5 5.274c0-1.707 1.826-2.792 3.325-1.977l12.362 6.726c1.566.853 1.566 3.101 0 3.953L8.325 20.702C6.826 21.518 5 20.432 5 18.726V5.274Z"
						/>
					</svg>
				</span>
				<span>Run</span>
			</button>
			<button type="button" class="button">
				<span class="icon" aria-hidden="true">
					<svg class="fill-current-color" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M5.503 4.627 5.5 6.75v10.504a3.25 3.25 0 0 0 3.25 3.25h8.616a2.251 2.251 0 0 1-2.122 1.5H8.75A4.75 4.75 0 0 1 4 17.254V6.75c0-.98.627-1.815 1.503-2.123ZM17.75 2A2.25 2.25 0 0 1 20 4.25v13a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-13A2.25 2.25 0 0 1 8.75 2h9Z"
						/>
					</svg>
				</span>
				<span>Copy</span>
			</button>
		</div>
	</div>
	<div class="code-block-body">
		<pre>Hello, world! I'm the example!</pre>
	</div>
</div>
```
