---
title: Button
description: Buttons the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FMCSf9XuplN2zG0sCcqJJyq%2F%25F0%259F%259A%25A7-Buttons%3Fpage-id%3D205%253A610%26node-id%3D364%253A852%26viewport%3D1342%252C2000%252C0.5%26scaling%3Dmin-zoom
classType: Component
classPrefixes:
  - button
---

# Button

Atlas provides three core button styles.

1. Secondary (default)
2. Primary
3. Semantic Colors

Each style is explained below, detailing how and where to use them.

## Secondary

All buttons, by default, are secondary buttons. There are three graduating secondary styles.

1. Outlined (Default)
2. Clear
3. Filled

| Type     | Class                      | Default State                                        | Hover                                                           | Disabled                                                                 |
| -------- | -------------------------- | ---------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Outlined | `.button`                  | <button class="button">Default</button>              | <button class="button is-hovered">Default</button>              | <button class="button" disabled>Default</button>                         |
| Clear    | `.button` `.button-clear`  | <button class="button button-clear">Clear</button>   | <button class="button button-clear is-hovered">Clear</button>   | <button class="button button-clear is-hovered" disabled>Clear</button>   |
| Filled   | `.button` `.button-filled` | <button class="button button-filled">Filled</button> | <button class="button button-filled is-hovered">Filled</button> | <button class="button button-filled is-hovered" disabled>Filled</button> |

```abut-html
<button class="button">Click me!</button>
```

## Primary

A visual style used to highlight only the most important actions. To avoid confusing users, don't use more than one primary button within a section or view. Note that the clear variant of primary buttons must be used on a very light background or it will not pass constrast requirements. If you run into this issue, try using [`link-button`](~/src/components/link-button.md), which defaults to a slightly darker blue for this very reason.

| Type     | Class                                          | Default State                                                       | Hover                                                                          | Disabled                                                                     |
| -------- | ---------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Outlined | `.button`, `.button-primary`                   | <button class="button button-primary">Default</button>              | <button class="button button-primary is-hovered">Default</button>              | <button class="button button-primary" disabled>Default</button>              |
| Clear    | `.button`, `.button-primary`, `.button-clear`  | <button class="button button-primary button-clear">Clear</button>   | <button class="button button-primary button-clear is-hovered">Clear</button>   | <button class="button button-primary button-clear" disabled>Clear</button>   |
| Filled   | `.button`, `.button-primary`, `.button-filled` | <button class="button button-primary button-filled">Filled</button> | <button class="button button-primary button-filled is-hovered">Filled</button> | <button class="button button-primary button-filled" disabled>Filled</button> |

```abut-html
<button class="button button-primary">Click me!</button>
```

## Semantic Colors

Semantic colors denote standard value states (such as good, bad, or warning). Each color has the same basic meaning in all contexts. Our semantic color buttons are used infrequently.

### Danger

Danger buttons are red on most themes. They help reiterature that the intended action is important or potentially dangerous (e.g., deleting an item or transferring ownership).

| Type     | Class                                        | Default State                                                      | Hover                                                                         | Disabled                                                                    |
| -------- | -------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Outlined | `.button`, `.button-danger`                  | <button class="button button-danger">Default</button>              | <button class="button button-danger is-hovered">Default</button>              | <button class="button button-danger" disabled>Default</button>              |
| Clear    | `.button`, `.button-danger`, `.button-clear` | <button class="button button-danger button-clear">Clear</button>   | <button class="button button-danger button-clear is-hovered">Clear</button>   | <button class="button button-danger button-clear" disabled>Clear</button>   |
| Filled   | `.button` `.button-danger`, `.button-filled` | <button class="button button-danger button-filled">Filled</button> | <button class="button button-danger button-filled is-hovered">Filled</button> | <button class="button button-danger button-filled" disabled>Filled</button> |

```abut-html
<button class="button button-danger">Click me!</button>
```

### Success

Success buttons are green on most themes. This color stands for a good, positive situation or for the successful completion of a task. Use the good/positive semantic color if ...

- You need to highlight a good or positive status.
- A message contains information about a process that was finalized without any issues. Users need this information later on (for example, to copy values to another app).

| Type     | Class                                         | Default State                                                       | Hover                                                                          | Disabled                                                                     |
| -------- | --------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Outlined | `.button`, `.button-success`                  | <button class="button button-success">Default</button>              | <button class="button button-success is-hovered">Default</button>              | <button class="button button-success" disabled>Default</button>              |
| Clear    | `.button`,`.button-success`, `.button-clear`  | <button class="button button-success button-clear">Clear</button>   | <button class="button button-success button-clear is-hovered">Clear</button>   | <button class="button button-success button-clear" disabled>Clear</button>   |
| Filled   | `.button`, `.button-success` `.button-filled` | <button class="button button-success button-filled">Filled</button> | <button class="button button-success button-filled is-hovered">Filled</button> | <button class="button button-success button-filled" disabled>Filled</button> |

```abut-html
<button class="button button-success">Click me!</button>
```

### Warning

Warning buttons are yellow on most themes. This color indicates a critical situation or warning. Use this semantic color if ...

- You want to highlight a critical status.
- A minor problem has occcurred. The user can carry on working but might run into an error later on.
- The current mode or page can be finalized, but doing so might lead to an error later on.
- The user input was validated and a minor problem occurred. The user can continue without fixing the problem, but might lead to an error later on.
- A message contains information about a warning.

| Type     | Class                                           | Default State                                                       | Hover                                                                          | Disabled                                                                     |
| -------- | ----------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Outlined | `.button`, `.button-warning`                    | <button class="button button-warning">Default</button>              | <button class="button button-warning is-hovered">Default</button>              | <button class="button button-warning" disabled>Default</button>              |
| Clear    | `.button`, `.button-warning`, `.button-clear`   | <button class="button button-warning button-clear">Clear</button>   | <button class="button button-warning button-clear is-hovered">Clear</button>   | <button class="button button-warning button-clear" disabled>Clear</button>   |
| Filled   | `.button` , `.button-warning`, `.button-filled` | <button class="button button-warning button-filled">Filled</button> | <button class="button button-warning button-filled is-hovered">Filled</button> | <button class="button button-warning button-filled" disabled>Filled</button> |

```abut-html
<button class="button button-warning">Click me!</button>
```

## Variations

Although variations are discussed one at a time on this page, you are able to use any combination of them together!

### Size

Make a button smaller or bigger than the default.

```html
<button class="button button-sm">Small</button>
<button class="button">Default</button>
<button class="button button-lg">Large</button>
```

### Block button

Make a button take up the full width of a container.

```html
<button class="button button-block">Block</button>
```

### Loading buttons

Ensure the user knows they need to wait for some event (like a fetch request) in order to interact with a button.

```html
<button class="button is-loading">Loading</button>
<button class="button button-primary button-filled is-loading">Loading</button>
```

<!--
## Adaptive buttons

The default clear button picks up the color the text set on a container. It is best used as an color-accessible button on a color not part of one of the Atlas themes. These button do not support loading states.

Note! These buttons are not intended to be full featured, but rather to work when our typical themed buttons won't satisfy color requirements for non-standard background. Use with care, and _always test for a contrast ratio of greater than 4.5:1 between foreground and background_. When using them, it is recommended that you use a static text color, or to use in conjunction with a theme class to prevent accidental effects on other themes.

```html
<div class="padding-lg theme-light background-color-alternate color-warning">
	<button class="button button-clear">Adaptive clear</button>
	<button class="button button-clear border">Adaptive with border</button>
	<button class="button button-clear border" disabled>Adaptive disabled</button>
</div>
```
-->
