import { createThemeState, ThemeStateInstance } from '@microsoft/atlas-js/src/index';
import { parseQueryString } from './query-string';
import { atlasTokens } from './tokens';

/**
 * Theme names are derived from the Atlas CSS tokens so the site always offers
 * exactly the themes the stylesheet ships. The zero-dependency
 * `createThemeState` behavior in `@microsoft/atlas-js` owns persistence,
 * system-preference resolution, class application, and the `[data-theme-cycle]`
 * controls — this file is just the site-specific glue around it.
 */
const themes = Object.keys(atlasTokens.themes.tokens.$themes);

declare global {
	interface Window {
		/** Applies a theme without persisting it. Used by `page.evaluate` in screenshots. */
		setTheme: (theme: string) => void;
	}
}

let themeState: ThemeStateInstance | undefined;

/**
 * Initialize theme handling for the documentation site.
 *
 * The blocking `#theme-preference` script in `<head>` (see
 * `site/src/components/theme.md`) has already applied the persisted/system
 * theme before first paint; `createThemeState` re-resolves the same value
 * (a no-op in the common case) and wires up the cycle controls. After that we
 * layer on the site-only `?theme=` override used for forcing a theme on load.
 */
export function initTheme(): ThemeStateInstance {
	themeState = createThemeState({ themes, storageKey: 'theme' });

	// Themes can be forced — without persisting — via a `?theme=` query argument.
	const { theme } = parseQueryString();
	if (theme && themes.indexOf(theme) !== -1) {
		themeState.setTheme(theme, false);
	}

	// Exposed for screenshot tooling, which drives the theme via page.evaluate.
	window.setTheme = (name: string) => themeState?.setTheme(name, false);

	return themeState;
}
