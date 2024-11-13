#!/usr/bin/env ts-node

// import { ensureDir, writeFile } from 'fs-extra';

import type { VisualDiffReportManifest } from './compare';
import { screenshotsRoot } from './locations';

const shakespeareSvg = `<svg style="fill: currentColor;" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 512 512" xml:space="preserve" enable-background="new 0 0 511.996 511.996"><path d="M353.6 144.3a50.5 50.5 0 0 0-35.9-12.5c-14.9 0-28.3 4.7-36 12.6a7.9 7.9 0 0 0 11.5 11c3.4-3.7 12-7.9 24.5-7.9 12.6 0 21 4.2 24.5 7.8a7.9 7.9 0 1 0 11.4-11zM230.2 144.4c-7.6-7.9-21-12.6-36-12.6a50.5 50.5 0 0 0-35.8 12.5 7.9 7.9 0 0 0 11.4 11c3.4-3.6 12-7.8 24.5-7.8 12.6 0 21 4.2 24.5 7.8a7.9 7.9 0 0 0 11.2.3c3.1-3 3.2-8 .2-11.2z"/><circle cx="317.7" cy="178.1" r="12.2"/><circle cx="194.3" cy="178.1" r="12.2"/><path d="M291.6 286.7A52 52 0 0 0 259 277c-13.1 0-25.3 3.7-32.5 9.8a7.9 7.9 0 0 0 10.2 12c10.4-8.7 34.1-8.8 44.6 0a7.9 7.9 0 0 0 10.2-12zM360.6 236.6a7.9 7.9 0 0 0-8.6-3.3 90.4 90.4 0 0 1-22.4 3.4c-14.2 0-21-5.3-29.5-12-3.8-3-7.6-6-12.1-8.6v-11.6a29 29 0 0 0-57.9 0v11.6c-4.5 2.6-8.3 5.6-12 8.5-8.6 6.8-15.4 12-29.5 12-6.5 0-13.8-1-22.5-3.3a7.9 7.9 0 0 0-8.2 12.5c.9 1.1 22.1 27.8 52.5 27.8 17.4 0 33.7-8.6 48.7-25.5 15 16.9 31.3 25.5 48.6 25.5 30.4 0 51.7-26.7 52.6-27.8a7.9 7.9 0 0 0 .3-9.2zm-150.2 21.2c-7.3 0-14.1-2.3-20-5.4 18.4-.5 28.5-8.4 37.4-15.3 2.6-2 5.1-4 7.8-5.8 2.5 3.6 5.8 6.5 9.6 8.6-11.2 11.9-22.9 17.9-34.8 17.9zm61.8-43.3c0 7-6 13.2-13.1 13.2-7 0-13.2-6.1-13.2-13.2v-10a13.2 13.2 0 0 1 26.3 0v10zm35.5 43.3c-11.9 0-23.5-6-34.7-18 3.8-2 7-5 9.6-8.5 2.7 1.8 5.2 3.7 7.7 5.8 9 7 19 14.8 37.5 15.3a43 43 0 0 1-20 5.4z"/><path d="M494 352a7.9 7.9 0 1 0-13 8.7 50.7 50.7 0 0 1 5.5 44.9h-96.2l-.4-1.5v-.2c-3.4-10.5-3.2-22 .6-32.5l.2-.4a51 51 0 0 1 69.5-28.3 7.9 7.9 0 1 0 6.8-14.2 66.1 66.1 0 0 0-63.9 3.7 68.2 68.2 0 0 0-29.3-21.3 899.9 899.9 0 0 0 70.6-18.6 8 8 0 0 0 5.6-6.4c.4-3-.9-6-3.4-7.6-.5-.4-5-4-9.7-12.7-4.5-8.4-10-23.3-10.9-46.8a65.2 65.2 0 0 0 6.5-28.4v-4c0-8-2.5-15.4-6.7-21.5-1.2-43.8-19.1-84.9-50.5-115.9-32-31.6-74.4-49-119.3-49-44.9 0-87.3 17.4-119.3 49-31.4 31-49.3 72-50.5 116a37.6 37.6 0 0 0-6.7 21.4v4c0 10 2.3 19.7 6.5 28.4-1 23.5-6.4 38.4-11 46.8a40.7 40.7 0 0 1-9.6 12.7A7.7 7.7 0 0 0 62 286a8 8 0 0 0 5.6 6.4c.3.2 32.2 10.2 70.6 18.6a68.2 68.2 0 0 0-29.3 21.3 66.8 66.8 0 0 0-73 111.6v59.8c0 4.4 3.6 7.9 8 7.9h56.7c.8.3 1.8.5 2.7.5h305.4c1 0 1.9-.2 2.7-.5h56.8c4.3 0 7.9-3.5 7.9-7.9v-59.8a66.7 66.7 0 0 0 18-91.8zm-66.2-71.2c-11 3.2-28.7 8.1-49 12.8.4-.1 1.4-2.7 1.6-3.1 5.9-12.5 10-26 12-39.6v-.4h.2c4.7-2 9.2-4.5 13.3-7.6.7-.5 6.2-4 6-5a99.9 99.9 0 0 0 16 43zm-11-90.4a49.4 49.4 0 0 1-23 41.6V164.3c0-.1 1.3 0 3 .3 13.4 2.3 20 12.5 20 25.8zm-321.5-4a22 22 0 0 1 5-14v-.1l3-3a22 22 0 0 1 7.4-4h.2l1.9-.5h.2l2-.4H118.3v.1l-.2 5.4V232a50 50 0 0 1-22.8-41.6v-4zm-11 94.4 4-6.4C94 264.2 97.9 252 100 238c-.1 1.2 6.8 5.6 7.8 6.3a65.2 65.2 0 0 0 11.7 6.3v.3a139 139 0 0 0 13.6 42.8 918.8 918.8 0 0 1-48.9-12.8zm49.6-49.8v-61c0-24 7.2-48 20.6-67.9a7.9 7.9 0 0 0-2.2-11 7.9 7.9 0 0 0-11 2.2 138.1 138.1 0 0 0-21.5 55.2c-5.8 0-11.4.6-16.8 2.8a153.2 153.2 0 0 1 44.8-91c29-28.7 67.5-44.5 108.2-44.5s79.1 15.8 108.2 44.5c25.1 24.7 40.7 56.6 44.8 91-.1-1-6-1.8-6.7-2-.9-.2-10.1-1-10.1-.8a137.6 137.6 0 0 0-101.8-112l-.1-.1a138 138 0 0 0-127 31.5 7.9 7.9 0 0 0 10.6 11.7 121.8 121.8 0 0 1 171 6.8c38.3 40.8 33.2 93 33.2 144.6 0 65.8-55.7 122.1-122.1 122.1-9.4 0-18.7-1-27.8-3.2A124.5 124.5 0 0 1 133.9 231zM25.5 405.6a51 51 0 1 1 96.7-1.6v.1l-.5 1.5H25.5zm70 90.1H51.6v-43.9c0 2.6 20.6 3.7 21.9 3.7a67 67 0 0 0 21.8-3.7v44zm-10-57.4a50.7 50.7 0 0 1-51-17h78.2a51.3 51.3 0 0 1-27.2 17zm142.3 57.4h-13.4V462a7.9 7.9 0 1 0-15.8 0v34.3h-87.4v-51.9a66.5 66.5 0 0 0 25.1-32.4c17-11 38.4-19.4 62.3-24.5v43.1a7.9 7.9 0 1 0 15.8 0v-46l13.4-1.6v112.8zm-5.4-128.6c-21 2.4-41.9 7-61.6 14.5-7 2.7-13.9 5.7-20.5 9.2.7-.4-.2-7-.3-7.7a67 67 0 0 0-18.8-41c8-10.1 19.5-17 32.1-19a137.7 137.7 0 0 0 76 43.2h.4c-2-.3-5.2.6-7.3.8zm46 128.6h-24.8V381.8a291.4 291.4 0 0 1 24.8 0v114zm14.2-129.4a136.7 136.7 0 0 0 76-43.3c12.7 2.1 24.2 9 32.2 19a66.4 66.4 0 0 0-17 29.9v.3c-.8 3.1-1.4 6.3-1.7 9.5-.1 1-1.2 8.7-.4 9.1a231.8 231.8 0 0 0-89.4-24.4h.3zm15 129.4h-13.4V383c4.5.5 9 1 13.4 1.7v111.1zm103.2.5h-87.4V387.4c23.9 5.1 45.3 13.5 62.3 24.5a66.5 66.5 0 0 0 25.1 32.5v51.8zm59.5-.5h-43.7v-43.9c0 2.7 20.3 3.7 21.8 3.7a67 67 0 0 0 21.9-3.7v44zm14-71a51.9 51.9 0 0 1-35.9 15c-13 0-26-5.3-35.4-14.4-.6-.5-3.1-4-3.7-4h78.2c-.5 0-2.6 3-3.1 3.5z"/></svg>`;

