# Atlas JS Unit Testing - Copilot Instructions

applyTo: "js/test/\*\*"

Conventions, gotchas, and patterns for writing unit tests in `@microsoft/atlas-js`. These rules apply to every test file under `js/test/`.

## Quick Reference

- **Runner**: [Vitest](https://vitest.dev/) 4.x with the `jsdom` environment.
- **Coverage provider**: v8 (`@vitest/coverage-v8`).
- **Run**: `npm test` (one-shot) or `npm run test:cov` (with coverage). Both run from `js/` or repo root.
- **Watch**: `npx vitest --watch` from `js/`.
- **Single file**: `npx vitest run test/path/to/file.test.ts`.
- **Single test**: append `-t "partial description"`.

## File Layout

- One test file per source module. Tests live in `js/test/` mirroring `js/src/`.
  - `src/utilities/util.ts` → `test/utilities/util.test.ts`
  - `src/behaviors/popover.ts` → `test/behaviors/popover.test.ts`
  - `src/elements/tab-container/element.ts` → `test/elements/tab-container/element.test.ts`
- One top-level `describe` per logical surface (a function, a class, a behavior); nest only when it improves readability.

## Spec Description Conventions

- Spec descriptions are short, declarative sentences ("`does X when Y`"), no leading "should".
- If the test was written or substantially co-written by an AI agent, **append `[ai generated]` to the end of the description**. Example:
  ```ts
  it('hides the popover when the user clicks outside [ai generated]', () => { ... });
  ```
- The tag is grep-friendly — humans can filter or audit AI work with `npx vitest run -t "[ai generated]"` or `rg "[ai generated]" js/test`.

## Imports

Always import vitest helpers explicitly. Do not rely on globals.

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MockInstance } from 'vitest';
```

## Avoid Excessive Mocking

The whole point of the jsdom environment is that real DOM works. Prefer real fixtures.

- **Do**: build small HTML strings, attach them to `document.body`, query real elements, assert real side effects (classes, attributes, `innerText`, dispatched events).
- **Do**: stub only what jsdom genuinely lacks (`IntersectionObserver`, `Element.prototype.scrollIntoView`, `fetch`, `requestAnimationFrame` timing, `window.location` for navigation).
- **Don't**: mock the module under test, mock the DOM, or stub helpers from the same module to "isolate" the function. Those tests stop catching real regressions.
- **Don't**: stub something just to make the test pass. If a real fixture would not exercise the branch, the test should set up real DOM that does.

## jsdom Gotchas (Read This Before You File a Bug)

These bit us repeatedly while bringing coverage from ~44% to ~96%. Each entry is a real thing jsdom does differently from a browser.

| Thing                                       | What goes wrong                                                                                          | What to do                                                                                                                                              |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntersectionObserver`                      | Not implemented.                                                                                         | Build a minimal `FakeIntersectionObserver` with a `.trigger(entries)` method and assign to `window.IntersectionObserver` in `beforeEach`.               |
| `Element.prototype.scrollIntoView`          | `undefined`. Calls throw.                                                                                | Stub on the prototype at **module load**, not in `beforeEach`: `Element.prototype.scrollIntoView = vi.fn();`                                            |
| `offsetParent`                              | Always `null` (no real layout).                                                                          | If code under test checks visibility via `offsetParent`, define it per element: `Object.defineProperty(el, 'offsetParent', { get: () => document.body });` |
| `<details>` `toggle` events                 | jsdom fires `toggle` **natively and async** when `open` changes.                                         | `details.open = true; await new Promise(r => setTimeout(r, 0));` — never dispatch the toggle manually or you'll get it twice.                           |
| Sync throws from event listeners            | jsdom **swallows** synchronous errors thrown by listeners; your test passes when it shouldn't.           | Assert on observable side effects, not by expecting a throw to bubble out of `dispatchEvent`.                                                           |
| `Element.innerText` setter                  | Does **not** update `textContent` / `innerHTML` (they stay `""`). The getter does return the set value. | If source code uses `el.innerText = '...'`, assert with `el.innerText`, not `el.textContent`.                                                           |
| `window.location`                           | Property is non-configurable by default.                                                                 | Swap via `Object.defineProperty(window, 'location', { configurable: true, value: fake, writable: true });` and restore in `afterEach`.                  |
| `BeforeUnloadEvent.returnValue`             | jsdom coerces the value to a boolean on a plain `Event`.                                                 | Assert truthiness, not the string literal. (The source still sets the string; the browser will read it correctly.)                                      |
| Unknown elements + `FormData`               | Custom elements are not in `form.elements` and not yielded by `new FormData(form)`.                      | If a helper inspects custom-named fields, the test fixture has to register them or stub `FormData` for the case being exercised.                        |
| `requestAnimationFrame`                     | Runs on jsdom's timer queue but not synchronously.                                                       | Replace with a queue-and-flush helper, OR use `vi.useFakeTimers()` and `vi.advanceTimersByTime(...)`.                                                   |

## Teardown — The Single Highest-Value Investment

Flaky-test investigations almost always come back to leaked state between tests. Build teardown in from the start.

