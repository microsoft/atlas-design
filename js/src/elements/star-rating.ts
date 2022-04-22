const starRatingTemplate = document.createElement('template');
starRatingTemplate.id = 'star-rating-template';

/* TODO: Consider replacing with constructable stylesheets when there is broader support for Firefox and Safari.
https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet */

starRatingTemplate.innerHTML = `
<style>
	*,
	::before,
	::after {
		box-sizing: border-box;
	}
	
	:host {
		--star-color: var(--theme-primary-active);
	
		display: block;
	}
	
	:host([readonly]) {
		--star-color: var(--theme-text);
	
		cursor: not-allowed;
		pointer-events: none;
	}
	
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		border: 0;
		overflow: hidden;
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(50%);
		word-wrap: normal;
	}
	
	#legend-container {
		margin-block: 0.75rem;
	}
	
	#input-container {
		display: inline-grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto;
		grid-template-areas: 'star-1 star-2 star-3 star-4 star-5 alert';
	}

	svg {
		fill: none;
		stroke: var(--star-color);
	}

	#input-container > input:not(.is-selected) ~ label svg,
	#input-container > input + label:hover ~ label svg,
	#input-container > input:checked ~ label svg {
		fill: none;
	}

	#input-container > input.is-selected + label svg,
	#input-container:hover > input + label svg,
	#input-container:focus-visible > input + label svg {
		fill: var(--star-color);
	}
	
	input:read-only {
		pointer-events: none; 
	}

	input:read-only:not(.is-selected) ~ label svg {
		fill: none;
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
		align-items: start;
		margin-inline-start: 0.5rem;
	}
	
	.visually-hidden {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		position: absolute;
		width: 1px;
		height: 1px;
		white-space: nowrap;
		overflow: hidden;
	}
	
	label {
		border-radius: 0.5em;
		padding-inline: 0.125em;
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
	
	input:disabled + label,
	input[value="1"]:disabled ~ #alert #label-1,
	input[value="2"]:disabled ~ #alert #label-2,
	input[value="3"]:disabled ~ #alert #label-3,
	input[value="4"]:disabled ~ #alert #label-4,
	input[value="5"]:disabled ~ #alert #label-5 {
		opacity: 0.6;
		cursor: not-allowed;
	}

	input[value="1"]:read-only.is-selected + input ~ label svg,
	input[value="2"]:read-only.is-selected + input ~ label svg,
	input[value="3"]:read-only.is-selected + input ~ label svg,
	input[value="4"]:read-only.is-selected + input ~ label svg,
	input[value="5"]:read-only.is-selected + input ~ label svg {
		fill: none;
	}

  </style>

<fieldset>
	<div id="legend-container">
		<slot name="legend" part="legend">Enter rating</slot>
	</div>

	<div id="input-container">
		<input class="star-rating visually-hidden" type="radio" value="1" id="radio-1" />
		<label id="star-1" for="radio-1" class="star">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style="overflow: visible" >
				<path d="M7.1939 2.10167C7.52403 1.43275 8.47789 1.43274 8.80802 2.10167L10.3291 5.18372L13.7304 5.67795C14.4685 5.78522 14.7633 6.69239 14.2291 7.21307L11.768 9.61212L12.349 12.9996C12.4751 13.7348 11.7034 14.2955 11.0431 13.9484L8.00096 12.349L4.95879 13.9484C4.29853 14.2955 3.52684 13.7348 3.65294 12.9996L4.23394 9.61212L1.77277 7.21307C1.23861 6.69239 1.53336 5.78522 2.27156 5.67795L5.67281 5.18372L7.1939 2.10167Z"/>
			</svg>
		</label>

		<input class="star-rating visually-hidden" type="radio" value="2" id="radio-2" />
		<label id="star-2" for="radio-2" class="star">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style="overflow: visible" >
				<path d="M7.1939 2.10167C7.52403 1.43275 8.47789 1.43274 8.80802 2.10167L10.3291 5.18372L13.7304 5.67795C14.4685 5.78522 14.7633 6.69239 14.2291 7.21307L11.768 9.61212L12.349 12.9996C12.4751 13.7348 11.7034 14.2955 11.0431 13.9484L8.00096 12.349L4.95879 13.9484C4.29853 14.2955 3.52684 13.7348 3.65294 12.9996L4.23394 9.61212L1.77277 7.21307C1.23861 6.69239 1.53336 5.78522 2.27156 5.67795L5.67281 5.18372L7.1939 2.10167Z"/>
			</svg>
		</label>

		<input class="star-rating visually-hidden" type="radio" value="3" id="radio-3" />
		<label id="star-3" for="radio-3" class="star">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style="overflow: visible" >
				<path d="M7.1939 2.10167C7.52403 1.43275 8.47789 1.43274 8.80802 2.10167L10.3291 5.18372L13.7304 5.67795C14.4685 5.78522 14.7633 6.69239 14.2291 7.21307L11.768 9.61212L12.349 12.9996C12.4751 13.7348 11.7034 14.2955 11.0431 13.9484L8.00096 12.349L4.95879 13.9484C4.29853 14.2955 3.52684 13.7348 3.65294 12.9996L4.23394 9.61212L1.77277 7.21307C1.23861 6.69239 1.53336 5.78522 2.27156 5.67795L5.67281 5.18372L7.1939 2.10167Z"/>
			</svg>
		</label>

		<input class="star-rating visually-hidden" type="radio" value="4" id="radio-4" />
		<label id="star-4" for="radio-4" class="star">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style="overflow: visible" >
				<path d="M7.1939 2.10167C7.52403 1.43275 8.47789 1.43274 8.80802 2.10167L10.3291 5.18372L13.7304 5.67795C14.4685 5.78522 14.7633 6.69239 14.2291 7.21307L11.768 9.61212L12.349 12.9996C12.4751 13.7348 11.7034 14.2955 11.0431 13.9484L8.00096 12.349L4.95879 13.9484C4.29853 14.2955 3.52684 13.7348 3.65294 12.9996L4.23394 9.61212L1.77277 7.21307C1.23861 6.69239 1.53336 5.78522 2.27156 5.67795L5.67281 5.18372L7.1939 2.10167Z"/>
			</svg>
		</label>

		<input class="star-rating visually-hidden" type="radio" value="5" id="radio-5" />
		<label id="star-5" for="radio-5" class="star">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style="overflow: visible" >
				<path d="M7.1939 2.10167C7.52403 1.43275 8.47789 1.43274 8.80802 2.10167L10.3291 5.18372L13.7304 5.67795C14.4685 5.78522 14.7633 6.69239 14.2291 7.21307L11.768 9.61212L12.349 12.9996C12.4751 13.7348 11.7034 14.2955 11.0431 13.9484L8.00096 12.349L4.95879 13.9484C4.29853 14.2955 3.52684 13.7348 3.65294 12.9996L4.23394 9.61212L1.77277 7.21307C1.23861 6.69239 1.53336 5.78522 2.27156 5.67795L5.67281 5.18372L7.1939 2.10167Z"/>
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
	// internals_: ElementInternals; // not compatible with 'formData'
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

		// focus visible polyfill must explicitly be setup here
		// eslint-disable-next-line
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
		return parseValue((this.shadowRoot?.querySelector('input:checked') as HTMLInputElement)?.value);
	}
	set value(value: number) {
		this.setAttribute('value', value.toString());
	}
	get required() {
		return this.hasAttribute('required');
	}

	connectedCallback() {
		const inputs = Array.from(
			this.shadowRoot?.querySelectorAll('input') ?? []
		) as HTMLInputElement[];

		if (!this.name) {
			throw new Error('StarRatingElement requires a name attribute');
		}
		for (const input of inputs) {
			input.name = this.name;
		}
		this.shadowRoot?.addEventListener('keydown', this);
		this.shadowRoot?.addEventListener('change', this);
		// arrow function to bind `this` value to star rating in handleFormData
		this.closest('form')?.addEventListener('formdata', this);
	}

	disconnectedCallback() {
		this.shadowRoot?.removeEventListener('change', this);
		this.closest('form')?.removeEventListener('formdata', this);
	}

	attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			this.updateContent(newValue);
		}
	}

	updateContent(newValue: string) {
		// element already has new value at this point. Basic html attributes are already set.
		if (newValue === '0' || !newValue) {
			const toUncheck = this.shadowRoot?.querySelector(':checked') as HTMLInputElement;
			if (toUncheck) {
				toUncheck.checked = false;
			}
		} else {
			const stars = this.shadowRoot?.querySelectorAll('input');
			for (let i = 0; i < 5; i++) {
				if (stars) {
					if (i < parseValue(newValue)) {
						stars[i].classList.add('is-selected');
					} else {
						stars[i].classList.remove('is-selected');
					}
				}
			}
			// might be redundant
			const toCheck = this.shadowRoot?.querySelector(`[value="${newValue}"]`) as HTMLInputElement;
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
					const inputToFocus = this.shadowRoot?.querySelector(
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
						name: starRating.name
					},
					bubbles: true,
					composed: true
				});
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				starRating.value = value;
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
