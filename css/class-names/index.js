/**
 * Getting an error here? Remember to run `npm run prepare:extension` before debugging extension.
 */

// @ts-nocheck
const { access, readFile, writeFile, mkdir } = require('fs/promises');
const path = require('path');
const atlasTokens = require('../dist/tokens.json');
const { quicktype, InputData, jsonInputForTargetLanguage } = require('quicktype-core');
const csstree = require('css-tree');

const COLOR_PROPS = {
	'accent-color': true,
	'caret-color': true,
	color: true,
	'column-rule-color': true,
	'background-color': true,
	'border-color': true,
	'border-top-color': true,
	'border-right-color': true,
	'border-bottom-color': true,
	'border-left-color': true,
	fill: true,
	'outline-color': true,
	'stop-color': true,
	stroke: true,
	'text-decoration-color': true
};

const SPACING_PROPS = {
	'margin-left': true,
	'margin-right': true,
	'margin-inline': true,
	'margin-top': true,
	'margin-bottom': true,
	margin: true,
	'margin-inline': true,
	'margin-block': true,
	padding: true,
	'padding-inline': true,
	'padding-block': true,
	'padding-top': true,
	'padding-bottom': true,
	'padding-left': true,
	'padding-right': true,
	gap: true,
	'font-size': true
};

const staticColorRegexp = /([\w|-]*)-static/gu;

createClassNameReferences();

const colorTokens = atlasTokens.colors.tokens;
const themes = atlasTokens.themes.tokens.$themes;
const themeCssVarPrefix = '--theme-';

function createBlankColorObject() {
	const item = {
		isValid: false,
		detailType: '',
		universal: ''
	};
	for (const [key, i] of Object.entries(themes)) {
		item[key] = '';
	}
	return item;
}

function createBlankSizeObject() {
	return {
		isValid: false,
		value: ''
	};
}

async function createClassNameReferences() {
	const filePathStem = path.join(process.cwd(), './src/class-names');
	const outfilePath = path.join(process.cwd(), `/dist/`);
	const filename = 'class-names';
	const outfileStem = path.join(outfilePath, filename);

	const indexPath = path.resolve(filePathStem, '../../dist/index.css');

	try {
		await access(indexPath);
	} catch {
		throw new Error(
			`Index file not found at "${indexPath}". Cannot generate class name references.`
		);
	}

	const classnames = {};
	const collection = {};
	const textContents = await readFile(indexPath, 'utf8');

	const cssAST = csstree.parse(textContents);
	await mkdir(outfilePath, { recursive: true });

	// await fs.writeJSON(`${outfileStem}-ast.json`, cssAST); // debugging

	let counter = 0;
	csstree.walk(cssAST, (node, item, list) => {
		if (node.type === 'Rule') {
			const { prelude, block } = node;
			const classSelectors = csstree.findAll(prelude, node => {
				return node.type === 'ClassSelector';
			});

			if (classSelectors.length === 1) {
				const className = classSelectors[0].name;
				const colorDecl = csstree.find(block, (node, item, list) => {
					// scope things down to remove cruft
					return (
						node.type === 'Declaration' &&
						node.property in COLOR_PROPS &&
						namestartsWithColorProp(className)
					);
				});

				let color = createBlankColorObject();
				const size = createBlankSizeObject();

				if (colorDecl) {
					const colorValue = colorDecl
						? csstree.find(
								colorDecl,
								node => node.type === 'Identifier' && node.name.indexOf(themeCssVarPrefix) === 0
						  )
						: null;

					if (colorValue) {
						// remove --theme-prefix as it doesn't exist in the token map
						const name = colorValue.name.replace(themeCssVarPrefix, '');

						if (name in themes.light) {
							color.isValid = true;
							color.detailType = 'themed';

							// we can be reasonably sure that if a color is in light, it's in other themes
							color.light = themes.light[name];
							color.dark = themes.dark[name];
							color['high-contrast'] = themes['high-contrast'][name];
						}
					} else if (className.endsWith('-static')) {
						// if a color declaration ends in -static an starts with a color class, check color tokens to see if we have the value
						const atomicsWithoutProperty = className.replace(`${colorDecl.property}-`, ''); // since atomics need to start with a css property, we can safetly strip it out
						const cssVariableName = `$${atomicsWithoutProperty}`;
						if (cssVariableName in colorTokens) {
							color.isValid = true;
							color.detailType = 'static';
							color.universal = colorTokens[`$${atomicsWithoutProperty}`];
						}
					}
				} else {
					// no color found lets see if we can append spacing info instead
					const spacingDecl = csstree.find(block, (node, item, list) => {
						// scope things down to remove cruft
						return (
							node.type === 'Declaration' &&
							node.property in SPACING_PROPS &&
							namestartsWithSizingProp(className)
						);
					});

					if (spacingDecl) {
						const spacingValueNode = spacingDecl
							? csstree.find(
									spacingDecl,
									node => node.type === 'Dimension' && node.value && node.unit
							  )
							: null;
						if (spacingValueNode && spacingValueNode.value && spacingValueNode.unit) {
							size.value = `${spacingValueNode.value}${spacingValueNode.unit}`;
							if (spacingValueNode.unit === 'rem') {
								size.value += ` (${spacingValueNode.value * 16}px)`;
							}
							size.isValid = true;
						}
					}
				}

				collection[classSelectors[0].name] = {
					name: classSelectors[0].name,
					color,
					size
				};
			}
		}

		if (node.type === 'ClassSelector' && !(node.name in collection)) {
			collection[node.name] = {
				name: node.name,
				color: createBlankColorObject(),
				size: createBlankSizeObject()
			};
		}
	});

	// want to know the number of classes and have alphaordered keys
	const orderedArray = Object.keys(collection).sort();
	const classes = orderedArray.reduce((obj, key) => {
		obj[key] = collection[key];
		return obj;
	}, {});

	try {
		console.log(orderedArray.length, 'class names found. Generating a file with their names.');
		await mkdir(outfilePath, { recursive: true });
		await Promise.all([
			writeFile(`${outfileStem}.json`, JSON.stringify(classes)),
			// writeFile(`${outfileStem}-test.json`, JSON.stringify(collection)), // debugging

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
	return writeFile(outfile, result.lines.join('\n'));
}

function namestartsWithColorProp(name) {
	for (const prop in COLOR_PROPS) {
		if (name.indexOf(prop) === 0) {
			return true;
		}
	}
	return false;
}

function namestartsWithSizingProp(name) {
	for (const prop in SPACING_PROPS) {
		if (name.indexOf(prop) === 0) {
			return true;
		}
	}
	return false;
}
