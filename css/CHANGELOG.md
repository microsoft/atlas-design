# @microsoft/atlas-css

## 4.0.0

### Major Changes

- a965c36: Updating popover component with more positioning options. Introducing popover with caret variant

## 3.67.0

### Minor Changes

- 7deedd9: Accordion will no longer have color change on hover.

## 3.66.0

### Minor Changes

- 56f26c5: Adding palette, colors, and themes tokens and updating buttons to have a selected state

## 3.65.0

### Minor Changes

- 8d53175: Add a suggestion pill for the chat pattern and update tag.md documentation.

## 3.64.0

### Minor Changes

- f018d59: Updating the default width of the layout's flyout container to be 320px on desktop screen sizes.

## 3.63.0

### Minor Changes

- 26fe8b0e: Update body background and body background medium color to a Fluent color.

## 3.62.0

### Minor Changes

- 494a4465: Update filled tag and progress bar background color.

## 3.61.0

### Minor Changes

- b4a25e22: Adds CSS to support a help or error validation message in the chat textarea

## 3.60.0

### Minor Changes

- beea19dd: Update warning color to match Fluent 2 colors.
- 0c61b765: Update primary colors to align with Fluent 2 colors.
- 53d1cbc9: Fixing default chevron icon appearance in accordion component.
- a9f36c4e: Update success colors to match Fluent 2 colors.
- 25a4e2ec: Update table, code block, inline code, default hover invert with greys from new grey palette. Update gradient text blue color. Update facepile colors.
- 8e512e90: Update secondary color to align with Fluent 2 colors.
- 9460d2f3: Update danger color to match Fluent 2 colors.
- 57af6b9f: Update the padding and width of the message component

## 3.59.0

### Minor Changes

- 6940e18f: Updating button's hover styles in site-header
- d6a18063: Update badge styles to handle icon only badges. Add new extra large badge size.
- 3c48da87: Added timeline pattern and css styles.

## 3.58.0

### Minor Changes

- 920130ee: Blocking underlines on hover for site header buttons

## 3.57.2

### Patch Changes

- 6de95c8d: For the layout component, the height of the header's grid track should be minmax(auto, max-content) to ensure proper height constraint happens.
- 6de95c8d: Stop accounting for rounding in calculations and remove -1px in the --atlas-contained-height property.

## 3.57.1

### Patch Changes

- eb988a55: Remove two pixel adjustment from layout-constrained-height's declaration.
- 959240b4: The z-index of the site-header's panels should not be dropdown, which is "in content." It should be popover, which is "on content"

## 3.57.0

### Minor Changes

- bbac9cfd: Add `-tablet` suffixed version of `.layout-padding` and `.layout-gap`.

## 3.56.0

### Minor Changes

- ad81e9f8: Add steps component and documentation

## 3.55.1

### Patch Changes

- dfc0a22c: Flyout to render under the header and footer not adjacent to them.

## 3.55.0

### Minor Changes

- f0dde112: Accordion typo - removing the unnecessary child selector

## 3.54.0

### Minor Changes

- bd2f360a: Adding Accordion component and relevant documentation.

### Patch Changes

- 0f89f529: Add !important flag to line-height-normal and white-space atomics.

## 3.53.0

### Minor Changes

- bef61ab0: Add animation-none class to allow to easily disable animation.
- bef61ab0: Add flyout component to layouts and add relevant documentation.
- 49e9c2e7: Add white-space property

### Patch Changes

- cfec0da1: Add underline to banner and notification links

## 3.52.0

### Minor Changes

- 5bb694db: Add the ability to constrain layouts to the height of the viewport certain screensizes. Desktop+ for holy-grail and tablet+ for other layouts. Excludes the single layout.

## 3.51.0

### Minor Changes

- 8bd9bcf1: Add .width-fit-content as additional width class

## 3.50.1

### Patch Changes

- 33f3ec64: The changeset is to fix a style inheritence problem in the list element which ensures that the list style is applied to all the list items.

## 3.50.0

### Minor Changes

- c948faf8: Add a even two container layout to the layout component - called `.layout-twin`.

## 3.49.0

### Minor Changes

- 2d6bf161: Add scrollbar-gutter atomics

### Patch Changes

- 1441c85d: Refactor all layouts to use minmax(0 Xfr), where prior they were Xfr.

## 3.48.0

### Minor Changes

- 2cb01a07: Adding tag component and relevant documentation.
- fd2c51bb: Update popover to support a popover that opens upwards

## 3.47.1

### Patch Changes

- a0cadb3f: Separate background pseudo-class selectors in progress-bar.scss

## 3.47.0

### Minor Changes

