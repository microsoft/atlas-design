import { PageScreenshotOptions } from '@playwright/test';

type Theme = 'light' | 'dark' | 'high-contrast';
export interface LocalPageConfig {
	pathname: string;
	name: string;
	themes: Theme[];
	options?: {
		screenshot?: PageScreenshotOptions;
	};
}
