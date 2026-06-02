import { createLayoutState } from '@microsoft/atlas-js/src/index';

const layoutsClasses = [
	'layout-single',
	'layout-twin',
	'layout-holy-grail',
	'layout-sidecar-left',
	'layout-sidecar-right'
];

// A function that removes all layout classes and sets the new one
function setLayoutClass(layoutToSet: string) {
	for (const layoutClass of layoutsClasses) {
		document.documentElement.classList.remove(layoutClass);
	}
	document.documentElement.classList.add(layoutToSet);
}

// A function that removes all layout classes and sets the new one
function getCurrentLayoutClass() {
	for (const layoutClass of layoutsClasses) {
		if (document.documentElement.classList.contains(layoutClass)) {
			return layoutClass;
		}
	}
	throw new Error('No layout class present on HTML element');
}

export function initLayoutPageControls() {
	// Only the layout demo page contains the layout-set buttons.
	// On every other site page this function should be a no-op so we don't
	// persist or restore layout-* classes that don't belong to it.
	if (!document.querySelector('[data-set-layout]')) {
		return;
	}

	// Persist `layout-*` classes on <html> and replay them when the layout
	// demo page reloads. The demo page is "full" — it participates in every
	// slice — so it lists them all in `classes`. A flyout-only view in the
	// same group would pass `storageKey: 'atlas-layout-page'` with
	// `classes: ['layout-flyout-active']` and silently skip the rest.
	const layoutState = createLayoutState({
		storageKey: 'atlas-layout-page',
		classes: [
			...layoutsClasses,
			'layout-menu-collapsed',
			'layout-aside-collapsed',
			'layout-flyout-active',
			'layout-constrained'
		],
		useViewTransitionOnRestore: true
	});

	for (const layoutClass of layoutsClasses) {
		layoutState.subscribe(layoutClass, 'always', ({ isApplied }) => {
			const button = document.querySelector<HTMLButtonElement>(
				`[data-set-layout="${layoutClass}"]`
			);
			if (button) {
				button.setAttribute('aria-pressed', String(isApplied));
			}
		});
	}

	layoutState.subscribe('layout-menu-collapsed', 'always', ({ isApplied }) => {
		syncCollapseTrigger('[data-menu-collapse-toggle]', isApplied);
	});

	layoutState.subscribe('layout-aside-collapsed', 'always', ({ isApplied }) => {
		syncCollapseTrigger('[data-aside-collapse-toggle]', isApplied);
	});

	layoutState.subscribe('layout-constrained', 'always', ({ isApplied }) => {
		syncToggleButton('[data-toggle-layout-height-constraint]', isApplied);
	});

	layoutState.subscribe('layout-flyout-active', 'always', ({ isApplied }) => {
		syncToggleButton('[data-toggle-flyout-visibility]', isApplied);
	});

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

		if (document.documentElement.classList.contains(layoutToSet)) {
			return;
		}

		safeViewTransition(() => {
			if (!menuCollapseBehaviorAllowed(layoutToSet)) {
				const collapseTrigger = document.querySelector(
					'[data-menu-collapse-toggle]'
				) as HTMLButtonElement;
				if (collapseTrigger) {
					handleMenuCollapse(collapseTrigger, false);
				}
			}
			if (!asideCollapseBehaviorAllowed(layoutToSet)) {
				const collapseTrigger = document.querySelector(
					'[data-aside-collapse-toggle]'
				) as HTMLButtonElement;
				if (collapseTrigger) {
					handleAsideCollapse(collapseTrigger, false);
				}
			}
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

	// Menu collapse behavior
	window.addEventListener('click', (e: MouseEvent) => {
		const trigger =
			e.target instanceof Element &&
			(e.target.closest('[data-menu-collapse-toggle]') as HTMLElement);
		if (!trigger) {
			return;
		}

		const currentLayout = getCurrentLayoutClass();
		if (!menuCollapseBehaviorAllowed(currentLayout)) {
			return;
		}

		const isCollapsed = document.documentElement.classList.contains('layout-menu-collapsed');
		safeViewTransition(() => {
			handleMenuCollapse(trigger, !isCollapsed);
		});
	});

	// Aside collapse behavior
	window.addEventListener('click', (e: MouseEvent) => {
		const trigger =
			e.target instanceof Element &&
			(e.target.closest('[data-aside-collapse-toggle]') as HTMLElement);
		if (!trigger) {
			return;
		}

		const currentLayout = getCurrentLayoutClass();
		if (!asideCollapseBehaviorAllowed(currentLayout)) {
			return;
		}

		const isCollapsed = document.documentElement.classList.contains('layout-aside-collapsed');
		safeViewTransition(() => {
			handleAsideCollapse(trigger, !isCollapsed);
		});
	});

	// collapse only button
	window.addEventListener('click', (e: MouseEvent) => {
		const target =
			e.target instanceof Element &&
			(e.target.closest('[data-menu-collapse-only-trigger]') as HTMLElement);
		if (!target) {
			return;
		}
		const toggleButton = document.querySelector('[data-menu-collapse-toggle]') as HTMLElement;
		if (!toggleButton) {
			throw new Error('Menu collapse toggle button not found in the document');
		}
		safeViewTransition(() => {
			handleMenuCollapse(toggleButton, false);
		});
	});

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

	window.addEventListener('click', (e: MouseEvent) => {
		const target =
			e.target instanceof Element &&
			(e.target.closest('[data-toggle-flyout-visibility]') as HTMLElement);
		if (!target) {
			return;
		}

		target.classList.toggle('button-filled');
		const flyout = document.querySelector('.layout-body-flyout') as HTMLElement;
		if (!flyout) {
			return;
		}
		safeViewTransition(() => {
			const html = document.documentElement;
			html.classList.toggle('layout-flyout-active');
			target.setAttribute('aria-pressed', target.classList.contains('button-filled').toString());

			window.dispatchEvent(new CustomEvent('atlas-layout-change-event'));
		});
	});
}

declare global {
	interface Document {
		startViewTransition(callback: () => void): void;
	}
}

function handleMenuCollapse(trigger: HTMLElement, shouldCollapse: boolean) {
	const method: 'add' | 'remove' = shouldCollapse ? 'add' : 'remove';
	// eslint-disable-next-line security/detect-object-injection
	trigger.classList[method]('button-filled');
	trigger.setAttribute('aria-expanded', String(!shouldCollapse));
	// eslint-disable-next-line security/detect-object-injection
	document.documentElement.classList[method]('layout-menu-collapsed');

	window.dispatchEvent(new CustomEvent('atlas-layout-change-event'));
}

function safeViewTransition(cb: () => void) {
	if (!document.startViewTransition) {
		cb();
	} else {
		document.startViewTransition(() => cb());
	}
}

function handleAsideCollapse(trigger: HTMLElement, shouldCollapse: boolean) {
	const method: 'add' | 'remove' = shouldCollapse ? 'add' : 'remove';
	// eslint-disable-next-line security/detect-object-injection
	trigger.classList[method]('button-filled');
	trigger.setAttribute('aria-expanded', String(!shouldCollapse));
	// eslint-disable-next-line security/detect-object-injection
	document.documentElement.classList[method]('layout-aside-collapsed');

	window.dispatchEvent(new CustomEvent('atlas-layout-change-event'));
}

function menuCollapseBehaviorAllowed(layoutClass: string) {
	return layoutClass === 'layout-holy-grail' || layoutClass === 'layout-sidecar-left';
}

function asideCollapseBehaviorAllowed(layoutClass: string) {
	return (
		layoutClass === 'layout-holy-grail' ||
		layoutClass === 'layout-sidecar-right' ||
		layoutClass === 'layout-twin'
	);
}

function syncCollapseTrigger(selector: string, isCollapsed: boolean): void {
	const trigger = document.querySelector<HTMLButtonElement>(selector);
	if (!trigger) {
		return;
	}
	trigger.classList.toggle('button-filled', isCollapsed);
	trigger.setAttribute('aria-expanded', String(!isCollapsed));
}

function syncToggleButton(selector: string, isApplied: boolean): void {
	const trigger = document.querySelector<HTMLButtonElement>(selector);
	if (!trigger) {
		return;
	}
	trigger.classList.toggle('button-filled', isApplied);
	trigger.setAttribute('aria-pressed', String(isApplied));
}
