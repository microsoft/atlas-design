---
'@microsoft/atlas-js': patch
---

Add a `storageKey` option to `createLayoutState` so distinct views can share persisted `layout-*` state while keeping their own `viewName` identity in callback events. `storageKey` defaults to `viewName`, so existing callers are unaffected. Accepts a static string or a getter, matching the `viewName` accessor pattern.
