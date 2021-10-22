# Atlas CSS Tokens

A design tokens is a definition of a design-related variable, such as one that affects color, typography, or spacing. Design tokens must be shareable and fairly platform agnostic. Atlas's design tokens are written in Scss (buzzword: source of truth!), and though a [build process](https://github.com/microsoft/atlas-design/blob/main/css/tokens/index.js), translated and published into JSON so they can be more easily shared by solutions that do not use Scss.

## Access our design tokens

Firstly, in order to access these tokens, you must have installed atlas-css in your project. [See installation steps]('https://github.com/microsoft/atlas-design'). Once this is complete, you'll need to decide whether you want to reference them in Scss or JSON.

### Get Scss from NPM

Reference our tokens in Scss via the following examples, where `./` is the path to your `node_modules` folder.

```scss
// Import by referencing node_modules
@import './node_modules/@microsoft/atlas-css/src/tokens/index.scss';
// OR if using a bundler like Parcel you may just reference the package directly
@import '@microsoft/atlas-css/src/tokens/index.scss';
```

### Get JSON from NPM

In NodeJs, referencing `node_modules` will also allow you to access the token [JSON](http://unpkg.com/browse/@microsoft/atlas-css/dist/tokens.json), which lives at `/dist/tokens.json`.

You can also access the [TypeScript typings](https://unpkg.com/browse/@microsoft/atlas-css/dist/tokens.d.ts) in the same directory. Note the JSDoc comment in the example below.

```js
/**
 * Atlas Design Token Types
 * @type {import('@microsoft/atlas-css/dist/tokens').AtlasTokens}
 */
const atlas = require('@microsoft/atlas-css/dist/tokens.json');
// Access the tokens!
const lightTheme = atlas.themes.tokens.$themes.light;
```
