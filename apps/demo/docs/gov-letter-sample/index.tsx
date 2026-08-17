import {
  type DesignSystem,
  type DocEntry,
  type DocMeta,
  flow,
  useDocPageCount,
  useDocPageNumber,
} from '@open-document/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: {
    bg: '#ffffff',
    text: '#000000',
    muted: '#444444',
    accent: '#000000',
    rule: '#000000',
  },
  fonts: {
    heading: '"DFKai-SB", "BiauKai", "標楷體", "TW-Kai", "Kaiti TC", serif',
    body: '"DFKai-SB", "BiauKai", "標楷體", "TW-Kai", "Kaiti TC", serif',
    mono: 'ui-monospace, "SF Mono", Menlo, monospace',
  },
  typeScale: { title: 27, h1: 21, h2: 21, h3: 21, body: 21, caption: 16 },
  margin: 94,
  leading: 1.5,
  radius: 0,
};

const ArchiveBox = ({ code, keep }: { code: string; keep: string }) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
    <table
      style={{ borderCollapse: 'collapse', fontSize: 'var(--od-size-caption)', lineHeight: 1.6 }}
    >
      <tbody>
        <tr>
          <td style={{ border: '1px solid var(--od-rule)', padding: '2px 8px' }}>檔　　號</td>
          <td style={{ border: '1px solid var(--od-rule)', padding: '2px 8px', minWidth: 150 }}>
            {code}
          </td>
        </tr>
        <tr>
          <td style={{ border: '1px solid var(--od-rule)', padding: '2px 8px' }}>保存年限</td>
          <td style={{ border: '1px solid var(--od-rule)', padding: '2px 8px' }}>{keep}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Letterhead = ({ agency, kind }: { agency: string; kind: string }) => (
  <h1
    style={{
      fontFamily: 'var(--od-font-heading)',
      fontSize: 'var(--od-size-title)',
      fontWeight: 400,
      textAlign: 'center',
      letterSpacing: '0.5em',
      textIndent: '0.5em',
      margin: '0 0 16px',
    }}
  >
    {agency} {kind}
  </h1>
);

const Contact = ({ lines }: { lines: string[] }) => (
  <div
    style={{
      fontSize: 'var(--od-size-caption)',
      lineHeight: 1.7,
      marginLeft: 'auto',
      width: 'fit-content',
      marginBottom: 14,
    }}
  >
    {lines.map((line) => (
      <div key={line}>{line}</div>
    ))}
  </div>
);

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 4, marginBottom: 2 }}>
    <span style={{ flex: 'none' }}>{label}：</span>
    <span>{children}</span>
  </div>
);

// 段名寬度：「主旨：」「說明：」「辦法：」皆為 3 個字。續行與後續項目對齊其後。
const LABEL = '3em';

const Section = ({ name, children }: { name: string; children: ReactNode }) => (
  <div style={{ display: 'flex', marginTop: 18 }}>
    <span style={{ flex: 'none', width: LABEL }}>{name}：</span>
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

/** 段名與第一個條列項同列——公文的「說明：一、…」就是這樣起頭。 */
const SectionOpen = ({ name, no, children }: { name: string; no: string; children: ReactNode }) => (
  <div style={{ display: 'flex', marginTop: 18 }}>
    <span style={{ flex: 'none', width: LABEL }}>{name}：</span>
    <span style={{ flex: 'none', width: '2.6em' }}>{no}</span>
    <span style={{ flex: 1 }}>{children}</span>
  </div>
);

/**
 * 後續項目各自成為獨立區塊，flow() 才能在項目之間換頁——整段包在一起會超出頁面。
 */
const Item = ({ no, children }: { no: string; children: ReactNode }) => (
  <div style={{ display: 'flex', marginBottom: 2, paddingLeft: LABEL }}>
    <span style={{ flex: 'none', width: '2.6em' }}>{no}</span>
    <span style={{ flex: 1 }}>{children}</span>
  </div>
);

const SubItem = ({ no, children }: { no: string; children: ReactNode }) => (
  <div style={{ display: 'flex', marginBottom: 2, paddingLeft: `calc(${LABEL} + 2.6em)` }}>
    <span style={{ flex: 'none', width: '2.8em' }}>{no}</span>
    <span style={{ flex: 1 }}>{children}</span>
  </div>
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
        bottom: 44,
        textAlign: 'center',
        fontSize: 'var(--od-size-caption)',
      }}
    >
      第 {n} 頁，共 {total} 頁
    </div>
  );
};

