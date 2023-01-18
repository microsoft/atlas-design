/**
 * Tab control for assessment lens
 * @param container - Container of tab control component
 */
/**
 * Snap scroll behaviors to have a smooth transition from one card to another
 */
export function initTabs() {
	const container = document.getElementById('tab-test') as HTMLElement;

	updateTabNav(container);
	initTabNavClickListeners(container);
	initTabControlClickListeners(container);
}

function initTabNavClickListeners(container: HTMLElement = document.body) {
	const buttons = Array.from(container.querySelectorAll('.tab-nav')) as HTMLButtonElement[];

	if (!buttons) {
		return;
	}

	for (const button of buttons) {
		button.addEventListener('click', (e: Event) => {
			e.preventDefault();
			const b = e.target as HTMLButtonElement;
			const direction = b.dataset.nav as string;
			// get current activated tab
			const currentActiveButton = container.querySelector('.is-active')
				?.firstElementChild as HTMLButtonElement;
			const index = parseInt(currentActiveButton.dataset.tabControl as string);
			const buttons = Array.from(container.querySelectorAll('.tab-control')) as HTMLButtonElement[];

			// update tab
			if (index > 1 && direction === 'previous') {
				updateTabState(container, `${index - 1}`);
				updateTabItemState(container, `${index - 1}`);
			} else if (index < buttons.length && direction === 'next') {
				updateTabState(container, `${index + 1}`);
				updateTabItemState(container, `${index + 1}`);
			}
			updateTabNav(container);
		});
	}
}

function updateTabNav(container: HTMLElement = document.body) {
	const buttons = Array.from(container.querySelectorAll('.tab-control')) as HTMLButtonElement[];
	const currentActiveButton = container.querySelector('.is-active')
		?.firstElementChild as HTMLButtonElement;
	const index = parseInt(currentActiveButton.dataset.tabControl as string);
	const previousButton = container.querySelector('.tab-previous') as HTMLButtonElement;
	const nextButton = container.querySelector('.tab-next') as HTMLButtonElement;

	if (index <= 1) {
		previousButton.classList.add('display-none');
		nextButton.classList.remove('display-none');
	} else if (index >= buttons.length) {
		nextButton.classList.add('display-none');
		previousButton.classList.remove('display-none');
	} else {
		previousButton.classList.remove('display-none');
		nextButton.classList.remove('display-none');
	}
}

function initTabControlClickListeners(container: HTMLElement = document.body) {
	const buttons = Array.from(container.querySelectorAll('.tab-control')) as HTMLButtonElement[];

	if (!buttons) {
		return;
	}

	for (const button of buttons) {
		button.addEventListener('click', (e: Event) => {
			e.preventDefault();
			const b = e.target as HTMLButtonElement;

			updateTabState(container, b.dataset.tabControl as string);
			updateTabItemState(container, b.dataset.tabControl as string);
			updateTabNav(container);
		});
	}
}

function updateTabState(container: HTMLElement, activatedTab: string) {
	// remove is current from all anchors in this container
	const tabParents = Array.from(container.querySelectorAll('.tab-parent')) as HTMLElement[];

	if (!tabParents) {
		return;
	}
	for (const tp of tabParents) {
		tp.classList.remove('is-active');
	}

	// add one back
	const updatedTab = container.querySelector(`[data-tab-control="${activatedTab}"]`) as HTMLElement;
	const parentElement = updatedTab.closest('.tab-parent') as HTMLElement;
	parentElement.classList.add('is-active');
}

function updateTabItemState(container: HTMLElement, activatedTab: string) {
	const tabItemElements = Array.from(container.querySelectorAll('[data-tab-item')) as HTMLElement[];
	const tabItem = container.querySelector(`[data-tab-item="tab-item-${activatedTab}"]`);

	if (!tabItemElements) {
		return;
	}

	for (const i of tabItemElements) {
		i.classList.remove('display-flex');
		i.classList.add('display-none');
	}
	tabItem?.classList.remove('display-none');
	tabItem?.classList.add('display-flex');
	container.focus();
}
