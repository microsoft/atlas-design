# Atlas Atomics

Welcome to Atomics ⚛! These are small, single purpose, CSS classes that can be used to compose great things. Visit this article for a [longer definition of Atomic CSS here](https://css-tricks.com/lets-define-exactly-atomic-css/).

## Categories of classes

Most of our classes fall into one of several categories. Those that affect ...

- display (ex. `.display-inline-flex`)
- spacing (ex. `.margin-inline-lg`);
- color (ex. `.color-primary`)
- typography (ex. `.font-size-md`);
- flex properties (ex. `.justify-content-center`)
- and more ...

## Naming patterns

All of our atomic classes try to follow the same pattern.

```txt
.<css-property-name>-<value>
// or
.<css-property-name>-<value>-<screensize>
```

## CSS Property Values

The first part of nearly every Atomic class represent the css property that it will modify. For example, `display` in the class `.display-flex` matches the property value from the corresponding css rule `display: flex;`. We hope this will provide a clear and easily intuited pattern for our Atomics and encourage everyone to learn the fundamentals of CSS.

## Values

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

## Screen sizes

Screen sizes are represented by one of the following strings:

- `tablet`, representing screens tablet and larger.
- `desktop`, representing screen desktop width and larger.
- `widescreen`, representing very wide screens to infinity.

Use a mobile first approach when using Atomics, including the universally applicable class (i.e. the one that does not have a screensize at the end), and when necessary overwrite its values on larger screens.
