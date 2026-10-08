/* -------------------------------------------------------------------------- */
/* Theme state                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Resolves, applies, and persists the active `theme-*` class on the document
 * root. Zero-dependency: the set of themes is supplied by the caller rather
 * than read from `@microsoft/atlas-css`, so this stays usable by any consumer
 * and keeps `@microsoft/atlas-js` free of cross-package imports.
 *
 * The instance is live on return — the preferred theme has already been
 * resolved and its class applied to `<html>`, and (unless disabled)
 * click-to-cycle controls are wired up.
 *
 * ### Preventing the flash before first paint
 *
 * Like `createLayoutState`, calling this from a module bundle applies the
 * theme **after** the HTML is parsed, so a deferred bundle briefly renders the
 * markup theme before the persisted one takes over. Pair it with the inline
 * `<head>` guard documented in `site/src/components/theme.md`, which applies
 * the persisted/system theme before first paint. The two read the same
 * `storageKey` and `classPrefix`, so they always agree.
 *
 * ### SPA integration
 *
 * Create the instance once at boot. Call `resume()` after a navigation that
 * rewrites `<html>`'s class list to re-apply the persisted theme. Subscribers
 * registered once at boot stay live across navigations.
 */
export interface ThemeStateOptions {
	/**
	 * Ordered list of theme names. The order drives `cycle()`. The first entry
	 * is the default when nothing is stored and no system preference applies.
	 * Defaults to `['light', 'dark', 'high-contrast']`.
	 */
	themes?: string[];
	/** `localStorage` key the active theme is persisted under. Default `'theme'`. */
	storageKey?: string;
	/** Prefix joined to the theme name to form the document class. Default `'theme-'`. */
	classPrefix?: string;
	/** Theme used when nothing is stored and no system preference applies. Default `themes[0]`. */
	defaultTheme?: string;
	/**
	 * When `true` (default) and no theme is stored, a `prefers-color-scheme: dark`
	 * match resolves to `systemDarkTheme` if that theme exists.
	 */
	useSystemPreference?: boolean;
	/** Theme chosen for a dark system preference. Default `'dark'`. Ignored if absent from `themes`. */
	systemDarkTheme?: string;
	/**
	 * Delegated click target that advances to the next theme. Default
	 * `'[data-theme-cycle]'`. Pass `null` to skip wiring controls.
	 */
	controlSelector?: string | null;
	/** Element the `theme-*` class is applied to. Default `document.documentElement`. */
	root?: HTMLElement;
	/** Storage backing persistence. Default `window.localStorage`. */
	storage?: Storage;
}

/** Notified with the new theme name whenever the active theme changes. */
export type ThemeCallback = (theme: string) => void;

export interface ThemeStateInstance {
	/** The currently applied theme name. */
	getTheme(): string;
	/** The ordered list of known theme names. */
	getThemes(): string[];
	/**
	 * Resolve the theme that *would* be applied from storage, then system
	 * preference, then the default — without applying or persisting it.
	 */
	getPreferredTheme(): string;
	/**
	 * Apply `theme` to the root element and notify subscribers. Persists the
	 * choice unless `persist` is `false` (used for non-sticky overrides such as
	 * a `?theme=` query argument). Unknown themes are ignored.
	 */
	setTheme(theme: string, persist?: boolean): void;
	/** Advance to the next theme in `themes` (wrapping), persist it, and return it. */
	cycle(): string;
	/**
	 * Re-resolve the preferred theme and re-apply its class without persisting.
	 * Use after an SPA navigation that rewrote `<html>`'s class list.
	 */
	resume(): void;
	/**
	 * Subscribe to theme changes. The callback fires immediately with the
	 * current theme, then on every subsequent change. Returns an unsubscribe
	 * function that is always safe to call.
	 */
	subscribe(callback: ThemeCallback): () => void;
	/** Remove the control listener and clear all subscriptions. Idempotent. */
	dispose(): void;
}

const DEFAULT_THEMES = ['light', 'dark', 'high-contrast'];

