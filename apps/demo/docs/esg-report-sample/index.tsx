import {
  type DesignSystem,
  type DocEntry,
  type DocMeta,
  type DocPage,
  flow,
  useDocPageCount,
  useDocPageNumber,
} from '@open-doc/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: {
    bg: '#ffffff',
    text: '#16211c',
    muted: '#61736a',
    accent: '#16704f',
    rule: '#dfe6e1',
  },
  fonts: {
    heading: '"Noto Sans TC", "PingFang TC", "Heiti TC", "Microsoft JhengHei", sans-serif',
    body: '"Noto Sans TC", "PingFang TC", "Heiti TC", "Microsoft JhengHei", sans-serif',
    mono: 'ui-monospace, "SF Mono", Menlo, monospace',
  },
  typeScale: { title: 46, h1: 28, h2: 19, h3: 15, body: 14, caption: 10 },
  margin: 72,
  leading: 1.65,
  radius: 8,
};

const COMPANY = '範例科技股份有限公司';

const social = '#2b6cb0';
const governance = '#7c5cbf';

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
  fontWeight: 700,
  lineHeight: 1.25,
  letterSpacing: '-0.01em',
  margin: '0 0 14px',
};

const h2: CSSProperties = {
  fontFamily: 'var(--od-font-heading)',
  fontSize: 'var(--od-size-h2)',
  fontWeight: 700,
  lineHeight: 1.35,
  margin: '24px 0 8px',
};

const body: CSSProperties = { margin: '0 0 10px', textAlign: 'justify' };

const SectionNo = ({ no, label, color }: { no: string; label: string; color?: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        borderRadius: 'var(--od-radius)',
        background: color ?? 'var(--od-accent)',
        color: '#ffffff',
        fontFamily: 'var(--od-font-heading)',
        fontSize: 20,
        fontWeight: 700,
      }}
    >
      {no}
    </span>
    <span
      style={{
        fontFamily: 'var(--od-font-heading)',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.14em',
        color: 'var(--od-muted)',
      }}
    >
      {label}
    </span>
  </div>
);

const Stat = ({
  value,
  unit,
  label,
  delta,
}: {
  value: string;
  unit?: string;
  label: string;
  delta?: string;
}) => (
  <div
    style={{
      flex: 1,
      border: '1px solid var(--od-rule)',
      borderRadius: 'var(--od-radius)',
      padding: '14px 16px',
    }}
  >
    <div
      style={{
        fontFamily: 'var(--od-font-heading)',
        fontSize: 30,
        fontWeight: 700,
        color: 'var(--od-accent)',
        lineHeight: 1.1,
      }}
    >
      {value}
      {unit && <span style={{ fontSize: 14, marginLeft: 3 }}>{unit}</span>}
    </div>
    <div style={{ fontSize: 12, marginTop: 6 }}>{label}</div>
    {delta && (
      <div style={{ fontSize: 'var(--od-size-caption)', color: 'var(--od-muted)', marginTop: 2 }}>
        {delta}
      </div>
    )}
  </div>
);

const Progress = ({ label, pct, note }: { label: string; pct: number; note?: string }) => (
  <div style={{ marginBottom: 12 }}>
    <div
      style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}
    >
      <span>{label}</span>
      <span style={{ color: 'var(--od-muted)' }}>{note ?? `${pct}%`}</span>
    </div>
    <div style={{ height: 6, borderRadius: 3, background: 'var(--od-rule)', overflow: 'hidden' }}>
      <div
        style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: 'var(--od-accent)' }}
      />
    </div>
  </div>
);

const Th = ({ children, width }: { children: ReactNode; width?: number }) => (
  <th
    style={{
      width,
      textAlign: 'left',
      fontFamily: 'var(--od-font-heading)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.06em',
      color: 'var(--od-muted)',
      borderBottom: '1px solid var(--od-rule)',
      padding: '0 8px 6px',
    }}
  >
    {children}
  </th>
);

const Td = ({ children, mono }: { children: ReactNode; mono?: boolean }) => (
  <td
    style={{
      fontSize: 12,
      fontFamily: mono ? 'var(--od-font-mono)' : undefined,
      padding: '7px 8px',
      borderBottom: '1px solid var(--od-rule)',
      verticalAlign: 'top',
    }}
  >
    {children}
  </td>
);

