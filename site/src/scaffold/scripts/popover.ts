export function initPopovers(container: HTMLElement) {
	container.addEventListener('click', (event: Event) => {
		const allPopovers: HTMLDetailsElement[] = Array.from(
			container.querySelectorAll('details.popover')
		);

		if (allPopovers.length === 0) {
			return;
		}

		let targetPopover: HTMLDetailsElement | null;
		targetPopover =
			event.target instanceof Element &&
			(event.target.closest('details.popover') as HTMLDetailsElement)
				? (event.target.closest('details.popover') as HTMLDetailsElement)
				: null;

		if (!targetPopover) {
			targetPopover =
				event.target instanceof Element &&
				event.target.shadowRoot &&
				event.target.shadowRoot.activeElement &&
				(event.target.shadowRoot.activeElement.closest('details.popover') as HTMLDetailsElement)
					? (event.target.shadowRoot.activeElement.closest('details.popover') as HTMLDetailsElement)
					: null;
		}

		if (!targetPopover) {
			return;
		}

		if (!targetPopover.hasAttribute('open')) {
			const keyHandler = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					closePopovers(allPopovers);
				}
			};

			const clickHandler = (event: Event) => {
				if (!(event.target instanceof Element)) {
					return;
				}

				if (!(targetPopover && targetPopover.contains(event.target))) {
					closePopovers(allPopovers);
				}
			};

			const blurHandler = () => {
				if (
					((document.activeElement && document.activeElement.nodeName) || '').toLowerCase() ===
					'iframe'
				) {
					closePopovers(allPopovers);
				}
			};

			const closePopovers = (popovers: HTMLDetailsElement[]) => {
				for (const popover of popovers) {
					if (popover.hasAttribute('open')) {
						popover.removeAttribute('open');
					}
				}

				container.removeEventListener('click', clickHandler);
				container.removeEventListener('touchstart', clickHandler);
				container.removeEventListener('keydown', keyHandler);
				window.removeEventListener('blur', blurHandler);
			};

			const otherPopovers = allPopovers.filter(el => el !== targetPopover);
			closePopovers(otherPopovers);

			container.addEventListener('click', clickHandler);
			container.addEventListener('touchstart', clickHandler);
			container.addEventListener('keydown', keyHandler);
			window.addEventListener('blur', blurHandler);
		}
	});
}
