export function handleFigmaFullScreenRequest() {
	window.addEventListener('click', (e: MouseEvent) => {
		const target = e.target instanceof HTMLElement && e.target.closest('#expand-figma-embed');
		if (!target) {
			return;
		}

		const iframe = document.getElementById('figma-embed-iframe') as HTMLIFrameElement;
		if (!iframe) {
			return;
		}

		void iframe.requestFullscreen({ navigationUI: 'auto' });
	});
}
