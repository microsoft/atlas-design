import { PageScreenshotOptions } from '@playwright/test';

export interface LocalPageConfig {
	pathname: string;
	name: string;
	options?: {
		screenshot?: PageScreenshotOptions;
	};
}
