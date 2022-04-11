import { PageScreenshotOptions } from '@playwright/test';
import type { LocalPageConfig } from './typings';

export const pages: LocalPageConfig[] = [
	{
		pathname: '/',
		name: 'Home'
	}
];
