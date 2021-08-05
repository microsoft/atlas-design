export interface SassExportCollectionItem {
	name: string;
	location: string;
	tokens: string | SassExportTokenItem;
}

export interface SassExportCollection {
	[name]: SassExportCollectionItem;
}

export interface SassExportTokenItem {
	name: string;
	value: string;
	compiledValue: string;
	mapValue?: SassExportTokenItem[];
}

export interface SassExportTokenNestedItem {
	[name]: string | { [nestedName: string]: any };
}

export interface SassExportTokens {
	[token]: SassExportTokenItem[];
}
