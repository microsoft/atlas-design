---
'@microsoft/atlas-js': minor
'@microsoft/atlas-site': minor
---

Add `createThemeState`, a zero-dependency theme behavior to `@microsoft/atlas-js` that resolves, applies, and persists the active `theme-*` class, falls back to the system `prefers-color-scheme`, and wires up `[data-theme-cycle]` controls. The documentation site now uses it (replacing the bespoke site-only theming module) and ships a render-blocking inline `#theme-preference` guard in `<head>` to prevent a wrong-theme flash when scripts are deferred. See the new `components/theme.md` page.
