---
title: Form Validation
description: The Form validation pattern in the Atlas Design System
template: standard
---

Use the form behavior component within a form to ensure accessible form validation. It expands on HTML5 validation.

```html
<form id="question-ask" data-form-type="question" action="#" method="POST" new="" novalidate="">
	<form-behavior
		navigation="follow"
		header-content-type="application/json"
		header-x-docsauth="cookie"
	></form-behavior>
	<div class="field margin-bottom-xs">
		<label class="label margin-none" for="sample-input">
			Input
			<span class="required-indicator" part="required-indicator" aria-hidden="true"></span>
		</label>
		<span id="sample-input-note" class="help margin-bottom-xxs"
			>Sum up your question in a sentence. How would you ask a colleague?</span
		>
		<div class="control">
			<input
				id="sample-input"
				name="title"
				aria-describedby="sample-input-note"
				minlength="10"
				maxlength="255"
				class="input"
				type="text"
				placeholder="e.g., Why is the sky blue?"
				value=""
			/>
		</div>
	</div>
	<div class="field margin-bottom-xs">
		<label class="label margin-none" for="sample-option">
			Select
			<span class="required-indicator" aria-hidden="true"></span>
		</label>
		<span id="question-tags-note" class="help margin-bottom-xxs">
			Select 1 of 3 tags to describe your question.
		</span>
		<div class="control">
			<select id="sample-option" name="tags">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			</select>
		</div>
	</div>
	<div class="field">
		<label class="label margin-none" for="question-tags">
			Tags
			<span class="required-indicator" aria-hidden="true"></span>
		</label>
		<span id="question-tags-note" class="help margin-bottom-xxs">
			Select up to 5 tags to describe your question.
		</span>
		<div class="control">
			<input
				id="question-tags"
				name="tags"
				class="tag-input input"
				aria-describedby="questions-tag-note"
				placeholder="e.g., Azure Active Directory"
				hidden
				aria-hidden="true"
				value=""
				mintags="1"
				maxtags="5"
			/>
			<div class="tag-input-holder border" style="height: 2em;"></div>
			<button class="add-tags-button" type="button">Add tags</button>
		</div>
	</div>
	<div class="field margin-bottom-xs">
		<label class="label margin-none" for="question-body">
			Textarea
			<span class="required-indicator" aria-hidden="true"></span>
		</label>
		<span id="question-body-note" class="help margin-bottom-xxs"> Add more details here. </span>
		<div class="control">
			<textarea id="question-body" name="body" class="textarea" minlength="10" rows="4" cols="30">
Some sample text
            </textarea
			>
		</div>
	</div>

	<div class="field margin-bottom-xs">
		<div class="control">
			<star-rating name="rating-1" required>
				<legend slot="legend">How are we doing?</legend>
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
			<a href="#" id="question-form-cancel" class="button">Cancel</a>
		</div>
	</div>

	<div class="error-container"></div>
</form>
```
