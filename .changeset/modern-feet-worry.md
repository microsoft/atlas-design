---
'@microsoft/atlas-js': patch
---

The layout related TypeScript should use style.setProperty to avoid downstream conflicts if sets document.documentElement.style.cssText directly.
