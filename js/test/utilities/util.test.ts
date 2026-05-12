import { describe, it, expect } from 'vitest';
import { generateElementId, kebabToCamelCase } from '../../src/utilities/util';

describe('generateElementId', () => {
	it('should return a string starting with "bx-"', () => {
		const id = generateElementId();
		expect(id).toMatch(/^bx-\d+$/);
	});

	it('should return unique ids on subsequent calls', () => {
		const id1 = generateElementId();
		const id2 = generateElementId();
		expect(id1).not.toBe(id2);
	});
});

describe('kebabToCamelCase', () => {
	it('should convert kebab-case to camelCase', () => {
		expect(kebabToCamelCase('my-variable-name')).toBe('myVariableName');
	});

	it('should return the same string if no hyphens', () => {
		expect(kebabToCamelCase('simple')).toBe('simple');
	});

	it('should handle single hyphen', () => {
		expect(kebabToCamelCase('foo-bar')).toBe('fooBar');
	});
});
