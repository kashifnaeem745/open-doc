import logo from '@assets/northwind-logo.svg';
import {
  type DesignSystem,
  type DocMeta,
  type DocPage,
  ImagePlaceholder,
  TableOfContents,
  useDocPageCount,
  useDocPageNumber,
} from '@open-doc/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: {
    bg: '#ffffff',
    text: '#16181d',
    muted: '#6b7280',
    accent: '#1d4ed8',
    rule: '#e4e7ec',
  },
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
    mono: 'ui-monospace, "SF Mono", Menlo, monospace',
  },
  typeScale: {
    title: 44,
    h1: 28,
    h2: 20,
    h3: 16,
    body: 14,
    caption: 10,
  },
  margin: 76,
  leading: 1.55,
  radius: 6,
};

const positive = '#15803d';
const warning = '#b45309';
const negative = '#b91c1c';

const TEXT_WIDTH = 642;

const page: CSSProperties = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  padding: 'var(--od-margin)',
  background: 'var(--od-bg)',
  color: 'var(--od-text)',
  fontFamily: 'var(--od-font-body)',
  fontSize: 'var(--od-size-body)',
  lineHeight: 'var(--od-leading)',
  position: 'relative',
};

const h1: CSSProperties = {
  fontFamily: 'var(--od-font-heading)',
  fontSize: 'var(--od-size-h1)',
  lineHeight: 1.2,
  fontWeight: 650,
  letterSpacing: '-0.015em',
  margin: '0 0 18px',
};

const h2: CSSProperties = {
  fontFamily: 'var(--od-font-heading)',
  fontSize: 'var(--od-size-h2)',
  lineHeight: 1.25,
  fontWeight: 600,
  margin: '26px 0 10px',
};

const p: CSSProperties = { margin: '0 0 14px' };

const caption: CSSProperties = {
  fontSize: 'var(--od-size-caption)',
  color: 'var(--od-muted)',
  margin: '8px 0 0',
};

const Footer = ({ label = 'Q3 Infrastructure Review' }: { label?: string }) => {
  const n = useDocPageNumber();
  const total = useDocPageCount();
  return (
    <div
      style={{
        position: 'absolute',
        left: 'var(--od-margin)',
        right: 'var(--od-margin)',
        bottom: 40,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 'var(--od-size-caption)',
        color: 'var(--od-muted)',
        borderTop: '1px solid var(--od-rule)',
        paddingTop: 8,
      }}
    >
      <span>{label}</span>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>
        {n} / {total}
      </span>
    </div>
  );
};

const Th = ({ children, align = 'left' }: { children: ReactNode; align?: 'left' | 'right' }) => (
  <th
    style={{
      textAlign: align,
      fontFamily: 'var(--od-font-heading)',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--od-muted)',
      borderBottom: '1px solid var(--od-rule)',
      padding: '0 8px 6px',
    }}
  >
    {children}
  </th>
);

const Td = ({
  children,
  align = 'left',
  color,
}: {
  children: ReactNode;
  align?: 'left' | 'right';
  color?: string;
}) => (
  <td
    style={{
      textAlign: align,
      fontSize: 12,
      color,
      padding: '7px 8px',
      borderBottom: '1px solid var(--od-rule)',
      fontVariantNumeric: align === 'right' ? 'tabular-nums' : undefined,
    }}
  >
    {children}
  </td>
);

const Stat = ({ value, label, note }: { value: string; label: string; note: string }) => (
  <div style={{ flex: 1 }}>
    <div
      style={{
        fontFamily: 'var(--od-font-heading)',
        fontSize: 30,
        fontWeight: 650,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      }}
    >
      {value}
    </div>
    <div style={{ fontSize: 12, marginTop: 4 }}>{label}</div>
    <div style={{ fontSize: 10, color: 'var(--od-muted)', marginTop: 2 }}>{note}</div>
  </div>
);

const Callout = ({ title, children }: { title: string; children: ReactNode }) => (
  <div
    style={{
      borderLeft: '3px solid var(--od-accent)',
      background: '#f6f8fc',
      padding: '12px 14px',
      borderRadius: 'var(--od-radius)',
      fontSize: 12,
      lineHeight: 1.5,
    }}
  >
    <strong style={{ display: 'block', marginBottom: 4 }}>{title}</strong>
    {children}
  </div>
);

