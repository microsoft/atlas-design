# Atlas Site - Copilot Instructions

applyTo: "site/\*\*"

This is the `@microsoft/atlas-site` package, the documentation website for the Atlas Design System.

## Package Overview

- **Name**: `@microsoft/atlas-site`
- **Type**: Documentation site (private package)
- **Build Tool**: Eleventy (11ty)
- **Content Format**: Markdown with frontmatter

## Project Structure

```
site/
├── src/
│   ├── index.md           # Homepage
│   ├── atomics/           # Atomic/utility class documentation
│   ├── components/        # Component documentation
│   ├── patterns/          # Pattern documentation
│   ├── tokens/            # Design token documentation
│   └── scaffold/          # Page templates (mustache), styles, TOC data
├── lib/                   # Markdown renderer + Eleventy helpers
├── dist/                  # Built site output
├── eleventy.config.js     # Eleventy configuration
├── build-assets.mjs       # SCSS (dart-sass) + TS (esbuild) compiler
├── dev.mjs                # Dev server runner (asset watch + eleventy --serve)
└── toc.js                 # Table of contents generator
```

## Key Commands

- `npm run start` - Start dev server on port 1111
- `npm run build` - Build production site
- `npm run toc` - Regenerate table of contents
- `npm run lint` - Run ESLint on TypeScript files

## Content Guidelines

### Markdown Files

1. **Include frontmatter** - All pages need title and description
2. **Use Atlas components** - Document with live examples
3. **Follow existing patterns** - Match structure of similar pages
4. **Write internal links to markdown, not html, and let the build system resolve them.** - Example: `href="~/src/components/button.md"`

### Frontmatter Example

```yaml
---
title: Button
description: Button component documentation
template: component
---
```

### Code Examples

- Use fenced code blocks with language specifiers
- Include live HTML examples that render with Atlas CSS
- Show both HTML and rendered output

## Dependencies

- `@microsoft/atlas-css` - Styles for the site
- `@microsoft/atlas-js` - JavaScript behaviors
- `marked` + `mustache` + `highlight.js` - Markdown rendering and templating (see `lib/`)
- `@11ty/eleventy` - Static site generator
- `sass` + `esbuild` - Compile the scaffold SCSS/TypeScript (`build-assets.mjs`)

## When Making Changes

1. Run `npm run start` to preview changes locally
2. Ensure new pages are added to the table of contents
3. Include code examples for new components/utilities
4. Test accessibility with the integration package
5. Run `npm run lint` before committing
