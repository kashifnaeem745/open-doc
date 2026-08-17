import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem } from '../lib/design';
import type { FlowSection } from '../lib/flow';

export const FLOW_BLOCK_ATTR = 'data-od-flow-block';

/**
 * The page shell a flow section renders into. The framework owns the margin and
 * base typography here — that is the trade for not hand-splitting pages — while
 * the blocks keep their own styles.
 */
export function flowShellStyle(design: DesignSystem | undefined, padding?: number): CSSProperties {
  return {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: padding ?? design?.margin ?? 76,
    background: 'var(--od-bg)',
    color: 'var(--od-text)',
    fontFamily: 'var(--od-font-body)',
    fontSize: 'var(--od-size-body)',
    lineHeight: 'var(--od-leading)',
    position: 'relative',
    overflow: 'hidden',
  };
}

export function FlowBlock({ children }: { children?: ReactNode }) {
  return <div {...{ [FLOW_BLOCK_ATTR]: '' }}>{children}</div>;
}

export function FlowPage({
  section,
  design,
  blockIndices,
}: {
  section: FlowSection;
  design: DesignSystem | undefined;
  blockIndices: number[];
}) {
  const Footer = section.footer;
  return (
    <div style={flowShellStyle(design, section.padding)}>
      {blockIndices.map((index) => (
        <FlowBlock key={index}>{section.blocks[index]}</FlowBlock>
      ))}
      {Footer && <Footer />}
    </div>
  );
}
