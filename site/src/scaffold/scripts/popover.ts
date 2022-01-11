export function initPopovers(container: HTMLElement) {
	container.addEventListener('click', (event: Event) => {
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

		const allPopovers: HTMLDetailsElement[] = Array.from(
			container.querySelectorAll('details.popover')
		);

		if (!targetPopover.open) {
			const keyHandler = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					closePopovers();
				}
			};

			const clickHandler = (event: Event) => {
				if (!(event.target instanceof Element)) {
					return;
				}

				if (!targetPopover?.contains(event.target)) {
					targetPopover ? closePopovers([targetPopover]) : closePopovers();
				}
			};

			const blurHandler = () => {
				if ((document.activeElement?.nodeName || '').toLowerCase() === 'iframe') {
					closePopovers();
				}
			};

			const closePopovers = (popovers: HTMLDetailsElement[] = allPopovers) => {
				container.removeEventListener('focus', clickHandler, true);
				container.removeEventListener('click', clickHandler);
				container.removeEventListener('touchstart', clickHandler);
				container.removeEventListener('keydown', keyHandler);
				window.removeEventListener('blur', blurHandler);

				for (const popover of popovers) {
					if (popover.open) {
						popover.removeAttribute('open');
					}
				}
			};

			container.addEventListener('focus', clickHandler, true);
			container.addEventListener('click', clickHandler);
			container.addEventListener('touchstart', clickHandler);
			container.addEventListener('keydown', keyHandler);
			window.addEventListener('blur', blurHandler);
		}
	});
}
