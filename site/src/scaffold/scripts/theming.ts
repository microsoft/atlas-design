import { prefersColorSchemeDarkQuery } from './match-media';
import { localStorage } from './protected-storage';
import { parseQueryString } from './query-string';
import { atlasTokens } from './tokens';

/**
 * The globally available descriptor of the current theme. It is updated each time setTheme is called.
 */
export let currentTheme: ThemeType = 'light';
export type ThemeType = keyof ThemeTypeMap;

function isTheme(value: string): value is ThemeType {
	if (value === 'light' || value === 'dark' || value === 'high-contrast') {
		return true;
	}
	return false;
}

/**
 * Simple string name for each theme.
 */
export const themes = Object.keys(atlasTokens.themes.tokens.$themes);
/**
 * Data structure for easy access to theme names and css classes.
 */
export const themeInfo = themes.reduce((themeInfo, themeName) => {
	themeInfo[themeName as keyof ThemeTypeMap] = {
		documentClass: `theme-${themeName}`,
		name: themeName
	};
	return themeInfo;
}, {} as ThemeTypeMap);
/**
 * CSS classes related to theming.
 * Used to remove all classes before adding them next one.
 */
export const cssClasses = themes.map(theme => themeInfo[theme as keyof ThemeTypeMap].documentClass);
export interface ThemeTypeInfo {
	documentClass: string;
	name: string;
}

export interface ThemeTypeMap {
	light: ThemeTypeInfo;
	dark: ThemeTypeInfo;
	'high-contrast': ThemeTypeInfo;
}

/**
 * Using the current theme key, get the next one in the cycle.
 * @param current The current theme's name.
 * @returns The next theme's name.
 */
export function cycleKeys(current: keyof ThemeTypeMap): keyof ThemeTypeMap {
	const i = themes.findIndex(item => item === current) || 0;
	const next = i < 2 ? i + 1 : 0;
	// eslint-disable-next-line security/detect-object-injection
	return themes[next] as keyof ThemeTypeMap;
}

/**
 * Add class to apply the next theme, and remove previously applied classes.
 * @param appliedTheme The name of the theme we want to apply.
 */
export function setThemeClass(appliedTheme: ThemeType) {
	const htmlClassList = document.documentElement.classList;
	for (const docClass of cssClasses) {
		htmlClassList.remove(docClass);
	}

	if (isTheme(appliedTheme)) {
		// eslint-disable-next-line security/detect-object-injection
		htmlClassList.add(themeInfo[appliedTheme].documentClass);
	}
}

export function setGlobalThemeValue(appliedTheme: ThemeType) {
	return (currentTheme = appliedTheme);
}

export function storeTheme(theme: ThemeType) {
	localStorage.setItem('theme', theme);
}

export function getPreferredTheme(prefersDarkTheme = false): ThemeType {
	// check for user selection
	const theme = localStorage.getItem('theme') as string;
	if (/^light|dark|high-contrast$/.test(theme)) {
		return theme as ThemeType;
	}

	// check for system dark preference
	if (prefersDarkTheme) {
		return 'dark';
	}

	// default to light
	return 'light';
}

/**
 * SetTheme is the public way of changing the visual theme. It ensures we use the correct EventBus instance, while allow the user of the function to remain free of such implementation detail..
 *
 * @param theme The ThemeType to apply to the current window.
 */
export function setTheme(appliedTheme: ThemeType) {
	const previousTheme = currentTheme;
	if (previousTheme === appliedTheme) {
		return;
	}
	setGlobalThemeValue(appliedTheme);
	setThemeClass(appliedTheme);
}

/**
 * Initialize Theme related functionality
 */
export function initTheme() {
	const theme = getInitialTheme();
	setTheme(theme);
	initThemeControls();
}

export function getInitialTheme(
	prefersDarkTheme: boolean = prefersColorSchemeDarkQuery.matches
): ThemeType {
	const args = parseQueryString();

	// Themes can be forced with query string arguments.
	if (args.theme === 'light' || args.theme === 'dark' || args.theme === 'high-contrast') {
		return args.theme as ThemeType;
	}

	return getPreferredTheme(prefersDarkTheme);
}

/**
 * Listens for clicks on elements with data-theme-cycle attributes.
 * Cycles through list of themes one after the other.
 */
export function initThemeControls(): void {
	window.addEventListener('click', ({ target }: Event) => {
		const button =
			target instanceof Element && (target.closest('[data-theme-cycle]') as HTMLElement);

		if (!button) {
			return;
		}

		const themeToApply = cycleKeys(currentTheme);

		storeTheme(themeToApply);
		setTheme(themeToApply);
	});
}
