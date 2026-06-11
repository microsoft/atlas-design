# Atlas MCP Server - Copilot Instructions

applyTo: "mcp/\*\*"

This is the `@microsoft/atlas-mcp` package, a Model Context Protocol (MCP) server that exposes Atlas Design System resources — components, atomic classes, design tokens, and code examples — to AI agents.

## Package Overview

- **Name**: `@microsoft/atlas-mcp`
- **Type**: MCP Server (private package)
- **Build Tool**: TypeScript compiler (tsc)
- **Transport**: stdio (for integration with AI agents)

## Project Structure

```
mcp/
├── src/
│   ├── index.ts          # Entry point with stdio transport
│   ├── server.ts         # MCP server setup, tools, and resources
│   └── data/
│       └── loader.ts     # Loads the pre-bundled data/atlas-data.json at runtime
├── dist/                 # Compiled JavaScript output
├── package.json
├── tsconfig.json
└── README.md
```

## Key Commands

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Watch mode for development
- `npm run start` - Run the MCP server

## Dependencies

- `@modelcontextprotocol/sdk` - Official Model Context Protocol SDK
- `zod` - Schema validation for tool inputs
- `front-matter` - Parse markdown frontmatter

## Data Sources

At build time, `scripts/build-data.js` bundles these sources into `data/atlas-data.json`. At runtime, the server reads only that bundle (see `src/data/loader.ts`):

- `css/dist/class-names.json` - CSS class names with color and size metadata
- `css/dist/tokens.json` - Design tokens
- `site/src/components/*.md` - Component documentation
- `site/src/atomics/*.md` - Atomic class documentation

## Available Tools

1. **search_classes** - Search CSS classes by pattern
2. **get_component** - Get component details and examples
3. **get_code_examples** - Get HTML/CSS code snippets
4. **list_components** - List all components
5. **list_atomics** - List atomic classes by category
6. **get_class_details** - Get class color/size metadata

## Available Resources

- `atlas://components` - Component catalog
- `atlas://atomics` - Atomic classes by category
- `atlas://tokens` - Design tokens

## Coding Guidelines

1. **Validate inputs with Zod** - Define every tool input with a Zod schema.
2. **Cache loaded data** - Class names, tokens, and docs are cached in memory after first load.
3. **Return JSON content** - Return each tool result as JSON in the `text` field of an MCP content block.
4. **Handle errors gracefully** - Return helpful error messages instead of throwing.

## When Making Changes

1. Run `npm run build` to verify compilation.
2. Test the server with the MCP Inspector or direct JSON-RPC calls.
3. Ensure data paths resolve from the compiled `dist/` directory — this is the easiest thing to break.
4. Update `README.md` when adding or changing tools or resources.
