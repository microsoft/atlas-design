import * as docsRoutesForClassPrefixes from '@microsoft/atlas-site/dist/routes-for-class-prefixes.json';

export const ATLAS_DOCS_BASE_URL = `https://design.docs.microsoft.com`;
const prefixArray = Object.keys(docsRoutesForClassPrefixes);

export function getDocsPageForClass(className: string) {
	const matchedPrefix = prefixArray.find(prefix => className.startsWith(prefix));
	if (matchedPrefix) {
		// @ts-ignore
		const pageData = docsRoutesForClassPrefixes[matchedPrefix];
		return {
			title: pageData.title as string,
			href: ATLAS_DOCS_BASE_URL + pageData.href,
			type: (pageData.type || 'class') as string
		};
	}

	return null;
}