const noEntriesTemplate = `
<div class="padding-md">
	<div class="padding-md border border-radius-lg">
		<div class="display-flex flex-direction-column flex-direction-row-tablet gap-md">
			<div class="image image-128x128" aria-hidden="true">${shakespeareSvg}</div>
			<div>
				<div class="display-flex align-items-center">
					<h2 class="flex-grow-1 font-size-h2 font-weight-semibold">
						<span class="color-success" aria-hidden="true">✓</span>
						<span>
							These builds look the same
						</span>
					</h2>
				</div>
				<p class="margin-top-md font-size-lg">
					Shall I <strong>[instead]</strong> compare thee to a summer’s day?
				</p>
				<p class="margin-top-xs"><a href="https://www.poetryfoundation.org/poems/45087/sonnet-18-shall-i-compare-thee-to-a-summers-day">Sonnet 18</a></p>
			</div>
			</div>
		</div>
	</div>
</div>`;

const tagTemplate = (text: string) =>
	`<span data-hide-on-parent-hover class="position-absolute margin-top-sm font-size-xs opacity-90 top-0 background-color-body color-text font-weight-semibold border padding-inline-xs padding-block-xxs">${text}</span>`;

/**
 * Generate an HTML report from the diff images.
 * @param {string} outDir
 */
