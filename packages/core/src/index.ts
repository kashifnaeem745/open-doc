export type { ImagePlaceholderProps } from './app/components/image-placeholder.tsx';
export { ImagePlaceholder } from './app/components/image-placeholder.tsx';
export type { TableOfContentsProps } from './app/components/table-of-contents.tsx';
export { TableOfContents } from './app/components/table-of-contents.tsx';
export type {
  DesignFonts,
  DesignPalette,
  DesignSystem,
  DesignTypeScale,
} from './app/lib/design.ts';
export { cssVarsToString, defaultDesign, designToCssVars } from './app/lib/design.ts';
export type { BlockMetrics, PaginationResult } from './app/lib/flow.ts';
export { flow, isFlowSection, paginateBlocks } from './app/lib/flow.ts';
export type { OutlineEntry } from './app/lib/outline.ts';
export { useDocOutline } from './app/lib/outline.ts';
export { useDocPageCount, useDocPageNumber } from './app/lib/page-context.tsx';
export type {
  DocEntry,
  DocMeta,
  DocModule,
  DocPage,
  FlowSection,
  Orientation,
  PageGeometry,
  PageSizeName,
} from './app/lib/sdk.ts';
export { DEFAULT_PAGE_SIZE, PAGE_SIZES, resolvePageGeometry } from './app/lib/sdk.ts';
export type { OpenDocBuildConfig, OpenDocConfig } from './config.ts';
