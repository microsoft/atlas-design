// @ts-nocheck
const { Optimizer } = require('@parcel/plugin');
const { blobToString } = require('@parcel/utils');

// Restores inline `<script>` tags that
// `@microsoft/parcel-transformer-markdown-html` hid as HTML comments to dodge
// a Parcel cold-cache race condition.
//
// See `plugins/parcel-transformer-markdown-html/lib/index.js` for the
// background on why scripts are hidden in the first place and the marker
// format. This optimizer is a separate plugin (rather than a second pass
// of the markdown transformer) because Parcel dedupes transformers by name
// per asset — running the same transformer on both the `*.md` and `*.html`
// pipelines is a no-op. Optimizers run on the final bundle output and have
// no such dedup.
//
// We register this optimizer FIRST in the `*.html` pipeline so the markers
// are restored before `@parcel/optimizer-html` minifies the document — that
// way htmlnano sees real `<script>` content and minifies the JS in place.
const ATLAS_INLINE_SCRIPT_MARKER = 'ATLAS_INLINE_SCRIPT_V1';
const INLINE_SCRIPT_MARKER_REGEX = new RegExp(
	`<!--${ATLAS_INLINE_SCRIPT_MARKER}::([A-Za-z0-9+/=]*)::([A-Za-z0-9+/=]*)-->`,
	'g'
);

function restoreInlineScripts(html) {
	return html.replace(INLINE_SCRIPT_MARKER_REGEX, (_, attrsB64, contentB64) => {
		const attrs = Buffer.from(attrsB64, 'base64').toString('utf8');
		const content = Buffer.from(contentB64, 'base64').toString('utf8');
		return `<script${attrs}>${content}</script>`;
	});
}

module.exports = new Optimizer({
	async optimize({ contents, map }) {
		const code = await blobToString(contents);
		if (!code.includes(ATLAS_INLINE_SCRIPT_MARKER)) {
			return { contents, map };
		}
		return { contents: restoreInlineScripts(code), map };
	}
});
