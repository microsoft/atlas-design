import { FormValidationError, defaultMessageStrings } from '../elements/form-behavior';

// Temp hack, can be refactored or removed if/when tags and autocomplete is added to Atlas
export function initTagInputs(container: HTMLElement = document.body) {
	const deleteTagLabel = 'Delete {tagName} tag';
	let tagCount = 0;
	container.addEventListener(
		'click',
		(event: Event) => {
			const targetTagContainer =
				event.target instanceof Element &&
				(event.target
					.closest('div.field-body')
					?.querySelector('input.tag-input') as HTMLInputElement);

			const tagHolder =
				event.target instanceof Element &&
				(event.target
					.closest('div.field-body')
					?.querySelector('.tag-input-holder') as HTMLDivElement);
			if (!targetTagContainer) {
				return;
			}
			if (!event.target.classList.contains('add-tags-button')) {
				return;
			}

			if (tagHolder) {
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
					}
				});
				newTag.insertAdjacentElement('beforeend', deleteButton);
				const tagsHolder = tagHolder?.querySelector('.tags');
				if (tagsHolder) {
					tagsHolder.append(newTag);
				}
			}
		},
		true
	);

	updateTagErrorLink();
}

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

function updateTagErrorLink() {
	document.addEventListener(
		'validationerror',
		(e: CustomEventInit<{ errors: FormValidationError[] }>) => {
			const tagMinMaxError = e.detail?.errors.filter(err => {
				const isTag = err.input.classList.contains('tag-input');
				if (!isTag) {
					return false;
				}

				const min = err.input.getAttribute('min') ?? '';
				const max = err.input.getAttribute('max') ?? '';
				const label =
					err.input.labels && err.input.labels.length
						? err.input.labels[0].textContent
						: err.input.getAttribute('aria-label');

				let tagErrorMessage = defaultMessageStrings.youMustSelectBetweenMinAndMaxTags;
				if (min && max) {
					tagErrorMessage = defaultMessageStrings.youMustSelectBetweenMinAndMaxTags
						.replace('{min}', min)
						.replace('{max}', max)
						.replace('{tagLabel}', label ? label.trim().toLocaleLowerCase() : err.input.name);
				}
				return err.message === tagErrorMessage;
			});

			if (tagMinMaxError && tagMinMaxError.length > 0) {
				const tagInput = tagMinMaxError[0].input.nextElementSibling?.querySelector('.tag-input');

				if (tagInput) {
					const tagInputErrorLink = document.querySelector(
						`a[href="#${tagInput.id}"]`
					) as HTMLAnchorElement;

					const tagHolder = tagMinMaxError[0].input.nextElementSibling?.id;
					tagInputErrorLink.href = `#${tagHolder || tagInputErrorLink.href}`;
				}
			}
		}
	);
}
