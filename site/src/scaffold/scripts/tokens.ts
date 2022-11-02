// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tokens from '@microsoft/atlas-css/dist/tokens.json';
import type { AtlasTokens } from '@microsoft/atlas-css/dist/tokens';

export const atlasTokens = tokens as AtlasTokens;

const palette = atlasTokens.palette.tokens;

const listOfBlockedColors = [
	'blueblack',
	'bluea',
	'yellowsand',
	'yellowhighcontrast',
	'yellowhighcontrasthover',
	'purplea',
	'purpleb'
];

const formatColorPalette = (palette: Record<string, string>) => {
	return Object.keys(palette).reduce((acc, key) => {
		const oldKey = key;
		key = key.replace('$palette-', '');
		key = key.replaceAll('-', '');
		// generic object injection sink is the error. We know where the data is coming from (atlas tokens).
		//eslint-disable-next-line
		acc[key] = palette[oldKey];
		return acc;
	}, {} as Record<string, string>);
};

const filterPaletteForAColor = (color: string, colorPalette: Record<string, string>) => {
	return Object.keys(colorPalette).reduce((acc, key) => {
		if (key.includes(color) && !key.includes('opacity') && !listOfBlockedColors.includes(key)) {
			// generic object injection sink is the error. We know where the data is coming from (atlas tokens).
			//eslint-disable-next-line
			acc[key] = colorPalette[key];
		}
		return acc;
	}, {} as Record<string, string>);
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
			key.includes('120') ||
			key.includes('110') ||
			key.includes('100') ||
			key.includes('90') ||
			key.includes('80') ||
			key.includes('70') ||
			key.includes('60')
				? 'white'
				: 'black'
		}" class="border-radius padding-left-xs padding-top-xs margin-xxs">
			<h4 class="color-swatch__label padding-bottom-xxs" style="text-transform: capitalize";>${key}</h4>
			<p style="font-size: 12px" class="color-swatch__value">${value.toUpperCase()}</p>
		</div>`);
	});
	return (container.innerHTML = colorsDivs);
};

//Format the palette to be more readable
// console.log('palette', palette);
const newColorPalette = formatColorPalette(palette);
console.log('newColorPalette', newColorPalette);

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