- 14414e17: Added overflow-x-hidden atomic class and relevant documentation.
- 14414e17: Added height-full atomic class and relevant documentation.
- 69e08b8d: Adding progress bar component and relevant documentation.

### Patch Changes

- c7d60a57: Update icons in toggle, checkbox, and radio components.

## 3.46.0

### Minor Changes

- f116517: Add .textarea-form component for copilot-like chat experiences and update relevant documentation.

### Patch Changes

- 5bb9a72: Update the bottom border on input, textarea, and select components.

## 3.45.0

### Minor Changes

- d0f3993: Adding badge component and relevant documentation.

### Patch Changes

- a208e58: Update the border radius on controls from 2 to 4 px
- 7a2a402: Adding border-radius-none atomic and updating relevant documentation.

## 3.44.2

### Patch Changes

- 79f1152: Remove buttons' Firefox-only tiny focus rings, which would sometimes beat out Atlas's default focus outlines

## 3.44.1

### Patch Changes

- 93044c9: Update list-style-none to impact markers in iOS mobile.

## 3.44.0

### Minor Changes

- a9df9d9: remove flex-basis-auto
- b9993a0: add support for flex-basis

## 3.43.0

### Minor Changes

- 501e8fd: Add new segmented-control component and relevant documentation.

## 3.42.1

### Patch Changes

- b4c3129: Removed explicit flex-direction from the hero component in favor of atomics.

## 3.42.0

### Minor Changes

- 19ea734: Removing a superfluous width property on hero-content

## 3.41.0

### Minor Changes

- bbf8d69: Added the `.hero-details` hero component variant.

## 3.40.0

### Minor Changes

- ba94377: Updating line-clamp mixin so important flag doesn't applied by default.
- ba94377: Removing background color from card's title.
- ba94377: Adding site-header component and relevant documentation.
- 57d1883: Introduce a .text-wrap-pretty typography atomic
- ba94377: Applying !important flag to position atomics.
- ba94377: Adding a few color atomics - color-hyperlink, background-color-transparent, background-color-body-accent-onhover.
- 7f14950: Update the default font on Windows from Segoe UI to Segoe UI Variable

## 3.39.1

### Patch Changes

- 523688a: Supply a contrasting outline-color for background-color-white-static and background-color-black-static atomics
- 26c9089: Updating dependencies

## 3.39.0

### Minor Changes

- cac3567: Set hero image direction to prevent image flipping for rtl

## 3.38.1

### Patch Changes

- c5e15e6: Prevent message content from expanding grid items

## 3.38.0

### Minor Changes

- 46e987b: Add sidecar-left and sidecar-right layouts and relevant documentation.
- 5708e1f: Add a layout component to provide a flexible way of specifying a site's layout with minimal nesting.

## 3.37.1

### Patch Changes

- 1c892d1: Update message styles to support smaller size messages.

## 3.37.0

### Minor Changes

- ae05959: Add standardized message styles

### Patch Changes

- 9a4479a: Updating persona's name font-weight.

## 3.36.1

### Patch Changes

- 131a22d: Updating line-height value in persona component.

## 3.36.0

### Minor Changes

- beef07a: Adding persona component.

## 3.35.0

### Minor Changes

- ced713d: Adding new aspect ratio atomic

## 3.34.2

### Patch Changes

- 5d1ccfc: Adds object-fit-cover css class to image atomics

## 3.34.1

### Patch Changes

- 5c3b764: Adding !important to the color atomic class.
- b3bca12: Updating warning text color to pass color contrast requirements.

## 3.34.0

### Minor Changes

- ce5e971: Adding .dismiss component and relevant documentation.
- ce5e971: Updating .notification and .banner components to show .dismiss component within nicely.

## 3.33.0

### Minor Changes

- f16147e: Adding gradient-card component and relevant documentation.

## 3.32.2

### Patch Changes

- 6e9a8f3: Fix issue where border atomics did not use logical properties.
- 855f61f: Adds new color theme to gradient-text-\* base class.

## 3.32.1

### Patch Changes

- 5fdc26a: Fixing notification's icon position.
- 5fdc26a: Fixing notification and banner components line-heights.

## 3.32.0

### Minor Changes

- 7231abf: Adds gradient vivid colors.

## 3.31.0

### Minor Changes

- 5aebf54: Adding line-height-normal typography atomic and updating relevant documentation.
- c9e0b4a: Adding banner component and relevant documentation.
- 5aebf54: Adding text-align-left typography atomic and updating relevant documentation.
- 86ac418: For browsers that support target-text, update the background color to make text and URLs more visible when highlighted
- c9e0b4a: Adding notification component and relevant documentation.

### Patch Changes

- afc478a: Updating button's icon size.

## 3.30.0

### Minor Changes

- fff80fc: Updating buttons' icon sizes.

