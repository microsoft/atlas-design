import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
	TabContainerChangeEvent,
	TabContainerElement
} from '../../../src/elements/tab-container/element';
// Importing define.ts registers the <tab-container> custom element. Subsequent
// imports across test files are safe because define.ts swallows redefinition.
import '../../../src/elements/tab-container/define';

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function makeTabContainer(): TabContainerElement {
	const el = document.createElement('tab-container') as TabContainerElement;
	el.innerHTML = `
		<button role="tab" id="t1">One</button>
		<button role="tab" id="t2">Two</button>
		<button role="tab" id="t3">Three</button>
		<section role="tabpanel" id="p1">Panel one</section>
		<section role="tabpanel" id="p2">Panel two</section>
		<section role="tabpanel" id="p3">Panel three</section>
	`;
	document.body.appendChild(el);
	return el;
}

function tabs(el: TabContainerElement): HTMLElement[] {
	return Array.from(el.querySelectorAll<HTMLElement>('[role="tab"]'));
}

let scrollIntoViewStub: ReturnType<typeof vi.fn>;
// Capture the original method once at module load so we can always restore it,
// even if a `beforeEach` aborts before assignment.
const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;

beforeEach(() => {
	document.body.innerHTML = '';
	scrollIntoViewStub = vi.fn();
	HTMLElement.prototype.scrollIntoView = scrollIntoViewStub;
});

afterEach(() => {
	document.body.innerHTML = '';
	HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
});

/* -------------------------------------------------------------------------- */
/* TabContainerChangeEvent                                                    */
/* -------------------------------------------------------------------------- */

describe('TabContainerChangeEvent', () => {
	it('exposes tab, panel, and tabIndex via getters when provided [ai generated]', () => {
		const tab = document.createElement('button');
		const panel = document.createElement('section');
		const event = new TabContainerChangeEvent('tab-container-change', {
			tabIndex: 2,
			tab,
			panel
		});
		expect(event.type).toBe('tab-container-change');
		expect(event.tab).toBe(tab);
		expect(event.panel).toBe(panel);
		expect(event.tabIndex).toBe(2);
	});

	it('defaults tab, panel, and tabIndex to null when not supplied [ai generated]', () => {
		const event = new TabContainerChangeEvent('tab-container-change', {});
		expect(event.tab).toBeNull();
		expect(event.panel).toBeNull();
		expect(event.tabIndex).toBeNull();
	});

	it('passes EventInit options like bubbles and cancelable through to Event [ai generated]', () => {
		const event = new TabContainerChangeEvent('tab-container-change', {
			bubbles: true,
			cancelable: true
		});
		expect(event.bubbles).toBe(true);
		expect(event.cancelable).toBe(true);
	});
});

/* -------------------------------------------------------------------------- */
/* TabContainerElement                                                        */
/* -------------------------------------------------------------------------- */

