let nextId = 0;

export function generateElementId() {
	return `ax-${nextId++}`;
}

export function parseValue(str: string | null): number {
	return Math.max(0, Math.min(parseInt(str || '0'), 5));
}

export function kebabToCamelCase(str: string) {
	return str.replace(/-./g, x => x[1].toUpperCase());
}
