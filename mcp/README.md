# Atlas MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server that exposes Atlas Design System resources — CSS classes, components, atomic utilities, and design tokens — to AI agents and copilots, so they can discover and apply Atlas correctly in your projects.

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

## Tools

| Tool                | Description                                                                    | Parameters                                                                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `search_classes`    | Search CSS classes by exact name or partial text.                              | `query` (required); `category` (optional: `component` or `atomic`; omit to search all); `limit` (optional: default 50, max 100)                                            |
| `get_component`     | Get a component's description, available classes, and code examples.           | `name` (required) — e.g. `button`, `card`, `badge`                                                                                                                         |
| `get_code_examples` | Get HTML/CSS examples for a component or an atomic category.                   | `name` (required); `type` (optional: `component` or `atomic`; omit to search both)                                                                                         |
| `list_components`   | List all components with their descriptions.                                   | none                                                                                                                                                                       |
| `list_atomics`      | List atomic utility classes by category.                                       | `category` (optional): one of `spacing`, `color`, `display`, `flex`, `typography`, `border`, `background`, `position`, `size`, `other`; omit for a count of every category |
| `get_class_details` | Get a class's metadata, including theme colors or size values when they apply. | `className` (required) — e.g. `color-primary`, `margin-lg`                                                                                                                 |

Example calls:

```js
search_classes({ query: 'button', category: 'component' });
get_component({ name: 'button' });
get_code_examples({ name: 'spacing', type: 'atomic' });
list_atomics({ category: 'spacing' });
get_class_details({ className: 'color-primary' });
```

## Resources

| URI                  | Contents                                                      |
| -------------------- | ------------------------------------------------------------- |
| `atlas://components` | Component catalog with metadata                               |
| `atlas://atomics`    | Atomic utility classes organized by category                  |
| `atlas://tokens`     | Design tokens: colors, spacing, typography, shadows, and more |

## Development

```bash
npm run build -w @microsoft/atlas-mcp   # build
npm run dev -w @microsoft/atlas-mcp     # watch mode
```

The server reads pre-bundled data that is generated from built Atlas CSS files. Before building the server, generate those files from the repository root:

```bash
npm run build:css
npm run build:class-names
```

This produces `css/dist/class-names.json` and `css/dist/tokens.json`; the server's build step bundles both into `data/atlas-data.json`.
