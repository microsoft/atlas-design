const root = document.documentElement;

const setLayoutCssVariables = () => {
	const header = document.querySelector('.layout-body-header');
	const headerHeight = header?.clientHeight || 0;
	const headerCssProp = headerHeight ? `${headerHeight}px` : '0px';
	const headerY = header?.getBoundingClientRect().y || 0; // determine if header is visible, assign visible heights as well
	const visibleHeaderHeight = Math.max(0, headerY + headerHeight);
	const visibleHeaderCssProp = `${visibleHeaderHeight}px`;

	const footer = document.querySelector('.layout-body-footer');
	const footerHeight = footer?.clientHeight || 0;
	const footerCssProp = footerHeight ? `${footerHeight}px` : '0px';
	const footerY = footer?.getBoundingClientRect().y || 0; // determine if header and footer are visible, assign visible heights as well

	const visibleFooterHeight =
		footerY < window.innerHeight ? Math.min(window.innerHeight - footerY, footerHeight) : 0;
	const visibleFooterCssProp = `${visibleFooterHeight}px`;

	root.style.setProperty('--window-inner-height', `${window.innerHeight}px`, 'important');
	root.style.setProperty('--atlas-header-height', headerCssProp, 'important');
	root.style.setProperty('--atlas-footer-height', footerCssProp, 'important');
	root.style.setProperty('--atlas-header-visible-height', visibleHeaderCssProp, 'important');
	root.style.setProperty('--atlas-footer-visible-height', visibleFooterCssProp, 'important');
};

let animationFrame = 0;

function scheduleUpdate(update: typeof setLayoutCssVariables) {
	cancelAnimationFrame(animationFrame);
	animationFrame = requestAnimationFrame(update);
}

export const dispatchAtlasLayoutUpdateEvent = () => {
	window.dispatchEvent(new CustomEvent('atlas-layout-change-event'));
};

export function initLayout() {
	window.addEventListener('atlas-layout-change-event', () => {
		scheduleUpdate(setLayoutCssVariables);
	});

	window.addEventListener('resize', dispatchAtlasLayoutUpdateEvent, { passive: true });

	root.style.setProperty('--window-inner-height', `${window.innerHeight}px`);

	window.addEventListener('DOMContentLoaded', dispatchAtlasLayoutUpdateEvent);

	// determine if header/footer are visible below the top of the viewport - remove with atlas-js 1.13.1
	window.addEventListener('scroll', dispatchAtlasLayoutUpdateEvent, {
		passive: true
	});
}

/* -------------------------------------------------------------------------- */
/* Layout state                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Observes `layout-*` class changes on a root element (default: `<html>`) and
 * persists them via a Storage backend, bucketed per `storageKey` (defaults
 * to `'default'`). Consumers `subscribe()` to specific class transitions; a
 * new subscription replays immediately if the current state already matches.
 *
 * `storageKey` identifies the bucket under the shared `atlas-layout-preferences`
 * storage entry and is surfaced in `LayoutCallbackEvent`s. Distinct pages
 * with different keys read and write separate buckets; pages that should
 * share persisted state simply pass the same `storageKey`.
 *
 * Restoration and the `MutationObserver` are wired synchronously inside the
 * factory — by return time the instance is live. Subscriber callbacks are
 * queued until `deferCallbacksUntil` resolves (default: a resolved promise,
 * so they fire on the next microtask) so they can safely touch the DOM.
 *
 * After the initial flush, sets `data-layout-restored="true"` on the root.
 * The attribute is set even if setup throws, `deferCallbacksUntil` rejects,
 * or a queued subscriber throws — CSS rules gated on it (e.g.
 * `display-*-until-layout-restored`) won't permanently hide content. Setup
 * errors are re-thrown.
 *
 * View-transition coordination: requests to wrap restoration or a
 * subscriber callback in `document.startViewTransition` are coordinated per
 * instance to avoid `InvalidStateError` aborts. Subscriber callbacks queued
 * in the same microtask coalesce into a single transition; any request made
 * while a transition is already animating runs synchronously instead of
 * starting (and aborting) another one.
 */

export type LayoutClassWhen = 'added' | 'removed' | 'always';

export interface LayoutCallbackEvent {
	className: string;
	isApplied: boolean;
	storageKey: string;
}

export type LayoutCallback = (event: LayoutCallbackEvent) => void;

export interface LayoutStateView {
	[className: string]: boolean;
}

export interface LayoutStatePersisted {
	[storageKey: string]: LayoutStateView;
}

