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
 * persists them via a Storage backend, bucketed under the shared
 * `atlas-layout-preferences` storage entry. Consumers `subscribe()` to
 * specific class transitions; a new subscription replays immediately if the
 * current state already matches.
 *
 * Bucket layout is configured one of two ways:
 *
 *  - `storageKey` (single-bucket shorthand): every observed `layout-*` class
 *    is persisted under one key. Distinct pages with different `storageKey`s
 *    persist independently; pages that should share state pass the same key.
 *    Defaults to `'default'`.
 *
 *  - `buckets` (per-concern): an array of `{ storageKey, classes? }` entries.
 *    Each bucket owns a subset of `layout-*` classes; a single instance
 *    fans reads and writes out to every bucket it lists. Lets distinct views
 *    opt into the slices of state that apply to them (e.g. a flyout-only
 *    view lists just the flyout bucket while a full view lists both flyout
 *    and menu buckets, all sharing per-concern state).
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
	/** Resolved key of the bucket that owns this class. For class changes
	 *  that aren't claimed by any bucket the event still fires; `storageKey`
	 *  then holds the first bucket's resolved key as a stable fallback. */
	storageKey: string;
}

export type LayoutCallback = (event: LayoutCallbackEvent) => void;

export interface LayoutStateView {
	[className: string]: boolean;
}

export interface LayoutStatePersisted {
	[storageKey: string]: LayoutStateView;
}

/**
 * A storage bucket within an `atlas-layout-preferences` entry. A bucket
 * owns a subset of `layout-*` classes and is what `createLayoutState`
 * reads/writes when those classes change on the root.
 */
export interface LayoutBucket {
	/** Bucket key under `atlas-layout-preferences`. Static, or a getter for
	 *  runtime-varying keys (resolved on every read/write). */
	storageKey: string | (() => string);
	/**
	 * Classes this bucket owns. Omit to make the bucket a catch-all that
	 * claims any observed `layout-*` class not listed on another bucket. At
	 * most one catch-all per instance; later catch-alls are treated as empty
	 * (own no classes).
	 */
	classes?: string[];
}

