export function initSegmentedControls() {
	initSegmentedControlNavClickListeners();
	initSegmentedControlClickListeners();

	// update when tabs into the view
	const segmentsContainers = Array.from(
		document.querySelectorAll('[data-segmented-controls-container]')
	) as HTMLElement[];
	for (const sc of segmentsContainers) {
		updateSegmentedControlNav(sc);
	}
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
		if (index > 1 && target.dataset.segmentedControlNav === 'previous') {
			updateSegmentedControlState(container, currentActiveButton, index - 1);
			updateSegmentedControlItem(container, index, index - 1);
		} else if (index < segments.length && target.dataset.segmentedControlNav === 'next') {
			updateSegmentedControlState(container, currentActiveButton, index + 1);
			updateSegmentedControlItem(container, index, index + 1);
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
	const segments = Array.from(
		container.querySelectorAll('[data-segmented-control]')
	) as HTMLButtonElement[];
	const previousButton = container.querySelector(
		'[data-segmented-control-nav="previous"]'
	) as HTMLButtonElement;
	const nextButton = container.querySelector(
		'[data-segmented-control-nav="next"]'
	) as HTMLButtonElement;
	const currentActiveButton = container.querySelector(
		'[aria-selected="true"]'
	) as HTMLButtonElement;
	const index = parseInt(currentActiveButton?.dataset.segmentedControl as string);

	// slide active button into view
	currentActiveButton.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });

	if (index <= 1) {
		previousButton.hidden = true;
		nextButton.hidden = false;
	} else if (index >= segments.length) {
		previousButton.hidden = false;
		nextButton.hidden = true;
	} else {
		previousButton.hidden = false;
		nextButton.hidden = false;
	}
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
