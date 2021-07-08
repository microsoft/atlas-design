/* These methods *try* to return the proper object type in the catch handler */
export const localStorage = {
	setItem(key: string, value: string): void {
		try {
			window.localStorage.setItem(key, value);
			/* eslint no-empty: "off" */
		} catch (e) {}
	},

	getItem(key: string): string | null {
		try {
			return window.localStorage.getItem(key);
		} catch (e) {
			return null;
		}
	},

	removeItem(key: string): void {
		try {
			window.localStorage.removeItem(key);
			/* eslint no-empty: "off" */
		} catch (e) {}
	},

	clear(): void {
		try {
			window.localStorage.clear();
			/* eslint no-empty: "off" */
		} catch (e) {}
	}
} as unknown as Storage;

export const sessionStorage = {
	setItem(key: string, value: string): void {
		try {
			window.sessionStorage.setItem(key, value);
			// eslint-disable-line no-empty
		} catch (e) {}
	},
	getItem(key: string): string | null {
		try {
			return window.sessionStorage.getItem(key);
		} catch (e) {
			return null;
		}
	},
	removeItem(key: string): void {
		try {
			window.sessionStorage.removeItem(key);
			// eslint-disable-line no-empty
		} catch (e) {}
	}
} as unknown as Storage;
