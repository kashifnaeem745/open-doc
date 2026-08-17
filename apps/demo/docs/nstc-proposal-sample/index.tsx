import {
  type DesignSystem,
  type DocEntry,
  type DocMeta,
  type DocPage,
  flow,
  useDocPageNumber,
} from '@open-document/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: {
    bg: '#ffffff',
    text: '#1a1a1a',
    muted: '#5a6472',
    accent: '#1b3a6b',
    rule: '#d4d9e0',
  },
  fonts: {
    heading: '"Noto Sans TC", "PingFang TC", "Heiti TC", "Microsoft JhengHei", sans-serif',
    body: '"Noto Serif TC", "Songti TC", "PMingLiU", serif',
    mono: 'ui-monospace, "SF Mono", Menlo, monospace',
  },
  typeScale: { title: 34, h1: 22, h2: 18, h3: 16, body: 16, caption: 12 },
  margin: 76,
  leading: 1.75,
  radius: 2,
};

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
  fontWeight: 600,
  color: 'var(--od-accent)',
  lineHeight: 1.4,
  margin: '0 0 12px',
};

const h2: CSSProperties = {
  fontFamily: 'var(--od-font-heading)',
  fontSize: 'var(--od-size-h2)',
  fontWeight: 600,
  lineHeight: 1.45,
  margin: '22px 0 8px',
};

const h3: CSSProperties = {
  fontFamily: 'var(--od-font-heading)',
  fontSize: 'var(--od-size-h3)',
  fontWeight: 600,
  lineHeight: 1.5,
  margin: '16px 0 6px',
};

const body: CSSProperties = { margin: '0 0 10px', textAlign: 'justify' };

const CoverField = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      display: 'flex',
      gap: 12,
      padding: '7px 0',
      borderBottom: '1px solid var(--od-rule)',
    }}
  >
    <span
      style={{
        flex: 'none',
        width: 128,
        fontFamily: 'var(--od-font-heading)',
        fontSize: 14,
        color: 'var(--od-muted)',
      }}
    >
      {label}
    </span>
    <span style={{ flex: 1 }}>{value}</span>
  </div>
);

const Th = ({ children }: { children: ReactNode }) => (
  <th
    style={{
      textAlign: 'left',
      fontFamily: 'var(--od-font-heading)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--od-accent)',
      borderBottom: '1.5px solid var(--od-accent)',
      padding: '0 10px 6px',
    }}
  >
    {children}
  </th>
);

const Td = ({ children }: { children: ReactNode }) => (
  <td
    style={{
      fontSize: 14,
      padding: '7px 10px',
      borderBottom: '1px solid var(--od-rule)',
      verticalAlign: 'top',
    }}
  >
    {children}
  </td>
);

const Caption = ({ no, children }: { no: string; children: ReactNode }) => (
  <div
    style={{
      fontFamily: 'var(--od-font-heading)',
      fontSize: 'var(--od-size-caption)',
      color: 'var(--od-muted)',
      textAlign: 'center',
      margin: '6px 0 14px',
    }}
  >
    {no}　{children}
  </div>
);

const Ref = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: 1.6,
      paddingLeft: '2em',
      textIndent: '-2em',
      marginBottom: 6,
    }}
  >
    {children}
  </div>
);

const Footer = () => {
  const n = useDocPageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 'var(--od-margin)',
        right: 'var(--od-margin)',
        bottom: 40,
        paddingTop: 8,
        borderTop: '1px solid var(--od-rule)',
        textAlign: 'center',
        fontFamily: 'var(--od-font-heading)',
        fontSize: 'var(--od-size-caption)',
        color: 'var(--od-muted)',
      }}
    >
      - {n} -
    </div>
  );
};