export interface LayoutStateOptions {
	/** Element whose classList is observed and toggled. Defaults to `<html>`. */
	root?: HTMLElement;
	/** Storage backend matching `getItem`/`setItem`. Defaults to `localStorage`. */
	storage?: Pick<Storage, 'getItem' | 'setItem'>;
	/**
	 * Bucket key under the `atlas-layout-preferences` storage entry, and the
	 * identifier surfaced in `LayoutCallbackEvent.storageKey`. Pages with
	 * different `storageKey`s persist independently; pages that should share
	 * persisted state — e.g. a "docs article" and "docs landing" template
	 * both restoring the same sidebar-collapsed preference — pass the same
	 * `storageKey`. May be a static string or a getter called every time the
	 * key is needed, letting a single instance follow a dynamically changing
	 * key without being recreated. Defaults to `'default'`.
	 */
	storageKey?: string | (() => string);
	/**
	 * Per-instance allowlist of `layout-*` classes this view participates in.
	 * When set, restoration only applies listed classes from the bucket,
	 * MutationObserver only persists changes to listed classes, and observed
	 * mutations of other `layout-*` classes are ignored entirely. Lets views
	 * that share a `storageKey` opt out of the slices of state that don't
	 * apply to them — e.g. a flyout-only view in a group that also persists
	 * menu collapse listens to and writes back only `layout-flyout-active`.
	 * When omitted (the default), every observed `layout-*` class is in
	 * scope, matching the original single-bucket behavior.
	 */
	classes?: string[];
	/**
	 * Subscriber callbacks are queued until this resolves. Defaults to a
	 * resolved promise (fires on next microtask). Pass `contentLoaded` to
	 * wait for `DOMContentLoaded`.
	 */
	deferCallbacksUntil?: Promise<unknown>;
	/** Wrap initial restoration in `document.startViewTransition` if available. */
	useViewTransitionOnRestore?: boolean;
}

export interface LayoutSubscribeOptions {
	/**
	 * Wrap this callback's invocation in `document.startViewTransition` if
	 * available. Multiple subscriptions firing in the same microtask coalesce
	 * into a single transition, and the wrap is skipped (callback runs
	 * synchronously) when another transition is already animating, so
	 * subscribers can opt in without worrying about aborting each other.
	 */
	useViewTransition?: boolean;
}

export interface LayoutStateInstance {
	/**
	 * Register a callback for transitions of `className`. Fires immediately
	 * if the current state already matches (queued behind
	 * `deferCallbacksUntil`). Returns an unsubscribe function.
	 */
	subscribe(
		className: string,
		when: LayoutClassWhen,
		callback: LayoutCallback,
		options?: LayoutSubscribeOptions
	): () => void;
	/** Persisted layout state for this instance's `storageKey` bucket. */
	getViewState(): LayoutStateView;
	/** Persisted state across all `storageKey` buckets. */
	getState(): LayoutStatePersisted;
	/** Stop observing. Subscriptions remain registered. */
	stop(): void;
}

export interface LayoutSubscription {
	className: string;
	when: LayoutClassWhen;
	callback: LayoutCallback;
	useViewTransition: boolean;
}

type DocumentWithViewTransition = Document & {
	startViewTransition?: (updateCallback: () => void) => unknown;
};

