export function initPopover(container: Element) {
	const popovers = container.querySelectorAll('details');

	if (popovers.length === 0) {
		return;
	}

	popovers.forEach(p =>
		p.addEventListener('keydown', event => {
			if (event.key === 'Escape') {
				if (p.hasAttribute('open')) {
					p.removeAttribute('open');
				}
				p.focus();
			}
		})
	);

	container.addEventListener('click', event => {
		const targetPopover =
			event.target instanceof Element && (event.target.closest('details') as HTMLDetailsElement)
				? (event.target.closest('details') as HTMLDetailsElement)
				: null;

		const otherPopovers = Array.from(popovers).filter(el => el !== targetPopover);

		otherPopovers.forEach(p => {
			if (p.hasAttribute('open')) {
				p.removeAttribute('open');
			}
		});
	});
}