const Cover: DocPage = () => (
  <div
    style={{ ...page, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
  >
    <img src={logo} alt="Northwind" style={{ display: 'block', width: 120, height: 24 }} />

    <div>
      <p
        style={{
          fontSize: 12,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--od-accent)',
          margin: '0 0 16px',
        }}
      >
        Platform Engineering · Quarterly
      </p>
      <h1
        data-od-outline="skip"
        style={{
          ...h1,
          fontSize: 'var(--od-size-title)',
          margin: '0 0 16px',
          maxWidth: 520,
        }}
      >
        Q3 Infrastructure Review
      </h1>
      <p style={{ ...p, fontSize: 15, color: 'var(--od-muted)', maxWidth: 460 }}>
        Availability, latency, and spend across the platform for July–September 2026, with the
        capacity decisions we need before the November peak.
      </p>
    </div>

    <div
      style={{
        display: 'flex',
        gap: 48,
        borderTop: '1px solid var(--od-rule)',
        paddingTop: 14,
        fontSize: 11,
        color: 'var(--od-muted)',
      }}
    >
      <div>
        <div style={{ color: 'var(--od-text)', fontWeight: 600 }}>Prepared by</div>
        Platform Engineering
      </div>
      <div>
        <div style={{ color: 'var(--od-text)', fontWeight: 600 }}>Period</div>
        2026-07-01 → 2026-09-30
      </div>
      <div>
        <div style={{ color: 'var(--od-text)', fontWeight: 600 }}>Distribution</div>
        Internal
      </div>
    </div>
  </div>
);

const Contents: DocPage = () => (
  <div style={page}>
    <h1 style={h1} data-od-outline="skip">
      Contents
    </h1>
    <TableOfContents maxLevel={2} />
    <Footer />
  </div>
);

const Summary: DocPage = () => (
  <div style={page}>
    <h1 style={h1}>Executive summary</h1>
    <p style={p}>
      The platform held availability above target for the quarter while absorbing a 31% increase in
      request volume. Latency improved after the June queue split landed, and spend grew slower than
      traffic for the first quarter since 2024.
    </p>
    <p style={p}>
      Two risks carry into Q4. The checkout queue shares a cluster with batch reporting, which is
      what turned a routine reporting backlog into the 14 September partial outage. And our headroom
      at the current node count runs out around 1.4× today's peak — below the 1.8× we expect in
      November.
    </p>

    <div
      style={{
        display: 'flex',
        gap: 24,
        borderTop: '1px solid var(--od-rule)',
        paddingTop: 16,
        marginBottom: 20,
      }}
    >
      <Stat value="99.94%" label="Availability" note="target 99.9% · +0.02 QoQ" />
      <Stat value="412 ms" label="p99 latency" note="−18% QoQ" />
      <Stat value="$41.2k" label="Monthly spend" note="+6% QoQ vs +31% traffic" />
      <Stat value="2" label="Sev-2 incidents" note="0 Sev-1" />
    </div>

    <Callout title="Recommendation">
      Move checkout to a dedicated cluster and pre-provision 40% additional capacity by 24 October.
      Estimated cost: $6.8k/month, roughly one quarter of the revenue lost to the September
      incident.
    </Callout>

    <Footer />
  </div>
);

const Method: DocPage = () => (
  <div style={page}>
    <h1 style={h1}>Method and sources</h1>
    <p style={p}>
      Every figure in this report is drawn from a system of record, not from dashboards
      reconstructed after the fact. Where a number is an estimate, it is labelled as one.
    </p>

    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <Th>Metric</Th>
          <Th>Source</Th>
          <Th align="right">Extracted</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>Availability</Td>
          <Td>Synthetic probe, 30s interval, 4 regions</Td>
          <Td align="right">2026-10-01</Td>
        </tr>
        <tr>
          <Td>Latency (p50/p99)</Td>
          <Td>Edge access logs, unsampled</Td>
          <Td align="right">2026-10-01</Td>
        </tr>
        <tr>
          <Td>Spend</Td>
          <Td>Cloud billing export, tagged by service</Td>
          <Td align="right">2026-10-02</Td>
        </tr>
        <tr>
          <Td>Incidents</Td>
          <Td>Incident tracker, Sev-1/Sev-2 only</Td>
          <Td align="right">2026-10-01</Td>
        </tr>
        <tr>
          <Td>Peak forecast</Td>
          <Td>Estimate — 2025 peak × YoY growth</Td>
          <Td align="right">2026-10-03</Td>
        </tr>
      </tbody>
    </table>
    <p style={caption}>Table 1 — Sources. Billing figures exclude one-off migration credits.</p>

    <h2 style={h2}>Scope</h2>
    <p style={p}>
      Production services owned by Platform Engineering. Excludes the data warehouse (Analytics) and
      the internal tooling cluster, both of which report separately.
    </p>

    <Footer />
  </div>
);

const Availability: DocPage = () => (
  <div style={page}>
    <h1 style={h1}>1. Availability and incidents</h1>
    <p style={p}>
      Availability finished at 99.94%, four basis points above target. Both Sev-2 incidents were
      contained inside a single region, and neither exceeded the 30-minute recovery objective.
    </p>

    <svg
      width={TEXT_WIDTH}
      height={190}
      role="img"
      aria-label="Monthly availability against target"
    >
      <title>Monthly availability against target</title>
      {[
        { label: 'Jul', value: 99.97 },
        { label: 'Aug', value: 99.96 },
        { label: 'Sep', value: 99.89 },
      ].map((d, i) => {
        const floor = 99.8;
        const ceiling = 100;
        const plotH = 140;
        const barW = 120;
        const gap = 56;
        const x = i * (barW + gap);
        const barH = ((d.value - floor) / (ceiling - floor)) * plotH;
        const targetY = plotH - ((99.9 - floor) / (ceiling - floor)) * plotH;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={plotH - barH}
              width={barW}
              height={barH}
              rx={3}
              fill={d.value >= 99.9 ? 'var(--od-accent)' : negative}
            />
            <text
              x={x + barW / 2}
              y={plotH - barH - 8}
              textAnchor="middle"
              fontSize={11}
              fill="var(--od-text)"
            >
              {d.value}%
            </text>
            <text
              x={x + barW / 2}
              y={plotH + 18}
              textAnchor="middle"
              fontSize={10}
              fill="var(--od-muted)"
            >
              {d.label}
            </text>
            {i === 0 && (
              <>
                <line
                  x1={0}
                  x2={TEXT_WIDTH}
                  y1={targetY}
                  y2={targetY}
                  stroke="var(--od-muted)"
                  strokeDasharray="4 4"
                />
                <text
                  x={TEXT_WIDTH}
                  y={targetY - 6}
                  textAnchor="end"
                  fontSize={10}
                  fill="var(--od-muted)"
                >
                  target 99.9%
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
    <p style={caption}>
      Figure 1 — Monthly availability. September falls below target because of the 14 September
      partial outage.
    </p>

    <h2 style={h2}>1.1 The 14 September outage</h2>
    <p style={p}>
      A reporting job saturated the shared queue for 41 minutes, which starved checkout of workers.
      Checkout returned 503s for 11 of those minutes before the circuit breaker shed reporting
      traffic. No orders were lost; 2,180 were delayed past 60 seconds.
    </p>

    <Footer />
  </div>
);

const Latency: DocPage = () => (
  <div style={page}>
    <h1 style={h1}>2. Latency and traffic</h1>
    <p style={p}>
      p99 improved 18% quarter over quarter despite a 31% traffic increase. The gain came almost
      entirely from splitting the read path off the primary in June; the remaining tail sits in
      checkout, which still shares workers with reporting.
    </p>

    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <Th>Service</Th>
          <Th align="right">Requests</Th>
          <Th align="right">p50 (ms)</Th>
          <Th align="right">p99 (ms)</Th>
          <Th align="right">Δ p99</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>checkout-api</Td>
          <Td align="right">18,402,111</Td>
          <Td align="right">44</Td>
          <Td align="right">412</Td>
          <Td align="right" color={positive}>
            −18%
          </Td>
        </tr>
        <tr>
          <Td>catalog-api</Td>
          <Td align="right">64,918,004</Td>
          <Td align="right">21</Td>
          <Td align="right">183</Td>
          <Td align="right" color={positive}>
            −24%
          </Td>
        </tr>
        <tr>
          <Td>identity</Td>
          <Td align="right">9,240,556</Td>
          <Td align="right">18</Td>
          <Td align="right">96</Td>
          <Td align="right" color={positive}>
            −7%
          </Td>
        </tr>
        <tr>
          <Td>search</Td>
          <Td align="right">27,115,880</Td>
          <Td align="right">38</Td>
          <Td align="right">644</Td>
          <Td align="right" color={negative}>
            +12%
          </Td>
        </tr>
        <tr>
          <Td>reporting (batch)</Td>
          <Td align="right">412,009</Td>
          <Td align="right">910</Td>
          <Td align="right">7,240</Td>
          <Td align="right" color={warning}>
            +3%
          </Td>
        </tr>
      </tbody>
    </table>
    <p style={caption}>
      Table 2 — Q3 traffic and latency by service. Edge access logs, unsampled, 2026-10-01.
    </p>

    <h2 style={h2}>2.1 Search regression</h2>
    <p style={p}>
      Search is the one service that moved the wrong way. The regression tracks the index rebuild
      cadence introduced in August: p99 spikes for roughly 90 minutes after each rebuild. Moving
      rebuilds behind a read replica is queued for Q4 and is not on the critical path for peak.
    </p>

    <Footer />
  </div>
);

const Spend: DocPage = () => (
  <div style={page}>
    <h1 style={h1}>3. Spend</h1>
    <p style={p}>
      Monthly spend grew 6% against 31% traffic growth — the first quarter since 2024 where unit
      cost fell. Reserved capacity purchased in June covers the baseline; the marginal traffic
      landed on spot capacity at roughly a third of on-demand price.
    </p>

    <ImagePlaceholder
      hint="Stacked area chart: monthly spend by service, Jan–Sep 2026 — export from the finance dashboard (Billing → Cost by tag)"
      height={200}
    />
    <p style={caption}>
      Figure 2 — Placeholder. Replace with the finance export before this report is circulated.
    </p>

    <h2 style={h2}>3.1 Unit economics</h2>
    <p style={p}>
      Cost per million requests fell from $0.41 to $0.33. At the November forecast of 1.8× current
      peak, the same unit cost implies $58k/month — within the approved envelope of $65k.
    </p>

    <Callout title="Assumption">
      The forecast assumes spot capacity remains available at Q3 prices. A sustained spot shortage
      would push November spend to roughly $71k, over the envelope. We hold reserved capacity for
      the baseline only.
    </Callout>

    <Footer />
  </div>
);

const Recommendations: DocPage = () => (
  <div style={page}>
    <h1 style={h1}>4. Recommendations</h1>
    <p style={p}>
      Three actions, in priority order. Only the first is on the critical path for the November
      peak.
    </p>

    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <Th>Action</Th>
          <Th>Owner</Th>
          <Th align="right">By</Th>
          <Th align="right">Cost / mo</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>Dedicated checkout cluster</Td>
          <Td>Platform</Td>
          <Td align="right">2026-10-24</Td>
          <Td align="right">$6,800</Td>
        </tr>
        <tr>
          <Td>Pre-provision 40% peak headroom</Td>
          <Td>Platform</Td>
          <Td align="right">2026-11-07</Td>
          <Td align="right">$4,100</Td>
        </tr>
        <tr>
          <Td>Search rebuilds behind a replica</Td>
          <Td>Search</Td>
          <Td align="right">2026-12-12</Td>
          <Td align="right">$900</Td>
        </tr>
      </tbody>
    </table>
    <p style={caption}>
      Table 3 — Proposed Q4 actions. Costs are incremental to the current run rate.
    </p>

    <h2 style={h2}>4.1 What happens if we do nothing</h2>
    <p style={p}>
      The September failure mode repeats under peak load, with a larger blast radius: at 1.8×
      traffic the same queue saturation would take checkout down for an estimated 25–40 minutes
      rather than 11. On Q3 order rates that is $180k–$290k of delayed revenue and an unknown amount
      of abandonment.
    </p>

    <Footer />
  </div>
);

const Appendix: DocPage = () => (
  <div style={page}>
    <h1 style={h1}>Appendix A — Incident log</h1>

    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <Th>Date</Th>
          <Th>Severity</Th>
          <Th>Service</Th>
          <Th align="right">Duration</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>2026-08-02</Td>
          <Td>Sev-2</Td>
          <Td>identity — token refresh storm</Td>
          <Td align="right">18 min</Td>
        </tr>
        <tr>
          <Td>2026-09-14</Td>
          <Td>Sev-2</Td>
          <Td>checkout — queue starvation</Td>
          <Td align="right">41 min</Td>
        </tr>
      </tbody>
    </table>
    <p style={caption}>
      Table 4 — Sev-1 and Sev-2 incidents, Q3 2026. No Sev-1 incidents occurred.
    </p>

    <h2 style={h2}>Glossary</h2>
    <p style={{ ...p, color: 'var(--od-muted)', fontSize: 12 }}>
      <strong style={{ color: 'var(--od-text)' }}>p99</strong> — the latency below which 99% of
      requests complete. <strong style={{ color: 'var(--od-text)' }}>Headroom</strong> — spare
      capacity above current peak, expressed as a multiple.{' '}
      <strong style={{ color: 'var(--od-text)' }}>Envelope</strong> — the approved monthly spend
      ceiling for the fiscal year.
    </p>

    <Footer />
  </div>
);

export const meta: DocMeta = {
  title: 'Q3 Infrastructure Review',
  subtitle: 'Platform Engineering · July–September 2026',
  author: 'Platform Engineering',
  pageSize: 'A4',
  orientation: 'portrait',
  theme: 'corporate-neutral',
  createdAt: '2026-08-15T13:44:40.268Z',
};

export default [
  Cover,
  Contents,
  Summary,
  Method,
  Availability,
  Latency,
  Spend,
  Recommendations,
  Appendix,
] satisfies DocPage[];
