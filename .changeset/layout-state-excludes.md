---
'@microsoft/atlas-js': minor
---

Add `excludesKey` and `excludes` options to `createLayoutState` so views that share a `storageKey` can prevent specific `layout-*` classes from being restored, persisted, or sent to subscribers. Rules persist under a new `localStorage` entry, `atlas-layout-exclusions`, and are honored by the inline pre-paint script.
