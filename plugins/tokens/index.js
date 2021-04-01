//@ts-check
const sassExtract = require('sass-extract');
const glob = require('fast-glob');
const fs = require('fs-extra');
const path = require('path');
const { getFinalFilePart, convertSassVariable } = require('./conversation');

const distFolder = path.join(process.cwd(), '/dist');

createTokens(distFolder);

async function createTokens(distFolder) {
	// Global variables play better when we just import a single index file
	const entries = await glob(['../../css/src/tokens/index.scss'], {});

	if (entries.length !== 1) {
		throw new Error(
			`Error with entries. There should only be a single entry. Got ${entries.length}.`
		);
	}

	await fs.mkdir(distFolder);

	sassExtract
		.render({
			file: entries[0]
		})
		.then(async rendered => {
			const tokens = collectTokenSources(rendered);
			writeVariables(rendered, tokens);

			Object.keys(tokens).map(token => {
				const outfileStem = path.join(distFolder, token);
				const json = JSON.stringify(tokens[token]);
				// writing json output
				fs.writeFile(outfileStem + '.json', json);
				fs.writeFile(outfileStem + '.js', writeJsToken(json));
			});
		})
		.catch(err => {
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
		.map(file => getFinalFilePart(file))
		.filter(x => x !== 'index')
		.reduce((tokens, t) => {
			tokens[t] = {
				map: {},
				list: []
			};
			return tokens;
		}, {});
	return parents;
}

function writeJsToken(json) {
	return `'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ${json};`;
}
