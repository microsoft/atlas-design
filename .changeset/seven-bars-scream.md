---
'@microsoft/atlas-site': minor
'@microsoft/atlas-css': minor
---

Adjust the maximum widths of sidebar elements on relevant layouts. The menu and aside elements will continue to have a default width of 275px, but scale up to 320px at 1500px, then 450px at 1800px wide. When the flyout is active and the screen width is below 2300px, each of those containers will scale down one step lower. For example, the `.layout-body-menu` at 1600px will decrease from 320px wide to 275px wide when the flyout is active. Added relevant documentation to the site.
