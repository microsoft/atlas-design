/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { handleCodeFilters } from './scripts/code-filter';
import { initTheme } from './scripts/theming';

initTheme();
handleCodeFilters();
initBreadcrumbs();

document.documentElement.classList.add('debug');

function initBreadcrumbs() {
	const breadcrumbContainer = document.querySelector('[data-breadcrumb-container]') as HTMLElement;
	const breadcrumbList = document.querySelector('[data-breadcrumb-list]') as HTMLUListElement;
	const breadcrumbItems = Array.from(
		document.querySelectorAll('[data-breadcrumb-list-item]')
	) as HTMLLIElement[];

	breadcrumbItems.forEach(item => (item.hidden = false));

	getVisibleItems(breadcrumbContainer);
}

function getVisibleItems(container: HTMLElement) {
	const clone = container.cloneNode(true) as HTMLElement;
	clone.classList.add('visually-hidden');
	clone.setAttribute('aria-hidden', 'true');
	document.documentElement.appendChild(clone);
	const dimensions = clone.getBoundingClientRect();
	// container.appendChild(clone);
	debugger;
}
