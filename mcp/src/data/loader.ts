/**
 * Data loader for Atlas MCP server
 * Loads pre-bundled Atlas data from the data/ directory
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Data is bundled at build time into the data/ directory
const DATA_PATH = join(__dirname, '../../data/atlas-data.json');

export interface ClassInfo {
	name: string;
	color: {
		isValid: boolean;
		detailType: string;
		universal: string;
		light: string;
		dark: string;
		'high-contrast': string;
	};
	size: {
		isValid: boolean;
		value: string;
	};
}

export interface ComponentDoc {
	name: string;
	title: string;
	description: string;
	classPrefixes: string[];
	examples: CodeExample[];
}

export interface CodeExample {
	language: string;
	code: string;
}

export interface AtomicDoc {
	name: string;
	title: string;
	description: string;
	examples: CodeExample[];
}

interface AtlasData {
	classNames: Record<string, ClassInfo>;
	tokens: Record<string, unknown>;
	components: ComponentDoc[];
	atomics: AtomicDoc[];
	generatedAt: string;
}

// Cache loaded data
let dataCache: AtlasData | null = null;

/**
 * Load the bundled Atlas data
 */
function loadData(): AtlasData {
	if (dataCache) return dataCache;

	try {
		const content = readFileSync(DATA_PATH, 'utf-8');
		dataCache = JSON.parse(content) as AtlasData;
		return dataCache;
	} catch {
		throw new Error(
			`Failed to load Atlas data from ${DATA_PATH}. Ensure the package was built correctly.`
		);
	}
}

/**
 * Load all CSS class names
 */
export function loadClassNames(): Record<string, ClassInfo> {
	return loadData().classNames;
}

/**
 * Load design tokens
 */
export function loadTokens(): Record<string, unknown> {
	return loadData().tokens;
}

/**
 * Load all component documentation
 */
export function loadComponents(): ComponentDoc[] {
	return loadData().components;
}

/**
 * Load all atomic class documentation
 */
export function loadAtomics(): AtomicDoc[] {
	return loadData().atomics;
}

/**
 * Search class names by pattern
 */
export function searchClasses(
	query: string,
	options?: { category?: 'component' | 'atomic'; limit?: number }
): ClassInfo[] {
	const classNames = loadClassNames();
	const components = loadComponents();
	const limit = options?.limit || 50;

	// Get component prefixes for categorization
	const componentPrefixes = new Set(components.flatMap(c => c.classPrefixes));

	const queryLower = query.toLowerCase();
	const results: ClassInfo[] = [];

	for (const [name, info] of Object.entries(classNames)) {
		if (results.length >= limit) break;

		const nameLower = name.toLowerCase();
		if (!nameLower.includes(queryLower)) continue;

		// Filter by category if specified
		if (options?.category) {
			const isComponent = Array.from(componentPrefixes).some(prefix => name.startsWith(prefix));
			if (options.category === 'component' && !isComponent) continue;
			if (options.category === 'atomic' && isComponent) continue;
		}

		results.push(info);
	}

	return results;
}

/**
 * Get a specific component by name
 */
export function getComponent(name: string): ComponentDoc | undefined {
	const components = loadComponents();
	return components.find(c => c.name.toLowerCase() === name.toLowerCase());
}

/**
 * Get classes that belong to a component
 */
export function getComponentClasses(componentName: string): ClassInfo[] {
	const component = getComponent(componentName);
	if (!component) return [];

	const classNames = loadClassNames();
	const prefixes = component.classPrefixes;

	return Object.values(classNames).filter(info =>
		prefixes.some(prefix => info.name.startsWith(prefix))
	);
}

/**
 * Get all class names organized by category
 */
export function getClassesByCategory(): Record<string, string[]> {
	const classNames = loadClassNames();
	const categories: Record<string, string[]> = {
		spacing: [],
		color: [],
		display: [],
		flex: [],
		typography: [],
		border: [],
		background: [],
		position: [],
		size: [],
		other: []
	};

	for (const name of Object.keys(classNames)) {
		if (name.startsWith('margin-') || name.startsWith('padding-') || name.startsWith('gap-')) {
			categories.spacing.push(name);
		} else if (name.startsWith('color-') || name.startsWith('fill-')) {
			categories.color.push(name);
		} else if (name.startsWith('display-')) {
			categories.display.push(name);
		} else if (
			name.startsWith('flex-') ||
			name.startsWith('justify-') ||
			name.startsWith('align-')
		) {
			categories.flex.push(name);
		} else if (name.startsWith('font-') || name.startsWith('text-') || name.startsWith('line-')) {
			categories.typography.push(name);
		} else if (name.startsWith('border')) {
			categories.border.push(name);
		} else if (name.startsWith('background-')) {
			categories.background.push(name);
		} else if (
			name.startsWith('position-') ||
			name.startsWith('top-') ||
			name.startsWith('left-')
		) {
			categories.position.push(name);
		} else if (
			name.startsWith('width-') ||
			name.startsWith('height-') ||
			name.startsWith('max-') ||
			name.startsWith('min-')
		) {
			categories.size.push(name);
		} else {
			categories.other.push(name);
		}
	}

	return categories;
}

/**
 * Clear the data cache (useful for testing)
 */
export function clearCaches(): void {
	dataCache = null;
}
