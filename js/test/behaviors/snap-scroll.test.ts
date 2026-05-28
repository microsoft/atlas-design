import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initSnapScroll, initSnapScrollScrollListeners } from '../../src/behaviors/snap-scroll';

/* -------------------------------------------------------------------------- */
/* Test helpers                                                               */
/*                                                                            */
/* `snap-scroll` relies on:                                                   */
/*   - a delegated window click handler installed via `initSnapScroll()`      */
/*   - `IntersectionObserver` (not available in jsdom by default)             */
/*   - `Element.scrollIntoView` (not implemented in jsdom)                    */
/*                                                                            */
/* We install minimal, transparent stubs so behavior is observable without    */
/* introducing significant mocking surface.                                   */
/* -------------------------------------------------------------------------- */

interface FakeObserverInstance {
	observed: Element[];
	callback: IntersectionObserverCallback;
	options: IntersectionObserverInit | undefined;
	trigger(target: Element, isIntersecting: boolean): void;
}

const observerInstances: FakeObserverInstance[] = [];
const originalIntersectionObserver = (globalThis as { IntersectionObserver?: unknown })
	.IntersectionObserver;
const originalScrollIntoView = Element.prototype.scrollIntoView;
const scrollIntoViewSpy = vi.fn();

class FakeIntersectionObserver {
	observed: Element[] = [];
	callback: IntersectionObserverCallback;
	options: IntersectionObserverInit | undefined;
	constructor(cb: IntersectionObserverCallback, options?: IntersectionObserverInit) {
		this.callback = cb;
		this.options = options;
		observerInstances.push(this as unknown as FakeObserverInstance);
	}
	observe(target: Element): void {
		this.observed.push(target);
	}
	unobserve(): void {}
	disconnect(): void {}
	takeRecords(): IntersectionObserverEntry[] {
		return [];
	}
	trigger(target: Element, isIntersecting: boolean): void {
		const entry = {
			target,
			isIntersecting,
			intersectionRatio: isIntersecting ? 1 : 0,
			boundingClientRect: target.getBoundingClientRect(),
			intersectionRect: target.getBoundingClientRect(),
			rootBounds: null,
			time: 0
		} as IntersectionObserverEntry;
		this.callback([entry], this as unknown as IntersectionObserver);
	}
}

const installedListeners: ((e: Event) => void)[] = [];
const originalAddEventListener = window.addEventListener.bind(window);

function setupSnapScroll(): void {
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
	try {
		initSnapScroll();
	} finally {
		spy.mockRestore();
		// Push everything captured so far, even if initSnapScroll threw mid-iteration.
		installedListeners.push(...captured);
	}
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
	observerInstances.length = 0;
	scrollIntoViewSpy.mockReset();
	(globalThis as { IntersectionObserver?: unknown }).IntersectionObserver =
		FakeIntersectionObserver;
	Element.prototype.scrollIntoView =
		scrollIntoViewSpy as unknown as typeof Element.prototype.scrollIntoView;
	vi.useFakeTimers();
});

afterEach(() => {
	vi.useRealTimers();
	removeInstalledListeners();
	resetDom();
	observerInstances.length = 0;
	(globalThis as { IntersectionObserver?: unknown }).IntersectionObserver =
		originalIntersectionObserver;
	Element.prototype.scrollIntoView = originalScrollIntoView;
});

/* -------------------------------------------------------------------------- */
/* Tests                                                                      */
/* -------------------------------------------------------------------------- */

describe('initSnapScrollScrollListeners', () => {
	it('throws when no element matches [data-snap-scroll-slides] [ai generated]', () => {
		const root = document.createElement('div');
		document.body.appendChild(root);
		expect(() => initSnapScrollScrollListeners(root)).toThrow(
			/scrollable element with "data-snap-scroll-slides"/
		);
	});

	it('observes every slide element with IntersectionObserver [ai generated]', () => {
		document.body.innerHTML = `
			<div data-snap-scroll="demo">
				<div data-snap-scroll-slides>
					<a data-snap-scroll-slide="a"></a>
					<a data-snap-scroll-slide="b"></a>
					<a data-snap-scroll-slide="c"></a>
				</div>
				<nav>
					<a data-snap-scroll-nav-item="a"></a>
					<a data-snap-scroll-nav-item="b"></a>
					<a data-snap-scroll-nav-item="c"></a>
				</nav>
			</div>
		`;
		const root = document.querySelector('[data-snap-scroll]') as HTMLElement;
		initSnapScrollScrollListeners(root);
		expect(observerInstances).toHaveLength(1);
		expect(observerInstances[0].observed).toHaveLength(3);
		expect(observerInstances[0].options).toMatchObject({ threshold: 0.8, rootMargin: '0px' });
	});

	it('marks the matching nav item is-current when a slide intersects [ai generated]', () => {
		document.body.innerHTML = `
			<div data-snap-scroll="demo">
				<div data-snap-scroll-slides>
					<a data-snap-scroll-slide="a"></a>
					<a id="slideB" data-snap-scroll-slide="b"></a>
				</div>
				<nav>
					<a id="navA" data-snap-scroll-nav-item="a" class="is-current"></a>
					<a id="navB" data-snap-scroll-nav-item="b"></a>
				</nav>
			</div>
		`;
		const root = document.querySelector('[data-snap-scroll]') as HTMLElement;
		initSnapScrollScrollListeners(root);
		const slideB = document.getElementById('slideB')!;
		observerInstances[0].trigger(slideB, true);
		expect(document.getElementById('navA')!.classList.contains('is-current')).toBe(false);
		expect(document.getElementById('navB')!.classList.contains('is-current')).toBe(true);
	});

	it('throws when the intersecting slide has no data-snap-scroll-slide value [ai generated]', () => {
		document.body.innerHTML = `
			<div data-snap-scroll="demo">
				<div data-snap-scroll-slides>
					<a id="bare"></a>
				</div>
			</div>
		`;
		const root = document.querySelector('[data-snap-scroll]') as HTMLElement;
		// Manually push the slide into the observer list because the original
		// selector requires the attribute to be present.
		initSnapScrollScrollListeners(root);
		const bare = document.getElementById('bare')!;
		expect(() => observerInstances[0].trigger(bare, true)).toThrow(
			/does not correspond to a \[data-snap-scroll-nav-item\]/
		);
	});

	it('throws when there is no nav item matching the intersecting slide [ai generated]', () => {
		document.body.innerHTML = `
			<div data-snap-scroll="demo">
				<div data-snap-scroll-slides>
					<a id="slideA" data-snap-scroll-slide="a"></a>
				</div>
			</div>
		`;
		const root = document.querySelector('[data-snap-scroll]') as HTMLElement;
		initSnapScrollScrollListeners(root);
		const slide = document.getElementById('slideA')!;
		expect(() => observerInstances[0].trigger(slide, true)).toThrow(/Anchor missing/);
	});
});

