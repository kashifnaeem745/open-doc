import { type AstNode, findJsxAt, findJsxOnLine, parseSource } from './babel-walk.ts';

export type EditTarget = { line: number; column: number };

export type EditResult =
  | { ok: true; source: string }
  | { ok: false; status: number; error: string };

/** JSX text is written literally; only these characters have to be escaped. */
function escapeJsxText(text: string): string {
  return text.replace(/[{}<>]/g, (char) => `{'${char}'}`);
}

export function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/**
 * One editable run of text, or a piece of markup the editor must leave alone.
 * Splitting an element this way is what lets a paragraph like
 * `對外端點為 <code>/mcp</code>，另外自訂 …` stay editable without the editor
 * having to understand — or destroy — the inline markup.
 */
export type TextPart =
  | { kind: 'text'; index: number; value: string }
  | { kind: 'markup'; label: string };

function jsxChildren(element: AstNode): AstNode[] {
  return (element.children ?? []) as AstNode[];
}

function labelOf(node: AstNode): string {
  if (node.type === 'JSXExpressionContainer') return '{…}';
  if (node.type === 'JSXElement') {
    const name = (node.openingElement as AstNode | undefined)?.name as
      | { name?: string }
      | undefined;
    return `<${name?.name ?? 'element'}>`;
  }
  return '…';
}

/** Text children with content, in document order. */
function textNodes(element: AstNode): AstNode[] {
  return jsxChildren(element).filter(
    (child) => child.type === 'JSXText' && (child.value as string).trim() !== '',
  );
}

export function partsOf(element: AstNode): TextPart[] {
  const parts: TextPart[] = [];
  let index = 0;
  for (const child of jsxChildren(element)) {
    if (child.type === 'JSXText') {
      const value = child.value as string;
      if (value.trim() === '') continue;
      parts.push({ kind: 'text', index: index++, value: value.trim() });
      continue;
    }
    parts.push({ kind: 'markup', label: labelOf(child) });
  }
  return parts;
}

export type TextTargetInfo = {
  editable: boolean;
  /** The element's own text, markup excluded. */
  text: string;
  parts: TextPart[];
  reason?: string;
};

function describe(element: AstNode): TextTargetInfo {
  const parts = partsOf(element);
  const texts = parts.filter(
    (part): part is Extract<TextPart, { kind: 'text' }> => part.kind === 'text',
  );
  if (texts.length === 0) {
    const generated = parts.some((part) => part.kind === 'markup' && part.label === '{…}');
    return {
      editable: false,
      text: '',
      parts,
      reason: generated
        ? 'text is produced by code — edit whatever feeds it'
        : 'element has no text of its own',
    };
  }
  return { editable: true, text: texts.map((part) => part.value).join(' '), parts };
}

/** What the inspector shows before the user starts typing. */
export function readTextAt(source: string, target: EditTarget): TextTargetInfo | null {
  const ast = parseSource(source);
  if (!ast) return null;
  const element = findJsxAt(ast, target.line, target.column);
  return element ? describe(element) : null;
}

export type ResolvedTarget = TextTargetInfo & EditTarget;

/**
 * Picks the element an inspector click meant.
 *
 * Coordinates alone are not enough: fallback candidates come from React's
 * `_debugSource`, whose columns drift once the loc-tag transform has widened
 * the line. The rendered text the user is looking at is the tiebreaker — an
 * element only wins if its source text is part of what is on screen.
 */
export function resolveTextTarget(
  source: string,
  candidates: EditTarget[],
  expected?: string,
): ResolvedTarget | null {
  const ast = parseSource(source);
  if (!ast) return null;
  const shown = expected ? normalizeText(expected) : null;

  // Compare run by run. Joining them would introduce spacing the DOM never
  // had, so a paragraph interrupted by <strong> would fail to match itself.
  const matches = (info: TextTargetInfo) => {
    if (!shown) return true;
    const runs = info.parts.filter((part) => part.kind === 'text');
    if (runs.length === 0) return false;
    return runs.every((part) => part.kind === 'text' && shown.includes(normalizeText(part.value)));
  };

  for (const candidate of candidates) {
    const exact = findJsxAt(ast, candidate.line, candidate.column);
    if (exact) {
      const info = describe(exact);
      if (info.editable && matches(info)) return { ...info, ...candidate };
    }
    // The column may have drifted; scan the rest of the line, but only accept
    // an element whose text is actually on screen.
    if (!shown) continue;
    for (const node of findJsxOnLine(ast, candidate.line, candidate.column)) {
      const info = describe(node);
      const start = node.loc?.start;
      if (!info.editable || !matches(info) || !start) continue;
      return { ...info, line: start.line, column: start.column };
    }
  }

  const first = candidates[0];
  if (!first) return null;
  const clicked = findJsxAt(ast, first.line, first.column);
  return clicked ? { ...describe(clicked), ...first } : null;
}

/**
 * Replaces one text run of an element, leaving its markup and every other run
 * untouched. `expected` is the text the caller believes is there; a mismatch
 * means the source moved under us and the write is refused.
 */
export function replaceTextAt(
  source: string,
  target: EditTarget,
  text: string,
  opts: { index?: number; expected?: string } = {},
): EditResult {
  const ast = parseSource(source);
  if (!ast) return { ok: false, status: 422, error: 'could not parse document source' };

  const element = findJsxAt(ast, target.line, target.column);
  if (!element) return { ok: false, status: 404, error: 'no element at that source location' };

  const nodes = textNodes(element);
  if (nodes.length === 0) {
    return { ok: false, status: 422, error: 'element has no text to replace' };
  }
  const child = nodes[opts.index ?? 0];
  if (!child) return { ok: false, status: 404, error: 'no such text run in this element' };

  const raw = child.value as string;
  if (opts.expected !== undefined && normalizeText(raw) !== normalizeText(opts.expected)) {
    return { ok: false, status: 409, error: 'source changed since this was opened — reselect it' };
  }

  const leading = raw.match(/^\s*/)?.[0] ?? '';
  const trailing = raw.match(/\s*$/)?.[0] ?? '';
  const next =
    source.slice(0, child.start) +
    leading +
    escapeJsxText(text) +
    trailing +
    source.slice(child.end);

  return { ok: true, source: next };
}
