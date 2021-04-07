export type SassType =
	| 'SassList'
	| 'SassString'
	| 'SassNumber'
	| 'SassColor'
	| 'SassObject'
	| 'SassBoolean';

export type SassRule =
	| SassStringRule
	| SassNumberRule
	| SassColorRule
	| SassListRule
	| SassMapRule
	| SassBooleanRule;

export interface RuleDeclaration {
	expression: string;
	flag: { default: boolean; global: boolean };
	in: string;
	position: { line: number; column: string };
}

export interface SassStringRule {
	type: 'SassString';
	value: string;
	sources?: string[];
	declarations?: ?RuleDeclaration[];
}

export interface SassNumberRule {
	type: 'SassNumber';
	value: number;
	unit?: string;
	sources?: string[];
	[declarations]: RuleDeclaration[];
}

export interface SassListRule {
	type: 'SassList';
	value: SassRule[];
	separator: ',';
	sources?: string[];
	declarations?: RuleDeclaration[];
}

export interface SassMapRule {
	type: 'SassMap';
	value: { [key: string]: any };
	sources?: string[];
	declarations?: RuleDeclaration[];
}

export interface SassColorRule {
	type: 'SassColor';
	value: SassColorValue;
	sources?: string[];
	declarations?: RuleDeclaration[];
}

export interface SassBooleanRule {
	type: 'SassBoolean';
	value: boolean;
	sources?: string[];
	declarations?: RuleDeclaration[];
}

export interface SassColorValue {
	r: number;
	g: number;
	b: number;
	a: number;
	hex: string;
}

export interface SassConvertRendered {
	vars: { global: SassRule[] };
}
