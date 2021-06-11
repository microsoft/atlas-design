export const navigator = window.navigator;
export const document = window.document;
export const localStorage = window.localStorage;
export const history = window.history;
export const location = window.location;

export const contentLoaded = new Promise<void>(resolve => {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => resolve());
	} else {
		resolve();
	}
});
