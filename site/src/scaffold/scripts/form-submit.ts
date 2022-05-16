export function handleMockFormSubmit() {
	document.querySelectorAll('form')?.forEach(form => {
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			const formData = new FormData(form);
			submitAlert(formData);
		});
	});
}

function submitAlert(formData: FormData) {
	alert(`The form is being submitted, ${JSON.stringify(Object.fromEntries(formData), null, 2)}`);
}
