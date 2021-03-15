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
		let configFile = await config.getConfig(['.scaffoldrc']);

		if (configFile) {
			if (!configFile.contents.templatePath) {
				throw new Error(
					`Your ".scaffoldrc" should contain a json structure with "templatePath" property pointing to the folder containing html layouts. Your config: ${JSON.stringify(
						configFile.contents.templatePath
					)}`
				);
			}

			configFile.contents.toTemplates = path.join(
				config.filePath.replace('.scaffoldrc', ''),
				config.contents.templatePath
			);

			config.setResult(configFile);

			return;
		}

		throw new Error(
			`Plugin 'parcel-transformer-markdown-html' requires an ".scaffoldrc" files to be specified.`
		);
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
			const templateLocation = path.join(
				config.contents.toTemplates,
				`${attributes.template}.html`
			);

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
