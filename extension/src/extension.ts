import * as vscode from 'vscode';
import { AtlasClassCompletionItemProvider } from './completion-item-provider';

export async function activate(context: vscode.ExtensionContext) {
	const documentSelectors = [
		{ language: 'typescript', scheme: 'file' },
		{ language: 'html', scheme: 'file' },
		{ language: 'plaintext', scheme: 'file' },
		{ language: 'markdown', scheme: 'file' }
	];

	const provider = vscode.languages.registerCompletionItemProvider(
		documentSelectors,
		new AtlasClassCompletionItemProvider()
	);

	context.subscriptions.push(provider);
}
