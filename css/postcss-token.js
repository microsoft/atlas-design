// @ts-check
const fs = require('fs-extra');
const path = require('path');
// https://postcss.org/api/
function plugin() {
	return async root => {
		const things = [];
		root.walkRules(rule =>
			rule.walkDecls(decl => {
				things.push(decl);
			})
		);
		fs.writeFile(path.join(process.cwd(), 'token.json'), things.join('!!!!!'));
	};
}

module.exports = plugin;
