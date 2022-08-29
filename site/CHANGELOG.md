# @microsoft/atlas-site

## 0.32.2

### Patch Changes

- 4a3714b: Fixing demo example - removing href from paragraph.

## 0.32.1

### Patch Changes

- 79fedb5: Update navigation reload to not require href.
- a7ecfa6: Certain elements should be an article not a div
- Updated dependencies [79fedb5]
  - @microsoft/atlas-js@1.5.3

## 0.32.0

### Minor Changes

- 13de123: Add resource card pattern to site documentation.
- 0327115: Add testimonial card example to card patterns.
- 0327115: Add additional anchor link core styles to ensure correct hover states. No underline by default, but underlined on hover.
- 73e0ba1: Add text alignment atomics and relevant documentation.
- 0327115: Add plain card pattern to site documentation.
- 13de123: Add image component and related documentation.
- 0327115: Add margin-top-auto to spacing auto atomics and update relevant documentation.

### Patch Changes

- 5445d56: Update form behavior to skip validation for data-skip-validation attribute.
- Updated dependencies [2acc13d]
- Updated dependencies [fa45d12]
- Updated dependencies [5445d56]
  - @microsoft/atlas-js@1.5.2

## 0.31.0

### Minor Changes

- a14e7a6: Add stretched-link component and relevant documentation.
- a14e7a6: Add card pattern example that uses .card-template.
- a14e7a6: Add card component and relevant documentation.

## 0.30.0

### Minor Changes

- 7dae960: Add `gap` property atomics and relevant documentation.

### Patch Changes

- 72a1dcc: Update gradient-text example to show partial width gradients.
- Updated dependencies [0ec44ce]
  - @microsoft/atlas-js@1.5.1

## 0.29.0

### Minor Changes

- d23288c: Include .border-color-accent and new `$border-accent` token.
- ff02c45: Add a programatic gradient component and relevant documentation.
- 96dd5af: Add media component and relevant documentation.
- ba7ae35: Add gradient-text-purple-blue class.

## 0.28.0

### Minor Changes

- bf77710: Include a hero component.
- 133dec4: Add snap scroll element and relevant documentation
- bf77710: Add background image pattern plus and relevant documentation.
- bf77710: Add layout-gap placeholder class (~~uhf-container~~).
- bf77710: Add a full screen content section button.
- e0fc0ad: Allow form behavior for export. Removing star rating.

### Patch Changes

- Updated dependencies [ad1c9a4]
- Updated dependencies [133dec4]
- Updated dependencies [e0fc0ad]
  - @microsoft/atlas-js@1.5.0

## 0.27.0

### Minor Changes

- 784a0ac: Adding the new sand and blue-black colors to the palette, as well as new theme color - body-background-accent. Adding the use case example to the site.
- d86b7ec: Remove tag validation and add custom event to allow for custom validation/error handling.

### Patch Changes

- Updated dependencies [d86b7ec]
- Updated dependencies [f6a2abc]
  - @microsoft/atlas-js@1.4.0

## 0.26.0

### Minor Changes

- 87acc49: Add input icons.

### Patch Changes

- Updated dependencies [c8a9e5e]
  - @microsoft/atlas-js@1.3.0

## 0.25.0

### Minor Changes

- d20e762: Add form behavior pattern and relevant documentation.

### Patch Changes

- Updated dependencies [d20e762]
  - @microsoft/atlas-js@1.2.0

## 0.24.0

### Minor Changes

- 95d2e61: Add form field component.

### Patch Changes

- 290e2b5: Update star rating to allow for exporting.
- Updated dependencies [290e2b5]
  - @microsoft/atlas-js@1.1.1

## 0.23.0

### Minor Changes

- 97a0c8b: Adding star rating component and relevant documentation.

### Patch Changes

- Updated dependencies [97a0c8b]
  - @microsoft/atlas-js@1.1.0

## 0.22.0

### Minor Changes

- 27eb7cd: Update site home to reflect root readme for now. Update status section.

### Patch Changes

- Updated dependencies [f4c9147]
  - @microsoft/atlas-js@1.0.2

## 0.21.1

### Patch Changes

- Updated dependencies [34db8e6]
  - @microsoft/atlas-js@1.0.0

## 0.21.0

### Minor Changes

- c37b130: Add radio component and relevant documentation.

### Patch Changes

- 8d6f02c: Add `disabled` section to button documentation.

## 0.20.1

### Patch Changes

- d48aa50: Updating border radius atomics and tokens and relevant documentation.
- 13954f5: Fix `[disabled].button.button-filled` buttons in all semantic colors.

## 0.20.0

### Minor Changes

- 0447774: Adding Select component and relevant documentation.

### Patch Changes

- bc641df: Fix site logo.

## 0.19.0

### Minor Changes

- c18cd7e: Add Toggle element and relevant documentation.
- cd2d8bb: Adding Input and Textarea components and relevant documentation.

