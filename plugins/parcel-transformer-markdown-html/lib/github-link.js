/**
 * @typedef {object} tocEntry
 * @property {string} name
 * @property {string} href
 * @property {boolean} isDirectory
 * @property {boolean} isHidden
 * @property {tocEntry[]?} children
 */

function buildGithubLink(currentAssetFilePath) {
	let currentPath = currentAssetFilePath.split(`site\\src\\`);
	if (!currentPath[1]) {
		currentPath = currentAssetFilePath.split(`site/src/`);
	}
	if (!currentPath[1]) {
		throw new Error(`Error parsing asset for breadcrumbs in "${currentAssetFilePath}"`);
	}

	const currentItemHref = currentPath[1].replaceAll('\\', '/');

	return `https://github.com/microsoft/atlas-design/blob/main/site/src/${currentItemHref}`;
}

module.exports.buildGithubLink = buildGithubLink;