1. **Reset the DOM both before and after each test**:
   ```ts
   beforeEach(() => { document.body.innerHTML = ''; });
   afterEach(() => { document.body.innerHTML = ''; });
   ```
   This makes order-of-tests irrelevant and protects against a thrown `beforeEach` poisoning the next test.

2. **Capture global prototypes at module load**, not in `beforeEach`:
   ```ts
   // module top, executed once
   const originalScrollIntoView = Element.prototype.scrollIntoView;
   Element.prototype.scrollIntoView = vi.fn();
   afterAll(() => { Element.prototype.scrollIntoView = originalScrollIntoView; });
   ```
   If you reassign inside `beforeEach`, a single thrown setup leaves the prototype stranded with `undefined` for the rest of the run.

3. **For behaviors that attach listeners to `window`, sweep them**. Use a recording spy:
   ```ts
   let installedWindowListeners: { type: string; listener: EventListener; options: AddEventListenerOptions | boolean | undefined }[] = [];
   let addSpy: MockInstance | undefined;
   let removeSpy: MockInstance | undefined;

   beforeEach(() => {
     installedWindowListeners = [];
     const origAdd = window.addEventListener.bind(window);
     addSpy = vi.spyOn(window, 'addEventListener').mockImplementation((type, listener, options) => {
       installedWindowListeners.push({ type, listener: listener as EventListener, options });
       origAdd(type, listener, options);
     });
     // ...analogous removeEventListener spy that splices out the matching entry...
   });

   afterEach(() => {
     for (const { type, listener, options } of installedWindowListeners.splice(0)) {
       window.removeEventListener(type, listener, options as EventListenerOptions);
     }
     addSpy?.mockRestore();
     removeSpy?.mockRestore();
   });
   ```

4. **Use per-test child containers for delegated listeners**. If the behavior attaches a listener to a container, attach it to a fresh element created in `beforeEach` and detach it in `afterEach`. The listener dies with the node, no cross-test accumulation:
   ```ts
   let container: HTMLElement;
   beforeEach(() => {
     container = document.createElement('div');
     document.body.appendChild(container);
   });
   // afterEach's `document.body.innerHTML = ''` detaches it; nothing else needed.
   ```

5. **`try { ... } finally { ... }` wraps any setup with side effects**. If init fails partway, cleanup still runs.

6. **Restore spies explicitly**: `spy.mockRestore()` in `afterEach` (or `finally` in a single test) so spies don't leak through the rest of the file.

## Typing Spies

`ReturnType<typeof vi.spyOn>` is `any` — ESLint will flag it. Use `MockInstance` from `vitest`:

```ts
import type { MockInstance } from 'vitest';
let spy: MockInstance | undefined;
```

## Async Tests

- Await `dispatchEvent` results when the handler is `async`. The promise from `handleEvent` is not chained through, so call the method directly in tests:
  ```ts
  await behavior.handleSubmitEvent(event);
  ```
- For event-loop-bound work (like jsdom's native `toggle`), flush with `await new Promise(r => setTimeout(r, 0));`.
- Use fake timers for `setTimeout` / debounce code: `vi.useFakeTimers(); ...; vi.advanceTimersByTime(n); vi.useRealTimers();`.

## Testing Custom Elements

- The file under test will call `customElements.define(...)` at import time. That's fine — import it once at the top of the test file. The `define.ts` files in this repo swallow redefinition errors, so cross-file imports are safe.
- Build a real form / DOM fixture; let `connectedCallback` run by appending to `document.body`.
- For lifecycle cleanup, just remove the element or clear `document.body.innerHTML` — `disconnectedCallback` will run and exercise the cleanup path.

## Stubbing `fetch`

```ts
const fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValue(
  new Response('ok', { status: 200 })
);
try {
  await codeThatFetches();
} finally {
  fetchSpy.mockRestore();
}
```

Use `mockRejectedValue(new Error('network'))` to exercise the catch arm.

## Coverage Targets

Aim for **>90% statements / >85% branch** on new code. The package was at ~72% statements before the testing push; the goal is to keep it climbing. Use `npm run test:cov` and look at the `Uncovered Line #s` column to find what's missing.

## ESLint Will Catch You

The husky **pre-push** hook runs the full repo lint, including `eslint . --ext .ts` over `js/`. The most common offenders in tests:

- `@typescript-eslint/array-type` — write `T[]`, not `Array<T>`.
- `@typescript-eslint/naming-convention` — variables must be `camelCase` or `UPPER_CASE`. No `PascalCase` for non-types.
- `@typescript-eslint/no-unsafe-*` — typed casts beat `any`. Prefer `as CustomEvent<{ form: HTMLFormElement }>` over `as CustomEvent`.

Fix lint errors — **don't** bypass with `--no-verify`.

## When You're Done

1. `npx vitest run test/path/to/your.test.ts` — your new file alone passes.
2. `npm test` — full suite is green.
3. `npm run test:cov` — note the before/after coverage for the file you touched.
4. `npx eslint . --ext .ts` — clean. (`cd js` first.)
5. Commit. The pre-commit hook runs prettier; the pre-push hook runs the full lint and type-check.
