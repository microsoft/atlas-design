---
'@microsoft/atlas-js': patch
---

Replace `viewName` with `storageKey` on `createLayoutState`. The option now serves a single concept — the bucket key under `atlas-layout-preferences` and the value surfaced in `LayoutCallbackEvent.storageKey` — so distinct pages can share persisted state by passing the same `storageKey`. The previous `viewName` option (and the `LayoutCallbackEvent.viewName` field) is removed; callers should rename `viewName` to `storageKey`. `storageKey` defaults to `'default'`, accepts a static string or a getter, and coerces unsafe object keys (`__proto__`, `prototype`, `constructor`) to `'default'`.
