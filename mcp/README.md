# Atlas MCP Server

A Model Context Protocol (MCP) server that exposes Atlas Design System resources to AI agents and copilots.

## Overview

This MCP server provides tools and resources for discovering and using Atlas CSS classes, components, and design tokens. It enables AI assistants to help developers use Atlas effectively in their projects.

## Installation

### Via npm (recommended for external users)

```bash
npm install -g @microsoft/atlas-mcp
```

Or run directly with npx (no installation required):

```bash
npx @microsoft/atlas-mcp
```

### From source (for contributors)

From the repository root:

```bash
npm install
npm run build -w @microsoft/atlas-mcp
```

## Configuration

### GitHub Copilot CLI

Add to your project's `.github/copilot-mcp.json`:

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

## Available Tools

### `search_classes`
Search Atlas CSS classes by name or pattern.

**Parameters:**
- `query` (string, required): Search query to match against class names
- `category` (string, optional): Filter by "component" or "atomic"
- `limit` (number, optional): Maximum results (default: 50, max: 100)

**Example:** Search for button-related classes
```
search_classes({ query: "button", category: "component" })
```

### `get_component`
Get detailed information about a specific Atlas component.

**Parameters:**
- `name` (string, required): Component name (e.g., "button", "card", "badge")

**Example:** Get button component details
```
get_component({ name: "button" })
```

### `get_code_examples`
Get HTML/CSS code examples for a component or atomic category.

**Parameters:**
- `name` (string, required): Component or atomic category name
- `type` (string, optional): "component" or "atomic"

**Example:** Get spacing examples
```
get_code_examples({ name: "spacing", type: "atomic" })
```

### `list_components`
List all available Atlas components with descriptions.

**Example:**
```
list_components({})
```

### `list_atomics`
List Atlas atomic utility classes by category.

**Parameters:**
- `category` (string, optional): One of: spacing, color, display, flex, typography, border, background, position, size, other

**Example:** List all spacing classes
```
list_atomics({ category: "spacing" })
```

### `get_class_details`
Get detailed information about a specific CSS class including theme colors and size values.

**Parameters:**
- `className` (string, required): The CSS class name

**Example:** Get details for color-primary
```
get_class_details({ className: "color-primary" })
```

## Available Resources

### `atlas://components`
Full catalog of Atlas components with metadata.

### `atlas://atomics`
All atomic utility classes organized by category (spacing, color, display, flex, typography, border, background, position, size).

### `atlas://tokens`
Design tokens including colors, spacing, typography, shadows, and more.

## Development

```bash
# Build the MCP server
npm run build -w @microsoft/atlas-mcp

# Watch mode for development
npm run dev -w @microsoft/atlas-mcp
```

## Prerequisites

The MCP server requires built Atlas CSS artifacts. Ensure you've run:

```bash
npm run build:css
npm run build:class-names
```

These commands generate `css/dist/class-names.json` and `css/dist/tokens.json` which the MCP server reads.
