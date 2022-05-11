export function initTagInputs(container: HTMLElement = document.body) {
	const deleteTagLabel = 'Delete {tagName} tag';
	let tagCount = 0;
	container.addEventListener(
		'click',
		(event: Event) => {
			const targetTagContainer =
				event.target instanceof Element &&
				(event.target.closest('div.control')?.querySelector('input.tag-input') as HTMLInputElement);

			const tagHolder = document.querySelector('.tag-input-holder');
			if (!targetTagContainer) {
				return;
			}
			if (!event.target.classList.contains('add-tags-button')) {
				return;
			}

			tagHolder?.classList.add('padding-block-xxs');
			const newTag = document.createElement('div');
			newTag.id = `Tag${tagCount++}`;
			newTag.setAttribute('role', 'listitem');
			newTag.classList.add('tag');
			newTag.style.height = 'auto';
			newTag.classList.add(
				'display-inline-flex',
				'background-color-body-medium',
				'padding-inline-xxs',
				'margin-inline-xxs'
			);
			newTag.innerText = newTag.id;
			targetTagContainer.value += targetTagContainer.value ? `,${newTag.id}` : newTag.id;
			targetTagContainer.dispatchEvent(new Event('change', { bubbles: true }));

			const deleteButton = document.createElement('button');
			deleteButton.classList.add('delete', 'has-inner-focus', 'border-none');
			deleteButton.type = 'button';
			deleteButton.setAttribute(
				'aria-label',
				deleteTagLabel.replace('{tagName}', newTag.innerText)
			);
			deleteButton.innerText = 'X';
			deleteButton.addEventListener('click', e => {
				// make sure the event isn't coming from the parent input!
				if (document.activeElement?.classList.contains('delete')) {
					deleteTag(e, newTag.id);
					targetTagContainer.dispatchEvent(new Event('change', { bubbles: true }));
				}
			});
			newTag.insertAdjacentElement('beforeend', deleteButton);

			if (tagHolder) {
				tagHolder.append(newTag);
			}
		},
		true
	);

	function deleteTag(e: Event, tagId: string) {
		const deleteButton = e.currentTarget as HTMLElement;
		if (!(deleteButton instanceof HTMLButtonElement)) {
			return;
		}
		const input = document.querySelector('input.tag-input') as HTMLInputElement;
		input.value = input.value
			.split(',')
			.filter(s => s !== tagId)
			.join(',');
		input.dispatchEvent(new Event('change', { bubbles: true }));
		deleteButton.parentElement!.remove();
	}
}
