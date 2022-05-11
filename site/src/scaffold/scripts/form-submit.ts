export function handleMockFormSubmit() {
	document.querySelectorAll('form')?.forEach(form => {
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			submitAlert();
		});
	});
}

function submitAlert() {
	alert('The form is being submitted');
}
