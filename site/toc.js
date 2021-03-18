// @ts-check
const path = require('path');
const fs = require('fs-extra');

const siteDir = path.join(process.cwd(), '/src/');

createToc().then(toc => {
	const saveTo = path.resolve(siteDir, 'scaffold', 'toc.json');
	fs.writeFile(saveTo, JSON.stringify(toc));
});

async function createToc(subDir) {
	subDir = subDir || '';
	/**
	 * The current working directory.
	 * Uses articlesSrcPath so things can easily stay relative.
	 */
	const directory = path.join(siteDir, subDir);
	/**
	 * All the items in the directory.
	 */
	const items = await fs.readdir(directory);
	/**
	 * A data structure to make building things to HTML relatively straightforward.
	 */
	const scaffold = [];

	// get stats on everything in this folder
	for (const item of items) {
		/**
		 * A path relative to the root of the articles folder.
		 */
		const srcPath = `${subDir}/${item}`;
		/**
		 * Parse the item's name
		 */
		const parsed = path.parse(item);
		/**
		 * The absolute path of directory we're in now.
		 * Could be a subdirectory of articles.
		 */
		const location = path.join(siteDir, srcPath);
		/**
		 * Whether where on a folder.
		 */
		let isDirectory = false;
		/**
		 * Whether the entry is a markdown file.
		 */
		const isMarkdown = parsed.ext === '.md';

		// If it's not markdown, determine if it's a directory
		if (!isMarkdown) {
			isDirectory = (await fs.stat(location)).isDirectory();
		}

		// Only add markdown files and directories, except scaffold
		if (parsed.name === 'scaffold' || (!isDirectory && !isMarkdown)) {
			continue;
		}

		/**
		 * The data structure
		 */
		const entry = {
			name: parsed.name, // note: this isn't correct
			href: srcPath,
			isDirectory
		};

		console.log(entry);

		if (entry.isDirectory) {
			entry.children = await createToc(srcPath);
		}

		scaffold.push(entry);
	}

	return scaffold;
}

/**
 * Get a parcel-friendly href
 * @param {string} srcPath The original path to the file
 * @returns
 */
function getHref(srcPath) {
	return srcPath;
}
