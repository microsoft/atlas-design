/**
 * Atlas MCP Server
 * Exposes Atlas Design System resources to AI agents via Model Context Protocol
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import {
	loadClassNames,
	loadTokens,
	loadComponents,
	loadAtomics,
	loadPatterns,
	searchClasses,
	getComponent,
	getComponentClasses,
	getClassesByCategory,
	getPattern,
	type CodeExample
} from './data/loader.js';
import { compositionGuide } from './data/guidance.js';

export function createServer(): McpServer {
	const server = new McpServer({
		name: 'atlas-mcp',
		version: '0.1.0'
	});

	// ============================================
	// RESOURCES
	// ============================================

	server.resource(
		'How to compose Atlas pages (layout → atomic containers → large components → small elements)',
		'atlas://composition',
		async () => {
			return {
				contents: [
					{
						uri: 'atlas://composition',
						mimeType: 'application/json',
						text: JSON.stringify(compositionGuide, null, 2)
					}
				]
			};
		}
	);

	server.resource('Atlas component catalog', 'atlas://components', async () => {
		const components = loadComponents();
		const summary = components.map(c => ({
			name: c.name,
			title: c.title,
			description: c.description,
			classPrefixes: c.classPrefixes,
			exampleCount: c.examples.length
		}));
		return {
			contents: [
				{
					uri: 'atlas://components',
					mimeType: 'application/json',
					text: JSON.stringify(summary, null, 2)
				}
			]
		};
	});

	server.resource(
		'Atlas atomic utility classes organized by category',
		'atlas://atomics',
		async () => {
			const categories = getClassesByCategory();
			return {
				contents: [
					{
						uri: 'atlas://atomics',
						mimeType: 'application/json',
						text: JSON.stringify(categories, null, 2)
					}
				]
			};
		}
	);

	server.resource(
		'Atlas design tokens (colors, spacing, typography, etc.)',
		'atlas://tokens',
		async () => {
			const tokens = loadTokens();
			return {
				contents: [
					{
						uri: 'atlas://tokens',
						mimeType: 'application/json',
						text: JSON.stringify(tokens, null, 2)
					}
				]
			};
		}
	);

	server.resource(
		'Atlas page-level patterns (multi-component HTML compositions)',
		'atlas://patterns',
		async () => {
			const patterns = loadPatterns();
			const summary = patterns.map(p => ({
				name: p.name,
				title: p.title,
				description: p.description,
				exampleCount: p.examples.length
			}));
			return {
				contents: [
					{
						uri: 'atlas://patterns',
						mimeType: 'application/json',
						text: JSON.stringify(summary, null, 2)
					}
				]
			};
		}
	);

	// ============================================
	// TOOLS
	// ============================================

	server.tool(
		'get_composition_guide',
		'How to assemble an Atlas page: the recommended outside-in order — page layout, then atomic grid/flex containers, then large components (e.g. card), then small elements (e.g. button, input). Call this first when building a UI.',
		{},
		async () => {
			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(compositionGuide, null, 2)
					}
				]
			};
		}
	);

	server.tool(
		'search_classes',
		'Search Atlas CSS classes by name or pattern. Returns matching class names with color and size metadata.',
		{
			query: z.string().describe('Search query to match against class names'),
			category: z
				.enum(['component', 'atomic'])
				.optional()
				.describe(
					'Filter by class category: "component" for component classes, "atomic" for utility classes'
				),
			limit: z
				.number()
				.min(1)
				.max(100)
				.optional()
				.describe('Maximum number of results to return (default: 50)')
		},
		async ({ query, category, limit }) => {
			const results = searchClasses(query, { category, limit });
			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(
							{
								query,
								count: results.length,
								classes: results.map(c => ({
									name: c.name,
									hasColorInfo: c.color.isValid,
									hasSizeInfo: c.size.isValid,
									...(c.color.isValid && { colorType: c.color.detailType }),
									...(c.size.isValid && { sizeValue: c.size.value })
								}))
							},
							null,
							2
						)
					}
				]
			};
		}
	);

	server.tool(
		'get_component',
		'Get detailed information about a specific Atlas component including description, available classes, and code examples.',
		{
			name: z.string().describe('Component name (e.g., "button", "card", "badge")')
		},
		async ({ name }) => {
			const component = getComponent(name);
			if (!component) {
				return {
					content: [
						{
							type: 'text',
							text: `Component "${name}" not found. Use list_components to see available components.`
						}
					],
					isError: true
				};
			}

			const classes = getComponentClasses(name);
			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(
							{
								name: component.name,
								title: component.title,
								description: component.description,
								classPrefixes: component.classPrefixes,
								availableClasses: classes.map(c => c.name),
								examples: component.examples
							},
							null,
							2
						)
					}
				]
			};
		}
	);

	server.tool(
		'get_code_examples',
		'Get canonical Atlas HTML snippets for a component, pattern, or atomic category. Use these to build HTML pages. Each snippet includes the heading it was documented under.',
		{
			name: z
				.string()
				.describe(
					'Component, pattern, or atomic category name (e.g., "button", "card", "spacing")'
				),
			type: z
				.enum(['component', 'pattern', 'atomic'])
				.optional()
				.describe('Where to look (default: searches components, patterns, and atomics)')
		},
		async ({ name, type }) => {
			const nameLower = name.toLowerCase();
			const examples: { source: string; examples: CodeExample[] }[] = [];

			if (!type || type === 'component') {
				const component = getComponent(nameLower);
				if (component && component.examples.length > 0) {
					examples.push({
						source: `component/${component.name}`,
						examples: component.examples
					});
				}
			}

			if (!type || type === 'pattern') {
				const pattern = getPattern(nameLower);
				if (pattern && pattern.examples.length > 0) {
					examples.push({
						source: `pattern/${pattern.name}`,
						examples: pattern.examples
					});
				}
			}

			if (!type || type === 'atomic') {
				const atomics = loadAtomics();
				const atomic = atomics.find(a => a.name.toLowerCase() === nameLower);
				if (atomic && atomic.examples.length > 0) {
					examples.push({
						source: `atomic/${atomic.name}`,
						examples: atomic.examples
					});
				}
			}

			if (examples.length === 0) {
				return {
					content: [
						{
							type: 'text',
							text: `No HTML examples found for "${name}". Try list_components, list_patterns, or list_atomics to see available options.`
						}
					],
					isError: true
				};
			}

			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify({ name, examples }, null, 2)
					}
				]
			};
		}
	);

	server.tool(
		'list_components',
		'List all available Atlas components with their descriptions.',
		{},
		async () => {
			const components = loadComponents();
			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(
							{
								count: components.length,
								components: components.map(c => ({
									name: c.name,
									title: c.title,
									description: c.description,
									classPrefixes: c.classPrefixes
								}))
							},
							null,
							2
						)
					}
				]
			};
		}
	);

	server.tool(
		'list_patterns',
		'List Atlas page-level patterns — multi-component HTML compositions you can adapt to build pages.',
		{},
		async () => {
			const patterns = loadPatterns();
			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(
							{
								count: patterns.length,
								patterns: patterns.map(p => ({
									name: p.name,
									title: p.title,
									description: p.description
								}))
							},
							null,
							2
						)
					}
				]
			};
		}
	);

	server.tool(
		'list_atomics',
		'List Atlas atomic utility classes, optionally filtered by category.',
		{
			category: z
				.enum([
					'spacing',
					'color',
					'display',
					'flex',
					'typography',
					'border',
					'background',
					'position',
					'size',
					'other'
				])
				.optional()
				.describe('Filter by category. Omit to get counts for all categories.')
		},
		async ({ category }) => {
			const categories = getClassesByCategory();

			if (category) {
				const classes = categories[category] || [];
				return {
					content: [
						{
							type: 'text',
							text: JSON.stringify(
								{
									category,
									count: classes.length,
									classes
								},
								null,
								2
							)
						}
					]
				};
			}

			// Return summary of all categories
			const summary = Object.entries(categories).map(([name, classes]) => ({
				category: name,
				count: classes.length,
				sample: classes.slice(0, 5)
			}));

			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(
							{
								totalClasses: Object.values(categories).flat().length,
								categories: summary
							},
							null,
							2
						)
					}
				]
			};
		}
	);

	server.tool(
		'get_class_details',
		'Get detailed information about a specific CSS class including color values across themes and size values.',
		{
			className: z
				.string()
				.describe('The CSS class name (e.g., "button", "margin-lg", "color-primary")')
		},
		async ({ className }) => {
			const classNames = loadClassNames();
			const info = classNames[className];

			if (!info) {
				// Try to find partial matches
				const matches = Object.keys(classNames)
					.filter(name => name.includes(className))
					.slice(0, 10);

				return {
					content: [
						{
							type: 'text',
							text: JSON.stringify(
								{
									error: `Class "${className}" not found`,
									similarClasses: matches.length > 0 ? matches : undefined,
									suggestion:
										matches.length > 0
											? 'Did you mean one of these?'
											: 'Use search_classes to find available classes'
								},
								null,
								2
							)
						}
					],
					isError: true
				};
			}

			const result: Record<string, unknown> = {
				name: info.name
			};

			if (info.color.isValid) {
				result.color = {
					type: info.color.detailType,
					...(info.color.detailType === 'themed' && {
						light: info.color.light,
						dark: info.color.dark,
						highContrast: info.color['high-contrast']
					}),
					...(info.color.detailType === 'static' && {
						value: info.color.universal
					})
				};
			}

			if (info.size.isValid) {
				result.size = info.size.value;
			}

			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(result, null, 2)
					}
				]
			};
		}
	);

	return server;
}