export async function generateOutputs(manifest: VisualDiffReportManifest) {
	const entries = manifest.entries();
	const navTemplate = generateNav(manifest);
	let noEntries = true;

	let html = '';
	let combine = '';

	for (const [i, diffInfo] of entries) {
		noEntries = false;
		const { pageName, pageUrl, viewport, theme, source, target, diff, projectInfo } = diffInfo;
		html += `
			<div class="padding-xxs border border-radius-lg margin-bottom-xxs">
				<h2 class="font-size-h3 margin-bottom-sm display-flex justify-content-space-between align-items-center padding-block-xxs">
					<span>${projectInfo} (${viewport.width}x${viewport.height})
					</span>
					<span class="theme-${theme} display-flex padding-xxs border font-size-lg border-radius-lg">
						<span class="border-color-primary border-bottom-lg border-radius">${theme}</span></span>
				</h2>
				<div  class="diff display-flex">
					<a data-parent-hover href=".${source}" title="New" class="flex-grow-1 position-relative margin-right-xxs border">
						${tagTemplate('New')}
					<img alt="source" loading="lazy" src=".${source}">
					</a>
					<a data-parent-hover href=".${target}" title="Old" class="flex-grow-1 position-relative margin-right-xxs border">
						${tagTemplate('Baseline')}
						<img alt="target" loading="lazy" src=".${target}">
					</a>
					<a data-parent-hover href=".${diff}" title="Diff" class="flex-grow-1 position-relative border">
						${tagTemplate('Diff')}
						<img alt="diff" loading="lazy" src=".${diff}">
					</a>
				</div>
			</div>`;

		if (i === manifest.length - 1 || pageUrl !== manifest[i + 1].pageUrl) {
			combine += `
			<li class="margin-bottom-xs">
				<a href="${pageUrl}" class="justify-content-flex-start button-lg button button-primary button-block button-clear font-weight-semibold">
					<span>${pageName}</span>
				</a>
			</li>`;
			await writePage(
				screenshotsRoot,
				pageUrl,
				navTemplate.replace(
					`button-clear"><span>${pageName}`,
					` button-filled active">${pageName}</a>`
				),
				`<h1 class="font-size-h1 margin-bottom-xs font-weight-semibold">${pageName}</h1>\n${html}`
			);
			html = '';
		}
	}

	const combineContainer = `
	<div class="width-500-tablet margin-inline-auto padding-md">
			<h1 class="margin-block-sm font-size-h1">Visual Diff</h1>
			<ul class="padding-xs border padding-bottom-none border-radius-lg">
				${combine}
			</ul>
	</div>
	`;

	const index_html = `
			${noEntries ? noEntriesTemplate : combineContainer}
	`;
	await writePage(screenshotsRoot, 'index.html', '', index_html);
}

