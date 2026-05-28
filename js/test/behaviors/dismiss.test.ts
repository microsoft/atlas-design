import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initDismiss } from '../../src/behaviors/dismiss';

/* -------------------------------------------------------------------------- */
/* Test helpers                                                               */
/* -------------------------------------------------------------------------- */

/**
 * `initDismiss()` attaches a single delegated click listener to `window`.
 * jsdom is shared across tests in this file, so without removing the
 * listener between tests we'd accumulate one extra handler per test and
 * leak side effects across cases.
 */
const installedListeners: ((e: Event) => void)[] = [];
const originalAddEventListener = window.addEventListener.bind(window);

function setupDismiss(): void {
	const captured: ((e: Event) => void)[] = [];
	const spy = vi.spyOn(window, 'addEventListener').mockImplementation(((
		type: string,
		listener: EventListenerOrEventListenerObject
	) => {
		if (type === 'click' && typeof listener === 'function') {
			captured.push(listener as (e: Event) => void);
		}
		return originalAddEventListener(
			type as keyof WindowEventMap,
			listener as EventListenerOrEventListenerObject
		);
	}) as typeof window.addEventListener);
	initDismiss();
	spy.mockRestore();
	installedListeners.push(...captured);
}

function resetDom(): void {
	document.body.innerHTML = '';
}

function removeInstalledListeners(): void {
	while (installedListeners.length) {
		const listener = installedListeners.pop();
		if (listener) {
			window.removeEventListener('click', listener);
		}
	}
}

beforeEach(() => {
	resetDom();
});

afterEach(() => {
	removeInstalledListeners();
	resetDom();
});

/* -------------------------------------------------------------------------- */
/* Tests                                                                      */
/* -------------------------------------------------------------------------- */

describe('initDismiss', () => {
	it('removes the dismissable ancestor when the dismiss button is clicked [ai generated]', () => {
		setupDismiss();
		document.body.innerHTML = `
			<div id="card" data-dismissable>
				<button id="close" data-dismiss>Close</button>
			</div>
		`;
		const button = document.getElementById('close')!;
		button.click();
		expect(document.getElementById('card')).toBeNull();
	});

	it('does nothing when the click target is not inside a dismiss button [ai generated]', () => {
		setupDismiss();
		document.body.innerHTML = `
			<div id="card" data-dismissable>
				<p id="text">Hello</p>
			</div>
		`;
		document.getElementById('text')!.click();
		expect(document.getElementById('card')).not.toBeNull();
	});

	it('does nothing when a dismiss button has no dismissable ancestor [ai generated]', () => {
		setupDismiss();
		document.body.innerHTML = `<button id="lonely" data-dismiss>Close</button>`;
		const button = document.getElementById('lonely')!;
		// Should simply no-op without throwing
		expect(() => button.click()).not.toThrow();
		expect(document.getElementById('lonely')).not.toBeNull();
	});

	it('dispatches "dismiss-content-update" after a successful dismissal [ai generated]', () => {
		setupDismiss();
		document.body.innerHTML = `
			<div id="card" data-dismissable>
				<button id="close" data-dismiss>x</button>
			</div>
		`;
		const handler = vi.fn();
		window.addEventListener('dismiss-content-update', handler);
		try {
			document.getElementById('close')!.click();
			expect(handler).toHaveBeenCalledTimes(1);
		} finally {
			window.removeEventListener('dismiss-content-update', handler);
		}
	});

	it('adds animation-slide-up class and waits for animationend before removing [ai generated]', () => {
		setupDismiss();
		document.body.innerHTML = `
			<div id="card" data-dismissable data-dismiss-animation="slide-up">
				<button id="close" data-dismiss>x</button>
			</div>
		`;
		const card = document.getElementById('card')!;
		document.getElementById('close')!.click();
		expect(card.classList.contains('animation-slide-up')).toBe(true);
		// Element is still present until animationend fires
		expect(document.getElementById('card')).not.toBeNull();
		card.dispatchEvent(new Event('animationend'));
		expect(document.getElementById('card')).toBeNull();
	});

	it('adds animation-fade class when animation is "fade" [ai generated]', () => {
		setupDismiss();
		document.body.innerHTML = `
			<div id="card" data-dismissable data-dismiss-animation="fade">
				<button id="close" data-dismiss>x</button>
			</div>
		`;
		const card = document.getElementById('card')!;
		document.getElementById('close')!.click();
		expect(card.classList.contains('animation-fade')).toBe(true);
		card.dispatchEvent(new Event('animationend'));
		expect(document.getElementById('card')).toBeNull();
	});

	it('does not add any animation class for an unrecognized animation value, but still removes after animationend [ai generated]', () => {
		setupDismiss();
		document.body.innerHTML = `
			<div id="card" data-dismissable data-dismiss-animation="wiggle">
				<button id="close" data-dismiss>x</button>
			</div>
		`;
		const card = document.getElementById('card')!;
		document.getElementById('close')!.click();
		expect(card.classList.contains('animation-slide-up')).toBe(false);
		expect(card.classList.contains('animation-fade')).toBe(false);
		// The animationend listener is still attached.
		card.dispatchEvent(new Event('animationend'));
		expect(document.getElementById('card')).toBeNull();
	});

	it('finds the closest dismiss button when clicking on a descendant of it [ai generated]', () => {
		setupDismiss();
		document.body.innerHTML = `
			<div id="card" data-dismissable>
				<button data-dismiss><span id="icon">x</span></button>
			</div>
		`;
		document.getElementById('icon')!.click();
		expect(document.getElementById('card')).toBeNull();
	});
});
