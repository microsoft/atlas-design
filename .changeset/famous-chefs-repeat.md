---
'@microsoft/atlas-js': patch
---

Fix bug where a hidden footer element would still register a height. Layout now always expects a header, but not necessarily a footer, since footers can be rendered within containers too.
