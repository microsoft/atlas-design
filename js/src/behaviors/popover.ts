const VIEWPORT_BUFFER = 8;
const POPOVER_SPACING = 8;

function positionVertically(popoverContent: HTMLElement, summaryButton: HTMLElement) {
	const summaryRect = summaryButton.getBoundingClientRect();

	const spaceBelow = window.innerHeight - summaryRect.bottom;
	const spaceAbove = summaryRect.top;
	const forceTop = popoverContent.classList.contains('popover-top');
	const placeBelow =
		!forceTop && (spaceBelow >= popoverContent.offsetHeight || spaceBelow >= spaceAbove);

	const hasCaretClass = popoverContent.classList.contains('popover-caret');
	if (hasCaretClass) {
		popoverContent.classList.remove('popover-caret-bottom');
	}

	let topPosition = 0;
	if (placeBelow) {
		topPosition = summaryButton.offsetTop + summaryButton.offsetHeight + POPOVER_SPACING;
	} else {
		topPosition = summaryButton.offsetTop - popoverContent.offsetHeight - POPOVER_SPACING;
		if (hasCaretClass) {
			popoverContent.classList.add('popover-caret-bottom');
		}
	}
	popoverContent.style.top = `${topPosition}px`;
}

function positionHorizontally(popoverContent: HTMLElement, summaryButton: HTMLElement): number {
	const popoverRect = popoverContent.getBoundingClientRect();

	let desiredLeft;

	const alignLeft = popoverContent.classList.contains('popover-left');
	const alignRight = popoverContent.classList.contains('popover-right');

	if (alignLeft) {
		desiredLeft = summaryButton.offsetLeft;
	} else if (alignRight) {
		desiredLeft = summaryButton.offsetLeft + summaryButton.offsetWidth - popoverContent.offsetWidth;
	} else {
		const buttonCenter = summaryButton.offsetLeft + summaryButton.offsetWidth / 2;
		const contentHalfWidth = popoverContent.offsetWidth / 2;
		desiredLeft = buttonCenter - contentHalfWidth;

		const contentWidth = popoverContent.offsetWidth;
		const contentRightEdge = popoverRect.left + desiredLeft + contentWidth;

		if (contentRightEdge > window.innerWidth - VIEWPORT_BUFFER * 2) {
			const overflowAmount = contentRightEdge - (window.innerWidth - VIEWPORT_BUFFER * 2);
			desiredLeft -= overflowAmount;
		}

		const minLeft = VIEWPORT_BUFFER - popoverRect.left;
		desiredLeft = Math.max(desiredLeft, minLeft);
	}
	popoverContent.style.left = `${desiredLeft}px`;
	return desiredLeft;
}

function positionCaret(
	popoverContent: HTMLElement,
	summaryButton: HTMLElement,
	desiredLeft: number
) {
	const contentWidth = popoverContent.offsetWidth;
	const buttonCenter = summaryButton.offsetLeft + summaryButton.offsetWidth / 2;

	const buttonCenterRelativeToContent = buttonCenter - desiredLeft - 4;
	const caretLeftPercent = (buttonCenterRelativeToContent / contentWidth) * 100;

	const clampedCaretLeftPercent = Math.min(Math.max(caretLeftPercent, 10), 90);
	popoverContent.style.setProperty('--caret-left', `${clampedCaretLeftPercent}%`);
}

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

	positionVertically(popoverContent, summaryButton);
	const desiredLeft = positionHorizontally(popoverContent, summaryButton);

	if (popoverContent.classList.contains('popover-caret')) {
		positionCaret(popoverContent, summaryButton, desiredLeft);
	}
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

			if (!targetPopover) {
				return;
			}

			const content = targetPopover.querySelector('.popover-content') as HTMLElement;
			if (!content) {
				return;
			}

			// If popover is being closed, hide content immediately
			if (!targetPopover.open) {
				content.style.visibility = 'hidden';
				return;
			}

			requestAnimationFrame(() => {
				positionPopover(targetPopover);
				// If the user scrolls around on the page, this forced reflow
				// recalculates the popover's position to avoid a flash before
				// the position is relocated
				void content.offsetHeight;
				content.style.visibility = 'visible';
			});

			const resizeHandler = () => {
				if (targetPopover.open) {
					positionPopover(targetPopover);
				}
			};

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
				window.removeEventListener('resize', resizeHandler);
				if (targetPopover?.open) {
					targetPopover.removeAttribute('open');
					content.style.visibility = 'hidden';
				}
			};

			container.addEventListener('focus', checkTarget, true);
			container.addEventListener('click', checkTarget);
			container.addEventListener('touchstart', checkTarget);
			container.addEventListener('keydown', keyHandler);
			window.addEventListener('blur', blurHandler);
			window.addEventListener('resize', resizeHandler);
		},
		true
	);
}
