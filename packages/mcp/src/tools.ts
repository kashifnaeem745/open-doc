import { Buffer } from 'node:buffer';
import type { McpServer } from '@modelcontextprotocol/server';
import {
  type ApiContext,
  addComment,
  createDocument,
  createFolder,
  deleteAsset,
  deleteDocument,
  duplicateDocument,
  fileDocument,
  findAssetUsages,
  listAssets,
  listDocuments,
  listFolders,
  listThemes,
  OpsError,
  readDocument,
  readText,
  readTheme,
  renameDocument,
  writeAsset,
  writeDocument,
  writeText,
} from '@open-document/core/ops';
import { z } from 'zod';

/**
 * Every tool is a thin wrapper over `@open-document/core/ops` — the same functions
 * the dev server calls for the browser. An agent and a person editing the same
 * workspace therefore go through one implementation, including its conflict
 * checks.
 */

const LOC = z.object({
  line: z.number().int().positive().describe('1-based line in the document source'),
  column: z.number().int().nonnegative().describe('column reported by data-od-loc'),
});

/** Tools return text; JSON payloads go through as pretty-printed text blocks. */
function ok(value: unknown) {
  const text = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
  return { content: [{ type: 'text' as const, text }] };
}

/**
 * An OpsError is a refusal the caller can act on (404 wrong id, 409 stale
 * write), so it comes back as a tool error rather than a transport failure.
 */
async function run(fn: () => Promise<unknown>) {
  try {
    return ok(await fn());
  } catch (err) {
    if (err instanceof OpsError) {
      return {
        isError: true,
        content: [{ type: 'text' as const, text: `${err.status}: ${err.message}` }],
      };
    }
    throw err;
  }
}

