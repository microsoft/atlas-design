const sassExtract = require('sass-extract');
const fs = require('fs-extra');
const path = require('path');
const { convertSassVariable } = require('./conversion');
const { quicktype, InputData, jsonInputForTargetLanguage } = require('quicktype-core');

createTokens();

async function createTokens() {
	const indexFile = require.resolve('../src/tokens/index.scss');

	/** @type {import('./types').SassConvertRendered }} **/
	const rendered = await sassExtract.render({
		file: indexFile
	});

	const collection = collectTokenSources(rendered);

	for (const name in rendered.vars.global) {
		const rule = rendered.vars.global[name];
		// get the parent token's name
		const parent = getTokenFromSource(rule);
		// convert each rule to a simpler structure (recurses for maps and lists)
		const converted = convertSassVariable(rule, name);
		// add the converted token to the collection
		collection[parent].tokens = { ...collection[parent].tokens, ...converted };
	}
	const outfolder = './dist';
	const outfileStem = path.join(outfolder, 'tokens');

	try {
		await fs.ensureDir(outfolder);
		await Promise.all([
			fs.writeJSON(`${outfileStem}.json`, collection),
			quicktypeJSON('AtlasTokens', JSON.stringify(collection), `${outfileStem}.d.ts`, 'typescript')
		]);
		console.log(`Tokens written to "${path.join(process.cwd(), '/dist/index.json')}".`);
	} catch (err) {
		throw new Error(`Problem writing output: ${err}`);
	}
}

/**
 *
 * @param {{ [key: string]: any}} rendered
 * @returns {{[key: string]: { [key: string]: any} }}
 */
function collectTokenSources(rendered) {
	const collection = rendered.stats.includedFiles
		.map((/** @type {string} */ file) => {
			return { name: getFinalFilePart(file), location: getAtlasFilePath(file) };
		})
		.filter((/** @type {{ name: string; location: string; }} */ x) => x.name !== 'index')
		.reduce(
			(
				/** @type {{ [x: string]: any; }} */ all,
				/** @type {{ name: string | number; }} */ source
			) => {
				all[source.name] = {
					...source,
					tokens: {}
				};
				return all;
			},
			{}
		);
	return collection;
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

/**
 * Rules returned by sass-convert sometimes contain the file source from which they're declared.
 * @param {import('./types').SassRule} rule
 * @returns string
 */
function getTokenFromSource(rule) {
	if (rule.sources && rule.sources.length > 0) {
		return getFinalFilePart(rule.sources[0]);
	}
	return 'other';
}

/**
 * Slice off unwanted parts of a scss files file path.
 * @param {string} filePath
 * @returns string
 */
function getFinalFilePart(filePath) {
	return filePath.slice(filePath.lastIndexOf('/') + 1).replace('.scss', '');
}

/**
 * Get Atlas relative path from absolute file path returned by sass-convert.
 * @param {string} path
 * @returns string
 */
function getAtlasFilePath(path) {
	return path.split('atlas-design')[1];
}
