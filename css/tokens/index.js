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
 *
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
 *
 * @param {import('./types').SassExportCollection} collection collection of grouped tokens to be sorted
 * @returns {import('./types').SassExportCollection}
 */
function getSortedOrder(collection) {
	return Object.fromEntries(Object.entries(collection).sort());
}

/**
 *
 * @param {string[]} paths token file paths
 */
// Print a warning if a token file lacks the required sass-export-section comments.
function checkFileComments(paths) {
	paths.forEach(path => {
		try {
			fs.readFile(path, 'utf8', function read(err, result) {
				if (err) {
					throw err;
				}
				if (!result.includes('@sass-export-section')) {
					console.log(`Warning: ${path} is missing @sass-export-section annotations.`);
				}
			});
		} catch (err) {
			throw new Error(`Problem reading token files: ${err}`);
		}
	});
}

/**
 *
 * @param {import('./types').SassExportTokens} tokens raw token data by group
 * @returns {import('./types').SassExportCollection}
 */
function collectTokens(tokens) {
	/** @type {import('./types').SassExportCollection} */
	const collection = {};
	for (const [parent, tokenValues] of Object.entries(tokens)) {
		//Currently using sass-export-section annotations in the token files for grouping.
		//Tokens without annotations will be combined in the variables array.
		if (parent === 'variables') continue;

		const collectedValues = tokenValues.reduce(
			(
				/** @type {import('./types').SassExportCollection } */ all,
				/** @type {import('./types').SassExportTokenItem} */ current
			) => {
				const tokenName = current.name;

				/** @type {string | import('./types').SassExportTokenNestedItem} */
				const values = current.mapValue
					? { ...getNestedTokens(current) }[tokenName]
					: current.compiledValue;

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
 *
 * @param {import('./types').SassExportTokenItem} child
 * @returns {{[key: string]: import('./types').SassExportTokenNestedItem}}
 */
function getNestedTokens(child) {
	if (!child.mapValue) {
		const { name, compiledValue, value } = child;
		return { [name]: compiledValue ? compiledValue : value };
	}
	/** @type {{[key: string]: import('./types').SassExportTokenNestedItem}} */
	const childMap = {};
	child.mapValue.forEach(subChild => {
		childMap[child.name] = { ...childMap[child.name], ...getNestedTokens(subChild) };
	});
	return childMap;
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
