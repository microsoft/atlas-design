/**
 * Build script to bundle Atlas data into the MCP package
 * This runs before TypeScript compilation to generate data/atlas-data.json
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fm from 'front-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CSS_DIST = join(__dirname, '../../css/dist');
const SITE_SRC = join(__dirname, '../../site/src');
const OUTPUT_DIR = join(__dirname, '../data');

function extractCodeExamples(content) {
	const examples = [];
	const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
	let match;

	while ((match = codeBlockRegex.exec(content)) !== null) {
		const language = match[1] || 'html';
		const code = match[2].trim();
		if (['html', 'css', 'scss', 'abut-html'].includes(language) && code.length > 10) {
			examples.push({
				language: language === 'abut-html' ? 'html' : language,
				code
			});
		}
	}

	return examples;
}

function parseMarkdownDoc(filePath) {
	const content = readFileSync(filePath, 'utf-8');
	const parsed = fm(content);
	return {
		frontmatter: parsed.attributes,
		content: parsed.body
	};
}

function loadComponents() {
	const componentsDir = join(SITE_SRC, 'components');
	if (!existsSync(componentsDir)) {
		console.warn('Components directory not found');
		return [];
	}

	const files = readdirSync(componentsDir).filter(f => f.endsWith('.md') && f !== 'overview.md');
	return files.map(file => {
		const filePath = join(componentsDir, file);
		const { frontmatter, content } = parseMarkdownDoc(filePath);
		const name = file.replace('.md', '');

		return {
			name,
			title: frontmatter.title || name,
			description: frontmatter.description || '',
			classPrefixes: frontmatter.classPrefixes || [name],
			examples: extractCodeExamples(content)
		};
	});
}

function loadAtomics() {
	const atomicsDir = join(SITE_SRC, 'atomics');
	if (!existsSync(atomicsDir)) {
		console.warn('Atomics directory not found');
		return [];
	}

	const files = readdirSync(atomicsDir).filter(f => f.endsWith('.md') && f !== 'overview.md');
	return files.map(file => {
		const filePath = join(atomicsDir, file);
		const { frontmatter, content } = parseMarkdownDoc(filePath);
		const name = file.replace('.md', '');

		return {
			name,
			title: frontmatter.title || name,
			description: frontmatter.description || '',
			examples: extractCodeExamples(content)
		};
	});
}

function main() {
	console.log('Building Atlas MCP data...');

	// Load class names
	const classNamesPath = join(CSS_DIST, 'class-names.json');
	if (!existsSync(classNamesPath)) {
		throw new Error(`class-names.json not found. Run 'npm run build:class-names' first.`);
	}
	const classNames = JSON.parse(readFileSync(classNamesPath, 'utf-8'));
	console.log(`  Loaded ${Object.keys(classNames).length} class names`);

	// Load tokens
	const tokensPath = join(CSS_DIST, 'tokens.json');
	if (!existsSync(tokensPath)) {
		throw new Error(`tokens.json not found. Run 'npm run build:tokens' first.`);
	}
	const tokens = JSON.parse(readFileSync(tokensPath, 'utf-8'));
	console.log(`  Loaded tokens`);

	// Load components
	const components = loadComponents();
	console.log(`  Loaded ${components.length} components`);

	// Load atomics
	const atomics = loadAtomics();
	console.log(`  Loaded ${atomics.length} atomic categories`);

	// Bundle all data
	const atlasData = {
		classNames,
		tokens,
		components,
		atomics,
		generatedAt: new Date().toISOString()
	};

	// Write output
	if (!existsSync(OUTPUT_DIR)) {
		mkdirSync(OUTPUT_DIR, { recursive: true });
	}

	const outputPath = join(OUTPUT_DIR, 'atlas-data.json');
	writeFileSync(outputPath, JSON.stringify(atlasData));
	console.log(`  Written to ${outputPath}`);
	console.log('Done!');
}

main();
