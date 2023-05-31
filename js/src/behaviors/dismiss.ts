export function initDismiss() {
	window.addEventListener('click', ({ target }: Event) => {
		const dismissButton = target instanceof Element && target.closest('[data-dismiss]');

		if (!dismissButton) {
			return;
		}

		const dismissTarget = dismissButton.closest('[data-dismissable]');

		if (!dismissTarget) {
			return;
		}

		dismissElement(dismissTarget);
	});
}

async function dismissElement(dismissTarget: Element) {
	dismissTarget.addEventListener('animationend', () => {
		dismissTarget.remove();
	});

	const dismissAnimation = dismissTarget.getAttribute('data-dismiss-animation');

	if (dismissAnimation) {
		switch (dismissAnimation) {
			case 'slide-up':
				dismissTarget.classList.add('animation-slide-up');
				break;
			case 'fade':
				dismissTarget.classList.add('animation-fade');
				break;
		}
	}

	// Notification about content update occurrence.
	window.dispatchEvent(new CustomEvent('dismiss-content-update'));
}
