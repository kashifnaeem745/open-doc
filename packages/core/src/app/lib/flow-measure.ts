import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { FLOW_BLOCK_ATTR, FlowBlock } from '../components/flow-page';
import { type DesignSystem, designToCssVars } from './design';
import type { BlockMetrics, FlowSection } from './flow';
import { nextFrame, waitForFonts } from './print-ready';
import type { PageGeometry } from './sdk';

const HEADING_TAGS = new Set(['H1', 'H2', 'H3', 'H4']);

function metricsFor(el: HTMLElement, height: number): BlockMetrics {
  const inner = el.firstElementChild;
  const tag = inner?.tagName ?? '';
  const declaredKeepNext = inner?.getAttribute('data-od-keep-with-next');
  const declaredKeepPrev = inner?.getAttribute('data-od-keep-with-previous');
  const declaredBreak = inner?.getAttribute('data-od-break-before');

  return {
    height,
    // A heading alone at the bottom of a page is the most visible layout error
    // in a report, so headings glue to whatever follows them by default.
    keepWithNext: declaredKeepNext !== null ? declaredKeepNext !== 'false' : HEADING_TAGS.has(tag),
    keepWithPrevious: declaredKeepPrev !== null && declaredKeepPrev !== 'false',
    breakBefore: declaredBreak !== null && declaredBreak !== 'false',
  };
}

export type FlowMeasurement = {
  metrics: BlockMetrics[];
  /** Usable height of one page for this section. */
  available: number;
};

/**
 * Renders each section's blocks offscreen at the real page width and reads back
 * their stacked heights. Measuring the live DOM is the only way to know how a
 * paragraph wraps or how tall a table grew.
 */
export async function measureFlowSections(
  sections: FlowSection[],
  opts: { geometry: PageGeometry; design?: DesignSystem },
): Promise<FlowMeasurement[]> {
  if (sections.length === 0) return [];

  const host = document.createElement('div');
  host.setAttribute('aria-hidden', 'true');
  Object.assign(host.style, {
    position: 'fixed',
    left: '-99999px',
    top: '0',
    pointerEvents: 'none',
    visibility: 'hidden',
  });
  document.body.appendChild(host);

  const designVars = opts.design ? designToCssVars(opts.design) : null;
  const roots: Array<ReturnType<typeof createRoot>> = [];
  const containers: HTMLElement[] = [];

  try {
    for (const section of sections) {
      const padding = section.padding ?? opts.design?.margin ?? 76;
      const container = document.createElement('div');
      container.style.width = `${opts.geometry.width - padding * 2}px`;
      container.style.fontFamily = 'var(--od-font-body)';
      container.style.fontSize = 'var(--od-size-body)';
      container.style.lineHeight = 'var(--od-leading)';
      if (designVars) {
        for (const [k, v] of Object.entries(designVars)) container.style.setProperty(k, v);
      }
      host.appendChild(container);
      containers.push(container);

      const root = createRoot(container);
      root.render(
        section.blocks.map((block, index) =>
          createElement(FlowBlock, { key: index }, block),
        ) as unknown as Parameters<typeof root.render>[0],
      );
      roots.push(root);
    }

    await nextFrame();
    await waitForFonts();
    await nextFrame();

    return sections.map((section, sectionIndex) => {
      const container = containers[sectionIndex];
      const padding = section.padding ?? opts.design?.margin ?? 76;
      const nodes = Array.from(
        container.querySelectorAll<HTMLElement>(`:scope > [${FLOW_BLOCK_ATTR}]`),
      );
      const total = container.getBoundingClientRect().height;
      const tops = nodes.map((node) => node.offsetTop);

      const metrics = nodes.map((node, index) => {
        const next = index + 1 < tops.length ? tops[index + 1] : total;
        // Successive offsets already account for collapsed margins, which is
        // what actually decides where the next block starts.
        return metricsFor(node, Math.max(0, next - tops[index]));
      });

      return { metrics, available: opts.geometry.height - padding * 2 };
    });
  } finally {
    for (const root of roots) root.unmount();
    host.remove();
  }
}
