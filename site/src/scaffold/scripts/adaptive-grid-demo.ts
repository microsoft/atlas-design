const RESIZER_SELECTOR = '[data-adaptive-grid-resizer]';
const INPUT_SELECTOR = '[data-adaptive-grid-resizer-input]';
const OUTPUT_SELECTOR = '[data-adaptive-grid-resizer-output]';
const CLASS_BUTTON_SELECTOR = '[data-adaptive-grid-class]';
const WORKSPACE_SELECTOR = '.adaptive-grid-demo-workspace';
const WIDTH_PROPERTY = '--adaptive-grid-demo-width';
const MIN_PREVIEW_WIDTH = 240;
const CLASS_GROUPS = new Map([
	[
		'columns',
		{
			selector: '.adaptive-grid-demo-preview',
			classes: [
				'adaptive-grid-columns-2',
				'adaptive-grid-columns-2-min-width-600',
				'adaptive-grid-columns-2-min-width-800'
			]
		}
	],
	[
		'gap',
		{
			selector: '.adaptive-grid-content',
			classes: ['gap-none', 'gap-xs', 'gap-lg']
		}
	]
]);

export function initAdaptiveGridDemos() {
	const resizeObserver = new ResizeObserver(entries => {
		for (const entry of entries) {
			const workspace = entry.target;
			const demo = workspace.closest<HTMLElement>(RESIZER_SELECTOR);
			const input = demo?.querySelector<HTMLInputElement>(INPUT_SELECTOR);
			const output = demo?.querySelector<HTMLOutputElement>(OUTPUT_SELECTOR);
			const availableWidth = Math.floor(workspace.getBoundingClientRect().width);

			if (!demo || !input || !output) {
				throw new Error('Misconfigured adaptive grid demo');
			}
			if (availableWidth < 1) {
				continue;
			}

			input.min = String(Math.min(MIN_PREVIEW_WIDTH, availableWidth));
			input.max = String(availableWidth);
			updateDemoWidth(demo, input, output, Math.min(Number(input.value), availableWidth));
		}
	});

	for (const workspace of document.querySelectorAll<HTMLElement>(WORKSPACE_SELECTOR)) {
		resizeObserver.observe(workspace);
	}

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

		updateDemoWidth(demo, input, output, width);
	});

	window.addEventListener('click', event => {
		const button = event.target instanceof Element && event.target.closest(CLASS_BUTTON_SELECTOR);
		if (!(button instanceof HTMLButtonElement)) {
			return;
		}

		const demo = button.closest<HTMLElement>(RESIZER_SELECTOR);
		const groupName = button.dataset.adaptiveGridClassGroup;
		const className = button.dataset.adaptiveGridClass;
		const group = groupName && CLASS_GROUPS.get(groupName);
		const target = group && demo?.querySelector<HTMLElement>(group.selector);

		if (!demo || !groupName || className === undefined || !group || !target) {
			throw new Error('Misconfigured adaptive grid class control');
		}
		if (className && !group.classes.includes(className)) {
			throw new Error('Unsupported adaptive grid demo class');
		}

		target.classList.remove(...group.classes);
		if (className) {
			target.classList.add(className);
		}

		const buttons = demo.querySelectorAll<HTMLButtonElement>(
			`[data-adaptive-grid-class-group="${groupName}"]`
		);
		for (const groupButton of buttons) {
			groupButton.setAttribute(
				'aria-pressed',
				String(groupButton.dataset.adaptiveGridClass === className)
			);
		}
	});
}

function updateDemoWidth(
	demo: HTMLElement,
	input: HTMLInputElement,
	output: HTMLOutputElement,
	width: number
) {
	input.value = String(width);
	demo.style.setProperty(WIDTH_PROPERTY, `${width}px`);
	output.value = `${width}px`;
}