/**
 * Create a live theme controller. See {@link ThemeStateOptions} for behavior.
 *
 * ```ts
 * const theme = createThemeState({ themes: ['light', 'dark', 'high-contrast'] });
 * theme.subscribe(name => console.log('theme is now', name));
 * // clicking any [data-theme-cycle] element advances the theme
 * ```
 */
export function createThemeState(options: ThemeStateOptions = {}): ThemeStateInstance {
	const {
		themes: themesOption,
		storageKey = 'theme',
		classPrefix = 'theme-',
		useSystemPreference = true,
		systemDarkTheme = 'dark',
		controlSelector = '[data-theme-cycle]',
		root = document.documentElement,
		storage = window.localStorage
	} = options;

	const themes =
		Array.isArray(themesOption) && themesOption.length > 0 ? themesOption.slice() : DEFAULT_THEMES;
	const defaultTheme =
		options.defaultTheme && isKnown(options.defaultTheme) ? options.defaultTheme : themes[0];

	const subscriptions = new Set<ThemeCallback>();
	let current = defaultTheme;
	let disposed = false;

	function isKnown(theme: string): boolean {
		return themes.indexOf(theme) !== -1;
	}

	function readStored(): string | null {
		try {
			return storage.getItem(storageKey);
		} catch {
			return null;
		}
	}

	function writeStored(theme: string): void {
		try {
			storage.setItem(storageKey, theme);
		} catch {
			// Storage unavailable (private mode, quota). In-memory state still applies.
		}
	}

	function prefersDark(): boolean {
		return (
			typeof window.matchMedia === 'function' &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
		);
	}

	function getPreferredTheme(): string {
		const stored = readStored();
		if (stored && isKnown(stored)) {
			return stored;
		}
		if (useSystemPreference && prefersDark() && isKnown(systemDarkTheme)) {
			return systemDarkTheme;
		}
		return defaultTheme;
	}

	function applyClass(theme: string): void {
		const classList = root.classList;
		for (const name of themes) {
			classList.remove(classPrefix + name);
		}
		classList.add(classPrefix + theme);
	}

	function notify(theme: string): void {
		for (const callback of subscriptions) {
			try {
				callback(theme);
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error('createThemeState: subscriber threw', err);
			}
		}
	}

	function setTheme(theme: string, persist = true): void {
		if (!isKnown(theme)) {
			return;
		}
		const changed = theme !== current;
		current = theme;
		applyClass(theme);
		if (persist) {
			writeStored(theme);
		}
		if (changed) {
			notify(theme);
		}
	}

	function cycle(): string {
		const index = themes.indexOf(current);
		const next = themes[(index + 1) % themes.length];
		setTheme(next);
		return next;
	}

	function resume(): void {
		// Re-resolve from storage/system; do not persist (no user action occurred).
		setTheme(getPreferredTheme(), false);
	}

	function subscribe(callback: ThemeCallback): () => void {
		subscriptions.add(callback);
		try {
			callback(current);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error('createThemeState: subscriber threw', err);
		}
		return () => {
			subscriptions.delete(callback);
		};
	}

	const handleClick = (event: Event): void => {
		const target = event.target;
		if (target instanceof Element && controlSelector && target.closest(controlSelector)) {
			cycle();
		}
	};

	const ownerDocument = root.ownerDocument ?? document;
	if (controlSelector) {
		ownerDocument.addEventListener('click', handleClick);
	}

	function dispose(): void {
		if (disposed) {
			return;
		}
		disposed = true;
		if (controlSelector) {
			ownerDocument.removeEventListener('click', handleClick);
		}
		subscriptions.clear();
	}

	// Apply the resolved theme immediately so the instance is live on return.
	setTheme(getPreferredTheme(), false);

	return {
		getTheme: () => current,
		getThemes: () => themes.slice(),
		getPreferredTheme,
		setTheme,
		cycle,
		resume,
		subscribe,
		dispose
	};
}
