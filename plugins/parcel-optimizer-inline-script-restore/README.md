# parcel-optimizer-inline-script-restore

A Parcel optimizer that restores inline `<script>` tags previously hidden by [`@microsoft/parcel-transformer-markdown-html`](../parcel-transformer-markdown-html). It only exists to work around a Parcel cold-cache bug; nothing in the design system depends on it at runtime.

## Why this exists

When `@parcel/transformer-html` encounters an inline `<script>` (one without a `src` attribute) it extracts the body as a child JS asset and registers `@parcel/transformer-js`, `-babel`, and `-react-refresh-wrap` as new dev dependencies. On a cold (no `.parcel-cache`) build this newly-registered transformer chain races with Parcel's worker dev-dep machinery and fails with:

```
Error: Worker send back a reference to a missing dev dep request.
This might happen due to internal in-memory build caches not being
cleared between builds or due a race condition. This is a bug in Parcel.
```

The race only fires on the first build of a worker; subsequent builds succeed because the dev-dep entry is now warm in cache.

## How the workaround works

The fix is split across two plugins:

1. **`@microsoft/parcel-transformer-markdown-html`** rewrites every inline `<script>` in the markdown → html pass into an HTML comment of the form `<!--ATLAS_INLINE_SCRIPT_V1::<attrs_b64>::<body_b64>-->`. `@parcel/transformer-html` sees a comment, not a script, and never registers the dev-dep chain.
2. **`@microsoft/parcel-optimizer-inline-script-restore`** (this package) decodes those markers back into the original `<script>` tags after all transformers run but before `@parcel/optimizer-html` minifies the document — so htmlnano sees real inline JS and minifies it in place.

A separate plugin is required because Parcel dedupes transformers by name per asset (`asset.transformers.has(transformerName)` in `@parcel/core/lib/Transformation.js`), so re-registering the markdown transformer for the `*.html` pipeline silently becomes a no-op. Optimizers run on the final bundle and have no such dedup.

## Configuration

Register first in the `*.html` optimizers list in `.parcelrc`:

```json
{
	"optimizers": {
		"*.html": [
			"@microsoft/parcel-optimizer-inline-script-restore",
			"..."
		]
	}
}
```

Order matters — restoring must happen before `@parcel/optimizer-html` runs, otherwise the comments may be stripped or the inline JS won't be minified.

## When this can be removed

This package can be deleted once the upstream Parcel race condition is fixed (see [parcel-bundler/parcel](https://github.com/parcel-bundler/parcel)). At that point, drop the marker rewriting from `@microsoft/parcel-transformer-markdown-html` and remove the `optimizers` entry from `site/.parcelrc`.
