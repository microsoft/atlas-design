import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { createLayoutState, LayoutStateInstance } from '../../src/behaviors/layout';

const STORAGE_KEY = 'atlas-layout-preferences';

/* -------------------------------------------------------------------------- */
/* Test helpers                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every `LayoutStateInstance` created in a test should be passed through
 * `track()` so `afterEach` can `stop()` it. Forgetting to stop an instance
 * would leave its MutationObserver watching `document.documentElement` and
 * leak class-change callbacks into subsequent tests.
 */
const liveInstances: LayoutStateInstance[] = [];

function track<T extends LayoutStateInstance | null>(instance: T): T {
	if (instance) {
		liveInstances.push(instance);
	}
	return instance;
}

function createFakeStorage(seed: Record<string, string> = {}) {
	const data: Record<string, string> = { ...seed };
	const storage = {
		getItem(key: string): string | null {
			return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null;
		},
		setItem(key: string, value: string): void {
			data[key] = String(value);
		}
	};
	return { storage, data };
}

function createRoot(): HTMLElement {
	const el = document.createElement('div');
	document.body.appendChild(el);
	return el;
}

/**
 * Flush microtasks and a macrotask so MutationObserver delivery,
 * `deferCallbacksUntil.then()` continuations, and any subsequent dispatches
 * have all run before we assert.
 */
async function flush(): Promise<void> {
	await Promise.resolve();
	await Promise.resolve();
	await new Promise<void>(resolve => setTimeout(resolve, 0));
}

interface DocWithViewTransition {
	startViewTransition?: (cb: () => void) => unknown;
}

/** Removes any stubbed `document.startViewTransition` so jsdom returns to
 *  its native (absent) state. Idempotent. */
function clearViewTransitionStub(): void {
	delete (document as unknown as DocWithViewTransition).startViewTransition;
}

/**
 * Removes every `layout-*` class from `<html>`. We scan by prefix rather than
 * iterating a hardcoded list so a new class introduced by a test or by
 * `initLayoutPageDemo` can't survive into the next test.
 */
function clearLayoutClassesFromDocumentElement(): void {
	const layoutClasses = Array.from(document.documentElement.classList).filter(c =>
		c.startsWith('layout-')
	);
	for (const c of layoutClasses) {
		document.documentElement.classList.remove(c);
	}
}

function resetDom(): void {
	document.body.innerHTML = '';
	clearLayoutClassesFromDocumentElement();
	document.documentElement.removeAttribute('data-layout-restored');
}

function resetStorage(): void {
	window.localStorage.clear();
}

/**
 * Stubs `document.startViewTransition` with a synchronous spy and returns a
 * handle for assertions plus a `restore()` for tests that want explicit
 * teardown. The outer `afterEach` clears the stub unconditionally as a
 * safety net even if a test throws before it gets to its `restore()`.
 */
function stubViewTransition(impl?: (cb: () => void) => void) {
	const doc = document as unknown as DocWithViewTransition;
	const original = doc.startViewTransition;
	const spy = vi.fn(impl ?? ((cb: () => void) => cb()));
	doc.startViewTransition = spy as unknown as (cb: () => void) => unknown;
	return {
		spy,
		restore() {
			if (original === undefined) {
				delete doc.startViewTransition;
			} else {
				doc.startViewTransition = original;
			}
		}
	};
}

/* -------------------------------------------------------------------------- */
/* Lifecycle                                                                  */
/*                                                                            */
/* jsdom is shared across tests in this file, so every observable side        */
/* effect (DOM, storage, view-transition stub, live observers) is reset on    */
/* both sides of each test. Anything a test forgets to clean up is still      */
/* guaranteed to be wiped before the next test runs.                          */
/* -------------------------------------------------------------------------- */

beforeAll(() => {
	resetDom();
	resetStorage();
	clearViewTransitionStub();
});

beforeEach(() => {
	resetDom();
	resetStorage();
	clearViewTransitionStub();
});

afterEach(() => {
	// Disconnect any LayoutStateInstance MutationObservers before the next
	// test starts mutating the DOM. `stop()` is idempotent.
	while (liveInstances.length) {
		try {
			liveInstances.pop()?.stop();
		} catch {
			// Best-effort: never let teardown failures mask the real assertion.
		}
	}
	resetDom();
	resetStorage();
	clearViewTransitionStub();
});

afterAll(() => {
	resetDom();
	resetStorage();
	clearViewTransitionStub();
});