describe('initSnapScroll click delegation', () => {
	it('does nothing when the click target is not a nav item [ai generated]', () => {
		document.body.innerHTML = `<div><button id="other">Click</button></div>`;
		setupSnapScroll();
		document.getElementById('other')!.click();
		expect(scrollIntoViewSpy).not.toHaveBeenCalled();
	});

	it('does nothing when a nav item has no enclosing snap-scroll container [ai generated]', () => {
		document.body.innerHTML = `<a id="orphan" data-snap-scroll-nav-item="a"></a>`;
		setupSnapScroll();
		document.getElementById('orphan')!.click();
		expect(scrollIntoViewSpy).not.toHaveBeenCalled();
	});

	it('updates is-current and scrolls the matching slide into view [ai generated]', () => {
		document.body.innerHTML = `
			<div data-snap-scroll="demo">
				<div data-snap-scroll-slides>
					<a id="slideA" data-snap-scroll-slide="a"></a>
					<a id="slideB" data-snap-scroll-slide="b"></a>
				</div>
				<nav>
					<a id="navA" data-snap-scroll-nav-item="a" class="is-current"></a>
					<a id="navB" data-snap-scroll-nav-item="b"></a>
				</nav>
			</div>
		`;
		setupSnapScroll();
		const navB = document.getElementById('navB')!;
		navB.click();
		expect(document.getElementById('navA')!.classList.contains('is-current')).toBe(false);
		expect(navB.classList.contains('is-current')).toBe(true);
		expect(scrollIntoViewSpy).toHaveBeenCalledTimes(1);
		expect(scrollIntoViewSpy).toHaveBeenCalledWith({
			behavior: 'auto',
			block: 'nearest',
			inline: 'start'
		});
	});

	it('prevents default on the nav anchor click [ai generated]', () => {
		document.body.innerHTML = `
			<div data-snap-scroll="demo">
				<div data-snap-scroll-slides>
					<a id="slideA" data-snap-scroll-slide="a"></a>
				</div>
				<nav>
					<a id="navA" href="#a" data-snap-scroll-nav-item="a"></a>
				</nav>
			</div>
		`;
		setupSnapScroll();
		const navA = document.getElementById('navA')!;
		const event = new MouseEvent('click', { bubbles: true, cancelable: true });
		navA.dispatchEvent(event);
		expect(event.defaultPrevented).toBe(true);
	});

	it('ignores intersection callbacks fired while a click-driven scroll is in flight [ai generated]', () => {
		document.body.innerHTML = `
			<div data-snap-scroll="demo">
				<div data-snap-scroll-slides>
					<a id="slideA" data-snap-scroll-slide="a"></a>
					<a id="slideB" data-snap-scroll-slide="b"></a>
				</div>
				<nav>
					<a id="navA" data-snap-scroll-nav-item="a" class="is-current"></a>
					<a id="navB" data-snap-scroll-nav-item="b"></a>
				</nav>
			</div>
		`;
		// Register scroll listener first so the FakeIntersectionObserver is
		// captured.
		const root = document.querySelector('[data-snap-scroll]') as HTMLElement;
		initSnapScrollScrollListeners(root);
		setupSnapScroll();

		document.getElementById('navB')!.click();
		// During the 500ms lockout, intersection callbacks should be ignored,
		// so triggering slide A's intersection should NOT flip is-current back.
		observerInstances[0].trigger(document.getElementById('slideA')!, true);
		expect(document.getElementById('navA')!.classList.contains('is-current')).toBe(false);
		expect(document.getElementById('navB')!.classList.contains('is-current')).toBe(true);

		// After the lockout expires, intersection callbacks resume.
		vi.advanceTimersByTime(500);
		observerInstances[0].trigger(document.getElementById('slideA')!, true);
		expect(document.getElementById('navA')!.classList.contains('is-current')).toBe(true);
		expect(document.getElementById('navB')!.classList.contains('is-current')).toBe(false);
	});
});
