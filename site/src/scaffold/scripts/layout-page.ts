const layoutsClasses = [
	'layout-single',
	'layout-holy-grail',
	'layout-sidecar-left',
	'layout-sidecar-right'
];

// A function that removes all classes that begin with layout- on the html element
function setLayoutClass(layoutToSet: string) {
	for (const layoutClass of layoutsClasses) {
		document.documentElement.classList.remove(layoutClass);
	}
	document.documentElement.classList.add(layoutToSet);
}

export function initLayoutPageControls() {
	window.addEventListener('click', (e: MouseEvent) => {
		const target =
			e.target instanceof Element && (e.target.closest('[data-set-layout]') as HTMLElement);
		if (!target) {
			return;
		}
		const layoutToSet: string = target.dataset.setLayout || 'not-found';
		if (!layoutsClasses.includes(layoutToSet)) {
			throw new Error(
				'Attempting to set a layout class that does not match current list of available layouts'
			);
		}

		safeViewTransition(() => {
			setLayoutClass(layoutToSet);
			scrollTo({ behavior: 'instant', top: target.getBoundingClientRect().top - 200 });
			const setThemeButtons = Array.from(document.querySelectorAll('[data-set-layout]'));
			for (const button of setThemeButtons) {
				button.setAttribute('aria-pressed', 'false');
			}
			target.setAttribute('aria-pressed', 'true');
		});
	});

	window.addEventListener('click', (e: MouseEvent) => {
		const target =
			e.target instanceof Element && (e.target.closest('[data-toggle-debug]') as HTMLElement);
		if (!target) {
			return;
		}
		target.classList.toggle('button-filled');
		document.documentElement.classList.toggle('debug');
		target.setAttribute('aria-pressed', target.classList.contains('button-filled').toString());
	});
}

declare global {
	interface Document {
		startViewTransition(callback: () => void): void;
	}
}

function safeViewTransition(cb: () => void) {
	if (!document.startViewTransition) {
		cb();
	} else {
		document.startViewTransition(() => cb());
	}
}
