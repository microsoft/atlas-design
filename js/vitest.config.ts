import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		include: ['src/**/*.test.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary', 'html'],
			reportsDirectory: './coverage',
			include: ['src/**/*.ts'],
			exclude: ['src/**/*.test.ts', 'src/index.ts']
		}
	}
});
