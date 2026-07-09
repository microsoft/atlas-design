// Compiles the scaffold SCSS and TypeScript bundle into dist/scaffold/.
// Used by both the production build and the dev server. Pass --watch to keep
// recompiling on change (the primary CSS-development workflow).
import * as sass from 'sass';
import esbuild from 'esbuild';
import { writeFileSync, mkdirSync, watch } from 'fs';
import path from 'path';

const root = process.cwd(); // site/
const repoRoot = path.join(root, '..');
const outDir = path.join(root, 'dist', 'scaffold');
const stylesOutDir = path.join(outDir, 'styles');
const tsEntry = path.join(root, 'src', 'scaffold', 'index.ts');
const loadPaths = [path.join(root, 'node_modules'), path.join(repoRoot, 'node_modules')];

// SCSS bundles to compile. `index.scss` is linked by every page; `homepage.scss`
// is an additional bundle linked only by the homepage template.
const scssBundles = [
	{ entry: path.join(root, 'src', 'scaffold', 'index.scss'), out: path.join(outDir, 'index.css') },
	{
		entry: path.join(root, 'src', 'scaffold', 'styles', 'homepage.scss'),
		out: path.join(stylesOutDir, 'homepage.css')
	}
];

const isWatch = process.argv.includes('--watch');

mkdirSync(outDir, { recursive: true });
mkdirSync(stylesOutDir, { recursive: true });

function buildCss() {
	for (const { entry, out } of scssBundles) {
		const start = Date.now();
		const result = sass.compile(entry, {
			loadPaths,
			quietDeps: true,
			style: 'expanded',
			silenceDeprecations: ['import', 'global-builtin', 'color-functions']
		});
		writeFileSync(out, result.css);
		// eslint-disable-next-line no-console
		console.log(`[sass] ${path.basename(out)} (${Date.now() - start}ms)`);
	}
}

async function main() {
	// Initial CSS build.
	try {
		buildCss();
	} catch (err) {
		console.error('[sass] error:', err.message);
		if (!isWatch) process.exit(1);
	}

	// JS bundle via esbuild (watch or one-shot).
	const esbuildOptions = {
		entryPoints: [tsEntry],
		bundle: true,
		format: 'esm',
		outfile: path.join(outDir, 'index.js'),
		sourcemap: true,
		target: 'es2020',
		logLevel: 'info'
	};

	if (isWatch) {
		const ctx = await esbuild.context(esbuildOptions);
		await ctx.watch();
		console.log('[esbuild] watching index.ts');

		// Watch SCSS sources (scaffold styles + the whole CSS framework source)
		// and recompile on change. fs.watch is recursive on Windows/macOS.
		const watchDirs = [
			path.join(root, 'src', 'scaffold', 'styles'),
			path.join(repoRoot, 'css', 'src')
		];
		let timer = null;
		const schedule = () => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				try {
					buildCss();
				} catch (err) {
					console.error('[sass] error:', err.message);
				}
			}, 120);
		};
		for (const dir of watchDirs) {
			try {
				watch(dir, { recursive: true }, schedule);
			} catch {
				/* dir may not exist; ignore */
			}
		}
		watch(scssBundles[0].entry, schedule);
		console.log('[sass] watching scaffold + css framework sources');
	} else {
		await esbuild.build(esbuildOptions);
		console.log('[esbuild] index.js built');
	}
}

main().catch(err => {
	console.error(err);
	process.exit(1);
});
