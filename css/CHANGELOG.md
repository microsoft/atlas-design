# @microsoft/atlas-css

## 1.0.0

### Major Changes

- 9b277cb: Upgrade to Node 16.6 and replace sass-extract with sass-export.

## 0.13.0

### Minor Changes

- 17d007f: Add Button component.

### Patch Changes

- 17d007f: Modify success:base and danger:base and danger:invert on dark theme.

## 0.12.0

### Minor Changes

- 0772431: Add table component.

### Patch Changes

- 8a29033: Modify secondary background color so as not to conflict with -medium background on dark theme.
- 1aa4634: Upgrade Parcel deps.

## 0.11.0

### Minor Changes

- c3ada0a: Add xxs size to spacing tokens and atomics.

### Patch Changes

- b0dc574: Adjust spacing output based on specificity.
- 467d212: Updating colors atomics output order.
- f0faf47: Update inline code color on dark and high contrast.
- 329557f: Updating position and display atomics output order.

## 0.10.1

### Patch Changes

- 2c0e154: .border-high-contrast(-hover) needs !important.

## 0.10.0

### Minor Changes

- c9dfa1f: Add flex responsive class
- 00e85c4: Add position atomic classes.

### Patch Changes

- 2e1de30: Adding font-family helper classes.

## 0.9.0

### Minor Changes

- 5e65be7: Add border tokens and atomics.

## 0.8.2

### Patch Changes

- 2ec32c2: Bugfix: rfs is a normal dependency.
- d9631db: Update success green on dark theme.

## 0.8.1

### Patch Changes

- 39bb47a: Fix hyperlink variable css custom prop.

## 0.8.0

### Minor Changes

- 92ad4d1: Adding new hyperlink value to theme.

## 0.7.2

### Patch Changes

- bcad59b: Update color values for success and info base to hit contrast requirements for dark theme.

## 0.7.1

### Patch Changes

- 14cf4ef: Patch change to remove code block and move to design system site styles. Keeping at patch because we're not at v1 yet.

## 0.7.0

### Minor Changes

- 62d8d0d: Add markdown element for bare article styles.
- 71996af: Add element spacing tokens.

## 0.6.2

### Patch Changes

- dcf0d05: Condensing available background colors to body, body-medium, alternate, and alternate medium.

## 0.6.1

### Patch Changes

- 1611f76: Fix issue where body-background-dark had the incorrect value on dark theme.

## 0.6.0

### Minor Changes

- b9a9896: Renaming animation token file

## 0.5.0

### Minor Changes

- 89c2c1e: Implement a token build using sass-extract. Outputs tokens.json in the dist folder.
- aa29142: Adds a prepublish script for css and tokens.

### Patch Changes

- 2d30074: Adding !default flag to focus-visible-use-polyfill.

## 0.4.0

### Minor Changes

- db3c4b7: Add spacing tokens and classes
- 020872c: Add typography tokens
- 31df837: Add Flex Atomic
- 0abb010: Add color atomic classes
- 3c0a646: Add animations, direction, focus, layout, and radius tokens.
- 19d2891: Add Shadow Atomic
- 0a78aca: Adding scheme tokens
- fa12e35: Add theme related custom property to /core.
- 02a8241: "Add default focus styles"
- 689c26f: Add Typography classes
- a6911bb: Add font stack"

### Patch Changes

- fda50fd: Fix breakpoint names.
- 2454cba: Changing Color pallette value from HSLA to Hex
- 549c1a1: Add component folder

## 0.3.0

### Minor Changes

- 65640d8: Add core folder. Import normalize and minireset into the core folder.
- 06e8980: Add token values for breakpoints. Create the mixins folder and use tokens to as basis for media query mixins.
- 8f8a97c: Adding z-index
- 2191e70: Adding color palette and theme map.
- 2e375cc: Revamp breakpoint variable names.
- b56b715: Adding tokens for box shadow.

### Patch Changes

- 0627ee4: Adding prettier code formatting in combination with stylelint. AirBnb lint presents provide the base, and stylelint-config-prettier disables rules that may conflict with prettier.
- 8203c36: Implement Dart Sass build and CI.
- a66afda: Add CODEOWNERS file and GitHub pull request template.

## 0.2.0

### Minor Changes

- Preliminary scaffolding work. Add index.scss and tokens folder. Update README files.

## 0.0.2

### Patch Changes

- Begin using changesets in the project.
