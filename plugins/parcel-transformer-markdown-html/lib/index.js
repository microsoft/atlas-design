// @ts-check
const { Transformer } = require('@parcel/plugin');
const { promisify } = require('@parcel/utils');
const marked = require('marked');
const hljs = require('highlight.js');
const frontMatter = require('front-matter');
const mustache = require('mustache');
const path = require('path');
const markedParse = promisify(marked.parse);

module.exports = new Transformer({
	async loadConfig({ config }) {
		const configFile = await config.getConfig(['.scaffoldrc']);

		if (!configFile) {
			throw new Error(
				`Plugin 'parcel-transformer-markdown-html' requires an ".scaffoldrc" files to be specified.`
			);
		}

		if (!configFile.contents.templatePath) {
			throw new Error(
				`Your ".scaffoldrc" should contain a json structure with "templatePath" property pointing to the folder containing html layouts. Your config: ${JSON.stringify(
					configFile.contents.templatePath
				)}`
			);
		}

		config.setResult(configFile);
	},
	async transform({
		asset, // https://v2.parceljs.org/plugin-system/transformer/#MutableAsset
		options, // https://v2.parceljs.org/plugin-system/api/#PluginOptions
		config // https://v2.parceljs.org/plugin-system/api/#ConfigResult
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
			// load our configuration file to point us to the templates
			const basePath = path.resolve(
				config.filePath.replace('.scaffoldrc', ''),
				config.contents.templatePath
			);
			const tocPath = config.contents.tocPath || '';
			const templateLocation = path.resolve(basePath, `${attributes.template}.html`);

			const template = await options.inputFS.readFile(templateLocation, 'utf-8');
			const tocEntries = tocPath
				? await options.inputFS.readFile(tocPath, 'utf-8').then(r => JSON.parse(r))
				: null;

			asset.addIncludedFile({
				filePath: tocEntries
			});

			asset.addIncludedFile({
				filePath: templateLocation
			});

			asset.setCode(
				mustache.render(template, {
					body: parsedCode,
					toc: { name: 'TOC', entries: tocEntries },
					...attributes
				})
			);
		} else {
			asset.setCode(parsedCode);
		}

		return [asset];
	}
});
