# @microsoft/atlas-js

## 1.15.0

### Minor Changes

- a965c36: Updating popover component with more positioning options. Introducing popover with caret variant

## 1.14.0

### Minor Changes

- 6de95c8d: Export a `dispatchAtlasLayoutUpdateEvent` function for easier use downstream.

### Patch Changes

- 6de95c8d: Fix bug where a hidden footer element would still register a height. Layout now always expects a header, but not necessarily a footer, since footers can be rendered within containers too.
- 6de95c8d: Move footer border to child element of layout.

## 1.13.1

### Patch Changes

- 80cb7aa3: Layout to use passive scroll listeners to measure visible header height
- 80cb7aa3: Measurement for atlas-footer-visible-height was not correct.

## 1.13.0

### Minor Changes

- eb988a55: Atlas layout JS should also set the visible height of the header and the visible height of the footer.

## 1.12.1

### Patch Changes

- 9e64093d: The layout related TypeScript should use style.setProperty to avoid downstream conflicts if sets document.documentElement.style.cssText directly.

## 1.12.0

### Minor Changes

- 5bb694db: Add the ability to constrain layouts to the height of the viewport certain screensizes. Desktop+ for holy-grail and tablet+ for other layouts. Excludes the single layout.

## 1.11.0

### Minor Changes

- d21e04e: Added form behavior radio group labeling and error handling.

## 1.10.1

### Patch Changes

- 49b8e1a: Fixed two linting errors on the typescript

## 1.10.0

### Minor Changes

- 501e8fd: Add new tab-container custom element

## 1.9.1

### Patch Changes

- 2dd481b: Add try catch to async before submit to avoid the console errors

## 1.9.0

### Minor Changes

- 0996a70: Support async form before submit handler

## 1.8.0

### Minor Changes

- 334a98f: Add a nosubmit attribute to form-behavior

## 1.7.1

### Patch Changes

- 5380254: Defer form behavior locale strings from loading until after being added to the DOM.

## 1.7.0

### Minor Changes

- 047d7be: Add handling of form submission error state in form behavior

### Patch Changes

- ecd4287: Update LocStrings interface to include added error states.

## 1.6.0

### Minor Changes

- ce5e971: Adding .dismiss component and relevant documentation.

## 1.5.6

### Patch Changes

- 081512f: Add submitter check to ensure only one submit button displays loading state on forms with multiple submit buttons.

## 1.5.5

### Patch Changes

- 12ac95c: Updating form behavior validation so it validates checkboxes correctly and provides an option to hide an error banner.

## 1.5.4

### Patch Changes

- 88e2510: Update form submit is-loading class based on navigation

## 1.5.3

### Patch Changes

- 79fedb5: Update navigation reload to not require href.

## 1.5.2

### Patch Changes

- 2acc13d: Adjust margin classes on form behavior error container
- fa45d12: Fix formAction behavior
- 5445d56: Update form behavior to skip validation for data-skip-validation attribute.

## 1.5.1

### Patch Changes

- 0ec44ce: Updating form behavior logic to use data attributes. Adding form-validating event for no edits scenario. Adding error container bottom spacing for all scenarios.

## 1.5.0

### Minor Changes

- ad1c9a4: Add noUnload attribute handling to form behavior for disabling browser message on page unload.
- 133dec4: Add snap scroll element and relevant documentation
- e0fc0ad: Allow form behavior for export. Removing star rating.

## 1.4.0

### Minor Changes

- d86b7ec: Remove tag validation and add custom event to allow for custom validation/error handling.

### Patch Changes

- f6a2abc: Fix form behavior error summary duplicate messages.

## 1.3.0

### Minor Changes

- c8a9e5e: Add form behavior hash reload handling.

## 1.2.0

### Minor Changes

- d20e762: Add form behavior pattern and relevant documentation.

## 1.1.1

### Patch Changes

- 290e2b5: Update star rating to allow for exporting.

## 1.1.0

### Minor Changes

- 97a0c8b: Adding star rating component and relevant documentation.

## 1.0.2

### Patch Changes

- f4c9147: Add main and source properties to package.json

## 1.0.1

### Patch Changes

- c4f5e55: Patch due to previously unpublished version.

## 1.0.0

### Major Changes

- 34db8e6: Initialize scripts package.