export interface LayoutStateOptions {
	/** Element whose classList is observed and toggled. Defaults to `<html>`. */
	root?: HTMLElement;
	/** Storage backend matching `getItem`/`setItem`. Defaults to `localStorage`. */
	storage?: Pick<Storage, 'getItem' | 'setItem'>;
	/**
	 * Single-bucket shorthand: equivalent to `buckets: [{ storageKey }]` (a
	 * catch-all bucket that owns every observed `layout-*` class). Mutually
	 * exclusive with `buckets`; if both are supplied, `buckets` wins.
	 *
	 * Pages with different `storageKey`s persist independently; pages that
	 * should share persisted state pass the same `storageKey`. May be a
	 * static string or a getter called every time the key is needed.
	 * Defaults to `'default'` when neither `storageKey` nor `buckets` is set.
	 */
	storageKey?: string | (() => string);
	/**
	 * Per-concern buckets, each owning a slice of the `layout-*` classes a
	 * view cares about. Lets distinct views opt into the concerns that apply
	 * to them — e.g. a flyout-only view lists just the flyout bucket, while
	 * a full view lists both flyout and menu buckets, and all share the same
	 * persisted state per concern. Class changes are routed to the first
	 * bucket whose `classes` includes them; unclaimed classes fall through
	 * to the catch-all (a bucket with no `classes` field) if present, or are
	 * ignored. Mutually exclusive with `storageKey`.
	 */
	buckets?: LayoutBucket[];
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
	/** Merged view of every bucket this instance manages (later buckets
	 *  override earlier ones on key collision). */
	getViewState(): LayoutStateView;
	/** Persisted state across all `storageKey` buckets in storage, including
	 *  those not owned by this instance. */
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
		storageKey: storageKeyOption,
		buckets: bucketsOption,
		deferCallbacksUntil = Promise.resolve(),
		useViewTransitionOnRestore = false
	} = options;

	const CLASS_PREFIX = 'layout-';
	const STORAGE_KEY = 'atlas-layout-preferences';
	const RESTORED_ATTRIBUTE = 'data-layout-restored';

	// Coerce unsafe object keys to 'default' so prototype-key writes can't
	// corrupt the persisted state map.
	function sanitizeKey(raw: string): string {
		return raw === '__proto__' || raw === 'prototype' || raw === 'constructor' ? 'default' : raw;
	}

	interface NormalizedBucket {
		resolveKey(): string;
		ownsClass(className: string): boolean;
		isCatchAll: boolean;
	}

	// Normalize options into an internal bucket list. `buckets` wins over
	// `storageKey`; legacy single-key callers get a single catch-all bucket
	// so behavior is unchanged.
	function normalizeBuckets(): NormalizedBucket[] {
		const source: LayoutBucket[] = bucketsOption?.length
			? bucketsOption
			: [{ storageKey: storageKeyOption ?? 'default' }];

		let catchAllSeen = false;
		return source.map(b => {
			const isCatchAll = b.classes === undefined && !catchAllSeen;
			if (b.classes === undefined) {
				catchAllSeen = true;
			}
			const owned = b.classes ? new Set(b.classes) : null;
			return {
				resolveKey(): string {
					const raw = typeof b.storageKey === 'function' ? b.storageKey() : b.storageKey;
					return sanitizeKey(raw);
				},
				ownsClass(className: string): boolean {
					return owned ? owned.has(className) : isCatchAll;
				},
				isCatchAll
			};
		});
	}

	const normalizedBuckets = normalizeBuckets();

	// First bucket's key — used as a stable fallback for `event.storageKey`
	// when a class isn't claimed by any bucket.
	function fallbackKey(): string {
		return normalizedBuckets[0].resolveKey();
	}

	function findOwner(className: string): NormalizedBucket | null {
		for (const b of normalizedBuckets) {
			if (b.ownsClass(className)) {
				return b;
			}
		}
		return null;
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
		// Merged view of every bucket this instance manages, so consumers
		// don't have to know which bucket owns which class.
		const state = loadState();
		const merged: LayoutStateView = {};
		for (const b of normalizedBuckets) {
			const view = state[b.resolveKey()] ?? {};
			for (const k of Object.keys(view)) {
				merged[k] = view[k];
			}
		}
		return merged;
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
		// storageKey as the storage write that just happened. Owner key when
		// the class is claimed by a bucket; first-bucket key otherwise.
		const owner = findOwner(className);
		const eventStorageKey = owner ? owner.resolveKey() : fallbackKey();
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
			const owner = findOwner(className);
			const eventStorageKey = owner ? owner.resolveKey() : fallbackKey();
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
		// Apply each bucket's persisted view independently so per-concern
		// buckets stay isolated even when one is empty.
		const state = loadState();
		for (const b of normalizedBuckets) {
			const view = state[b.resolveKey()] ?? {};
			for (const className of Object.keys(view)) {
				targetRoot.classList.toggle(className, view[className]);
			}
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
		// Group changes by owning bucket so we issue at most one write per
		// bucket. Classes with no owner are dropped — the instance simply
		// doesn't persist them.
		const perBucket = new Map<NormalizedBucket, { added: string[]; removed: string[] }>();
		function bucketFor(b: NormalizedBucket) {
			let entry = perBucket.get(b);
			if (!entry) {
				entry = { added: [], removed: [] };
				perBucket.set(b, entry);
			}
			return entry;
		}
		for (const c of added) {
			const owner = findOwner(c);
			if (owner) {
				bucketFor(owner).added.push(c);
			}
		}
		for (const c of removed) {
			const owner = findOwner(c);
			if (owner) {
				bucketFor(owner).removed.push(c);
			}
		}
		if (perBucket.size === 0) {
			return;
		}
		const state = loadState();
		for (const [bucket, changes] of perBucket) {
			const key = bucket.resolveKey();
			const viewState = state[key] ?? {};
			for (const c of changes.added) {
				viewState[c] = true;
			}
			for (const c of changes.removed) {
				viewState[c] = false;
			}
			state[key] = viewState;
		}
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
