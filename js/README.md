# Atlas JS

JavaScript behaviors and lightweight web components for the [Atlas Design System](https://github.com/microsoft/atlas-design). Atlas prefers CSS-first patterns; this package exists for cases where CSS alone cannot meet accessibility requirements or where a lightweight web component is the right fit.

## Install

```sh
npm i @microsoft/atlas-js
```

## Import

Built JS (default entry, from `dist/`):

```js
import '@microsoft/atlas-js';
```

TypeScript source (for tree-shakeable named imports from `src/`): `import { createLayoutState } from '@microsoft/atlas-js/src/index'`

## Notable behaviors

- **`createLayoutState`** (in `behaviors/layout`) — persists and restores `layout-*` classes on `<html>` across page loads, with optional `document.startViewTransition` support. See the [Layout component docs](https://github.com/microsoft/atlas-design/blob/main/site/src/components/layout.md#persisting-layout-state-across-page-loads) for the inline-script pattern that restores classes **before first paint**, and the JSDoc in [`src/`](https://github.com/microsoft/atlas-design/tree/main/js/src) for full API details.