## 3.29.0

### Minor Changes

- 12ac95c: Updating checkbox component with validation colors and sizes.

## 3.28.0

### Minor Changes

- e517d9a: add a where(.is-focused) class to allow for programatic management of focus

## 3.27.2

### Patch Changes

- 68c9fb7: Disabled radio should not have hover styles.

## 3.27.1

### Patch Changes

- 40cd6f5: On light theme, darkens text from #171717 to #161616 in order to ensure adequate contrast (3:1) between hyperlink color and paragraph text color.

## 3.27.0

### Minor Changes

- a1ab928: Ensure forced colors mode doesn't interfere with fill: currentColor

## 3.26.0

### Minor Changes

- bb88708: Generate json data for all class names in dist bundle.

## 3.25.2

### Patch Changes

- e8f6f04: Card horiztonal needs flex-shrink in card footer.

## 3.25.1

### Patch Changes

- 01a019c: Add flex-grow to .card-template. That container needs to grow to push the footer down.

## 3.25.0

### Minor Changes

- 0327115: Add additional anchor link core styles to ensure correct hover states. No underline by default, but underlined on hover.
- 73e0ba1: Add text alignment atomics and relevant documentation.
- 13de123: Add image component and related documentation.
- 0327115: Add margin-top-auto to spacing auto atomics and update relevant documentation.

### Patch Changes

- 13de123: Add resource card pattern to site documentation.

## 3.24.0

### Minor Changes

- a14e7a6: Add stretched-link component and relevant documentation.
- a14e7a6: Add card component and relevant documentation.

## 3.23.0

### Minor Changes

- 7dae960: Add `gap` property atomics and relevant documentation.

## 3.22.0

### Minor Changes

- d23288c: Include .border-color-accent and new `$border-accent` token.
- ff02c45: Add a programatic gradient component and relevant documentation.
- 21f8220: Add several atomics for repeating backgrounds.
- 96dd5af: Add media component and relevant documentation.
- ba7ae35: Add gradient-text-purple-blue class.

### Patch Changes

- 21f8220: Remove background-image pattern, which is unnecessarily long (3000chars).

## 3.21.0

### Minor Changes

- bf77710: Include a hero component.
- 133dec4: Add snap scroll element and relevant documentation
- bf77710: Add background image pattern plus and relevant documentation.
- bf77710: Add layout-gap placeholder class (~~uhf-container~~).

## 3.20.1

### Patch Changes

- aa917a4: Remove input-sm default padding.

## 3.20.0

### Minor Changes

- 784a0ac: Adding the new sand and blue-black colors to the palette, as well as new theme color - body-background-accent. Adding the use case example to the site.

## 3.19.0

### Minor Changes

- 87acc49: Add input icons.

## 3.18.0

### Minor Changes

- d20e762: Add form behavior pattern and relevant documentation.

## 3.17.0

### Minor Changes

- 95d2e61: Add form field component.

## 3.16.0

### Minor Changes

- 97a0c8b: Adding star rating component and relevant documentation.

## 3.15.1

### Patch Changes

- feddc7d: Fix radio off-centered dot and background color issues.

## 3.15.0

### Minor Changes

- f7aee90: Updated :where rules for inheriting focus outlines in bare elements.

## 3.14.0

### Minor Changes

- 2a6d9c8: Add object-fit-fill atomic class.

## 3.13.1

### Patch Changes

- b637b59: Update unchecked radio button hover color.

## 3.13.0

### Minor Changes

- c37b130: Add radio component and relevant documentation.

### Patch Changes

- 0934c3a: Updates uses of focus-visible class instances with mixin that can pivot between psuedo-selector and class.

## 3.12.5

### Patch Changes

- d48aa50: Updating border radius atomics and tokens and relevant documentation.
- 13954f5: Fix `[disabled].button.button-filled` buttons in all semantic colors.

## 3.12.4

### Patch Changes

- 4ec3f5b: Updating controls with fixed border radius for all sizes.

## 3.12.3

### Patch Changes

- 20d5731: Fix button colors for button-filled disabled + loading state.
- d470bf6: Adding control-border to the theme palette and applying it to the form controls.
- d470bf6: Fixing select component font size.

## 3.12.2

### Patch Changes

- ad96c61: Fixing the select component size variations.

## 3.12.1

### Patch Changes

- 561e2dd: Update checkbox positioning.

## 3.12.0

### Minor Changes

- 0447774: Adding Select component and relevant documentation.

## 3.11.0

### Minor Changes

- c18cd7e: Add Toggle element and relevant documentation.
- cd2d8bb: Adding Input and Textarea components and relevant documentation.

## 3.10.0

### Minor Changes

- a222f28: Adding table modifiers; updating site with relevant documentation.

