/* These methods *try* to return the proper object type in the catch handler */
export const localStorage = {
	setItem(key: string, value: string): void {
		try {
			window.localStorage.setItem(key, value);
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
		} catch (e) {}
	},

	clear(): void {
		try {
			window.localStorage.clear();
		} catch (e) {}
	}
} as any as Storage;

export const sessionStorage = {
	setItem(key: string, value: string): void {
		try {
			window.sessionStorage.setItem(key, value);
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
		} catch (e) {}
	}
} as any as Storage;
