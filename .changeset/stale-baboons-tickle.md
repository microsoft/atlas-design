---
'@microsoft/atlas-js': patch
---

Validate the url scheme before navigating after a form submit. `navigateAfterSubmit` previously passed the `Location` response header or the `navigation-href` attribute straight to `location.href` and `location.replace()`, which allowed a `javascript:` url to execute script in the page's origin. Those hrefs are now resolved with `new URL()` and only `http:` and `https:` are followed; anything else is refused and logged. Relative and absolute `http(s)` urls, including cross-origin ones, navigate exactly as before.