### Patch Changes

- 1b7816d: Update dependencies.
- 3002855: Update control-sm & control-lg font size variables.
- 0b98193: Bugfix: in popover component, use logical properties instead of `left` and `right`.

## 3.9.0

### Minor Changes

- 2e4d5fb: Add checkbox component.
- 21a6973: Add width Atomic classes and relevant documentation.

### Patch Changes

- 6ab0c3e: Details bare element box-sizing bugfix.

## 3.8.2

### Patch Changes

- 43b3463: Update bare-element styling on details > \* to be more specific. Previous details box sizing fix was not being applied.

## 3.8.1

### Patch Changes

- ffe7c88: Add small border to .popover-content, equivalent to .border class.

## 3.8.0

### Minor Changes

- fe35d1b: Use logical properties under the hood in spacing Atomics.
- f631ec0: Direction related position atomics (i.e right-0, top-0, etc) use logical properties under the hood.
- 2e5a68a: update core folder to include a bare-elements.scss file for styling bare elements. Include chromium bugfix for <details> box sizing lack of inheritance.
- a42f4b7: Convert existing components to use logical properties.

## 3.7.0

### Minor Changes

- b11b25d: Add horizontal spacing atomics that target margin: auto. Ex. .margin-inline-auto, .margin-left-auto-tablet.
- 744945d: Add overflow related Atomic classes.
- 6b6cf9d: Add .list-style-none atomic class for reseting lists.
- 4b6dc4a: Update breadcrumbs component to allow for an optional initial slash.
- 744945d: Add .scroll-<vertical|horizontal> components and relevant documentation.

## 3.6.0

### Minor Changes

- 775bfd7: Add flex-wrap-nowrap and flex-wrap-nowrap-tablet Atomics.
- 775bfd7: Add flex-direction-row(-tablet) to Atomics to allow for screensize specific layout shifts with flex Atomics only.
- 4558b41: Include new md option for specifying border. Update border token values.
- b766e38: Added .object-fit-contain and .object-position-top in new image-related Atomics file (/src/atomics/image.scss)

### Patch Changes

- f62359a: Remove atlas dotcss resolver for css dependencies with .css in the name of the npm package. Instead include those dependencies directly as scss files.
- 9b49c14: Update dependencies.

## 3.5.0

### Minor Changes

- a180785: Extend font size atomics with tablet-specific classes

## 3.4.0

### Minor Changes

- 8f87caa: Add popover component and relevant documentation

## 3.3.0

### Minor Changes

- 4582928: Add print media query mixin.
- f1e9851: Add breadcrumb component and relevant documentation

## 3.2.0

### Minor Changes

- a0536cc: Update widescreen breakpoint to 1800px.
- 0ecbae0: Add .line-clamp-<n> classes to Atomics.

### Patch Changes

- bbe6f20: Updating the box-shadow dark and hc themes colors values to match the light theme

## 3.1.1

### Patch Changes

- 54ea0dd: add min-height to control & remove height auto from .button to fix icon button height

## 3.1.0

### Minor Changes

- 783d23a: Add a -lg modifier on border. Add ability to modify standard border color with semantic colors.

### Patch Changes

- 6a0de3b: .button has text-decoration none to ensure no underline on anchor elements.
- 7455111: update .button to remove white-space: nowrap and add height: auto to ensure text wrap

## 3.0.0

### Major Changes

- 65749fb: Update font-size atomics to two letter t-shirt size convention.

## 2.0.0

### Major Changes

- 0f8102a: Adjust nomenclature pattern for sizes in Atomics and Button component. s -> sm, m -> md, l -> lg.

### Patch Changes

- 085fdbe: Update dependencies.

## 1.3.0

### Minor Changes

- 62b4864: Add explicit combination for .button.button-clear and .border, which allows for flexible button colors by using currentColor.

### Patch Changes

- 1998f3f: Ensure inner focus outline offset matches outline width.
- 4dad0be: Update .buttons subclasses to follow component naming conventions.
- e9c3ca9: Normalized scss imports

## 1.2.0

### Minor Changes

- 54ff1db: Add black and white static color classes for text and background.

## 1.1.0

### Minor Changes

- 8950443: Add sticky to positions. Makes class .position-sticky available.

### Patch Changes

- 3d1df51: Move the .buttons component to components folder.

## 1.0.1

### Patch Changes

- 9c7f501: Responsive font size rule generator can include important.
- a67a553: Ignore stylelint within responsive font size function.

## 1.0.0

### Major Changes

- 9b277cb: Upgrade to Node 16.6 and replace sass-extract with sass-export.

### Minor Changes

- 062f640: Replace responsive font sizing (package:rfs) dependency with clamp based solution.

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