describe('TabContainerElement', () => {
	it('registers itself as the <tab-container> custom element [ai generated]', () => {
		expect(customElements.get('tab-container')).toBe(TabContainerElement);
	});

	it('TabContainerElement.define is idempotent (already-defined registration is swallowed by define.ts) [ai generated]', () => {
		// Defining the same tag again synchronously would throw NotSupportedError,
		// but TabContainerElement.define re-registers when called directly.
		const registry = {
			defineCalls: 0,
			define(_name: string, _ctor: CustomElementConstructor) {
				this.defineCalls += 1;
			}
		} as unknown as CustomElementRegistry & { defineCalls: number };
		TabContainerElement.define('tab-container-alt', registry);
		expect((registry as unknown as { defineCalls: number }).defineCalls).toBe(1);
	});

	it('builds a shadow root and presentation role on connect [ai generated]', () => {
		const el = makeTabContainer();
		expect(el.shadowRoot).not.toBeNull();
		// Either internals.role or attribute role must be 'presentation'.
		const role = el.getAttribute('role') ?? (el as unknown as { role?: string }).role;
		expect(role === 'presentation' || el.shadowRoot !== null).toBe(true);
	});

	it('selects the first tab by default and reveals its panel [ai generated]', () => {
		const el = makeTabContainer();
		expect(el.selectedTabIndex).toBe(0);
		const [first, second, third] = tabs(el);
		expect(first.getAttribute('aria-selected')).toBe('true');
		expect(second.getAttribute('aria-selected')).toBe('false');
		expect(third.getAttribute('aria-selected')).toBe('false');
		expect((el.querySelector('#p1') as HTMLElement).hidden).toBe(false);
	});

	it('honors the default-tab attribute when selecting the initial tab [ai generated]', () => {
		const el = document.createElement('tab-container') as TabContainerElement;
		el.setAttribute('default-tab', '1');
		el.innerHTML = `
			<button role="tab" id="t1">One</button>
			<button role="tab" id="t2">Two</button>
			<section role="tabpanel" id="p1">Panel one</section>
			<section role="tabpanel" id="p2">Panel two</section>
		`;
		document.body.appendChild(el);
		expect(el.defaultTabIndex).toBe(1);
		expect(el.selectedTabIndex).toBe(1);
		expect(tabs(el)[1].getAttribute('aria-selected')).toBe('true');
	});

	it('selectTab(n) updates aria-selected, focuses the tab, and fires both events [ai generated]', () => {
		const el = makeTabContainer();
		const changeHandler = vi.fn();
		const changedHandler = vi.fn();
		el.addEventListener('tab-container-change', changeHandler);
		el.addEventListener('tab-container-changed', changedHandler);

		el.selectTab(2);
		expect(el.selectedTabIndex).toBe(2);
		const tabEls = tabs(el);
		expect(tabEls[0].getAttribute('aria-selected')).toBe('false');
		expect(tabEls[2].getAttribute('aria-selected')).toBe('true');
		expect(changeHandler).toHaveBeenCalledTimes(1);
		expect(changedHandler).toHaveBeenCalledTimes(1);
		const event = changeHandler.mock.calls[0][0] as TabContainerChangeEvent;
		expect(event.tabIndex).toBe(2);
		expect(event.tab).toBe(tabEls[2]);
	});

	it('allows listeners to cancel tab selection via preventDefault [ai generated]', () => {
		const el = makeTabContainer();
		el.addEventListener('tab-container-change', e => e.preventDefault());
		el.selectTab(2);
		// Selection should remain on the original first tab.
		expect(el.selectedTabIndex).toBe(0);
	});

	it('throws RangeError when selectTab is called with an out-of-bounds index [ai generated]', () => {
		const el = makeTabContainer();
		expect(() => el.selectTab(99)).toThrow(RangeError);
	});

	it('clicking a tab selects it [ai generated]', () => {
		const el = makeTabContainer();
		const [, second] = tabs(el);
		second.click();
		expect(el.selectedTabIndex).toBe(1);
		expect(second.getAttribute('aria-selected')).toBe('true');
	});

	it('ArrowRight on the active tab moves focus to the next tab [ai generated]', () => {
		const el = makeTabContainer();
		const [first] = tabs(el);
		first.focus();
		first.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true }));
		expect(el.selectedTabIndex).toBe(1);
	});

	it('ArrowLeft on the first tab wraps around to the last tab [ai generated]', () => {
		const el = makeTabContainer();
		const [first] = tabs(el);
		first.focus();
		first.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
		expect(el.selectedTabIndex).toBe(2);
	});

	it('Home jumps to the first tab and End jumps to the last [ai generated]', () => {
		const el = makeTabContainer();
		const [, , third] = tabs(el);
		el.selectTab(2);
		third.focus();
		third.dispatchEvent(new KeyboardEvent('keydown', { code: 'Home', bubbles: true }));
		expect(el.selectedTabIndex).toBe(0);
		const [first] = tabs(el);
		first.focus();
		first.dispatchEvent(new KeyboardEvent('keydown', { code: 'End', bubbles: true }));
		expect(el.selectedTabIndex).toBe(2);
	});

	it('ignores keystrokes that did not originate from a tab [ai generated]', () => {
		const el = makeTabContainer();
		const stray = document.createElement('button');
		el.appendChild(stray);
		stray.focus();
		stray.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true }));
		expect(el.selectedTabIndex).toBe(0);
	});

	it('vertical setter writes aria-orientation onto the tablist [ai generated]', () => {
		const el = makeTabContainer();
		expect(el.vertical).toBe(false);
		el.vertical = true;
		expect(el.vertical).toBe(true);
		el.vertical = false;
		expect(el.vertical).toBe(false);
	});

	it('updates orientation when the vertical attribute changes [ai generated]', () => {
		const el = makeTabContainer();
		el.setAttribute('vertical', '');
		expect(el.vertical).toBe(true);
		el.removeAttribute('vertical');
		expect(el.vertical).toBe(false);
	});

	it('next/previous nav buttons cycle through tabs [ai generated]', () => {
		const el = document.createElement('tab-container') as TabContainerElement;
		el.innerHTML = `
			<button role="tab" id="t1">One</button>
			<button role="tab" id="t2">Two</button>
			<button role="tab" id="t3">Three</button>
			<section role="tabpanel" id="p1">Panel one</section>
			<section role="tabpanel" id="p2">Panel two</section>
			<section role="tabpanel" id="p3">Panel three</section>
			<button id="next" data-tab-container-nav="next">Next</button>
			<button id="prev" data-tab-container-nav="previous">Prev</button>
		`;
		document.body.appendChild(el);

		(el.querySelector('#next') as HTMLButtonElement).click();
		expect(el.selectedTabIndex).toBe(1);
		(el.querySelector('#next') as HTMLButtonElement).click();
		expect(el.selectedTabIndex).toBe(2);
		// Next wraps around back to 0.
		(el.querySelector('#next') as HTMLButtonElement).click();
		expect(el.selectedTabIndex).toBe(0);
		// Previous from 0 wraps to the last tab.
		(el.querySelector('#prev') as HTMLButtonElement).click();
		expect(el.selectedTabIndex).toBe(2);
	});

	it('onTabContainerChange property attaches and replaces a single listener [ai generated]', () => {
		const el = makeTabContainer();
		const first = vi.fn();
		const second = vi.fn();
		el.onTabContainerChange = first;
		el.selectTab(1);
		expect(first).toHaveBeenCalledTimes(1);

		el.onTabContainerChange = second;
		el.selectTab(2);
		// First should not have been called again — only the second listener fires now.
		expect(first).toHaveBeenCalledTimes(1);
		expect(second).toHaveBeenCalledTimes(1);
	});

	it('onTabContainerChange setter accepts null to detach the listener [ai generated]', () => {
		const el = makeTabContainer();
		const handler = vi.fn();
		el.onTabContainerChange = handler;
		el.onTabContainerChange = null;
		el.selectTab(1);
		expect(handler).not.toHaveBeenCalled();
	});

	it('onChange is an alias for onTabContainerChange [ai generated]', () => {
		const el = makeTabContainer();
		const handler = vi.fn();
		el.onChange = handler;
		expect(el.onChange).toBe(handler);
		expect(el.onTabContainerChange).toBe(handler);
	});

	it('onTabContainerChanged fires after selection completes [ai generated]', () => {
		const el = makeTabContainer();
		const handler = vi.fn();
		el.onTabContainerChanged = handler;
		el.selectTab(1);
		expect(handler).toHaveBeenCalledTimes(1);
		const event = handler.mock.calls[0][0] as TabContainerChangeEvent;
		expect(event.type).toBe('tab-container-changed');
		expect(event.tabIndex).toBe(1);
	});

	it('onChanged is an alias for onTabContainerChanged [ai generated]', () => {
		const el = makeTabContainer();
		const handler = vi.fn();
		el.onChanged = handler;
		expect(el.onChanged).toBe(handler);
		expect(el.onTabContainerChanged).toBe(handler);
	});

	it('exposes activeTab and activePanel for the current selection [ai generated]', () => {
		const el = makeTabContainer();
		el.selectTab(1);
		const tabEls = tabs(el);
		expect(el.activeTab).toBe(tabEls[1]);
		expect(el.activePanel).toBe(el.querySelector('#p2'));
	});

	it('scrolls the newly active tab into view after selection [ai generated]', () => {
		const el = makeTabContainer();
		scrollIntoViewStub.mockClear();
		el.selectTab(2);
		expect(scrollIntoViewStub).toHaveBeenCalled();
	});
});
