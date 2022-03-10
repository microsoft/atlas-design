---
title: Radio
description: The radio component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D838%253A1096"
---

# Radio

A radio button allows users to select a single option. It is usually associated with form submissions.

<div class="table-wrapper margin-top-xs">
	<table class="table">
		<thead>
			<tr>
				<th>Type</th>
				<th>Default</th>
				<th>Disabled</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Unchecked</td>
				<td>
					<label class="radio" title="">
                    	<input
                    		type="radio"
                    		id="assessment-choice-b16fe0d7-9dfa-460d-a8c4-8b39cad04240-4"
                    		name="b16fe0d7-9dfa-460d-a8c4-8b39cad04240"
                    		value="4"
                    	/>
                        <span class="radio-dot" aria-hidden="true"></span>
                    	<span class="radio-label-text"><!---->50%<!----></span>
                    </label>
				</td>
				<td>
					<label class="radio" title="">
                    	<input
                    		type="radio"
                    		id="assessment-choice-b16fe0d7-9dfa-460d-a8c4-8b39cad04240-4"
                    		name="b16fe0d7-9dfa-460d-a8c4-8b39cad04240"
                    		value="4"
                            disabled
                    	/>
                        <span class="radio-dot" aria-hidden="true"></span>
                    	<span class="radio-label-text"><!---->70%<!----></span>
                    </label>
				</td>
			</tr>
			<tr>
				<td>Checked</td>
				<td>
					<label class="radio" title="">
                    	<input
                    		type="radio"
                    		id="assessment-choice-b16fe0d7-9dfa-460d-a8c4-8b39cad04240-4"
                    		name="b16fe0d7-9dfa-460d-a8c4-8b39cad04241"
                    		value="4"
                            checked
                    	/>
                        <span class="radio-dot" aria-hidden="true"></span>
                    	<span class="radio-label-text"><!---->50%<!----></span>
                    </label>
				</td>
				<td>
					<label class="radio" title="">
                    	<input
                    		type="radio"
                    		id="assessment-choice-b16fe0d7-9dfa-460d-a8c4-8b39cad04240-4"
                    		name="b16fe0d7-9dfa-460d-a8c4-8b39cad04241"
                    		value="4"
                    		class="is-checked"
                            disabled
                    	/>
                        <span class="radio-dot" aria-hidden="true"></span>
                    	<span class="radio-label-text"><!---->70%<!----></span>
                    </label>
				</td>
			</tr>
		</tbody>
	</table>
</div>

## Usage

Here is an example of a group of radio buttons. You can group multiple ratio buttons together within a `fieldset`.

```html
<fieldset class="field border-none">
	<legend>This legend describes the nature of the selection.</legend>
	<label class="radio">
		<input checked name="question-1" type="radio" />
		<span class="radio-dot" aria-hidden="true"></span>
		<span class="radio-label-text">Yes</span>
	</label>
	<label class="radio">
		<input name="question-1" type="radio" />
		<span class="radio-dot" aria-hidden="true"></span>
		<span class="radio-label-text">No</span>
	</label>
	<label class="radio">
		<input name="question-1" type="radio" />
		<span class="radio-dot" aria-hidden="true"></span>
		<span class="radio-label-text">Maybe</span>
	</label>
</fieldset>
```

## Modifiers

### Styles

`is-checked` can be used with `.radio-dot` to create the appearance of a radio button with a checked state, without actually setting the state.

```html
<fieldset class="field border-none">
	<legend>This legend describes the nature of the selection.</legend>
	<label class="radio">
		<input name="question-2" type="radio" class="is-checked" />
		<span class="radio-dot" aria-hidden="true"></span>
		<span class="radio-label-text"
			>Reliability metrics are built into organizational objectives for teams managing mission
			critical workloads</span
		>
	</label>
	<label class="radio">
		<input name="question-2" type="radio" />
		<span class="radio-dot" aria-hidden="true"></span>
		<span class="radio-label-text"
			>Security metrics are built into organizational objectives for teams managing mission critical
			workloads</span
		>
	</label>
	<label class="radio">
		<input name="question-2" type="radio" />
		<span class="radio-dot" aria-hidden="true"></span>
		<span class="radio-label-text"
			>Performance metrics are built into organizational objectives for teams managing mission
			critical workloads</span
		>
	</label>
</fieldset>
```

You can wrap the radio button group with a container and use flex classes to display a vertical alignment.

```html
<fieldset class="field border-none">
	<legend>This legend describes the nature of the selection.</legend>
	<div class="display-flex flex-direction-column margin-top-xxs">
		<label class="radio">
			<input name="question-2" type="radio" class="margin-bottom-xxs" />
			<span class="radio-dot" aria-hidden="true"></span>
			<span class="radio-label-text">Yes</span>
		</label>
		<label class="radio">
			<input name="question-2" type="radio" class="margin-bottom-xxs" />
			<span class="radio-dot" aria-hidden="true"></span>
			<span class="radio-label-text">No</span>
		</label>
		<label class="radio">
			<input name="question-2" type="radio" />
			<span class="radio-dot" aria-hidden="true"></span>
			<span class="radio-label-text">Maybe</span>
		</label>
	</div>
</fieldset>
```

### Images

https://docs.microsoft.com/en-us/learn/support/troubleshooting#report-feedback
https://ppe.docs.microsoft.com/en-us/learn-sandbox/support/troubleshoot?uid=learn-sandbox.sample-module-2.unit-1&branch=main

### Size

`radio-lg` is used with `radio` to display a larger size.

```html
<fieldset class="field border-none">
	<legend>This legend describes the nature of the selection.</legend>
	<label class="radio radio-lg">
		<input checked name="question-2" type="radio" />
		<span class="radio-dot" aria-hidden="true"></span>
		<span class="radio-label-text">Yes</span>
	</label>
	<label class="radio radio-lg">
		<input name="question-2" type="radio" />
		<span class="radio-dot" aria-hidden="true"></span>
		<span class="radio-label-text">No</span>
	</label>
	<label class="radio radio-lg">
		<input name="question-2" type="radio" />
		<span class="radio-dot" aria-hidden="true"></span>
		<span class="radio-label-text">Maybe</span>
	</label>
</fieldset>
```
