/**
 * Parses the query string into a map object.
 * Handles x-www-form-urlencoded query strings. See https://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
 * @param queryString Optional query string to parse. If not supplied, location.search will be used.
 */
export function parseQueryString(queryString?: string) {
	let match: RegExpExecArray;
	const pl = /\+/g;
	const search = /([^&=]+)=?([^&]*)/g;
	const decode = (s: string) => decodeURIComponent(s.replace(pl, ' '));
	if (queryString === undefined) {
		queryString = location.search;
	}
	queryString = queryString.substring(1);
	const urlParams: { [name: string]: string } = {};
	while ((match = search.exec(queryString))) {
		urlParams[decode(match[1])] = decode(match[2]);
	}
	return urlParams;
}
