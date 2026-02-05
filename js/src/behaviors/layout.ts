const root = document.documentElement;

const setLayoutCssVariables = () => {
	const header = document.querySelector('.layout-body-header');
	const headerHeight = header?.clientHeight || 0;
	const headerCssProp = headerHeight ? `${headerHeight}px` : '0px';
	const headerY = header?.getBoundingClientRect().y || 0; // determine if header is visible, assign visible heights as well
	const visibleHeaderHeight = Math.max(0, headerY + headerHeight);
	const visibleHeaderCssProp = `${visibleHeaderHeight}px`;

	const footer = document.querySelector('.layout-body-footer');
	const footerHeight = footer?.clientHeight || 0;
	const footerCssProp = footerHeight ? `${footerHeight}px` : '0px';
	const footerY = footer?.getBoundingClientRect().y || 0; // determine if header and footer are visible, assign visible heights as well

	const visibleFooterHeight =
		footerY < window.innerHeight ? Math.min(window.innerHeight - footerY, footerHeight) : 0;
	const visibleFooterCssProp = `${visibleFooterHeight}px`;

	root.style.setProperty('--window-inner-height', `${window.innerHeight}px`, 'important');
	root.style.setProperty('--atlas-header-height', headerCssProp, 'important');
	root.style.setProperty('--atlas-footer-height', footerCssProp, 'important');
	root.style.setProperty('--atlas-header-visible-height', visibleHeaderCssProp, 'important');
	root.style.setProperty('--atlas-footer-visible-height', visibleFooterCssProp, 'important');
};

let animationFrame = 0;

function scheduleUpdate(update: typeof setLayoutCssVariables) {
	cancelAnimationFrame(animationFrame);
	animationFrame = requestAnimationFrame(update);
}

export const dispatchAtlasLayoutUpdateEvent = () => {
	window.dispatchEvent(new CustomEvent('atlas-layout-change-event'));
};

export function initLayout() {
	window.addEventListener('atlas-layout-change-event', () => {
		scheduleUpdate(setLayoutCssVariables);
	});

	window.addEventListener('resize', dispatchAtlasLayoutUpdateEvent, { passive: true });

	root.style.setProperty('--window-inner-height', `${window.innerHeight}px`);

	window.addEventListener('DOMContentLoaded', dispatchAtlasLayoutUpdateEvent);

	// determine if header/footer are visible below the top of the viewport - remove with atlas-js 1.13.1
	window.addEventListener('scroll', dispatchAtlasLayoutUpdateEvent, {
		passive: true
	});

	// Menu collapse behavior
	window.addEventListener('click', ({ target }: Event) => {
		const trigger =
			target instanceof Element &&
			(target.closest('[data-menu-collapse-trigger]') as HTMLElement | null);

		if (!trigger) {
			return;
		}

		const menu = document.querySelector('.layout-body-menu') as HTMLElement | null;
		const isCollapsed = document.documentElement.classList.toggle('layout-menu-collapsed');

		if (menu) {
			menu.hidden = isCollapsed;
		}

		trigger.classList.toggle('button-filled', isCollapsed);
		trigger.setAttribute('aria-expanded', String(!isCollapsed));

		dispatchAtlasLayoutUpdateEvent();
	});
}
