import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		include: ['test/**/*.test.ts'],
		reporters: process.env.GITHUB_ACTIONS === 'true' ? ['default', 'github-actions'] : ['default'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary', 'html'],
			reportsDirectory: './coverage',
			include: ['src/**/*.ts'],
			exclude: ['src/index.ts']
			// thresholds: {
			// 	statements: 80,
			// 	branches: 80,
			// 	functions: 80,
			// 	lines: 80
			// }
		}
	}
});
