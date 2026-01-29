# Atlas CSS - Copilot Instructions

applyTo: "css/\*\*"

This is the `@microsoft/atlas-css` package, a SCSS/CSS framework for the Atlas Design System used by Microsoft's Developer Relations.

## Package Overview

- **Name**: `@microsoft/atlas-css`
- **Type**: CSS/SCSS framework
- **Build Tool**: Parcel with wireit
- **Linter**: Stylelint with `@microsoft/stylelint-config-atlas`

## Project Structure

```
css/
├── src/
│   ├── tokens/      # Design tokens (variables, colors, spacing)
│   ├── mixins/      # Reusable SCSS mixins
│   ├── core/        # Base styles and resets
│   ├── atomics/     # Atomic/utility classes
│   └── components/  # Component styles
├── dist/            # Built CSS output
├── tokens/          # Token generation scripts
└── class-names/     # Class name extraction scripts
```

## Key Commands

- `npm run build` - Build CSS, generate tokens, and extract class names
- `npm run lint` - Run stylelint on SCSS files
- `npm run lint-fix` - Auto-fix stylelint issues
- `npm run start` - Watch mode for development

## Coding Guidelines

### SCSS Conventions

1. **Use `!default` flag** for all variable declarations in the tokens folder
2. **Follow project naming directions**, which are listed in `css/src/components/README.md`.
3. **Prefer logical properties** (e.g., `margin-inline` over `margin-left/right`)
4. **Font sizes must use `rem` or `em` units** - pixels are not allowed
5. **Maximum nesting depth is 3 levels**
6. **No vendor prefixes** - handled by build tooling
7. **No ID selectors** - use classes only
8. **Maximum specificity**: `0,4,1`

### Property Order

Properties should be ordered as defined in stylelint-config-atlas:

1. Display and position
2. Flexbox/Grid properties
3. Box model (width, height, margin, padding)
4. Visual (border, background, color)
5. Typography
6. Misc (cursor, overflow, z-index)

### File Organization

- Each folder has an `index.scss` that imports all files within
- New components go in `src/components/`
- New utilities go in `src/atomics/`
- Shared values go in `src/tokens/`

## When Making Changes

1. Run `npm run lint` before committing
2. Test changes by building with `npm run build`
3. Ensure changes work with the site package (`npm run start` in site folder)
4. Update documentation if adding new classes or components

## Creating comopnents

Each of the files in the `/components` folder (or subfolders) contain one Atlas component. Create new component when you have a complex layout that requires many helper classes to recreate.

There are a few things to think about when adding a new component, though none of them are strict rules.

- File name should match the class of the component.
- There should only be one top level class per file.
- Subclasses (classes that to go inside the main class) are fine.
- Modifier classes on the main class are also fine.
- Seek to nest only two levels deep, three at most.

### Class nomenclature within components

The component name itself should be a noun or noun-phrase. Endeavor to choose the shortest applicable word or series of words that best describes the component. Modifiers on a particular component should contain the top level component within the class name. State based class modifiers will follow a different convention, and be prefixed with `is-`.

Examples of state-targeting classes are:

- `is-disabled`
- `is-hovered`
- `is-focused`

### Sizes within components

Although we favor unabbreviated names in our design system, we've made one exception. This exception applies to both components and atomics, and it is in the use of sizes. We abbreviate size with at-least-two-letter t-shirt sizes. If it weren't for the terrible ergonomics of writing `extra-extra-large` then we'd likely have stuck to standard operating procudure here, but as George Orwell said in his final rule for clear writing, "Break any of these rules sooner than say anything outright barbarous."

- extra extra small - xs
- extra small - xs
- small -> sm
- large -> lg
- extra large - xl
- extra extra large - xl

## Example

```scss
// main class
.component {
	[...]

	&.component-sm {
		[...]
	}

	&.component-lg {
		[...]
	}

	.component-sub {
		[...]
	}

	.component-sub-component {
		[...]
	}
}
```

## Adding Atomics

Atomics are small, single purpose, CSS classes that can be used to compose great things.

### Categories of classes

Most of our classes fall into one of several categories. Those that affect ...

- display (ex. `.display-inline-flex`)
- spacing (ex. `.margin-inline-lg`);
- color (ex. `.color-primary`)
- typography (ex. `.font-size-md`);
- flex properties (ex. `.justify-content-center`)
- and more ...

### Naming patterns

All of our atomic classes try to follow the same pattern.

```txt
.<css-property-name>-<value>
// or
.<css-property-name>-<value>-<screensize>
```

### CSS Property Values

The first part of nearly every Atomic class represent the css property that it will modify. For example, `display` in the class `.display-flex` matches the property value from the corresponding css rule `display: flex;`. We hope this will provide a clear and easily intuited pattern for our Atomics and encourage everyone to learn the fundamentals of CSS.

### How values translate to classnames in atomics

While CSS properties are straightfoward (they just match the CSS), the value property is not always as easy to guess. We have a few rules that help us figure out how to write values in class names.

1. When the CSS value is a string (such as `flex-end` in `justify-content: flex-end`, or `grid` in `display: grid;`) then we just use that string directly (meaning these classes become `.justify-content-flex-end` and `.display-grid`).
2. In some cases, such as themed colors values, values are associated concepts.
   - Such as `primary` in the class `.color-primary`. (The `primary` is blue on light theme and yellow on high contrast theme.)
   - Such as `semibold` in the class `font-weight-semibold`.
3. When a value refers to a pixel value is involved we will just write out the number.
   - Some width based classes use this approach. `width-100` means `width: 100px`.
4. When a em/rem value is involved, that value is typically represented as an at-least-two-letter-t-shirt size.
   - Spacing and non-heading typography values follow this convention, as in `xs, sm, md, lg, xl, xxl` in `margin-top-xl`, and `font-size-md`.
   - Within a set of values that require units such as the one above, 0 is represented by the string `none`.
5. Within a series of values that are all unitless numbers, those numbers are used directly, as in `flex-grow: 1;` being represented by `flex-grow-1`.
6. When a shorthand property's value is multi-part, we choose a reasonable default and omit the value completely.
   - In the case `border: 1px solid $border` the class becomes simply `.border`.
   - In this case further modification would still be available.

### Screen sizes

Screen sizes are represented by one of the following strings:

- `tablet`, representing screens tablet and larger.
- `desktop`, representing screen desktop width and larger.
- `widescreen`, representing very wide screens to infinity.

Use a mobile first approach when using Atomics, including the universally applicable class (i.e. the one that does not have a screensize at the end), and when necessary overwrite its values on larger screens.

## Remember! Adding any new CSS in the /css folder means updating documentation in the /site folder too.
