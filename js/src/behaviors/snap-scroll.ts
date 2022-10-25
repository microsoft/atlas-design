let snapScrollUpdating = false;

/**
 * Snap scroll behaviors to have a smooth transition from one card to another
 */
export function initSnapScroll() {
	// slide card when the button is clicked
	initSnapScrollClickListeners();

	// update when slide scrolls into the view
	const snapScrolls = Array.from(document.querySelectorAll('[data-snap-scroll]')) as HTMLElement[];
	for (const snapScroll of snapScrolls) {
		initSnapScrollScrollListeners(snapScroll);
	}
}

export function initSnapScrollScrollListeners(element: HTMLElement) {
	const slideContainer = element.querySelector('[data-snap-scroll-slides]');
	if (!slideContainer) {
		throw new Error(
			'Your snap scroll element must contain a scrollable element with "data-snap-scroll-slides" attribute.'
		);
	}

	const slides = Array.from(
		slideContainer.querySelectorAll('[data-snap-scroll-slide]')
	) as HTMLAnchorElement[];

	const options = {
		root: slideContainer,
		rootMargin: '0px',
		threshold: 0.8
	};

	const observer = new IntersectionObserver(entries => {
		if (snapScrollUpdating) {
			return;
		}
		if (entries[0].isIntersecting === true) {
			const step = entries[0].target.getAttribute('data-snap-scroll-slide' as string);
			if (!step) {
				throw new Error(
					'The [data-snap-scroll-slide] clicked does not correspond to a [data-snap-scroll-nav-item]'
				);
			}
			const anchor = element.querySelector(
				`[data-snap-scroll-nav-item="${step}"]`
			) as HTMLAnchorElement;
			if (!anchor) {
				throw new Error('Anchor missing from snap scroll container');
			}
			updatePaginationState(element, anchor);
		}
	}, options);
	slides.forEach(slide => observer.observe(slide));
}

function initSnapScrollClickListeners() {
	window.addEventListener('click', (event: Event) => {
		const target =
			event.target instanceof Element &&
			(event.target.closest('[data-snap-scroll-nav-item]') as HTMLAnchorElement);

		if (!target) {
			return;
		}
		const parentElement = target.closest('[data-snap-scroll]') as HTMLElement;
		if (!parentElement) {
			return;
		}

		const snapScrollId = target.dataset.snapScrollNavItem;
		if (!snapScrollId) {
			throw new Error(
				'You need to add a value to the parent of your snap scroll: [data-snap-scroll="id-goes-here")'
			);
		}

		snapScrollUpdating = true;

		event.preventDefault();

		const slide = parentElement.querySelector(
			`[data-snap-scroll-slide="${snapScrollId}"]`
		) as HTMLElement;

		updatePaginationState(parentElement, target);

		slide.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });

		setTimeout(() => (snapScrollUpdating = false), 500);
	});
}

function updatePaginationState(parentElement: HTMLElement, activeAnchor: HTMLAnchorElement) {
	// remove is current from all anchors in this container
	const anchors = Array.from(
		parentElement.querySelectorAll('[data-snap-scroll-nav-item]')
	) as HTMLAnchorElement[];
	for (const a of anchors) {
		a.classList.remove('is-current');
	}
	// add one back
	activeAnchor.classList.add('is-current');
}
