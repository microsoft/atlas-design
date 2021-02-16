# Atlas (CSS) tech plan

## Task list

- update project README.md (group task / PM task?)
- update css folder README.md
- review and update CODE_OF_CONDUCT.md (group task / PM task?)
- implement tokens
  - colors
    - raw colors in palette.scss
    - themed colors in color-themes.scss
  - spacing
  - typography, font-size.scss
  - depth
- fill out all Open Source related files
- implement code formatting and linting
- devops setup
  - github actions on pull_request open
    - lint
    - changealog?
    - version checks?

### Questions to solve later

- How to expose both tokens as well as plain css.
- Bundle size stats from the very beginning?

### Build Related

- CLI or scss.
- Is build perf a major issue?
  - If not, what about ts-node?
  - If so, what about just js.
- Post CSS plugin for IE

## Src

Each folder has an index file and a README that explains the nature of the folder. See below.

Proposed initial folder structure.

```txt
css
└───src
    ├───tokens
    ├───mixins
    ├───core
    ├───atomics
    └───components
```

### Tokens

- No output
- Shared variables
- Colors
- Typography

### Mixins

- No output
- Depends on tokens
- Contains shared mixins and functions

### Core

- output producing
- reset (normalize / minireset)
- font stack
- css custom properties
- theming
- no classes, except theme

### Atomics

- single classes that have a very targeted effect
- generally 1 effect - 1 css property
  - with the exception outline color and backgrounds (for focus)
- naming should match property names and values as much as possible
- standardize on `has` or impose new prefix

### Components

- file names should match the class of the component
- top level classes per file: 1
