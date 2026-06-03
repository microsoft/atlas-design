const root = document.documentElement;

const setLayoutCssVariables = () => {
	const header = document.querySelector('.layout-body-header');
	const headerHeight = header?.clientHeight || 0;
	const headerCssProp = headerHeight ? `${headerHeight}px` : '0px';
	const headerY = header?.getBoundingClientRect().y || 0;
	const visibleHeaderHeight = Math.max(0, headerY + headerHeight);
	const visibleHeaderCssProp = `${visibleHeaderHeight}px`;

	const footer = document.querySelector('.layout-body-footer');
	const footerHeight = footer?.clientHeight || 0;
	const footerCssProp = footerHeight ? `${footerHeight}px` : '0px';
	const footerY = footer?.getBoundingClientRect().y || 0;

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

	// TODO: remove with atlas-js 1.13.1.
	window.addEventListener('scroll', dispatchAtlasLayoutUpdateEvent, {
		passive: true
	});
}

/* -------------------------------------------------------------------------- */
/* Layout state                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Persists `layout-*` class state per `storageKey`. Instance is live on return.
 *
 * Subscribers fire on class transitions, with an immediate replay if the current
 * state already matches. Initial replay waits for `deferCallbacksUntil`.
 *
 * `data-layout-restored="true"` is always set after the initial flush — even on
 * setup or callback failure — so CSS gated on it cannot leave content hidden.
 * Setup errors are re-thrown.
 *
 * View transitions coalesce same-microtask callbacks and skip while another is
 * animating, avoiding `InvalidStateError` aborts.
 *
 * ### SPA integration
 *
 * Create the instance once at boot. Pair `suspend()` with `resume()` around
 * navigations that mutate `<html>`'s class list:
 *
 * ```ts
 * const layoutState = createLayoutState({
 *   storageKey:  () => currentRoute.layoutKey,     // getter, re-read on resume
 *   excludesKey: () => currentRoute.excludesKey,
 *   excludes:    () => currentRoute.excludes
 * });
 *
 * router.on('beforeNavigate', () => layoutState.suspend());
 * router.on('afterNavigate',  () => layoutState.resume());
 * ```
 *
 * Subscribers registered once at boot stay live across every navigation — no
 * re-registration required. `resume()` re-fires matching subscribers against
 * the freshly-restored state, so subscriber callbacks **must be idempotent**
 * and should look up DOM each time (don't capture stale element references).
 *
 * **Order matters.** Call `suspend()` BEFORE any DOM mutation that touches
 * `<html>`'s class list, and `resume()` AFTER. `suspend()` disconnects the
 * observer synchronously so mutations during the navigation window cannot
 * leak into the persisted state.
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
	/** Observed element. Defaults to `<html>`. */
	root?: HTMLElement;
	/** Storage backend. Defaults to `localStorage`. */
	storage?: Pick<Storage, 'getItem' | 'setItem'>;
	/**
	 * Bucket key under `atlas-layout-preferences` and the value surfaced as
	 * `LayoutCallbackEvent.storageKey`. Same key shares state. Getter is
	 * re-read per operation. Defaults to `'default'`.
	 */
	storageKey?: string | (() => string);
	/**
	 * Key into `atlas-layout-exclusions`. Classes listed under this key are
	 * skipped during restore, persist, subscriber dispatch (including initial
	 * replay), and the inline pre-paint restore. Getter is re-read per
	 * operation. Omit to disable exclusion lookup.
	 */
	excludesKey?: string | (() => string);
	/**
	 * Classes to write into `atlas-layout-exclusions[excludesKey]` on
	 * construction and on every `resume()`. Requires `excludesKey`. Empty
	 * array clears the blocklist; omission leaves any persisted entry
	 * untouched. Getter is re-read per write so SPA route changes can supply
	 * different exclusions.
	 */
	excludes?: string[] | (() => string[]);
	/** Delays initial subscriber callbacks. Defaults to next microtask. */
	deferCallbacksUntil?: Promise<unknown>;
	/** Wrap initial restoration in `document.startViewTransition` if available. */
	useViewTransitionOnRestore?: boolean;
}

export interface LayoutSubscribeOptions {
	/** Wrap in a coalesced view transition; runs sync if one is already active. */
	useViewTransition?: boolean;
}

