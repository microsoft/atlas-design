let frame: number;

const setLayoutCssVariables = () => {
	const footerHeight = document.querySelector('.layout-body-footer')?.clientHeight;
	const headerHeight = document.querySelector('.layout-body-header')?.clientHeight;

	const headerCssProp = headerHeight
		? `--atlas-header-height: ${headerHeight}px !important;`
		: '--atlas-header-height: 0px !important;';
	const footerCssProp = footerHeight
		? `--atlas-footer-height: ${footerHeight}px !important;`
		: '--atlas-footer-height: 0px !important;';

	document.documentElement.style.cssText = `
			--window-inner-height: ${window.innerHeight}px !important;
			${headerCssProp}
			${footerCssProp}
			`;
};

export function initLayoutHelpers() {
	window.addEventListener('resize', () => {
		if (frame) {
			cancelAnimationFrame(frame);
		}

		frame = requestAnimationFrame(setLayoutCssVariables);
	});

	document.documentElement.style.cssText = `--window-inner-height: ${window.innerHeight}px !important`;

	window.addEventListener('DOMContentLoaded', setLayoutCssVariables);
}
