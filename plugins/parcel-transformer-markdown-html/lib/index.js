// @ts-nocheck
const { Transformer } = require('@parcel/plugin');
const { marked } = require('marked');
const hljs = require('highlight.js');
const frontMatter = require('front-matter');
const mustache = require('mustache');
const path = require('path');
const parse5 = require('parse5');
const allTokens = require('@microsoft/atlas-css/dist/tokens.json');
const { renderBreadcrumbsMarkup } = require('./breadcrumbs');
const { buildGithubLink } = require('./github-link');

// Inline-script hide helper.
//
// Background: when @parcel/transformer-html sees a `<script>` tag without a
// `src` attribute it extracts the body as a separate inline-JS child asset
// and pulls in @parcel/transformer-js, @parcel/transformer-babel, and
// @parcel/transformer-react-refresh-wrap as dev dependencies. On a cold
// (no `.parcel-cache`) build this newly-registered transformer dev-dep
// chain hits a Parcel race condition that surfaces as:
//
//   Error: Worker send back a reference to a missing dev dep request.
//   This might happen due to internal in-memory build caches not being
//   cleared between builds or due a race condition. This is a bug in Parcel.
//
// Workaround: in the markdown → html pass we hide every inline `<script>`
// inside an HTML comment containing the original attributes and body in
// base64. The HTML transformer can't see the tag, so it doesn't extract it
// and the buggy dev-dep chain never gets registered.
//
// The companion plugin `@microsoft/parcel-optimizer-inline-script-restore`
// restores the original `<script>` tags as a Parcel optimizer, which runs
// on the final bundle after every transformer. A separate plugin is
// required because Parcel dedupes transformers by name per asset, so
// re-registering this same transformer for the `*.html` pipeline does not
// trigger a second invocation (see Transformation.js `runTransformer`).
//
// The marker uses only base64 characters between the `::` separators, so
// `<!--…-->` can never be ambiguous (base64 has no `-`) and HTML comment
// rules (no `--` inside) are respected.
//
// Implementation note: we deliberately use the parse5 HTML parser instead
// of a regex to locate `<script>` tags. Regex-based HTML tag matching is
// brittle (browsers accept odd constructions like `</script foo="bar">`,
// uppercase tag names, etc.) and gets flagged by `js/bad-tag-filter` style
// security tools. parse5 implements the WHATWG HTML parsing algorithm, so
// it sees exactly what the browser would.
const ATLAS_INLINE_SCRIPT_MARKER = 'ATLAS_INLINE_SCRIPT_V1';

function findInlineScriptNodes(root) {
	const scripts = [];
	const stack = [root];
	while (stack.length > 0) {
		const node = stack.pop();
		if (
			node.tagName === 'script' &&
			Array.isArray(node.attrs) &&
			!node.attrs.some(a => a.name === 'src') &&
			node.sourceCodeLocation &&
			node.sourceCodeLocation.startTag
		) {
			scripts.push(node);
		}
		if (node.childNodes) {
			for (const child of node.childNodes) {
				stack.push(child);
			}
		}
	}
	return scripts;
}

function serializeAttrs(attrs) {
	return attrs
		.map(attr => {
			const escaped = String(attr.value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
			return ` ${attr.name}="${escaped}"`;
		})
		.join('');
}

function hideInlineScripts(html) {
	// Cheap pre-check: if there is no `<script` substring at all there is
	// nothing for us to do and we can skip the parse entirely.
	if (!/<script/i.test(html)) {
		return html;
	}

	const fragment = parse5.parseFragment(html, { sourceCodeLocationInfo: true });
	const scripts = findInlineScriptNodes(fragment);
	if (scripts.length === 0) {
		return html;
	}

	// Sort by start offset descending so we can splice into the original
	// string without invalidating later offsets.
	scripts.sort((a, b) => b.sourceCodeLocation.startOffset - a.sourceCodeLocation.startOffset);

	let result = html;
	for (const node of scripts) {
		const loc = node.sourceCodeLocation;
		const startOffset = loc.startOffset;
		const endOffset = loc.endOffset;
		const startTagEnd = loc.startTag.endOffset;
		const endTagStart = loc.endTag ? loc.endTag.startOffset : endOffset;

		const rawAttrs = serializeAttrs(node.attrs);
		const content = html.slice(startTagEnd, endTagStart);

		const attrsB64 = Buffer.from(rawAttrs, 'utf8').toString('base64');
		const contentB64 = Buffer.from(content, 'utf8').toString('base64');
		const marker = `<!--${ATLAS_INLINE_SCRIPT_MARKER}::${attrsB64}::${contentB64}-->`;

		result = result.slice(0, startOffset) + marker + result.slice(endOffset);
	}
	return result;
}

const languageDisplayNames = {
	html: 'HTML',
	js: 'JavaScript',
	javascript: 'JavaScript',
	scss: 'SCSS',
	sass: 'Sass',
	md: 'Markdown',
	markdown: 'Markdown',
	'atomics-filter': 'Atomics',
	atomics: 'Atomics',
	'abut-html': 'HTML',
	'html-no-indent': 'HTML',
	'html-no-example': 'HTML'
};

let filterIds = 0;

function createFilterableCodeBlock(code, language, displayName) {
	filterIds++;
	return `
	<div class="code-block margin-top-xs">
		<div class="code-block-header">
			<span class="code-block-header-language" data-hljs-language="${language}">${displayName}</span>
			<div class="code-block-header-action-bar">
				<input id="filter" class="input code-block-header-filter" data-code-filter-input="${filterIds}" placeholder="Filter ..." type="search" />
			</div>
		</div>
		<div class="code-block-body max-height-30vh inner-focus" data-focusable-if-scrollable>
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

		return `
		<!-- heading-capture-outer-begin -->
		<div class="markdown">
			<a href="#${id}" aria-label="Section titled: ${text}">
				<span class="heading-anchor"></span>
			</a>
			<h${level} id="${id}">
				<!-- heading-capture-text-begin -->${text}<!-- heading-capture-text-end -->
			</h${level}>
		</div>
		<!-- heading-capture-outer-end -->
		`;
	},
	code(code, language) {
		const fullWidth = language === 'html-no-indent';
		let provideExample = true;
		if (language === 'html-no-example') {
			language = 'html';
			provideExample = false;
		}
		let spacing = 'margin-top-sm';
		if (language === 'abut-html' || language === 'html-no-indent') {
			language = 'html';
		}
		if (language === 'abut-html') {
			spacing = '';
		}
		const elementExample = provideExample ? createExample(language, code, fullWidth) : '';

		const displayName =
			language in languageDisplayNames ? languageDisplayNames[language] : language;
		if (language === 'atomics-filter') {
			return createFilterableCodeBlock(code, language, displayName);
		}
		return `
			${elementExample}
			<div class="code-block ${spacing}">
				<div class="code-block-header">
					<span class="code-block-header-language" data-hljs-language="${language}">${displayName}</span>
				</div>
				<div class="code-block-body inner-focus">
					<pre class="inner-focus" data-focusable-if-scrollable><code>${
						hljs.highlight(code, { language }).value
					}</code></pre>
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
			<div class="markdown table-wrapper margin-top-sm inner-focus" data-focusable-if-scrollable>
				<table class="table">
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
	headerIds: false,
	mangle: false
});

