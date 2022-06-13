export function handleMockFormSubmit() {
	document.querySelectorAll('form')?.forEach(form => {
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			const formData = new FormData(form);
			submitAlert(formData);
			const warningIcon = document.createElement('span');
			warningIcon.classList.add('warning-icon');

			document.querySelectorAll('.form-error-container').forEach(container => {
				container.firstElementChild?.prepend(warningIcon);
			});
		});
	});
}

function submitAlert(formData: FormData) {
	alert(`The form is being submitted, ${JSON.stringify(Object.fromEntries(formData), null, 2)}`);
}
