/**
 * Position the popover so that popover-content does not go off the screen
 * Originally, the popover-content is hidden. This function calculates
 * the new position and shows the popover-content
 */
function positionPopover(popover: HTMLDetailsElement) {
	const popoverContent = popover.querySelector('.popover-content') as HTMLElement;
	const summaryButton = popover.querySelector('summary') as HTMLElement;
	if (!popoverContent || !summaryButton) {
		return;
	}

	popoverContent.style.top = '';
	popoverContent.style.left = '';

	// leave space from viewport edge
	const buffer = 8;

	const summaryRect = summaryButton.getBoundingClientRect();
	const popoverRect = popover.getBoundingClientRect();
	const offsetTop = summaryButton.offsetTop;

	// By default, place the popover-content below the button. If it doesn't fit, put it above.
	const spaceBelow = window.innerHeight - summaryRect.bottom;
	const spaceAbove = summaryRect.top;
	const placeBelow = spaceBelow >= popoverContent.offsetHeight || spaceBelow >= spaceAbove;

	if (placeBelow) {
		popoverContent.style.top = `${offsetTop + summaryButton.offsetHeight + buffer}px`;
	} else {
		popoverContent.style.top = `${offsetTop - popoverContent.offsetHeight - buffer}px`;
	}

	// Line up the left edge of the button and popover-content
	const offsetLeft = summaryButton.offsetLeft;
	let desiredLeft = offsetLeft;

	// Compute the right edge and if the right edge overflows, shift more to the left
	const contentWidth = popoverContent.offsetWidth;
	const contentRightEdge = popoverRect.left + desiredLeft + contentWidth;
	if (contentRightEdge > window.innerWidth - buffer) {
		const overflowAmount = contentRightEdge - (window.innerWidth - buffer);
		desiredLeft -= overflowAmount;
	}

	// Clamp to stay within left edge
	const minLeft = buffer - popoverRect.left;
	desiredLeft = Math.max(desiredLeft, minLeft);

	popoverContent.style.left = `${desiredLeft}px`;
}

/* eslint-disable @typescript-eslint/no-use-before-define */
export function initPopover(container: HTMLElement = document.body) {
	container.addEventListener(
		'toggle',
		(event: Event) => {
			const targetPopover =
				(event.target instanceof Element &&
					(event.target.closest('details.popover') as HTMLDetailsElement)) ||
				(event.target instanceof Element &&
					(event.target.shadowRoot?.activeElement?.closest(
						'details.popover'
					) as HTMLDetailsElement));

			if (
				!targetPopover ||
				!targetPopover.open ||
				targetPopover.dataset.popoverInitialized === 'true'
			) {
				return;
			}

			targetPopover.dataset.popoverInitialized = 'true';

			const content = targetPopover.querySelector('.popover-content') as HTMLElement;
			if (!content) {
				return;
			}

			// Hide the popover until the position has been calculated, then show
			content.style.visibility = 'hidden';
			content.style.opacity = '0';

			requestAnimationFrame(() => {
				positionPopover(targetPopover);

				requestAnimationFrame(() => {
					content.style.visibility = 'visible';
					content.style.opacity = '1';
				});
			});

			const keyHandler = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					closePopovers();
				}
			};

			const checkTarget = (event: Event) => {
				if (!(event.target instanceof Element)) {
					return;
				}

				if (!targetPopover?.contains(event.target)) {
					closePopovers();
				}

				if (event.type === 'click' && event.target.closest('[data-popover-close]')) {
					closePopovers();
				}
			};

			const blurHandler = () => {
				if (document.activeElement?.nodeName?.toLowerCase() === 'iframe') {
					closePopovers();
				}
			};

			const closePopovers = () => {
				container.removeEventListener('focus', checkTarget, true);
				container.removeEventListener('click', checkTarget);
				container.removeEventListener('touchstart', checkTarget);
				container.removeEventListener('keydown', keyHandler);
				window.removeEventListener('blur', blurHandler);
				if (targetPopover?.open) {
					targetPopover.removeAttribute('open');
					targetPopover.dataset.popoverInitialized = 'false';
				}
			};

			container.addEventListener('focus', checkTarget, true);
			container.addEventListener('click', checkTarget);
			container.addEventListener('touchstart', checkTarget);
			container.addEventListener('keydown', keyHandler);
			window.addEventListener('blur', blurHandler);
		},
		true
	);
}
