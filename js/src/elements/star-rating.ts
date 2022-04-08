const starRatingTemplate = document.createElement('template');
starRatingTemplate.id = 'star-rating-template';

starRatingTemplate.innerHTML = `
<style>
	*,
	::before, ::after {
		box-sizing: border-box;
	}

	:host {
		display: block;
		--star-color: var(--theme-primary-base);
	}

	:host([readonly]) {
		pointer-events: none;
		cursor: not-allowed;
		--star-color: var(--theme-text);
	}

	#legend-container {
		margin-block: .75rem;
	}

	#input-container {
		display: inline-grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto;
		grid-template-areas: 'star-1 star-2 star-3 star-4 star-5 alert';
	}

	#star-1 {
		grid-area: star-1;
	}
	
	#star-2 {
		grid-area: star-2;
	}

	#star-3 {
		grid-area: star-3;
	}

	#star-4 {
		grid-area: star-4;
	}

	#star-5 {
		grid-area: star-5;
	}

	#alert {
		grid-area: alert;
		display: flex;
		align-items: center;
		margin-inline-start: .5rem;
	}

	.visually-hidden {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	svg {
		fill: none;
		stroke: var(--star-color);
	}

	label {
		border-radius: .5em;
		padding-inline: .125em;
	}
	
	input:checked ~ label > svg,
	input:checked + label > svg,
	label:hover > svg,
	label:hover ~ label > svg {
		fill: var(--star-color);
	}

	[id^="label-"] {
		display: none;
	}

	input:focus-visible + label,
	input.focus-visible + label {
		outline: 3px dashed;
	}

	input[value="1"]:checked ~ #alert #label-1,
	input[value="2"]:checked ~ #alert #label-2,
	input[value="3"]:checked ~ #alert #label-3,
	input[value="4"]:checked ~ #alert #label-4,
	input[value="5"]:checked ~ #alert #label-5 {
		display: inline;
	}

	/* override checked styles with hover styles */
	input:hover ~ #alert [id^="label-"] {
		display: none !important;
	}

	input[value="1"]:hover ~ #alert #label-1,
	input[value="2"]:hover ~ #alert #label-2,
	input[value="3"]:hover ~ #alert #label-3,
	input[value="4"]:hover ~ #alert #label-4,
	input[value="5"]:hover ~ #alert #label-5 {
		display: inline !important;
	}
  </style>

<fieldset>
	<div id="legend-container">
		<slot name="legend" part="legend">Enter rating</slot>
	</div>

	<div id="input-container">
		<input class="visually-hidden" type="radio" value="5" id="radio-5" />
		<label id="star-5" for="radio-5">
			<svg width="24" height="24" style="overflow: visible" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
				<path d="M5.6939 1.1017C6.02403 0.432778 6.97789 0.432774 7.30802 1.1017L8.82911 4.18375L12.2304 4.67798C12.9685 4.78525 13.2633 5.69242 12.7291 6.2131L10.268 8.61215L10.849 11.9997C10.9751 12.7349 10.2034 13.2955 9.54313 12.9484L6.50096 11.349L3.45879 12.9484C2.79853 13.2955 2.02684 12.7349 2.15294 11.9997L2.73394 8.61215L0.272773 6.2131C-0.261391 5.69242 0.0333649 4.78525 0.771565 4.67798L4.17281 4.18375L5.6939 1.1017Z" />
			</svg>
		</label>

		<input class="visually-hidden" type="radio" value="4" id="radio-4" />
		<label id="star-4" for="radio-4">
			<svg width="24" height="24" style="overflow: visible" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
				<path d="M5.6939 1.1017C6.02403 0.432778 6.97789 0.432774 7.30802 1.1017L8.82911 4.18375L12.2304 4.67798C12.9685 4.78525 13.2633 5.69242 12.7291 6.2131L10.268 8.61215L10.849 11.9997C10.9751 12.7349 10.2034 13.2955 9.54313 12.9484L6.50096 11.349L3.45879 12.9484C2.79853 13.2955 2.02684 12.7349 2.15294 11.9997L2.73394 8.61215L0.272773 6.2131C-0.261391 5.69242 0.0333649 4.78525 0.771565 4.67798L4.17281 4.18375L5.6939 1.1017Z" />
			</svg>
		</label>

		<input class="visually-hidden" type="radio" value="3" id="radio-3" />
		<label id="star-3" for="radio-3">
			<svg width="24" height="24" style="overflow: visible" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
				<path d="M5.6939 1.1017C6.02403 0.432778 6.97789 0.432774 7.30802 1.1017L8.82911 4.18375L12.2304 4.67798C12.9685 4.78525 13.2633 5.69242 12.7291 6.2131L10.268 8.61215L10.849 11.9997C10.9751 12.7349 10.2034 13.2955 9.54313 12.9484L6.50096 11.349L3.45879 12.9484C2.79853 13.2955 2.02684 12.7349 2.15294 11.9997L2.73394 8.61215L0.272773 6.2131C-0.261391 5.69242 0.0333649 4.78525 0.771565 4.67798L4.17281 4.18375L5.6939 1.1017Z" />
			</svg>
		</label>

		<input class="visually-hidden" type="radio" value="2" id="radio-2" />
		<label id="star-2" for="radio-2">
			<svg width="24" height="24" style="overflow: visible" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
				<path d="M5.6939 1.1017C6.02403 0.432778 6.97789 0.432774 7.30802 1.1017L8.82911 4.18375L12.2304 4.67798C12.9685 4.78525 13.2633 5.69242 12.7291 6.2131L10.268 8.61215L10.849 11.9997C10.9751 12.7349 10.2034 13.2955 9.54313 12.9484L6.50096 11.349L3.45879 12.9484C2.79853 13.2955 2.02684 12.7349 2.15294 11.9997L2.73394 8.61215L0.272773 6.2131C-0.261391 5.69242 0.0333649 4.78525 0.771565 4.67798L4.17281 4.18375L5.6939 1.1017Z" />
			</svg>
		</label>

		<input class="visually-hidden" type="radio" value="1" id="radio-1" />
		<label id="star-1" for="radio-1">
			<svg width="24" height="24" style="overflow: visible" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
				<path d="M5.6939 1.1017C6.02403 0.432778 6.97789 0.432774 7.30802 1.1017L8.82911 4.18375L12.2304 4.67798C12.9685 4.78525 13.2633 5.69242 12.7291 6.2131L10.268 8.61215L10.849 11.9997C10.9751 12.7349 10.2034 13.2955 9.54313 12.9484L6.50096 11.349L3.45879 12.9484C2.79853 13.2955 2.02684 12.7349 2.15294 11.9997L2.73394 8.61215L0.272773 6.2131C-0.261391 5.69242 0.0333649 4.78525 0.771565 4.67798L4.17281 4.18375L5.6939 1.1017Z" />
			</svg>
		</label>

		<span id="alert">
			<span id="label-1"><slot name="label-1"></slot></span>
			<span id="label-2"><slot name="label-2"></slot></span>
			<span id="label-3"><slot name="label-3"></slot></span>
			<span id="label-4"><slot name="label-4"></slot></span>
			<span id="label-5"><slot name="label-5"></slot></span>
		</span>
	</div>
</fieldset>
`;

