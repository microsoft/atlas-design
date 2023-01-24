import { handleCodeFilters } from './scripts/code-filter';
import { handleFigmaFullScreenRequest } from './scripts/figma-embed';
import { initTheme } from './scripts/theming';
import { handleMockFormSubmit } from './scripts/form-submit';

import { initPopover, initSnapScroll, initSegmentedControls } from '@microsoft/atlas-js/src/index';

initTheme();
initPopover();
handleCodeFilters();
handleFigmaFullScreenRequest();
handleMockFormSubmit();
initSnapScroll();
initSegmentedControls();
initFullScreenToggle();

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
