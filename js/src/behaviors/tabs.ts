export * from '@github/tab-container-element';

/**
 * Tab control for assessment lens
 * @param container - Container of tab control component
 */
/**
 * Tabs behaviors
 */
export function initTabs(container: HTMLElement = document.body) {
	initTabNavClickListeners(container);
}

function initTabNavClickListeners(container: HTMLElement = document.body) {
	window.addEventListener('click', (event: Event) => {
		const target =
			event.target instanceof Element &&
			(event.target.closest('[role="navigation"]') as HTMLButtonElement);

		if (!target) {
			return;
		}

		event.preventDefault();
		const tabs = Array.from(container.querySelectorAll('[role="tab"]')) as HTMLButtonElement[];

		// get current activated tab
		const currentActiveButton = container.querySelector(
			'[aria-selected="true"]'
		) as HTMLButtonElement;
		const index = parseInt(currentActiveButton?.dataset.tabNav as string);

		// update tab
		if (index > 1 && target.id === 'tab-previous') {
			updateTabState(container, currentActiveButton, index - 1);
			updateTabPanel(container, index, index - 1);
		} else if (index < tabs.length && target.id === 'tab-next') {
			updateTabState(container, currentActiveButton, index + 1);
			updateTabPanel(container, index, index + 1);
		}
		updateTabNav(container);
	});
}

function updateTabNav(container: HTMLElement = document.body) {
	const tabs = Array.from(container.querySelectorAll('[role="tab"]')) as HTMLButtonElement[];
	const previousButton = container.querySelector('#tab-previous') as HTMLButtonElement;
	const nextButton = container.querySelector('#tab-next') as HTMLButtonElement;
	const currentActiveButton = container.querySelector(
		'[aria-selected="true"]'
	) as HTMLButtonElement;
	const index = parseInt(currentActiveButton?.dataset.tabNav as string);

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
	const updatedTab = container.querySelector(`[data-tab="${updatedIndex}"]`) as HTMLButtonElement;

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
