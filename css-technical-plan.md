# Atlas (CSS) tech plan

## Links

- [Current version of tokens](https://www.figma.com/proto/03HGueCJEx4tyZd3Rhfw5B/DevRel-Design-System?node-id=268%3A343&viewport=1143%2C-507%2C0.08135364204645157&scaling=scale-down-width)

## Task list

👨‍💻 Constitutes a developer task
🆗 Okay
🆕 The product of recent discussions
🆒 Nice to have
💭 Pondering, not ready, but input welcome
🔷 Solidified
⚜ Group or PM task

- fill out all Open Source related files ⚜
  - update project README.md ⚜
  - write initial setup steps 👨‍💻
  - write steps for inclusion in a project 👨‍💻
  - update css folder README.md 👨‍💻
  - review and update CODE_OF_CONDUCT.md (group task / PM task?) ⚜
- add monorepo related files 👨‍💻
  - add top level index file
  - add top level package.json and init monorepo
- implment changesets [changesets](https://github.com/atlassian/changesets) 👨‍💻
- implement tokens (each direct sub list item is a dev task)
  - color tokens 👨‍💻
    - convert tokens to hsla
    - raw colors in palette.scss
    - themed colors in color-themes.scss
  - spacing tokens 👨‍💻
  - typography, font-size tokens 👨‍💻
  - depth/shadow tokens 👨‍💻
  - write tokens readme 👨‍💻
- implement code formatting and linting 👨‍💻
  - requirements:
    - code format on save
    - fast via cli
    - pre-push hook w/husky
  - proposed combination: prettier and stylelint combo, favoring airbnb stylelint presets
- implment mixins folder 👨‍💻
  - catalog shared and shareable mixins from docs-ui
  - split into files and add to mixins
- implement Core folder (each sub item is a dev task)
  - resets (normalize and minireset + custom?) 👨‍💻
  - create css custom properties for theme colors 👨‍💻
  - implement font stack 👨‍💻
  - implement focus styling (focus-visible) 💭 👨‍💻
  - implement a css build for prototyping 💭 👨‍💻
- devops setup
  - github actions on pull_request open 👨‍💻
    - lint (to ensure prepush cannot be avoided and files are in sync)
  - tag and publish on pr to specific branch? 💭
- implement Atomics folder (each sub item is a dev task)
  - spacing atomic classes 👨‍💻
  - depth atomic classes 👨‍💻
  - typography atomic classes 👨‍💻
  - color atomic classes 👨‍💻
- create components folder 👨‍💻
  - create components folder readme and index file
  - Will we be implementing any components as part of this feature 💭
    - columns ?
- plugins (top level folder) 👨‍💻
  - how are plugins structured? 💭
  - add package.json
  - implment post css plugin
  - move theme fallback plugin 👨‍💻

## Folders in /css

The majority of this work will be contained within the /css folder.

### Src

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

#### Tokens

- No output
- Shared variables
- Colors
- Typography

#### Mixins

- No output
- Depends on tokens
- Contains shared mixins and functions

#### Core

- output producing
- reset (normalize / minireset)
- font stack
- css custom properties
- theming
- no classes, except theme

#### Atomics

- single classes that have a very targeted effect
- generally 1 effect - 1 css property
  - with the exception outline color and backgrounds (for focus)
- naming should match property names and values as much as possible
- standardize on `has` or impose new prefix

#### Components

- file names should match the class of the component
- top level classes per file: 1
