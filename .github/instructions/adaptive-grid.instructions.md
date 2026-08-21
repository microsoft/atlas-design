---
applyTo: '**/*adaptive-grid*'
---

# Adaptive grid extension guidance

The adaptive grid deliberately starts with a small, explicit equal-width layout API. Preserve
these decisions when extending the component.

## Public invariants

- Keep the required `.adaptive-grid` wrapper, direct `.adaptive-grid-content`, and direct
  `.adaptive-grid-item` structure. A container cannot query itself, so do not collapse the
  wrapper and content elements.
- Keep `adaptive-grid` as a named `inline-size` container so nested instances query themselves
  rather than unrelated ancestors.
- Every explicit track must use `minmax(0, 1fr)`, including the one-column default. Keep
  `min-inline-size: 0` on direct `.adaptive-grid-item` children.
- `.adaptive-grid-columns-2` means one column below its component threshold and two equal columns
  at or above it. The word `columns` is intentional: it makes the number an unambiguous count and
  aligns with the `grid-template-columns-*` atomics.
- Container size queries evaluate the container's content box. Account for borders and padding in
  examples, tests, and threshold descriptions.

## Extension model

- Keep this component explicit. Do not add `auto-fit`, `auto-fill`, intrinsic track sizing, or
  content-derived column counts to `.adaptive-grid`.
- A future `.adaptive-grid-columns-N` must be a standalone "up to N columns" modifier. It should
  progress through intermediate equal-width counts as the container grows and must not require
  consumers to combine cumulative count modifiers.
- Add column counts only for demonstrated product needs. Do not pre-generate an open-ended count
  range or a count-by-threshold class matrix.
- Use component-prefixed `!default` Sass variables for default thresholds. Do not redefine the
  existing generic container-query tokens.
- CSS custom properties cannot supply size-query thresholds. Do not expose a raw track-template
  custom property or weaken the zero-minimum track invariant as a workaround.
- Literal threshold variants require design review. If approved, keep `columns`, encode both the
  count and an explicit minimum-width marker, and avoid ambiguous names such as
  `.adaptive-grid-2`, `.adaptive-grid-2-800`, or `.adaptive-grid-columns-800`.
- Do not overload numeric column modifiers with weighted or asymmetric layouts. Such layouts need
  separately named presets and a concrete use case.

Keep speculative extension guidance here rather than in consumer documentation. Consumer docs
should describe only shipped classes and supported Sass configuration.

When adding public adaptive-grid classes, update the Sass export, documentation, generated class
metadata coverage, accessibility page registration, and changeset using existing repository
patterns. Validate CSS lint/build and the static site build.
