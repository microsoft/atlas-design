# Atlas MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server that gives AI agents and copilots the canonical Atlas HTML they need to **build web pages** — components, page-level patterns, and atomic utilities, served as ready-to-use HTML snippets. Class-name and design-token metadata is included as supporting reference.

## Quick start

Add the server to your MCP client config and it runs on demand via `npx` (no install required):

```json
{
	"mcpServers": {
		"atlas": {
			"command": "npx",
			"args": ["-y", "@microsoft/atlas-mcp"]
		}
	}
}
```

For GitHub Copilot, put this in `.github/copilot-mcp.json`. For Claude Desktop, put it in your `claude_desktop_config.json`.

## Installation

Install globally, or run on demand with `npx`:

```bash
npm install -g @microsoft/atlas-mcp
# or
npx @microsoft/atlas-mcp
```

Contributors building from source, run from the repository root:

```bash
npm install
npm run build -w @microsoft/atlas-mcp
```

## Building a page

Compose outside-in — lay out the largest structures first:

1. **Page layout** — start with the `layout` component if the page needs an overall frame.
2. **Containers** — arrange regions with atomic grid/flex utilities (`display-grid`, `display-flex`, `gap-*`, `justify-content-*`).
3. **Large components** — drop in `card`, `media`, `hero`, and the like.
4. **Small elements** — fill them with `button`, `input`, `badge`, `icon`.

Call `get_composition_guide` (or read `atlas://composition`) for this as structured data, then pull canonical HTML with `get_code_examples` and `list_patterns`.

Some components only render correctly inside a required ancestor (for example, `hero` and `banner` need a `.layout` ancestor to inherit `--layout-gap`, or their horizontal padding collapses). These are reported as a `structuralDependencies` field on `get_composition_guide`, `get_component`, and `get_code_examples` — check it before using a component standalone.

## Tools

Building HTML is the point — reach for the snippet and listing tools first. The class tools are supporting reference.

| Tool                | Description                                                                                                 | Parameters                                                                                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `get_composition_guide` | Get the outside-in guidance for composing a page, including the layering approach and structural dependencies. | none                                                                                                                                                                   |
| `get_code_examples` | Get canonical HTML snippets to build with. Each snippet is tagged with the heading it was documented under. | `name` (required); `type` (optional: `component`, `pattern`, or `atomic`; omit to search all)                                                                              |
| `list_components`   | List all components with their descriptions.                                                                | none                                                                                                                                                                       |
| `list_patterns`     | List page-level patterns — multi-component HTML compositions you can adapt.                                 | none                                                                                                                                                                       |
| `list_atomics`      | List atomic utility classes by category.                                                                    | `category` (optional): one of `spacing`, `color`, `display`, `flex`, `typography`, `border`, `background`, `position`, `size`, `other`; omit for a count of every category |
| `get_component`     | Get a component's description, classes, and HTML examples.                                                  | `name` (required) — e.g. `button`, `card`, `badge`                                                                                                                         |
| `search_classes`    | _(Supporting)_ Search CSS classes by exact name or partial text.                                            | `query` (required); `category` (optional: `component` or `atomic`; omit to search all); `limit` (optional: default 50, max 100)                                            |
| `get_class_details` | _(Supporting)_ Get a class's metadata, including theme colors or size values when they apply.               | `className` (required) — e.g. `color-primary`, `margin-lg`                                                                                                                 |

Example calls:

```js
get_code_examples({ name: 'card', type: 'pattern' });
list_patterns({});
get_component({ name: 'button' });
list_atomics({ category: 'spacing' });
```

## Resources

| URI                  | Contents                                                      |
| -------------------- | ------------------------------------------------------------- |
| `atlas://components` | Component catalog with metadata                               |
| `atlas://patterns`   | Page-level patterns (multi-component HTML compositions)       |
| `atlas://atomics`    | Atomic utility classes organized by category                  |
| `atlas://tokens`     | Design tokens: colors, spacing, typography, shadows, and more |

## Development

```bash
npm run build -w @microsoft/atlas-mcp   # build (generates data, then compiles)
npm run dev -w @microsoft/atlas-mcp     # watch mode
```

The server ships a generated data bundle, `data/atlas-data.json`, built from Atlas's compiled CSS and documentation. It is a build artifact (git-ignored, regenerated by `npm run build:data`), so build before running from source. Generating it needs the CSS outputs, produced from the repository root:

```bash
npm run build:css
npm run build:class-names
```

This produces `css/dist/class-names.json` and `css/dist/tokens.json`, which the build step bundles — together with the HTML examples from `site/src/{components,patterns,atomics}` — into `data/atlas-data.json`.
