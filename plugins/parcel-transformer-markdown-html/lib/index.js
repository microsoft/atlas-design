// @ts-nocheck
const { Transformer } = require('@parcel/plugin');
const { promisify } = require('@parcel/utils');
const marked = require('marked');
const hljs = require('highlight.js');
const frontMatter = require('front-matter');
const mustache = require('mustache');
const path = require('path');
const markedParse = promisify(marked.parse);
const allTokens = require('@microsoft/atlas-css/dist/tokens.json');

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
		config, // https://v2.parceljs.org/plugin-system/api/#ConfigResult
		logger // https://v2.parceljs.org/plugin-system/logging/#PluginLogger
	}) {
		asset.type = 'html';
		const code = await asset.getCode();
		const { body, attributes } = frontMatter(code);

		const parsedCode = await markedParse(body, {
			renderer: new marked.Renderer(),
			highlight: (code, language) => {
				return hljs.highlight(code, { language }).value;
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
			const workingDir = process.cwd();
			const templateDir = path.join(workingDir, config.contents.templatePath);
			const templateFilename = path.join(templateDir, `${attributes.template}.html`);
			const tocFilename = config.contents.tocPath
				? path.join(workingDir, config.contents.tocPath)
				: null;

			logger.verbose({
				message: `Resolved paths:\n${workingDir}\n${templateDir}\n${templateFilename}\n${tocFilename}`,
				skipFormatting: true
			});

			const [template, tocEntries] = await Promise.all([
				options.inputFS.readFile(templateFilename, 'utf-8'),
				tocFilename
					? options.inputFS.readFile(tocFilename, 'utf-8').then(r => JSON.parse(r))
					: Promise.resolve(null)
			]);
			const tokenSet = attributes.token;
			let tokens;
			let cssTokenSource;
			// we've specified a tokens file to load from @atlas-tokens
			if (tokenSet) {
				try {
					tokens = Object.entries(allTokens[tokenSet].tokens).map(item => {
						return {
							name: item[0],
							value: item[1]
						};
					});
					cssTokenSource = allTokens[tokenSet].location;
				} catch (err) {
					logger.warn({
						message: `There was an error trying to require token file: "${attributes.token}. Did you specify the correct token name in your template? `,
						filePath: asset.filePath,
						language: asset.type
					});
				}
			}

			if (tocFilename) {
				asset.addIncludedFile(tocFilename);
			}

			asset.addIncludedFile(templateFilename);

			asset.setCode(
				mustache.render(template, {
					body: parsedCode,
					toc: { name: 'TOC', entries: tocEntries },
					...attributes,
					tokens,
					cssTokenSource
				})
			);
		} else {
			asset.setCode(parsedCode);
		}

		return [asset];
	}
});
