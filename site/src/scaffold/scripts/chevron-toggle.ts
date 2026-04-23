/**
 * Toggles `aria-expanded` on elements with the `data-chevron-toggle` attribute.
 */
export function initChevronToggle(): void {
	document.addEventListener('click', (event: Event) => {
		const trigger = (event.target as HTMLElement)?.closest<HTMLElement>('[data-chevron-toggle]');
		if (!trigger) {
			return;
		}
		const expanded = trigger.getAttribute('aria-expanded') === 'true';
		trigger.setAttribute('aria-expanded', String(!expanded));
	});
}
