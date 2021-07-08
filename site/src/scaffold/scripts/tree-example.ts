import {
	createTree,
	TreeNodeAccessor,
	createTreeStatic
} from '@msdocs/scripts/src/components/tree';

interface Article {
	title: string;
	textTitle?: string;
	href?: string;
	children?: Article[];
	newSection?: boolean;
	expanded?: boolean;
	selected?: boolean;
}

class TocNodeAccessor implements TreeNodeAccessor<Article> {
	public hasChildren(node: Article): boolean {
		return node.children && !!node.children.length;
	}

	public children(node: Article): Article[] {
		return node.children;
	}

	public htmlTitle(node: Article): string {
		return node.title;
	}

	public textTitle(node: Article): string {
		return node.textTitle;
	}

	public href(node: Article): string {
		return node.href;
	}

	public isNewSection(node: Article): boolean {
		return node.newSection;
	}

	public isExpanded(node: Article): boolean {
		return node.expanded;
	}

	public isSelected(node: Article): boolean {
		return node.selected;
	}

	public setHtmlAttributes(node: Article, set: (name: string, value: string) => void): void {}
}

export function createTree<TNode>(
	nodes: TNode[],
	accessor: TreeNodeAccessor<TNode>,
	label: string
) {
	return createTreeGeneric(nodes, accessor, label, true);
}

function createTreeGeneric<TNode>(
	nodes: TNode[],
	accessor: TreeNodeAccessor<TNode>,
	label: string,
	supportsCollapsing: boolean
) {
	const tree = document.createElement('ul');
	tree.classList.add('tree');
	tree.setAttribute('role', 'tree');
	tree.setAttribute('aria-label', label);
	tree.setAttribute('data-bi-name', 'tree');
	tree.setAttribute('data-is-collapsible', supportsCollapsing ? 'true' : 'false');

	renderTreeBranch(tree, nodes, accessor);
	resetFocusTarget(tree);
	resetEventListeners(tree, accessor);

	return tree;
}

export function treeExample() {
	const accessor = new TocNodeAccessor();
	const treeContainerPlaceholders = Array.from(document.querySelectorAll('.tree-container'));
	const nodes: Article[] = getNodes();

	for (const placeholder of treeContainerPlaceholders) {
		const tree = createTree(nodes, accessor, 'Azure articles');
		tree.classList.add('is-vertically-scrollable', 'flex-grow-1', 'flex-shrink-1');
		placeholder.appendChild(tree);
	}
	overrideStyling();
}

export function treeStaticExample() {
	const accessor = new TocNodeAccessor();
	const treeContainerPlaceholders = Array.from(document.querySelectorAll('.tree-static-container'));
	const nodes: Article[] = getNodes();

	for (const placeholder of treeContainerPlaceholders) {
		const tree = createTreeStatic(nodes, accessor, 'Azure articles');
		tree.classList.add('is-vertically-scrollable', 'flex-grow-1', 'flex-shrink-1');
		placeholder.appendChild(tree);
	}
	overrideStyling();
}

function getNodes() {
	return [
		{ title: 'Linux VMs Documentation', href: '/index.yml' },
		{
			title: 'Overview',
			newSection: true,
			children: [{ title: 'About Virtual Machines', href: '/overview.md' }]
		},
		{
			title: 'Quickstarts',
			expanded: true,
			children: [
				{ title: 'Create VM - Azure CLI', href: '/quick-create-cli.md' },
				{ title: 'Create VM - Portal', selected: true, href: 'quick-create-portal.md' },
				{ title: 'Create VM - Azure PowerShell', href: 'quick-create-powershell.md' }
			]
		},
		{
			title: 'Multiple Levels #1',
			children: [
				{ title: 'Create VM - Azure CLI', href: '/quick-create-cli.md' },
				{
					title: 'Level #1.1',
					children: [
						{ title: '1.1 - Create VM - Azure CLI', href: '/quick-create-cli.md' },
						{ title: '1.1 - Create VM - Portal', href: 'quick-create-portal.md' },
						{ title: '1.1 - Create VM - Azure PowerShell', href: 'quick-create-powershell.md' }
					]
				},
				{ title: 'Create VM - Portal', href: 'quick-create-portal.md' },

				{
					title: 'Level #1.2',
					children: [
						{ title: '1.2 - Create VM - Azure CLI', href: '/quick-create-cli.md' },
						{ title: '1.2 - Create VM - Portal', href: 'quick-create-portal.md' },
						{ title: '1.2 - Create VM - Azure PowerShell', href: 'quick-create-powershell.md' }
					]
				},
				{ title: 'Create VM - Azure PowerShell', href: 'quick-create-powershell.md' }
			]
		}
	];
}

function overrideStyling() {
	// only doing this to override .content ul li styling
	const treeGroupLiItems = Array.from(document.querySelectorAll('.tree-group li'));
	for (const item of treeGroupLiItems) {
		item.setAttribute('style', 'list-style-type: none');
	}
}
