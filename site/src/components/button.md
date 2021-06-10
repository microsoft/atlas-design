---
title: Button
description: Buttons the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FMCSf9XuplN2zG0sCcqJJyq%2F%25F0%259F%259A%25A7-Buttons%3Fpage-id%3D205%253A610%26node-id%3D364%253A852%26viewport%3D1342%252C2000%252C0.5%26scaling%3Dmin-zoom
---

# Button

Atlas provides three core button styles.

1. Secondary (default)
2. Primary
3. Semantic Colors

Each style is explained below, detailing how and where to use them.

## Secondary

All buttons, by default, are secondary buttons. There are three gradutating secondary styles.

1. Outlined (Default)
2. Clear
3. Filled

| Type     | Class                      | Default State                                         | Hover                                                            |
| -------- | -------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------- |
| Outlined | `.button`                  | <button class="button">Default</button>               | <button class="button is-hovered">Default</button>               |
| Clear    | `.button` `.button-clear`  | <button class="button button-clear">Default</button>  | <button class="button button-clear is-hovered">Default</button>  |
| Filled   | `.button` `.button-filled` | <button class="button button-filled">Default</button> | <button class="button button-filled is-hovered">Default</button> |

## Primary

A visual style used to highlight only the most important actions. To avoid confusing users, don't use more than more primary button within a section or view.

| Type     | Class                      | Default State                                                        | Hover                                                                           |
| -------- | -------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Outlined | `.button`                  | <button class="button button-primary">Default</button>               | <button class="button button-primary is-hovered">Default</button>               |
| Clear    | `.button` `.button-clear`  | <button class="button button-primary button-clear">Default</button>  | <button class="button button-primary button-clear is-hovered">Default</button>  |
| Filled   | `.button` `.button-filled` | <button class="button button-primary button-filled">Default</button> | <button class="button button-primary button-filled is-hovered">Default</button> |

## Semantic Colors

Semantic colors denote standard value states (such as good, bad, or warning). Each color has the same basic meaning in all contexts. Our semantic color buttons are used infrequently.

### Danger

Danger buttons are red on most themes. They help reiterature that the intended action is important or potentially dangerous (e.g., deleting an item or transfering ownership).

| Type     | Class                      | Default State                                                       | Hover                                                                          |
| -------- | -------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Outlined | `.button`                  | <button class="button button-danger">Default</button>               | <button class="button button-danger is-hovered">Default</button>               |
| Clear    | `.button` `.button-clear`  | <button class="button button-danger button-clear">Default</button>  | <button class="button button-danger button-clear is-hovered">Default</button>  |
| Filled   | `.button` `.button-filled` | <button class="button button-danger button-filled">Default</button> | <button class="button button-danger button-filled is-hovered">Default</button> |

### Success

Success buttons are green on most themes. This color stands for a good, positive situation or for the successful completion of a task. Use the good/positive semantic color if ...

- You need to highlight a good or positive status.
- A message contains information about a process that was finalized wihtout any issues. Users need this information later on (for example, to copy values to another app).

| Type     | Class                      | Default State                                                        | Hover                                                                           |
| -------- | -------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Outlined | `.button`                  | <button class="button button-success">Default</button>               | <button class="button button-success is-hovered">Default</button>               |
| Clear    | `.button` `.button-clear`  | <button class="button button-success button-clear">Default</button>  | <button class="button button-success button-clear is-hovered">Default</button>  |
| Filled   | `.button` `.button-filled` | <button class="button button-success button-filled">Default</button> | <button class="button button-success button-filled is-hovered">Default</button> |

### Warning

Warning buttons are yellow on most themes. This color indicates a critical situation or warning. Use this semantic color if ...

- You want to highlight a critical status.
- A minor problem has occcurred. The user can carry on working but might run into an error later on.
- the current mode or page can be finalized, but doing so might lead to an error later on.
- The user input was validated and a minor problem occurred. The user can continue without fixing the problem, but might lead to an error later on.
- A message contains information about a warning.

| Type     | Class                      | Default State                                                        | Hover                                                                           |
| -------- | -------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Outlined | `.button`                  | <button class="button button-warning">Default</button>               | <button class="button button-warning is-hovered">Default</button>               |
| Clear    | `.button` `.button-clear`  | <button class="button button-warning button-clear">Default</button>  | <button class="button button-warning button-clear is-hovered">Default</button>  |
| Filled   | `.button` `.button-filled` | <button class="button button-warning button-filled">Default</button> | <button class="button button-warning button-filled is-hovered">Default</button> |

## Variations

Although variations are discussed one at a time on this page, you are able to use any combination of them together!

### Size

Make a button smaller or bigger than the default.

```html
<button class="button button-small">Small</button>
<button class="button">Default</button>
<button class="button button-large">Large</button>
```

### Block button

Make a button take up the full width of a container.

```html
<button class="button button-block">Block</button>
```

### Loading buttons

Ensure the user knows they need to wait for some event (like a fetch request) in order to interact with a button.

```html
<button class="button is-loading">Primary</button>
<button class="button button-primary is-loading">Primary</button>
<button class="button button-success is-loading">Success</button>
<button class="button button-warning is-loading">Warning</button>
<button class="button button-info is-loading">Info</button>
<button class="button button-danger is-loading">Danger</button>
<button class="button button-clear is-loading">Primary</button>
<button class="button button-clear button-primary is-loading">Primary</button>
<button class="button button-clear button-success is-loading">Success</button>
<button class="button button-clear button-warning is-loading">Warning</button>
<button class="button button-clear button-info is-loading">Info</button>
<button class="button button-clear button-danger is-loading">Danger</button>
<button class="button button-filled is-loading">Primary</button>
<button class="button button-filled button-primary is-loading">Primary</button>
<button class="button button-filled button-success is-loading">Success</button>
<button class="button button-filled button-warning is-loading">Warning</button>
<button class="button button-filled button-info is-loading">Info</button>
<button class="button button-filled button-danger is-loading">Danger</button>
```
