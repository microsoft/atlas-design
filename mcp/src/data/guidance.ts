/**
 * Static, authoritative guidance on how to compose Atlas pages.
 * Served by the `get_composition_guide` tool and the `atlas://composition` resource.
 * This is hand-maintained source — it is not generated from the site docs.
 */

export interface CompositionStep {
	order: number;
	layer: string;
	what: string;
	examples: string[];
}

/**
 * A structural CSS dependency: markup that only renders correctly when it has a
 * particular ancestor or wrapper. These are easy to miss because the component's
 * own snippet looks complete in isolation but breaks without the dependency.
 */
export interface StructuralDependency {
	/** Component, pattern, or class names this dependency applies to. */
	appliesTo: string[];
	/** What the markup requires (e.g. an ancestor with a given class). */
	requires: string;
	/** Why it is required — the underlying CSS mechanism. */
	reason: string;
	/** How to satisfy the dependency. */
	fix: string;
}

export interface CompositionGuide {
	summary: string;
	approach: string;
	steps: CompositionStep[];
	tips: string[];
	structuralDependencies: StructuralDependency[];
}

export const compositionGuide: CompositionGuide = {
	summary:
		'Build Atlas pages outside-in: lay out the largest structures first, then fill in progressively smaller elements.',
	approach: 'page layout → atomic grid/flex containers → large components → small elements',
	steps: [
		{
			order: 1,
			layer: 'Page layout',
			what: 'If the page needs an overall frame (header, sidebars, content regions), start with the layout component.',
			examples: ['layout']
		},
		{
			order: 2,
			layer: 'Composition containers (atomics)',
			what: 'Arrange and space each region with atomic grid/flex utilities. Compose with utility classes rather than reaching for a component.',
			examples: [
				'display-grid',
				'display-flex',
				'flex-direction-column',
				'gap-md',
				'justify-content-center',
				'align-items-center'
			]
		},
		{
			order: 3,
			layer: 'Large components',
			what: 'Place larger, structural components into the containers.',
			examples: ['card', 'media', 'hero', 'persona']
		},
		{
			order: 4,
			layer: 'Small elements',
			what: 'Fill the components with small, leaf-level elements.',
			examples: ['button', 'input', 'badge', 'icon', 'link-button']
		}
	],
	tips: [
		'Prefer composing layouts from atomics over building bespoke components.',
		'Use get_code_examples to pull canonical HTML for each component, pattern, or atomic as you assemble the page.',
		'Patterns (list_patterns) are ready-made multi-component compositions — start from one when it fits.',
		'Check structuralDependencies before using a component standalone — some snippets render correctly only inside a required ancestor.'
	],
	structuralDependencies: [
		{
			appliesTo: ['hero', 'banner'],
			requires: 'an ancestor element with the `layout` class (the Atlas layout component)',
			reason:
				'These components set `padding-inline: var(--layout-gap)`, but `--layout-gap` is only defined on `.layout`. Without a `.layout` ancestor the variable is unset and the horizontal padding collapses to 0, so the content sits flush against the page edge.',
			fix: 'Wrap the page (or the section) in an element with the `layout` class — e.g. `<html class="layout ...">`, `<body class="layout-body">`, or a `<div class="layout">` wrapper. The layout component defines `--layout-gap`.'
		}
	]
};

/**
 * Return the structural dependencies that apply to a given component, pattern,
 * or atomic name. Used to attach inline warnings to lookups so a model sees the
 * requirement exactly when it fetches the affected component.
 */
export function getStructuralDependencies(name: string): StructuralDependency[] {
	const nameLower = name.toLowerCase();
	return compositionGuide.structuralDependencies.filter(dep =>
		dep.appliesTo.some(target => target.toLowerCase() === nameLower)
	);
}