const template = starRatingTemplate;

class StarRatingElement extends HTMLElement {
	initialValue: number;
	// internals_: ElementInternals; // not compatable with 'formData'
	public readonly: boolean;
	_validationMessage: string | undefined;
	static formAssociated = true;
	static get observedAttributes() {
		return ['value'];
	}

	constructor() {
		super();
		const clone = document.importNode(template.content, true);
		this.attachShadow({ mode: 'open' });
		this.shadowRoot?.appendChild(clone);

		const inputs = Array.from(this?.shadowRoot?.querySelectorAll('input')) as HTMLInputElement[];
		if (!this.name) {
			throw new Error('StarRatingElement requires a name attribute');
		}
		for (const input of inputs) {
			input.name = this.name;
		}

		// // https://html.spec.whatwg.org/multipage/custom-elements.html 4.13.1.2
		// this.internals_ = this.attachInternals();

		// set initial value
		this.initialValue = parseValue(this.getAttribute('value'));
		if (this.initialValue) {
			const toCheck = this.shadowRoot?.querySelector(
				`input[value="${this.initialValue}"]`
			) as HTMLInputElement;
			if (toCheck) {
				toCheck.checked = true;
				this.setAttribute('aria-activedescendant', toCheck.id);
			}
		}

		this.readonly = this.hasAttribute('readonly');
		if (this.readonly) {
			this.setAttribute('aria-readonly', 'true');
			const inputs = Array.from(
				this.shadowRoot?.querySelectorAll(`input`) || []
			) as HTMLInputElement[];
			for (const input of inputs) {
				input.setAttribute('readonly', 'true');
				input.setAttribute('aria-readonly', 'true');
			}
		}

		// eslint - disable - next - line;
		// focus visible polyfill must explicitly be setup here
		if (window.applyFocusVisiblePolyfill != null) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			window.applyFocusVisiblePolyfill(this.shadowRoot);
		}
	}
	get name() {
		return this.getAttribute('name');
	}
	get type() {
		return this.localName;
	}
	get value() {
		return parseValue(this.shadowRoot?.querySelector('input:checked')?.value);
	}
	set value(value: number) {
		this.setAttribute('value', value.toString());
	}
	get required() {
		return this.hasAttribute('required');
	}

	connectedCallback() {
		this.shadowRoot?.addEventListener('keydown', this);
		this.shadowRoot?.addEventListener('change', this);
		// arrow function to bind `this` value to star rating in handleFormData
		this.closest('form')?.addEventListener('formdata', this);
	}

	disconnectedCallback() {
		this.shadowRoot?.removeEventListener('change', this);
		this.closest('form')?.removeEventListener('formdata', this);
	}

	attributeChangedCallback(/*_name: string, _oldValue: string, _newValue: string*/) {
		if (this.value === 0 || !this.value) {
			const toUncheck = this.shadowRoot?.querySelector(':checked') as HTMLInputElement;
			if (toUncheck) {
				toUncheck.checked = false;
			}
		} else {
			const toCheck = this.shadowRoot?.querySelector(`[value="${this.value}"]`) as HTMLInputElement;
			if (toCheck) {
				toCheck.checked = true;
			}
		}
	}

	handleEvent(event: Event) {
		// the value of `this` is shadowRoot star-rating for keydown and change
		const target = event.target as HTMLInputElement;

		switch (event.type) {
			// Internally, star-rating uses radios, but we're hiyacking keyboard events to invert focus order.
			// Good star highlighting is achieved with reordering, but requires inverted keyboard focusing.
			case 'keydown':
				const { shiftKey, altKey, ctrlKey, code } = event as KeyboardEvent;
				if (shiftKey || altKey || ctrlKey) {
					return;
				}

				if (
					code === 'ArrowDown' ||
					code === 'ArrowUp' ||
					code === 'ArrowLeft' ||
					code === 'ArrowRight'
				) {
					const action = code === 'ArrowDown' || code === 'ArrowRight' ? 1 : -1;
					const currentValue = parseInt((event.target as HTMLInputElement).value);

					let nextValue = currentValue + action;
					if (nextValue < 1) {
						nextValue = 5;
					} else if (nextValue > 5) {
						nextValue = 1;
					}
					target.checked = false;
					const inputToFocus = this.querySelector(
						`input[value="${nextValue}"]`
					) as HTMLInputElement;

					inputToFocus.focus();
					inputToFocus.checked = true;

					// set value here too?

					event.preventDefault();
				}
				break;
			case 'change':
				const starRating = this as StarRatingElement; // type isn't quite right yet
				const value = parseValue(target.value);
				const customEvent = new CustomEvent('star-rating-change', {
					detail: {
						value: parseValue(target.value),
						// eslint-disable-next-line
						name: starRating.host.name
					},
					bubbles: true,
					composed: true
				});
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				starRating.host.value = value;
				window.dispatchEvent(customEvent);
				break;
			case 'formdata':
				if (this.readonly || !this.name) {
					return;
				}
				(event as FormDataEvent).formData.append(this.name, this.value.toString());
		}
	}
}

function parseValue(str: string | null): number {
	return Math.max(0, Math.min(parseInt(str || '0'), 5));
}

customElements.define('star-rating', StarRatingElement);
