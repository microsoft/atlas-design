import * as vscode from 'vscode';
import * as classNames from '@microsoft/atlas-css/dist/class-names.json';
import { ATLAS_DOCS_BASE_URL } from './get-docs-page-for-class';
// import { getDocsPageForClass } from './get-docs-page-for-class';

export class AtlasClassCompletionItemProvider implements vscode.CompletionItemProvider {
	provideCompletionItems(
		_document: vscode.TextDocument,
		_position: vscode.Position,
		_token: vscode.CancellationToken,
		_context: vscode.CompletionContext
	) {
		const classInformation = Object.entries(classNames);

		if (!classNames || classInformation.length === 0) {
			throw new Error(
				'Class name informatio not found. Please update extension or try again later.'
			);
		}

		const classSnippets = classInformation.map(([className, data]) => {
			const item = new vscode.CompletionItem(className, vscode.CompletionItemKind.Event);
			const documentation = new vscode.MarkdownString(undefined, true);
			documentation.isTrusted = true;
			documentation.supportHtml = true; // ideally we'd use this to display colors, but for now just <br>

			// const docsPageForItem = getDocsPageForClass(className);
			// if (docsPageForItem) {
			// 	item.documentation = new vscode.MarkdownString(
			// 		`\`${className}\` utility class from the Atlas Design system. Learn more on Atlas's [${docsPageForItem.title} docs](${docsPageForItem.href}). <br /><br />`
			// 	);
			// } else {
			documentation.appendMarkdown(
				`.\`${className}\` utility class from the Atlas Design system. Learn more on the [Atlas docs](${ATLAS_DOCS_BASE_URL}).<br /><br />`
			);

			// Append color information when available, change icon to color
			if (data.color && data.color.isValid) {
				item.kind = vscode.CompletionItemKind.Color;
				documentation.appendMarkdown(
					`$(circle-large-filled) Light  \`${data.color.light}\` | $(circle-large-outline) Dark  \`${data.color.dark}\` | $(color-mode) High Contrast: \`${data.color['high-contrast']}\``
				);
			}

			item.detail = `@microsoft/atlas-css`;
			item.documentation = documentation;

			return item;
		});

		return {
			items: classSnippets
		};
	}
}
