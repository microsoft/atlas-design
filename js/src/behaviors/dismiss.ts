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
	const prefersReducedMotionReduceQuery = window.matchMedia('(prefers-reduced-motion: reduced)');

	if (
		dismissTarget.hasAttribute('data-dismiss-animation') &&
		!prefersReducedMotionReduceQuery.matches
	) {
		dismissTarget.classList.add('is-dismissed');

		const dismissAnimation = dismissTarget.getAttribute('data-dismiss-animation');
		switch (dismissAnimation) {
			case 'slide-up':
				dismissTarget.classList.add('animation-slide-up');
				break;
			case 'fade':
				dismissTarget.classList.add('animation-fade');
				break;
		}

		await new Promise(resolve => setTimeout(resolve, 500));
	}

	dismissTarget.classList.remove('is-dismissed');
	dismissTarget.remove();

	// Notification about content update occurrence.
	window.dispatchEvent(new CustomEvent('dismiss-content-update'));
}
