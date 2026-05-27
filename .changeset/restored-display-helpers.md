---
'@microsoft/atlas-css': minor
---

Add `display-{value}-until-layout-restored` helpers in `components/layout`. These apply the given `display` value while the `data-layout-restored` attribute is absent from `<html>`, letting you hide (or show) elements until `createLayoutState` (from `@microsoft/atlas-js`) has flushed its initial subscriber callbacks.
