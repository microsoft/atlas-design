import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { initPopover } from '../../src/behaviors/popover';

/* -------------------------------------------------------------------------- */
/* Test helpers                                                               */
/*                                                                            */
/* The popover behavior is driven by `toggle` events on `<details>` elements. */
/* Positioning reads layout (offsetWidth / getBoundingClientRect) which jsdom */
/* reports as 0. That's fine: we still get observable side effects like the   */
/* visibility flip, top/left inline styles being touched, and outside-click   */
/* closing.                                                                   */
/*                                                                            */
/* Teardown notes:                                                            */
/*   - `initPopover` attaches a delegated `toggle` listener to its container. */
/*     We use a per-test container child so the listener dies with that node. */
/*   - When opened, the behavior also attaches `blur` and `resize` listeners  */
/*     to `window`. Those are only removed by `closePopovers()` (Escape /     */
/*     outside click). We track every window listener installed during the    */
/*     test and remove anything that's still attached at teardown.            */
/* -------------------------------------------------------------------------- */

interface RAFCall {
	cb: FrameRequestCallback;
}

const rafCalls: RAFCall[] = [];
const originalRAF = window.requestAnimationFrame;

let container: HTMLElement;
type WindowListenerSpies = {
	add: MockInstance | undefined;
	remove: MockInstance | undefined;
};

const windowListenerSpies: WindowListenerSpies = { add: undefined, remove: undefined };
const installedWindowListeners: {
	type: string;
	listener: EventListenerOrEventListenerObject;
	options: boolean | AddEventListenerOptions | undefined;
}[] = [];

function flushRAF(): void {
	while (rafCalls.length > 0) {
		const next = rafCalls.shift();
		next?.cb(0);
	}
}

function buildPopover({
	id = 'pop',
	modifierClasses = ''
}: { id?: string; modifierClasses?: string } = {}): HTMLDetailsElement {
	const wrapper = document.createElement('div');
	wrapper.innerHTML = `
		<details id="${id}" class="popover ${modifierClasses}">
			<summary>Open</summary>
			<div class="popover-content">
				<p>Body</p>
				<button data-popover-close>Close</button>
			</div>
		</details>
	`;
	container.appendChild(wrapper);
	const details = document.getElementById(id) as HTMLDetailsElement;
	// jsdom does not lay elements out, so `offsetParent` is null. The popover
	// positioning code reads `offsetParent.getBoundingClientRect()`, so we
	// give the content element a stable, real parent to point at.
	const content = details.querySelector('.popover-content') as HTMLElement;
	Object.defineProperty(content, 'offsetParent', {
		configurable: true,
		get: () => document.body
	});
	return details;
}

async function openDetails(details: HTMLDetailsElement): Promise<void> {
	details.open = true;
	// jsdom queues a native `toggle` event asynchronously. Yield to let it run.
	await new Promise<void>(resolve => setTimeout(resolve, 0));
}

async function closeDetails(details: HTMLDetailsElement): Promise<void> {
	details.open = false;
	await new Promise<void>(resolve => setTimeout(resolve, 0));
}

beforeEach(() => {
	document.body.innerHTML = '';
	rafCalls.length = 0;
	window.requestAnimationFrame = ((cb: FrameRequestCallback) => {
		rafCalls.push({ cb });
		return rafCalls.length;
	}) as typeof window.requestAnimationFrame;

	container = document.createElement('div');
	document.body.appendChild(container);

	// Track every window listener registered during the test so we can
	// remove anything the behavior never got around to cleaning up.
	installedWindowListeners.length = 0;
	const origAdd = window.addEventListener.bind(window);
	const origRemove = window.removeEventListener.bind(window);
	windowListenerSpies.add = vi.spyOn(window, 'addEventListener').mockImplementation(((
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions
	) => {
		installedWindowListeners.push({ type, listener, options });
		return origAdd(
			type as keyof WindowEventMap,
			listener as EventListenerOrEventListenerObject,
			options
		);
	}) as typeof window.addEventListener);
	windowListenerSpies.remove = vi.spyOn(window, 'removeEventListener').mockImplementation(((
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions
	) => {
		const idx = installedWindowListeners.findIndex(
			entry => entry.type === type && entry.listener === listener
		);
		if (idx >= 0) installedWindowListeners.splice(idx, 1);
		return origRemove(
			type as keyof WindowEventMap,
			listener as EventListenerOrEventListenerObject,
			options
		);
	}) as typeof window.removeEventListener);
});

afterEach(() => {
	// Sweep any window listeners the behavior left behind (e.g. when a test
	// opens a popover and never closes it).
	for (const { type, listener, options } of installedWindowListeners.splice(0)) {
		window.removeEventListener(type, listener, options as EventListenerOptions);
	}
	windowListenerSpies.add?.mockRestore();
	windowListenerSpies.remove?.mockRestore();

	window.requestAnimationFrame = originalRAF;
	rafCalls.length = 0;
	// Clearing innerHTML detaches the per-test container; the delegated
	// `toggle` listener on it becomes GC-eligible together with the node.
	document.body.innerHTML = '';
});

