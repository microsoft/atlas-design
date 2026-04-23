---
'@microsoft/atlas-css': minor
---

Revamped chevron mixin with CSS custom properties for full configurability.

- New `%chevron` placeholder driven by `--chevron-size`, `--chevron-color`, `--chevron-border-width`, `--chevron-rotate`, `--chevron-vertical-align`, and `--chevron-transition-duration` CSS custom properties
- New `%chevron-animated` placeholder with smooth `rotate` transition and `prefers-reduced-motion` support
- New Sass variables for all four directions in both LTR and RTL (`$chevron-rotate-right`, `$chevron-rotate-down`, `$chevron-rotate-up`, `$chevron-rotate-left`, and their `-rtl` counterparts)
- Updated accordion, popover, and select components to use the new CSS variable-driven chevron
- Uses CSS `rotate` property instead of `transform: rotate()` for cleaner composability
- Default chevron color changed from `$text` to `$text-subtle`
