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

export interface CompositionGuide {
	summary: string;
	approach: string;
	steps: CompositionStep[];
	tips: string[];
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
		'Patterns (list_patterns) are ready-made multi-component compositions — start from one when it fits.'
	]
};
