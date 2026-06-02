---
'@microsoft/atlas-js': minor
---

Add `excludesScope` and `excludes` options to `createLayoutState` so views that share a `storageKey` can opt specific `layout-*` classes out of restore, persist, and subscriber dispatch. Rules are persisted under a new `localStorage` entry, `atlas-layout-exclusions`, and honored by the inline pre-paint script.
