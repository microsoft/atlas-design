---
'@microsoft/atlas-site': patch
---

Add syntax highlighting styles for documentation code blocks.

The site already runs highlight.js at build time (in the Eleventy markdown
renderer), but the scaffold had no theme for the emitted `.hljs-*` token spans,
so fenced code rendered as flat, uncolored text. A new
`src/scaffold/styles/syntax-highlight.scss` supplies per-theme colors:

- light and dark reproduce GitHub's syntax themes, using GitHub's current
  accessibility-tuned Primer `prettylights-syntax` palette;
- high-contrast uses the highlight.js night-owl theme, which suits the dark
  high-contrast color scheme.

Colors were chosen and verified against the actual Atlas code-block backgrounds
(`#fafafa` light, `#1f1f1f` dark, `#000` high-contrast) so every token clears
the WCAG 2 AA 4.5:1 text-contrast threshold — a handful of values (dark
headings, and night-owl comments/quotes/deletions) are nudged from their
upstream originals because the Atlas backgrounds differ from GitHub's. This is a
site-only, presentational change; no markup structure changes.
