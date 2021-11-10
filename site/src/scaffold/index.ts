/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { handleCodeFilters } from './scripts/code-filter';
import { CancellableFunction, debounce } from './scripts/debounce';
import { initTheme } from './scripts/theming';

const breadcrumbContainerSelector = '[data-breadcrumb-container]';
const breadcrumbListItemSelector = '[data-breadcrumb-list-item]';
const breadcrumbOverflowSelector = '[data-breadcrumb-overflow]';

initTheme();
handleCodeFilters();
initBreadcrumbs();

// document.documentElement.classList.add('debug');

function initBreadcrumbs() {
	const breadcrumbContainer = document.querySelector(breadcrumbContainerSelector) as HTMLElement;
	const breadcrumbItems = Array.from(
		document.querySelectorAll(breadcrumbListItemSelector)
	) as HTMLLIElement[];
	const breadcrumbOverflow = document.querySelector(breadcrumbOverflowSelector) as HTMLElement;

	handleBreadcrumbResize(breadcrumbContainer, breadcrumbItems, breadcrumbOverflow);

	let cancellableFunc: CancellableFunction;
	window.addEventListener('resize', () => {
		resetBreadcrumbs(breadcrumbContainer, breadcrumbItems);
		if (cancellableFunc) {
			cancellableFunc.cancel();
		}
		cancellableFunc = debounce.timeout(
			() => handleBreadcrumbResize(breadcrumbContainer, breadcrumbItems, breadcrumbOverflow),
			200
		);
		cancellableFunc();
	});
}

function handleBreadcrumbResize(
	breadcrumbContainer: HTMLElement,
	breadcrumbItems: HTMLElement[],
	overflowMenu: HTMLElement
) {
	// The overflow menu should be visible when we do our measuring
	// In the case we need to show it, we don't want it popping results to two lines.
	overflowMenu.hidden = false;
	const stats = getNumberOfVisibleElements(breadcrumbContainer, breadcrumbListItemSelector);

	// Produce a number we can use in a reverse for loop
	const stopShowingAt = breadcrumbItems.length - stats.show;
	if (stopShowingAt < 0) {
		return;
	}

	// Traverse backwards through the crumbs.
	// Show the number that we can fit on a single line, minimum being 1.
	for (let i = breadcrumbItems.length - 1; i >= stopShowingAt; i--) {
		breadcrumbItems[i as number].hidden = false;
	}
	// Show the container, now that we've sorted that out
	// handleLineClampClasses(breadcrumbContainer, 'add');
	handleLineClampClasses(breadcrumbContainer, 'add'); // 🌟 does not work
	breadcrumbContainer.hidden = false;
	overflowMenu.hidden = stats.hide === 0;
}

function resetBreadcrumbs(breadcrumbContainer: HTMLElement, breadcrumbItems: HTMLElement[]) {
	handleLineClampClasses(breadcrumbContainer, 'remove'); // 🌟 does not work
	breadcrumbContainer.hidden = true;
	for (const li of breadcrumbItems) {
		li.hidden = true;
	}
}

function getNumberOfVisibleElements(
	container: HTMLElement,
	childSelector: string,
	minimum = 1
): { show: number; hide: number; total: number } {
	// get the width of the container
	// we can't know its width if it's hidden
	// it's children need to be hidden
	container.hidden = false;
	const targetWidth = Math.floor(container.getBoundingClientRect().width);
	container.hidden = true;

	// clone the container, put clone offscreen, show it, set the its width
	const clone = container.cloneNode(true) as HTMLElement;
	clone.style.width = `${targetWidth}px`; // REMOVE Arbitrary shortening
	clone.style.position = 'fixed';
	clone.style.right = '-10000px';
	clone.style.top = '-10000px';
	clone.setAttribute('aria-hidden', 'true');
	clone.hidden = false;

	// use line clamp to get the height of the container when it's only one line
	handleLineClampClasses(clone, 'add');
	document.documentElement.appendChild(clone);

	// grab the showable hideable items
	const listItems = Array.from(clone.querySelectorAll(childSelector)) as HTMLUListElement[];
	if (listItems.length === 0) {
		return { show: 0, hide: 0, total: 0 };
	}

	// show elements because we need some content to measure
	listItems[0].hidden = false;

	// get the height of the contain when its a single line
	const targetHeight = clone.getBoundingClientRect().height;

	// remove line clamp related classes
	handleLineClampClasses(clone, 'remove');
	// hide element we recently showed
	listItems[0].hidden = true;

	/**
	 * The amount of items that can fit into a single line without spilling into a second.
	 */
	let itemsAllowed = 0;

	// Traverse backwards through the crumbs.
	// Test container's height with the addition of each crumb.
	// If it exceeds targetHeight, we know we can't fit this item.
	for (let i = listItems.length - 1; i >= 0; i--) {
		listItems[i as number].hidden = false;
		if (clone.getBoundingClientRect().height === targetHeight) {
			itemsAllowed++;
		} else {
			listItems[i as number].hidden = true;
			break;
		}
	}

	// Cleanup - remove the clone.
	document.documentElement.removeChild(clone);
	// ensure we don't go below a minimum
	itemsAllowed = Math.max(itemsAllowed, minimum);

	return { show: itemsAllowed, hide: listItems.length - itemsAllowed, total: listItems.length };
}

function handleLineClampClasses(element: HTMLElement, method: 'add' | 'remove') {
	if (method === 'add') {
		element.style.display = `-webkit-box !important`;
		element.style.webkitBoxOrient = `vertical !important`;
		element.style.overflow = `hidden !important`;
		element.style.webkitLineClamp = `1 !important`;
	} else {
		element.style.display = ``;
		element.style.webkitBoxOrient = ``;
		element.style.overflow = ``;
		element.style.webkitLineClamp = '';
	}
}
