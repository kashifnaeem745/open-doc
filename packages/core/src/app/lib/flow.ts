import { Children, type ComponentType, Fragment, isValidElement, type ReactNode } from 'react';
import type { DocEntry, FlowSection } from './sdk';

export type { DocEntry, FlowSection };

/**
 * Flattens fragments so `flow(<>…</>)` yields one block per element the author
 * wrote, not a single block containing the whole fragment.
 */
function toBlocks(node: ReactNode): ReactNode[] {
  const out: ReactNode[] = [];
  for (const child of Children.toArray(node)) {
    if (!isValidElement(child)) continue;
    if (child.type === Fragment) {
      out.push(...toBlocks((child.props as { children?: ReactNode }).children));
      continue;
    }
    out.push(child);
  }
  return out;
}

/**
 * Wraps continuous content so the framework paginates it, instead of the author
 * hand-splitting sections into fixed pages. Each direct child is one atomic
 * block — a heading, a paragraph, a table — that never straddles a page break.
 */
export function flow(
  children: ReactNode,
  opts: { footer?: ComponentType; padding?: number } = {},
): FlowSection {
  return { __odFlow: true, blocks: toBlocks(children), ...opts };
}

export function isFlowSection(entry: DocEntry): entry is FlowSection {
  return typeof entry === 'object' && entry !== null && (entry as FlowSection).__odFlow === true;
}

export type BlockMetrics = {
  height: number;
  /** A heading must not be the last block on a page. */
  keepWithNext?: boolean;
  /** A caption must not open a page without the figure it belongs to. */
  keepWithPrevious?: boolean;
  /** Always start a new page before this block. */
  breakBefore?: boolean;
};

export type PaginationResult = {
  /** Block indices per page, in order. */
  pages: number[][];
  /** Blocks taller than one page — they stay whole and overflow. */
  overflowing: number[];
};

/**
 * Greedy top-to-bottom packing: fill a page until the next block would cross
 * the bottom edge, then push that block — plus anything glued to it — onto the
 * next page. Blocks are atomic; nothing is split mid-block.
 */
export function paginateBlocks(blocks: BlockMetrics[], available: number): PaginationResult {
  const pages: number[][] = [];
  const overflowing: number[] = [];
  let current: number[] = [];
  let used = 0;

  const heightOf = (indices: number[]) =>
    indices.reduce((sum, index) => sum + (blocks[index]?.height ?? 0), 0);

  const closePage = () => {
    if (current.length === 0) return;
    pages.push(current);
    current = [];
    used = 0;
  };

  blocks.forEach((block, index) => {
    if (block.height > available) overflowing.push(index);

    if (block.breakBefore) closePage();

    if (current.length > 0 && used + block.height > available) {
      // Everything glued to this block travels with it: trailing headings
      // (keep-with-next) and, when this block is a caption, its figure.
      let splitAt = current.length;
      while (splitAt > 0 && blocks[current[splitAt - 1]]?.keepWithNext) splitAt--;
      if (block.keepWithPrevious && splitAt === current.length) splitAt--;

      if (splitAt > 0 && splitAt < current.length) {
        const moved = current.slice(splitAt);
        pages.push(current.slice(0, splitAt));
        current = moved;
        used = heightOf(moved);
      } else {
        closePage();
      }
    }

    current.push(index);
    used += block.height;
  });

  closePage();
  return { pages, overflowing };
}

/** Blocks of the first flow section, for thumbnails that skip measurement. */
export function firstFlowBlocks(entries: DocEntry[], limit = 12): ReactNode[] {
  const first = entries.find(isFlowSection);
  return first ? first.blocks.slice(0, limit) : [];
}
