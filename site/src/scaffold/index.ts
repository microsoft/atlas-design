import { html, render } from 'lit-html';

renderToc();

async function renderToc() {
	const data = document.getElementById('toc-data') as HTMLLinkElement;
	const elt = document.getElementById('aside');

	const r = await fetch(data.href);
	const json = await r.json();
	console.log(json);

	render(
		html`
			<div>
				<h2>Pages</h2>
				${renderTocLevel(json, true)}
			</div>
		`,
		elt
	);
}

function renderTocLevel(data: TocItem[], top: boolean = false) {
	return html` <ul style="${!top ? 'padding-left: 2rem' : ''}">
		${data.map(
			item => html`
				<li>${renderTocItem(item)} ${item.children ? renderTocLevel(item.children) : ''}</li>
			`
		)}
	</ul>`;
}

function renderTocItem(item: TocItem) {
	return item.displayName !== '[hide]'
		? html` <a href="${item.href}"> ${item.displayName} </a>`
		: '';
}

export interface TocItem {
	name: string;
	href: string;
	isDirectory: boolean;
	displayName: string;
	children?: TocItem[];
}