const Cover: DocPage = () => (
  <div style={page}>
    <div
      style={{
        border: '1px solid var(--od-rule)',
        borderRadius: 'var(--od-radius)',
        padding: '6px 12px',
        fontSize: 'var(--od-size-caption)',
        color: 'var(--od-muted)',
        textAlign: 'center',
        marginBottom: 22,
      }}
    >
      【格式範例】本文件示範計畫書版面，計畫編號與人員均為虛構
    </div>

    <div
      style={{
        fontFamily: 'var(--od-font-heading)',
        fontSize: 15,
        color: 'var(--od-muted)',
        textAlign: 'center',
        letterSpacing: '0.1em',
      }}
    >
      國家科學及技術委員會專題研究計畫
    </div>
    <div
      style={{ height: 2, background: 'var(--od-accent)', margin: '14px auto 46px', width: 88 }}
    />

    <div
      style={{
        fontFamily: 'var(--od-font-heading)',
        fontSize: 'var(--od-size-title)',
        fontWeight: 600,
        lineHeight: 1.45,
        textAlign: 'center',
        marginBottom: 12,
      }}
    >
      生成式 AI 於繁體中文門診病歷
      <br />
      結構化之標註策略研究
    </div>
    <div
      style={{
        textAlign: 'center',
        color: 'var(--od-muted)',
        fontSize: 14,
        marginBottom: 46,
      }}
    >
      Annotation Strategies for Structuring Traditional Chinese Clinical Notes
    </div>

    <CoverField label="計畫類別" value="■ 個別型計畫　□ 整合型計畫" />
    <CoverField label="計畫編號" value="NSTC 000-0000-X-000-000-" />
    <CoverField label="執行期間" value="中華民國115年8月1日至116年7月31日" />
    <CoverField label="執行機構" value="範例大學資訊工程學系" />
    <CoverField label="計畫主持人" value="王小明 副教授" />
    <CoverField label="共同主持人" value="李小華 助理教授（範例大學醫學資訊研究所）" />
    <CoverField label="計畫參與人員" value="碩士級專任助理 1 名、兼任研究助理 2 名" />
    <CoverField label="報告類型" value="精簡報告" />

    <div
      style={{
        position: 'absolute',
        left: 'var(--od-margin)',
        right: 'var(--od-margin)',
        bottom: 76,
        textAlign: 'center',
        fontFamily: 'var(--od-font-heading)',
        fontSize: 15,
      }}
    >
      中華民國 115 年 8 月 16 日
    </div>
  </div>
);

