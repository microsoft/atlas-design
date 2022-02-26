---
title: Radio
description: The radio component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D838%253A1096"
---

# Radio

A radio button allows users to select a single option.

```html
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
```

### Radios

Separate radio buttons can be grouped together within `radios`.

#### is-large

The `is-large` modifier on the `radios` class provides a larger size.

```html
<fieldset class="field">
	<legend>This legend describes the nature of the selection.</legend>
	<div class="control">
		<div class="radios">
			<label class="radio">
				<input checked name="question-7" type="radio" />
				<span class="radio-background"></span>
				<span class="radio-dot" aria-hidden="true"></span>
				<span class="radio-label-text">Yes</span>
			</label>
			<label class="radio">
				<input name="question-7" type="radio" />
				<span class="radio-background"></span>
				<span class="radio-dot" aria-hidden="true"></span>
				<span class="radio-label-text">No</span>
			</label>
			<label class="radio">
				<input name="question-7" type="radio" />
				<span class="radio-background"></span>
				<span class="radio-dot" aria-hidden="true"></span>
				<span class="radio-label-text">Maybe</span>
			</label>
		</div>
	</div>
</fieldset>
```

#### is-vertical

The `is-vertical` modifier on the `radios` class aligns the radio buttons vertically.

```html
<fieldset class="field">
	<legend>This legend describes the nature of the selection.</legend>
	<div class="control">
		<div class="radios is-vertical">
			<label class="radio">
				<input checked name="question-7" type="radio" />
				<span class="radio-background"></span>
				<span class="radio-dot" aria-hidden="true"></span>
				<span class="radio-label-text">Yes</span>
			</label>
			<label class="radio">
				<input name="question-7" type="radio" />
				<span class="radio-background"></span>
				<span class="radio-dot" aria-hidden="true"></span>
				<span class="radio-label-text">No</span>
			</label>
			<label class="radio">
				<input name="question-7" type="radio" />
				<span class="radio-background"></span>
				<span class="radio-dot" aria-hidden="true"></span>
				<span class="radio-label-text">Maybe</span>
			</label>
		</div>
	</div>
</fieldset>

<fieldset class="field">
	<legend>This legend describes the nature of the selection.</legend>
	<div class="control">
		<div class="radios is-vertical is-large">
			<label class="radio">
				<input checked name="question-7" type="radio" />
				<span class="radio-background"></span>
				<span class="radio-dot" aria-hidden="true"></span>
				<span class="radio-label-text">Yes</span>
			</label>
			<label class="radio">
				<input name="question-7" type="radio" />
				<span class="radio-background"></span>
				<span class="radio-dot" aria-hidden="true"></span>
				<span class="radio-label-text">No</span>
			</label>
			<label class="radio">
				<input name="question-7" type="radio" />
				<span class="radio-background"></span>
				<span class="radio-dot" aria-hidden="true"></span>
				<span class="radio-label-text">Maybe</span>
			</label>
		</div>
	</div>
</fieldset>
```

#### has-image

The `has-images` modifier on the `radios` class is used when the radio is paired with an image. `is-image` is used on the `radio` class and `radio-image` is used on the image. `radio-background` provides a gray background.

```html
<fieldset class="field">
	<legend>This legend describes the nature of the selection.</legend>
	<div class="control">
		<div class="radios has-images">
			<label class="radio is-image">
				<span class="radio-image" aria-hidden="true">
					<img src="https://placeholder.pics/svg/300x300/000000-46199E" />
				</span>
				<input checked name="question-7" type="radio" />
				<span class="radio-background"></span>
				<span class="radio-dot" aria-hidden="true"></span>
				<span class="radio-label-text">Yes</span>
			</label>
			<label class="radio is-image">
				<span class="radio-image" aria-hidden="true">
					<img src="https://placeholder.pics/svg/300x300/000000-46199E" />
				</span>
				<input name="question-7" type="radio" />
				<span class="radio-background"></span>
				<span class="radio-dot" aria-hidden="true"></span>
				<span class="radio-label-text">No</span>
			</label>
			<label class="radio is-image">
				<span class="radio-image" aria-hidden="true">
					<img src="https://placeholder.pics/svg/300x300/000000-46199E" />
				</span>
				<input name="question-7" type="radio" />
				<span class="radio-background"></span>
				<span class="radio-dot" aria-hidden="true"></span>
				<span class="radio-label-text">Maybe</span>
			</label>
			<label class="radio is-image">
				<span class="radio-image" aria-hidden="true">
					<img src="https://placeholder.pics/svg/300x300/000000-46199E" />
				</span>
				<input name="question-7" type="radio" />
				<span class="radio-background"></span>
				<span class="radio-dot" aria-hidden="true"></span>
				<span class="radio-label-text">Disabled</span>
			</label>
			<label class="radio is-image">
				<span class="radio-image" aria-hidden="true">
					<img src="https://placeholder.pics/svg/300x300/000000-46199E" />
				</span>
				<input name="question-7" type="radio" />
				<span class="radio-background"></span>
				<span class="radio-dot" aria-hidden="true"></span>
				<span class="radio-label-text">Disabled</span>
			</label>
			<label class="radio is-image">
				<span class="radio-image" aria-hidden="true">
					<img src="https://placeholder.pics/svg/300x300/000000-46199E" />
				</span>
				<input name="question-7" type="radio" />
				<span class="radio-background"></span>
				<span class="radio-dot" aria-hidden="true"></span>
				<span class="radio-label-text">Disabled</span>
			</label>
		</div>
	</div>
</fieldset>
```
