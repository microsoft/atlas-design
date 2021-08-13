const fs = require('fs-extra');
const path = require('path');
const { quicktype, InputData, jsonInputForTargetLanguage } = require('quicktype-core');
const { exporter } = require('sass-export');

createTokens();

async function createTokens() {
	const filePathStem = path.join(process.cwd(), './src/tokens');
	const indexPath = path.resolve(filePathStem, 'index.scss');

	const filePaths = await getInputFilesFromIndex(filePathStem, indexPath);
	checkFileComments(filePaths);

	/** @type {import('./types').SassExportOptions} */
	const options = {
		inputFiles: filePaths
	};

	const exportedTokens = exporter(options).getStructured();
	const collection = getSortedOrder(collectTokens(exportedTokens));

	const outfolder = './dist';
	const outfileStem = path.join(outfolder, 'tokens');

	try {
		await fs.ensureDir(outfolder);
		await Promise.all([
			fs.writeJSON(`${outfileStem}.json`, collection),
			quicktypeJSON('AtlasTokens', JSON.stringify(collection), `${outfileStem}.ts`, 'typescript')
		]);
		console.log(`Tokens written to "${path.join(process.cwd(), `/dist/${outfileStem}.json`)}".`);
	} catch (err) {
		throw new Error(`Problem writing output: ${err}`);
	}
}

/**
 * Read the token index file's content and generate a list of import paths in its respective order
 * @param {string} filePathStem tokens directory path
 * @param {string} indexPath tokens index file path
 * @returns {Promise<string[]>}
 */
async function getInputFilesFromIndex(filePathStem, indexPath) {
	/** @type {string[]} */
	const filePaths = [];
	try {
		const indexFile = (await fs.readFile(indexPath)).toString();
		const lines = indexFile.split('\n').reduce((arr, line) => {
			if (line.includes('@import')) {
				const filePath = line.replace('@import', '').replaceAll(`'`, '').replace(';', '').trim();
				arr.push(path.join(filePathStem, filePath));
			}
			return arr;
		}, filePaths);
		return lines;
	} catch (err) {
		throw err;
	}
}

/**
 * Print a warning if a token file lacks the required sass-export-section comments.
 * @param {string[]} paths token file paths
 */
function checkFileComments(paths) {
	const promises = paths.map(async path => {
		try {
			const result = await fs.readFile(path, 'utf8');
			if (!result.includes('@sass-export-section')) {
				console.log(`Warning: ${path} is missing @sass-export-section annotations.`);
			}
		} catch (err) {
			throw new Error(`Problem reading token files: ${err}`);
		}
	});

	return Promise.all(promises);
}

/**
 * Sort the grouped tokens alphabetically
 * @param {import('./types').SassExportCollection} collection collection of grouped tokens to be sorted
 * @returns {import('./types').SassExportCollection}
 */
function getSortedOrder(collection) {
	return Object.fromEntries(Object.entries(collection).sort());
}

/**
 * Condense the raw data from sass-export into simple objects
 * @param {import('./types').SassExportTokens} tokens raw token data by group
 * @returns {import('./types').SassExportCollection}
 */
function collectTokens(tokens) {
	/** @type {import('./types').SassExportCollection} */
	const collection = {};
	for (const [parent, tokenValues] of Object.entries(tokens)) {
		//Currently using sass-export-section annotations in the token files for grouping.
		//Tokens without annotations will be combined in the variables array.
		if (parent === 'variables') {
			continue;
		}

		const collectedValues = tokenValues.reduce(
			(
				/** @type {import('./types').SassExportCollection} */ all,
				/** @type {import('./types').SassExportTokenItem} */ current
			) => {
				const tokenName = current.name;

				/** @type {string | import('./types').SassExportTokenNestedItem} */
				const values = current.mapValue
					? { ...getNestedTokens(current) }[tokenName]
					: convertBoolean(current.compiledValue.replaceAll(' ,  ', ', '));
				all[parent] = {
					...all[parent],
					[tokenName]: values
				};
				return all;
			},
			{}
		);
		collection[parent] = {
			name: parent,
			location: `/css/src/tokens/${parent}.scss`,
			tokens: collectedValues[parent]
		};
	}

	return collection;
}

/**
 * Aggregate nested values when token value is a Sass map
 * Note, this currently only targets two levels of nesting.
 * Sass-export seems to have trouble parsing maps that have more two levels.
 * @param {import('./types').SassExportTokenItem} tokenItem
 * @returns {import('./types').SassExportNestedCollection}
 */
function getNestedTokens(tokenItem) {
	const { name, compiledValue, mapValue } = tokenItem;

	/** @type {import('./types').SassExportNestedCollection} */
	const newCompiledValue = {};

	const nested = containsMapValue(tokenItem);

	if (!nested) {
		parseCompiledValue(compiledValue, name, newCompiledValue);
	}

	if (mapValue && nested) {
		for (const child of mapValue) {
			parseCompiledValue(child.compiledValue, child.name, newCompiledValue);
		}
	}
	return { [name]: nested ? newCompiledValue : newCompiledValue[name] };
}

/**
 * Return a boolean if the token item has nested maps
 * Note, this currently only targets two levels of nesting.
 * @param {import('./types').SassExportTokenItem} tokenItem
 * @returns {boolean}
 */
function containsMapValue(tokenItem) {
	if (tokenItem.mapValue) {
		for (const values of tokenItem.mapValue) {
			if (values.hasOwnProperty('mapValue')) {
				return true;
			}
		}
	}
	return false;
}

/**
 * Return an object of tokens by parsing the token item's compiled value string
 * @param {string} compiledValue
 * @param {string} name
 * @param {{[name: string]: import('./types').SassExportTokenNestedItem}} collection
 * @returns {import('./types').SassExportNestedCollection}
 */
function parseCompiledValue(compiledValue, name, collection) {
	const parsedValue = compiledValue
		.replace(/^\(/, '')
		.replace(/\((?![^-]*: )/, '')
		.replace(/\)$/, '')
		.replaceAll(/\){2,}/g, ')')
		.split(/\,(?![^"]*\))/);

	return parsedValue.reduce((subCollection, val) => {
		const [subKey, value] = val.replaceAll(' ', '').replaceAll('"', '').split(':');

		subCollection[name] = {
			...subCollection[name],
			[subKey]: convertBoolean(value.replace(/^\(/, ''))
		};

		return subCollection;
	}, collection);
}

/**
 * Convert boolean string to a boolean value
 * @param {string} str
 * @returns {boolean | string}
 */
function convertBoolean(str) {
	if (str === 'true') {
		return true;
	}
	if (str === 'false') {
		return false;
	}
	return str;
}

/**
 *
 * @param {string} typeName The name of the global type
 * @param {string} jsonString The JSON to parse
 * @param {string} outfile Where to save the file
 * @param {string} targetLanguage To which language to convert the types
 * @returns promise
 */
async function quicktypeJSON(typeName, jsonString, outfile, targetLanguage = 'typescript') {
	const jsonInput = jsonInputForTargetLanguage(targetLanguage);

	// We could add multiple samples for the same desired
	// type, or many sources for other types. Here we're
	// just making one type from one piece of sample JSON.
	await jsonInput.addSource({
		name: typeName,
		samples: [jsonString]
	});

	const inputData = new InputData();
	inputData.addInput(jsonInput);
	const result = await quicktype({
		inputData,
		lang: targetLanguage
	});
	return fs.writeFile(outfile, result.lines.join('\n'));
}
