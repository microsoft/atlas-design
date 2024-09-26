const layoutsClasses = [
	'layout-single',
	'layout-twin',
	'layout-holy-grail',
	'layout-sidecar-left',
	'layout-sidecar-right',
	'layout-twin'
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

	window.addEventListener('click', (e: MouseEvent) => {
		const target =
			e.target instanceof Element &&
			(e.target.closest('[data-toggle-layout-height-constraint]') as HTMLElement);
		if (!target) {
			return;
		}

		target.classList.toggle('button-filled');
		document.documentElement.classList.toggle('layout-constrained');
		target.setAttribute('aria-pressed', target.classList.contains('button-filled').toString());

		window.dispatchEvent(new CustomEvent('atlas-layout-change-event'));
	});

	//

	window.addEventListener('click', (e: MouseEvent) => {
		const target =
			e.target instanceof Element &&
			(e.target.closest('[data-toggle-hero-visibility]') as HTMLElement);
		if (!target) {
			return;
		}

		target.classList.toggle('button-filled');
		const hero = document.querySelector('.layout-body-hero') as HTMLElement;
		if (!hero) {
			return;
		}
		hero.hidden = !hero.hidden;
		target.setAttribute('aria-pressed', target.classList.contains('button-filled').toString());

		window.dispatchEvent(new CustomEvent('atlas-layout-change-event'));
	});

	window.addEventListener('click', (e: MouseEvent) => {
		const target =
			e.target instanceof Element &&
			(e.target.closest('[data-toggle-footer-visibility]') as HTMLElement);
		if (!target) {
			return;
		}

		target.classList.toggle('button-filled');
		const footer = document.querySelector('.layout-body-footer') as HTMLElement;
		if (!footer) {
			return;
		}
		footer.hidden = !footer.hidden;
		target.setAttribute('aria-pressed', target.classList.contains('button-filled').toString());

		window.dispatchEvent(new CustomEvent('atlas-layout-change-event'));
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
