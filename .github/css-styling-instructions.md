# CSS Styling Instructions

This document provides guidelines for writing maintainable, consistent, and well-documented CSS in the Atlas Design System.

## Semantic Class Naming

### Components
- Use descriptive noun or noun-phrase names for components (e.g., `.button`, `.card`, `.message`)
- Keep component names as short as applicable while remaining descriptive
- Modifiers should contain the parent component name (e.g., `.button-lg`, `.card-hero`)
- Use state-based classes with `is-` prefix (e.g., `.is-disabled`, `.is-hovered`, `.is-focused`)

### Atomics
Follow the established pattern for atomic utility classes:
```
.<css-property-name>-<value>
// or for responsive variants
.<css-property-name>-<value>-<screensize>
```

Examples:
- `.display-flex`
- `.margin-inline-lg`
- `.color-primary`
- `.font-size-md-tablet`

## Utility Classes and Variables

### Prefer Utility Classes
- Use atomic utility classes for common properties instead of writing custom CSS
- Available categories include:
  - Display (`.display-inline-flex`)
  - Spacing (`.margin-inline-lg`, `.padding-block-sm`)
  - Color (`.color-primary`, `.background-secondary`)
  - Typography (`.font-size-md`, `.font-weight-semibold`)
  - Flex properties (`.justify-content-center`)
  - And more...

### Use Design Tokens
- Always use design system variables for consistency
- Color variables: `$primary`, `$text`, `$body-background`
- Spacing variables: `$layout-1` through `$layout-6` (xxs to xl)
- Typography variables: `$font-size-1` through `$font-size-12`
- Border and radius variables: `$control-border`, `$control-radius`

Example:
```scss
.custom-component {
  color: $text;
  background-color: $body-background;
  padding: $layout-3; // sm spacing
  border-radius: $control-radius;
}
```

## Organization by Category

### Atomic Classes
Organize atomic utilities by CSS property categories:
- **Display & Layout**: `display.scss`, `position.scss`, `flex.scss`
- **Spacing**: `spacing.scss`, `spacing-auto.scss`
- **Typography**: `typography.scss`, `line-clamp.scss`
- **Visual**: `colors.scss`, `border.scss`, `shadow.scss`
- **Responsive**: Include screen size suffixes (`-tablet`, `-desktop`, `-widescreen`)

### Components
Structure components with logical nesting (max 2-3 levels deep):
```scss
.component {
  // Base styles
  
  &.component-sm {
    // Size modifier
  }
  
  &.component-lg {
    // Size modifier
  }
  
  .component-sub {
    // Sub-component
  }
  
  .component-sub-element {
    // Nested element
  }
}
```

### Size Abbreviations
Use t-shirt sizing with abbreviations:
- `xs` - extra small
- `sm` - small  
- `lg` - large
- `xl` - extra large

## Documentation of Custom Styles

### Comment Guidelines
- Document the purpose of complex or non-obvious styles
- Explain calculations and magic numbers
- Note browser-specific workarounds
- Reference design decisions when applicable

Example:
```scss
.custom-layout {
  // Use calc to account for border width in padding
  padding: calc(0.375em - #{$button-border-width});
  
  // Flexbox fallback for older browsers
  display: flex;
  display: grid; // Preferred when supported
  
  // Magic number based on design specs for visual balance
  margin-top: 0.125rem; // 2px visual adjustment
}
```

### File Organization
- One main component class per file
- File name should match the primary class name
- Include sub-components and modifiers in the same file
- Use index files to export collections

## Best Practices

### Specificity Management
- Keep selectors simple and low specificity
- Avoid nested selectors beyond 2-3 levels
- Use class selectors over element selectors when possible
- Avoid `!important` unless absolutely necessary

### Responsive Design
- Use mobile-first approach with atomic classes
- Apply base styles first, then override for larger screens
- Available breakpoints: `tablet`, `desktop`, `widescreen`

### Accessibility
- Ensure sufficient color contrast using design tokens
- Include focus states for interactive elements
- Use semantic HTML with appropriate CSS enhancement
- Test with screen readers and keyboard navigation

## Validation
- Run linting with the project's stylelint configuration
- Test styles across supported browsers and devices
- Validate against design system tokens and patterns
- Ensure no breaking changes to existing components
