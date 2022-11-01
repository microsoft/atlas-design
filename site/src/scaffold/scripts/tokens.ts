// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tokens from '@microsoft/atlas-css/dist/tokens.json';
import type { AtlasTokens } from '@microsoft/atlas-css/dist/tokens';

export const atlasTokens = tokens as AtlasTokens;

const palette = atlasTokens.palette.tokens;

const formatColorPalette = (palette: object) => {
	return Object.keys(palette).reduce((acc, key) => {
		const oldKey = key;
		key = key.replace('$palette-', '');
		key = key.replaceAll('-', '') as string;
		acc[key] = palette[oldKey] as string;
		return acc;
	}, {});
};

const filterPaletteForAColor = (color: string, colorPalette: object) => {
	return Object.keys(colorPalette).reduce((acc, key) => {
		if (key.includes(color) && !key.includes('opacity') && !key.includes('high')) {
			acc[key] = colorPalette[key] as string;
		}
		return acc;
	}, {});
};

const renderColorPalleteToHTML = (colors: { [key: string]: string }, containerID: string) => {
	const container = document.getElementById(`${containerID}`);
	if (!container) {
		return console.error(`Could not find container with ID ${containerID}`);
	}
	let colorsDivs = '';
	Object.keys(colors).map(key => {
		const value = colors[key];
		return (colorsDivs += `
		<div style="background-color: ${value}; display: block; width: 120px; height: 70px; color: ${
			key.includes('100') || key.includes('90') || key.includes('80') ? 'white' : 'black'
		}" class="border-radius padding-left-xs padding-top-xs margin-xxs">
			<h4 class="color-swatch__label padding-bottom-xxs">${key.toUpperCase()}</h4>
			<p style="font-size: 12px" class="color-swatch__value">${value.toUpperCase()}</p>
		</div>`);
	});
	return (container.innerHTML = colorsDivs);
};

//Format the palette to be more readable
const newColorPalette = formatColorPalette(palette);

//Primary Colors
const blueColorPalette = filterPaletteForAColor('blue', newColorPalette);
const navyColorPalette = filterPaletteForAColor('navy', newColorPalette);
const greyColorPalette = filterPaletteForAColor('grey', newColorPalette);

//Secondary Colors
const turquoiseColorPalette = filterPaletteForAColor('turquoise', newColorPalette);
const yellowColorPalette = filterPaletteForAColor('yellow', newColorPalette);
const greenColorPalette = filterPaletteForAColor('green', newColorPalette);
const redColorPalette = filterPaletteForAColor('red', newColorPalette);
const purpleColorPalette = filterPaletteForAColor('purple', newColorPalette);

//Primary colors
renderColorPalleteToHTML(blueColorPalette, 'blueList');
renderColorPalleteToHTML(navyColorPalette, 'navyList');
renderColorPalleteToHTML(greyColorPalette, 'greyList');

//Secondary colors
renderColorPalleteToHTML(turquoiseColorPalette, 'turquoiseList');
renderColorPalleteToHTML(yellowColorPalette, 'yellowList');
renderColorPalleteToHTML(greenColorPalette, 'greenList');
renderColorPalleteToHTML(redColorPalette, 'redList');
renderColorPalleteToHTML(purpleColorPalette, 'purpleList');
