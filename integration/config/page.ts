import { devices, PlaywrightTestOptions, PlaywrightWorkerOptions, Project } from '@playwright/test';
import { indexHTMLOnlyRoutes } from './routes.ts/index-html';
import type { LocalPageConfig, Theme, ObjectifiedPlayWrightRouteArgs } from './typings';

const themes: Theme[] = ['light'];

const routes: ObjectifiedPlayWrightRouteArgs[] = [];

/**
 * Default behavior is to abort all external requests
 */

export const pages: LocalPageConfig[] = [
	{
		pathname: '/index.html',
		name: 'Home',
		themes,
		routes: [...routes, ...indexHTMLOnlyRoutes],
		options: { screenshot: { fullPage: true } }
	},
	{ pathname: '/atomics/border.html', name: 'Atomics/border', themes, routes },
	{ pathname: '/atomics/display.html', name: 'Atomics/display', themes, routes },
	{ pathname: '/atomics/flex.html', name: 'Atomics/flex', themes, routes },
	{ pathname: '/atomics/image.html', name: 'Atomics/image', themes, routes },
	{ pathname: '/atomics/line-clamp.html', name: 'Atomics/line', themes, routes },
	{ pathname: '/atomics/lists.html', name: 'Atomics/lists', themes, routes },
	{ pathname: '/atomics/overflow.html', name: 'Atomics/overflow', themes, routes },
	{ pathname: '/atomics/overview.html', name: 'Atomics/overview', themes, routes },
	{ pathname: '/atomics/position.html', name: 'Atomics/position', themes, routes },
	{ pathname: '/atomics/shadow.html', name: 'Atomics/shadow', themes, routes },
	{ pathname: '/atomics/spacing.html', name: 'Atomics/spacing', themes, routes },
	{ pathname: '/atomics/typography.html', name: 'Atomics/typography', themes, routes },
	{ pathname: '/atomics/width.html', name: 'Atomics/width', themes, routes },
	{ pathname: '/components/breadcrumbs.html', name: 'Components/breadcrumbs', themes, routes },
	{ pathname: '/components/button.html', name: 'Components/button', themes, routes },
	{ pathname: '/components/checkbox.html', name: 'Components/checkbox', themes, routes },
	{ pathname: '/components/help.html', name: 'Components/help', themes, routes },
	{ pathname: '/components/icon.html', name: 'Components/icon', themes, routes },
	{ pathname: '/components/input.html', name: 'Components/input', themes, routes },
	{ pathname: '/components/label.html', name: 'Components/label', themes, routes },
	{ pathname: '/components/link-button.html', name: 'Components/link-button', themes, routes },
	{ pathname: '/components/markdown.html', name: 'Components/markdown', themes, routes },
	{ pathname: '/components/overview.html', name: 'Components/overview', themes, routes },
	{ pathname: '/components/popover.html', name: 'Components/popover', themes, routes },
	{ pathname: '/components/radio.html', name: 'Components/radio', themes, routes },
	{ pathname: '/components/scroll.html', name: 'Components/scroll', themes, routes },
	{ pathname: '/components/select.html', name: 'Components/select', themes, routes },
	{ pathname: '/components/table.html', name: 'Components/table', themes, routes },
	{ pathname: '/components/textarea.html', name: 'Components/textarea', themes, routes },
	{ pathname: '/components/toggle.html', name: 'Components/toggle', themes, routes },
	{ pathname: '/patterns/article-header.html', name: 'Patterns/article-header', themes, routes }
];

export const auxillaryViewports: Project<PlaywrightTestOptions, PlaywrightWorkerOptions>[] = [
	// { // All tests start at this viewport
	// 	name: 'Widescreen Chromium',
	// 	use: {
	// 		browserName: 'chromium',
	// 		viewport: {
	// 			width: 1920,
	// 			height: 1080
	// 		}
	// 	}
	// },
	{
		name: 'Desktop Chromium',
		use: {
			browserName: 'chromium',
			viewport: {
				width: 1152,
				height: 648
			}
		}
	},
	{
		name: 'Tablet Chromium',
		use: {
			browserName: 'chromium',
			viewport: {
				width: 768,
				height: 600
			}
		}
	},
	{
		name: 'Narrow Chromium',
		use: {
			browserName: 'chromium',
			viewport: {
				width: 326,
				height: 480
			}
		}
	}
];
