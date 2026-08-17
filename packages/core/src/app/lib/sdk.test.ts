import { describe, expect, it } from 'vitest';
import { PAGE_SIZES, resolvePageGeometry } from './sdk.ts';

describe('resolvePageGeometry', () => {
  it('defaults to portrait A4', () => {
    expect(resolvePageGeometry()).toEqual({
      width: PAGE_SIZES.A4.width,
      height: PAGE_SIZES.A4.height,
      css: PAGE_SIZES.A4.css,
    });
  });

  it('swaps the axes for landscape and marks the @page descriptor', () => {
    const geo = resolvePageGeometry({ pageSize: 'Letter', orientation: 'landscape' });
    expect(geo.width).toBe(PAGE_SIZES.Letter.height);
    expect(geo.height).toBe(PAGE_SIZES.Letter.width);
    expect(geo.css).toBe(`${PAGE_SIZES.Letter.css} landscape`);
  });

  it('falls back to A4 for an unknown page size', () => {
    const geo = resolvePageGeometry({ pageSize: 'B4' as never });
    expect(geo.width).toBe(PAGE_SIZES.A4.width);
  });
});