function generateNav(entries: VisualDiffReportManifest): string {
	const navItems = entries
		.filter((x, i, a) => a.findIndex(y => y.pageUrl === x.pageUrl) === i)
		.map(
			x =>
				`<li>
					<a href="${x.pageUrl}" class="margin-bottom-xxs justify-content-flex-start button button-block button-primary button-clear"><span>${x.pageName}</span>
					</a>
				</li>`
		)
		.join('\n');

	return `<ul class="toc">${navItems}</ul>`;
}

async function writePage(_directory: string, _filename: string, _toc: string, _content: string) {
	// const location = join(screenshotsRoot, filename);
	// await ensureDir(directory);
	// const html = `
	// 	<!doctype html>
	// 	<html lang="en" class="theme-dark">
	// 	<head>
	// 		<meta charset="utf-8">
	// 		<title>Report</title>
	// 		<style>
	// 			body {
	// 				height: 100vh;
	// 			}
	// 			h1 {
	// 				word-break: break-all;
	// 			}
	// 			.container {
	// 				max-width: 768px;
	// 				margin: 0 auto;
	// 			}
	// 			[data-parent-hover]:hover > [data-hide-on-parent-hover] {
	// 				display: none;
	// 			}
	// 			body {
	// 				grid-template-columns: 250px 1fr;
	// 				grid-template-rows: 100vh;
	// 			}
	// 			.opacity-90 {
	// 				opacity: .9;
	// 			}
	// 			.toc li {
	// 				display: block;
	// 				word-break: break-all;
	// 			}
	// 			img,
	// 			picture {
	// 				display: block;
	// 				width: 100%;
	// 				height: auto;
	// 			}
	// 			h2 {
	// 				position: sticky;
	// 				top: -20px;
	// 				z-index: 2;
	// 				background: var(--theme-body-background);
	// 				padding: 0.5rem;
	// 			}
	// 		</style>
	// 		<script>
	// 			// scroll the active nav link into view and set it focused
	// 			addEventListener('DOMContentLoaded', () => {
	// 				const active = document.querySelector('nav .active')
	// 				if (active) {
	// 					const scrollTop = document.documentElement.scrollTop;
	// 					active.scrollIntoView();
	// 					active.focus();
	// 					document.documentElement.scrollTop = scrollTop;
	// 				}
	// 			});
	// 		</script>
	// 		<script>
	// 			addEventListener('click', e => {
	// 				const target = e.target instanceof HTMLElement && e.target.closest('[data-toggle-nav-display]');
	// 				if (!target) {
	// 					return;
	// 				}
	// 				const nav = document.querySelector('.nav')
	// 				if (nav) {
	// 					nav.classList.toggle('display-none');
	// 				}
	// 			})
	// 		</script>
	// 		<link rel="stylesheet" href="https://unpkg.com/@microsoft/atlas-css/dist/index.css">
	// 	</head>
	// 	<body class="${filename === 'index.html' ? '' : 'display-grid-tablet'}">
	// 			${
	// 				filename === 'index.html'
	// 					? ''
	// 					: `
	// 			<button data-toggle-nav-display style="z-index: 4" class="button button-lg position-fixed top-0 right-0 margin-top-sm margin-right-sm display-none-tablet">☰</button>
	// 			<nav style="z-index: 3" class="nav scroll-vertical padding-xs background-color-body-medium border position-fixed top-0 bottom-0 left-0 right-0 position-relative-tablet display-none display-block-tablet">
	// 				<p class="font-size-lg font-weight-bold margin-block-md margin-top-xxs-tablet margin-bottom-xs-tablet">Pages</p>
	// 				${toc}
	// 			</nav>
	// 			`
	// 			}
	// 		<main class="main scroll-vertical padding-xs flex-grow-1 flew-shrink-1" role="main">${content}</main>
	// 	</body>
	// 	</html>`;
	// await writeFile(location, html);
}
