import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createThemeState, ThemeStateInstance } from '../../src/behaviors/theme';

/* -------------------------------------------------------------------------- */
/* Test helpers                                                               */
/* -------------------------------------------------------------------------- */

const liveInstances: ThemeStateInstance[] = [];

function track(instance: ThemeStateInstance): ThemeStateInstance {
	liveInstances.push(instance);
	return instance;
}

function createFakeStorage(seed: Record<string, string> = {}) {
	const data: Record<string, string> = { ...seed };
	const storage = {
		getItem(key: string): string | null {
			return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null;
		},
		setItem(key: string, value: string): void {
			data[key] = String(value);
		},
		removeItem(key: string): void {
			delete data[key];
		}
	} as unknown as Storage;
	return { storage, data };
}

function createRoot(...initialClasses: string[]): HTMLElement {
	const el = document.createElement('html');
	for (const cls of initialClasses) {
		el.classList.add(cls);
	}
	document.body.appendChild(el);
	return el;
}

/** Stub `window.matchMedia` so `prefers-color-scheme: dark` resolves to `dark`. */
function stubPrefersDark(dark: boolean): void {
	window.matchMedia = ((query: string) => ({
		matches: dark && query === '(prefers-color-scheme: dark)',
		media: query,
		addEventListener() {},
		removeEventListener() {}
	})) as unknown as typeof window.matchMedia;
}

const originalMatchMedia = window.matchMedia;

beforeEach(() => {
	document.body.innerHTML = '';
	// jsdom does not implement matchMedia; default to no system preference.
	stubPrefersDark(false);
});

afterEach(() => {
	for (const instance of liveInstances.splice(0)) {
		instance.dispose();
	}
	document.body.innerHTML = '';
	window.matchMedia = originalMatchMedia;
	vi.restoreAllMocks();
});

/* -------------------------------------------------------------------------- */
/* Resolution on construction                                                 */
/* -------------------------------------------------------------------------- */

describe('createThemeState construction', () => {
	it('applies the default theme class when nothing is stored [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));

		expect(theme.getTheme()).toBe('light');
		expect(root.classList.contains('theme-light')).toBe(true);
	});

	it('resolves a persisted theme and applies its class [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage({ theme: 'dark' });
		const theme = track(createThemeState({ root, storage }));

		expect(theme.getTheme()).toBe('dark');
		expect(root.classList.contains('theme-dark')).toBe(true);
		expect(root.classList.contains('theme-light')).toBe(false);
	});

	it('falls back to system dark preference when nothing is stored [ai generated]', () => {
		stubPrefersDark(true);
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));

		expect(theme.getTheme()).toBe('dark');
		expect(root.classList.contains('theme-dark')).toBe(true);
	});

	it('ignores an unknown persisted value and uses the default [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage({ theme: 'solarized' });
		const theme = track(createThemeState({ root, storage }));

		expect(theme.getTheme()).toBe('light');
	});

	it('does not persist the resolved theme on construction [ai generated]', () => {
		const root = createRoot();
		const { storage, data } = createFakeStorage();
		track(createThemeState({ root, storage }));

		expect(data.theme).toBeUndefined();
	});

	it('honors a custom defaultTheme [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage, defaultTheme: 'high-contrast' }));

		expect(theme.getTheme()).toBe('high-contrast');
		expect(root.classList.contains('theme-high-contrast')).toBe(true);
	});

	it('ignores an unknown defaultTheme and uses the first theme [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage, defaultTheme: 'nope' }));

		expect(theme.getTheme()).toBe('light');
	});

	it('skips system preference resolution when useSystemPreference is false [ai generated]', () => {
		stubPrefersDark(true);
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage, useSystemPreference: false }));

		expect(theme.getTheme()).toBe('light');
	});
});

/* -------------------------------------------------------------------------- */
/* setTheme / cycle                                                           */
/* -------------------------------------------------------------------------- */

describe('createThemeState setTheme and cycle', () => {
	it('applies the new theme class and removes the previous one [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));

		theme.setTheme('high-contrast');

		expect(root.classList.contains('theme-high-contrast')).toBe(true);
		expect(root.classList.contains('theme-light')).toBe(false);
	});

	it('persists the theme by default [ai generated]', () => {
		const root = createRoot();
		const { storage, data } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));

		theme.setTheme('dark');

		expect(data.theme).toBe('dark');
	});

	it('does not persist when persist is false [ai generated]', () => {
		const root = createRoot();
		const { storage, data } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));

		theme.setTheme('dark', false);

		expect(theme.getTheme()).toBe('dark');
		expect(data.theme).toBeUndefined();
	});

	it('ignores an unknown theme [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));

		theme.setTheme('chartreuse');

		expect(theme.getTheme()).toBe('light');
		expect(root.classList.contains('theme-light')).toBe(true);
	});

	it('cycles through the themes in order and wraps around [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));

		expect(theme.cycle()).toBe('dark');
		expect(theme.cycle()).toBe('high-contrast');
		expect(theme.cycle()).toBe('light');
	});

	it('persists the theme chosen by cycle [ai generated]', () => {
		const root = createRoot();
		const { storage, data } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));

		theme.cycle();

		expect(data.theme).toBe('dark');
	});
});

/* -------------------------------------------------------------------------- */
/* Controls                                                                   */
/* -------------------------------------------------------------------------- */

