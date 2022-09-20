import * as vscode from 'vscode';
import * as classNames from '@microsoft/atlas-css/dist/class-names.json'; // 👋
import * as documentedClassPrefixes from '@microsoft/atlas-site/dist/documented-class-prefixes.json';
import { ATLAS_DOCS_BASE_URL, getDocsPageForClass } from './get-docs-page-for-class';

export function activate(context: vscode.ExtensionContext) {
	const documentSelectors = [
		{ language: 'typescript', scheme: 'file' },
		{ language: 'html', scheme: 'file' },
		{ language: 'plaintext', scheme: 'file' },
		{ language: 'markdown', scheme: 'file' }
	];

	const provider1 = vscode.languages.registerCompletionItemProvider(documentSelectors, {
		provideCompletionItems(
			document: vscode.TextDocument,
			position: vscode.Position,
			token: vscode.CancellationToken,
			context: vscode.CompletionContext
		) {
			// // a simple completion item which inserts `Hello World!`
			// const simpleCompletion = new vscode.CompletionItem('Hello World!');

			// // a completion item that inserts its text as snippet,
			// // the `insertText`-property is a `SnippetString` which will be
			// // honored by the editor.
			// const snippetCompletion = new vscode.CompletionItem('Good part of the day');
			// snippetCompletion.insertText = new vscode.SnippetString(
			// 	'Good ${1|morning,afternoon,evening|}. It is ${1}, right?'
			// );
			// const docs: any = new vscode.MarkdownString(
			// 	'Inserts a snippet that lets you select [link](x.ts).'
			// );
			// snippetCompletion.documentation = docs;
			// docs.baseUri = vscode.Uri.parse('http://example.com/a/b/c/');

			// // a completion item that can be accepted by a commit character,
			// // the `commitCharacters`-property is set which means that the completion will
			// // be inserted and then the character will be typed.
			// const commitCharacterCompletion = new vscode.CompletionItem('console');
			// commitCharacterCompletion.commitCharacters = ['.'];
			// commitCharacterCompletion.documentation = new vscode.MarkdownString(
			// 	'Press `.` to get `console.`'
			// );

			// // a completion item that retriggers IntelliSense when being accepted,
			// // the `command`-property is set which the editor will execute after
			// // completion has been inserted. Also, the `insertText` is set so that
			// // a space is inserted after `new`
			// const commandCompletion = new vscode.CompletionItem('new');
			// commandCompletion.kind = vscode.CompletionItemKind.Keyword;
			// commandCompletion.insertText = 'new ';
			// commandCompletion.command = {
			// 	command: 'editor.action.triggerSuggest',
			// 	title: 'Re-trigger completions...'
			// };

			// return all completion items as array
			// const icons = [
			// 	new vscode.CompletionItem('className:Text', vscode.CompletionItemKind.Text),
			// 	new vscode.CompletionItem('className:Method', vscode.CompletionItemKind.Method),
			// 	new vscode.CompletionItem('className:Function', vscode.CompletionItemKind.Function),
			// 	new vscode.CompletionItem('className:Constructor', vscode.CompletionItemKind.Constructor),
			// 	new vscode.CompletionItem('className:Field', vscode.CompletionItemKind.Field),
			// 	new vscode.CompletionItem('className:Variable', vscode.CompletionItemKind.Variable),
			// 	new vscode.CompletionItem('className:Class', vscode.CompletionItemKind.Class),
			// 	new vscode.CompletionItem('className:Interface', vscode.CompletionItemKind.Interface),
			// 	new vscode.CompletionItem('className:Module', vscode.CompletionItemKind.Module),
			// 	new vscode.CompletionItem('className:Property', vscode.CompletionItemKind.Property),
			// 	new vscode.CompletionItem('className:Unit', vscode.CompletionItemKind.Unit),
			// 	new vscode.CompletionItem('className:Value', vscode.CompletionItemKind.Value),
			// 	new vscode.CompletionItem('className:Enum', vscode.CompletionItemKind.Enum),
			// 	new vscode.CompletionItem('className:Keyword', vscode.CompletionItemKind.Keyword),
			// 	new vscode.CompletionItem('className:Snippet', vscode.CompletionItemKind.Snippet),
			// 	new vscode.CompletionItem('className:Color', vscode.CompletionItemKind.Color),
			// 	new vscode.CompletionItem('className:Reference', vscode.CompletionItemKind.Reference),
			// 	new vscode.CompletionItem('className:File', vscode.CompletionItemKind.File),
			// 	new vscode.CompletionItem('className:Folder', vscode.CompletionItemKind.Folder),
			// 	new vscode.CompletionItem('className:EnumMember', vscode.CompletionItemKind.EnumMember),
			// 	new vscode.CompletionItem('className:Constant', vscode.CompletionItemKind.Constant),
			// 	new vscode.CompletionItem('className:Struct', vscode.CompletionItemKind.Struct),
			// 	new vscode.CompletionItem('className:Event', vscode.CompletionItemKind.Event),
			// 	new vscode.CompletionItem('className:Operator', vscode.CompletionItemKind.Operator),
			// 	new vscode.CompletionItem(
			// 		'className:TypeParameter',
			// 		vscode.CompletionItemKind.TypeParameter
			// 	),
			// 	new vscode.CompletionItem('className:User', vscode.CompletionItemKind.User),
			// 	new vscode.CompletionItem('className:Issue', vscode.CompletionItemKind.Issue)
			// ];
			// 👋
			const classSnippets = classNames.map(className => {
				// https://code.visualstudio.com/api/references/vscode-api#CompletionItemKind
				const item = new vscode.CompletionItem(className, vscode.CompletionItemKind.Event);

				// item.kind = vscode.CompletionItemKind.Class;
				const docsPageForItem = getDocsPageForClass(className);
				if (docsPageForItem) {
					item.documentation = new vscode.MarkdownString(
						`\`${className}\` utility class from the Atlas Design system. Learn more on Atlas's [${docsPageForItem.title} docs](${docsPageForItem.href}).`
					);
				} else {
					item.documentation = new vscode.MarkdownString(
						`\`${className}\` utility class from the Atlas Design system. Learn more on the [Atlas docs](${ATLAS_DOCS_BASE_URL}).`
					);
				}
				item.detail = `@microsoft/atlas-css`;

				return item;
			});

			return [
				// simpleCompletion,
				// snippetCompletion,
				// commitCharacterCompletion,
				// commandCompletion,
				...classSnippets // 👋
			];
		}
	} as vscode.CompletionItemProvider<vscode.CompletionItem>);

	const provider2 = vscode.languages.registerCompletionItemProvider(
		documentSelectors,
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				// get all text until the `position` and check if it reads `console.`
				// and if so then complete if `log`, `warn`, and `error`
				const linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('console.')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem('flog', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('forewarn', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('bearror', vscode.CompletionItemKind.Method)
				];
			}
		},
		'.' // triggered whenever a '.' is being typed
	);

	console.log('providers added');

	context.subscriptions.push(provider1, provider2);
}
