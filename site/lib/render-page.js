// Page orchestrator for the Eleventy build.
//
// Mirrors the logic of `@microsoft/parcel-transformer-markdown-html`:
// frontmatter -> (import file | body) -> marked -> mustache template, with
// breadcrumbs, github edit link, token tables and hero extraction.
const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');
const mustache = require('mustache');
const allTokens = require('@microsoft/atlas-css/dist/tokens.json');
const { marked, extractH1AndFirstP } = require('./markdown-renderer');
const { renderBreadcrumbsMarkup } = require('./breadcrumbs');
const { buildGithubLink } = require('./github-link');

const siteDir = process.cwd();
const templateDir = path.join(siteDir, 'src', 'scaffold');

const templateCache = {};
function loadTemplate(name) {
	if (!(name in templateCache)) {
		templateCache[name] = fs.readFileSync(path.join(templateDir, `${name}.html`), 'utf8');
	}
	return templateCache[name];
}

/**
 * Parse a markdown source file's frontmatter without rendering it.
 * @param {string} rawContent
 */
function parseFrontmatter(rawContent) {
	return frontMatter(rawContent);
}

/**
 * Render a full HTML page from a markdown source file.
 * @param {object} args
 * @param {string} args.rawContent raw file content (including frontmatter)
 * @param {string} args.srcRelativePath posix-style path relative to site/src
 * @param {tocEntry[]} args.toc parsed table of contents entries
 * @returns {string}
 */
function renderPage({ rawContent, srcRelativePath, toc }) {
	const { body, attributes } = frontMatter(rawContent);

	let parsedCode = attributes.import
		? marked(fs.readFileSync(path.join(siteDir, attributes.import), 'utf-8'))
		: marked(body);

	if (!attributes.template) {
		return parsedCode;
	}

	// Clone the TOC per page. The Parcel transformer re-parsed toc.json fresh
	// for every asset, so the breadcrumb renderer's in-place mutations never
	// leaked between pages. Eleventy shares one global `toc` object across all
	// renders, so we must clone to reproduce that isolation.
	const tocEntries = toc ? JSON.parse(JSON.stringify(toc)) : null;

	const tokenSet = attributes.token;
	let tokens;
	let cssTokenSource;
	if (tokenSet) {
		try {
			tokens = Object.entries(allTokens[tokenSet].tokens).map(item => ({
				name: item[0],
				value: item[1]
			}));
			cssTokenSource = allTokens[tokenSet].location;
		} catch (err) {
			// eslint-disable-next-line no-console
			console.warn(
				`There was an error trying to require token file: "${attributes.token}". Did you specify the correct token name in your template?`
			);
		}
	}

	let hero = false;
	if (attributes.hero) {
		const { h1, p, html } = extractH1AndFirstP(parsedCode);
		parsedCode = html;
		hero = { h1, description: p };
	}

	const githubLink = buildGithubLink(srcRelativePath);

	return mustache.render(loadTemplate(attributes.template), {
		body: parsedCode,
		githubLink,
		toc: { name: 'TOC', entries: tocEntries },
		breadcrumbs: renderBreadcrumbsMarkup(tocEntries || [], srcRelativePath),
		...attributes,
		tokens,
		cssTokenSource,
		figmaEmbed: attributes.figmaEmbed,
		hero
	});
}

module.exports = { renderPage, parseFrontmatter };
