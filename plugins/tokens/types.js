export function thisAllowsJSDocTypesToBeImported() {}

/**
 * @typedef {'SassList' | 'SassString' | 'SassNumber' | 'SassColor' | 'SassObject'} SassType
 */

/**
 * @typedef {SassStringRule | SassNumberRule | SassColorRule | SassListRule | SassMapRule} SassRule
 */

/**
 * @typedef RuleDeclaration
 ?* @property {string} expression;
 * @property {{default: boolean; global: boolean; }} flags;
 * @property {string} in;
 * @property {{line: number; column: string}} position
 */

/**
 * @typedef SassStringRule
 * @property {'SassString'} type
 * @property {string} value
 * @property {string[]} [sources]
 * @property {RuleDeclaration[]?} [declarations]
 */

/**
 * @typedef SassNumberRule
 * @property {'SassNumber'} type
 * @property {number} value
 * @property {string?} unit
 * @property {string[]?} sources
 * @property {RuleDeclaration[]} [declarations]
 */

/**
 * @typedef SassListRule
 * @property {'SassList'} type
 * @property {SassRule[]} value
 * @property {','} seperator
 * @property {string[]} [sources]
 * @property {RuleDeclaration[]} [declarations]
 */

/**
 * @typedef SassMapRule
 * @property {'SassMap'} type
 * @property {{[key: string]: value}} value
 * @property {string[]} [sources]
 * @property {RuleDeclaration[]} [declarations]
 */

/**
 * @typedef SassColorRule
 * @property {'SassColor'} type
 * @property {SassColorValue} value
 * @property {string[]} [sources]
 * @property {RuleDeclaration[]} [declarations]
 */

/**
 * @typedef SassColorValue
 * @property {number} r
 * @property {number} g
 * @property {number} b
 * @property {number} a
 * @property {string} hex
 */

/**
 * @typedef {{ vars: { global: import('./types').SassRule[]}}} SassConvertRendered
 */

/**
 * @typedef AtlasRule
 * @property {string} name
 * @property {string} parent
 * @property {any} value
 * @property {string} type
 * @property {boolean} default
 * @property {string} raw
 * @property {string} filePath
 * @property {string} [separator]
 * @property {string} [unit]
 */
