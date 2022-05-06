export function initTagInputs(container: HTMLElement = document.body) {
	container.addEventListener(
		'click',
		(event: Event) => {
			const targetTagContainer =
				event.target instanceof Element &&
				(event.target.closest('div.control')?.querySelector('input.tag-input') as HTMLInputElement);
			if (!targetTagContainer) {
				return;
			}

			targetTagContainer.value += 'Tags,';
			const tagHolder = document.querySelector('.tag-input-holder');
			tagHolder?.classList.add('padding-block-xxs');
			const tag = document.createElement('div');
			tag.classList.add('tag');
			tag.style.height = 'auto';
			tag.classList.add(
				'display-inline-flex',
				'background-color-body-medium',
				'padding-inline-xxs',
				'margin-inline-xxs'
			);
			tag.innerText = 'tag';
			if (tagHolder) {
				tagHolder.append(tag);
			}
		},
		true
	);
}
