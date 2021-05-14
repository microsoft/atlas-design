# Atlas Atomics

Welcome to Atomics ⚛! These are small, single purpose, css classes that can be used to compose great things. Visit this article for a [longer definition of Atomic CSS here](https://css-tricks.com/lets-define-exactly-atomic-css/#:~:text=Atomic%20CSS%20is%20the%20approach,names%20based%20on%20visual%20function).

## Categories of classes

Most of our classes fall into one of several categories. Those that affect ...

- display (ex. `.display-inline-flex`)
- spacing (ex. `.margin-inline-l`);
- color (ex. `.color-primary`)
- typography (ex. `.font-size-m`);
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

The first part of nearly every Atomic class represent the css property that it will modify. For example, `display` in the class `.display-flex` matches the property value from the corresponding css rule `display: flex;`. We hope this will encourage everyone to provide a clear and easily intuited pattern for our Atmoics—and encourage everyone to learn the fundamentals of CSS.

## Values

While CSS property values are straightfoward (they just match the CSS property), the value property is not always as easy to guess. We have a few rules that help us figure out how to write values in class names.

1. When the CSS value is a string (such as `flex-end` in `justify-content: flex-end`, or `grid` in `display-grid`) then we just use that string directly (meaning these classes become .border-style-solid`).
2. In some cases, such as themed colors values, values are associated concepts
   - Such as `primary`, blue on light theme, yellow on high contrast, in the class `.color-primary`.
   - Such as `semibold` in the class `font-weight-semibold`.
3. When a number value with a particular unit is involved, that value is typically represented as a t-shirt size.
   - Spacing and non-heading typography values follow this convention, as in `xs, s, m, l, xl, xxl` in `margin-top-xl`, and `font-size-m`.
   - In this case, when is a css-value of 0 (which is unitless), that is typically represented by the string `none`.
4. Within a series of values that are all unitless numbers, those numbers are used directly, as in `flex-grow: 1;` being represented by `flex-grow-1`.
5. When a shorthand property's value is multi-part we choose a reasonable default and omit the value completely .
   - In the case `border: 1px solid $border` the class becomes simply `.border`.
   - In this case further modification would still be available

## Screen sizes

Screen sizes are represented by one of the following strings:

- `tablet`, representing screens tablet and larger.
- `desktop`, representing screen desktop width a larger.
- `widescreen`, representing very wide screens to inifinity.

Use a mobile first approach when using Atomics, including the universally applicable class (i.e. the one that does not have a screensize at the end), and when necessary overwrite its values on larger screens.
