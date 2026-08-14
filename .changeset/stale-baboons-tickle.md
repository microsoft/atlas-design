---
'@microsoft/atlas-js': patch
---

Validate the url scheme and origin before navigating after a form submit. `navigateAfterSubmit` previously passed the `Location` response header or the `navigation-href` attribute straight to `location.href` and `location.replace()`, which allowed a `javascript:` url to execute script in the page's origin. Those hrefs are now resolved with `new URL()` and only same-origin `https:` urls are followed; anything else is refused and logged. Relative urls continue to work when the page is served over HTTPS.
