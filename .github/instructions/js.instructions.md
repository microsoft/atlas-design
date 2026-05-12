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
- `npm run test` - Run unit tests with Vitest
- `npm run test:coverage` - Run unit tests with code coverage report
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

## Unit Testing

Unit tests use [Vitest](https://vitest.dev/) with a jsdom environment for DOM APIs.

### Running Tests

- `npm run test` - Run all unit tests (from `js/` folder or repo root)
- `npm run test:coverage` - Run tests with code coverage report
- `npx vitest --watch` - Watch mode during development (from `js/` folder)
- `npx vitest run src/utilities/util.test.ts` - Run a specific test file

### Writing Tests

1. **Place test files next to source** - Use `*.test.ts` suffix (e.g., `util.test.ts` beside `util.ts`)
2. **Import from vitest** - Use `import { describe, it, expect } from 'vitest'`
3. **Use jsdom for DOM tests** - The test environment provides `document`, `window`, etc.
4. **Test pure functions directly** - For utilities, test inputs and outputs
5. **Test DOM behaviors** - For behaviors/elements, create DOM fixtures and assert side effects

### Coverage

- Coverage uses the `v8` provider via `@vitest/coverage-v8`
- Reports are generated in `js/coverage/` (text, JSON summary, and HTML)
- Coverage runs automatically in CI and is reported in the GitHub Actions job summary

## When Making Changes

1. Run `npm run lint` before committing
2. Build with `npm run build` to verify compilation
3. Run `npm run test` to ensure all unit tests pass
4. Test interactively with the site package
5. Add unit tests for new utilities and pure functions
6. Add integration tests for new behaviors in the `integration` package
