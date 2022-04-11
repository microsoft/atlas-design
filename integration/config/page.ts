import type { LocalPageConfig, Theme } from './typings';

const themes: Theme[] = ['light'];

export const pages: LocalPageConfig[] = [
	{ pathname: '/index.html', name: 'Home', themes },
	{ pathname: '/atomics/border.html', name: 'Atomics/border', themes },
	{ pathname: '/atomics/display.html', name: 'Atomics/display', themes },
	{ pathname: '/atomics/flex.html', name: 'Atomics/flex', themes },
	{ pathname: '/atomics/image.html', name: 'Atomics/image', themes },
	{ pathname: '/atomics/line-html.html', name: 'Atomics/line', themes },
	{ pathname: '/atomics/lists.html', name: 'Atomics/lists', themes },
	{ pathname: '/atomics/overflow.html', name: 'Atomics/overflow', themes },
	{ pathname: '/atomics/overview.html', name: 'Atomics/overview', themes },
	{ pathname: '/atomics/position.html', name: 'Atomics/position', themes },
	{ pathname: '/atomics/shadow.html', name: 'Atomics/shadow', themes },
	{ pathname: '/atomics/spacing.html', name: 'Atomics/spacing', themes },
	{ pathname: '/atomics/typography.html', name: 'Atomics/typography', themes },
	{ pathname: '/atomics/width.html', name: 'Atomics/width', themes },
	{ pathname: '/components/breadcrumbs.html', name: 'Components/breadcrumbs', themes },
	{ pathname: '/components/button.html', name: 'Components/button', themes },
	{ pathname: '/components/checkbox.html', name: 'Components/checkbox', themes },
	{ pathname: '/components/help.html', name: 'Components/help', themes },
	{ pathname: '/components/icon.html', name: 'Components/icon', themes },
	{ pathname: '/components/input.html', name: 'Components/input', themes },
	{ pathname: '/components/label.html', name: 'Components/label', themes },
	{ pathname: '/components/link-button.html', name: 'Components/link-button', themes },
	{ pathname: '/components/markdown.html', name: 'Components/markdown', themes },
	{ pathname: '/components/overview.html', name: 'Components/overview', themes },
	{ pathname: '/components/popover.html', name: 'Components/popover', themes },
	{ pathname: '/components/radio.html', name: 'Components/radio', themes },
	{ pathname: '/components/scroll.html', name: 'Components/scroll', themes },
	{ pathname: '/components/select.html', name: 'Components/select', themes },
	{ pathname: '/components/table.html', name: 'Components/table', themes },
	{ pathname: '/components/textarea.html', name: 'Components/textarea', themes },
	{ pathname: '/components/toggle.html', name: 'Components/toggle', themes },
	{ pathname: '/patterns/article-header.html', name: 'Patterns/article-header', themes }
];