const Body = flow(
  <>
    <h1 style={h1}>一、研究計畫之背景及目的</h1>
    <p style={body}>
      我國醫療院所的電子病歷普及率雖高，但門診紀錄仍以自由文字為主。要把這些文字轉成可供研究與品質管理使用的結構化資料，關鍵在於命名實體辨識（NER）與關聯抽取的準確度。現有的中文臨床
      NLP
      模型多以簡體語料訓練，直接套用於繁體門診紀錄時，因用語、縮寫與藥品名稱習慣不同，實體召回率通常下降兩成以上。
    </p>

    <h2 style={h2}>(一) 研究問題</h2>
    <p style={body}>
      標註成本是這類研究最現實的限制。全人工標註品質高，但一份門診紀錄平均需要臨床背景標註者 6 至 9
      分鐘；改用規則或大型語言模型產生弱監督標註雖然幾乎沒有邊際成本，卻會引入系統性錯誤，且錯誤集中在最需要辨識的罕見實體上。
    </p>
    <p style={body}>
      本計畫的核心問題是：在固定標註預算下，人工標註與弱監督標註應如何配置，才能使下游結構化任務的表現最佳。
    </p>

    <h2 style={h2}>(二) 研究目的</h2>
    <p style={body}>
      1. 建立一套適用於繁體中文門診紀錄的去識別化與標註流程，並公開標註準則。
      <br />
      2. 量化人工／弱監督標註比例對實體辨識與關聯抽取表現的影響。
      <br />
      3. 提出在給定預算下的標註配置建議，供後續臨床 NLP 研究參考。
    </p>

    <h1 style={{ ...h1, marginTop: 26 }}>二、研究方法與進行步驟</h1>

    <h2 style={h2}>(一) 語料與去識別化</h2>
    <p style={body}>
      與合作醫院簽訂資料使用協議後，取得三個科別各 2,000
      筆門診紀錄。去識別化採兩階段：先以規則移除結構化欄位中的個人識別資訊，再由兩位標註者獨立檢查自由文字段落。所有作業在院內環境完成，僅去識別化後的文本離開院區。
    </p>

    <h3 style={h3}>倫理審查</h3>
    <p style={body}>
      本計畫涉及人體研究資料，執行前將送合作醫院人體研究倫理審查委員會（IRB）審查，取得核可後始行啟動；核可文號將於期中報告補列。
    </p>

    <h2 style={h2}>(二) 標註準則與一致性</h2>
    <p style={body}>
      標註實體類型分為疾病、症狀、藥品、劑量、檢驗項目與時間表述六類。前 200
      筆由兩位標註者重複標註，以 Cohen's Kappa 檢驗一致性，未達 0.8
      者修訂準則後重跑，直到收斂才進入大量標註。
    </p>

    <h2 style={h2}>(三) 消融實驗設計</h2>
    <p style={body}>
      固定總標註預算為 600 人時，將人工標註比例設為 100%、70%、40%、10%
      四組，其餘以弱監督補足，各組訓練同一模型架構並在相同測試集上比較。測試集一律為全人工標註，避免評估本身被弱監督污染。
    </p>

    <h2 style={h2}>(四) 預期進度</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '4px 0 0' }}>
      <thead>
        <tr>
          <Th>期程</Th>
          <Th>工作項目</Th>
          <Th>預期產出</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>第 1–3 月</Td>
          <Td>IRB 送審、語料取得與去識別化流程建置</Td>
          <Td>去識別化語料 6,000 筆</Td>
        </tr>
        <tr>
          <Td>第 4–7 月</Td>
          <Td>標註準則制定、標註者訓練與一致性測試</Td>
          <Td>標註手冊、Kappa ≥ 0.8</Td>
        </tr>
        <tr>
          <Td>第 8–10 月</Td>
          <Td>模型訓練與標註比例消融實驗</Td>
          <Td>四組實驗結果與基線比較</Td>
        </tr>
        <tr>
          <Td>第 11–12 月</Td>
          <Td>成果整理、標註準則公開與論文撰寫</Td>
          <Td>研討會論文 1 篇、標註手冊釋出</Td>
        </tr>
      </tbody>
    </table>
    <Caption no="表 1">本計畫預期執行進度與產出</Caption>

    <h1 style={{ ...h1, marginTop: 26 }}>三、預期完成之工作項目及成果</h1>
    <p style={body}>
      預期產出繁體中文臨床 NER
      標註手冊一份、去識別化語料處理流程一套，以及標註預算配置建議。若消融實驗結果顯示弱監督在特定實體類型上表現穩定，該結論可直接降低後續同類研究的標註成本。
    </p>
    <p style={body}>
      本計畫不釋出原始病歷語料；公開項目限於標註準則、流程程式碼與實驗結果，以符合資料使用協議與個資保護要求。
    </p>

    <h1 style={{ ...h1, marginTop: 26 }}>四、參考文獻</h1>
    <Ref>
      林小華、陳大同（2024）。〈繁體中文臨床文本之命名實體辨識研究〉。《範例資訊學刊》，12(3)，45–68。
    </Ref>
    <Ref>張美玲（2023）。《醫療文本探勘：方法與應用》（第二版）。臺北：範例出版社。</Ref>
    <Ref>
      Sample, A., &amp; Example, B. (2023). Weak supervision for clinical entity recognition.
      <i>Journal of Placeholder Studies</i>, 8(2), 101–124.
    </Ref>
    <Ref>
      Placeholder, C., Demo, D., &amp; Mock, E. (2022). Annotation budget allocation in low-resource
      clinical NLP. <i>Proceedings of the Example Conference</i>, 337–349.
    </Ref>
  </>,
  { footer: Footer, padding: 76 },
);

export const meta: DocMeta = {
  title: '生成式 AI 於繁體中文門診病歷結構化之標註策略研究',
  subtitle: '國科會專題研究計畫書（格式範例）',
  author: '範例大學資訊工程學系',
  pageSize: 'A4',
  orientation: 'portrait',
  theme: 'nstc-proposal',
  createdAt: '2026-08-16T02:00:00.000Z',
};

export default [Cover, Body] satisfies DocEntry[];
