---
'@microsoft/atlas-js': minor
---

Add `createLayoutState` to `behaviors/layout` for persisting and restoring `layout-*` classes on `<html>` across page loads, scoped per `viewName` and backed by a configurable storage (defaults to `localStorage`). Restoration and a `MutationObserver` start synchronously inside the factory, and subscribers receive the current matching state on registration with optional `document.startViewTransition` support for the initial restore and subsequent dispatches. After the initial callback flush — or if setup or a queued callback throws — `createLayoutState` sets `data-layout-restored="true"` on `<html>` so CSS hooks (e.g. the new `display-*-until-layout-restored` helpers) don't permanently hide content on failure.
