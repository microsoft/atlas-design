# Atlas Site - Copilot Instructions

applyTo: "site/\*\*"

This is the `@microsoft/atlas-site` package, the documentation website for the Atlas Design System.

## Package Overview

- **Name**: `@microsoft/atlas-site`
- **Type**: Documentation site (private package)
- **Build Tool**: Parcel
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
│   └── scaffold/          # Page templates
├── dist/                  # Built site output
├── toc.js                 # Table of contents generator
└── *.template             # Scaffold templates
```

## Key Commands

- `npm run start` - Start dev server on port 1111
- `npm run build` - Build production site
- `npm run toc` - Regenerate table of contents
- `npm run lint` - Run ESLint on TypeScript files

## Scaffold Templates and Scripts

The `site/src/scaffold/` folder contains more than just SCSS — it holds the **HTML page templates** (e.g., `standard.html`, `token.html`) that wrap every documentation page, and **TypeScript scripts** in `site/src/scaffold/scripts/` that power interactive demos on documentation pages.

Scaffold scripts handle behaviors like:

- Toggling layout classes (e.g., switching between `layout-holy-grail` and `layout-twin`)
- Collapsing/expanding menu and aside containers
- Full-screen toggle for component demos
- Height constraint toggling

These scripts are site-only (not published in `@microsoft/atlas-js`). When adding new interactive controls to documentation pages, add the behavior script here and wire it up via `data-*` attributes in the HTML templates.

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
- `@microsoft/parcel-transformer-markdown-html` - Markdown processing

## When Making Changes

1. Run `npm run start` to preview changes locally
2. Ensure new pages are added to the table of contents
3. Include code examples for new components/utilities
4. Test accessibility with the integration package
5. Run `npm run lint` before committing
