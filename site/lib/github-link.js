const path = require('path');

/**
 * Build the "edit this page on GitHub" link for a page given its
 * src-relative path (e.g. "atomics/spacing.md").
 * @param {string} srcRelativePath posix-style path relative to site/src
 * @returns {string}
 */
function buildGithubLink(srcRelativePath) {
	const currentItemHref = srcRelativePath.split(path.sep).join('/').replace(/^\/+/, '');
	return `https://github.com/microsoft/atlas-design/blob/main/site/src/${currentItemHref}`;
}

module.exports.buildGithubLink = buildGithubLink;
