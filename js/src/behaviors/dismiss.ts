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
	if (dismissTarget.hasAttribute('disappearing')) {
		dismissTarget.classList.add('is-dismissed');

		const disappearing = dismissTarget.getAttribute('disappearing');
		if (disappearing === 'slide-up') {
			dismissTarget.classList.add('animation-slide-up');
		}

		await new Promise(resolve => setTimeout(resolve, 500));
	}

	dismissTarget.classList.remove('is-dismissed');
	dismissTarget.remove();

	// Notification about content update occurrence.
	window.dispatchEvent(new CustomEvent('dismiss-content-update'));
}
