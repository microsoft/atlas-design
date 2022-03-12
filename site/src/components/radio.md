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
                    		name="b16fe0d7-9dfa-460d-a8c4-8b39cad04240"
                    		value="4"
                            class="radio-dot"
                    	/>
                    	<span class="radio-label-text">50%</span>
                    </label>
				</td>
				<td>
					<label class="radio" title="">
                    	<input
                    		type="radio"
                    		name="b16fe0d7-9dfa-460d-a8c4-8b39cad04240"
                    		value="4"
                            class="radio-dot"
                            disabled
                    	/>
                    	<span class="radio-label-text">70%</span>
                    </label>
				</td>
			</tr>
			<tr>
				<td>Checked</td>
				<td>
					<label class="radio" title="">
                    	<input
                    		type="radio"
                    		name="b16fe0d7-9dfa-460d-a8c4-8b39cad04241"
                    		value="4"
                            class="radio-dot"
                            checked
                    	/>
                    	<span class="radio-label-text">50%</span>
                    </label>
				</td>
				<td>
					<label class="radio" title="">
                    	<input
                    		type="radio"
                    		name="b16fe0d7-9dfa-460d-a8c4-8b39cad04241"
                    		value="4"
                    		class="is-checked radio-dot"
                            disabled
                    	/>
                    	<span class="radio-label-text">70%</span>
                    </label>
				</td>
			</tr>
		</tbody>
	</table>
</div>

## Usage

Here is an example of a group of radio buttons. You can group multiple ratio buttons together within a `fieldset` and `radios` container.
Make sure to use the same value for the `name` attribute within a group of radio buttons.

```html
<fieldset class="field border-none">
	<legend>This legend describes the nature of the selection.</legend>
	<div class="radios">
		<label class="radio">
			<input checked name="question-1" type="radio" class="radio-dot" />
			<span class="radio-label-text">Yes</span>
		</label>
		<label class="radio">
			<input name="question-1" type="radio" class="radio-dot" />
			<span class="radio-label-text">No</span>
		</label>
		<label class="radio">
			<input name="question-1" type="radio" class="radio-dot" />
			<span class="radio-label-text">Maybe</span>
		</label>
	</div>
</fieldset>
```

## Modifiers

### Styles

`is-checked` can be used with `.radio-dot` to create the appearance of a radio button with a checked state, without actually setting the state.

```html
<fieldset class="field border-none">
	<legend>This legend describes the nature of the selection.</legend>
	<div class="radios">
		<label class="radio">
			<input name="question-2" type="radio" class="is-checked radio-dot" />
			<span class="radio-label-text"
				>Reliability metrics are built into organizational objectives for teams managing mission
				critical workloads</span
			>
		</label>
		<label class="radio">
			<input name="question-2" type="radio" class="radio-dot" />
			<span class="radio-label-text"
				>Security metrics are built into organizational objectives for teams managing mission
				critical workloads</span
			>
		</label>
		<label class="radio">
			<input name="question-2" type="radio" class="radio-dot" />
			<span class="radio-label-text"
				>Performance metrics are built into organizational objectives for teams managing mission
				critical workloads</span
			>
		</label>
	</div>
</fieldset>
```

You can add `radios-vertical` to the `radios` container to display a vertical alignment.

```html
<fieldset class="field border-none">
	<legend>This legend describes the nature of the selection.</legend>
	<div class="radios radios-vertical">
		<label class="radio">
			<input name="question-3" type="radio" class="radio-dot" />
			<span class="radio-label-text">Yes</span>
		</label>
		<label class="radio">
			<input name="question-3" type="radio" class="radio-dot" />
			<span class="radio-label-text">No</span>
		</label>
		<label class="radio">
			<input name="question-3" type="radio" class="radio-dot" />
			<span class="radio-label-text">Maybe</span>
		</label>
	</div>
</fieldset>
```
