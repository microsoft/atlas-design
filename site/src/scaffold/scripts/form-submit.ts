export function handleMockFormSubmit() {
	const warningIcon = document.createElement('span');
	warningIcon.classList.add('warning-icon-container');
	warningIcon.setAttribute('data-warning-icon-container', '');
	warningIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13">
			<path d="M7.50781 0.109375C7.23698 0.109375 6.98177 0.182292 6.74219 0.328125C6.5026 0.46875 6.31771 0.658854 6.1875 
			0.898438L0.859375 10.7891C0.739583 11.013 0.679688 11.25 0.679688 11.5C0.679688 11.7031 0.721354 11.8958 0.804688 
			12.0781C0.882812 12.2604 0.989583 12.4193 1.125 12.5547C1.26042 12.6901 1.41927 12.7995 1.60156 12.8828C1.78385 12.9609 
			1.97656 13 2.17969 13H12.8359C13.0391 13 13.2318 12.9609 13.4141 12.8828C13.5911 12.7995 13.75 12.6901 13.8906 
			12.5547C14.026 12.4141 14.1354 12.2552 14.2188 12.0781C14.2969 11.8958 14.3359 11.7031 14.3359 11.5C14.3359 11.25 14.276 
			11.013 14.1562 10.7891L8.82812 0.898438C8.69792 0.658854 8.51302 0.46875 8.27344 0.328125C8.03385 0.182292 7.77865 0.109375 
			7.50781 0.109375ZM7.50781 9.75C7.40885 9.75 7.3151 9.77083 7.22656 9.8125C7.13802 9.85417 7.0599 9.91146 6.99219 
			9.98438C6.91927 10.0521 6.86198 10.1302 6.82031 10.2188C6.77865 10.3073 6.75781 10.401 6.75781 10.5C6.75781 10.599 
			6.77865 10.6927 6.82031 10.7812C6.86198 10.8698 6.91927 10.9505 6.99219 11.0234C7.0599 11.0911 7.13802 11.1458 7.22656 
			11.1875C7.3151 11.2292 7.40885 11.25 7.50781 11.25C7.60677 11.25 7.70052 11.2292 7.78906 11.1875C7.8776 11.1458 7.95833 
			11.0911 8.03125 11.0234C8.09896 10.9505 8.15365 10.8698 8.19531 10.7812C8.23698 10.6927 8.25781 10.599 8.25781 10.5C8.25781 
			10.401 8.23698 10.3073 8.19531 10.2188C8.15365 10.1302 8.09896 10.0521 8.03125 9.98438C7.95833 9.91146 7.8776 9.85417 
			7.78906 9.8125C7.70052 9.77083 7.60677 9.75 7.50781 9.75ZM7.50781 1.10938C7.61198 1.10938 7.70312 1.13802 7.78125 
			1.19531C7.85417 1.2526 7.91927 1.32292 7.97656 1.40625C8.03385 1.48958 8.08333 1.58073 8.125 1.67969C8.16667 1.77344 
			8.20833 1.85677 8.25 1.92969C8.32812 2.08073 8.46094 2.32812 8.64844 2.67188C8.83073 3.01562 9.04948 3.41667 9.30469 
			3.875C9.5599 4.33333 9.83594 4.83333 10.1328 5.375C10.4297 5.91667 10.7266 6.46094 11.0234 7.00781C11.3203 7.55469 
			11.6094 8.08594 11.8906 8.60156C12.1667 9.11719 12.4141 9.58073 12.6328 9.99219C12.8464 10.4036 13.0182 10.7448 13.1484 
			11.0156C13.2734 11.2812 13.3359 11.4427 13.3359 11.5C13.3359 11.6354 13.2865 11.7526 13.1875 11.8516C13.0885 11.9505 
			12.9714 12 12.8359 12H2.17969C2.04427 12 1.92708 11.9505 1.82812 11.8516C1.72917 11.7526 1.67969 11.6354 1.67969 
			11.5C1.83073 11.125 2.0026 10.763 2.19531 10.4141C2.38281 10.0651 2.57031 9.71094 2.75781 9.35156C3.0026 8.89323 3.24479 
			8.4349 3.48438 7.97656C3.71875 7.51302 3.95833 7.05208 4.20312 6.59375C4.45312 6.11979 4.70312 5.65104 4.95312 
			5.1875C5.20312 4.71875 5.45312 4.2474 5.70312 3.77344C5.88542 3.4401 6.06771 3.10938 6.25 2.78125C6.42708 2.44792 
			6.61198 2.11719 6.80469 1.78906C6.84635 1.71615 6.88802 1.64583 6.92969 1.57812C6.97135 1.50521 7.01823 1.4375 7.07031 
			1.375C7.1276 1.30208 7.1901 1.23958 7.25781 1.1875C7.32552 1.13542 7.40885 1.10938 7.50781 1.10938ZM7.00781 
			9H8.00781V4H7.00781V9Z"/>
			</svg>`;

	document.querySelectorAll('form')?.forEach(form => {
		form.addEventListener(
			'form-validating',
			e => {
				e.preventDefault();
				const container = form.querySelector('[data-form-error-container]');
				const warningIconContainer = container?.firstElementChild?.querySelector(
					'[data-warning-icon-container]'
				);

				if (!warningIconContainer) {
					container?.firstElementChild?.prepend(warningIcon);
				}
			},
			{ capture: true }
		);

		form.addEventListener(
			'beforesubmit',
			e => {
				e.preventDefault();

				if (form.hasAttribute('test-async-before-submit')) {
					const customEvent = e as CustomEventInit<{ callback: () => Promise<void> }>;
					if (customEvent.detail) {
						customEvent.detail.callback = async () => {
							await new Promise(resolve => setTimeout(resolve, 3000));
							const formData = new FormData(form);
							populateSubmittedFormData(formData, form);
						};
					}
				} else {
					const formData = new FormData(form);
					populateSubmittedFormData(formData, form);
				}
			},
			{ capture: true }
		);
	});
}

function populateSubmittedFormData(formData: FormData, form: HTMLFormElement) {
	const submittedFormDataExample = form.querySelector('.submitted-form-data-example');
	const dataMessage = `The following data will be submitted: ${JSON.stringify(
		Object.fromEntries(formData),
		null,
		2
	)}`;

	if (submittedFormDataExample?.firstChild) {
		submittedFormDataExample.firstChild.textContent = dataMessage;
	} else {
		const message = document.createElement('p');
		message.classList.add('padding-xs');
		message.textContent = dataMessage;
		submittedFormDataExample?.appendChild(message);
	}
}
