# Atlas Design System Tools (VS Code Extension) - Copilot Instructions

applyTo: "extension/**"

This is the VS Code extension that provides Atlas Design System tooling, including IntelliSense for utility classes.

## Package Overview

- **Name**: `atlas-design-system-tools`
- **Type**: VS Code Extension
- **Publisher**: docsmsft
- **Build Tool**: esbuild

## Project Structure

```
extension/
├── src/
│   ├── extension.ts              # Extension entry point
│   ├── completion-item-provider.ts # IntelliSense provider
│   ├── get-docs-page-for-class.ts  # Documentation link resolver
│   └── test/                     # Extension tests
├── icons/                        # Extension icon assets
└── out/                          # Compiled output
```

## Key Commands

- `npm run esbuild` - Build with sourcemaps for development
- `npm run esbuild-watch` - Watch mode for development
- `npm run lint` - Run ESLint
- `npm run test` - Run extension tests
- `npm run vsce:package` - Package the extension (.vsix)
- `npm run vsce:publish` - Publish to VS Code Marketplace

## Extension Features

1. **IntelliSense for Atlas classes** - Autocomplete utility classes in HTML, Markdown, and TypeScript
2. **Documentation links** - Tooltips link to Atlas Design System documentation

## Coding Guidelines

### VS Code Extension API

1. **Use activation events** - Extension activates on `onStartupFinished`
2. **Minimize startup impact** - Keep activation lightweight
3. **Follow VS Code patterns** - Use the extension API idiomatically

### Dependencies

- Depends on `@microsoft/atlas-css` for class name data
- Keep external dependencies minimal

### Testing

- Tests use VS Code test framework with Mocha
- Run `npm run pretest` to compile before testing

## Development Workflow

1. Open the extension folder in VS Code
2. Press F5 to launch Extension Development Host
3. Test IntelliSense in HTML/Markdown files
4. Check the Debug Console for errors

## When Making Changes

1. Update class data if Atlas CSS classes change
2. Test in the Extension Development Host
3. Run `npm run lint` before committing
4. Update CHANGELOG.md for user-facing changes
