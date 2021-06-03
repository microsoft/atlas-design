// @ts-nocheck
const { Transformer } = require('@parcel/plugin');
const { promisify } = require('@parcel/utils');
const marked = require('marked');
const hljs = require('highlight.js');
const frontMatter = require('front-matter');
const mustache = require('mustache');
const path = require('path');
const allTokens = require('@microsoft/atlas-css/dist/tokens.json');

const languageDisplayNames = {
	html: 'HTML',
	js: 'JavaScript',
	javascript: 'JavaScript',
	scss: 'SCSS',
	sass: 'Sass',
	md: 'Markdown',
	markdown: 'Markdown',
	'atomics-filter': 'Atomics',
	atomics: 'Atomics'
};

let filterIds = 0;

function createFilterableCodeBlock(code, language, displayName) {
	filterIds++;
	return `
	<div class="code-block margin-top-xs" style="min-height: 30vh">
		
		<div class="code-block-header">
			<span class="code-block-header-language" data-hljs-language="${language}">${displayName}</span>
			<input
			class="code-block-header-filter align-self-center"
			data-code-filter-input="${filterIds}"
			placeholder="Filter ..."
			type="search" />
		</div>
		<div class="code-block-body" style="max-height: 30vh; overflow-y: scroll;">
			<pre><code data-code-filter-code="${filterIds}">${code}</code></pre>
		</div>
	</div>`;
}

/**
 * @type {import('marked').RendererObject}
 */
const markedOptions = {
	heading(text, level) {
		const id = text.toLowerCase().replace(/[^\w]+/g, '-');

		return `<div class="markdown">
			<h${level} id="${id}">
			<a name="${id}" href="#${id}">
				<span class="heading-anchor"></span>
			</a>
				${text}
			</h${level}>
		</div>`;
	},
	code(code, language) {
		const elementExample = createExample(language, code);
		const displayName =
			language in languageDisplayNames ? languageDisplayNames[language] : language;
		if (language === 'atomics-filter') {
			return createFilterableCodeBlock(code, language, displayName);
		}
		return `
			${elementExample}
			<div class="code-block margin-top-s">
				<div class="code-block-header">
					<span class="code-block-header-language" data-hljs-language="${language}">${displayName}</span>
				</div>
				<div class="code-block-body">
					<pre><code>${hljs.highlight(code, { language }).value}</code></pre>
				</div>
			</div>
		`;
	},
	paragraph(text) {
		return `
			<div class="markdown">
				<p>${text}</p>
			</div>`;
	},
	list(body, ordered, start) {
		const element = ordered ? 'ol' : 'ul';
		return `
			<div class="markdown">
				<${element}>
					${body}
				</${element}>
			</div>
			`;
	},
	table(header, body) {
		return `
			<div class="markdown">
				<table class="table is-min border is-inner-borders is-header-background is-row-header-background margin-top-s">
					<thead>${header}</thead>
					<tbody>${body}</tbody>
				</table>
			</div>
		`;
	}
};

marked.use({
	renderer: markedOptions,
	pedantic: false,
	gfm: true,
	breaks: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	xhtml: false,
	langPrefix: 'lang'
});

const markedPromise = promisify(marked);

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

		const parsedCode = await markedPromise(body);

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

function createExample(language, code) {
	if (language.toLowerCase() === 'html') {
		return `<div class="example padding-block-m">${code}</div>`;
	}
	if (language.toLowerCase() === 'markdown') {
		return `<div class="example padding-block-m">${marked(code)}</div>`;
	}
	return '';
}
