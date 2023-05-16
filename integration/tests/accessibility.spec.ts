import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pathnames = [
	'/atomics/overview.html',
	'/atomics/background.html',
	'/atomics/border.html',
	'/atomics/display.html',
	'/atomics/image.html',
	'/atomics/line-clamp.html',
	'/atomics/lists.html',
	'/atomics/overflow.html',
	'/atomics/position.html',
	'/atomics/shadow.html',
	'/atomics/spacing.html',
	'/atomics/typography.html',
	'/components/overview.html',
	'/components/banner.html',
	'/components/breadcrumbs.html',
	'/components/button.html',
	'/components/card.html',
	'/components/checkbox.html',
	'/components/form.html',
	'/components/gradients.html',
	'/components/gradient-card.html',
	'/components/help.html',
	'/components/hero.html',
	'/components/icon.html',
	'/components/image.html',
	'/components/input.html',
	'/components/label.html',
	'/components/link-button.html',
	'/components/markdown.html',
	'/components/media.html',
	'/components/notification.html',
	'/components/pagination.html',
	'/components/popover.html',
	'/components/radio.html',
	'/components/scroll.html',
	'/components/select.html',
	'/components/stretched-link.html',
	'/components/table.html',
	'/components/textarea.html',
	'/components/toggle.html',
	'/patterns/article-header.html',
	'/tokens/overview.html',
	'/tokens/animation.html',
	'/tokens/border.html',
	'/tokens/breakpoints.html',
	'/tokens/colors.html',
	'/tokens/font-stack.html',
	'/tokens/layout.html',
	'/tokens/palette.html',
	'/tokens/shadow.html',
	'/tokens/spacing.html',
	'/tokens/typography.html',
	'/tokens/z-index.html'
];

test.describe('axe should not find any automatically detectable accessibility issues on', () => {
	for (const pathname of pathnames) {
		test(`${pathname} @accessibility`, async ({ page }) => {
			await page.goto(pathname);

			const accessibilityScanResults = await new AxeBuilder({ page })
				.exclude('#figma-embed-iframe')
				.analyze();

			expect(accessibilityScanResults.violations).toEqual([]);
		});
	}
});
