const VIEWPORT_BUFFER = 24;
const POPOVER_SPACING = 8;

function isRTL(element: HTMLElement): boolean {
	return window.getComputedStyle(element).direction === 'rtl';
}

/**
 * If the contents of the popover are long and exceed the size of the screen,
 * this function will scroll up or down to show the entire contents
 */
function scrollToShowPopover(
	summaryRect: DOMRect,
	popoverContentHeight: number,
	placeBelow: boolean
) {
	if (placeBelow) {
		const popoverBottomRelativeToViewport =
			summaryRect.bottom + popoverContentHeight + POPOVER_SPACING;
		if (popoverBottomRelativeToViewport > window.innerHeight) {
			const scrollAmount = popoverBottomRelativeToViewport - window.innerHeight + POPOVER_SPACING;
			window.scrollBy({
				top: scrollAmount,
				behavior: 'smooth'
			});
		}
	} else {
		const popoverTopRelativeToViewport = summaryRect.top - popoverContentHeight - POPOVER_SPACING;
		if (popoverTopRelativeToViewport < 0) {
			const scrollAmount = Math.abs(popoverTopRelativeToViewport) + POPOVER_SPACING;
			window.scrollBy({
				top: -scrollAmount,
				behavior: 'smooth'
			});
		}
	}
}

function positionVertically(
	popover: HTMLElement,
	popoverContent: HTMLElement,
	summaryButton: HTMLElement
) {
	const summaryRect = summaryButton.getBoundingClientRect();

	const spaceBelow = window.innerHeight - summaryRect.bottom;
	const spaceAbove = summaryRect.top;
	const forceTop = popover.classList.contains('popover-top');
	const placeBelow =
		!forceTop && (spaceBelow >= popoverContent.offsetHeight || spaceBelow >= spaceAbove);

	const hasCaretClass = popover.classList.contains('popover-caret');
	if (hasCaretClass) {
		popover.classList.remove('popover-caret-bottom');
	}
	let topPosition = 0;
	if (placeBelow) {
		topPosition = summaryButton.offsetTop + summaryButton.offsetHeight + POPOVER_SPACING;
	} else {
		topPosition = summaryButton.offsetTop - popoverContent.offsetHeight - POPOVER_SPACING;
		if (hasCaretClass) {
			popover.classList.add('popover-caret-bottom');
		}
	}

	scrollToShowPopover(summaryRect, popoverContent.offsetHeight, placeBelow);
	popoverContent.style.top = `${topPosition}px`;
}

function positionHorizontallyLTR(
	popover: HTMLElement,
	popoverContent: HTMLElement,
	summaryButton: HTMLElement
): number {
	const contentWidth = popoverContent.offsetWidth;
	const buttonWidth = summaryButton.offsetWidth;
	const viewportWidth = window.innerWidth;

	const parent = popoverContent.offsetParent as HTMLElement;
	const parentRect = parent.getBoundingClientRect();

	const buttonLeft = summaryButton.offsetLeft;
	const buttonRight = buttonLeft + buttonWidth;

	let desiredLeft;
	const alignStart = popover.classList.contains('popover-left');
	const alignEnd = popover.classList.contains('popover-right');

	if (alignStart) {
		desiredLeft = buttonLeft;
	} else if (alignEnd) {
		desiredLeft = buttonRight - contentWidth;
	} else {
		desiredLeft = buttonLeft + buttonWidth / 2 - contentWidth / 2;

		const leftEdgeInViewport = parentRect.left + desiredLeft;
		const rightEdgeInViewport = leftEdgeInViewport + contentWidth;

		if (leftEdgeInViewport < VIEWPORT_BUFFER) {
			// if overflowing left, then left-align popover and button
			desiredLeft = buttonLeft;
		} else if (rightEdgeInViewport > viewportWidth - VIEWPORT_BUFFER) {
			// right-align
			desiredLeft = buttonRight - contentWidth;
		}
	}

	return desiredLeft;
}

function positionHorizontallyRTL(
	popover: HTMLElement,
	popoverContent: HTMLElement,
	summaryButton: HTMLElement
): number {
	const contentWidth = popoverContent.offsetWidth;
	const buttonWidth = summaryButton.offsetWidth;
	const viewportWidth = window.innerWidth;

	const parent = popoverContent.offsetParent as HTMLElement;
	const parentRect = parent.getBoundingClientRect();

	const buttonLeft = summaryButton.offsetLeft;
	const buttonRight = buttonLeft + buttonWidth;

	let desiredLeft;
	const alignStart = popover.classList.contains('popover-left');
	const alignEnd = popover.classList.contains('popover-right');

	if (alignStart) {
		desiredLeft = buttonRight - contentWidth;
	} else if (alignEnd) {
		desiredLeft = buttonLeft;
	} else {
		desiredLeft = buttonLeft + buttonWidth / 2 - contentWidth / 2;

		const leftEdgeInViewport = parentRect.left + desiredLeft;
		const rightEdgeInViewport = leftEdgeInViewport + contentWidth;

		if (leftEdgeInViewport < VIEWPORT_BUFFER) {
			// if overflowing left, then left-align popover and button
			desiredLeft = buttonLeft;
		} else if (rightEdgeInViewport > viewportWidth - VIEWPORT_BUFFER) {
			// right-align
			desiredLeft = buttonRight - contentWidth;
		}
	}

	return desiredLeft;
}

function positionHorizontally(
	popover: HTMLElement,
	popoverContent: HTMLElement,
	summaryButton: HTMLElement
): number {
	const isRtl = isRTL(popover);
	let desiredInlineStart: number;

	if (isRtl) {
		desiredInlineStart = positionHorizontallyRTL(popover, popoverContent, summaryButton);
		popoverContent.style.setProperty('left', `${desiredInlineStart}px`);
		popoverContent.style.setProperty('right', 'auto');
	} else {
		desiredInlineStart = positionHorizontallyLTR(popover, popoverContent, summaryButton);
		popoverContent.style.setProperty('inset-inline-start', `${desiredInlineStart}px`);
		popoverContent.style.left = '';
		popoverContent.style.right = '';
	}

	return desiredInlineStart;
}

function positionCaret(
	popoverContent: HTMLElement,
	summaryButton: HTMLElement,
	desiredLeft: number
) {
	const contentWidth = popoverContent.offsetWidth;
	const buttonWidth = summaryButton.offsetWidth;
	const buttonLeft = summaryButton.offsetLeft;
	const popover = popoverContent.closest('.popover') as HTMLElement;
	const isRtl = isRTL(popover);

	const buttonCenter = buttonLeft + buttonWidth / 2;
	let caretPosition;

	if (!isRtl) {
		caretPosition = ((buttonCenter - desiredLeft - 4) / contentWidth) * 100;
	} else {
		const ltrPosition = ((buttonCenter - desiredLeft + 4) / contentWidth) * 100;
		caretPosition = 100 - ltrPosition;
	}

	const clampedCaretPosition = Math.min(Math.max(caretPosition, 10), 90);
	popoverContent.style.setProperty('--caret-left', `${clampedCaretPosition}%`);
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
	popoverContent.style.right = '';
	popoverContent.style.setProperty('inset-inline-start', '');

	positionVertically(popover, popoverContent, summaryButton);
	const desiredLeft = positionHorizontally(popover, popoverContent, summaryButton);

	if (popover.classList.contains('popover-caret')) {
		positionCaret(popoverContent, summaryButton, desiredLeft);
	}

	popoverContent.style.visibility = 'visible';
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
