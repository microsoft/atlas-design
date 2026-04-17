# Atlas Integration Testing - Copilot Instructions

applyTo: "integration/\*\*"

This is the `@microsoft/atlas-integration` package, providing integration and visual regression testing for Atlas.

## Package Overview

- **Name**: `@microsoft/atlas-integration`
- **Type**: Test suite (private package)
- **Test Framework**: Playwright
- **Purpose**: Visual regression and behavioral testing

## Project Structure

```
integration/
├── tests/                  # Integration test specs
├── visual-diff/            # Visual regression testing
│   └── screenshots/        # Screenshot comparison reports
├── config/                 # Test configurations
├── tasks/                  # Automation scripts
├── integration-tests.config.ts  # Playwright config for integration tests
└── visual-diff.config.ts   # Playwright config for visual diff
```

## Key Commands

- `npm run test` - Run integration tests
- `npm run test:debug` - Run tests in Playwright debug mode (opens a browser)
- `npm run screenshots:light` - Capture light theme screenshots
- `npm run screenshots:all` - Capture all theme screenshots (light, dark, high-contrast)
- `npm run codegen` - Launch Playwright codegen (requires local server on port 1111)
- `npm run show-report` - View Playwright test report

## Testing Types

### 1. Integration Tests

- Located in `tests/` folder
- Test interactive behaviors from `@microsoft/atlas-js`
- Use assertion-style testing

### 2. Visual Regression Tests

- Located in `visual-diff/` folder
- Compare screenshots of component pages
- Run against the Atlas site

## Coding Guidelines

### Writing Tests

1. **Use Playwright best practices** - Follow Playwright documentation
2. **Tag accessibility tests** - Use `@accessibility` tag in test descriptors
3. **Test screen reader compatibility** - For any DOM-injecting behaviors

### Accessibility Testing

- Uses `@axe-core/playwright` for automated accessibility checks
- Add new pages to `tests/accessibility.spec.ts`
- Use `include` method for dynamically injected elements

### Prerequisites

Before running tests:

1. Install Playwright: `npx playwright install`
2. Start the site server: `npm run start` (in site folder, port 1111)

## Testing CSS Component Behavior

Some integration tests verify CSS-driven behavior (e.g., layout collapsing, height constraints) rather than JavaScript behavior. These tests work by:

1. **Navigating to the component's documentation page** — The site's interactive controls (buttons with `data-*` attributes like `data-set-layout`, `data-menu-collapse-toggle`, `data-aside-collapse-toggle`) toggle CSS classes on the page.
2. **Measuring CSS state** — Use `page.evaluate()` to read computed dimensions (e.g., `getBoundingClientRect().width`, `scrollHeight`) before and after toggling.
3. **Asserting the change** — Compare measurements to verify the CSS took effect (e.g., aside width decreased after collapse).

### Viewport-Based Test Skipping

Tests that depend on a specific screen size use `testInfo.project.name` to skip:

```typescript
test.skip(
	testInfo.project.name !== 'Widescreen Chromium',
	'Skip test if display screen is not widescreen'
);
```

Tag test titles with `@desktop` or `@narrow` to indicate the intended viewport.

## When Making Changes

1. Add new pages to accessibility test list
2. Update visual baselines if intentional visual changes are made
3. Write integration tests for new JavaScript behaviors
4. When adding CSS modifier classes (e.g., collapse toggles), add integration tests that verify the modifier's visual effect at the appropriate viewport size
5. Run full test suite before submitting changes