const Footer = () => {
  const n = useDocPageNumber();
  const total = useDocPageCount();
  return (
    <div
      style={{
        position: 'absolute',
        left: 'var(--od-margin)',
        right: 'var(--od-margin)',
        bottom: 36,
        paddingTop: 8,
        borderTop: '1px solid var(--od-rule)',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 'var(--od-size-caption)',
        color: 'var(--od-muted)',
      }}
    >
      <span>{COMPANY}　2025 永續報告書</span>
      <span>
        {n} / {total}
      </span>
    </div>
  );
};

const Cover: DocPage = () => (
  <div style={{ ...page, padding: 0 }}>
    <div
      style={{
        height: 372,
        background: 'var(--od-accent)',
        color: '#ffffff',
        padding: 'var(--od-margin)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--od-font-heading)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.2em',
          opacity: 0.85,
        }}
      >
        SUSTAINABILITY REPORT
      </div>
      <div
        style={{
          fontFamily: 'var(--od-font-heading)',
          fontSize: 'var(--od-size-title)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginTop: 6,
        }}
      >
        2025
      </div>
    </div>

    <div style={{ padding: 'var(--od-margin)' }}>
      <div style={{ ...h1, marginBottom: 6 }}>{COMPANY}</div>
      <div style={{ ...h1, fontSize: 22, fontWeight: 400, color: 'var(--od-muted)' }}>
        永續報告書
      </div>

      <div
        style={{
          border: '1px solid var(--od-rule)',
          borderRadius: 'var(--od-radius)',
          padding: '8px 12px',
          fontSize: 'var(--od-size-caption)',
          color: 'var(--od-muted)',
          marginTop: 20,
        }}
      >
        【格式範例】公司名稱、財務與環境數據均為虛構，僅供版面示範
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
        <Stat
          value="38.2"
          unit="%"
          label="再生能源使用比例（合併，2025）"
          delta="較 2024 年 +9.4 個百分點"
        />
        <Stat
          value="12,480"
          unit="tCO₂e"
          label="範疇一＋二排放量（合併，2025）"
          delta="較 2023 基準年 −18.6%"
        />
        <Stat value="0.42" label="失能傷害頻率 FR（全廠，2025）" delta="較 2024 年 −0.11" />
      </div>

      <div style={{ marginTop: 28, fontSize: 12, color: 'var(--od-muted)', lineHeight: 1.7 }}>
        報告期間：2025 年 1 月 1 日至 12 月 31 日
        <br />
        編製依據：GRI 準則 2021、SASB 電子設備製造業指標
        <br />
        發行日期：中華民國 115 年 6 月
      </div>
    </div>
  </div>
);

