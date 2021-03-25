// const exporter = require('sass-json-export'); // 👎 installation issues
// node-sass-export 👎 uses node-sass under the hood
// const exporter = require('scss-to-json'); // 👎 uses node-sass under the hood
// https://github.com/KittyGiraudel/SassyJSON // 👎 didn't try - archived
// const exporter = require('sassy-export'); // 🌓 isn't even a js module, but could work because it works from within sass

const path = require('path');
const glob = require('glob');
const sass = require('sass');

// const filePath = path.resolve(process.cwd(), './src/tokens/index.scss');
// console.log({ filePath });

// const output = exporter(filePath);
// if (output) {
// 	console.log({ output });
// }

const postcss = require('postcss-scss');
// // const precss = require('precss')
const fs = require('fs');

const filePath = path.resolve(process.cwd(), './src/tokens/palette.scss');

fs.readFile('filePath', (err, css) => {
	postcss([]).then(result => {
		console.log(result);
	});
});

// This might be preferable https://www.oddbird.net/herman/docs/configuration#sass-jsonfile

// const themeFallback = require('./build/postcss-plugin-theme-fallback');
// const autoprefixer = require('autoprefixer');

// module.exports = {
// 	plugins: [
// 		themeFallback(),
// 		autoprefixer({
// 			browserlist: ['> 1%', 'last 2 versions', 'not ie < 11']
// 		})
// 	]
// };