/* -------------------------------------------------------------------------- */
/* Tests                                                                      */
/* -------------------------------------------------------------------------- */

describe('initPopover', () => {
	it('does not throw on a toggle from an element that is not a popover [ai generated]', async () => {
		initPopover(container);

		const details = document.createElement('details');
		container.appendChild(details);

		// No matching `details.popover` ancestor → handler should be a no-op.
		details.open = true;
		await new Promise<void>(resolve => setTimeout(resolve, 0));
		expect(rafCalls).toHaveLength(0);
	});

	it('does nothing when the popover has no .popover-content child [ai generated]', async () => {
		initPopover(container);
		const details = document.createElement('details');
		details.classList.add('popover');
		details.innerHTML = `<summary>Open</summary>`;
		container.appendChild(details);

		details.open = true;
		await new Promise<void>(resolve => setTimeout(resolve, 0));
		// No RAF should have been requested because the handler bailed early.
		expect(rafCalls).toHaveLength(0);
	});

	it('schedules a requestAnimationFrame to position content when opened [ai generated]', async () => {
		initPopover(container);
		const details = buildPopover();
		await openDetails(details);

		expect(rafCalls.length).toBeGreaterThanOrEqual(1);
		flushRAF();

		const content = details.querySelector('.popover-content') as HTMLElement;
		expect(content.style.visibility).toBe('visible');
	});

	it('hides content immediately when the popover is closed via toggle [ai generated]', async () => {
		initPopover(container);
		const details = buildPopover();
		await openDetails(details);
		flushRAF();
		await closeDetails(details);

		const content = details.querySelector('.popover-content') as HTMLElement;
		expect(content.style.visibility).toBe('hidden');
	});

	it('closes the popover when Escape is pressed [ai generated]', async () => {
		initPopover(container);
		const details = buildPopover();
		await openDetails(details);
		flushRAF();

		container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		expect(details.hasAttribute('open')).toBe(false);
		const content = details.querySelector('.popover-content') as HTMLElement;
		expect(content.style.visibility).toBe('hidden');
	});

	it('closes the popover on a click outside the popover [ai generated]', async () => {
		initPopover(container);
		const details = buildPopover();
		const outside = document.createElement('button');
		outside.id = 'outside';
		container.appendChild(outside);
		await openDetails(details);
		flushRAF();

		outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		expect(details.hasAttribute('open')).toBe(false);
	});

	it('does not close the popover when clicking content inside the popover [ai generated]', async () => {
		initPopover(container);
		const details = buildPopover();
		await openDetails(details);
		flushRAF();

		const inner = details.querySelector('p') as HTMLElement;
		inner.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		expect(details.hasAttribute('open')).toBe(true);
	});

	it('closes the popover when a [data-popover-close] inside the popover is clicked [ai generated]', async () => {
		initPopover(container);
		const details = buildPopover();
		await openDetails(details);
		flushRAF();

		const close = details.querySelector('[data-popover-close]') as HTMLElement;
		close.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		expect(details.hasAttribute('open')).toBe(false);
	});

	it('removes all listeners after closing, so a later outside click does not throw [ai generated]', async () => {
		initPopover(container);
		const details = buildPopover();
		await openDetails(details);
		flushRAF();

		container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		expect(details.hasAttribute('open')).toBe(false);

		// Outside clicks after closure must be inert.
		expect(() => container.dispatchEvent(new MouseEvent('click', { bubbles: true }))).not.toThrow();
	});

	it('repositions on window resize while the popover is open [ai generated]', async () => {
		initPopover(container);
		const details = buildPopover();
		await openDetails(details);
		flushRAF();

		const content = details.querySelector('.popover-content') as HTMLElement;
		// Force a "stale" state we can detect on reposition.
		content.style.visibility = 'hidden';

		window.dispatchEvent(new Event('resize'));
		expect(content.style.visibility).toBe('visible');
	});

	it('toggles the popover-caret-bottom class only on caret-style popovers placed above [ai generated]', async () => {
		initPopover(container);
		const details = buildPopover({ modifierClasses: 'popover-caret popover-top' });
		await openDetails(details);
		flushRAF();
		expect(details.classList.contains('popover-caret-bottom')).toBe(true);
	});

	it('does not add popover-caret-bottom when the popover is forced to render below [ai generated]', async () => {
		initPopover(container);
		const details = buildPopover({ modifierClasses: 'popover-caret popover-bottom' });
		await openDetails(details);
		flushRAF();
		expect(details.classList.contains('popover-caret-bottom')).toBe(false);
	});

	it('ignores toggle events that bubble up from elements outside any details.popover [ai generated]', () => {
		initPopover(container);
		const orphan = document.createElement('details');
		container.appendChild(orphan);
		expect(() => orphan.dispatchEvent(new Event('toggle'))).not.toThrow();
		expect(rafCalls).toHaveLength(0);
	});
});
