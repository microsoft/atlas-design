/**
 * Build a GitHub edit link from a source file path.
 * Ported from parcel-transformer-markdown-html/lib/github-link.js
 * @param {string} inputPath - 11ty page.inputPath (e.g., "./src/components/button.md")
 * @returns {string}
 */
function buildGithubLink(inputPath) {
	// Normalize to forward slashes and extract the path relative to site/src/
	const normalized = inputPath.replace(/\\/g, '/');
	const marker = 'src/';
	const idx = normalized.indexOf(marker);
	if (idx === -1) {
		return 'https://github.com/microsoft/atlas-design';
	}
	const relativePath = normalized.substring(idx);
	return `https://github.com/microsoft/atlas-design/blob/main/site/${relativePath}`;
}

module.exports = { buildGithubLink };
