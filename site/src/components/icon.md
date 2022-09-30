---
title: Icon
description: The Icon component in the Atlas Design System
template: standard
classType: Component
classPrefixes:
  - icon
---

# Icon

The main purpose of the icon class to ensure correct spacing of icons within other elements and to reserve visual space for yet-to-load icon fonts.

```html
<button class="button">
	<span>Text</span>
	<span class="icon border"></span>
</button>
<button class="button">
	<span class="icon border"></span>
	<span>Text</span>
</button>
```

## Usage

The most common use case for this is within a button.

### Sizing

The icon elements sizing is `em` based, so it should scale with automatically.

```html
<button class="button button-lg">
	<span>A large button</span>
	<span class="icon border"></span>
</button>
<button class="button">
	<span>Default button</span>
	<span class="icon border"></span>
</button>
<button class="button button-sm">
	<span>A small button</span>
	<span class="icon border"></span>
</button>
```

### SVG compatibility

SVG elements can also be placed within an Icon element.

```html
<button class="button">
	<span>Text</span>
	<svg
		class="icon"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		version="1.1"
		id="Layer_1"
		x="0px"
		y="0px"
		viewBox="0 0 121.12 122.88"
		xml:space="preserve"
	>
		<g>
			<path
				d="M9.61,114.81c3.99,4.34,12.59,2.3,23.22-3.61c-9.67-6.54-17.2-15.98-21.36-27.08C5.18,96.93,3.53,108.18,9.61,114.81 L9.61,114.81z M110.6,31.4c4.88-9.62,6.38-17.43,2.66-21.51c-5.71-6.25-16.44-4.79-28.96,1.33C94.95,15.2,104.09,22.3,110.6,31.4 L110.6,31.4z M64.51,7.67c3.96,0,7.83,0.41,11.56,1.18c17.19-9.68,32.87-12.5,41.58-2.97c5.6,6.13,3.67,17.02-2.89,29.78l0-0.01 l-0.03,0.07c-0.21,0.41-0.42,0.81-0.64,1.23l0.05,0.1c-14.06,31.09-41.39,57.46-73.32,76.33l-2.11,1.32l-0.05-0.03 c-14.46,8.49-26.94,11.28-33.45,4.19c-8.83-9.62-5.73-25.63,3.9-42.84C8.32,72.22,7.9,68.3,7.9,64.28 C7.9,33.01,33.24,7.67,64.51,7.67L64.51,7.67z M118.62,47.6c1.62,5.27,2.5,10.87,2.5,16.68c0,31.26-25.34,56.61-56.61,56.61 c-5.86,0-11.51-0.89-16.82-2.54c31.51-18.76,55.43-42.16,70.92-70.72l0,0L118.62,47.6L118.62,47.6z"
			/>
		</g>
	</svg>
</button>
```