describe('createThemeState controls', () => {
	it('cycles when a [data-theme-cycle] element is clicked [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));

		const button = document.createElement('button');
		button.setAttribute('data-theme-cycle', '');
		document.body.appendChild(button);

		button.click();

		expect(theme.getTheme()).toBe('dark');
	});

	it('cycles when a descendant of the control is clicked [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));

		const button = document.createElement('button');
		button.setAttribute('data-theme-cycle', '');
		const icon = document.createElement('span');
		button.appendChild(icon);
		document.body.appendChild(button);

		icon.click();

		expect(theme.getTheme()).toBe('dark');
	});

	it('ignores clicks outside any control [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));

		const other = document.createElement('button');
		document.body.appendChild(other);
		other.click();

		expect(theme.getTheme()).toBe('light');
	});

	it('does not wire controls when controlSelector is null [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage, controlSelector: null }));

		const button = document.createElement('button');
		button.setAttribute('data-theme-cycle', '');
		document.body.appendChild(button);
		button.click();

		expect(theme.getTheme()).toBe('light');
	});

	it('supports a custom controlSelector [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage, controlSelector: '.theme-toggle' }));

		const button = document.createElement('button');
		button.className = 'theme-toggle';
		document.body.appendChild(button);
		button.click();

		expect(theme.getTheme()).toBe('dark');
	});
});

/* -------------------------------------------------------------------------- */
/* subscribe                                                                  */
/* -------------------------------------------------------------------------- */

describe('createThemeState subscribe', () => {
	it('fires immediately with the current theme [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage({ theme: 'dark' });
		const theme = track(createThemeState({ root, storage }));

		const seen: string[] = [];
		theme.subscribe(name => seen.push(name));

		expect(seen).toEqual(['dark']);
	});

	it('fires on subsequent theme changes [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));

		const seen: string[] = [];
		theme.subscribe(name => seen.push(name));
		theme.setTheme('dark');
		theme.cycle();

		expect(seen).toEqual(['light', 'dark', 'high-contrast']);
	});

	it('does not fire again when set to the already-active theme [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));

		const seen: string[] = [];
		theme.subscribe(name => seen.push(name));
		theme.setTheme('light');

		expect(seen).toEqual(['light']);
	});

	it('stops firing after unsubscribe [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));

		const seen: string[] = [];
		const unsubscribe = theme.subscribe(name => seen.push(name));
		unsubscribe();
		theme.setTheme('dark');

		expect(seen).toEqual(['light']);
	});

	it('keeps notifying other subscribers when one throws [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));
		vi.spyOn(console, 'error').mockImplementation(() => {});

		const seen: string[] = [];
		theme.subscribe(() => {
			throw new Error('boom');
		});
		theme.subscribe(name => seen.push(name));
		theme.setTheme('dark');

		expect(seen).toEqual(['light', 'dark']);
	});
});

/* -------------------------------------------------------------------------- */
/* resume / dispose / misc                                                    */
/* -------------------------------------------------------------------------- */

describe('createThemeState resume and dispose', () => {
	it('re-applies the persisted theme after the class list is wiped [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));
		theme.setTheme('dark');

		root.className = '';
		theme.resume();

		expect(root.classList.contains('theme-dark')).toBe(true);
		expect(theme.getTheme()).toBe('dark');
	});

	it('does not persist on resume [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage({ theme: 'high-contrast' });
		const theme = track(createThemeState({ root, storage }));
		const setItem = vi.spyOn(storage, 'setItem');

		theme.resume();

		expect(theme.getTheme()).toBe('high-contrast');
		expect(setItem).not.toHaveBeenCalled();
	});

	it('stops responding to control clicks after dispose [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = createThemeState({ root, storage });

		const button = document.createElement('button');
		button.setAttribute('data-theme-cycle', '');
		document.body.appendChild(button);

		theme.dispose();
		button.click();

		expect(theme.getTheme()).toBe('light');
	});

	it('is safe to dispose more than once [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = createThemeState({ root, storage });

		expect(() => {
			theme.dispose();
			theme.dispose();
		}).not.toThrow();
	});
});

describe('createThemeState configuration', () => {
	it('supports a custom theme list and drives cycle order from it [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage, themes: ['day', 'night'] }));

		expect(theme.getTheme()).toBe('day');
		expect(theme.cycle()).toBe('night');
		expect(theme.cycle()).toBe('day');
	});

	it('falls back to the default theme list when given an empty array [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage, themes: [] }));

		expect(theme.getThemes()).toEqual(['light', 'dark', 'high-contrast']);
	});

	it('supports a custom classPrefix and storageKey [ai generated]', () => {
		const root = createRoot();
		const { storage, data } = createFakeStorage();
		const theme = track(
			createThemeState({ root, storage, classPrefix: 'is-theme-', storageKey: 'atlas-theme' })
		);

		theme.setTheme('dark');

		expect(root.classList.contains('is-theme-dark')).toBe(true);
		expect(data['atlas-theme']).toBe('dark');
	});

	it('uses a custom systemDarkTheme for a dark system preference [ai generated]', () => {
		stubPrefersDark(true);
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(
			createThemeState({
				root,
				storage,
				themes: ['light', 'midnight'],
				systemDarkTheme: 'midnight'
			})
		);

		expect(theme.getTheme()).toBe('midnight');
	});

	it('getThemes returns a copy that cannot mutate internal state [ai generated]', () => {
		const root = createRoot();
		const { storage } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));

		theme.getThemes().push('injected');

		expect(theme.getThemes()).toEqual(['light', 'dark', 'high-contrast']);
	});

	it('getPreferredTheme reports the stored theme without applying it [ai generated]', () => {
		const root = createRoot();
		const { storage, data } = createFakeStorage();
		const theme = track(createThemeState({ root, storage }));
		data.theme = 'high-contrast';

		expect(theme.getPreferredTheme()).toBe('high-contrast');
		// Not applied until something calls setTheme/resume.
		expect(theme.getTheme()).toBe('light');
	});
});
