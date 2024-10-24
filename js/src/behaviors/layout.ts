let frame: number;

const root = document.documentElement;

const setLayoutCssVariables = () => {
	const header = document.querySelector('.layout-body-header');
	const headerHeight = header?.clientHeight || 0;
	const headerCssProp = headerHeight ? `${headerHeight}px` : '0px';
	const headerY = header?.getBoundingClientRect().y || 0; // determine if header is visible, assign visible heights as well
	const visibleHeaderHeight = Math.round(Math.max(0, headerY + headerHeight));
	const visibleHeaderCssProp = `${visibleHeaderHeight}px`;

	const footer = document.querySelector('.layout-body-footer');
	// get computed style of the footer to ensure it is not hidden
	const footerHidden = footer && window.getComputedStyle(footer).display !== 'none';
	let footerHeight = 0;
	let footerCssProp = '0px';
	let footerY = 0;
	let visibleFooterHeight = window.innerHeight;
	if (!footerHidden) {
		footerHeight = footer?.clientHeight || 0;
		footerCssProp = footerHeight ? `${footerHeight}px` : '0px';
		footerY = footer?.getBoundingClientRect().y || 0; // determine if header and footer are visible, assign visible heights as well

		visibleFooterHeight = Math.round(
			footerY < window.innerHeight ? Math.min(window.innerHeight - footerY, footerHeight) : 0
		);
	}
	const visibleFooterCssProp = `${visibleFooterHeight}px`;

	root.style.setProperty('--window-inner-height', `${window.innerHeight}px`, 'important');
	root.style.setProperty('--atlas-header-height', headerCssProp, 'important');
	root.style.setProperty('--atlas-footer-height', footerCssProp, 'important');
	root.style.setProperty('--atlas-header-visible-height', visibleHeaderCssProp, 'important');
	root.style.setProperty('--atlas-footer-visible-height', visibleFooterCssProp, 'important');
};

export function initLayout() {
	window.addEventListener('atlas-layout-change-event', () => {
		if (frame) {
			cancelAnimationFrame(frame);
		}

		frame = requestAnimationFrame(setLayoutCssVariables);
	});

	window.addEventListener(
		'resize',
		() => window.dispatchEvent(new CustomEvent('atlas-layout-change-event')),
		{ passive: true }
	);

	root.style.setProperty('--window-inner-height', `${window.innerHeight}px`);

	window.addEventListener('DOMContentLoaded', setLayoutCssVariables, { passive: true });

	// determine if header/footer are visible below the top of the viewport

	window.addEventListener(
		'scroll',
		() => window.dispatchEvent(new CustomEvent('atlas-layout-change-event')),
		{
			passive: true
		}
	);
}
