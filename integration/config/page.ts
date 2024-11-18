import { devices, PlaywrightTestOptions, PlaywrightWorkerOptions, Project } from '@playwright/test';
import { indexHTMLOnlyRoutes } from './mocks/index-html';
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
		routes: [...routes, ...indexHTMLOnlyRoutes],
		options: { screenshot: { fullPage: true } }
	},
	// { pathname: '/atomics/border.html', name: 'Atomics/border', routes },
	// { pathname: '/atomics/display.html', name: 'Atomics/display', routes },
	// { pathname: '/atomics/flex.html', name: 'Atomics/flex', routes },
	// { pathname: '/atomics/image.html', name: 'Atomics/image', routes },
	// { pathname: '/atomics/line-clamp.html', name: 'Atomics/line', routes },
	// { pathname: '/atomics/lists.html', name: 'Atomics/lists', routes },
	// { pathname: '/atomics/overflow.html', name: 'Atomics/overflow', routes },
	// { pathname: '/atomics/overview.html', name: 'Atomics/overview', routes },
	// { pathname: '/atomics/position.html', name: 'Atomics/position', routes },
	// { pathname: '/atomics/shadow.html', name: 'Atomics/shadow', routes },
	// { pathname: '/atomics/spacing.html', name: 'Atomics/spacing', routes },
	// { pathname: '/atomics/typography.html', name: 'Atomics/typography', routes },
	// { pathname: '/atomics/width.html', name: 'Atomics/width', routes },
	{ pathname: '/atomics/colors.html', name: 'Atomics/colors', routes },
	{ pathname: '/components/breadcrumbs.html', name: 'Components/breadcrumbs', routes },
	{ pathname: '/components/button.html', name: 'Components/button', routes },
	{ pathname: '/components/checkbox.html', name: 'Components/checkbox', routes },
	{ pathname: '/components/accordion.html', name: 'Components/accordion', routes },
	{ pathname: '/components/dismiss.html', name: 'Components/dismiss', routes },
	{ pathname: '/components/help.html', name: 'Components/help', routes },
	{ pathname: '/components/icon.html', name: 'Components/icon', routes },
	{ pathname: '/components/input.html', name: 'Components/input', routes },
	{ pathname: '/components/label.html', name: 'Components/label', routes },
	{ pathname: '/components/link-button.html', name: 'Components/link-button', routes },
	{ pathname: '/components/markdown.html', name: 'Components/markdown', routes },
	{ pathname: '/components/overview.html', name: 'Components/overview', routes },
	{ pathname: '/components/popover.html', name: 'Components/popover', routes },
	{ pathname: '/components/radio.html', name: 'Components/radio', routes },
	{ pathname: '/components/scroll.html', name: 'Components/scroll', routes },
	{ pathname: '/components/select.html', name: 'Components/select', routes },
	{ pathname: '/components/table.html', name: 'Components/table', routes },
	{ pathname: '/components/textarea.html', name: 'Components/textarea', routes },
	{ pathname: '/components/timeline.html', name: 'Components/timeline', routes },
	{ pathname: '/components/toggle.html', name: 'Components/toggle', routes },
	{ pathname: '/patterns/article-header.html', name: 'Patterns/article-header', routes },
	{ pathname: '/patterns/form-validation.html', name: 'Patterns/form-validation', routes },
	{ pathname: '/patterns/thread-history.html', name: 'Patterns/thread-history', routes }
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
