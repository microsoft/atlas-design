// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tokens from '@microsoft/atlas-css/dist/tokens.json';
import type { AtlasTokens } from '@microsoft/atlas-css/dist/tokens';

export const atlasTokens = tokens as AtlasTokens;

export const colorsBlue = [
	{
		color: 'blue100',
		value: '#000a13'
	},
	{
		color: 'blue90',
		value: '#002b4d'
	},
	{
		color: 'blue80',
		value: '#004173'
	},
	{
		color: 'blue70',
		value: '#00579a'
	},
	{
		color: 'blue60',
		value: '#0065b3'
	},
	{
		color: 'blue50',
		value: '#0078d4'
	},
	{
		color: 'blue40',
		value: '#278cda'
	},
	{
		color: 'blue30',
		value: '#75b6e7'
	},
	{
		color: 'blue20',
		value: '#9ccbee'
	},
	{
		color: 'blue10',
		value: '#d7eaf8'
	}
];

const colorsNavy = [
	{
		color: 'navy100',
		value: '#000910'
	},
	{
		color: 'navy90',
		value: '#061329'
	},
	{
		color: 'navy80',
		value: '#14294c'
	},
	{
		color: 'navy70',
		value: '#243a5e'
	},
	{
		color: 'navy60',
		value: '#4a5d7e'
	},
	{
		color: 'navy50',
		value: '#70819f'
	},
	{
		color: 'navy40',
		value: '#899ab5'
	},
	{
		color: 'navy30',
		value: '#a4b2c9'
	},
	{
		color: 'navy20',
		value: '#c1cbdc'
	},
	{
		color: 'navy10',
		value: '#dfe5ee'
	}
];

const colorsGray = [
	{
		color: 'gray120',
		value: '#171717'
	},
	{
		color: 'gray110',
		value: '#2f2f2f'
	},
	{
		color: 'gray100',
		value: '#404040'
	},
	{
		color: 'gray90',
		value: '#505050'
	},
	{
		color: 'gray80',
		value: '#757575'
	},
	{
		color: 'gray70',
		value: '#8e8e8e'
	},
	{
		color: 'gray60',
		value: '#a2a2a2'
	},
	{
		color: 'gray50',
		value: '#bcbcbc'
	},
	{
		color: 'gray40',
		value: '#d2d2d2'
	},
	{
		color: 'gray30',
		value: '#e6e6e6'
	},
	{
		color: 'navy20',
		value: '#f2f2f2'
	},
	{
		color: 'navy10',
		value: '#fafafa'
	}
];

const renderColorsToHTML = (
	colors: Array<{ color: string; value: string }>,
	containerID: string
) => {
	const container = document.getElementById(`${containerID}`);
	if (!container) {
		return console.error(`Could not find container with ID ${containerID}`);
	}
	let colorsDivs = '';
	colors.map(({ color, value }) => {
		return (colorsDivs += `
		<div style="background-color: ${value}; display: inline-block">
			<div class="color-swatch__label">${color}</div>
			<div class="color-swatch__value">${value}</div>
		</div>`);
	});
	return (container.innerHTML = colorsDivs);
};

renderColorsToHTML(colorsBlue, 'blueList');
renderColorsToHTML(colorsNavy, 'navyList');
renderColorsToHTML(colorsGray, 'grayList');
