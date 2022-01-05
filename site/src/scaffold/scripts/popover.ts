export function initPopovers(container: HTMLElement) {
	container.addEventListener('click', event => {
		const allPopovers: HTMLDetailsElement[] = Array.from(
			container.querySelectorAll('details.popover')
		);

		if (allPopovers.length === 0) {
			return;
		}

		const keyHandler = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closePopovers(allPopovers);
			}

			if (targetPopover) {
				targetPopover.removeEventListener('keydown', keyHandler);
			}
		};

		const closePopovers = (popovers: HTMLDetailsElement[]) => {
			for (const popover of popovers) {
				if (popover.hasAttribute('open')) {
					popover.removeAttribute('open');
				}
			}
		};

		const targetPopover =
			(event.target instanceof HTMLElement || event.target instanceof SVGElement) &&
			(event.target.closest('details.popover') as HTMLDetailsElement)
				? (event.target.closest('details.popover') as HTMLDetailsElement)
				: null;

		if (targetPopover) {
			targetPopover.addEventListener('keydown', keyHandler);
		}

		const otherPopovers = allPopovers.filter(el => el !== targetPopover);
		closePopovers(otherPopovers);
	});
}
