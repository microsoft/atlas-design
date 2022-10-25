/**
 * Tab controls
 * @param callback - function of what the should happen on change
 */

export function initTabs(container?: HTMLElement, callback = () => {}) {
	if (!container) {
		container = document.querySelector('[data-tabs-group]') as HTMLElement;
	}

	initTabControlClickListeners(container, callback);
}

function initTabControlClickListeners(container: HTMLElement, callback: () => void) {
	if (!container) {
		return;
	}

	const buttons = Array.from(container.querySelectorAll('.tab-control')) as HTMLButtonElement[];

	if (!buttons) {
		return;
	}

	for (const button of buttons) {
		button.addEventListener('click', (e: Event) => {
			e.preventDefault();
			const activeButton = e.target as HTMLButtonElement;

			updateTabState(container, activeButton);
			callback();
		});
	}
}

function updateTabState(container: HTMLElement, activeButton: HTMLElement) {
	// remove is current from all anchors in this container
	const tabs = Array.from(container.querySelectorAll('.tab-control')) as HTMLElement[];

	if (!tabs) {
		return;
	}

	for (const tab of tabs) {
		tab.classList.remove('is-active');
	}
	// add one back
	activeButton.classList.add('is-active');
}
