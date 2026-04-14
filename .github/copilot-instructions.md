# Atlas Design System - Copilot Instructions

The Atlas Design System is a CSS-first framework powering Microsoft Learn. It's a monorepo with seven workspaces: `css`, `js`, `site`, `integration`, `extension`, and two plugins.

## Commands

```bash
# Install dependencies (from root)
npm install

# Development - start site with hot reload (port 1111)
npm run start

# Build
npm run build:css          # Build CSS package
npm run build:js           # Build JS package
npm run build:site         # Build documentation site

# Lint
npm run lint               # All packages
npm run lint:css           # SCSS only
npm run lint:js            # TypeScript only
npm run lint-fix           # Auto-fix lint issues

# Testing (requires site running on port 1111)
npm run integration        # Run Playwright integration tests
npm run integration:debug  # Debug mode with browser
npx playwright test -g "test name"  # Run single test (from integration folder)

# Visual regression
npm run screenshots:light  # Light theme only
npm run screenshots:all    # All themes
```

## Architecture

**CSS-first philosophy**: JavaScript is added only when required for accessibility or as lightweight web components. Most UI patterns should be achievable with CSS alone.

**Packages**:

- `css/` - SCSS framework (`@microsoft/atlas-css`) - tokens, mixins, atomics, components
- `js/` - TypeScript behaviors (`@microsoft/atlas-js`) - behaviors, elements, utilities
- `site/` - Documentation site built with Parcel and Markdown
- `site/src/scaffold` - Contains HTML page templates, SCSS, and JS that is not appropriate for publishing in our npm packages and is for the site only
- `integration/` - Playwright tests for visual regression and accessibility
- `extension/` - VS Code extension for class IntelliSense
- `plugins/stylelint-config-atlas/` - Shared Stylelint configuration
- `plugins/parcel-transformer-markdown-html/` - Markdown-to-HTML transformer

**Token flow**: CSS variables are defined in `css/src/tokens/`, exported to JSON/TS via `npm run build:tokens`, and consumed by other packages.

## SCSS Conventions

**Property order** (enforced by Stylelint):

1. Display/position
2. Flexbox/Grid
3. Box model (width, height, margin, padding)
4. Visual (border, background)
5. Typography
6. Miscellaneous

**Required practices**:

- Use logical properties (`margin-inline` not `margin-left/right`)
- Font sizes in `rem` or `em` only (no `px`)
- No ID selectors, no vendor prefixes
- Maximum 3 levels of nesting, specificity `0,4,1`
- Use `!default` flag for all token variables

**Naming**:

- Components: noun/noun-phrase, one top-level class per file
- Modifiers: include component name (`.button-primary`)
- State classes: `is-` prefix (`is-disabled`, `is-focused`)
- Sizes: t-shirt abbreviations (`xs`, `sm`, `md`, `lg`, `xl`, `xxl`)
- Atomics: `.<property>-<value>[-<screensize>]` (e.g., `.margin-top-lg-tablet`)
- Do NOT use BEM naming conventions.

## TypeScript Conventions

- Strict mode enabled
- Export all public APIs from `index.ts`
- JSDoc comments on public functions
- Zero external dependencies
- ARIA attributes for accessibility

## Documentation Site

- Markdown with YAML frontmatter (title, description, template)
- Internal links use `~/src/path/to/file.md` format
- Code examples should show both HTML and rendered output
- New CSS requires corresponding documentation updates

## Changesets

Required for changes to `css/` or `js/`, but also recommended for changes to the site.

```bash
npx changeset add
```

Use semantic versioning: major (breaking), minor (new feature), patch (fix).

In SCSS a change is considered breaking if it changes the structure of the markup in such a way that would break a downstream consumer.

## Code Style

Prettier configuration (auto-applied on commit):

- Tabs for indentation
- Single quotes
- No trailing commas
- 100 character line width

## Other code path specific instructions

You can find in /.github/instructions