const sampleNotice: CSSProperties = {
  border: '1px solid var(--od-rule)',
  padding: '6px 10px',
  fontSize: 'var(--od-size-caption)',
  textAlign: 'center',
  marginBottom: 14,
};

// 抬頭與本文屬於同一份連續內容——公文的第一頁本來就從機關名稱一路寫到主旨。
const Letter = flow(
  <>
    <div style={sampleNotice}>【格式範例】本文件為公文格式示範，非真實公文</div>
    <ArchiveBox code="範例字第0000000號" keep="10年" />
    <Letterhead agency="範例縣政府" kind="函" />
    <Contact
      lines={[
        '地址：000範例縣範例市範例路1號',
        '承辦人：王小明',
        '電話：(00)0000-0000　分機123',
        '傳真：(00)0000-0001',
        '電子信箱：sample@example.gov.tw',
      ]}
    />

    <div>
      <Field label="受文者">範例縣各鄉鎮市公所</Field>
    </div>
    <div style={{ height: 10 }} />
    <div>
      <Field label="發文日期">中華民國115年8月16日</Field>
    </div>
    <div>
      <Field label="發文字號">範例府文字第1150000000號</Field>
    </div>
    <div>
      <Field label="速別">普通件</Field>
    </div>
    <div>
      <Field label="密等及解密條件或保密期限">普通</Field>
    </div>
    <div>
      <Field label="附件">申請表1份、作業流程圖1份</Field>
    </div>

    <Section name="主旨">
      檢送本府「範例縣公文電子化作業要點」修正草案1份，並訂於115年10月1日起實施，請查照並依說明事項辦理。
    </Section>

    <SectionOpen name="說明" no="一、">
      依本府115年度施政計畫及本府115年7月20日範例府文字第1150000000號函辦理。
    </SectionOpen>
    <Item no="二、">本次修正重點如下：</Item>
    <SubItem no="(一)">公文簽核全面改採電子方式，紙本僅於法令另有規定時併行。</SubItem>
    <SubItem no="(二)">增訂附件電子檔命名規則，統一為「發文字號＿附件序號＿名稱」。</SubItem>
    <SubItem no="(三)">刪除原第五點有關紙本歸檔份數之規定。</SubItem>
    <Item no="三、">各機關（單位）配合事項：</Item>
    <SubItem no="(一)">請於文到後30日內完成內部作業程序調整並函復本府。</SubItem>
    <SubItem no="(二)">
      請指定文書作業聯絡人1名，於115年9月15日前將姓名及聯絡方式報本府彙整。
    </SubItem>
    <SubItem no="(三)">既有未結案之紙本公文，依原程序辦理至結案為止，不溯及適用本要點。</SubItem>
    <Item no="四、">
      本府將於115年9月辦理教育訓練2場次，時間及地點另行通知；請各機關指派實際承辦人員參加。
    </Item>
    <Item no="五、">本要點實施後，如有窒礙難行之處，請敘明具體事實及建議方案函送本府研議。</Item>

    <SectionOpen name="辦法" no="一、">
      請依說明三所列事項辦理，並副知本府文書科。
    </SectionOpen>
    <Item no="二、">
      執行過程如有疑義，請逕洽本府承辦人；涉及跨機關協調事項者，由本府另行召開會議研商。
    </Item>

    <div style={{ marginTop: 22 }}>
      <div>正本：範例縣各鄉鎮市公所、本府各局處</div>
      <div>副本：本府文書科、本府資訊科（均含附件）</div>
    </div>

    <div style={{ marginTop: 28, textAlign: 'center', letterSpacing: '0.2em' }}>縣長　○　○　○</div>
  </>,
  { footer: Footer, padding: 94 },
);

export const meta: DocMeta = {
  title: '範例縣政府函（公文格式範例）',
  subtitle: '公文電子化作業要點修正草案',
  author: '範例縣政府',
  pageSize: 'A4',
  orientation: 'portrait',
  theme: 'tw-official',
  createdAt: '2026-08-16T01:21:35.666Z',
};

export default [Letter] satisfies DocEntry[];
