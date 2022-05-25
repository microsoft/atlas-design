---
title: Form Validation
description: The Form validation pattern in the Atlas Design System
template: standard
---

# Form Validation

Use the form behavior component within a form to ensure accessible form validation. Form elements should be contained by `.field` and `.field-section` class.
When the form do not require any edits (i.e the only action is to submit), you can add a `new` attribute to override the validation.

##### Form with edits required

```html
<form
	id="sample-form-complex"
	data-form-type="question"
	action="#"
	method="POST"
	new=""
	novalidate=""
>
	<form-behavior
		navigation="follow"
		header-content-type="application/json"
		header-x-docsauth="cookie"
		data-content-has-changed="Content has changed, please reload the page to get the latest changes."
		data-input-max-length="{inputLabel} cannot be longer than {maxLength} characters."
		data-input-min-length="{inputLabel} must be at least {minLength} characters."
		data-input-required="{inputLabel} is required."
		data-please-fix-these-issues="Please fix these issues:"
		data-there-are-no-edits-to-submit="There are no edits to submit."
		data-we-encountered-an-unexpected-error="We encountered an unexpected error. Please try again later. If this issue continues, please contact site support."
		data-you-must-select-between-min-and-max-tags="You must select between {min} and {max} {tagLabel}."
	></form-behavior>
	<div class="field margin-bottom-xs">
		<label class="label margin-none" for="sample-input">
			Input
			<span class="required-indicator" part="required-indicator" aria-hidden="true"></span>
		</label>
		<span id="sample-input-note" class="help margin-bottom-xxs">Input description</span>
		<div class="control">
			<input
				id="sample-input"
				name="title"
				aria-describedby="sample-input-note"
				minlength="10"
				class="input"
				type="text"
				placeholder="e.g., Why is the sky blue?"
				value=""
				required
			/>
		</div>
	</div>
	<div class="field margin-bottom-xs">
		<label class="label margin-none" for="sample-option">
			Select
			<span class="required-indicator" aria-hidden="true"></span>
		</label>
		<span id="sample-select-note" class="help margin-bottom-xxs"> Select 1 of 3 options. </span>
		<div class="control">
			<select id="sample-option" name="select" class="select">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			</select>
		</div>
	</div>
	<div class="field margin-bottom-xs">
		<label class="label margin-none" for="sample-tags">
			Tags
			<span class="required-indicator" aria-hidden="true"></span>
		</label>
		<span id="sample-tags-note" class="help margin-bottom-xxs"> Select up to 5 tags. </span>
		<div class="control">
			<input
				id="sample-tags"
				name="tags"
				class="tag-input input"
				aria-describedby="sample-tags-note"
				placeholder="e.g., Good"
				hidden
				aria-hidden="true"
				value=""
				mintags="1"
				maxtags="5"
			/>
			<div class="tag-input-holder border margin-bottom-xxs" style="height: 2em;">
				<div class="control">
					<input
						role="combobox"
						maxlength="100"
						id="tag-input"
						class="autocomplete-input input"
						type="text"
						aria-label="Tag selector"
						placeholder="Enter tags..."
						hidden
					/>
				</div>
			</div>
			<button class="add-tags-button" type="button">Add tags</button>
		</div>
	</div>
	<div class="field margin-bottom-xs">
		<label class="label margin-none" for="sample-text-area">
			Textarea
			<span class="required-indicator" aria-hidden="true"></span>
		</label>
		<span id="sample-text-area-note" class="help margin-bottom-xxs">Textarea description</span>
		<div class="control">
			<textarea
				id="sample-text-area"
				name="body"
				class="textarea"
				minlength="10"
				rows="4"
				cols="30"
			>
			</textarea>
		</div>
	</div>

	<div class="field margin-bottom-xs">
		<div class="control">
			<star-rating id="rating-1" name="rating-1" required>
				<legend slot="legend">Star rating</legend>
				<span slot="label-1">Terrible</span>
				<span slot="label-2">Poor</span>
				<span slot="label-3">Fair</span>
				<span slot="label-4">Good</span>
				<span slot="label-5">Great</span>
			</star-rating>
		</div>
	</div>
	<div class="field margin-bottom-xs">
		<div class="control">
			<star-rating id="rating-2" name="rating-2" disabled value="2">
				<legend slot="legend">Star rating disabled</legend>
				<span slot="label-1">Terrible</span>
				<span slot="label-2">Poor</span>
				<span slot="label-3">Fair</span>
				<span slot="label-4">Good</span>
				<span slot="label-5">Great</span>
			</star-rating>
		</div>
	</div>
	<div class="field is-grouped display-flex">
		<div class="control">
			<button type="submit" class="button button-primary button-filled">Submit form</button>
		</div>
		<div class="control">
			<button type="button" class="button">Cancel</button>
		</div>
	</div>
	<div class="error-container"></div>
</form>
```

##### Simple form without edits

```html
<form
	id="sample-form-simple"
	data-form-type="question"
	action="#"
	method="POST"
	new=""
	novalidate=""
>
	<form-behavior
		navigation="reload"
		header-x-docsauth="cookie"
		new
		data-content-has-changed="Content has changed, please reload the page to get the latest changes."
		data-input-max-length="{inputLabel} cannot be longer than {maxLength} characters."
		data-input-min-length="{inputLabel} must be at least {minLength} characters."
		data-input-required="{inputLabel} is required."
		data-please-fix-these-issues="Please fix these issues:"
		data-there-are-no-edits-to-submit="There are no edits to submit."
		data-we-encountered-an-unexpected-error="We encountered an unexpected error. Please try again later. If this issue continues, please contact site support."
		data-you-must-select-between-min-and-max-tags="You must select between {min} and {max} {tagLabel}."
	></form-behavior>
	<div class="field is-grouped display-flex">
		<div class="control">
			<button type="submit" class="button button-primary button-filled">Yes</button>
		</div>
		<div class="control">
			<button type="button" class="button">No</button>
		</div>
	</div>
	<div class="error-container"></div>
</form>
```
