/**
 * Tab control for assessment lens
 * @param container - Container of tab control component
 */
/**
 * Snap scroll behaviors to have a smooth transition from one card to another
 */
export function initTabs() {
	const container = document.getElementById('tab-test') as HTMLElement;

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
			const currentActiveTab = container.querySelector('.is-active');
			const currentButton = currentActiveTab?.firstChild as HTMLButtonElement;
			const index = currentButton?.dataset.tabControl;
			console.log(currentActiveTab, index);

			if (b.className.includes('tab-previous')) {
				console.log('previous');
			} else if (b.className.includes('tab-next')) {
				console.log('next');
			}
		});
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
			const parentElement = b.closest('.tab-parent') as HTMLElement;

			if (!parentElement) {
				return;
			}

			updateTabState(container, parentElement);
			updateTabItemState(container, b.dataset.tabControl as string);
		});
	}
}

function updateTabState(container: HTMLElement, parentElement: HTMLElement) {
	// remove is current from all anchors in this container
	const tabParents = Array.from(container.querySelectorAll('.tab-parent')) as HTMLElement[];

	if (!tabParents) {
		return;
	}
	for (const tp of tabParents) {
		tp.classList.remove('is-active');
	}
	// add one back
	parentElement.classList.add('is-active');
}

function updateTabItemState(container: HTMLElement, activatedTab: string) {
	const tabItemElements = Array.from(container.querySelectorAll('[data-tab-item')) as HTMLElement[];
	const tabItem = container.querySelector(`[data-tab-item=tab-item-${activatedTab}`);

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