## 0.18.0

### Minor Changes

- a222f28: Adding table modifiers; updating site with relevant documentation.

### Patch Changes

- 1b7816d: Update dependencies.
- be9c41d: Fixing popover's closing even listener.

## 0.17.0

### Minor Changes

- 2e4d5fb: Add checkbox component.
- 21a6973: Add width Atomic classes and relevant documentation.

### Patch Changes

- 9e17017: Add figma design file to the popover page.

## 0.16.1

### Patch Changes

- 9c5ec09: Add data-popover-close attribute to allow an additional closing method to the popover.

## 0.16.0

### Minor Changes

- 6ef8090: add link button documentation and a reference to it in .button docs

### Patch Changes

- ffe7c88: Add small border to .popover-content, equivalent to .border class.

## 0.15.0

### Minor Changes

- fe35d1b: Use logical properties under the hood in spacing Atomics.
- 324a1ff: Add feature to allow Figma embed to be fullscreened.
- f631ec0: Direction related position atomics (i.e right-0, top-0, etc) use logical properties under the hood.
- 21fe2ea: Adding event listeners to popover.

## 0.14.1

### Patch Changes

- f257d65: Add an aria-label to GitHub link

## 0.14.0

### Minor Changes

- 744945d: Add documentation of overflow related Atomic classes.
- b11b25d: Add horizontal spacing atomics that target margin: auto. Ex. .margin-inline-auto, .margin-left-auto-tablet.
- 0f78ac7: Add documentation for flex atomics.
- 6b6cf9d: Add .list-style-none atomic class for reseting lists.
- 4b6dc4a: Update breadcrumbs component to allow for an optional initial slash.
- 744945d: Add .scroll-<vertical|horizontal> components and relevant documentation.
- 4b6dc4a: Document the article header pattern.

### Patch Changes

- 95dccef: Add accessibility guidance for .list-style-none

## 0.13.0

### Minor Changes

- ed0b3f0: Add documentation for shadow atomics.
- 4558b41: Include new md option for specifying border. Update border token values.

### Patch Changes

- f62359a: Remove atlas dotcss resolver for css dependencies with .css in the name of the npm package. Instead include those dependencies directly as scss files.
- 9b49c14: Update dependencies.

## 0.12.0

### Minor Changes

- a180785: Extend font size atomics with tablet-specific classes

## 0.11.1

### Patch Changes

- b81276d: Updating the footer's background color.

## 0.11.0

### Minor Changes

- f1e9851: Add breadcrumb component and relevant documentation

## 0.10.0

### Minor Changes

- f26be99: Generate breadcrumbs from table of contents, refine site layout.
- 783d23a: Add a -lg modifier on border. Add ability to modify standard border color with semantic colors.

## 0.9.1

### Patch Changes

- 23b2052: Update spacing classes across documentation.

## 0.9.0

### Minor Changes

- 5254181: Update with guidance on naming components and atomic sizes.

### Patch Changes

- 085fdbe: Update dependencies.

## 0.8.0

### Minor Changes

- 62b4864: Add explicit combination for .button.button-clear and .border, which allows for flexible button colors by using currentColor.

## 0.7.0

### Minor Changes

- 05fceca: Add documentation for spacing.
- e1bd4ae: Added a CSP to both standard and token pages.
- 2efa7b5: Add eslint to /site scripts as well as tsc --noEmit type checking.

## 0.6.1

### Patch Changes

- d7eb16b: Add .htmlnanorc file and prevent SVG minification.

## 0.6.0

### Minor Changes

- c536351: Create Atomics overview page.
- f3336b7: Add initial version of theme switch to Atlas site.
- 17d007f: Add documentation for Button component.
- 3d906fb: Add documentation for display atomics.

## 0.5.1

### Patch Changes

- 1aa4634: Upgrade Parcel deps.
- 65129ae: Add ability to add figmaEmbed to yaml front matter.

## 0.5.0

### Minor Changes

- 8f3540a: Adds support for a filterable Atomics code block and input.

## 0.4.0

### Minor Changes

- 312ea3b: Add documentation for typography atomics.

### Patch Changes

- 6bd9a94: Update position documentation.

## 0.3.0

### Minor Changes

- 5d1b243: Update site layout on tablet and above.

## 0.2.1

### Patch Changes

- 14cf4ef: Patch change to remove code block and move to design system site styles. Keeping at patch because we're not at v1 yet.

## 0.2.0

### Minor Changes

- 62d8d0d: Add markdown styling, add new markdown page and new code block page. Update styling of table of contents.

## 0.1.1

### Patch Changes

- 7f1a57d: Minor content changes to site.

## 0.1.0

### Minor Changes

- 89c2c1e: Provides initial groundwork to render some token pages automatically via the tokens.json generated by the atlas-css package.

## 0.0.2

### Patch Changes

- 7c5886e: Create (very) basic website.
- da5d51f: Add table of contents generation.
