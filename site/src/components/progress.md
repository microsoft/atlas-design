---
title: Progress
description: The progress component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D1488%253A35182
---

# Progress

The `.progress` component is used to display the progress a user has made toward a particular goal, or to show that something is happening now.

## Usage

Progress has three color variants: default, primary, and success. Its bar is styled by the `value` attribute.

```html
<progress class="progress" value="97" max="100"></progress>
```

## Colors

Progress has three color variants: default, primary, and success.

```html
<progress class="progress progress-primary margin-bottom-sm" value="10" max="100"></progress>
<progress class="progress progress-success" value="56" max="100"></progress>
```

## Sizes

Progress has one additional size (`sm`).

```html
<progress class="progress progress-sm" value="97" max="100"></progress>
```

## Indeterminate and Reduced motion

When its unclear the amount of progress being made, or when its more important to display that an action is underway, removing the `value` attribute will yield an indeterminate progress bar.

**The animation for this is greatly slowed when a user's motion preference is set to `prefers-reduced-motion`. [See how to emulate reduced motion in chromium](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/accessibility/reduced-motion-simulation).**

```html
<progress class="progress progress-sm margin-bottom-sm" max="100"></progress>
```