const Body = flow(
  <>
    <SectionNo no="01" label="ENVIRONMENT ・ 環境" />
    <h1 style={h1}>氣候治理與減碳路徑</h1>
    <p style={body}>
      本公司以 2023 年為基準年，設定 2030 年範疇一與範疇二排放較基準年減少 42%
      的目標，並於董事會下設永續發展委員會，每季檢視減碳專案進度與資本支出配置。減碳路徑以三項槓桿為主：製程能效改善、綠電採購，以及設備汰換週期的提前。
    </p>

    <h2 style={h2}>年度目標達成情形</h2>
    <Progress label="再生能源使用比例（2025 目標 40%）" pct={96} note="38.2% / 40%" />
    <Progress label="範疇一＋二減量（2025 目標 −20%）" pct={93} note="−18.6% / −20%" />
    <Progress label="製程用水回收率（2025 目標 85%）" pct={78} note="66.3% / 85%" />
    <p style={{ ...body, fontSize: 12, color: 'var(--od-muted)' }}>
      用水回收率未達標，主因為第二廠區回收系統於 2025 年第三季才完成調機。2026 年目標維持
      85%，不下修。
    </p>

    <h2 style={h2}>能源與排放盤查</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <Th>項目</Th>
          <Th width={96}>2023（基準年）</Th>
          <Th width={80}>2024</Th>
          <Th width={80}>2025</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>範疇一排放（tCO₂e）</Td>
          <Td mono>3,120</Td>
          <Td mono>2,905</Td>
          <Td mono>2,640</Td>
        </tr>
        <tr>
          <Td>範疇二排放（tCO₂e，市場基礎）</Td>
          <Td mono>12,220</Td>
          <Td mono>11,340</Td>
          <Td mono>9,840</Td>
        </tr>
        <tr>
          <Td>總用電量（千度）</Td>
          <Td mono>24,600</Td>
          <Td mono>24,180</Td>
          <Td mono>23,510</Td>
        </tr>
        <tr>
          <Td>再生能源占比（%）</Td>
          <Td mono>12.4</Td>
          <Td mono>28.8</Td>
          <Td mono>38.2</Td>
        </tr>
      </tbody>
    </table>
    <div
      style={{
        fontSize: 'var(--od-size-caption)',
        color: 'var(--od-muted)',
        margin: '6px 0 0',
      }}
    >
      盤查邊界為合併報表範圍內之三處生產廠區，不含租賃辦公室。排放係數採用環境部 2025 年公告值。
    </div>

    <SectionNo no="02" label="SOCIAL ・ 社會" color={social} />
    <h1 style={h1}>職業安全與人才發展</h1>
    <p style={body}>
      2025 年全廠失能傷害頻率（FR）為 0.42，較前一年下降 0.11；失能傷害嚴重率（SR）為
      8，無重大職災與死亡案件。年度共辦理安全衛生訓練 62 場次，覆蓋全體現場人員與承攬商。
    </p>

    <h2 style={h2}>員工結構（2025 年底）</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <Th>類別</Th>
          <Th width={90}>人數</Th>
          <Th width={90}>女性占比</Th>
          <Th width={110}>平均年資</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>主管職</Td>
          <Td mono>86</Td>
          <Td mono>31.4%</Td>
          <Td mono>9.2 年</Td>
        </tr>
        <tr>
          <Td>研發與工程</Td>
          <Td mono>412</Td>
          <Td mono>26.7%</Td>
          <Td mono>5.8 年</Td>
        </tr>
        <tr>
          <Td>生產現場</Td>
          <Td mono>735</Td>
          <Td mono>48.2%</Td>
          <Td mono>6.4 年</Td>
        </tr>
        <tr>
          <Td>行政與其他</Td>
          <Td mono>158</Td>
          <Td mono>62.0%</Td>
          <Td mono>7.1 年</Td>
        </tr>
      </tbody>
    </table>

    <SectionNo no="03" label="GOVERNANCE ・ 治理" color={governance} />
    <h1 style={h1}>董事會運作與誠信經營</h1>
    <p style={body}>
      董事會置董事 9 席，其中獨立董事 3 席，女性董事 2 席。2025 年共召開 6 次董事會， 平均出席率
      94.4%。審計委員會、薪資報酬委員會與永續發展委員會均由獨立董事召集。
    </p>
    <p style={body}>
      年度內未發生違反誠信經營或反貪腐相關法令之情事；檢舉管道共受理案件 4
      件，均已完成調查並結案，其中 1 件涉及採購流程缺失，已修訂內部控制程序。
    </p>

    <h2 style={h2}>GRI 準則對照（節錄）</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <Th width={92}>準則</Th>
          <Th>揭露項目</Th>
          <Th width={70}>對應頁碼</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td mono>2-9</Td>
          <Td>治理結構及組成</Td>
          <Td mono>P.3</Td>
        </tr>
        <tr>
          <Td mono>302-1</Td>
          <Td>組織內部能源消耗量</Td>
          <Td mono>P.2</Td>
        </tr>
        <tr>
          <Td mono>305-1</Td>
          <Td>直接（範疇一）溫室氣體排放</Td>
          <Td mono>P.2</Td>
        </tr>
        <tr>
          <Td mono>305-2</Td>
          <Td>能源間接（範疇二）溫室氣體排放</Td>
          <Td mono>P.2</Td>
        </tr>
        <tr>
          <Td mono>403-9</Td>
          <Td>職業傷害</Td>
          <Td mono>P.3</Td>
        </tr>
        <tr>
          <Td mono>405-1</Td>
          <Td>治理機構與員工的多元化</Td>
          <Td mono>P.3</Td>
        </tr>
      </tbody>
    </table>
  </>,
  { footer: Footer, padding: 72 },
);

export const meta: DocMeta = {
  title: '範例科技 2025 永續報告書（摘要）',
  subtitle: 'ESG 報告書格式範例',
  author: '範例科技股份有限公司',
  pageSize: 'A4',
  orientation: 'portrait',
  theme: 'tw-esg-report',
  createdAt: '2026-08-16T02:20:00.000Z',
};

export default [Cover, Body] satisfies DocEntry[];
