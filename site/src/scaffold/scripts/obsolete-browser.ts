export function detectObsoleteBrowser() {
	const modernBrowser =
		typeof CSS !== 'undefined' &&
		typeof CSS.supports === 'function' &&
		CSS.supports('(--foo: red)');
	const obsoleteBrowser = !modernBrowser;
	if (obsoleteBrowser) {
		document.documentElement.classList.add('obsolete-browser');
	}
}
