const starRatingTemplate = document.createElement('template');
starRatingTemplate.id = 'star-rating-template';

/* TODO: Consider replacing with constructable stylesheets when there is broader support for Firefox and Safari.
	https://web.dev/custom-elements-v1/
	https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet */

starRatingTemplate.innerHTML = `
<style type="text/css">
	*,
	::before,
	::after {
		box-sizing: border-box;
	}
	
	:host {
		--star-color: var(--theme-primary-active);
	
		display: inline-flex;
	}


	:host([disabled]) {	
		--star-color: var(--theme-text);

		cursor: not-allowed;
	}
	
	fieldset {
		display: contents;
		margin: 0;
		border: none;
		padding-block: 0.75rem;
	}
	
	.star-container {
		display: flex;
	}

	svg {
		fill: none;
		stroke: var(--star-color);
	}

	/* On hover, fill stars as default so that stars prior to hovered/checked star looks filled, then un-fill the following stars */

	.star-container > input:not(.is-selected) ~ label svg,
	.star-container > input + label:hover ~ label svg,
	.star-container > input:checked ~ label svg {
		fill: none;
	}

	.star-container:hover > input + label svg,
	.star-container > input.is-selected + label svg,
	.star-container input:focus-visible:not(:disabled) + label svg {
		fill: var(--star-color);
	}

	fieldset:disabled .star-container:hover input:not(.is-selected) + label svg{ 
		fill: none;
	}
	
	#alert {
		margin-inline-start: 0.5rem;
		line-height: 1;
	}
	
	.star-container > label {
		padding-inline: 0.125em;
	}
	
	[id^="label-"] {
		display: none;
	}
	
	input:focus-visible + label {
		border-radius: 0.5em;
		outline: 3px dashed;
	}
	
	input[value="1"]:checked ~ #alert #label-1,
	input[value="2"]:checked ~ #alert #label-2,
	input[value="3"]:checked ~ #alert #label-3,
	input[value="4"]:checked ~ #alert #label-4,
	input[value="5"]:checked ~ #alert #label-5 {
		display: inline;
	}

	input[value="1"]:focus-visible ~ #alert #label-1,
	input[value="2"]:focus-visible ~ #alert #label-2,
	input[value="3"]:focus-visible ~ #alert #label-3,
	input[value="4"]:focus-visible ~ #alert #label-4,
	input[value="5"]:focus-visible ~ #alert #label-5 {
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
	
	fieldset:disabled span,
	input:disabled + label {
		cursor: not-allowed;
		pointer-events: none;
	}
</style>
<fieldset>
	<legend><slot name="legend" id="legend">Enter rating</slot></legend>

	<div class="star-container">
		<input part="visually-hidden" type="radio" value="1" id="radio-1" />
		<label for="radio-1">
			<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style="overflow: visible" >
				<path id="star" d="M7.1939 2.10167C7.52403 1.43275 8.47789 1.43274 8.80802 2.10167L10.3291 5.18372L13.7304 5.67795C14.4685 5.78522 
					14.7633 6.69239 14.2291 7.21307L11.768 9.61212L12.349 12.9996C12.4751 13.7348 11.7034 14.2955 11.0431 13.9484L8.00096 12.349L4.95879 
					13.9484C4.29853 14.2955 3.52684 13.7348 3.65294 12.9996L4.23394 9.61212L1.77277 7.21307C1.23861 6.69239 1.53336 5.78522 2.27156 
					5.67795L5.67281 5.18372L7.1939 2.10167Z"/>
			</svg>
			<span part="visually-hidden">1<!-- default label, will be replaced by slot content if provided --></span>
		</label>

		<input part="visually-hidden" type="radio" value="2" id="radio-2" />
		<label for="radio-2" >
			<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style="overflow: visible" >
				<use href="#star">
			</svg>
			<span part="visually-hidden">2<!-- default label, will be replaced by slot content if provided --></span>
		</label>

		<input part="visually-hidden" type="radio" value="3" id="radio-3" />
		<label for="radio-3">
			<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style="overflow: visible" >
				<use href="#star">
			</svg>
			<span part="visually-hidden">3<!-- default label, will be replaced by slot content if provided --></span>
		</label>

		<input part="visually-hidden" type="radio" value="4" id="radio-4" />
		<label for="radio-4" >
			<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style="overflow: visible" >
				<use href="#star">
			</svg>
			<span part="visually-hidden">4<!-- default label, will be replaced by slot content if provided --></span>
		</label>

		<input part="visually-hidden" type="radio" value="5" id="radio-5" />
		<label for="radio-5">
			<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style="overflow: visible" >
				<use href="#star">
			</svg>
			<span part="visually-hidden">5<!-- default label, will be replaced by slot content if provided --></span>
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

export class StarRatingElement extends HTMLElement {
	static get observedAttributes() {
		return ['disabled', 'name', 'value'];
	}

	coercedValue = '';

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot?.appendChild(template.content.cloneNode(true));
	}

	get disabled() {
		return this.hasAttribute('disabled');
	}

	set disabled(val) {
		this.setAttribute('disabled', val.toString());
	}

	get name() {
		return this.getAttribute('name') ?? '';
	}

	set name(val) {
		this.setAttribute('name', val);
	}

	get required() {
		return this.hasAttribute('required');
	}

	set required(val) {
		this.setAttribute('required', val.toString());
	}

	get type() {
		return this.localName;
	}

	get value() {
		return this.coercedValue;
	}

	set value(val: string) {
		this.coercedValue = ['', '1', '2', '3', '4', '5'].includes(val) ? val : '';
		const toCheck = this.shadowRoot?.querySelector(
			`[value="${this.coercedValue}"]`
		) as HTMLInputElement;
		if (toCheck) {
			toCheck.checked = true;
		} else {
			const uncheck = this.shadowRoot?.querySelector(':checked') as HTMLInputElement;
			if (uncheck) {
				uncheck.checked = false;
			}
		}
	}

	get valueAsNumber() {
		return parseInt(this.getAttribute('value') ?? '');
	}

	/** TODO: add form related properties (i.e validity, etc */

	connectedCallback() {
		this.shadowRoot?.addEventListener('change', this);
		// arrow function to bind `this` value to star rating in handleFormData
		this.closest('form')?.addEventListener('formdata', this);
		this.shadowRoot?.addEventListener('slotchange', this);
	}

	disconnectedCallback() {
		this.shadowRoot?.removeEventListener('change', this);
		this.closest('form')?.removeEventListener('formdata', this);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			this.updateContent(name, newValue);
		}
	}

	updateContent(name: string, newValue: string) {
		if (name === 'name') {
			this.shadowRoot?.querySelectorAll('input[type="radio"]').forEach(input => {
				input.setAttribute('name', this.name);
			});
		}
		if (name === 'value') {
			this.value = newValue;
			this.updateStarFill(parseInt(newValue));
		}
		if (name === 'disabled') {
			const fieldset = this.shadowRoot?.querySelector('fieldset') as HTMLFieldSetElement;
			fieldset.disabled = newValue !== null;
		}
	}

	handleEvent(event: Event) {
		switch (event.type) {
			case 'change':
				const target = event.target as HTMLInputElement;
				this.updateContent('value', target.value);
				this.dispatchEvent(new Event('change', { bubbles: true }));
				break;
			case 'formdata':
				// https://web.dev/more-capable-form-controls/
				(event as FormDataEvent).formData.append(this.name, this.value.toString());
				break;
			case 'slotchange':
				const slot = event.target as HTMLSlotElement;
				if (!slot.name.startsWith('label-')) {
					break;
				}
				const radioNumber = slot.name.substring(6);
				const label = this.shadowRoot?.querySelector(`[for="radio-${radioNumber}"]`);
				if (label) {
					while (label.firstElementChild !== label.lastElementChild) {
						label.lastElementChild?.remove();
					}
					if (slot.assignedNodes().length) {
						const hiddenSpan = document.createElement('span');
						hiddenSpan.setAttribute('part', 'visually-hidden');
						hiddenSpan.append(
							...Array.from(slot.assignedNodes()).map(node => node.cloneNode(true))
						);
						label.append(hiddenSpan);
					}
				}
				break;
		}
	}

	updateStarFill(newValue: number) {
		const stars = this.shadowRoot!.querySelectorAll('input');
		for (let i = 0; i < 5; i++) {
			if (i < newValue) {
				stars[i].classList.add('is-selected');
			} else {
				stars[i].classList.remove('is-selected');
			}
		}
	}
}

declare global {
	interface Window {
		StarRatingElement: typeof StarRatingElement;
	}
	interface HTMLElementTagNameMap {
		'star-rating': StarRatingElement;
	}
}

if (!window.customElements.get('star-rating')) {
	window.StarRatingElement = StarRatingElement;
	window.customElements.define('star-rating', StarRatingElement);
}
