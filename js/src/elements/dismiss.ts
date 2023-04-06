export function initDismiss() {
	window.addEventListener(
		'click',
		({ target }: Event) => {
			const dismissButton = target instanceof Element && target.closest('[data-dismiss]');

			if (!dismissButton) {
				return;
			}

			const dismissTarget = dismissButton.closest('[data-dismissable]');

			if (!dismissTarget) {
				return;
			}

			dismissElement(dismissTarget);
		},
		{ passive: true }
	);
}

async function dismissElement(dismissTarget: Element) {
	if (dismissTarget.getAttribute('data-dismissable') === 'disappearing') {
		dismissTarget.classList.add('disappearing');
		await new Promise(resolve => setTimeout(resolve, 500));
	}

	dismissTarget.classList.remove('disappearing');
	dismissTarget.remove();
}