export interface LayoutStateInstance {
	/**
	 * Subscribe to `className` transitions. Replays once if the current state
	 * matches (queued behind `deferCallbacksUntil`). Returns an unsubscribe fn
	 * which is always safe to call (including after `dispose()`). Throws if
	 * the instance has been disposed.
	 */
	subscribe(
		className: string,
		when: LayoutClassWhen,
		callback: LayoutCallback,
		options?: LayoutSubscribeOptions
	): () => void;
	/** Current bucket state. Safe to call after `dispose()`. */
	getViewState(): LayoutStateView;
	/** All bucket state. Safe to call after `dispose()`. */
	getState(): LayoutStatePersisted;
	/**
	 * Pause observation and clear `data-layout-restored` so until-restored
	 * CSS gates re-engage. Subscriptions are preserved. `MutationObserver`
	 * is disconnected synchronously, so it is safe to call immediately
	 * before a DOM swap that overwrites `<html>`'s class list. Idempotent.
	 * Throws if disposed.
	 */
	suspend(): void;
	/**
	 * Resume observation. Re-reads `storageKey`, `excludesKey`, and
	 * `excludes` getters, re-writes any configured exclusions, re-restores
	 * persisted state, replays matching subscribers against the new state,
	 * and re-sets `data-layout-restored`. No-op when not currently
	 * suspended. Throws if disposed.
	 */
	resume(): void;
	/**
	 * Permanently tear down: disconnect the observer, clear all
	 * subscriptions and pending queues, and remove `data-layout-restored`.
	 * After dispose, `subscribe()`, `suspend()`, and `resume()` throw;
	 * `getViewState()` and `getState()` still work (they read from
	 * `storage`); previously-returned unsubscribe functions remain safe
	 * no-ops. Idempotent.
	 */
	dispose(): void;
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

/** `atlas-layout-exclusions` shape: key → set of excluded `layout-*` class names. */
export interface LayoutExclusionsPersisted {
	[key: string]: { [className: string]: true };
}

const EXCLUSIONS_STORAGE_KEY = 'atlas-layout-exclusions';

function sanitizeExclusionsKey(raw: string): string {
	return raw === '__proto__' || raw === 'prototype' || raw === 'constructor' ? 'default' : raw;
}

export function createLayoutState(options: LayoutStateOptions = {}): LayoutStateInstance {
	const {
		root: targetRoot = document.documentElement,
		storage = window.localStorage,
		storageKey: storageKeyOption = 'default',
		excludesKey: excludesKeyOption,
		excludes: excludesOption,
		deferCallbacksUntil = Promise.resolve(),
		useViewTransitionOnRestore = false
	} = options;

	const CLASS_PREFIX = 'layout-';
	const STORAGE_KEY = 'atlas-layout-preferences';
	const RESTORED_ATTRIBUTE = 'data-layout-restored';
	const DISPOSED_MESSAGE =
		'LayoutStateInstance has been disposed; create a new instance with createLayoutState()';

	// Coerce prototype keys to avoid poisoning the persisted state map.
	function sanitizeKey(raw: string): string {
		return sanitizeExclusionsKey(raw);
	}

	function getStorageKey(): string {
		const raw = typeof storageKeyOption === 'function' ? storageKeyOption() : storageKeyOption;
		return sanitizeKey(raw);
	}

	// Null disables exclusions.
	function getExcludesKey(): string | null {
		if (excludesKeyOption === undefined) {
			return null;
		}
		const raw = typeof excludesKeyOption === 'function' ? excludesKeyOption() : excludesKeyOption;
		return sanitizeKey(raw);
	}

	// Re-read per call so SPA route changes pick up a new exclusion list.
	function getConfiguredExcludes(): string[] | undefined {
		if (excludesOption === undefined) {
			return undefined;
		}
		return typeof excludesOption === 'function' ? excludesOption() : excludesOption;
	}

	// Seed exclusions so the next pre-paint IIFE sees them.
	function writeConfiguredExclusions(): void {
		const excludes = getConfiguredExcludes();
		if (excludes === undefined) {
			return;
		}
		const key = getExcludesKey();
		if (key === null) {
			return;
		}
		const raw = storage.getItem(EXCLUSIONS_STORAGE_KEY);
		let state: LayoutExclusionsPersisted = {};
		if (raw) {
			try {
				const parsed = JSON.parse(raw) as LayoutExclusionsPersisted;
				if (parsed && typeof parsed === 'object') {
					state = parsed;
				}
			} catch {
				// Unparseable: overwrite below.
			}
		}
		const next: { [className: string]: true } = {};
		for (const c of excludes) {
			next[c] = true;
		}
		state[key] = next;
		try {
			storage.setItem(EXCLUSIONS_STORAGE_KEY, JSON.stringify(state));
		} catch (err) {
			// In-memory exclusions still apply; pre-paint restore won't see them.
			// eslint-disable-next-line no-console
			console.error(
				'createLayoutState: failed to write atlas-layout-exclusions; in-memory exclusions still apply',
				err
			);
		}
	}

	// Own-property lookup prevents prototype poisoning.
	function getExcludedClasses(): Set<string> {
		const key = getExcludesKey();
		if (key === null) {
			return new Set();
		}
		const raw = storage.getItem(EXCLUSIONS_STORAGE_KEY);
		if (!raw) {
			return new Set();
		}
		let parsed: Record<string, Record<string, unknown>>;
		try {
			parsed = JSON.parse(raw) as Record<string, Record<string, unknown>>;
		} catch {
			return new Set();
		}
		const scoped = parsed && Object.prototype.hasOwnProperty.call(parsed, key) ? parsed[key] : null;
		if (!scoped || typeof scoped !== 'object') {
			return new Set();
		}
		return new Set(Object.keys(scoped));
	}

	const subscriptions = new Set<LayoutSubscription>();
	let observer: MutationObserver | null = null;
	let callbacksReady = false;
	let pendingCallbacks: (() => void)[] = [];
	let suspended = false;
	let disposed = false;

	// Per-instance gate: coalesce same-microtask callbacks; run sync while active
	// to avoid `InvalidStateError`.
	let activeTransitionCount = 0;
	let pendingTransitionFns: (() => void)[] = [];
	let transitionMicrotaskQueued = false;

	function dispatch(invoke: () => void): void {
		if (callbacksReady) {
			invoke();
		} else {
			pendingCallbacks.push(invoke);
		}
	}

	// Attribute, not class, to stay off the `layout-*` persistence path.
	function markRestored(): void {
		targetRoot.setAttribute(RESTORED_ATTRIBUTE, 'true');
	}

	function clearRestored(): void {
		targetRoot.removeAttribute(RESTORED_ATTRIBUTE);
	}

	function flushPendingCallbacks(): void {
		// Disposed before the deferred flush resolved: drop the queue and
		// leave the attribute cleared.
		if (disposed) {
			pendingCallbacks = [];
			return;
		}
		// Suspended before the deferred flush resolved: keep the queue
		// dangling (resume() will overwrite it from current state) and
		// leave the attribute cleared so until-restored CSS stays engaged.
		if (suspended) {
			return;
		}
		callbacksReady = true;
		const queued = pendingCallbacks;
		pendingCallbacks = [];
		try {
			for (const invoke of queued) {
				// Re-check between callbacks so a callback that calls dispose()
				// stops draining the rest.
				if (disposed) {
					return;
				}
				try {
					invoke();
				} catch (err) {
					// Keep draining after a subscriber error.
					// eslint-disable-next-line no-console
					console.error('createLayoutState: a subscriber callback threw during initial flush', err);
				}
			}
		} finally {
			if (!disposed) {
				markRestored();
			}
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
		// Run sync to avoid aborting the active transition.
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
			// Suspended or disposed during the microtask window: the queue
			// was cleared, nothing to do.
			if (disposed || suspended) {
				return;
			}
			const batch = pendingTransitionFns;
			pendingTransitionFns = [];
			if (batch.length === 0) {
				return;
			}
			// Another transition started since scheduling; run sync to avoid aborting it.
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
			// No `.finished` (e.g. test stub); settle immediately to unblock follow-ups.
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
		// One exclusion snapshot per dispatch; one key read so events match the write.
		if (getExcludedClasses().has(className)) {
			return;
		}
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

	function replayMatchingSubscribers(): void {
		const excluded = getExcludedClasses();
		const eventStorageKey = getStorageKey();
		for (const sub of subscriptions) {
			if (excluded.has(sub.className)) {
				continue;
			}
			const applied = isClassApplied(sub.className);
			if (!matches(sub, applied)) {
				continue;
			}
			const { callback, useViewTransition, className } = sub;
			dispatch(() => {
				startOptionalViewTransition(useViewTransition, () => {
					callback({ className, isApplied: applied, storageKey: eventStorageKey });
				});
			});
		}
	}

	function subscribe(
		className: string,
		when: LayoutClassWhen,
		callback: LayoutCallback,
		subscribeOptions: LayoutSubscribeOptions = {}
	): () => void {
		if (disposed) {
			throw new Error(DISPOSED_MESSAGE);
		}
		const sub: LayoutSubscription = {
			className,
			when,
			callback,
			useViewTransition: !!subscribeOptions.useViewTransition
		};
		subscriptions.add(sub);

		const applied = isClassApplied(className);
		// Excluded classes skip initial replay too.
		if (matches(sub, applied) && !getExcludedClasses().has(className)) {
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
		const excluded = getExcludedClasses();
		for (const className of Object.keys(viewState)) {
			if (excluded.has(className)) {
				continue;
			}
			targetRoot.classList.toggle(className, viewState[className]);
		}
	}

	function matchesPrefix(className: string): boolean {
		return className.startsWith(CLASS_PREFIX);
	}

	function diffClasses(newList: string[], oldList: string[]) {
		const filteredNew = newList.filter(matchesPrefix);
		const filteredOld = oldList.filter(matchesPrefix);
		const added = filteredNew.filter(c => !filteredOld.includes(c));
		const removed = filteredOld.filter(c => !filteredNew.includes(c));
		return { added, removed };
	}

	function persistChanges(added: string[], removed: string[]): void {
		if (added.length + removed.length === 0) {
			return;
		}
		// Refresh per write to catch SPA-updated exclusions.
		const excluded = getExcludedClasses();
		const currentStorageKey = getStorageKey();
		const state = loadState();
		const viewState = state[currentStorageKey] ?? {};
		let touched = false;
		for (const c of added) {
			if (excluded.has(c)) {
				continue;
			}
			viewState[c] = true;
			touched = true;
		}
		for (const c of removed) {
			if (excluded.has(c)) {
				continue;
			}
			viewState[c] = false;
			touched = true;
		}
		if (!touched) {
			return;
		}
		state[currentStorageKey] = viewState;
		saveState(state);
	}

	function mutationCallback(mutations: MutationRecord[]): void {
		// Belt + suspenders: disconnect should prevent us reaching here, but
		// a callback that disposed mid-batch should stop further processing.
		if (disposed) {
			return;
		}
		for (const mutation of mutations) {
			if (disposed) {
				return;
			}
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
	}

	function attachObserver(): void {
		observer = new MutationObserver(mutationCallback);
		observer.observe(targetRoot, {
			attributes: true,
			attributeFilter: ['class'],
			attributeOldValue: true
		});
	}

	function suspend(): void {
		if (disposed) {
			throw new Error(DISPOSED_MESSAGE);
		}
		if (suspended) {
			return;
		}
		suspended = true;
		observer?.disconnect();
		observer = null;
		clearRestored();
		// Drop in-flight batched VTs; their target state is about to be
		// replaced by whatever resume() restores.
		pendingTransitionFns = [];
	}

	function resume(): void {
		if (disposed) {
			throw new Error(DISPOSED_MESSAGE);
		}
		if (!suspended) {
			return;
		}
		suspended = false;

		// Re-write exclusions FIRST so restore + replay see the right list.
		writeConfiguredExclusions();

		// Re-restore persisted state to the root. Use the sync transition
		// path so the restore can't be aborted by a subsequent batch.
		startOptionalViewTransition(useViewTransitionOnRestore, restoreInitialState, {
			sync: true
		});

		// Reset the dispatch gate and clear any leftover queue so resume
		// behaves like a fresh creation for subscriber-replay purposes.
		callbacksReady = false;
		pendingCallbacks = [];

		// Queue replays for every subscriber whose current state matches.
		replayMatchingSubscribers();

		// Re-attach the observer AFTER restore so the restore itself doesn't
		// echo back through persistChanges.
		attachObserver();

		// Drain on next microtask, same as initial creation.
		Promise.resolve().then(flushPendingCallbacks, err => {
			if (disposed) {
				return;
			}
			// eslint-disable-next-line no-console
			console.error('createLayoutState: resume flush rejected; flushing anyway', err);
			flushPendingCallbacks();
		});
	}

	function dispose(): void {
		if (disposed) {
			return;
		}
		disposed = true;
		observer?.disconnect();
		observer = null;
		clearRestored();
		subscriptions.clear();
		pendingCallbacks = [];
		pendingTransitionFns = [];
	}

	writeConfiguredExclusions();

	// Mark restored even on setup failure so CSS gates can't strand content.
	try {
		startOptionalViewTransition(useViewTransitionOnRestore, restoreInitialState, {
			sync: true
		});

		attachObserver();

		deferCallbacksUntil.then(flushPendingCallbacks, err => {
			if (disposed) {
				return;
			}
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
		suspend,
		resume,
		dispose
	};
}
