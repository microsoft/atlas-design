# Atlas JS

Welcome to TypeScript/JavaScript code backing the Atlas Design system. While Atlas endeavors to find CSS-only strategies for creating modern UI patterns, there are times when writing behavior code is necessary. These cases tend to fall into a one of several categories.

- A component's markup / attributes require changing upon interaction for compatibility with screen readers or other assistive technology.
- A particular pattern is a good candidate for a re-usable web component. That is, its behavior is relatively straightforward and lightweight.

## Installing this package

Install the `@microsoft/atlas-js` package in your project's dependencies.

```
npm i @microsoft/atlas-js;
```

## Accesssing its Typescript through the `src` folder

Include the index file directly to add behaviors to your scripts.

```ts
import '@microsoft/atlas-js/src/index';
```

## Accessing the built JS through the `dist` folder

```js
import '@microsoft/atlas-js/dist/index';
```

Or include a script tag to pull the built JavaScript from UNPKG.

```html
<script src="https://unpkg.com/@microsoft/atlas-js@0.0.1/dist/index.js" type="module" defer>
```
