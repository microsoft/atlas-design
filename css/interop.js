// const exporter = require('scss-to-json'); // uses node-sass under the hood

const exporter = require('sass-json-export');

const path = require('path');
const glob = require('glob');
const sass = require('sass');

const filePath = path.resolve(process.cwd(), './src/tokens/index.scss');
console.log({ filePath });

const output = exporter(filePath);
if (output) {
	console.log({ output });
}
