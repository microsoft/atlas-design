// Post-render URL rewriting for the Eleventy build.
//
// The markdown source and mustache templates use Parcel-style tilde paths
// (`~/src/...`) and link between docs with `.md` extensions. Parcel resolved
// these to hashed, root-absolute asset URLs. Here we instead:
//   1. resolve `~/src/...` to site-absolute URLs (and map scss->css, ts->js),
//   2. rewrite local `.md` links to `.html`,
//   3. relativize every root-absolute URL against the current page so the site
//      works when served from a subpath (e.g. microsoft.github.io/atlas-design)
//      as well as a domain root (design.learn.microsoft.com) and the dev server.
const path = require('path');

const EXTERNAL = /^(?:[a-z]+:|\/\/|#|mailto:|tel:|data:)/i;

/**
 * Resolve a single `~/src/<rest>` path to a site-absolute URL.
 */
function resolveTilde(rest) {
	if (rest.endsWith('.scss')) {
		return '/' + rest.replace(/\.scss$/, '.css');
	}
	if (rest.endsWith('.ts')) {
		return '/' + rest.replace(/\.ts$/, '.js');
	}
	if (rest.endsWith('.md')) {
		return '/' + rest.replace(/\.md$/, '.html');
	}
	return '/' + rest;
}

/**
 * Compute a page-relative URL for a site-absolute target.
 * @param {string} target e.g. "/scaffold/index.css"
 * @param {string} pageDir posix dir of current page, e.g. "/atomics"
 */
function relativize(target, pageDir) {
	const hashIndex = target.search(/[#?]/);
	const suffix = hashIndex === -1 ? '' : target.slice(hashIndex);
	const clean = hashIndex === -1 ? target : target.slice(0, hashIndex);
	let rel = path.posix.relative(pageDir, clean);
	if (rel === '') {
		rel = path.posix.basename(clean);
	}
	return rel + suffix;
}

/**
 * Rewrite all URLs in a rendered HTML page.
 * @param {string} html
 * @param {string} outputPath on-disk output path, e.g. "dist/atomics/spacing.html"
 * @param {string} distDir on-disk output root, e.g. "dist"
 */
function rewriteHtml(html, outputPath, distDir) {
	// Site-absolute path of the current page, e.g. "/atomics/spacing.html".
	const siteAbsPath = '/' + path.relative(distDir, outputPath).split(path.sep).join('/');
	const pageDir = path.posix.dirname(siteAbsPath);

	// 1. Resolve every `~/src/...` occurrence to a site-absolute URL.
	let out = html.replace(/~\/src\/[^\s"'`)>]+/g, match => {
		const rest = match.slice('~/src/'.length);
		return resolveTilde(rest);
	});

	// 2 + 3. Rewrite href/src attribute values: md->html and relativize.
	out = out.replace(
		/\b(href|src)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi,
		(full, attr, _raw, dq, sq, uq) => {
			const quote = dq !== undefined ? '"' : sq !== undefined ? "'" : '';
			let value = dq !== undefined ? dq : sq !== undefined ? sq : uq;

			if (!value || EXTERNAL.test(value)) {
				return full;
			}

			// Local .md link -> .html (preserve any #hash / ?query).
			value = value.replace(/\.md(?=$|[#?])/i, '.html');

			// Relativize site-absolute targets against the current page.
			if (value.startsWith('/') && !value.startsWith('//')) {
				value = relativize(value, pageDir);
			}

			return `${attr}=${quote}${value}${quote}`;
		}
	);

	return out;
}

module.exports = { rewriteHtml };
