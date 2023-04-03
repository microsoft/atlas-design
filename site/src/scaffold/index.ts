import { handleCodeFilters } from './scripts/code-filter';
import { handleFigmaFullScreenRequest } from './scripts/figma-embed';
import { initTheme } from './scripts/theming';
import { handleMockFormSubmit } from './scripts/form-submit';

import { initPopover, initSnapScroll } from '@microsoft/atlas-js/src/index';
import { debounce } from './scripts/debounce';

initTheme();
initPopover();
handleCodeFilters();
handleFigmaFullScreenRequest();
handleMockFormSubmit();
initSnapScroll();
initFullScreenToggle();
handleCodeBlockFocusability();

function handleCodeBlockFocusability() {
	const codeBlocks: HTMLElement[] = Array.from(
		document.querySelectorAll('[data-focusable-if-scrollable]')
	);
	console.log(codeBlocks);
	setScollableCodeBlockAttrs(codeBlocks);

	window.addEventListener('resize', () => {
		const codeBlocks: HTMLElement[] = Array.from(
			document.querySelectorAll('[data-focusable-if-scrollable]')
		);
		setScollableCodeBlockAttrs(codeBlocks);
	});
}

function setScollableCodeBlockAttrs(elements: HTMLElement[]) {
	for (const block of elements) {
		const isHorizontallyScrollable = block.scrollWidth > block.clientWidth;
		const isVerticallyScrollable = block.scrollHeight > block.clientHeight;
		console.log('sh', block.scrollHeight, 'ch', block.clientHeight);

		console.log({ block, isVerticallyScrollable, isHorizontallyScrollable });

		if (isHorizontallyScrollable) {
			block.setAttribute('role', 'group');
			block.setAttribute('aria-label', 'Horizontally scrollable code');
			block.tabIndex = 0;
		} else if (isVerticallyScrollable) {
			// just for atomics code blocks
			block.setAttribute('role', 'group');
			block.setAttribute('aria-label', 'Vertically scrollable code');
			block.tabIndex = 0;
		} else {
			block.removeAttribute('role');
			block.removeAttribute('aria-label');
			block.removeAttribute('tabindex');
		}
	}
}

function initFullScreenToggle() {
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	window.addEventListener('click', (e: MouseEvent) => {
		const target = e.target instanceof Element && e.target.closest('[data-full-screen-main]');
		if (!target) {
			return;
		}

		return handleFullscreen();
	});
}

async function handleFullscreen() {
	const main = document.getElementById('main');
	const article = document.getElementById('article');
	if (!main || !article) {
		return;
	}

	const isFullScreened = main?.dataset.isFullScreened === 'true';
	if (!isFullScreened) {
		article.style.overflow = 'visible';
		main.style.display = 'block';
		main.style.overflowX = 'auto';
		await main.requestFullscreen({ navigationUI: 'show' });
		main.dataset.isFullScreened = 'true';
	} else {
		main.dataset.isFullScreened = 'false';
		article.style.cssText = '';

		if (document.fullscreenElement) {
			await document.exitFullscreen();
		}
	}
}
