---
title: Copy Button
description: A specialized button component for copying content with visual feedback
template: standard
figmaEmbed: https://www.figma.com/design/9Gj2jqai9E2uNE2It10mHA/Public-Profile?node-id=343-33260&t=hC0pbLqAo8oRgOOV-0
classType: Component
classPrefixes:
  - copy-button
---

# Copy Button

The Copy Button component provides an accessible way to copy content (such as URLs, text, or input values) to the user's clipboard with visual feedback states.

## Features

- **Accessible**: Follows ARIA guidelines and keyboard navigation standards
- **Visual Feedback**: Shows success state with icon and text changes
- **Flexible Content**: Can copy predefined text, input values, or the current URL
- **Customizable**: Supports different sizes and reset delays
- **Progressive Enhancement**: Works with modern clipboard API and falls back to older methods

## Basic Usage

### Copy Predefined Text

Use `data-copy-text` to specify the exact text to copy:

```html
<button class="copy-button" data-copy-button data-copy-text="https://example.com/my-profile">
  <span class="copy-button-icon">
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
    </svg>
  </span>
  <span class="copy-button-text">Copy public URL</span>
</button>
```

### Copy Input Value

Use `data-copy-target` to copy the value of another element:

```html
<input type="url" id="profile-url" value="https://example.com/my-profile" readonly>
<button class="copy-button" data-copy-button data-copy-target="#profile-url">
  <span class="copy-button-icon">
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
    </svg>
  </span>
  <span class="copy-button-text">Copy URL</span>
</button>
```

### Copy Current Page URL

If neither `data-copy-text` nor `data-copy-target` are provided, the current page URL will be copied:

```html
<button class="copy-button" data-copy-button>
  <span class="copy-button-icon">
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
    </svg>
  </span>
  <span class="copy-button-text">Copy page URL</span>
</button>
```

## Sizes

The copy button supports three sizes:

### Default Size

```html
<button class="copy-button" data-copy-button data-copy-text="Default size">
  <span class="copy-button-icon">
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
    </svg>
  </span>
  <span class="copy-button-text">Copy</span>
</button>
```

### Small Size

```html
<button class="copy-button copy-button-sm" data-copy-button data-copy-text="Small size">
  <span class="copy-button-icon">
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
    </svg>
  </span>
  <span class="copy-button-text">Copy</span>
</button>
```

### Large Size

```html
<button class="copy-button copy-button-lg" data-copy-button data-copy-text="Large size">
  <span class="copy-button-icon">
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
    </svg>
  </span>
  <span class="copy-button-text">Copy</span>
</button>
```

## States

The copy button automatically handles visual state changes:

| State | Description | Visual Changes |
|-------|-------------|----------------|
| Default | Initial state, ready to copy | Primary border and text color |
| Hover | User hovers over button | Subtle background highlight |
| Success | Content successfully copied | Green background, white text, checkmark icon, "Copied" text |
| Disabled | Button is disabled | Reduced opacity, no interaction |

## Configuration

### Custom Reset Delay

By default, the success state lasts for 2 seconds. You can customize this:

```html
<button class="copy-button" data-copy-button data-copy-text="Hello World" data-copy-reset-delay="5000">
  <span class="copy-button-icon">
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
    </svg>
  </span>
  <span class="copy-button-text">Copy (5s feedback)</span>
</button>
```

## JavaScript Initialization

To enable the copy functionality, initialize the behavior:

```javascript
import { initCopyButton } from '@microsoft/atlas-js';

// Initialize copy button functionality
initCopyButton();
```

## Events

The copy button dispatches custom events for integration with analytics or other systems:

```javascript
// Listen for successful copy events
window.addEventListener('copy-success', (event) => {
  console.log('Content copied:', event.detail.text);
  console.log('Button element:', event.detail.button);
});

// Listen for copy error events
window.addEventListener('copy-error', (event) => {
  console.log('Copy failed:', event.detail.button);
});
```

## Accessibility

The copy button component follows accessibility best practices:

- **Keyboard Navigation**: Fully accessible via keyboard (Tab to focus, Enter/Space to activate)
- **Focus Management**: Clear focus indicators for keyboard users
- **Screen Reader Support**: Descriptive text that updates when copy succeeds
- **Semantic HTML**: Uses proper button semantics

## Browser Support

- **Modern Browsers**: Uses the Clipboard API for secure, asynchronous copying
- **Legacy Support**: Falls back to `document.execCommand('copy')` for older browsers
- **Progressive Enhancement**: Gracefully degrades if JavaScript is disabled

## Implementation Notes

1. The component requires the JavaScript behavior to be initialized
2. HTTPS is required for the modern Clipboard API to work
3. Some browsers may require user interaction before clipboard access is granted
4. The fallback method creates a temporary textarea element for copying