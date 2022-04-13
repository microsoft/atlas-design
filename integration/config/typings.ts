import { BrowserContext, PageScreenshotOptions, Request, Route } from '@playwright/test';

export type Theme = 'light' | 'dark' | 'high-contrast';

export interface ObjectifiedPlayWrightRouteArgs {
	url: string | RegExp | ((url: URL) => boolean);
	handler: (route: Route, request: Request) => void;
	options: {
		times?: number;
	};
}
export interface LocalPageConfig {
	pathname: string;
	name: string;
	themes: Theme[];
	options?: {
		screenshot?: PageScreenshotOptions;
	};
	routes: ObjectifiedPlayWrightRouteArgs[];
}

interface ImageManifestTheme {
	[filename: string]: {
		location: string;
	};
}

export interface ImageManifest {
	light: ImageManifestTheme;
	dark: ImageManifestTheme;
	'high-contrast': ImageManifestTheme;
}
export interface VisualDiffManifest {
	name: string;
	main: ImageManifest;
	actual: ImageManifest;
}
