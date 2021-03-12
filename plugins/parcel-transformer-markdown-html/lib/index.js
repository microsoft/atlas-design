// @ts-check
const { Transformer } = require('@parcel/plugin');
const { promisify } = require('@parcel/utils');
const marked = require('marked');
const hljs = require('highlight.js');
const frontMatter = require('front-matter');
const mustache = require('mustache');

const markedParse = promisify(marked.parse);

module.exports = new Transformer({
	async transform({
		asset, // https://v2.parceljs.org/plugin-system/transformer/#MutableAsset
		resolve, // https://v2.parceljs.org/plugin-system/transformer/#ResolveFn
		options // https://v2.parceljs.org/plugin-system/api/#PluginOptions
		// config, // https://v2.parceljs.org/plugin-system/api/#ConfigResult
		// logger // https://v2.parceljs.org/plugin-system/logging/#PluginLogger
	}) {
		asset.type = 'html';

		const code = await asset.getCode();
		const { body, attributes } = frontMatter(code);

		const parsedCode = await markedParse(body, {
			renderer: new marked.Renderer(),
			highlight: (code, lang) => {
				return hljs.highlight(lang, code).value;
			},
			pedantic: false,
			gfm: true,
			breaks: false,
			sanitize: false,
			smartLists: true,
			smartypants: false,
			xhtml: false
		});

		if (attributes.template) {
			const templateLocation = await resolve(asset.filePath, attributes.template); // consider `layout/${attributes.template}`
			const template = await options.inputFS.readFile(templateLocation, 'utf-8');
			asset.addIncludedFile({
				filePath: templateLocation
			});

			asset.setCode(
				mustache.render(template, {
					body: parsedCode,
					...attributes
				})
			);
		} else {
			asset.setCode(parsedCode);
		}

		return [asset];
	}
});
