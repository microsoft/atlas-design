const sassExtract = require('sass-extract');
const glob = require('fast-glob');
const fs = require('fs-extra');
const path = require('path');
const { getFinalFilePart, convertSassVariable } = require('./conversion');

const distFolder = path.join(process.cwd(), '/dist');

createTokens(distFolder);

/**
 * @param {string} distFolder Path to which tokens are written
 */
async function createTokens(distFolder) {
	// Global variables play better when we just import a single index file
	const indexFile = require.resolve('@microsoft/atlas-css/src/tokens/index.scss');
	await fs.ensureDir(distFolder);

	sassExtract
		.render({
			file: indexFile
		})
		.then(async (/** @type {import('./types').SassConvertRendered }} */ rendered) => {
			const tokens = collectTokenSources(rendered);
			writeVariables(rendered, tokens);

			Object.keys(tokens).map(token => {
				const outfileStem = path.join(distFolder, token);
				const json = JSON.stringify(tokens[token]);
				// writing json output
				fs.writeJSON(outfileStem + '.json', json);
				fs.writeFile(outfileStem + '.js', writeJsToken(json));
			});
		})
		.catch((/** @type {any} */ err) => {
			console.log(err);
		});
}

/**
 *
 * @param {import('./types').SassConvertRendered} rendered
 * @param { {[key:string]: any}} tokens
 */
function writeVariables(rendered, tokens) {
	for (const name in rendered.vars.global) {
		const rule = rendered.vars.global[name];
		addToTokens(tokens, convertSassVariable(rule, name));
	}
}

/**
 *
 * @param {*} tokens
 * @param {*} result
 */
function addToTokens(tokens, result) {
	if (!result) {
		throw new Error('Could not add set of tokens.');
	}
	if (!(result.parent in tokens)) {
		throw new Error(`Missing parent property from token set: ${JSON.stringify(result)}`);
	}
	tokens[result.parent].map[result.name] = result;
	tokens[result.parent].list.push(result);
}

/**
 *
 * @param {{ [key: string]: any}} rendered
 * @returns {{[key: string]: { map: {}, list: any[]}} }
 */
function collectTokenSources(rendered) {
	const parents = rendered.stats.includedFiles
		.map((/** @type {string} */ file) => getFinalFilePart(file))
		.filter((/** @type {string} */ x) => x !== 'index')
		.reduce((
			/** @type {{ [x: string]: { map: {}; list: never[]; }; }} */ tokens,
			/** @type {string | number} */ t
		) => {
			tokens[t] = {
				map: {},
				list: []
			};
			return tokens;
		}, {});
	return parents;
}

/**
 * @param {string} json
 */
function writeJsToken(json) {
	return `'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ${json};`;
}
