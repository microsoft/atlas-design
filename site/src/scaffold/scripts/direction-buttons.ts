export function initReadingDirectionButtons() {
	window.addEventListener('click', (e: MouseEvent) => {
		const target =
			e.target instanceof Element &&
			(e.target.closest('[data-direction-change]') as HTMLButtonElement);
		if (!target) {
			return;
		}

		const direction = target.dataset.directionChange;
		if (direction !== 'ltr' && direction !== 'rtl') {
			throw new Error('Misconfigured direction button');
		}

		document.documentElement.dir = direction;
	});
}
