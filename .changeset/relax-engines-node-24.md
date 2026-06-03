---
'@microsoft/atlas-css': patch
'@microsoft/atlas-js': patch
---

Relaxed the `engines` field to allow any Node 24 / npm 11 release (`^24.0.0` / `^11.0.0`) instead of pinning a single exact version. This stops `EBADENGINE` warnings for downstream consumers running other patch versions of Node 24.
