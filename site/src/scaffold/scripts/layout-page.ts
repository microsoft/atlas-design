const layoutsClasses = ['layout-single', 'layout-holy-grail'];

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
		setLayoutClass(layoutToSet);
		scrollTo({ behavior: 'smooth', top: target.getBoundingClientRect().top - 200 });
	});

	window.addEventListener('click', (e: MouseEvent) => {
		const target =
			e.target instanceof Element && (e.target.closest('[data-toggle-debug]') as HTMLElement);
		if (!target) {
			return;
		}
		target.classList.toggle('button-filled');
		document.documentElement.classList.toggle('debug');
	});
}
