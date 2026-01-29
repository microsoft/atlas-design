# Stylelint Config Atlas - Copilot Instructions

applyTo: "plugins/stylelint-config-atlas/\*\*"

This is the `@microsoft/stylelint-config-atlas` package, a shareable Stylelint configuration for Atlas CSS.

## Package Overview

- **Name**: `@microsoft/stylelint-config-atlas`
- **Type**: Stylelint shareable config (private package)
- **Purpose**: Enforce consistent SCSS/CSS coding standards

## Project Structure

```
plugins/stylelint-config-atlas/
├── index.js      # Main configuration export
├── package.json
└── README.md
```

## Key Rules Enforced

### Property Ordering

Properties must follow a specific order:

1. Display and positioning
2. Flexbox/Grid
3. Box model (width, height, margin, padding)
4. Visual (border, background)
5. Typography
6. Miscellaneous

### Logical Properties

- Prefer logical properties (e.g., `margin-inline` over `margin-left/right`)
- Exceptions: `width`, `height`, `min-*`, `max-*`

### Units

- Font sizes must use `rem` or `em` (no `px`)

### Selectors

- No ID selectors (`selector-max-id: 0`)
- No qualifying type selectors
- Maximum specificity: `0,4,1`
- Maximum 4 compound selectors
- Maximum 3 levels of nesting

### Vendor Prefixes

- No vendor prefixes (handled by build tools)

### SCSS Specific

- Use `@extend` only with placeholders
- Variable names: `^_?[a-z]+[\\w-]*$`
- Always include file extension in `@use`/`@import`

## Dependencies

- `stylelint` - Core linter
- `stylelint-scss` - SCSS-specific rules
- `stylelint-order` - Property ordering
- `stylelint-use-logical` - Logical property enforcement
- `stylelint-config-standard` / `stylelint-config-recommended-scss` - Base configs

## When Making Changes

1. Changes affect all Atlas CSS linting
2. Test changes against the CSS package: `npm run lint` in css folder
3. Document any new rules or rule changes
4. Consider backward compatibility
5. Update atlas-css if rules require code changes