export function createLayoutState(options: LayoutStateOptions = {}): LayoutStateInstance {
	const {
		root: targetRoot = document.documentElement,
		storage = window.localStorage,
		storageKey: storageKeyOption = 'default',
		classes: classesOption,
		deferCallbacksUntil = Promise.resolve(),
		useViewTransitionOnRestore = false
	} = options;

	const CLASS_PREFIX = 'layout-';
	const STORAGE_KEY = 'atlas-layout-preferences';
	const RESTORED_ATTRIBUTE = 'data-layout-restored';

	// Allowlist of classes this view participates in. `null` means
	// "everything with the layout- prefix" (original behavior).
	const allowedClasses: Set<string> | null = classesOption ? new Set(classesOption) : null;

	function isInScope(className: string): boolean {
		return allowedClasses ? allowedClasses.has(className) : true;
	}

	// Coerce unsafe object keys to 'default' so prototype-key writes can't
	// corrupt the persisted state map.
	function sanitizeKey(raw: string): string {
		return raw === '__proto__' || raw === 'prototype' || raw === 'constructor' ? 'default' : raw;
	}

	// Resolve the storage bucket on demand so consumers can pass a getter
	// and have each persistence / dispatch call see the current value.
	function getStorageKey(): string {
		const raw = typeof storageKeyOption === 'function' ? storageKeyOption() : storageKeyOption;
		return sanitizeKey(raw);
	}

	const subscriptions = new Set<LayoutSubscription>();
	let observer: MutationObserver | null = null;
	let callbacksReady = false;
	const pendingCallbacks: (() => void)[] = [];

	// View-transition coordination (per instance). `activeTransitionCount`
	// gates new transitions so callbacks fired while one is animating run
	// synchronously instead of aborting it with InvalidStateError.
	// `pendingTransitionFns` lets subscriber callbacks queued in the same
	// microtask coalesce into a single transition.
	let activeTransitionCount = 0;
	const pendingTransitionFns: (() => void)[] = [];
	let transitionMicrotaskQueued = false;

	function dispatch(invoke: () => void): void {
		if (callbacksReady) {
			invoke();
		} else {
			pendingCallbacks.push(invoke);
		}
	}

	// Sentinel attribute (not a class, to stay out of the layout-* persistence path).
	function markRestored(): void {
		targetRoot.setAttribute(RESTORED_ATTRIBUTE, 'true');
	}

	function flushPendingCallbacks(): void {
		callbacksReady = true;
		const queued = pendingCallbacks.splice(0);
		try {
			for (const invoke of queued) {
				try {
					invoke();
				} catch (err) {
					// Isolate one bad subscriber; keep draining.
					// eslint-disable-next-line no-console
					console.error('createLayoutState: a subscriber callback threw during initial flush', err);
				}
			}
		} finally {
			markRestored();
		}
	}

	function startOptionalViewTransition(
		useViewTransition: boolean,
		fn: () => void,
		viewTransitionOptions: { sync?: boolean } = {}
	): void {
		if (!useViewTransition) {
			fn();
			return;
		}
		if (viewTransitionOptions.sync) {
			startSyncViewTransition(fn);
		} else {
			startBatchedViewTransition(fn);
		}
	}

	function startSyncViewTransition(fn: () => void): void {
		const docWithVT = document as DocumentWithViewTransition;
		if (typeof docWithVT.startViewTransition !== 'function') {
			fn();
			return;
		}
		// A transition is already animating — starting another now would abort
		// it with InvalidStateError. Apply the change without a transition.
		if (activeTransitionCount > 0) {
			fn();
			return;
		}
		startTrackedViewTransition(docWithVT, fn);
	}

	function startBatchedViewTransition(fn: () => void): void {
		const docWithVT = document as DocumentWithViewTransition;
		if (typeof docWithVT.startViewTransition !== 'function' || activeTransitionCount > 0) {
			fn();
			return;
		}
		pendingTransitionFns.push(fn);
		if (transitionMicrotaskQueued) {
			return;
		}
		transitionMicrotaskQueued = true;
		queueMicrotask(() => {
			transitionMicrotaskQueued = false;
			const batch = pendingTransitionFns.splice(0);
			if (batch.length === 0) {
				return;
			}
			// Something else (e.g. a sync restore in another instance) started
			// a transition between scheduling and now. Apply the batched
			// changes without a transition so we don't abort it.
			if (activeTransitionCount > 0) {
				invokeTransitionCallbacks(batch);
				return;
			}
			startTrackedViewTransition(docWithVT, () => {
				invokeTransitionCallbacks(batch);
			});
		});
	}

	function startTrackedViewTransition(docWithVT: DocumentWithViewTransition, fn: () => void): void {
		let transition: { finished?: Promise<unknown> } | undefined;
		try {
			transition = docWithVT.startViewTransition!(fn) as unknown as {
				finished?: Promise<unknown>;
			};
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error('createLayoutState: startViewTransition threw', err);
			fn();
			return;
		}
		activeTransitionCount++;
		const settle = (): void => {
			activeTransitionCount = Math.max(0, activeTransitionCount - 1);
		};
		const finished = transition?.finished;
		if (finished && typeof finished.then === 'function') {
			finished.then(settle, settle);
		} else {
			// No .finished (e.g. a test stub). Treat the transition as
			// complete immediately so subsequent calls can either batch or
			// start a fresh transition cleanly.
			settle();
		}
	}

	function invokeTransitionCallbacks(callbacks: (() => void)[]): void {
		for (const cb of callbacks) {
			try {
				cb();
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error('createLayoutState: view-transition callback threw', err);
			}
		}
	}

	function loadState(): LayoutStatePersisted {
		const raw = storage.getItem(STORAGE_KEY);
		if (!raw) {
			return {};
		}
		try {
			return JSON.parse(raw) as LayoutStatePersisted;
		} catch {
			return {};
		}
	}

	function saveState(state: LayoutStatePersisted): void {
		storage.setItem(STORAGE_KEY, JSON.stringify(state));
	}

	function getViewState(): LayoutStateView {
		return loadState()[getStorageKey()] ?? {};
	}

	function isClassApplied(className: string): boolean {
		return targetRoot.classList.contains(className);
	}

	function matches(sub: LayoutSubscription, applied: boolean): boolean {
		if (sub.when === 'always') {
			return true;
		}
		if (sub.when === 'added') {
			return applied === true;
		}
		return applied === false;
	}

	function fireMatching(className: string, applied: boolean): void {
		// Resolve once per fire so every event in this batch carries the same
		// storageKey as the storage write that just happened.
		const eventStorageKey = getStorageKey();
		for (const sub of subscriptions) {
			if (sub.className === className && matches(sub, applied)) {
				const { callback, useViewTransition } = sub;
				dispatch(() => {
					startOptionalViewTransition(useViewTransition, () => {
						callback({ className, isApplied: applied, storageKey: eventStorageKey });
					});
				});
			}
		}
	}

	function subscribe(
		className: string,
		when: LayoutClassWhen,
		callback: LayoutCallback,
		subscribeOptions: LayoutSubscribeOptions = {}
	): () => void {
		const sub: LayoutSubscription = {
			className,
			when,
			callback,
			useViewTransition: !!subscribeOptions.useViewTransition
		};
		subscriptions.add(sub);

		const applied = isClassApplied(className);
		if (matches(sub, applied)) {
			const eventStorageKey = getStorageKey();
			const { useViewTransition } = sub;
			dispatch(() => {
				startOptionalViewTransition(useViewTransition, () => {
					callback({ className, isApplied: applied, storageKey: eventStorageKey });
				});
			});
		}

		return () => {
			subscriptions.delete(sub);
		};
	}

	function restoreInitialState(): void {
		const viewState = getViewState();
		for (const className of Object.keys(viewState)) {
			// Skip classes outside the allowlist so views that share a bucket
			// don't inherit slices of state they don't participate in.
			if (!isInScope(className)) {
				continue;
			}
			targetRoot.classList.toggle(className, viewState[className]);
		}
	}

	function matchesPrefix(className: string): boolean {
		return className.startsWith(CLASS_PREFIX);
	}

	function inScopeForObserver(className: string): boolean {
		return matchesPrefix(className) && isInScope(className);
	}

	function diffClasses(newList: string[], oldList: string[]) {
		// Filtering by allowlist here means out-of-scope class changes are
		// invisible to both `persistChanges` and `fireMatching`, so toggling
		// e.g. `layout-flyout-active` on a view that only owns
		// `layout-menu-collapsed` is a complete no-op for this instance.
		const filteredNew = newList.filter(inScopeForObserver);
		const filteredOld = oldList.filter(inScopeForObserver);
		const added = filteredNew.filter(c => !filteredOld.includes(c));
		const removed = filteredOld.filter(c => !filteredNew.includes(c));
		return { added, removed };
	}

	function persistChanges(added: string[], removed: string[]): void {
		if (added.length + removed.length === 0) {
			return;
		}
		const currentStorageKey = getStorageKey();
		const state = loadState();
		const viewState = state[currentStorageKey] ?? {};
		for (const c of added) {
			viewState[c] = true;
		}
		for (const c of removed) {
			viewState[c] = false;
		}
		state[currentStorageKey] = viewState;
		saveState(state);
	}

	function stop(): void {
		observer?.disconnect();
		observer = null;
	}

	// Wired synchronously so the instance is live on return. Wrapped so a
	// failure can't strand CSS rules keyed on `data-layout-restored`.
	try {
		startOptionalViewTransition(useViewTransitionOnRestore, restoreInitialState, {
			sync: true
		});

		observer = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				const oldClasses = (mutation.oldValue ?? '').split(/\s+/);
				const newClasses = Array.from((mutation.target as Element).classList);
				const { added, removed } = diffClasses(newClasses, oldClasses);

				persistChanges(added, removed);

				for (const c of added) {
					fireMatching(c, true);
				}
				for (const c of removed) {
					fireMatching(c, false);
				}
			}
		});

		observer.observe(targetRoot, {
			attributes: true,
			attributeFilter: ['class'],
			attributeOldValue: true
		});

		deferCallbacksUntil.then(flushPendingCallbacks, err => {
			// eslint-disable-next-line no-console
			console.error(
				'createLayoutState: deferCallbacksUntil rejected; flushing pending callbacks anyway',
				err
			);
			flushPendingCallbacks();
		});
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error('createLayoutState: setup failed; marking layout as restored anyway', err);
		markRestored();
		throw err;
	}

	return {
		subscribe,
		getViewState,
		getState: loadState,
		stop
	};
}
