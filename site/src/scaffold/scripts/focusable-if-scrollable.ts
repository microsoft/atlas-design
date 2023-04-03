export function handleFocusableIfScrollable(selectors = `[data-focusable-if-scrollable]`) {
	const elements: HTMLElement[] = Array.from(document.querySelectorAll(selectors));

	setScrollableAttrs(elements);

	window.addEventListener('resize', () => {
		const codeBlocks: HTMLElement[] = Array.from(
			document.querySelectorAll('[data-focusable-if-scrollable]')
		);
		setScrollableAttrs(codeBlocks);
	});
}
function setScrollableAttrs(elements: HTMLElement[]) {
	for (const block of elements) {
		const isHorizontallyScrollable = block.scrollWidth > block.clientWidth;
		const isVerticallyScrollable = block.scrollHeight > block.clientHeight;

		if (isHorizontallyScrollable) {
			block.setAttribute('role', 'group');
			block.setAttribute('aria-label', 'Horizontally scrollable element');
			block.tabIndex = 0;
		} else if (isVerticallyScrollable) {
			block.setAttribute('role', 'group'); // note group is set here
			block.setAttribute('aria-label', 'Vertically scrollable element');
			block.tabIndex = 0;
		} else {
			block.removeAttribute('role');
			block.removeAttribute('aria-label');
			block.removeAttribute('tabindex');
		}
	}
}
