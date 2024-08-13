---
title: Textarea
description: The textarea component in the Atlas Design System
template: standard
figmaEmbed: https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuVA2amRR71yJZ0GS6RI6zL%2F%25F0%259F%258C%259E-Atlas-Design-Library%3Fnode-id%3D506%253A1176
classType: Component
classPrefixes:
  - textarea
---

# Textarea

Textarea element represents a multi-line plain-text editing control.

| Class       | Default                                                          | Disabled                                                                   |
| ----------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `.textarea` | <textarea class="textarea" placeholder="Placeholder"></textarea> | <textarea class="textarea" placeholder="Placeholder" disabled ></textarea> |

```abut-html
<textarea class="textarea" placeholder="Placeholder"></textarea>
```

## Usage

Here is an example of a standard textarea usage paired with a label.

```html
<label class="label margin-bottom-xxs" for="textarea-demo">Label</label>
<textarea class="textarea" id="textarea-demo" placeholder="Placeholder"></textarea>
```

### Sizes

`textarea-fixed-height` disables the ability to resize the textarea component in browser.

```html
<textarea class="textarea textarea-fixed-height" placeholder="Placeholder"></textarea>
```

### Validation states

`textarea-danger`/`textarea-success` helps with visual reflection of validation states.

| State   | Class                         | Example                                                                           |
| ------- | ----------------------------- | --------------------------------------------------------------------------------- |
| Danger  | `.textarea .textarea-danger`  | <textarea class="textarea textarea-danger" placeholder="Placeholder"></textarea>  |
| Success | `.textarea .textarea-success` | <textarea class="textarea textarea-success" placeholder="Placeholder"></textarea> |

```abut-html
<textarea class="textarea textarea-danger" placeholder="Placeholder"></textarea>
```

## Textarea with footer

For some experiences, it might be necessary to render a textarea coupled with other content controls, such as attaching an image or submitting the content of a form. In cases such as this, use an outer `textarea-form` class, with a nested `textarea` and `textarea-form-footer`.

```html
<div class="textarea-form">
	<textarea
		class="textarea"
		rows="3"
		placeholder="Ask a question or describe what you'd like to do"
	></textarea>
	<div class="textarea-form-footer">
		<div class="textarea-form-footer-left">
			<span class="margin-left-xxs color-text-subtle">0 / 500</span>
		</div>
		<div class="textarea-form-footer-right">
			<button class="button button-clear" aria-label="Attach (non functional)">
				<span class="icon font-size-lg">
					<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g>
							<path
								class="fill-current-color"
								d="M4.82841 10.4848L10.4853 4.8279C11.6568 3.65633 13.5563 3.65633 14.7279 4.8279C15.8995 5.99947 15.8995 7.89897 14.7279 9.07054L8.01039 15.7881C7.4246 16.3738 6.47485 16.3738 5.88907 15.7881C5.30328 15.2023 5.30328 14.2525 5.88907 13.6667L11.8995 7.65633C12.0947 7.46106 12.0947 7.14448 11.8995 6.94922C11.7042 6.75396 11.3876 6.75396 11.1924 6.94922L5.18196 12.9596C4.20565 13.9359 4.20565 15.5189 5.18196 16.4952C6.15827 17.4715 7.74118 17.4715 8.71749 16.4952L15.435 9.77765C16.9971 8.21555 16.9971 5.68289 15.435 4.12079C13.8729 2.55869 11.3403 2.55869 9.77815 4.12079L4.1213 9.77765C3.92604 9.97291 3.92604 10.2895 4.1213 10.4848C4.31656 10.68 4.63315 10.68 4.82841 10.4848Z"
							/>
						</g>
					</svg>
				</span>
			</button>
			<span class="textarea-form-footer-divider" aria-hidden="true"></span>
			<button class="button button-clear" aria-label="Send">
				<span class="icon font-size-lg">
					<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
						<path
							class="fill-current-color"
							d="M4.12775 6.9639C3.50837 5.06496 5.48618 3.36055 7.27283 4.2536L42.7565 21.9901C44.4152 22.8192 44.4152 25.1862 42.7565 26.0153L7.27283 43.7518C5.48618 44.6448 3.50837 42.9404 4.12775 41.0415L9.68537 24.0027L4.12775 6.9639ZM11.9073 25.2527L6.68995 41.2482L41.1914 24.0027L6.68995 6.75717L11.9073 22.7527H28.7502C29.4405 22.7527 30.0002 23.3123 30.0002 24.0027C30.0002 24.693 29.4405 25.2527 28.7502 25.2527H11.9073Z"
						/>
					</svg>
				</span>
			</button>
		</div>
	</div>
</div>
```

## Alignment in the footer

The `.textarea-form-footer` has two default child elements, `.textarea-form-footer-right` and `.textarea-form-footer-left`, which align their content as you might expect.

```html
<div class="textarea-form">
	<div class="textarea-form-footer">
		<div class="textarea-form-footer-left">
			<span class="margin-left-xxs color-text-subtle">0 / 500</span>
		</div>
		<div class="textarea-form-footer-right">
			<button class="button button-clear" aria-label="Attach (non functional)">
				<span class="icon font-size-lg">
					<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g>
							<path
								class="fill-current-color"
								d="M4.82841 10.4848L10.4853 4.8279C11.6568 3.65633 13.5563 3.65633 14.7279 4.8279C15.8995 5.99947 15.8995 7.89897 14.7279 9.07054L8.01039 15.7881C7.4246 16.3738 6.47485 16.3738 5.88907 15.7881C5.30328 15.2023 5.30328 14.2525 5.88907 13.6667L11.8995 7.65633C12.0947 7.46106 12.0947 7.14448 11.8995 6.94922C11.7042 6.75396 11.3876 6.75396 11.1924 6.94922L5.18196 12.9596C4.20565 13.9359 4.20565 15.5189 5.18196 16.4952C6.15827 17.4715 7.74118 17.4715 8.71749 16.4952L15.435 9.77765C16.9971 8.21555 16.9971 5.68289 15.435 4.12079C13.8729 2.55869 11.3403 2.55869 9.77815 4.12079L4.1213 9.77765C3.92604 9.97291 3.92604 10.2895 4.1213 10.4848C4.31656 10.68 4.63315 10.68 4.82841 10.4848Z"
							/>
						</g>
					</svg>
				</span>
			</button>
			<span class="textarea-form-footer-divider" aria-hidden="true"></span>
			<button class="button button-clear" aria-label="Send">
				<span class="icon font-size-lg">
					<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
						<path
							class="fill-current-color"
							d="M4.12775 6.9639C3.50837 5.06496 5.48618 3.36055 7.27283 4.2536L42.7565 21.9901C44.4152 22.8192 44.4152 25.1862 42.7565 26.0153L7.27283 43.7518C5.48618 44.6448 3.50837 42.9404 4.12775 41.0415L9.68537 24.0027L4.12775 6.9639ZM11.9073 25.2527L6.68995 41.2482L41.1914 24.0027L6.68995 6.75717L11.9073 22.7527H28.7502C29.4405 22.7527 30.0002 23.3123 30.0002 24.0027C30.0002 24.693 29.4405 25.2527 28.7502 25.2527H11.9073Z"
						/>
					</svg>
				</span>
			</button>
		</div>
	</div>
</div>
```
