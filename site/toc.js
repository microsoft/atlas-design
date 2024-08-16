// @ts-nocheck
const path = require('path');
const fs = require('fs-extra');
const frontMatter = require('front-matter');

const siteDir = path.join(process.cwd(), '/src/');
console.log(siteDir);

const routesForClassPrefixes = {};

const settings = normalizePaths({
	/**
	 * Folders to ignore
	 */
	ignore: { scaffold: true },
	/**
	 * Output location
	 */
	outFile: path.resolve(siteDir, 'scaffold', 'toc.json'),
	/**
	 * Names to transform, start with `/`, which mean `src/<here>`
	 * key: filepath to match exactly
	 * value: new displayed in toc. You may use '[hide]' to hide it from the toc.
	 */
	names: {
		'/index.md': '[hide]',
		'/not-found.md': '[hide]',
		'/tokens': 'Tokens',
		'/components': 'Components',
		'/patterns': 'Patterns',
		'/atomics': 'Atomics',
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
	},
	distFolder: path.resolve(process.cwd(), 'dist')
});

createToc().then(async toc => {
	const { outFile, distFolder } = settings;
	const saveTo = outFile;
	fs.writeFile(saveTo, JSON.stringify(toc));
	await fs.ensureDir(distFolder);
	const classPrefixesOutFile = path.resolve(distFolder, 'routes-for-class-prefixes.json');
	fs.writeFile(classPrefixesOutFile, JSON.stringify(routesForClassPrefixes));
});

/**
 * Ensure settings will work regardless of operating system
 */
function normalizePaths(settings) {
	for (const key in settings.names) {
		const normalized = path.posix.normalize(key);
		const clone = JSON.parse(JSON.stringify(settings.names[key]));
		delete settings.names[key];
		settings.names[normalized] = clone;
	}
	return settings;
}

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

	/**
	 * Whether this is the first TOC entry. Useful for apply spacing differently.
	 */
	let isFirst = true;

	// get stats on everything in this folder
	for (const item of items) {
		/**
		 * A path relative to the root of the articles folder.
		 */
		const srcPath = path.posix.normalize(`${subDir}/${item}`);
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

		// Only add markdown files and directories, except ignored files
		if (parsed.name in settings.ignore || (!isDirectory && !isMarkdown)) {
			continue;
		}

		const name = await getName(settings, srcPath, isMarkdown, location, parsed);

		if (isMarkdown) {
			await getclassPrefixes(location, srcPath, name);
		}
		/**
		 * The data structure
		 */
		const entry = {
			name: name,
			// The TOC will be emitted as links in an html file in various directories
			// Use a tilde path to ensure parcel can resolve the url
			// https://v2.parceljs.org/features/module-resolution/#tilde-paths
			href: `~/src${srcPath}`,
			isDirectory,
			isHidden: name === '[hide]',
			isFirst
		};

		if (entry.isDirectory) {
			entry.children = await createToc(srcPath);
			entry.children.sort(
				(a, b) => b.href.includes('overview.md') - a.href.includes('overview.md')
			);
		}

		scaffold.push(entry);

		isFirst = false;
	}

	return scaffold;
}

async function getName(settings, srcPath, isMarkdown, location, parsed) {
	if (settings.names && srcPath in settings.names) {
		return settings.names[srcPath];
	}

	if (isMarkdown) {
		const contents = await fs.readFile(location, 'utf-8');
		const { attributes } = frontMatter(contents);

		if (attributes.title) {
			return attributes.title;
		}
	}

	return parsed.name;
}

async function getclassPrefixes(location, pagePath, pageName) {
	const contents = await fs.readFile(location, 'utf-8');
	const { attributes } = frontMatter(contents);
	if (!Array.isArray(attributes.classPrefixes)) {
		return;
	}

	for (const prefix of attributes.classPrefixes) {
		const href = pagePath.replace('.md', '.html');
		routesForClassPrefixes[prefix] = {
			href,
			title: pageName,
			type: attributes.classType || undefined
		};
	}
}