describe('createLayoutState', () => {
	describe('getState / getViewState', () => {
		it('returns {} when storage is empty [ai generated]', () => {
			const { storage } = createFakeStorage();
			const state = track(createLayoutState({ storage }));
			expect(state.getState()).toEqual({});
			expect(state.getViewState()).toEqual({});
		});

		it('returns {} when storage value is malformed JSON [ai generated]', () => {
			const { storage } = createFakeStorage({ [STORAGE_KEY]: 'not-json' });
			const state = track(createLayoutState({ storage }));
			expect(state.getState()).toEqual({});
			expect(state.getViewState()).toEqual({});
		});

		it('returns parsed full state and the view-scoped slice [ai generated]', () => {
			const persisted = {
				viewA: { 'layout-twin': true },
				viewB: { 'layout-single': false }
			};
			const { storage } = createFakeStorage({
				[STORAGE_KEY]: JSON.stringify(persisted)
			});
			const state = track(createLayoutState({ storage, storageKey: 'viewA' }));
			expect(state.getState()).toEqual(persisted);
			expect(state.getViewState()).toEqual({ 'layout-twin': true });
		});

		it('returns empty view state when this storage key has no stored entry [ai generated]', () => {
			const { storage } = createFakeStorage({
				[STORAGE_KEY]: JSON.stringify({ other: { 'layout-twin': true } })
			});
			const state = track(createLayoutState({ storage, storageKey: 'mine' }));
			expect(state.getViewState()).toEqual({});
		});

		it('falls back to "default" storage key when none is provided [ai generated]', () => {
			const { storage } = createFakeStorage({
				[STORAGE_KEY]: JSON.stringify({ default: { 'layout-twin': true } })
			});
			const state = track(createLayoutState({ storage }));
			expect(state.getViewState()).toEqual({ 'layout-twin': true });
		});
	});

	describe('initial restoration', () => {
		it('adds classes whose stored value is true [ai generated]', () => {
			const root = createRoot();
			const { storage } = createFakeStorage({
				[STORAGE_KEY]: JSON.stringify({ v: { 'layout-twin': true } })
			});
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			expect(root.classList.contains('layout-twin')).toBe(true);
		});

		it('removes classes whose stored value is false [ai generated]', () => {
			const root = createRoot();
			root.classList.add('layout-holy-grail');
			const { storage } = createFakeStorage({
				[STORAGE_KEY]: JSON.stringify({ v: { 'layout-holy-grail': false } })
			});
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			expect(root.classList.contains('layout-holy-grail')).toBe(false);
		});

		it('leaves classes that are not in the stored view state untouched [ai generated]', () => {
			const root = createRoot();
			root.classList.add('layout-single', 'unrelated');
			const { storage } = createFakeStorage({
				[STORAGE_KEY]: JSON.stringify({ v: {} })
			});
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			expect(root.classList.contains('layout-single')).toBe(true);
			expect(root.classList.contains('unrelated')).toBe(true);
		});

		it('wraps restoration in startViewTransition when opted in and supported [ai generated]', () => {
			const root = createRoot();
			const { storage } = createFakeStorage({
				[STORAGE_KEY]: JSON.stringify({ v: { 'layout-twin': true } })
			});
			const vt = stubViewTransition();
			try {
				const state = track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						useViewTransitionOnRestore: true,
						deferCallbacksUntil: Promise.resolve()
					})
				);
				expect(vt.spy).toHaveBeenCalledTimes(1);
				expect(root.classList.contains('layout-twin')).toBe(true);
			} finally {
				vt.restore();
			}
		});

		it('does not call startViewTransition when not opted in [ai generated]', () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			const vt = stubViewTransition();
			try {
				const state = track(
					createLayoutState({
						root,
						storage,
						deferCallbacksUntil: Promise.resolve()
					})
				);
				expect(vt.spy).not.toHaveBeenCalled();
			} finally {
				vt.restore();
			}
		});

		it('falls back to a plain mutation when startViewTransition is unavailable [ai generated]', () => {
			const root = createRoot();
			const { storage } = createFakeStorage({
				[STORAGE_KEY]: JSON.stringify({ v: { 'layout-twin': true } })
			});
			const doc = document as unknown as DocWithViewTransition;
			const original = doc.startViewTransition;
			delete doc.startViewTransition;
			try {
				expect(() =>
					track(
						createLayoutState({
							root,
							storage,
							storageKey: 'v',
							useViewTransitionOnRestore: true,
							deferCallbacksUntil: Promise.resolve()
						})
					)
				).not.toThrow();
				expect(root.classList.contains('layout-twin')).toBe(true);
			} finally {
				if (original) {
					doc.startViewTransition = original;
				}
			}
		});

		it('defaults the root to document.documentElement [ai generated]', () => {
			const { storage } = createFakeStorage({
				[STORAGE_KEY]: JSON.stringify({ default: { 'layout-test-marker': true } })
			});
			const state = track(createLayoutState({ storage, deferCallbacksUntil: Promise.resolve() }));
			expect(document.documentElement.classList.contains('layout-test-marker')).toBe(true);
		});
	});

	describe('mutation observation', () => {
		it('persists added layout-* classes as true [ai generated]', async () => {
			const root = createRoot();
			const { storage, data } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			root.classList.add('layout-twin');
			await flush();
			expect(state.getViewState()).toEqual({ 'layout-twin': true });
			expect(JSON.parse(data[STORAGE_KEY])).toEqual({ v: { 'layout-twin': true } });
		});

		it('persists removed layout-* classes as false [ai generated]', async () => {
			const root = createRoot();
			root.classList.add('layout-twin');
			const { storage } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			root.classList.remove('layout-twin');
			await flush();
			expect(state.getViewState()).toEqual({ 'layout-twin': false });
		});

		it('ignores classes that do not start with the layout- prefix [ai generated]', async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			root.classList.add('not-a-layout-class');
			root.classList.add('theme-dark');
			await flush();
			expect(state.getViewState()).toEqual({});
		});

		it('persists multiple layout-* classes from a single attribute change [ai generated]', async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			root.className = 'layout-twin layout-menu-collapsed unrelated';
			await flush();
			expect(state.getViewState()).toEqual({
				'layout-twin': true,
				'layout-menu-collapsed': true
			});
		});

		it('preserves persisted state across multiple sequential mutations [ai generated]', async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			root.classList.add('layout-twin');
			await flush();
			root.classList.add('layout-menu-collapsed');
			await flush();
			root.classList.remove('layout-twin');
			await flush();
			expect(state.getViewState()).toEqual({
				'layout-twin': false,
				'layout-menu-collapsed': true
			});
		});

		it('keeps other views in storage intact when persisting this view [ai generated]', async () => {
			const root = createRoot();
			const { storage, data } = createFakeStorage({
				[STORAGE_KEY]: JSON.stringify({ other: { 'layout-single': true } })
			});
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'mine',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			root.classList.add('layout-twin');
			await flush();
			expect(JSON.parse(data[STORAGE_KEY])).toEqual({
				other: { 'layout-single': true },
				mine: { 'layout-twin': true }
			});
		});
	});

	describe('subscriptions', () => {
		it("fires 'added' callbacks only when the class is added [ai generated]", async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			const cb = vi.fn();
			state.subscribe('layout-twin', 'added', cb);
			root.classList.add('layout-twin');
			await flush();
			root.classList.remove('layout-twin');
			await flush();
			expect(cb).toHaveBeenCalledTimes(1);
			expect(cb).toHaveBeenCalledWith({
				className: 'layout-twin',
				isApplied: true,
				storageKey: 'v'
			});
		});

		it("fires 'removed' callbacks only when the class is removed [ai generated]", async () => {
			const root = createRoot();
			root.classList.add('layout-twin');
			const { storage } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			const cb = vi.fn();
			state.subscribe('layout-twin', 'removed', cb);
			root.classList.remove('layout-twin');
			await flush();
			root.classList.add('layout-twin');
			await flush();
			expect(cb).toHaveBeenCalledTimes(1);
			expect(cb).toHaveBeenCalledWith({
				className: 'layout-twin',
				isApplied: false,
				storageKey: 'v'
			});
		});

		it("fires 'always' callbacks on both add and remove [ai generated]", async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			const cb = vi.fn();
			state.subscribe('layout-twin', 'always', cb);
			await flush();
			// Subscribing 'always' triggers an immediate replay with the current
			// (absent) state. Clear that so we only count mutations.
			cb.mockClear();
			root.classList.add('layout-twin');
			await flush();
			root.classList.remove('layout-twin');
			await flush();
			expect(cb).toHaveBeenCalledTimes(2);
		});

		it('replays current state when subscribing after the class is already applied [ai generated]', async () => {
			const root = createRoot();
			root.classList.add('layout-twin');
			const { storage } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			await flush();
			const cb = vi.fn();
			state.subscribe('layout-twin', 'added', cb);
			await flush();
			expect(cb).toHaveBeenCalledTimes(1);
			expect(cb).toHaveBeenCalledWith({
				className: 'layout-twin',
				isApplied: true,
				storageKey: 'v'
			});
		});

		it("does not replay an 'added' subscription when the class is absent [ai generated]", async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			await flush();
			const cb = vi.fn();
			state.subscribe('layout-twin', 'added', cb);
			await flush();
			expect(cb).not.toHaveBeenCalled();
		});

		it('queues immediate replay until deferCallbacksUntil resolves on the next microtask [ai generated]', async () => {
			const root = createRoot();
			root.classList.add('layout-twin');
			const { storage } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			const cb = vi.fn();
			state.subscribe('layout-twin', 'always', cb);
			expect(cb).not.toHaveBeenCalled();
			await flush();
			expect(cb).toHaveBeenCalledWith({
				className: 'layout-twin',
				isApplied: true,
				storageKey: 'v'
			});
		});

		it('unsubscribe prevents future invocations [ai generated]', async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			const cb = vi.fn();
			const unsubscribe = state.subscribe('layout-twin', 'added', cb);
			await flush();
			expect(cb).not.toHaveBeenCalled();
			root.classList.add('layout-twin');
			await flush();
			expect(cb).toHaveBeenCalledTimes(1);
			unsubscribe();
			root.classList.remove('layout-twin');
			await flush();
			root.classList.add('layout-twin');
			await flush();
			expect(cb).toHaveBeenCalledTimes(1);
		});

		it('defers callback execution until deferCallbacksUntil resolves [ai generated]', async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			let resolveDefer: () => void = () => undefined;
			const deferPromise = new Promise<void>(resolve => {
				resolveDefer = resolve;
			});
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: deferPromise
				})
			);
			const cb = vi.fn();
			state.subscribe('layout-twin', 'always', cb);
			root.classList.add('layout-twin');
			await flush();
			expect(cb).not.toHaveBeenCalled();
			resolveDefer();
			await flush();
			expect(cb).toHaveBeenCalled();
		});

		it('wraps subscription callbacks in a view transition when opted in [ai generated]', async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			const vt = stubViewTransition();
			try {
				const state = track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						deferCallbacksUntil: Promise.resolve()
					})
				);
				const cb = vi.fn();
				state.subscribe('layout-twin', 'always', cb, { useViewTransition: true });
				root.classList.add('layout-twin');
				await flush();
				expect(vt.spy).toHaveBeenCalled();
				expect(cb).toHaveBeenCalled();
			} finally {
				vt.restore();
			}
		});

		it('does not wrap subscription callbacks in a view transition by default [ai generated]', async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			const vt = stubViewTransition();
			try {
				const state = track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						deferCallbacksUntil: Promise.resolve()
					})
				);
				const cb = vi.fn();
				state.subscribe('layout-twin', 'always', cb);
				root.classList.add('layout-twin');
				await flush();
				expect(vt.spy).not.toHaveBeenCalled();
				expect(cb).toHaveBeenCalled();
			} finally {
				vt.restore();
			}
		});

		it('fires multiple subscriptions for the same class independently [ai generated]', async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			const cbA = vi.fn();
			const cbB = vi.fn();
			state.subscribe('layout-twin', 'always', cbA);
			state.subscribe('layout-twin', 'added', cbB);
			await flush();
			cbA.mockClear();
			cbB.mockClear();
			root.classList.add('layout-twin');
			await flush();
			expect(cbA).toHaveBeenCalledTimes(1);
			expect(cbB).toHaveBeenCalledTimes(1);
		});
	});

	describe('view transition coordination', () => {
		it('coalesces same-microtask subscription callbacks into a single transition [ai generated]', async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			const vt = stubViewTransition();
			try {
				const state = track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						deferCallbacksUntil: Promise.resolve()
					})
				);
				const cbA = vi.fn();
				const cbB = vi.fn();
				const cbC = vi.fn();
				state.subscribe('layout-twin', 'always', cbA, { useViewTransition: true });
				state.subscribe('layout-twin', 'added', cbB, { useViewTransition: true });
				state.subscribe('layout-twin', 'always', cbC, { useViewTransition: true });
				await flush();
				vt.spy.mockClear();
				cbA.mockClear();
				cbB.mockClear();
				cbC.mockClear();
				root.classList.add('layout-twin');
				await flush();
				expect(vt.spy).toHaveBeenCalledTimes(1);
				expect(cbA).toHaveBeenCalledTimes(1);
				expect(cbB).toHaveBeenCalledTimes(1);
				expect(cbC).toHaveBeenCalledTimes(1);
			} finally {
				vt.restore();
			}
		});

		it('skips wrap when a transition is already animating [ai generated]', async () => {
			const root = createRoot();
			const { storage } = createFakeStorage({
				[STORAGE_KEY]: JSON.stringify({ v: { 'layout-twin': true } })
			});
			const doc = document as unknown as DocWithViewTransition;
			const original = doc.startViewTransition;
			let resolveFinished: () => void = () => undefined;
			const finishedPromise = new Promise<void>(resolve => {
				resolveFinished = resolve;
			});
			const spy = vi.fn((cb: () => void) => {
				cb();
				return { finished: finishedPromise };
			});
			doc.startViewTransition = spy as unknown as (cb: () => void) => unknown;
			try {
				const state = track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						useViewTransitionOnRestore: true,
						deferCallbacksUntil: Promise.resolve()
					})
				);
				expect(spy).toHaveBeenCalledTimes(1);
				const cb = vi.fn();
				state.subscribe('layout-twin', 'always', cb, { useViewTransition: true });
				await flush();
				// Replay fired while restoration's .finished is still pending —
				// must not start a second transition (would abort the first).
				expect(spy).toHaveBeenCalledTimes(1);
				expect(cb).toHaveBeenCalled();
				resolveFinished();
				await finishedPromise;
				await flush();
				cb.mockClear();
				root.classList.remove('layout-twin');
				await flush();
				expect(spy).toHaveBeenCalledTimes(2);
				expect(cb).toHaveBeenCalledTimes(1);
			} finally {
				if (original === undefined) {
					delete doc.startViewTransition;
				} else {
					doc.startViewTransition = original;
				}
			}
		});

		it('starts a fresh transition after the previous one settles [ai generated]', async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			const vt = stubViewTransition();
			try {
				const state = track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						deferCallbacksUntil: Promise.resolve()
					})
				);
				const cb = vi.fn();
				state.subscribe('layout-twin', 'always', cb, { useViewTransition: true });
				await flush();
				vt.spy.mockClear();
				cb.mockClear();
				root.classList.add('layout-twin');
				await flush();
				expect(vt.spy).toHaveBeenCalledTimes(1);
				root.classList.remove('layout-twin');
				await flush();
				expect(vt.spy).toHaveBeenCalledTimes(2);
				expect(cb).toHaveBeenCalledTimes(2);
			} finally {
				vt.restore();
			}
		});

		it('continues firing remaining batched callbacks when one throws [ai generated]', async () => {
			const errSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
			const root = createRoot();
			const { storage } = createFakeStorage();
			const vt = stubViewTransition();
			try {
				const state = track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						deferCallbacksUntil: Promise.resolve()
					})
				);
				const cbA = vi.fn(() => {
					throw new Error('boom');
				});
				const cbB = vi.fn();
				state.subscribe('layout-twin', 'always', cbA, { useViewTransition: true });
				state.subscribe('layout-twin', 'always', cbB, { useViewTransition: true });
				await flush();
				vt.spy.mockClear();
				cbA.mockClear();
				cbB.mockClear();
				errSpy.mockClear();
				root.classList.add('layout-twin');
				await flush();
				expect(vt.spy).toHaveBeenCalledTimes(1);
				expect(cbA).toHaveBeenCalledTimes(1);
				expect(cbB).toHaveBeenCalledTimes(1);
				expect(errSpy).toHaveBeenCalled();
			} finally {
				vt.restore();
				errSpy.mockRestore();
			}
		});
	});

	describe('stop()', () => {
		it('stops processing further mutations [ai generated]', async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			const cb = vi.fn();
			// 'added' avoids the immediate replay (class is absent).
			state.subscribe('layout-twin', 'added', cb);
			await flush();
			state.stop();
			root.classList.add('layout-twin');
			await flush();
			expect(cb).not.toHaveBeenCalled();
			expect(state.getViewState()).toEqual({});
		});

		it('is safe to call multiple times [ai generated]', () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					deferCallbacksUntil: Promise.resolve()
				})
			);
			expect(() => {
				state.stop();
				state.stop();
			}).not.toThrow();
		});
	});

	describe('data-layout-restored sentinel', () => {
		it('is absent on the root before deferCallbacksUntil resolves [ai generated]', () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			let resolveDefer: () => void = () => undefined;
			const deferPromise = new Promise<void>(resolve => {
				resolveDefer = resolve;
			});
			track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: deferPromise
				})
			);
			expect(root.hasAttribute('data-layout-restored')).toBe(false);
			// Settle the promise so the outer teardown can run cleanly.
			resolveDefer();
		});

		it('is set to "true" on the root after deferCallbacksUntil resolves [ai generated]', async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			await flush();
			expect(root.getAttribute('data-layout-restored')).toBe('true');
		});

		it('is not persisted to storage [ai generated]', async () => {
			const root = createRoot();
			const { storage, data } = createFakeStorage();
			track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			await flush();
			// Attribute change is not a class change, so storage is untouched.
			expect(data[STORAGE_KEY]).toBeUndefined();
		});

		it('does not appear as a layout-* class on the root [ai generated]', async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			await flush();
			const layoutClasses = Array.from(root.classList).filter(c => c.startsWith('layout-'));
			expect(layoutClasses).toEqual([]);
		});

		it('fires queued subscriber callbacks before setting the attribute [ai generated]', async () => {
			const root = createRoot();
			root.classList.add('layout-twin');
			const { storage } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'v',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			let attributeWhenCbRan: string | null = 'sentinel-not-checked';
			state.subscribe('layout-twin', 'always', () => {
				attributeWhenCbRan = root.getAttribute('data-layout-restored');
			});
			await flush();
			expect(attributeWhenCbRan).toBeNull();
			expect(root.getAttribute('data-layout-restored')).toBe('true');
		});
	});

	describe('failure fallback', () => {
		it('sets the sentinel and re-throws when synchronous setup fails [ai generated]', () => {
			const root = createRoot();
			const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			const throwingStorage = {
				getItem(): string | null {
					throw new Error('storage exploded');
				},
				setItem(): void {
					/* no-op */
				}
			};
			try {
				expect(() =>
					createLayoutState({
						root,
						storage: throwingStorage,
						storageKey: 'v',
						deferCallbacksUntil: Promise.resolve()
					})
				).toThrow('storage exploded');
				expect(root.getAttribute('data-layout-restored')).toBe('true');
				expect(errorSpy).toHaveBeenCalled();
			} finally {
				errorSpy.mockRestore();
			}
		});

		it('sets the sentinel and keeps draining when a queued subscriber throws [ai generated]', async () => {
			const root = createRoot();
			root.classList.add('layout-twin');
			const { storage } = createFakeStorage();
			const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			try {
				const state = track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						deferCallbacksUntil: Promise.resolve()
					})
				);
				const goodCb = vi.fn();
				state.subscribe('layout-twin', 'always', () => {
					throw new Error('subscriber exploded');
				});
				state.subscribe('layout-twin', 'always', goodCb);
				await flush();
				expect(goodCb).toHaveBeenCalledTimes(1);
				expect(root.getAttribute('data-layout-restored')).toBe('true');
				expect(errorSpy).toHaveBeenCalled();
			} finally {
				errorSpy.mockRestore();
			}
		});

		it('sets the sentinel and flushes callbacks when deferCallbacksUntil rejects [ai generated]', async () => {
			const root = createRoot();
			root.classList.add('layout-twin');
			const { storage } = createFakeStorage();
			const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			try {
				const state = track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						deferCallbacksUntil: Promise.reject(new Error('defer rejected'))
					})
				);
				const cb = vi.fn();
				state.subscribe('layout-twin', 'always', cb);
				await flush();
				expect(cb).toHaveBeenCalledTimes(1);
				expect(root.getAttribute('data-layout-restored')).toBe('true');
				expect(errorSpy).toHaveBeenCalled();
			} finally {
				errorSpy.mockRestore();
			}
		});
	});

	describe('storageKey accessor', () => {
		it('accepts a function that returns the storage key [ai generated]', () => {
			const { storage } = createFakeStorage({
				[STORAGE_KEY]: JSON.stringify({
					alpha: { 'layout-twin': true },
					beta: { 'layout-single': true }
				})
			});
			const state = track(createLayoutState({ storage, storageKey: () => 'alpha' }));
			expect(state.getViewState()).toEqual({ 'layout-twin': true });
		});

		it('calls the function each time the storage key is needed [ai generated]', async () => {
			const root = createRoot();
			const { storage, data } = createFakeStorage();
			let currentKey = 'alpha';
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: () => currentKey,
					deferCallbacksUntil: Promise.resolve()
				})
			);

			root.classList.add('layout-twin');
			await flush();
			expect(state.getViewState()).toEqual({ 'layout-twin': true });

			currentKey = 'beta';
			root.classList.add('layout-single');
			await flush();

			expect(JSON.parse(data[STORAGE_KEY])).toEqual({
				alpha: { 'layout-twin': true },
				beta: { 'layout-single': true }
			});
			expect(state.getViewState()).toEqual({ 'layout-single': true });
		});

		it('passes the resolved storageKey at fire time to subscriber events [ai generated]', async () => {
			const root = createRoot();
			const { storage } = createFakeStorage();
			let currentKey = 'alpha';
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: () => currentKey,
					deferCallbacksUntil: Promise.resolve()
				})
			);
			const cb = vi.fn();
			state.subscribe('layout-twin', 'added', cb);

			root.classList.add('layout-twin');
			await flush();
			expect(cb).toHaveBeenLastCalledWith({
				className: 'layout-twin',
				isApplied: true,
				storageKey: 'alpha'
			});

			currentKey = 'beta';
			root.classList.remove('layout-twin');
			state.subscribe('layout-twin', 'removed', cb);
			root.classList.add('layout-twin');
			root.classList.remove('layout-twin');
			await flush();
			expect(cb).toHaveBeenLastCalledWith({
				className: 'layout-twin',
				isApplied: false,
				storageKey: 'beta'
			});
		});

		it('coerces unsafe keys returned by the function to "default" [ai generated]', async () => {
			const root = createRoot();
			const { storage, data } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: () => '__proto__',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			root.classList.add('layout-twin');
			await flush();
			expect(state.getViewState()).toEqual({ 'layout-twin': true });
			expect(JSON.parse(data[STORAGE_KEY])).toEqual({
				default: { 'layout-twin': true }
			});
		});

		it('coerces unsafe static storageKey strings to "default" [ai generated]', async () => {
			const root = createRoot();
			const { storage, data } = createFakeStorage();
			const state = track(
				createLayoutState({
					root,
					storage,
					storageKey: 'prototype',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			root.classList.add('layout-twin');
			await flush();
			expect(state.getViewState()).toEqual({ 'layout-twin': true });
			expect(JSON.parse(data[STORAGE_KEY])).toEqual({
				default: { 'layout-twin': true }
			});
		});

		it('lets two instances with the same storageKey share persisted state [ai generated]', async () => {
			const rootA = createRoot();
			const rootB = createRoot();
			const { storage, data } = createFakeStorage();

			const instanceA = track(
				createLayoutState({
					root: rootA,
					storage,
					storageKey: 'docs-shared',
					deferCallbacksUntil: Promise.resolve()
				})
			);
			rootA.classList.add('layout-menu-collapsed');
			await flush();

			expect(JSON.parse(data[STORAGE_KEY])).toEqual({
				'docs-shared': { 'layout-menu-collapsed': true }
			});

			const instanceB = track(
				createLayoutState({
					root: rootB,
					storage,
					storageKey: 'docs-shared',
					deferCallbacksUntil: Promise.resolve()
				})
			);

			expect(rootB.classList.contains('layout-menu-collapsed')).toBe(true);
			expect(instanceA.getViewState()).toEqual({ 'layout-menu-collapsed': true });
			expect(instanceB.getViewState()).toEqual({ 'layout-menu-collapsed': true });
		});
	});

	describe('exclusions', () => {
		const EXCLUSIONS_KEY = 'atlas-layout-exclusions';

		describe('restore', () => {
			it('skips classes listed for this scope during initial restore', () => {
				const root = createRoot();
				const { storage } = createFakeStorage({
					[STORAGE_KEY]: JSON.stringify({
						v: { 'layout-twin': true, 'layout-menu-collapsed': true }
					}),
					[EXCLUSIONS_KEY]: JSON.stringify({
						'view-e': { 'layout-menu-collapsed': true }
					})
				});
				track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						excludesScope: 'view-e'
					})
				);
				expect(root.classList.contains('layout-twin')).toBe(true);
				expect(root.classList.contains('layout-menu-collapsed')).toBe(false);
			});

			it('applies all persisted classes when no excludesScope is set', () => {
				const root = createRoot();
				const { storage } = createFakeStorage({
					[STORAGE_KEY]: JSON.stringify({
						v: { 'layout-twin': true, 'layout-menu-collapsed': true }
					}),
					[EXCLUSIONS_KEY]: JSON.stringify({
						'some-other-scope': { 'layout-menu-collapsed': true }
					})
				});
				track(createLayoutState({ root, storage, storageKey: 'v' }));
				expect(root.classList.contains('layout-twin')).toBe(true);
				expect(root.classList.contains('layout-menu-collapsed')).toBe(true);
			});

			it('ignores exclusions stored under unrelated scopes', () => {
				const root = createRoot();
				const { storage } = createFakeStorage({
					[STORAGE_KEY]: JSON.stringify({
						v: { 'layout-menu-collapsed': true }
					}),
					[EXCLUSIONS_KEY]: JSON.stringify({
						'view-f': { 'layout-menu-collapsed': true }
					})
				});
				track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						excludesScope: 'view-e'
					})
				);
				expect(root.classList.contains('layout-menu-collapsed')).toBe(true);
			});

			it('treats unparseable exclusions JSON as no rules', () => {
				const root = createRoot();
				const { storage } = createFakeStorage({
					[STORAGE_KEY]: JSON.stringify({ v: { 'layout-twin': true } }),
					[EXCLUSIONS_KEY]: 'not-json-{'
				});
				track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						excludesScope: 'view-e'
					})
				);
				expect(root.classList.contains('layout-twin')).toBe(true);
			});
		});

		describe('persist', () => {
			it('does not write blocked classes to primary storage when added', async () => {
				const root = createRoot();
				const { storage, data } = createFakeStorage({
					[EXCLUSIONS_KEY]: JSON.stringify({
						'view-e': { 'layout-menu-collapsed': true }
					})
				});
				track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						excludesScope: 'view-e',
						deferCallbacksUntil: Promise.resolve()
					})
				);
				root.classList.add('layout-twin');
				root.classList.add('layout-menu-collapsed');
				await flush();
				expect(JSON.parse(data[STORAGE_KEY])).toEqual({
					v: { 'layout-twin': true }
				});
			});

			it('does not write blocked classes to primary storage when removed', async () => {
				const root = createRoot();
				root.classList.add('layout-menu-collapsed');
				const { storage, data } = createFakeStorage({
					[EXCLUSIONS_KEY]: JSON.stringify({
						'view-e': { 'layout-menu-collapsed': true }
					})
				});
				track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						excludesScope: 'view-e',
						deferCallbacksUntil: Promise.resolve()
					})
				);
				root.classList.add('layout-twin');
				root.classList.remove('layout-menu-collapsed');
				await flush();
				expect(JSON.parse(data[STORAGE_KEY])).toEqual({
					v: { 'layout-twin': true }
				});
			});

			it('re-reads exclusions on every persist so storage updates between mutations are honored', async () => {
				const root = createRoot();
				const { storage, data } = createFakeStorage();
				track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						excludesScope: 'view-e',
						deferCallbacksUntil: Promise.resolve()
					})
				);
				root.classList.add('layout-menu-collapsed');
				await flush();
				expect(JSON.parse(data[STORAGE_KEY])).toEqual({
					v: { 'layout-menu-collapsed': true }
				});

				// External writer (e.g. an SPA router) adds an exclusion mid-life.
				storage.setItem(EXCLUSIONS_KEY, JSON.stringify({ 'view-e': { 'layout-twin': true } }));
				root.classList.add('layout-twin');
				await flush();
				expect(JSON.parse(data[STORAGE_KEY])).toEqual({
					v: { 'layout-menu-collapsed': true }
				});
			});
		});

		describe('storage seeding from excludes option', () => {
			it('writes the configured list to the exclusions entry on init', () => {
				const { storage, data } = createFakeStorage();
				track(
					createLayoutState({
						root: createRoot(),
						storage,
						excludesScope: 'view-e',
						excludes: ['layout-menu-collapsed', 'layout-aside-collapsed']
					})
				);
				expect(JSON.parse(data[EXCLUSIONS_KEY])).toEqual({
					'view-e': {
						'layout-menu-collapsed': true,
						'layout-aside-collapsed': true
					}
				});
			});

			it('overwrites prior rules for the same scope (replace, not merge)', () => {
				const { storage, data } = createFakeStorage({
					[EXCLUSIONS_KEY]: JSON.stringify({
						'view-e': {
							'layout-twin': true,
							'layout-aside-collapsed': true
						}
					})
				});
				track(
					createLayoutState({
						root: createRoot(),
						storage,
						excludesScope: 'view-e',
						excludes: ['layout-menu-collapsed']
					})
				);
				expect(JSON.parse(data[EXCLUSIONS_KEY])).toEqual({
					'view-e': { 'layout-menu-collapsed': true }
				});
			});

			it('leaves other scopes intact when seeding this scope', () => {
				const { storage, data } = createFakeStorage({
					[EXCLUSIONS_KEY]: JSON.stringify({
						'view-f': { 'layout-flyout-active': true }
					})
				});
				track(
					createLayoutState({
						root: createRoot(),
						storage,
						excludesScope: 'view-e',
						excludes: ['layout-menu-collapsed']
					})
				);
				expect(JSON.parse(data[EXCLUSIONS_KEY])).toEqual({
					'view-f': { 'layout-flyout-active': true },
					'view-e': { 'layout-menu-collapsed': true }
				});
			});

			it('clears the scope when excludes is an empty array', () => {
				const { storage, data } = createFakeStorage({
					[EXCLUSIONS_KEY]: JSON.stringify({
						'view-e': { 'layout-menu-collapsed': true }
					})
				});
				track(
					createLayoutState({
						root: createRoot(),
						storage,
						excludesScope: 'view-e',
						excludes: []
					})
				);
				expect(JSON.parse(data[EXCLUSIONS_KEY])).toEqual({ 'view-e': {} });
			});

			it('does not touch the exclusions entry when excludes is omitted', () => {
				const { storage, data } = createFakeStorage({
					[EXCLUSIONS_KEY]: JSON.stringify({
						'view-e': { 'layout-menu-collapsed': true }
					})
				});
				track(
					createLayoutState({
						root: createRoot(),
						storage,
						excludesScope: 'view-e'
					})
				);
				expect(JSON.parse(data[EXCLUSIONS_KEY])).toEqual({
					'view-e': { 'layout-menu-collapsed': true }
				});
			});

			it('does not write to the exclusions entry when excludesScope is omitted', () => {
				const { storage, data } = createFakeStorage();
				track(
					createLayoutState({
						root: createRoot(),
						storage,
						excludes: ['layout-menu-collapsed']
					})
				);
				expect(data[EXCLUSIONS_KEY]).toBeUndefined();
			});

			it('recovers from malformed prior exclusions JSON by writing a fresh entry', () => {
				const { storage, data } = createFakeStorage({
					[EXCLUSIONS_KEY]: 'not-json-{'
				});
				track(
					createLayoutState({
						root: createRoot(),
						storage,
						excludesScope: 'view-e',
						excludes: ['layout-menu-collapsed']
					})
				);
				expect(JSON.parse(data[EXCLUSIONS_KEY])).toEqual({
					'view-e': { 'layout-menu-collapsed': true }
				});
			});
		});

		describe('excludesScope option', () => {
			it('accepts a function that returns the scope', () => {
				const root = createRoot();
				const { storage } = createFakeStorage({
					[STORAGE_KEY]: JSON.stringify({ v: { 'layout-menu-collapsed': true } }),
					[EXCLUSIONS_KEY]: JSON.stringify({
						'view-e': { 'layout-menu-collapsed': true }
					})
				});
				track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						excludesScope: () => 'view-e'
					})
				);
				expect(root.classList.contains('layout-menu-collapsed')).toBe(false);
			});

			it('calls the function each time the scope is needed', async () => {
				const root = createRoot();
				const { storage } = createFakeStorage({
					[EXCLUSIONS_KEY]: JSON.stringify({
						'view-e': { 'layout-menu-collapsed': true },
						'view-f': { 'layout-twin': true }
					})
				});
				let currentScope = 'view-e';
				track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						excludesScope: () => currentScope,
						deferCallbacksUntil: Promise.resolve()
					})
				);

				// Under view-e: 'layout-menu-collapsed' is blocked, 'layout-twin'
				// is allowed.
				root.classList.add('layout-twin');
				root.classList.add('layout-menu-collapsed');
				await flush();
				expect(JSON.parse(storage.getItem(STORAGE_KEY) || '{}')).toEqual({
					v: { 'layout-twin': true }
				});

				// Switch to view-f: 'layout-twin' is now blocked, 'layout-aside-collapsed'
				// is allowed. The getter must be re-evaluated so the new scope's
				// rules apply to subsequent persists.
				currentScope = 'view-f';
				root.classList.add('layout-aside-collapsed');
				root.classList.remove('layout-twin');
				await flush();
				expect(JSON.parse(storage.getItem(STORAGE_KEY) || '{}')).toEqual({
					// layout-twin stays true: its removal was blocked by view-f.
					v: { 'layout-twin': true, 'layout-aside-collapsed': true }
				});
			});

			it('coerces unsafe static scope strings to "default"', () => {
				const { storage, data } = createFakeStorage();
				track(
					createLayoutState({
						root: createRoot(),
						storage,
						excludesScope: '__proto__',
						excludes: ['layout-menu-collapsed']
					})
				);
				expect(JSON.parse(data[EXCLUSIONS_KEY])).toEqual({
					default: { 'layout-menu-collapsed': true }
				});
			});

			it('coerces unsafe scope strings returned by the function to "default"', () => {
				const { storage, data } = createFakeStorage();
				track(
					createLayoutState({
						root: createRoot(),
						storage,
						excludesScope: () => 'prototype',
						excludes: ['layout-menu-collapsed']
					})
				);
				expect(JSON.parse(data[EXCLUSIONS_KEY])).toEqual({
					default: { 'layout-menu-collapsed': true }
				});
			});

			it('uses own-property lookups so __proto__-keyed entries cannot poison the blocklist', () => {
				const root = createRoot();
				const poisoned =
					'{"v":{"layout-menu-collapsed":true},"__proto__":{"layout-menu-collapsed":true}}';
				const { storage } = createFakeStorage({
					[STORAGE_KEY]: JSON.stringify({ v: { 'layout-menu-collapsed': true } }),
					[EXCLUSIONS_KEY]: poisoned
				});
				track(
					createLayoutState({
						root,
						storage,
						storageKey: 'v',
						excludesScope: 'view-e'
					})
				);
				// 'view-e' has no rules in storage, so the class should restore.
				expect(root.classList.contains('layout-menu-collapsed')).toBe(true);
			});
		});

		describe('shared storageKey, different excludesScope', () => {
			it('lets two views share persisted state while honoring distinct exclusion scopes', async () => {
				const rootE = createRoot();
				const rootF = createRoot();
				const { storage, data } = createFakeStorage();

				// View E owns flyout state, blocks menu/aside.
				const viewE = track(
					createLayoutState({
						root: rootE,
						storage,
						storageKey: 'main-app',
						excludesScope: 'view-e',
						excludes: ['layout-menu-collapsed', 'layout-aside-collapsed'],
						deferCallbacksUntil: Promise.resolve()
					})
				);
				// View F owns menu state, blocks flyout.
				const viewF = track(
					createLayoutState({
						root: rootF,
						storage,
						storageKey: 'main-app',
						excludesScope: 'view-f',
						excludes: ['layout-flyout-active'],
						deferCallbacksUntil: Promise.resolve()
					})
				);

				// View E toggles its concern; View F toggles its concern.
				rootE.classList.add('layout-flyout-active');
				rootF.classList.add('layout-menu-collapsed');
				// Each view also attempts to toggle a class the OTHER owns — these
				// must be filtered out on persist so views can't write through each
				// other's exclusions.
				rootE.classList.add('layout-menu-collapsed');
				rootF.classList.add('layout-flyout-active');
				await flush();

				expect(JSON.parse(data[STORAGE_KEY])).toEqual({
					'main-app': {
						'layout-flyout-active': true,
						'layout-menu-collapsed': true
					}
				});
				expect(JSON.parse(data[EXCLUSIONS_KEY])).toEqual({
					'view-e': {
						'layout-menu-collapsed': true,
						'layout-aside-collapsed': true
					},
					'view-f': { 'layout-flyout-active': true }
				});
				void viewE;
				void viewF;
			});
		});
	});
});
