/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as classNames from '@microsoft/atlas-css/dist/class-names.json';
import { ATLAS_DOCS_BASE_URL, getDocsPageForClass } from './get-docs-page-for-class';

interface GeneratedClassData {
	name: string;
	size: { isValid: boolean; value: string };
	color: {
		isValid: boolean;
		/**
		 * Whether the color is static or themed
		 */
		detailType?: string; // but really themed | static | ''
		light?: string;
		dark?: string;
		'high-contrast'?: string;
		universal?: string;
	};
}

export class AtlasClassCompletionItemProvider implements vscode.CompletionItemProvider {
	provideCompletionItems(
		_document: vscode.TextDocument,
		_position: vscode.Position,
		_token: vscode.CancellationToken,
		_context: vscode.CompletionContext
	) {
		const classSnippets = Object.entries(classNames).map(([className, data]) => {
			const item = new vscode.CompletionItem(className);

			item.kind = getItemKind(data);
			item.detail = `@microsoft/atlas-css`;
			item.documentation = getDocumentationMarkdown(data, className);

			return item;
		});

		return {
			items: classSnippets
		};
	}
}

function getDocumentationMarkdown(data: GeneratedClassData, className: string) {
	const documentation = new vscode.MarkdownString(undefined, true);
	documentation.isTrusted = true;
	documentation.supportHtml = true;

	appendColorInfoMarkdown(data, documentation);
	appendSizeInfoMarkdown(data, documentation);
	appendDocumentationLinkMarkdown(className, documentation);

	return documentation;
}

/**
 * Append color related information to the documentation markdown
 * @param data Object representing the class and its traits.
 * @param documentation The resultant markdown string
 */
function appendColorInfoMarkdown(data: GeneratedClassData, documentation: vscode.MarkdownString) {
	const hasColorInfo = data.color?.isValid;
	if (!hasColorInfo) {
		return;
	}

	if (data.color.detailType === 'themed') {
		const { light, dark, 'high-contrast': highContrast } = data.color;

		if (light) {
			documentation.appendMarkdown(`${getSwatch(light)} **Light:** \`${light}\`<br />`);
		}

		if (dark) {
			documentation.appendMarkdown(`${getSwatch(dark)} **Dark:** \`${dark}\`<br />`);
		}

		if (highContrast) {
			documentation.appendMarkdown(
				`${getSwatch(highContrast)} **High Contrast:** \`${highContrast}\`<br /><br />`
			);
		}
	} else if (data.color.detailType === 'static' && data.color.universal) {
		const { universal: staticColor } = data.color;
		documentation.appendMarkdown(`${getSwatch(staticColor)} \`${staticColor}\`<br /><br />`);
	}
}

/**
 * Append size related information to the documentation markdown
 * @param data Object representing the class and its traits.
 * @param documentation The resultant markdown string
 */
function appendSizeInfoMarkdown(data: GeneratedClassData, documentation: vscode.MarkdownString) {
	if (data.size && data.size.isValid) {
		documentation.appendMarkdown(`\`${data.size.value}\` <br /><br />`);
	}
}

/**
 * Some pages have specific links that we can send developers to.
 * The linkages between class and pages and done with class prefixing.
 * @param className The name of the class.
 * @param documentation The resultant markdown string
 */
function appendDocumentationLinkMarkdown(className: string, documentation: vscode.MarkdownString) {
	const specificDocumentationPage = getDocsPageForClass(className);
	if (specificDocumentationPage) {
		documentation.appendMarkdown(
			`$(remote-explorer-documentation) Read up about \`.${className}\` on the [Atlas ${specificDocumentationPage.title} ${specificDocumentationPage.type} documentation](${specificDocumentationPage.href}).`
		);
	} else {
		documentation.appendMarkdown(
			`$(remote-explorer-documentation) Read up about \`.${className}\` on the [Atlas documentation](${ATLAS_DOCS_BASE_URL}).`
		);
	}
}

function getItemKind(data: GeneratedClassData) {
	if (data?.color?.isValid) {
		return vscode.CompletionItemKind.Color;
	}
	//  else if (data?.size?.isValid) { return vscode.CompletionItemKind.Interface; }
	return vscode.CompletionItemKind.Event;
}

/**
 * Generate a Markdown-friendly color swatch
 * @param color Hex code for swatch color
 * @returns Markdown for a swatch image
 */
function getSwatch(color: string) {
	const swatchSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="14" height="14" style="margin-top: 2px"><circle cx="50%" cy="50%" r="35%" style="fill:${color};stroke-width:3;stroke:#BEBEBE;"/></svg>`;
	const encodedSvg = encodeURIComponent(swatchSvg);
	const imageMarkdown = `![${color} swatch](data:image/svg+xml,${encodedSvg})`;
	return imageMarkdown;
}
