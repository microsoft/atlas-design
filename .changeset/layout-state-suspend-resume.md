---
'@microsoft/atlas-js': major
---

Replace `LayoutStateInstance.stop()` with `suspend()`, `resume()`, and `dispose()` so a single long-lived layout state instance can serve every route in a client-side-routed app:

- `suspend()` — synchronously disconnects the observer and clears `data-layout-restored`. Subscriptions are preserved.
- `resume()` — re-reads the `storageKey` / `excludesKey` / `excludes` getters, re-restores persisted state, and replays matching subscribers against the freshly-restored state.
- `dispose()` — hard teardown that clears subscriptions and pending queues. Afterward, `subscribe()` / `suspend()` / `resume()` throw, `getViewState()` / `getState()` still work (they read from storage), and previously-returned unsubscribe functions remain safe no-ops.

The `excludes` option now also accepts a getter (`string[] | (() => string[])`), re-read on every persist and every `resume()`, so SPA route changes can supply different exclusion lists without recreating the instance.

**Migrating from `stop()`:** Replace each `state.stop()` call with `state.suspend()` when you will call `state.resume()` on the matching router event, or with `state.dispose()` for full teardown or test cleanup. `suspend()` also removes `data-layout-restored`, so drop any manual clearing you did around `stop()`.
