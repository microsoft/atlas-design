// Global computed data — derive eleventyNavigation from frontmatter
const path = require('path');

// Map of folder names to their display names
const folderNames = {
	components: 'Components',
	atomics: 'Atomics',
	tokens: 'Tokens',
	patterns: 'Patterns'
};

// Pages to hide from navigation
const hiddenPages = ['index', 'not-found', ''];

// Explicit name overrides matching the old toc.js
const nameOverrides = {
	'/get-started.md': 'Get Started',
	'/atomics/overview.md': 'Overview',
	'/components/overview.md': 'Overview',
	'/tokens/overview.md': 'Overview',
	'/atomics/border.md': 'Border',
	'/atomics/display.md': 'Display',
	'/atomics/flex.md': 'Flex',
	'/atomics/position.md': 'Position',
	'/atomics/shadow.md': 'Shadow',
	'/atomics/spacing.md': 'Spacing',
	'/atomics/gap.md': 'Gap',
	'/atomics/typography.md': 'Typography',
	'/atomics/width.md': 'Width',
	'/atomics/height.md': 'Height'
};

module.exports = {
	eleventyNavigation: data => {
		if (!data.page || !data.page.inputPath) return undefined;

		const inputPath = data.page.inputPath.replace(/\\/g, '/');
		const fileSlug = data.page.fileSlug;

		// Hide specific pages
		if (hiddenPages.includes(fileSlug)) {
			return undefined;
		}

		// Determine parent from directory structure
		const parts = inputPath.replace('./src/', '').split('/');
		const folder = parts.length > 1 ? parts[0] : null;
		const sectionName = folder && folderNames[folder] ? folderNames[folder] : undefined;

		// Build a toc-style path for name override lookup
		const tocPath = '/' + inputPath.replace('./src/', '');

		// Determine display title: explicit override > frontmatter title > slug
		let navTitle;
		if (nameOverrides[tocPath]) {
			navTitle = nameOverrides[tocPath];
		} else {
			navTitle = data.title || fileSlug;
			// Strip redundant section suffix (e.g., "Border Atomics" → "Border")
			if (sectionName) {
				const stripped = navTitle.replace(new RegExp(`\\s*${sectionName}$`, 'i'), '').trim();
				if (stripped) navTitle = stripped;
			}
		}

		// Use frontmatter title as unique key (not the display title, which may collide)
		const key = data.title || fileSlug;

		// Sorting: overview first (-50), get-started first (-100), rest alphabetical (0)
		let order = 0;
		if (fileSlug === 'get-started') {
			order = -100;
		} else if (fileSlug === 'overview') {
			order = -50;
		}

		return {
			key,
			title: navTitle,
			parent: sectionName,
			order
		};
	},
	layout: data => {
		if (data.layout) return data.layout;
		if (data.template) return `${data.template}.njk`;
		return undefined;
	},
	importedContent: data => {
		if (!data.import) return null;
		const importPath = path.resolve(__dirname, '../../', data.import);
		const fs = require('fs');
		if (fs.existsSync(importPath)) {
			const { renderMarkdown } = require('../../lib/markdown');
			const content = fs.readFileSync(importPath, 'utf-8');
			return renderMarkdown(content);
		}
		console.warn(`Import file not found: ${importPath}`);
		return null;
	}
};
