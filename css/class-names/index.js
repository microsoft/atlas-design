const fs = require('fs-extra');
const path = require('path');
const { quicktype, InputData, jsonInputForTargetLanguage } = require('quicktype-core');

createClassNameReferences();

async function createClassNameReferences() {
	const filePathStem = path.join(process.cwd(), './src/class-names');
	const outfilePath = path.join(process.cwd(), `/dist/`);
	const filename = 'class-names';
	const outfileStem = path.join(outfilePath, filename);

	const indexPath = path.resolve(filePathStem, '../../dist/index.css');

	if (!(await fs.pathExists(indexPath))) {
		throw new Error(
			`Index file not found at "${indexPath}". Cannot generate class name references.`
		);
	}

	const filenames = {};

	const textContents = await fs.readFile(indexPath, 'utf8');
	const cssClassNameRegexp = /\.-?([_a-zA-Z]+[_a-zA-Z0-9-]*)/g;

	let matches;

	while ((matches = cssClassNameRegexp.exec(textContents)) !== null) {
		filenames[matches[1]] = true;
		// note that this does not match rule contents
	}

	const collection = Object.keys(filenames).sort();

	try {
		console.log(collection.length, 'class names found. Generating a file with their names.');
		await fs.ensureDir(outfilePath);
		await Promise.all([
			fs.writeJSON(`${outfileStem}.json`, collection),
			quicktypeJSON(
				'AtlasClassNames',
				JSON.stringify(collection),
				`${outfileStem}.ts`,
				'typescript'
			)
		]);
		console.log(
			`Class names written to "${path.join(process.cwd(), `/dist/${outfileStem}.json`)}".`
		);
	} catch (err) {
		throw new Error(`Problem writing output: ${err}`);
	}
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
