// @ts-nocheck
const path = require('path');
const fs = require('fs');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const { renderMarkdown, extractH1AndFirstP } = require('./lib/markdown');
const { buildGithubLink } = require('./lib/github-link');

module.exports = function (eleventyConfig) {
	// --- Plugins ---
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	// --- Ignores ---
	// Old Parcel templates and scaffold source files (not content)
	eleventyConfig.ignores.add('src/scaffold/**');
	eleventyConfig.ignores.add('src/*.template');

	// --- Passthrough copy ---
	eleventyConfig.addPassthroughCopy({ 'src/atlas-light.svg': 'atlas-light.svg' });
	eleventyConfig.addPassthroughCopy({ 'src/scaffold/media': 'scaffold/media' });

	// --- Global data ---
	eleventyConfig.addGlobalData('allTokens', () => {
		const tokensPath = path.resolve(__dirname, '../css/dist/tokens.json');
		if (fs.existsSync(tokensPath)) {
			return JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
		}
		return {};
	});

	// --- Custom Markdown rendering ---
	eleventyConfig.setLibrary('md', {
		render(content) {
			return renderMarkdown(content);
		}
	});

	// --- Filters ---
	eleventyConfig.addFilter('renderMarkdown', content => {
		return renderMarkdown(content);
	});

	eleventyConfig.addFilter('githubLink', inputPath => {
		return buildGithubLink(inputPath);
	});

	eleventyConfig.addFilter('extractHero', html => {
		return extractH1AndFirstP(html);
	});

	eleventyConfig.addFilter('getTokens', (tokenSet, allTokens) => {
		if (!tokenSet || !allTokens || !allTokens[tokenSet]) {
			return null;
		}
		try {
			const tokens = Object.entries(allTokens[tokenSet].tokens).map(([name, value]) => ({
				name,
				value
			}));
			const cssTokenSource = allTokens[tokenSet].location;
			return { tokens, cssTokenSource };
		} catch (err) {
			console.warn(`Error loading token set "${tokenSet}":`, err.message);
			return null;
		}
	});

	// Custom breadcrumb filter — derives breadcrumbs from URL path
	const sectionNames = {
		components: 'Components',
		atomics: 'Atomics',
		tokens: 'Tokens',
		patterns: 'Patterns'
	};

	eleventyConfig.addFilter('breadcrumbs', (page, collections) => {
		if (!page || !page.url) return [];
		const parts = page.url.split('/').filter(Boolean);
		const crumbs = [];

		if (parts.length > 0 && sectionNames[parts[0]]) {
			const sectionSlug = parts[0];
			const sectionName = sectionNames[sectionSlug];
			const overviewPage = (collections || []).find(p => p.url === `/${sectionSlug}/overview/`);
			crumbs.push({
				title: sectionName,
				url: overviewPage ? overviewPage.url : `/${sectionSlug}/`
			});
		}

		return crumbs;
	});

	// Custom sidebar filter — groups pages by section parent and sorts them
	// (overview first, then alphabetical by title)
	eleventyConfig.addFilter('sectionChildren', (collections, sectionKey) => {
		if (!collections) return [];
		return collections
			.filter(p => {
				const nav = p.data && p.data.eleventyNavigation;
				return nav && nav.parent === sectionKey;
			})
			.sort((a, b) => {
				const aNav = a.data.eleventyNavigation;
				const bNav = b.data.eleventyNavigation;
				// Sort by order first, then alphabetical by title
				if (aNav.order !== bNav.order) return aNav.order - bNav.order;
				return (aNav.title || '').localeCompare(bNav.title || '');
			})
			.map(p => ({
				title: p.data.eleventyNavigation.title,
				url: p.url
			}));
	});

	// Filter for top-level (non-section) nav items
	eleventyConfig.addFilter('topLevelNav', collections => {
		if (!collections) return [];
		return collections
			.filter(p => {
				const nav = p.data && p.data.eleventyNavigation;
				return nav && !nav.parent;
			})
			.sort((a, b) => {
				const aNav = a.data.eleventyNavigation;
				const bNav = b.data.eleventyNavigation;
				if (aNav.order !== bNav.order) return aNav.order - bNav.order;
				return (aNav.title || '').localeCompare(bNav.title || '');
			})
			.map(p => ({
				title: p.data.eleventyNavigation.title,
				url: p.url
			}));
	});

	// --- Config ---
	return {
		dir: {
			input: 'src',
			output: 'dist',
			includes: '_includes',
			layouts: '_includes',
			data: '_data'
		},
		templateFormats: ['md', 'njk'],
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk'
	};
};
