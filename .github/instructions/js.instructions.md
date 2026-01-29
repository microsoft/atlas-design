# Atlas JS - Copilot Instructions

applyTo: "js/**"

This is the `@microsoft/atlas-js` package, providing TypeScript/JavaScript behaviors for the Atlas Design System.

## Package Overview

- **Name**: `@microsoft/atlas-js`
- **Type**: TypeScript library
- **Build Tool**: TypeScript compiler (tsc)
- **Output**: ES modules with declarations

## Project Structure

```
js/
├── src/
│   ├── behaviors/    # Behavior modules (e.g., popover, modal)
│   ├── elements/     # Custom elements / web components
│   ├── utilities/    # Shared utility functions
│   └── index.ts      # Main entry point
└── dist/             # Compiled JavaScript output
```

## Key Commands

- `npm run build` - Compile TypeScript to JavaScript
- `npm run lint` - Run ESLint on TypeScript files
- `npm run prepublishOnly` - Lint and build before publishing

## When to Add JavaScript

Atlas prioritizes CSS-only solutions. Add JavaScript only when:

1. **Accessibility requirements** - Markup/attributes must change on interaction for screen readers
2. **Web components** - Pattern is a good candidate for a reusable, lightweight web component

## Coding Guidelines

### TypeScript Conventions

1. **Use strict TypeScript** - Enable all strict checks
2. **Export from index.ts** - All public APIs must be exported from the main entry
3. **JSDoc comments** - Document public functions and classes
4. **Avoid dependencies** - Keep the package lightweight

### Accessibility First

- Always include ARIA attributes where appropriate
- Test with screen readers when modifying interactive behaviors
- Follow WAI-ARIA patterns for component implementations

### File Organization

- **behaviors/**: Modules that attach behavior to existing DOM elements
- **elements/**: Custom elements that extend HTMLElement
- **utilities/**: Pure functions with no side effects

## Integration Testing

Behavioral tests are in the `integration` package:
- Tests use Playwright
- Run from repository root: `npm run integration`

## When Making Changes

1. Run `npm run lint` before committing
2. Build with `npm run build` to verify compilation
3. Test interactively with the site package
4. Add integration tests for new behaviors in the `integration` package
