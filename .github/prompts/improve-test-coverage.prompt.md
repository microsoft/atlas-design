---
mode: agent
description: Identify the weakest-covered module in @microsoft/atlas-js and write tests to push its coverage above 90%.
---

# Improve Atlas JS Test Coverage

Drive up unit-test coverage for `@microsoft/atlas-js` by finding a low-coverage module and writing additional tests for it. Follow [`unit-testing.instructions.md`](../instructions/unit-testing.instructions.md) end to end.

## What to Do

1. **Establish the baseline**:
   - Run `npm run test:cov` from `js/`.
   - Read the per-file table at the bottom. Note the lowest-coverage source file (or the file the user named).
2. **Pick a target** (if the user did not name one):
   - Prefer files in `src/elements/` or `src/behaviors/` over `src/utilities/` (more impact per test).
   - Skip files that are <80 lines or that are pure type / interface modules.
3. **Read the source and read the existing test file** if any. Identify uncovered:
   - Functions that are never called.
   - `if`/`switch` arms that no test reaches (the `Uncovered Line #s` column points at these).
   - Error paths (`catch` blocks, `throw`s, HTTP error responses).
4. **Write the new tests** following [`unit-testing.instructions.md`](../instructions/unit-testing.instructions.md):
   - Mirror existing style in the same `describe` block where possible.
   - **Every new spec description ends with `[ai generated]`**.
   - Real DOM fixtures, no DOM mocking. Stub only jsdom-missing APIs (`IntersectionObserver`, `fetch`, `scrollIntoView`, `window.location`, `requestAnimationFrame`).
   - Solid teardown (see the instructions file's teardown section).
5. **Validate**:
   - `npx vitest run test/<file>.test.ts` from `js/` — green.
   - `npm test` from `js/` — full suite green.
   - `npm run test:cov` — coverage moved up. Capture before / after numbers.
   - `npx eslint . --ext .ts` from `js/` — clean.
6. **Commit** with a message of the form `Improve <file> coverage from X% to Y%` and include the Copilot co-author trailer.
7. **Report** to the user:
   - The chosen file and why.
   - Number of new tests.
   - Before / after for statements / branch / functions / lines.
   - Anything surprising you found in the source (real bugs, dead code).

## Non-negotiables

- Every new spec description ends with `[ai generated]`.
- Real DOM fixtures, not DOM mocks.
- Teardown wired up before you write the first new test.
- Fix lint errors; never bypass husky hooks.

## Reference

- Full playbook: [`.github/instructions/unit-testing.instructions.md`](../instructions/unit-testing.instructions.md)
- Existing examples: `js/test/behaviors/layout.test.ts`, `js/test/elements/form-behavior.test.ts`, `js/test/elements/tab-container/element.test.ts`
