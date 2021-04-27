# Atlas CSS

Welcome to the Atlas CSS framework, the code backing the Atlas design system. This framework is built and maintained by the Developer Relations web team for use across Microsoft.

## Use atlas-css on Code Pen

[Using CodePen as a sandbox](https://codepen.io/wibjorn/pen/JjEzrQN), you can try out the framework.

## Installation

Use NPM to add `@microsoft/atlas-css` to your project.

```sh
# install with NPM
npm install --save @microsoft/atlas-css
```

Alternatively, you may access our scss directly for prototyping purposes at the following url:

```http
https://unpkg.com/browse/@microsoft/atlas-css/index.scss
```

## Project Structure

Each folder has an index file and a README that explains the nature of the folder. Each folder contains an `index.scss` file that imports all files within that folder. All folders can be imported at once via the [top-level index.scss file](.\index.scss).

```txt
css
└───src
    ├───tokens/
    ├───mixins/
    ├───core/
    ├───atomics/
    └───components/
```

### Tokens

The tokens folder is the place where we define variables for use. This folder produces no output when included by itself. It's primary purpose is to provide a central place to define shared values used across the framework.

All variable declarations in the tokens folder make use of the [`!default`](https://sass-lang.com/documentation/variables#default-values) flag, so you can override them by defining your own values before importing atlas-css.
