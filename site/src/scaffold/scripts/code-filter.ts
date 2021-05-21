import { debounce } from './debounce';

export function handleCodeFilters() {
	const memory = {};

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
			const id = target.dataset.codeFilterInput;
			const codeElt = document.querySelector(`[data-code-filter-code="${id}"]`);

			if (!id || !codeElt) {
				return;
			}

			// If we haven't save the whole contents of the block, do so.
			memory[id] = memory[id] || codeElt.textContent.split('\n');
			// If set text content to things that match the given term
			let results = memory[id].filter(line => line.toLowerCase().includes(term));

			// Show all if there's no value in the filter
			if (term === '') {
				results = memory[id];
			} else if (results.length === 0) {
				results = ['No results'];
			}

			codeElt.textContent = results.join('\n');
		}, 400)
	);
}
