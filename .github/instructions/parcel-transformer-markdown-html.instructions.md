# Parcel Transformer Markdown HTML - Copilot Instructions

applyTo: "plugins/parcel-transformer-markdown-html/**"

This is the `@microsoft/parcel-transformer-markdown-html` plugin, a Parcel transformer that converts Markdown to HTML for the Atlas site.

## Package Overview

- **Name**: `@microsoft/parcel-transformer-markdown-html`
- **Type**: Parcel plugin (private package)
- **Purpose**: Transform Markdown files into HTML pages

## Project Structure

```
plugins/parcel-transformer-markdown-html/
├── lib/
│   ├── index.js        # Main transformer entry
│   ├── breadcrumbs.js  # Breadcrumb generation
│   └── github-link.js  # GitHub edit link generation
└── package.json
```

## Key Dependencies

- `parcel` / `@parcel/plugin` - Parcel plugin API
- `marked` - Markdown parsing
- `highlight.js` - Syntax highlighting
- `front-matter` - YAML frontmatter parsing
- `mustache` - Template rendering

## How It Works

1. Parses Markdown files with frontmatter
2. Converts Markdown to HTML using `marked`
3. Applies syntax highlighting with `highlight.js`
4. Renders through Mustache templates
5. Generates breadcrumbs and GitHub edit links

## Coding Guidelines

### Parcel Plugin API

1. **Follow Parcel transformer patterns** - Use the `@parcel/plugin` API correctly
2. **Handle assets properly** - Return valid Parcel asset objects
3. **Support hot reloading** - Ensure changes trigger rebuilds

### Markdown Processing

- Use `marked` for Markdown-to-HTML conversion
- Configure `highlight.js` for code block highlighting
- Parse frontmatter with `front-matter` package

## When Making Changes

1. Test with the site package (`npm run start` in site folder)
2. Verify Markdown rendering for various content types
3. Check that syntax highlighting works correctly
4. Ensure breadcrumbs and navigation links work
5. Test with different frontmatter configurations
