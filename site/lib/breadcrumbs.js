const path = require('path');

/**
 * @typedef {object} tocEntry
 * @property {string} name
 * @property {string} href
 * @property {boolean} isDirectory
 * @property {boolean} isHidden
 * @property {tocEntry[]?} children
 */

/**
 * Take in the current page's src-relative path (e.g. "atomics/spacing.md"),
 * find it in the table of contents if able, then traverse back up the tree,
 * creating a breadcrumb structure.
 * @param {tocEntry[]} entries
 * @param {string} srcRelativePath posix-style path relative to site/src
 * @returns {string}
 */
function renderBreadcrumbsMarkup(entries, srcRelativePath) {
	const normalized = srcRelativePath.split(path.sep).join('/').replace(/^\/+/, '');
	// Should be able to match TOC file with path created here
	const currentItemHref = `~/src/${normalized}`;

	let breadcrumbs = [];
	let currentFound = false;

	seekBreadcrumbs(entries);

	/**
	 * Searches through the table of contents data structure to find the current page
	 * If the current page is found, it and its parents are saved into breadcrumbItems.
	 * @param {tocEntry[]} entries
	 */
	function seekBreadcrumbs(entries) {
		if (currentFound) {
			return;
		}

		for (const entry of entries) {
			// if the entry matches the current, push into breadcrumbs
			if (entry.href === currentItemHref) {
				breadcrumbs.push(entry);
				currentFound = true;
				return;
			}

			// if it doesn't match but there are child nodes,
			// save a copy to breadcrumbs in case we need it
			if (!currentFound && entry.children && entry.children.length) {
				breadcrumbs.push(JSON.parse(JSON.stringify(entry)));

				seekBreadcrumbs(entry.children);

				if (!currentFound) {
					breadcrumbs = [];
				}
			}
		}
	}

	return renderBreadcrumbs(breadcrumbs);
}

/**
 * Turns an array of breadcrumbs into usable markup.
 * @param {tocEntry[]} breadcrumbs
 */
function renderBreadcrumbs(breadcrumbs) {
	const itemMarkup = breadcrumbs
		.map((breadcrumb, index, all) => {
			if (breadcrumb.href === '~/src/index.md') {
				breadcrumb.name = 'Atlas';
			}
			if (index === all.length - 1) {
				breadcrumb.isFinal = true;
			}
			// Try to 'gracefully' handle directories by redirecting them to an 'overview' file
			// For future consideration consider aria hiding duplicates
			if (breadcrumb.isDirectory && breadcrumb.children?.length) {
				const name = breadcrumb.name;
				const overview = breadcrumb.children.find(c => c.href.includes('overview'));
				if (overview) {
					overview.name = name;
					breadcrumb = overview;
				}
			}

			return breadcrumb.isFinal
				? ``
				: `<li 
						class="breadcrumbs-item" 
						itemprop="itemListElement"
						itemscope=""
						itemtype="http://schema.org/ListItem">
						<a itemprop="item" href=${breadcrumb.href}><span itemprop="name">${breadcrumb.name}</span></a>
						<meta itemprop="position" content="${index + 1}">
					</li>`;
		})
		.join('');

	return `<div id="breadcrumbs-holder"><ol class="breadcrumbs">${itemMarkup}</ol></div>`;
}

module.exports.renderBreadcrumbsMarkup = renderBreadcrumbsMarkup;
