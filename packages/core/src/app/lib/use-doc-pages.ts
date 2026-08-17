import { createElement, type ReactNode, useEffect, useMemo, useState } from 'react';
import { FlowPage } from '../components/flow-page';
import type { DesignSystem } from './design';
import { type DocEntry, type FlowSection, isFlowSection, paginateBlocks } from './flow';
import { measureFlowSections } from './flow-measure';
import type { DocModule, PageGeometry } from './sdk';

export type ExpandedPage = {
  key: string;
  content: ReactNode;
};

type Plan = {
  /** Section index → block indices per page. */
  bySection: number[][][];
  overflowing: Array<{ section: number; block: number }>;
};

const EMPTY_PLAN: Plan = { bySection: [], overflowing: [] };

function entriesOf(doc: DocModule | null): DocEntry[] {
  return (doc?.default ?? []) as DocEntry[];
}

/**
 * Turns the authored entry list into the pages actually rendered: fixed page
 * components pass through, flow sections expand into as many pages as their
 * measured content needs.
 */
export function useDocPages(
  doc: DocModule | null,
  geometry: PageGeometry,
): { pages: ExpandedPage[]; measuring: boolean; overflowing: Plan['overflowing'] } {
  const entries = useMemo(() => entriesOf(doc), [doc]);
  const sections = useMemo(() => entries.filter(isFlowSection), [entries]);
  const design = doc?.design as DesignSystem | undefined;

  const [plan, setPlan] = useState<Plan>(EMPTY_PLAN);
  const [measuring, setMeasuring] = useState(sections.length > 0);

  useEffect(() => {
    if (sections.length === 0) {
      setPlan(EMPTY_PLAN);
      setMeasuring(false);
      return;
    }
    let cancelled = false;
    setMeasuring(true);
    measureFlowSections(sections, { geometry, design })
      .then((measurements) => {
        if (cancelled) return;
        const bySection: number[][][] = [];
        const overflowing: Plan['overflowing'] = [];
        measurements.forEach((measurement, sectionIndex) => {
          const result = paginateBlocks(measurement.metrics, measurement.available);
          bySection.push(result.pages);
          for (const block of result.overflowing) {
            overflowing.push({ section: sectionIndex, block });
          }
        });
        setPlan({ bySection, overflowing });
        setMeasuring(false);
      })
      .catch(() => {
        if (!cancelled) setMeasuring(false);
      });
    return () => {
      cancelled = true;
    };
  }, [sections, geometry, design]);

  const pages = useMemo(() => {
    const out: ExpandedPage[] = [];
    let sectionIndex = -1;

    entries.forEach((entry, entryIndex) => {
      if (!isFlowSection(entry)) {
        const Page = entry;
        out.push({ key: `p${entryIndex}`, content: createElement(Page) });
        return;
      }
      sectionIndex++;
      const section = entry as FlowSection;
      // Before measurement lands, render the section as a single page so the
      // viewer shows something rather than flashing empty.
      const chunks = plan.bySection[sectionIndex] ?? [section.blocks.map((_, i) => i)];
      chunks.forEach((blockIndices, pageIndex) => {
        out.push({
          key: `f${entryIndex}-${pageIndex}`,
          content: createElement(FlowPage, { section, design, blockIndices }),
        });
      });
    });

    return out;
  }, [entries, plan, design]);

  return { pages, measuring, overflowing: plan.overflowing };
}
