// @ts-check
const { Transformer } = require('@parcel/plugin');
const { promisify } = require('@parcel/utils');
const frontMatter = require('front-matter');
const path = require('path');
const g = require('glob');
const glob = promisify(g);
const fs = require('fs-extra');

module.exports = new Transformer({
	async transform({
		asset, // https://v2.parceljs.org/plugin-system/transformer/#MutableAsset
		options, // https://v2.parceljs.org/plugin-system/api/#PluginOptions
		logger // https://v2.parceljs.org/plugin-system/logging/#PluginLogger
	}) {
		asset.type = 'json';
		const code = await asset.getCode();
		const settings = JSON.parse(code);
		const base = path.parse(asset.filePath).dir;
		const cwd = path.resolve(base, settings.dir);

		// Log out the things!
		logger.verbose({
			message: JSON.stringify({
				location: cwd,
				assetPath: asset.filePath
			}),
			filePath: asset.filePath
		});

		const scaffold = await createToc(cwd, '', settings, options);

		asset.setCode(JSON.stringify(scaffold));

		return [asset];
	}
});

// @ts-check

async function createToc(
	cwd,
	subDir,
	settings, // arr
	options // https://v2.parceljs.org/plugin-system/api/#PluginOptions
	// logger, // https://v2.parceljs.org/plugin-system/logging/#PluginLogger,
	// asset // https://v2.parceljs.org/plugin-system/transformer/#MutableAsset
) {
	/**
	 * The current working directory.
	 * Uses articlesSrcPath so things can easily stay relative.
	 */
	const directory = path.resolve(cwd, subDir);

	/**
	 * All the items in the directory.
	 */
	const items = (await fs.readdir(directory)).filter(item => !(item in settings.ignore));

	/**
	 * A data structure to make building things to HTML relatively straightforward.
	 */
	const scaffold = [];

	// // get stats on everything in this folder
	for (const item of items) {
		/**
		 * The absolute path of directory we're in now.
		 * Could be a subdirectory of articles.
		 */
		const location = path.resolve(cwd, subDir, item);
		/**
		 * A path relative to the root of the cwd
		 */
		const srcPath = path.join(subDir, item);
		/**
		 * Parse the item's name
		 */
		const parsed = path.parse(item);
		/**
		 * Whether we're in a folder.
		 */
		let isDirectory = false;
		/**
		 * Whether the entry is a markdown file.
		 */
		const isMarkdown = parsed.ext === '.md';
		// If it's not markdown, determine if it's a directory
		if (!isMarkdown) {
			isDirectory = (await options.inputFS.stat(location)).isDirectory();
		}
		// Only add markdown files and directories, except scaffold
		if (!isDirectory && !isMarkdown) {
			continue;
		}
		/**
		 * The data structure
		 */
		const entry = {
			name: parsed.name, // note: this isn't correct
			href: isMarkdown ? srcPath.replace('.md', '.html') : null,
			srcPath,
			isDirectory,
			displayName: await getName(settings, srcPath, isMarkdown, options, location, parsed)
		};
		/**
		 * For directorys, we'll go find the child pages
		 */
		if (entry.isDirectory) {
			entry.children = await createToc(
				cwd,
				srcPath,
				settings,
				options // https://v2.parceljs.org/plugin-system/api/#PluginOptions
				// logger, // https://v2.parceljs.org/plugin-system/logging/#PluginLogger,
				// asset
			);
		}

		scaffold.push(entry);
	}

	return scaffold;
}

async function getName(settings, srcPath, isMarkdown, options, location, parsed) {
	if (settings.names && srcPath in settings.names) {
		return settings.names[srcPath];
	}

	if (isMarkdown) {
		const contents = await options.inputFS.readFile(location, 'utf-8');
		const { attributes } = frontMatter(contents);

		if (attributes.title) {
			return attributes.title;
		}
	}

	return parsed.name;
}
