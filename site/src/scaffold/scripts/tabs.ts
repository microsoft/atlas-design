import { contentLoaded } from './content-loaded';

let activeTabId: string;

export async function handleSiteTabs(container: HTMLElement) {
	const tabIdOnload = new URL(location.href).searchParams.get('active-tab');
	activeTabId = tabIdOnload || 'usage-section';
	window.addEventListener('click', (e: MouseEvent) => {
		const target =
			e.target instanceof HTMLElement && (e.target.closest('.tabs .tab-control') as HTMLElement);
		if (!target) {
			return;
		}

		const targetSectionId = target.getAttribute('aria-controls');

		if (!targetSectionId || targetSectionId === activeTabId) {
			return;
		}

		const groupId = target.dataset.tabControlGroup as string;
		if (!groupId) {
			throw new Error('[data-tab-control-group] missing from tab control');
		}

		resetTabGroup(groupId);
		showTab(container, targetSectionId, target);
		updateURLWithActiveTab();
	});

	await contentLoaded;
	const target = document.querySelector(
		`.tabs .tab-control[aria-controls="${activeTabId}"]`
	) as HTMLElement;
	const groupId = target.dataset.tabControlGroup as string;
	await contentLoaded;
	resetTabGroup(groupId);
	showTab(container, activeTabId, target);
}

function updateURLWithActiveTab() {
	const url = new URL(location.href);
	url.searchParams.delete('active-tab');
	url.searchParams.append('active-tab', activeTabId);
	history.pushState({}, document.title, url);
}

function resetTabGroup(groupId: string) {
	const tabControls: HTMLElement[] = Array.from(
		document.querySelectorAll(`[data-tab-control-group="${groupId}"]`)
	);

	const tabSections: HTMLElement[] = Array.from(
		document.querySelectorAll(`[data-tab-section-group="${groupId}"]`)
	);

	for (const control of tabControls) {
		control.parentElement?.classList.remove('is-active');
		control.setAttribute('aria-selected', 'false');
	}

	for (const section of tabSections) {
		section.hidden = true;
		section.setAttribute('aria-hidden', 'true');
	}
}

function showTab(container: HTMLElement, targetSectionId: string, target: HTMLElement) {
	const targetSection = container.querySelector(`#${targetSectionId}`) as HTMLElement;

	targetSection.hidden = false;
	targetSection.setAttribute('aria-hidden', 'false');

	target.parentElement?.classList.add('is-active');
	target.setAttribute('aria-selected', 'true');
	activeTabId = targetSectionId;
}
