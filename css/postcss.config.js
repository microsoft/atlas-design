const tokenizer = require('./postcss-token');

module.exports = {
	syntax: 'postcss-scss',
	plugins: [tokenizer()]
};
