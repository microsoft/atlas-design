---
'@microsoft/atlas-js': major
---

Validate the url scheme and origin before navigating after a form submit. `navigateAfterSubmit` previously passed the `Location` response header or the `navigation-href` attribute straight to `location.href` and `location.replace()`, which allowed a `javascript:` url to execute script in the page's origin.

**Breaking change:** Form navigation now supports only same-origin `https:` urls. Navigation to cross-origin urls, `http:` urls, and other url schemes is no longer supported. Refused navigation is logged and returns `false`.
