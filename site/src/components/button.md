---
title: Button
description: Buttons the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FMCSf9XuplN2zG0sCcqJJyq%2F%25F0%259F%259A%25A7-Buttons%3Fpage-id%3D205%253A610%26node-id%3D364%253A852%26viewport%3D1342%252C2000%252C0.5%26scaling%3Dmin-zoom
---

# Button

The button element within Atlas is a flexible and easily modified element. Built-in variations are available to modify its size, width, color, and state.

```html
<button class="button">Click me!</button>
```

## Usage

Perhaps some design guidance 👀.

## Variations

Although variations are discussed one at a time on this page, you are able to use any combination of them together!

### Size

Make a button smaller or bigger than the default.

```html
<button class="button button-small">Small</button>
<button class="button">Default</button>
<button class="button button-large">Large</button>
```

### Color

Make a button match one of Atlas's theme-aware semantic colors.

```html
<button class="button button-primary">Primary</button>
<button class="button button-success">Success</button>
<button class="button button-warning">Warning</button>
<button class="button button-info">Info</button>
<button class="button button-danger">Danger</button>
```

### Full width

Make a button go the distance.

```html
<button class="button button-full-width">Primary</button>
```

### Loading

Ensure the user knows they need to wait for some event (like a fetch request) in order to interact with a button.

```html
<button class="button button-primary button-loading">Primary</button>
<button class="button button-success button-loading">Success</button>
<button class="button button-warning button-loading">Warning</button>
<button class="button button-info button-loading">Info</button>
<button class="button button-danger button-loading">Danger</button>
```

## Solid Buttons

To ensure design fidelity, Atlas only enables one solid button by default. Too may solid buttons can make a page look busy.

```html
<button class="button button-primary-solid">Primary</button>
```

You may enable more solid button colors by overriding the `$solid-button-colors` variable in your Sass:

```scss
$solid-button-colors: 'primary' 'danger' 'info' 'warning';
```