module.exports = new Transformer({
	async loadConfig({ config }) {
		const result = await config.getConfig(['.scaffoldrc']);

		if (!result.contents) {
			throw new Error(
				`Plugin 'parcel-transformer-markdown-html' requires an ".scaffoldrc" files to be specified. ${filePath}`
			);
		}

		if (!result.contents.templatePath) {
			throw new Error(
				`Your ".scaffoldrc" should contain a json structure with "templatePath" property pointing to the folder containing html layouts. Your config: ${JSON.stringify(
					contents
				)}`
			);
		}

		config.setResult(result);
		return result;
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

		let parsedCode = attributes.import
			? await options.inputFS
					.readFile(path.join(process.cwd(), attributes.import), 'utf-8')
					.then(content => marked(content))
			: marked(body);

		if (attributes.template) {
			const workingDir = process.cwd();
			const templateDir = path.join(workingDir, config.contents.templatePath);
			const templateFilename = path.join(templateDir, `${attributes.template}.html`);
			const figmaEmbed = attributes.figmaEmbed;
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
				asset.invalidateOnFileChange(tocFilename);
			}

			let hero = false;
			if (attributes.hero) {
				const { h1, p, html } = extractH1AndFirstP(parsedCode);
				parsedCode = html;
				hero = { h1, description: p };
			}

			asset.invalidateOnFileChange(templateFilename);
			const githubLink = buildGithubLink(asset.filePath);
			asset.setCode(
				hideInlineScripts(
					mustache.render(template, {
						body: parsedCode,
						githubLink,
						toc: { name: 'TOC', entries: tocEntries },
						breadcrumbs: renderBreadcrumbsMarkup(tocEntries, asset.filePath),
						...attributes,
						tokens,
						cssTokenSource,
						figmaEmbed,
						hero
					})
				)
			);
		} else {
			asset.setCode(hideInlineScripts(parsedCode));
		}

		return [asset];
	}
});

function createExample(language, code, noIndent = false) {
	if (language.toLowerCase() === 'html') {
		return `<div class="example ${noIndent ? 'full-width' : ''} padding-block-md">${code}</div>`;
	}
	if (language.toLowerCase() === 'markdown') {
		return `<div class="example padding-block-md">${marked(code)}</div>`;
	}
	return '';
}

function extractH1AndFirstP(htmlString) {
	const entireH1Regexp =
		/<!-- heading-capture-outer-begin -->\s*([\s\S]*?)\s*<!-- heading-capture-outer-end -->/i;
	const entireH1 = htmlString.match(entireH1Regexp);
	const entireh1Match = entireH1 ? entireH1[1].toString() : null;

	// For now, only matchin the text in the first full paragraph.
	const pMatch = htmlString.match(/<p>(.*?)<\/p>/);
	const p = pMatch ? pMatch[1] : null;

	const h1Match = htmlString.match(
		/<!-- heading-capture-text-begin -->\s*([\s\S]*?)\s*<!-- heading-capture-text-end -->/i
	);
	const h1 = h1Match ? h1Match[1].toString() : null;
	const html = htmlString
		.replaceAll(entireh1Match, '')
		.replace(p, '<div class="h1-inverse-spacer"></div>');
	return { h1, p, html };
}
