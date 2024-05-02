export function handleFullScreenNavButton() {
	addEventListener('fullscreenchange', () => {
		const isFullScreened = !document.fullscreenElement;
		const navContent = document.getElementById('menu-content') as HTMLElement;
		const nav = document.getElementById('menu');
		if (!nav) {
			throw new Error('Need an element with an id of #nav before we can show a mobile menu');
		}
		if (!navContent) {
			throw new Error('Trying to modify classes on #menu-content, which does not exist.');
		}
		const innerNavButton = nav.querySelector('[data-full-screen-nav]') as HTMLElement;
		if (!innerNavButton) {
			throw new Error(
				'Trying to modify classes on nav > [data-full-screen-nav], which does not exist.'
			);
		}
		const headerTrigger = document.querySelector('#header [data-full-screen-nav]') as HTMLElement;
		if (!headerTrigger) {
			throw new Error('Trying to focus #header > [data-full-screen-nav], which does not exist.');
		}
		if (isFullScreened) {
			handleNavCollapse(navContent, nav, innerNavButton, headerTrigger);
		}
	});

	document.addEventListener(
		'fullscreenchange',
		() => {
			const nav = document.getElementById('menu');
			if (!nav) {
				throw new Error('Need an element with an id of #nav before we can show a mobile menu');
			}

			// logic is odd because of timing, this will run after a full screen exits
			const notFullScreen = document.fullscreenElement;
			if (notFullScreen) {
				return;
			}

			const trigger = document.querySelector('[data-full-screen-nav]') as HTMLElement;
			if (!trigger) {
				return;
			}

			const navContent = document.getElementById('menu-content') as HTMLElement;
			if (!navContent) {
				throw new Error('Trying to modify classes on #menu-content, which does not exist.');
			}

			const innerNavButton = nav.querySelector('[data-full-screen-nav]') as HTMLElement;
			if (!innerNavButton) {
				throw new Error(
					'Trying to modify classes on nav > [data-full-screen-nav], which does not exist.'
				);
			}

			handleNavCollapse(navContent, nav, innerNavButton, trigger);
		},
		false
	);

	window.addEventListener('click', (e: MouseEvent) => {
		const trigger =
			e.target instanceof HTMLElement &&
			(e.target.closest('[data-full-screen-nav]') as HTMLElement);
		if (!trigger) {
			return;
		}
		const nav = document.getElementById('menu');
		if (!nav) {
			throw new Error('Need an element with an id of #nav before we can show a mobile menu');
		}

		const navContent = document.getElementById('menu-content') as HTMLElement;
		if (!navContent) {
			throw new Error('Trying to modify classes on #menu-content, which does not exist.');
		}

		const innerNavButton = nav.querySelector('[data-full-screen-nav]') as HTMLElement;
		if (!innerNavButton) {
			throw new Error(
				'Trying to modify classes on nav > [data-full-screen-nav], which does not exist.'
			);
		}

		// logic is odd because of timing, this will run before a full screen is requested
		const isFullScreened = document.fullscreenElement;
		if (isFullScreened) {
			handleNavCollapse(navContent, nav, innerNavButton, trigger);
		} else {
			navContent.classList.remove('display-none');
			navContent.classList.add('padding-inline-lg');
			nav.dataset.isFullScreened = 'true';
			nav.style.overflowX = 'auto';

			void nav.requestFullscreen({ navigationUI: 'show' }).then(() => {
				innerNavButton.classList.remove('display-none');
				innerNavButton.focus();
				innerNavButton.classList.add('burger-expanded');
			});
		}
	});
}

export function handleNavCollapse(
	navContent: HTMLElement,
	nav: HTMLElement,
	innerNavButton: HTMLElement,
	trigger: HTMLElement
) {
	innerNavButton.classList.add('display-none');
	innerNavButton.classList.remove('burger-expanded');
	navContent.classList.add('display-none');
	nav.dataset.isFullScreened = 'false';
	navContent.classList.remove('padding-inline-lg');

	nav.style.cssText = '';
	void document.exitFullscreen().then(() => {
		trigger.focus();
	});
}
