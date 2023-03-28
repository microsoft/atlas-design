export function initSegmentedControls() {
	initSegmentedControlNavClickListeners();
	initSegmentedControlClickListeners();
}

function initSegmentedControlNavClickListeners() {
	window.addEventListener('click', (event: Event) => {
		const target =
			event.target instanceof Element &&
			(event.target.closest('[data-segmented-control-nav]') as HTMLButtonElement);

		if (!target) {
			return;
		}

		event.preventDefault();
		const container = event.target.closest('[data-segmented-controls-container]') as HTMLElement;
		const segments = Array.from(
			container.querySelectorAll('[data-segmented-control]')
		) as HTMLButtonElement[];

		// get current activated tab
		const currentActiveButton = container.querySelector(
			'[aria-selected="true"]'
		) as HTMLButtonElement;
		const index = parseInt(currentActiveButton?.dataset.segmentedControl as string);

		// update tab
		if (target.dataset.segmentedControlNav === 'previous') {
			const nextSegment = index === 1 ? segments.length : index - 1;
			updateSegmentedControlState(container, currentActiveButton, nextSegment);
			updateSegmentedControlItem(container, index, nextSegment);
		} else if (target.dataset.segmentedControlNav === 'next') {
			const nextSegment = index === segments.length ? 1 : index + 1;
			updateSegmentedControlState(container, currentActiveButton, nextSegment);
			updateSegmentedControlItem(container, index, nextSegment);
		}
		updateSegmentedControlNav(container);
	});
}

function initSegmentedControlClickListeners() {
	window.addEventListener('click', (event: Event) => {
		const target =
			event.target instanceof Element &&
			(event.target.closest('[data-segmented-control]') as HTMLButtonElement);

		if (!target) {
			return;
		}

		event.preventDefault();
		const container = event.target.closest('[data-segmented-controls-container]') as HTMLElement;
		updateSegmentedControlNav(container);
	});
	window.addEventListener('keydown', (event: KeyboardEvent) => {
		if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
			return;
		}

		const target =
			event.target instanceof Element &&
			(event.target.closest('[data-segmented-control]') as HTMLButtonElement);

		if (!target) {
			return;
		}

		event.preventDefault();
		const container = event.target.closest('[data-segmented-controls-container]') as HTMLElement;
		updateSegmentedControlNav(container);
	});
}

function updateSegmentedControlNav(container: HTMLElement = document.body) {
	const currentActiveButton = container.querySelector(
		'[aria-selected="true"]'
	) as HTMLButtonElement;

	// slide active button into view
	currentActiveButton.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
}

function updateSegmentedControlState(
	container: HTMLElement,
	currentActiveButton: HTMLButtonElement,
	updatedIndex: number
) {
	const updatedSegment = container.querySelector(
		`[data-segmented-control="${updatedIndex}"]`
	) as HTMLButtonElement;

	currentActiveButton.setAttribute('aria-selected', 'false');
	currentActiveButton.setAttribute('tabindex', '-1');
	updatedSegment.setAttribute('aria-selected', 'true');
	updatedSegment.setAttribute('tabindex', '0');
}

function updateSegmentedControlItem(
	container: HTMLElement,
	currentIndex: number,
	updatedIndex: number
) {
	const currentPanel = container.querySelector(
		`[data-segmented-control-item="${currentIndex}"]`
	) as HTMLElement;
	const updatedPanel = container.querySelector(
		`[data-segmented-control-item="${updatedIndex}"]`
	) as HTMLElement;

	currentPanel.hidden = true;
	updatedPanel.hidden = false;
}
