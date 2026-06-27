---
'@microsoft/atlas-site': patch
---

Migrate the documentation site build from Parcel to Eleventy (11ty).

The rendered HTML is structurally identical to the previous Parcel output (same
templates, breadcrumbs, TOC, and markdown rendering, ported into an Eleventy
`md` extension). All in-page and asset URLs are now relativized at build time so
the site works unchanged from both a GitHub Pages subpath
(`microsoft.github.io/atlas-design`) and a domain root
(`design.learn.microsoft.com`). The dev server (`npm run start`) compiles the
CSS framework and scaffold TypeScript with dart-sass + esbuild and hot-reloads
the browser on CSS changes — the primary CSS-development workflow. The generated
`dist/routes-for-class-prefixes.json` (consumed by the VS Code extension) and the
markdown sources (consumed by the MCP server) are unchanged.

A site-only CSS selector that sized the homepage logo was matched against the
hashed asset path Parcel produced; it is now matched on the asset filename so it
survives the new build-time URL relativization.
