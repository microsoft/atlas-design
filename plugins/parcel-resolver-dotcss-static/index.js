const { Resolver } = require('@parcel/plugin');

/**
 * We use the parcel bundler in our CSS build. It automatically
 * resolves references such as the url('/static/...') in the
 * @font-face rule below. This particular reference causes a
 * build error because the file doesn't exist.
 *
 * This plugin makes parcel ignore certain dependencies that it
 * would otherwise validate, hash, and copy to the dist folder.
 *
 * @font-face {
 *     font-family: 'SegoeUI';
 *     src: url('/static/third-party/SegoeUI/5.32/west-european/bold/latest.eot');
 *     ...
 * }
 *
 */

module.exports = new Resolver({
	async resolve({ specifier }) {
		/**
		 * Workaround issue with parcel's default resolver and oddly named packages we're importing in scss files.
		 */
		if (specifier === 'normalize.css' || specifier === 'minireset.css') {
			return {
				filePath: require.resolve(specifier)
			};
		}

		return null; // let the other resolvers handle this
	}
});
