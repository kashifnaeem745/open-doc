# My documents

Built with [open-doc](https://github.com/simonliu-ai-product/open-doc) — documents as React, one component per printed page.

```bash
pnpm install
pnpm dev
```

Open http://localhost:5273. Every folder under `docs/` with an `index.tsx` shows up.

## Letting an agent drive it

```bash
pnpm add -D @open-doc/mcp
open-doc dev --mcp
```

That mounts an MCP endpoint at `/mcp` on the same port, so any agent framework can list, read, and write documents while the page hot-reloads in front of you.

## Writing a document

Ask your coding agent: *"draft a Q3 report on X"*. The bundled `create-doc` skill runs the workflow — scoping questions, page plan, then the file.

Or write it yourself:

```
docs/
  my-report/
    index.tsx      # export default [Cover, Summary, …]
    assets/        # optional images
```

## Exporting

The toolbar in the document view has **PDF** (prints at the true page size — pick "Save as PDF" in the print dialog) and **HTML** (a self-contained file, or a zip when the document has assets).

`pnpm build` produces a static site you can deploy anywhere.
