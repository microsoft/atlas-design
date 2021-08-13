export interface SassExportCollectionItem {
	name: string;
	location: string;
	tokens: string | SassExportTokenItem;
}

export interface SassExportCollection {
	[name: string]: SassExportCollectionItem;
}

export interface SassExportNestedCollection {
	[key: string]: string | boolean | SassExportTokenNestedItem;
}

export interface SassExportOptions {
	inputFiles?: any;
	includePaths?: string[];
	format?: string;
	type?: string;
}

export interface SassExportTokenItem {
	name: string;
	value: string;
	compiledValue: string;
	mapValue?: SassExportTokenItem[];
}

export interface SassExportTokenNestedItem {
	[name]: string | { [nestedName: string]: SassExportTokenItem };
}

export interface SassExportTokens {
	[token]: SassExportTokenItem[];
}
