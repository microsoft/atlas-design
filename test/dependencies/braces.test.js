const assert = require('node:assert/strict');
const { test } = require('node:test');
const braces = require('braces');
const micromatch = require('micromatch');

const nestingError = {
	name: 'SyntaxError',
	message: /safe depth of 128/
};

test('uses the tested braces source for every transitive installation', () => {
	const { packages } = require('../../package-lock.json');
	const testedSource = packages['node_modules/braces'].resolved;
	const installations = Object.entries(packages).filter(([path]) =>
		/(^|\/)node_modules\/braces$/.test(path)
	);
	assert.ok(installations.length > 0);
	for (const [path, entry] of installations) {
		assert.equal(entry.resolved, testedSource, path);
	}
});

for (const [name, operation] of [
	['default compilation', braces],
	['parsing', braces.parse],
	['compilation', braces.compile],
	['expansion', braces.expand],
	['stringification', braces.stringify]
]) {
	test(`rejects deeply nested patterns during ${name}`, () => {
		for (const [open, close] of [
			['{', '}'],
			['(', ')']
		]) {
			const pattern = open.repeat(4000) + 'a,b' + close.repeat(4000);
			assert.ok(pattern.length < 10000);
			assert.throws(() => operation(pattern), nestingError);
		}
	});
}

for (const operation of ['compile', 'expand', 'stringify']) {
	test(`rejects deeply nested supplied ASTs in ${operation}`, () => {
		let ast = { type: 'text', value: 'x' };
		for (let depth = 0; depth < 12000; depth++) {
			ast = { type: 'root', nodes: [ast] };
		}
		assert.throws(() => braces[operation](ast), nestingError);
	});

	test(`rejects cyclic supplied ASTs in ${operation}`, () => {
		const ast = { type: 'root', nodes: [] };
		ast.nodes.push(ast);
		assert.throws(() => braces[operation](ast), {
			name: 'SyntaxError',
			message: /acyclic tree/
		});
	});
}

test('preserves ordinary expansion, compilation, and stringification', () => {
	assert.deepEqual(braces.expand('a/{1..3}/{x,y}'), [
		'a/1/x',
		'a/1/y',
		'a/2/x',
		'a/2/y',
		'a/3/x',
		'a/3/y'
	]);
	assert.deepEqual(braces('a/{b,c}'), ['a/(b|c)']);
	assert.equal(braces.stringify(braces.parse('a/{b,c}')), 'a/{b,c}');
	assert.doesNotThrow(() => braces.compile('{'.repeat(64) + 'x,y' + '}'.repeat(64)));
});

test('accepts shared acyclic AST nodes', () => {
	const leaf = { type: 'text', value: 'a' };
	assert.equal(braces.stringify({ type: 'root', nodes: [leaf, leaf] }), 'aa');
});

test('preserves brace glob matching in micromatch', () => {
	assert.deepEqual(micromatch(['src/a.ts', 'src/a.js', 'src/a.md'], 'src/*.{js,ts}'), [
		'src/a.ts',
		'src/a.js'
	]);
});
