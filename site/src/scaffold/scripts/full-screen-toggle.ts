export function initFullScreenToggle() {
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
	const mainColumn = document.getElementById('main-column');
	if (!main || !article || !mainColumn) {
		return;
	}

	const isFullScreened = main?.dataset.isFullScreened === 'true';
	if (!isFullScreened) {
		mainColumn.classList.remove('reading-width');
		article.style.overflow = 'visible';
		main.style.display = 'block';
		main.style.overflowX = 'auto';
		await main.requestFullscreen({ navigationUI: 'show' });
		main.dataset.isFullScreened = 'true';
	} else {
		main.dataset.isFullScreened = 'false';
		article.style.cssText = '';
		mainColumn.classList.add('reading-width');

		if (document.fullscreenElement) {
			await document.exitFullscreen();
		}
	}
}
