#!/usr/bin/env node
/**
 * Atlas MCP Server Entry Point
 * Runs the server with stdio transport for use with AI agents
 */

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from './server.js';

async function main() {
	const server = createServer();
	const transport = new StdioServerTransport();

	await server.connect(transport);

	// Handle graceful shutdown
	process.on('SIGINT', async () => {
		await server.close();
		process.exit(0);
	});

	process.on('SIGTERM', async () => {
		await server.close();
		process.exit(0);
	});
}

main().catch(error => {
	console.error('Fatal error:', error);
	process.exit(1);
});
