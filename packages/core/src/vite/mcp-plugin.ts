import chalk from 'chalk';
import type { Plugin } from 'vite';
import type { ApiPluginOptions } from './routes/context.ts';

export type McpPluginOptions = ApiPluginOptions & {
  /** Path the MCP endpoint is served on. */
  endpoint?: string;
};

/**
 * Mounts `@open-doc/mcp` on the dev server so an agent and the browser act on
 * one workspace — a tool call lands on disk and the page hot-reloads.
 *
 * The package is imported dynamically and is *not* a dependency of core: the
 * MCP SDK is sizeable and only matters to people wiring up agents, so it stays
 * opt-in. A missing install is reported, never fatal.
 */
export function mcpPlugin(opts: McpPluginOptions): Plugin {
  const endpoint = opts.endpoint ?? '/mcp';
  return {
    name: 'open-doc:mcp',
    apply: 'serve',
    async configureServer(server) {
      let middleware: ReturnType<typeof Function> | undefined;
      try {
        // Resolved through a variable so core does not take a build-time
        // dependency on a package that depends on core.
        const specifier = '@open-doc/mcp';
        const mod = (await import(specifier)) as {
          createOpenDocMcpMiddleware: (o: unknown) => never;
        };
        middleware = mod.createOpenDocMcpMiddleware({
          userCwd: opts.userCwd,
          docsDir: opts.docsDir,
          assetsDir: opts.assetsDir,
          version: opts.coreVersion,
        });
      } catch {
        server.config.logger.warn(
          chalk.yellow('  MCP endpoint disabled — run `pnpm add -D @open-doc/mcp` to enable it.\n'),
        );
        return;
      }

      server.middlewares.use(endpoint, middleware as never);
      server.httpServer?.once('listening', () => {
        const address = server.httpServer?.address();
        const port = typeof address === 'object' && address ? address.port : '';
        server.config.logger.info(
          `  ${chalk.green('➜')}  ${chalk.bold('MCP')}:     ${chalk.cyan(`http://localhost:${port}${endpoint}`)}`,
        );
      });
    },
  };
}
