---
title: Theme
description: Switching and persisting themes in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - theme
hero: true
---

# Theme

Atlas ships three themes out of the box — `light`, `dark`, and `high-contrast` — each expressed as a single class on the document root: `theme-light`, `theme-dark`, or `theme-high-contrast`. Swapping that one class re-themes the entire page. You can add unlimited custom themes via the [color tokens](~/src/tokens/colors.md).

```html-no-example
<html class="theme-dark">
	<!-- every Atlas color token now resolves to its dark value -->
</html>
```

Use the theme switcher in the toolbar above to cycle this page through the three themes.

## Persisting the theme across page loads

`@microsoft/atlas-js` exports `createThemeState`, a zero-dependency behavior that resolves the active theme (from `localStorage`, then the system `prefers-color-scheme`, then a default), applies the `theme-*` class to `<html>`, persists the user's choice, and wires up click-to-cycle controls. See the [atlas-js README](https://github.com/microsoft/atlas-design/tree/main/js#readme) for the full API.

Because the package is zero-dependency, it does **not** read the theme list from `@microsoft/atlas-css`. Pass your themes in — typically the keys of the Atlas color tokens — so the behavior cycles through exactly the themes your stylesheet ships.

```typescript
import { createThemeState } from '@microsoft/atlas-js';

const theme = createThemeState({
	themes: ['light', 'dark', 'high-contrast'],
	storageKey: 'theme'
});

// Keep a toggle button's label in sync. Fires immediately with the current
// theme, then on every later change.
theme.subscribe(name => {
	const button = document.querySelector('[data-theme-cycle]');
	button?.setAttribute('aria-label', `Theme: ${name}`);
});
```

### Cycle controls

By default `createThemeState` listens for clicks on any element matching `[data-theme-cycle]` and advances to the next theme in the list, wrapping around at the end. No extra wiring is needed — just add the attribute to a button.

```html-no-example
<button data-theme-cycle aria-label="Change theme">
	<span class="icon" aria-hidden="true"><!-- icon --></span>
</button>
```

Pass `controlSelector: '.my-selector'` to use a different hook, or `controlSelector: null` to manage controls yourself and drive the theme with `setTheme()` / `cycle()`.

### Options

| Option                | Default                              | Description                                                                                           |
| --------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `themes`              | `['light', 'dark', 'high-contrast']` | Ordered theme names. The order drives `cycle()`; the first is the fallback default.                   |
| `storageKey`          | `'theme'`                            | `localStorage` key the active theme is persisted under.                                               |
| `classPrefix`         | `'theme-'`                           | Prefix joined to the theme name to form the document class.                                           |
| `defaultTheme`        | `themes[0]`                          | Theme used when nothing is stored and no system preference applies.                                   |
| `useSystemPreference` | `true`                               | When `true`, a `prefers-color-scheme: dark` match resolves to `systemDarkTheme` when stored is empty. |
| `systemDarkTheme`     | `'dark'`                             | Theme chosen for a dark system preference. Ignored if absent from `themes`.                           |
| `controlSelector`     | `'[data-theme-cycle]'`               | Delegated click target that cycles the theme. Pass `null` to skip wiring controls.                    |
| `root`                | `document.documentElement`           | Element the `theme-*` class is applied to.                                                            |
| `storage`             | `window.localStorage`                | Storage backing persistence.                                                                          |

## Preventing the theme flash before first paint

Calling `createThemeState()` from a module bundle applies the theme **after** the HTML is parsed. Because module scripts are deferred, the browser briefly paints the markup-default theme (`theme-light`) before the persisted theme takes over — a visible flash for anyone on dark or high-contrast.

Fix it the same way Atlas fixes the [layout flash](~/src/components/layout.md#inline-restore-script-in-head): run a small synchronous IIFE in `<head>`, before the bundle, that applies the persisted (or system) theme before first paint. Keep it dependency-free and wrapped in `try/catch` so a storage exception can never block rendering.

```html-no-example
<head>
	<!-- Apply the persisted/system theme before first paint to prevent a wrong-theme flash. -->
	<script id="theme-preference">
		(function () {
			try {
				var themes = ['light', 'dark', 'high-contrast'];
				var stored = localStorage.getItem('theme');
				var theme =
					themes.indexOf(stored) !== -1
						? stored
						: matchMedia('(prefers-color-scheme: dark)').matches
							? 'dark'
							: 'light';
				var html = document.documentElement;
				for (var i = 0; i < themes.length; i++) {
					html.classList.remove('theme-' + themes[i]);
				}
				html.classList.add('theme-' + theme);
			} catch (e) {}
		})();
	</script>
	<script type="module" src="/your-bundle.js"></script>
</head>
```

The inline guard and `createThemeState` read the same `storageKey` and `classPrefix`, so they always agree. The inline script intentionally handles **only** the flash-prone cases — persisted theme and system dark preference. Richer resolution, such as a `?theme=` query-string override or custom controls, stays in the bundle where `createThemeState` (and any glue around it) runs on load. This split is what lets the page scripts be safely deferred.

<div class="notification notification-warning margin-block-md">
	<div class="notification-content">
		<p class="notification-title">Custom themes need a matching array</p>
		<p class="margin-top-none">
			The <code>themes</code> array in the inline guard is hardcoded to the three built-in themes
			(<code>light</code>, <code>dark</code>, <code>high-contrast</code>). If you add custom themes,
			update this array to match the list you pass to <code>createThemeState</code> — otherwise a
			stored custom theme won't be recognized before first paint and the guard falls back to the
			default, reintroducing the flash. Keep the two lists in sync.
		</p>
	</div>
</div>
