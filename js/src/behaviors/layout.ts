let frame: number;

const root = document.documentElement;

const setLayoutCssVariables = () => {
	const headerHeight = document.querySelector('.layout-body-header')?.clientHeight;
	const headerCssProp = headerHeight ? `${headerHeight}px` : '0px';

	const footerHeight = document.querySelector('.layout-body-footer')?.clientHeight;
	const footerCssProp = footerHeight ? `${footerHeight}px` : '0px';

	root.style.setProperty('--window-inner-height', `${window.innerHeight}px`, 'important');
	root.style.setProperty('--atlas-header-height', headerCssProp, 'important');
	root.style.setProperty('--atlas-footer-height', footerCssProp, 'important');
};

export function initLayout() {
	window.addEventListener('atlas-layout-change-event', () => {
		if (frame) {
			cancelAnimationFrame(frame);
		}

		frame = requestAnimationFrame(setLayoutCssVariables);
	});

	window.addEventListener('resize', () =>
		window.dispatchEvent(new CustomEvent('atlas-layout-change-event'))
	);

	root.style.setProperty('--window-inner-height', `${window.innerHeight}px`);

	window.addEventListener('DOMContentLoaded', setLayoutCssVariables);
}
