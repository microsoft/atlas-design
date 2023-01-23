export function initTabs() {
	initTabNavClickListeners();
	initTabControlClickListeners();

	// update when tabs into the view
	const tabContainers = Array.from(
		document.querySelectorAll('[data-tab-container]')
	) as HTMLElement[];
	for (const tc of tabContainers) {
		updateTabNav(tc);
	}
}

function initTabNavClickListeners() {
	window.addEventListener('click', (event: Event) => {
		const target =
			event.target instanceof Element &&
			(event.target.closest('[data-tab-nav]') as HTMLButtonElement);

		if (!target) {
			return;
		}

		event.preventDefault();
		const container = event.target.closest('[data-tab-container]') as HTMLElement;
		const tabs = Array.from(
			container.querySelectorAll('[data-tab-control]')
		) as HTMLButtonElement[];

		// get current activated tab
		const currentActiveButton = container.querySelector(
			'[aria-selected="true"]'
		) as HTMLButtonElement;
		const index = parseInt(currentActiveButton?.dataset.tabControl as string);

		// update tab
		if (index > 1 && target.dataset.tabNav === 'previous') {
			updateTabState(container, currentActiveButton, index - 1);
			updateTabPanel(container, index, index - 1);
		} else if (index < tabs.length && target.dataset.tabNav === 'next') {
			updateTabState(container, currentActiveButton, index + 1);
			updateTabPanel(container, index, index + 1);
		}
		updateTabNav(container);
	});
}

function initTabControlClickListeners() {
	window.addEventListener('click', (event: Event) => {
		const target =
			event.target instanceof Element &&
			(event.target.closest('[data-tab-control]') as HTMLButtonElement);

		if (!target) {
			return;
		}

		event.preventDefault();
		const container = event.target.closest('[data-tab-container]') as HTMLElement;
		updateTabNav(container);
	});
	window.addEventListener('keydown', (event: KeyboardEvent) => {
		if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
			return;
		}

		const target =
			event.target instanceof Element &&
			(event.target.closest('[data-tab-control]') as HTMLButtonElement);

		if (!target) {
			return;
		}

		event.preventDefault();
		const container = event.target.closest('[data-tab-container]') as HTMLElement;
		updateTabNav(container);
	});
}

function updateTabNav(container: HTMLElement = document.body) {
	const tabs = Array.from(container.querySelectorAll('[data-tab-control]')) as HTMLButtonElement[];
	const previousButton = container.querySelector('[data-tab-nav="previous"]') as HTMLButtonElement;
	const nextButton = container.querySelector('[data-tab-nav="next"]') as HTMLButtonElement;
	const currentActiveButton = container.querySelector(
		'[aria-selected="true"]'
	) as HTMLButtonElement;
	const index = parseInt(currentActiveButton?.dataset.tabControl as string);

	// slide active button into view
	currentActiveButton.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });

	if (index <= 1) {
		previousButton.hidden = true;
		nextButton.hidden = false;
	} else if (index >= tabs.length) {
		previousButton.hidden = false;
		nextButton.hidden = true;
	} else {
		previousButton.hidden = false;
		nextButton.hidden = false;
	}
}

function updateTabState(
	container: HTMLElement,
	currentActiveButton: HTMLButtonElement,
	updatedIndex: number
) {
	const updatedTab = container.querySelector(
		`[data-tab-control="${updatedIndex}"]`
	) as HTMLButtonElement;

	currentActiveButton.setAttribute('aria-selected', 'false');
	currentActiveButton.setAttribute('tabindex', '-1');
	updatedTab.setAttribute('aria-selected', 'true');
	updatedTab.setAttribute('tabindex', '0');
}

function updateTabPanel(container: HTMLElement, currentIndex: number, updatedIndex: number) {
	const currentPanel = container.querySelector(`[data-tab-item="${currentIndex}"]`) as HTMLElement;
	const updatedPanel = container.querySelector(`[data-tab-item="${updatedIndex}"]`) as HTMLElement;

	currentPanel.hidden = true;
	updatedPanel.hidden = false;
}
