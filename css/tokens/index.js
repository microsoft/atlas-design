const fs = require('fs-extra');
const path = require('path');
const { quicktype, InputData, jsonInputForTargetLanguage } = require('quicktype-core');
const { exporter } = require('sass-export');

createTokens();

async function createTokens() {
	const options = {
		inputFiles: [
			require.resolve('../src/tokens/features.scss'),
			require.resolve('../src/tokens/palette.scss'),
			require.resolve('../src/tokens/animation.scss'),
			require.resolve('../src/tokens/border.scss'),
			require.resolve('../src/tokens/breakpoints.scss'),
			require.resolve('../src/tokens/display.scss'),
			require.resolve('../src/tokens/colors.scss'),
			require.resolve('../src/tokens/direction.scss'),
			require.resolve('../src/tokens/focus.scss'),
			require.resolve('../src/tokens/font-stack.scss'),
			require.resolve('../src/tokens/layout.scss'),
			require.resolve('../src/tokens/position.scss'),
			require.resolve('../src/tokens/radius.scss'),
			require.resolve('../src/tokens/schemes.scss'),
			require.resolve('../src/tokens/shadow.scss'),
			require.resolve('../src/tokens/spacing.scss'),
			require.resolve('../src/tokens/themes.scss'),
			require.resolve('../src/tokens/typography.scss'),
			require.resolve('../src/tokens/z-index.scss')
		]
	};

	const exportedTokens = exporter(options).getStructured();
	const collection = collectTokens(exportedTokens);

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
 * @param { import('./types').SassExportTokens } tokens raw token data by group
 * @returns { import('./types').SassExportCollection }
 */
function collectTokens(tokens) {
	/** @type {{ [key: string]: import('./types').SassExportCollectionItem }} */
	const collection = {};
	for (const [parent, tokenValues] of Object.entries(tokens)) {
		//Currently using sass-export-section annotations in the token files for grouping.
		//Tokens without annotations will be combined in the variables array.
		if (parent === 'variables') continue;

		const collectedValues = tokenValues.reduce(
			(
				/** @type {{ [x: string]: {name: string, location: string, tokens: { [t: string]: import('./types').SassExportTokenItem}} }} */ all,
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
 * @param { import('./types').SassExportTokenItem } child
 * @returns {{ [key: string]: import('./types').SassExportTokenNestedItem}}
 */
function getNestedTokens(child) {
	if (!child.mapValue) {
		const { name, compiledValue, value } = child;
		return { [name]: compiledValue ? compiledValue : value };
	}
	/** @type {{ [key: string]: import('./types').SassExportTokenNestedItem }} */
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
