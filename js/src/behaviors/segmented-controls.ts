import { TabContainerElement, TabContainerChangeEvent } from '@github/tab-container-element';

export function initSegmentedControls() {
	initSegmentedControlChangeListener();
	initSegmentedControlNavClickListener();
}

function initSegmentedControlNavClickListener() {
	window.addEventListener('click', (event: Event) => {
		const target =
			event.target instanceof Element &&
			(event.target.closest('[data-segmented-control-nav]') as HTMLButtonElement);

		if (!target) {
			return;
		}

		const tabContainer = event.target.closest('tab-container');
		if (!tabContainer || !(tabContainer instanceof TabContainerElement)) {
			return;
		}

		const tabs = Array.from(
			tabContainer.querySelectorAll<HTMLButtonElement>('[data-segmented-control]')
		);
		const currentTabIndex = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');

		if (target.dataset.segmentedControlNav === 'previous') {
			const newTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;
			tabContainer.selectTab(newTabIndex);
		} else if (target.dataset.segmentedControlNav === 'next') {
			const newTabIndex = (currentTabIndex + 1) % tabs.length;
			tabContainer.selectTab(newTabIndex);
		}
	});
}

function initSegmentedControlChangeListener() {
	window.addEventListener('tab-container-change', event => {
		if (event instanceof TabContainerChangeEvent) {
			if (event.tab) {
				(event.tab as HTMLElement).scrollIntoView({
					behavior: 'auto',
					block: 'nearest',
					inline: 'center'
				});
			}
		}
	});
}