export function registerTools(server: McpServer, ctx: ApiContext): void {
  server.registerTool(
    'list_documents',
    {
      title: 'List documents',
      description:
        'Every document in the workspace with its id, title, theme, and folder. Start here.',
      inputSchema: z.object({}),
    },
    () => run(() => listDocuments(ctx)),
  );

  server.registerTool(
    'read_document',
    {
      title: 'Read document source',
      description:
        'The full TSX source of a document. A document is React — read it before editing it.',
      inputSchema: z.object({ docId: z.string() }),
    },
    ({ docId }) => run(() => readDocument(ctx, docId)),
  );

  server.registerTool(
    'create_document',
    {
      title: 'Create document',
      description:
        'Write a new docs/<id>/index.tsx. Fails if the id is taken. Read a theme first and follow its components.',
      inputSchema: z.object({
        docId: z.string().describe('kebab-case folder name under docs/'),
        source: z.string().describe('complete TSX module source'),
      }),
    },
    ({ docId, source }) => run(() => createDocument(ctx, docId, source)),
  );

  server.registerTool(
    'write_document',
    {
      title: 'Overwrite document source',
      description:
        'Replace a document’s source. Pass `expected` (the source you read) to be refused instead of clobbering a concurrent edit.',
      inputSchema: z.object({
        docId: z.string(),
        source: z.string(),
        expected: z
          .string()
          .optional()
          .describe('the source you last read; enables conflict check'),
      }),
    },
    ({ docId, source, expected }) => run(() => writeDocument(ctx, docId, source, expected)),
  );

  server.registerTool(
    'rename_document',
    {
      title: 'Rename document',
      description: 'Rewrites meta.title in the source. The document id never changes.',
      inputSchema: z.object({ docId: z.string(), title: z.string() }),
    },
    ({ docId, title }) => run(() => renameDocument(ctx, docId, title)),
  );

  server.registerTool(
    'duplicate_document',
    {
      title: 'Duplicate document',
      description: 'Copies the folder to a fresh id, lands in the same folder as the original.',
      inputSchema: z.object({ docId: z.string(), newId: z.string().optional() }),
    },
    ({ docId, newId }) => run(() => duplicateDocument(ctx, docId, newId)),
  );

  server.registerTool(
    'delete_document',
    {
      title: 'Delete document',
      description: 'Removes the document folder from disk. Not reversible.',
      inputSchema: z.object({ docId: z.string() }),
    },
    ({ docId }) => run(() => deleteDocument(ctx, docId).then(() => ({ ok: true }))),
  );

  server.registerTool(
    'read_text',
    {
      title: 'Read text at a location',
      description:
        'The editable text runs at a line:column. Use before write_text to learn the run index and current value.',
      inputSchema: z.object({
        docId: z.string(),
        locs: z.array(LOC).min(1),
        shown: z.string().optional().describe('rendered text, disambiguates helper components'),
      }),
    },
    ({ docId, locs, shown }) => run(() => readText(ctx, docId, locs, shown)),
  );

  server.registerTool(
    'write_text',
    {
      title: 'Replace text at a location',
      description:
        'Surgical edit of one text run, leaving surrounding markup untouched. Pass `expected` so a stale write is refused.',
      inputSchema: z.object({
        docId: z.string(),
        loc: LOC,
        text: z.string(),
        index: z.number().int().nonnegative().optional().describe('which run, for mixed content'),
        expected: z.string().optional(),
      }),
    },
    ({ docId, loc, text, index, expected }) =>
      run(() => writeText(ctx, docId, loc, text, { index, expected })),
  );

  server.registerTool(
    'add_comment',
    {
      title: 'Leave a comment marker',
      description:
        'Anchors a @doc-comment note in the source for a later pass to act on, without changing the copy.',
      inputSchema: z.object({
        docId: z.string(),
        loc: LOC,
        note: z.string(),
        hint: z.string().optional(),
      }),
    },
    ({ docId, loc, note, hint }) => run(() => addComment(ctx, docId, loc, note, hint)),
  );

  server.registerTool(
    'list_themes',
    {
      title: 'List themes',
      description: 'House styles available in this workspace.',
      inputSchema: z.object({}),
    },
    () => run(() => listThemes(ctx)),
  );

  server.registerTool(
    'read_theme',
    {
      title: 'Read a theme',
      description:
        'The theme document: palette, type scale, page setup, and paste-ready components. Read this before writing a document that declares the theme.',
      inputSchema: z.object({ themeId: z.string() }),
    },
    ({ themeId }) => run(() => readTheme(ctx, themeId)),
  );

  server.registerTool(
    'list_assets',
    {
      title: 'List assets',
      description: 'Images in a scope — a document id, or "global" for the shared directory.',
      inputSchema: z.object({ scope: z.string().default('global') }),
    },
    ({ scope }) => run(() => listAssets(ctx, scope)),
  );

  server.registerTool(
    'upload_asset',
    {
      title: 'Upload an asset',
      description: 'Writes a base64 payload into the scope’s assets directory.',
      inputSchema: z.object({
        scope: z.string(),
        filename: z.string(),
        base64: z.string().describe('file contents, base64 encoded'),
      }),
    },
    ({ scope, filename, base64 }) =>
      run(() => writeAsset(ctx, scope, filename, Buffer.from(base64, 'base64'))),
  );

  server.registerTool(
    'find_asset_usages',
    {
      title: 'Find asset usages',
      description: 'Which documents import an asset. Check this before deleting one.',
      inputSchema: z.object({ scope: z.string(), filename: z.string() }),
    },
    ({ scope, filename }) => run(() => findAssetUsages(ctx, scope, filename)),
  );

  server.registerTool(
    'delete_asset',
    {
      title: 'Delete an asset',
      description: 'Removes the file. Run find_asset_usages first.',
      inputSchema: z.object({ scope: z.string(), filename: z.string() }),
    },
    ({ scope, filename }) =>
      run(() => deleteAsset(ctx, scope, filename).then(() => ({ ok: true }))),
  );

  server.registerTool(
    'list_folders',
    {
      title: 'List folders',
      description: 'The folder manifest and which document sits in which folder.',
      inputSchema: z.object({}),
    },
    () => run(() => listFolders(ctx)),
  );

  server.registerTool(
    'create_folder',
    {
      title: 'Create folder',
      description: 'Adds a folder to the manifest.',
      inputSchema: z.object({
        name: z.string(),
        icon: z
          .object({ type: z.enum(['emoji', 'color']), value: z.string() })
          .optional()
          .describe('defaults to a grey colour chip'),
      }),
    },
    ({ name, icon }) => run(() => createFolder(ctx, name, icon)),
  );

  server.registerTool(
    'file_document',
    {
      title: 'File a document',
      description: 'Assigns a document to a folder, or unfiles it with folderId: null.',
      inputSchema: z.object({ docId: z.string(), folderId: z.string().nullable() }),
    },
    ({ docId, folderId }) =>
      run(() => fileDocument(ctx, docId, folderId).then(() => ({ ok: true }))),
  );
}
