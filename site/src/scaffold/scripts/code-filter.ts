import { debounce } from './debounce';

export function handleCodeFilters(): void {
	const memory: { [key: string]: string[] } = {};

	window.addEventListener(
		'input',
		debounce.timeout((e: Event) => {
			const target =
				e.target instanceof HTMLInputElement &&
				(e.target.closest('[data-code-filter-input]') as HTMLInputElement);
			if (!target) {
				return;
			}
			const term = target?.value.toLowerCase();
			const id = target.dataset.codeFilterInput as string;
			const codeElt = document.querySelector(`[data-code-filter-code="${id}"]`) as HTMLElement;

			if (!id || !codeElt || !codeElt.textContent) {
				return;
			}

			// If we haven't save the whole contents of the block, do so.
			// eslint-disable-next-line security/detect-object-injection
			memory[id] = memory[id] || codeElt.textContent.split('\n');
			// Set text content to things that match the given term
			// eslint-disable-next-line security/detect-object-injection
			let results = memory[id].filter(line => line.toLowerCase().includes(term));

			// Show all if there's no value in the filter
			if (term === '') {
				// eslint-disable-next-line security/detect-object-injection
				results = memory[id];
			} else if (results.length === 0) {
				results = ['No results'];
			}

			codeElt.textContent = results.join('\n');
		}, 400)
	);
}
