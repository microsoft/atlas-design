export function initPopover(container: HTMLElement) {
	container.addEventListener('click', event => {
		const popovers: HTMLDetailsElement[] = Array.from(
			container.querySelectorAll('details.popover')
		);

		if (popovers.length === 0) {
			return;
		}

		popovers.forEach(p =>
			p.addEventListener('keydown', event => {
				if (event.key === 'Escape') {
					closePopover(p);
				}
			})
		);

		const targetPopover =
			event.target instanceof HTMLElement &&
			(event.target.closest('details.popover') as HTMLDetailsElement)
				? (event.target.closest('details.popover') as HTMLDetailsElement)
				: null;

		const otherPopovers = popovers.filter(el => el !== targetPopover);

		otherPopovers.forEach(p => {
			closePopover(p);
		});
	});
}

function closePopover(popover: HTMLDetailsElement) {
	if (popover.hasAttribute('open')) {
		popover.removeAttribute('open');
	}
}
