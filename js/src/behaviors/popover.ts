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

const VIEWPORT_BUFFER = 24;
const POPOVER_SPACING = 8;

function isRTL(element: HTMLElement): boolean {
	return window.getComputedStyle(element).direction === 'rtl';
}

function positionVertically(
	popover: HTMLElement,
	popoverContent: HTMLElement,
	popoverSummary: HTMLElement
) {
	const summaryRect = popoverSummary.getBoundingClientRect();

	const spaceBelow = window.innerHeight - summaryRect.bottom;
	const spaceAbove = summaryRect.top;
	const forceTop = popover.classList.contains('popover-top');

	const popoverHeight = popoverContent.offsetHeight;
	let placeBelow = false;

	if (!forceTop) {
		const wouldBeCutOffAtTop = popoverHeight + POPOVER_SPACING > spaceAbove;
		placeBelow = wouldBeCutOffAtTop
			? true
			: spaceBelow >= popoverHeight || spaceBelow >= spaceAbove;
	}

	const hasCaretClass = popover.classList.contains('popover-caret');
	if (hasCaretClass) {
		popover.classList.remove('popover-caret-bottom');
	}
	let topPosition = 0;
	if (placeBelow) {
		topPosition = popoverSummary.offsetTop + popoverSummary.offsetHeight + POPOVER_SPACING;
	} else {
		topPosition = popoverSummary.offsetTop - popoverContent.offsetHeight - POPOVER_SPACING;
		if (hasCaretClass) {
			popover.classList.add('popover-caret-bottom');
		}
	}

	popoverContent.style.top = `${topPosition}px`;
}

function positionHorizontally(
	popover: HTMLElement,
	popoverContent: HTMLElement,
	popoverSummary: HTMLElement,
	isRtl: boolean
): number {
	const contentWidth = popoverContent.offsetWidth;
	const buttonWidth = popoverSummary.offsetWidth;
	const viewportWidth = window.innerWidth;

	const parent = popoverContent.offsetParent as HTMLElement;
	const parentRect = parent.getBoundingClientRect();

	const buttonLeft = popoverSummary.offsetLeft;
	const buttonRight = buttonLeft + buttonWidth;

	let desiredLeft;
	const alignStart = popover.classList.contains('popover-left');
	const alignEnd = popover.classList.contains('popover-right');

	if (alignStart) {
		desiredLeft = isRtl ? buttonRight - contentWidth : buttonLeft;
	} else if (alignEnd) {
		desiredLeft = isRtl ? buttonLeft : buttonRight - contentWidth;
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

	if (isRtl) {
		popoverContent.style.setProperty('left', `${desiredLeft}px`);
		popoverContent.style.setProperty('right', 'auto');
	} else {
		popoverContent.style.setProperty('inset-inline-start', `${desiredLeft}px`);
	}

	return desiredLeft;
}

function positionCaret(
	popoverContent: HTMLElement,
	popoverSummary: HTMLElement,
	desiredLeft: number,
	isRtl: boolean
) {
	const contentWidth = popoverContent.offsetWidth;
	const buttonWidth = popoverSummary.offsetWidth;
	const buttonLeft = popoverSummary.offsetLeft;
	const buttonCenter = buttonLeft + buttonWidth / 2;
	let caretPosition;

	if (isRtl) {
		const ltrPosition = ((buttonCenter - desiredLeft + 4) / contentWidth) * 100;
		caretPosition = 100 - ltrPosition;
	} else {
		caretPosition = ((buttonCenter - desiredLeft - 4) / contentWidth) * 100;
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
	const popoverSummary = popover.querySelector('summary') as HTMLElement;

	if (!popoverContent || !popoverSummary) {
		return;
	}

	popoverContent.style.top = '';
	popoverContent.style.left = '';
	popoverContent.style.right = '';
	popoverContent.style.setProperty('inset-inline-start', '');

	const isRtl = isRTL(popover);
	positionVertically(popover, popoverContent, popoverSummary);
	const desiredLeft = positionHorizontally(popover, popoverContent, popoverSummary, isRtl);

	if (popover.classList.contains('popover-caret')) {
		positionCaret(popoverContent, popoverSummary, desiredLeft, isRtl);
	}

	popoverContent.style.visibility = 'visible';
}
