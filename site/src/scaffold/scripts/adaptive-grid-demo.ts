const RESIZER_SELECTOR = '[data-adaptive-grid-resizer]';
const INPUT_SELECTOR = '[data-adaptive-grid-resizer-input]';
const OUTPUT_SELECTOR = '[data-adaptive-grid-resizer-output]';
const WIDTH_PROPERTY = '--adaptive-grid-demo-width';

export function initAdaptiveGridDemos() {
	window.addEventListener('input', event => {
		const input = event.target instanceof Element && event.target.closest(INPUT_SELECTOR);
		if (!(input instanceof HTMLInputElement)) {
			return;
		}

		const demo = input.closest<HTMLElement>(RESIZER_SELECTOR);
		const output = demo?.querySelector<HTMLOutputElement>(OUTPUT_SELECTOR);
		const width = Number.parseInt(input.value, 10);

		if (!demo || !output || !Number.isFinite(width)) {
			throw new Error('Misconfigured adaptive grid demo');
		}

		demo.style.setProperty(WIDTH_PROPERTY, `${width}px`);
		output.value = `${width}px`;
	});
}
