import { describe, expect, it } from 'vitest';
import { type BlockMetrics, paginateBlocks } from './flow.ts';

const b = (height: number, extra: Partial<BlockMetrics> = {}): BlockMetrics => ({
  height,
  ...extra,
});

describe('paginateBlocks', () => {
  it('fills a page before starting the next', () => {
    const { pages } = paginateBlocks([b(300), b(300), b(300), b(300)], 1000);
    expect(pages).toEqual([[0, 1, 2], [3]]);
  });

  it('keeps everything on one page when it fits', () => {
    const { pages } = paginateBlocks([b(100), b(100)], 1000);
    expect(pages).toEqual([[0, 1]]);
  });

  it('never leaves a heading as the last block on a page', () => {
    // The heading fits at the bottom, but its body does not — both move.
    const { pages } = paginateBlocks([b(400), b(400), b(60, { keepWithNext: true }), b(300)], 1000);
    expect(pages).toEqual([
      [0, 1],
      [2, 3],
    ]);
  });

  it('moves a run of stacked headings together', () => {
    const { pages } = paginateBlocks(
      [b(800), b(50, { keepWithNext: true }), b(50, { keepWithNext: true }), b(300)],
      1000,
    );
    expect(pages).toEqual([[0], [1, 2, 3]]);
  });

  it('pulls a figure along with its caption', () => {
    const { pages } = paginateBlocks([b(300), b(600), b(120, { keepWithPrevious: true })], 1000);
    expect(pages).toEqual([[0], [1, 2]]);
  });

  it('honours an explicit page break', () => {
    const { pages } = paginateBlocks([b(100), b(100, { breakBefore: true }), b(100)], 1000);
    expect(pages).toEqual([[0], [1, 2]]);
  });

  it('gives an oversized block its own page and reports it', () => {
    const { pages, overflowing } = paginateBlocks([b(200), b(1400), b(200)], 1000);
    expect(pages).toEqual([[0], [1], [2]]);
    expect(overflowing).toEqual([1]);
  });

  it('does not strand a page when every block wants to keep with the next', () => {
    const { pages } = paginateBlocks(
      [b(600, { keepWithNext: true }), b(600, { keepWithNext: true }), b(600)],
      1000,
    );
    expect(pages).toEqual([[0], [1], [2]]);
  });

  it('returns no pages for no blocks', () => {
    expect(paginateBlocks([], 1000)).toEqual({ pages: [], overflowing: [] });
  });
});
