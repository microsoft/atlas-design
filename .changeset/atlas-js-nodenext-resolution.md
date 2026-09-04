---
'@microsoft/atlas-js': major
---

`@microsoft/atlas-js` is now a formal ES module and supports consumers using `moduleResolution: "bundler"` and `"nodenext"`.

**BREAKING CHANGE:** the package now declares `"type": "module"` (it is ESM-only) and ships an `"exports"` map.

- **ESM and bundler consumers** need no changes — `import { … } from '@microsoft/atlas-js'` works as before, and the `@microsoft/atlas-js/src/index` source entry plus `./dist/*` paths remain available through `exports`.
- **CommonJS consumers** can no longer `require('@microsoft/atlas-js')` synchronously and must use a dynamic `import('@microsoft/atlas-js')` instead. (The package already emitted ESM, so synchronous `require` did not work previously either.)

Types now resolve through the `exports` `types` condition, and the compiled output's relative import/export specifiers include `.js` extensions so Node ESM and `nodenext` resolve the full module graph.
