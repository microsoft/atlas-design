let nextId = 0;

export function generateElementId() {
	return `bx-${nextId++}`;
}

export function kebabToCamelCase(str: string) {
	return str.replace(/-./g, x => x[1].toUpperCase());
}
