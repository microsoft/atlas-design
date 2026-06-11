/* This package is type: module, so ESLint's config must be CommonJS (.cjs). */
module.exports = {
	root: true,
	env: {
		node: true,
		es2022: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint'],
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	rules: {
		'prefer-const': 'error'
	}
};
