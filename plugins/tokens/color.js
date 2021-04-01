//@ts-check
const colorConverter = require('color-convert');

const hslaRegexp = /hsla\((.*),(.*),(.*),(.*)\)/g;

/**
 * @param {*} expression
 * @param {number} r Red
 * @param {number} g Green
 * @param {number} b Blue
 * @param {number} a Alpha
 * @returns
 */
function getHsla(expression, r, g, b, a) {
	// when available, we'll just take it from the authored values
	let hsla = extractHslaFromExpression(expression);
	if (!hsla) {
		// when unavailable, we can reuse the alpha and get the hsl
		const [h, s, l] = colorConverter.rgb.hsl(r, g, b);
		hsla = {
			h,
			s,
			l,
			a
		};
	}
	return hsla;
}

/**
 * Use regexp to extract hsla values from the initially authored Scss.
 * @param {string} expression A rule declaration
 * @returns undefined | HSLAColor
 */
function extractHslaFromExpression(expression) {
	let hsla;
	let matches;
	while ((matches = hslaRegexp.exec(expression)) !== null) {
		const [, h, s, l, a] = matches;
		try {
			hsla = {
				h: parseInt(h),
				s: parseInt(s),
				l: parseInt(l),
				a: parseInt(a)
			};
		} catch (err) {
			throw new Error(err);
		}
		break;
	}
	return hsla;
}

/**
 * @typedef HSLAColor
 * @property {number} h
 * @property {number} s
 * @property {number} l
 * @property {number} a
 */

module.exports.getHsla = getHsla;
