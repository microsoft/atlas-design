# Atlas MCP Server - Copilot Instructions

applyTo: "mcp/**"

This is the `@microsoft/atlas-mcp` package, a Model Context Protocol server that exposes Atlas Design System resources to AI agents.

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
│       └── loader.ts     # Data loading from css/dist and site/src
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

- `@modelcontextprotocol/sdk` - Official MCP SDK
- `zod` - Schema validation for tool inputs
- `front-matter` - Parse markdown frontmatter

## Data Sources

The server reads from:
- `css/dist/class-names.json` - All CSS class names with metadata
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

1. **Use Zod for schemas** - All tool inputs use Zod validation
2. **Cache loaded data** - Data is cached in memory for performance
3. **Return JSON content** - Tools return JSON in text content blocks
4. **Handle errors gracefully** - Return helpful error messages

## When Making Changes

1. Run `npm run build` to verify compilation
2. Test with MCP inspector or direct JSON-RPC calls
3. Ensure data paths resolve correctly relative to dist/
4. Update README.md if adding new tools or resources
