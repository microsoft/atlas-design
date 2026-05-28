---
mode: agent
description: Write Vitest unit tests for an atlas-js module, following project conventions and avoiding the jsdom landmines.
---

# Write Unit Tests for Atlas JS

Write **Vitest** unit tests for a module in `@microsoft/atlas-js`. Follow [`unit-testing.instructions.md`](../instructions/unit-testing.instructions.md) for every convention, gotcha, and teardown pattern.

## Inputs

Ask the user for (or infer from context):

- The **source file** to test (e.g. `js/src/behaviors/popover.ts`).
- Whether the test file already exists or should be created at the mirrored path under `js/test/`.

If no target is provided, scan `js/src/` against `js/test/` and propose the highest-impact untested or under-tested module by line count.

## What to Do

1. **Read the source.** Understand every exported function, class, and side effect. Note any module-load behavior (e.g. `customElements.define`, prototype patches).
2. **Look at existing tests in the same folder** (e.g. `js/test/behaviors/layout.test.ts`, `js/test/utilities/util.test.ts`) and match their style.
3. **Plan the cases**:
   - One success-path test per public function.
   - Branch coverage: each `if`/`switch` arm gets its own test.
   - Error paths: throws, rejected promises, HTTP error responses.
   - DOM side effects: classes added/removed, attributes set, events dispatched.
   - Lifecycle: for custom elements, exercise `connectedCallback` and `disconnectedCallback`.
4. **Build minimal real DOM fixtures.** Do not mock the DOM. Stub only what jsdom genuinely lacks (`IntersectionObserver`, `scrollIntoView`, `fetch`, `window.location`, `requestAnimationFrame`).
5. **Tag every spec description with `[ai generated]`** — append it to the end of every `it(...)` description.
6. **Wire up teardown from the first test**:
   - `beforeEach(() => { document.body.innerHTML = ''; })` and the same in `afterEach`.
   - Capture global prototypes at module load, restore in `afterAll`.
   - If the code attaches `window` listeners, install the `addEventListener`/`removeEventListener` spy pattern from the instructions file.
   - Use per-test child containers for behaviors that attach delegated listeners.
7. **Run the file**: `npx vitest run test/<path>.test.ts` from `js/`. Iterate until green.
8. **Run the whole suite**: `npm test` from `js/`. Make sure nothing else broke.
9. **Coverage check**: `npm run test:cov`. Confirm the file's coverage moved up.
10. **Lint**: `npx eslint . --ext .ts` from `js/`. Fix any errors. Common ones:
    - `T[]`, not `Array<T>`.
    - `MockInstance` from `vitest` for spy types, not `ReturnType<typeof vi.spyOn>`.
    - Typed `CustomEvent<{ ... }>` for event detail access.
11. **Report**:
    - Number of new tests.
    - Before/after coverage for the touched file.
    - Any source-code observations worth surfacing (real bugs, odd APIs).

## Non-negotiables

- Every spec description ends with `[ai generated]`.
- No `--no-verify` on commits or pushes.
- No mocking the module under test.
- No mocking the DOM. Real fixtures.
- Tear down everything that was set up.

## Reference

- Full playbook: [`.github/instructions/unit-testing.instructions.md`](../instructions/unit-testing.instructions.md)
- Existing examples: `js/test/behaviors/layout.test.ts`, `js/test/utilities/util.test.ts`, `js/test/elements/form-behavior.test.ts`
