export const contentLoaded = new Promise<void>(resolve => {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => resolve());
	} else {
		resolve();
	}
});
