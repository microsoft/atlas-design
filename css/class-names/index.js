// @ts-nocheck
const fs = require('fs-extra');
const path = require('path');
// const AtlasTokenTypes = require('../dist/tokens');
const atlasTokens = require('../dist/tokens.json');
const { quicktype, InputData, jsonInputForTargetLanguage } = require('quicktype-core');
const csstree = require('css-tree');

createClassNameReferences();

const themes = atlasTokens.themes.tokens.$themes;
const themeCssVarPrefix = '--theme-';

function createBlankThemeObject() {
	const item = {
		isValid: false
	};
	for (const [key, i] of Object.entries(themes)) {
		item[key] = '';
	}
	return item;
}

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

	const classnames = {};
	const collection = {};
	const textContents = await fs.readFile(indexPath, 'utf8');

	const cssAST = csstree.parse(textContents);
	await fs.ensureDir(outfilePath);

	// await fs.writeJSON(`${outfileStem}-ast.json`, cssAST);  // debugging

	let counter = 0;
	csstree.walk(cssAST, (node, item, list) => {
		if (node.type === 'Rule') {
			counter++;
			const { prelude, block } = node;
			const classSelectors = csstree.findAll(prelude, (node, item, list) => {
				return node.type === 'ClassSelector';
			});

			if (classSelectors.length === 1) {
				const colorDecl = csstree.find(block, (node, item, list) => {
					return (
						node.type === 'Declaration' &&
						(node.property === 'color' ||
							node.property === 'background-color' ||
							node.property === 'border-color' ||
							node.property === 'outline-color')
					);
				});

				const colorValue = colorDecl
					? csstree.find(
							colorDecl,
							node => node.type === 'Identifier' && node.name.indexOf(themeCssVarPrefix) === 0
					  )
					: null;

				let color = createBlankThemeObject();

				if (colorValue) {
					// remove --theme-prefix as it doesn't exist in the token map
					const name = colorValue.name.replace(themeCssVarPrefix, '');

					if (name in themes.light) {
						// we can be reasonably sure that if a color is in light, its in other themes
						color.light = themes.light[name];
						color.dark = themes.dark[name];
						color['high-contrast'] = themes['high-contrast'][name];
						color.isValid = true;
					}
				}

				collection[classSelectors[0].name] = {
					name: classSelectors[0].name,
					color
				};
			}
		}

		if (node.type === 'ClassSelector' && !(node.name in collection)) {
			collection[node.name] = { name: node.name };
		}
	});

	const classes = Object.keys(collection).sort();

	try {
		console.log(classes.length, 'class names found. Generating a file with their names.');
		await fs.ensureDir(outfilePath);
		await Promise.all([
			fs.writeJSON(`${outfileStem}.json`, classes),
			// fs.writeJSON(`${outfileStem}-test.json`, collection), // debugging

			quicktypeJSON(
				'AtlasClassNames',
				JSON.stringify(classnames),
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
