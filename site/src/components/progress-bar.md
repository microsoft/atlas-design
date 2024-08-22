---
title: Progress Bar
description: The Progress Bar component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - progress-bar
---

# Progress

The `.progress-bar` component is used to display the completion progress of a task, or to show that something is happening now. Progress is build on top of the [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) HTML component.

## Usage

Here is an example of a standard usage of the progress bar component. Its bar is styled by the `value` attribute.

```html
<progress class="progress-bar" value="90" max="100"></progress>
```

### Sizes

`progress-sm` makes progress bar a little smaller than the default.

```html
<progress class="progress-bar progress-bar-sm" value="90" max="100"></progress>
```

### Semantic colors

Progress additionally has three color variants: warning, danger, and success.

| State   | Class                                | Example                                                                               |
| ------- | ------------------------------------ | ------------------------------------------------------------------------------------- |
| Danger  | `.progress-bar.progress-bar-danger`  | <progress class="progress-bar progress-bar-danger" value="40" max="100"></progress>   |
| Warning | `.progress-bar.progress-bar-warning` | <progress class="progress-bar progress-bar-warning" value="70" max="100"></progress>  |
| Success | `.progress-bar.progress-bar-success` | <progress class="progress-bar progress-bar-success" value="100" max="100"></progress> |

### Indeterminate

When its unclear the amount of progress being made, or when its more important to display that an action is underway, removing the `value` attribute will yield an indeterminate progress bar.

```html
<progress class="progress-bar" max="100"></progress>
```
