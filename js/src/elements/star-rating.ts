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

	:host([disabled]) {	
		--star-color: var(--theme-text);

		opacity: 0.6;
		cursor: not-allowed;
	}
	
	#legend-container {
		margin-block: 0.75rem;
	}
	
	#input-container {
		display: flex
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
	#input-container input.focus-visible + label svg,
	#input-container input:focus-visible:not(:read-only) + label svg {
		fill: var(--star-color);
	}
	
	input:read-only {
		pointer-events: none; 
	}

	input:read-only:not(.is-selected) ~ label svg {
		fill: none;
	}
	
	#alert {
		display: flex;
		align-items: start;
		margin-inline-start: 0.5rem;
	}
	
	label {
		border-radius: 0.5em;
		padding-inline: 0.125em;
	}
	
	[id^="label-"] {
		display: none;
	}
	
	input:focus-visible + label {
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
		pointer-events: none;
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
		<input class="star-rating" part="visually-hidden" type="radio" value="1" id="radio-1" />
		<label id="star-1" for="radio-1" class="star">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style="overflow: visible" >
				<path d="M7.1939 2.10167C7.52403 1.43275 8.47789 1.43274 8.80802 2.10167L10.3291 5.18372L13.7304 5.67795C14.4685 5.78522 14.7633 6.69239 14.2291 7.21307L11.768 9.61212L12.349 12.9996C12.4751 13.7348 11.7034 14.2955 11.0431 13.9484L8.00096 12.349L4.95879 13.9484C4.29853 14.2955 3.52684 13.7348 3.65294 12.9996L4.23394 9.61212L1.77277 7.21307C1.23861 6.69239 1.53336 5.78522 2.27156 5.67795L5.67281 5.18372L7.1939 2.10167Z"/>
			</svg>
		</label>

		<input class="star-rating" part="visually-hidden" type="radio" value="2" id="radio-2" />
		<label id="star-2" for="radio-2" class="star">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style="overflow: visible" >
				<path d="M7.1939 2.10167C7.52403 1.43275 8.47789 1.43274 8.80802 2.10167L10.3291 5.18372L13.7304 5.67795C14.4685 5.78522 14.7633 6.69239 14.2291 7.21307L11.768 9.61212L12.349 12.9996C12.4751 13.7348 11.7034 14.2955 11.0431 13.9484L8.00096 12.349L4.95879 13.9484C4.29853 14.2955 3.52684 13.7348 3.65294 12.9996L4.23394 9.61212L1.77277 7.21307C1.23861 6.69239 1.53336 5.78522 2.27156 5.67795L5.67281 5.18372L7.1939 2.10167Z"/>
			</svg>
		</label>

		<input class="star-rating" part="visually-hidden" type="radio" value="3" id="radio-3" />
		<label id="star-3" for="radio-3" class="star">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style="overflow: visible" >
				<path d="M7.1939 2.10167C7.52403 1.43275 8.47789 1.43274 8.80802 2.10167L10.3291 5.18372L13.7304 5.67795C14.4685 5.78522 14.7633 6.69239 14.2291 7.21307L11.768 9.61212L12.349 12.9996C12.4751 13.7348 11.7034 14.2955 11.0431 13.9484L8.00096 12.349L4.95879 13.9484C4.29853 14.2955 3.52684 13.7348 3.65294 12.9996L4.23394 9.61212L1.77277 7.21307C1.23861 6.69239 1.53336 5.78522 2.27156 5.67795L5.67281 5.18372L7.1939 2.10167Z"/>
			</svg>
		</label>

		<input class="star-rating" part="visually-hidden" type="radio" value="4" id="radio-4" />
		<label id="star-4" for="radio-4" class="star">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style="overflow: visible" >
				<path d="M7.1939 2.10167C7.52403 1.43275 8.47789 1.43274 8.80802 2.10167L10.3291 5.18372L13.7304 5.67795C14.4685 5.78522 14.7633 6.69239 14.2291 7.21307L11.768 9.61212L12.349 12.9996C12.4751 13.7348 11.7034 14.2955 11.0431 13.9484L8.00096 12.349L4.95879 13.9484C4.29853 14.2955 3.52684 13.7348 3.65294 12.9996L4.23394 9.61212L1.77277 7.21307C1.23861 6.69239 1.53336 5.78522 2.27156 5.67795L5.67281 5.18372L7.1939 2.10167Z"/>
			</svg>
		</label>

		<input class="star-rating" part="visually-hidden" type="radio" value="5" id="radio-5" />
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
	_validationMessage: string | undefined;
	static get observedAttributes() {
		return ['name', 'value', 'disabled'];
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot?.appendChild(template.content.cloneNode(true));
	}

	get name() {
		return this.getAttribute('name') ?? '';
	}

	set name(value) {
		this.setAttribute('name', value);
	}

	get type() {
		return this.localName;
	}

	get value() {
		return Math.max(0, Math.min(parseInt(this.getAttribute('value') || '0'), 5));
	}

	set value(val: number) {
		this.setAttribute('value', val.toString());
	}

	get required() {
		return this.hasAttribute('required');
	}

	get disabled() {
		return this.hasAttribute('disabled');
	}

	set disabled(val) {
		const fieldset = this.shadowRoot?.querySelector('fieldset') as HTMLFieldSetElement;
		fieldset.disabled = val;
		fieldset.querySelectorAll('input').forEach(input => (input.disabled = val));
	}

	get readonly() {
		return this.hasAttribute('readonly');
	}

	set readonly(val) {
		if (val) {
			this.setAttribute('readonly', '');
		} else {
			this.removeAttribute('readonly');
		}
	}

	connectedCallback() {
		/* 	this.shadowRoot?.addEventListener('keydown', this); */
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
			this.updateContent(_name, newValue);
		}
	}

	updateContent(_name: string, newValue: string) {
		if (_name === 'name') {
			this.shadowRoot?.querySelectorAll('input[type="radio"]').forEach(input => {
				input.setAttribute('name', this.name);
			});
		} else if (_name === 'value') {
			const checkedEl = this.shadowRoot?.querySelector(':checked') as HTMLInputElement;
			if (checkedEl && this.value === 0) {
				checkedEl.checked = false;
			}
			const toCheck = this.shadowRoot?.querySelector(`[value="${this.value}"]`) as HTMLInputElement;
			if (toCheck) {
				toCheck.checked = true;
				this.updateStarFill(parseInt(newValue));
			}
		} else if (_name === 'disabled') {
			this.disabled = this.hasAttribute('disabled');
		} else if (_name === 'readonly') {
			this.readonly = this.hasAttribute('readonly');
		}
	}

	handleEvent(event: Event) {
		switch (event.type) {
			case 'change':
				this.setAttribute('value', (event.target as HTMLInputElement).value);
				this.dispatchEvent(new Event('change', { bubbles: true }));
				break;
			case 'formdata':
				// https://web.dev/more-capable-form-controls/
				(event as FormDataEvent).formData.append(this.name, this.value.toString());
				break;
		}
	}

	updateStarFill(newValue: number) {
		const stars = this.shadowRoot?.querySelectorAll('input');
		for (let i = 0; i < 5; i++) {
			if (stars) {
				if (i < newValue) {
					stars[i].classList.add('is-selected');
				} else {
					stars[i].classList.remove('is-selected');
				}
			}
		}
	}
}

function parseValue(str: string | null): number {
	return Math.max(0, Math.min(parseInt(str || '0'), 5));
}

customElements.define('star-rating', StarRatingElement);
