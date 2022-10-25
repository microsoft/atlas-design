import { handleCodeFilters } from './scripts/code-filter';
import { handleFigmaFullScreenRequest } from './scripts/figma-embed';
import { initTheme } from './scripts/theming';
import { handleMockFormSubmit } from './scripts/form-submit';
import * as atlasTokens from '@microsoft/atlas-css/dist/tokens.json';

import { initPopover, initSnapScroll } from '@microsoft/atlas-js/src/index';

initTheme();
initPopover();
handleCodeFilters();
handleFigmaFullScreenRequest();
handleMockFormSubmit();
initSnapScroll();
initFullScreenToggle();

// const main = document.querySelector('main');
// if (main) {
// 	let template = '';
// 	const palette = JSON.stringify(atlasTokens.palette.tokens);
// 	for (const key of Object.keys(palette)) {
// 		template += `<p>${key}/${palette[key as keyof typeof palette]}</p>`;
// 	}
// 	main.innerHTML = template;
// }

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
