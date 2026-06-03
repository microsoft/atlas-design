---
'@microsoft/atlas-js': major
---

Replace `LayoutStateInstance.stop()` with `suspend()`, `resume()`, and `dispose()` so a single long-lived layout state instance can serve every route in a client-side-routed app. `suspend()` synchronously disconnects the observer and clears `data-layout-restored`; `resume()` re-reads the `storageKey` / `excludesKey` / `excludes` getters, re-restores persisted state, and replays matching subscribers against the freshly-restored state; `dispose()` is a hard teardown that clears subscriptions and pending queues. After `dispose()`, `subscribe` / `suspend` / `resume` throw, `getViewState` / `getState` still work (they read from storage), and previously-returned unsubscribe functions remain safe no-ops.

The `excludes` option now accepts a getter (`string[] | (() => string[])`) so SPA route changes can supply different exclusion lists without recreating the instance — the getter is re-read on every `resume()`.

**Migrating from `stop()`:** Replace each `state.stop()` call with `state.suspend()` (for paired router-event integration) or `state.dispose()` (for full teardown / test cleanup). Note that `suspend()` additionally removes `data-layout-restored`; if you were removing the attribute manually around `stop()`, you can drop that line.
