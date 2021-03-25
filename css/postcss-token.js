// @ts-check
const fs = require('fs-extra');
const path = require('path');
// https://postcss.org/api/
function plugin() {
	return async root => {
		// const json = root.toJSON();
		const json = {};
		const things = [];
		// console.log(root);

		/**
		 * @typedef {object} PostCSSNode
		 *  @property raws {any};
		 *  @property type {string};
		 *  @property source {any};
		 *  @property prop {string};
		 *  @property value {string};
		 *  @property inputs {any}[];
		 */

		root.walkDecls(node => {
			// console.log(JSON.stringify(node.value));
			if (node.prop.indexOf('$') === 0) {
				json[node.prop] = node.value.replace('!default', '').trim();
			}
		});

		// console.log(JSON.stringify(json));
		fs.writeFile(path.join(process.cwd(), 'token.json'), JSON.stringify(json));
	};
}

module.exports = plugin;
