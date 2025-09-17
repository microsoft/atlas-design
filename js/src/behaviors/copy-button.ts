export function initCopyButton() {
	window.addEventListener('click', ({ target }: Event) => {
		const copyButton = target instanceof Element && target.closest('[data-copy-button]');

		if (!copyButton) {
			return;
		}

		const copyText = copyButton.getAttribute('data-copy-text');
		const copyTarget = copyButton.getAttribute('data-copy-target');

		let textToCopy = '';

		if (copyText) {
			textToCopy = copyText;
		} else if (copyTarget) {
			const targetElement = document.querySelector(copyTarget) as
				| HTMLInputElement
				| HTMLTextAreaElement;
			if (targetElement) {
				textToCopy = targetElement.value || targetElement.textContent || '';
			}
		} else {
			// Fallback to current URL if no specific text or target
			textToCopy = window.location.href;
		}

		copyToClipboard(textToCopy, copyButton);
	});
}

async function copyToClipboard(text: string, button: Element) {
	try {
		await navigator.clipboard.writeText(text);
		showCopySuccess(button, text);
	} catch (err) {
		// Fallback for older browsers
		fallbackCopyToClipboard(text, button);
	}
}

function fallbackCopyToClipboard(text: string, button: Element) {
	const textArea = document.createElement('textarea');
	textArea.value = text;
	textArea.style.position = 'fixed';
	textArea.style.left = '-999999px';
	textArea.style.top = '-999999px';
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		const successful = document.execCommand('copy');
		document.body.removeChild(textArea);

		if (successful) {
			showCopySuccess(button, text);
		} else {
			showCopyError(button);
		}
	} catch (err) {
		document.body.removeChild(textArea);
		showCopyError(button);
	}
}

function showCopySuccess(button: Element, copiedText?: string) {
	const originalText = button.querySelector('.copy-button-text')?.textContent;
	const textElement = button.querySelector('.copy-button-text');
	const iconElement = button.querySelector('.copy-button-icon');

	// Add success class
	button.classList.add('copy-button-success');

	// Update text
	if (textElement) {
		textElement.textContent = 'Copied';
	}

	// Update icon to checkmark if icon element exists
	if (iconElement) {
		iconElement.innerHTML = `
			<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
				<path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
			</svg>
		`;
	}

	// Reset after delay
	const resetDelay = parseInt(button.getAttribute('data-copy-reset-delay') || '2000');

	setTimeout(() => {
		button.classList.remove('copy-button-success');

		if (textElement && originalText) {
			textElement.textContent = originalText;
		}

		// Reset icon to copy icon
		if (iconElement) {
			iconElement.innerHTML = `
				<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
					<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
					<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
				</svg>
			`;
		}
	}, resetDelay);

	// Dispatch custom event for analytics or other listeners
	window.dispatchEvent(
		new CustomEvent('copy-success', {
			detail: { text: copiedText || '', button }
		})
	);
}

function showCopyError(button: Element) {
	// Dispatch custom event for error handling
	window.dispatchEvent(
		new CustomEvent('copy-error', {
			detail: { button }
		})
	);

	// You could add visual error feedback here if desired
}
