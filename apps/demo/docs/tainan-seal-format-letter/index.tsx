import type { DesignSystem, DocMeta, DocPage } from '@open-document/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: {
    bg: '#ffffff',
    text: '#000000',
    muted: '#000000',
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
  leading: 1.78,
  radius: 0,
};

// 原件是 595.3 × 841.9 pt 的 A4。每個區塊的座標、字級、行距都直接抄自 PDF 的
// pt 值，這個函式把它們換算成頁面用的 CSS px（96 / 72 dpi）。
const pt = (v: number) => (v * 4) / 3;

const page: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: 'var(--od-bg)',
  color: 'var(--od-text)',
  fontFamily: 'var(--od-font-body)',
};

// 標楷體的 ascent + descent 比 em box 高，字符盒頂端會落在行盒頂端之上約
// 0.19em。PDF 的 top 量的是 ascent 線，補回這段才會對齊原件。
const ASCENT_GAP = 0.19;

type BlockProps = {
  /** 原件的 x0（pt） */
  x: number;
  /** 原件的 top（pt） */
  y: number;
  /** 字級（pt） */
  size: number;
  /** 行距（pt）；單行區塊等於字級 */
  leading?: number;
  /** 行寬（pt）。半形與全形混排時字數乘字級會失準，所以直接給寬度 */
  w?: number;
  /** 懸掛縮排（pt） */
  indent?: number;
  children: ReactNode;
};

/**
 * CSS 的行盒把多出來的行距平均分到上下，所以行距大於字級時要把半個 leading
 * 補回去，第一行才會落在原位。
 */
const Block = ({ x, y, size, leading, w, indent, children }: BlockProps) => {
  const lead = leading ?? size;
  return (
    <div
      style={{
        position: 'absolute',
        left: pt(x),
        top: pt(y) - (pt(lead) - pt(size)) / 2 + ASCENT_GAP * pt(size),
        width: w ? pt(w) : undefined,
        fontSize: pt(size),
        lineHeight: pt(lead) / pt(size),
        ...(indent ? { paddingLeft: pt(indent), textIndent: pt(-indent) } : null),
      }}
    >
      {children}
    </div>
  );
};

/** 左側裝訂線：89 個點，間距 8.25pt，中間嵌「裝」「訂」「線」。 */
const BindingLine = () => (
  <>
    <div
      style={{
        position: 'absolute',
        left: pt(42.15),
        top: pt(42.9),
        width: 1,
        height: pt(793.65 - 42.9),
        backgroundImage:
          'repeating-linear-gradient(to bottom, var(--od-text) 0 1px, transparent 1px ' +
          `${pt(8.25)}px)`,
      }}
    />
    {[
      { text: '裝', y: 290.4 },
      { text: '訂', y: 430.65 },
      { text: '線', y: 570.9 },
    ].map((m) => (
      <div
        key={m.text}
        style={{
          position: 'absolute',
          left: pt(40.28),
          top: pt(m.y),
          fontSize: pt(7.5),
          lineHeight: 1,
          background: 'var(--od-bg)',
          padding: `${pt(2)}px 0`,
        }}
      >
        {m.text}
      </div>
    ))}
  </>
);

const PageNo = ({ n }: { n: number }) => (
  <Block x={244.35} y={806.3} size={10.01}>
    第 {n} 頁，共 2 頁
  </Block>
);

const First: DocPage = () => (
  <div style={page}>
    <BindingLine />

    <Block x={408.45} y={34.4} size={10.01}>
      檔　　號:
    </Block>
    <Block x={408.45} y={44.4} size={10.01}>
      保存年限:
    </Block>

    <Block x={204.15} y={76.4} size={19.99}>
      臺南市政府秘書處　函
    </Block>

    <Block x={302.85} y={105.9} size={12} leading={15} w={216}>
      地址：708201臺南市安平區永華路2段6號
      <br />
      承辦人：林郁庭
      <br />
      電話：06-3901104
      <br />
      傳真：06-2982354
      <br />
      {/* 原件在網域的第二個點之後折行，這裡標出同一個斷點 */}
      電子信箱：yutinglin901@mail.tainan.
      <wbr />
      gov.tw
    </Block>

    <Block x={70.35} y={208.9} size={16.01}>
      受文者：臺南市政府秘書處
    </Block>

    <Block x={70.35} y={240.9} size={12} leading={15}>
      發文日期：中華民國110年12月23日
      <br />
      發文字號：南市秘文字第1101558063號
      <br />
      速別：普通件
      <br />
      密等及解密條件或保密期限：
      <br />
      附件：如說明 (1558063A50_ATTCH3.pdf、1558063A50_ATTCH2.jpg)
    </Block>

    <Block x={70.35} y={328.1} size={16.01} leading={28.5} w={450} indent={49.5}>
      主旨：邇來本府偶有獎狀、聘書、感謝狀、證書等是類文書出現格式錯誤之情形，檢附用印格式供各局處參考，請查照並轉知所屬。
    </Block>

    <Block x={70.35} y={413.6} size={16.01} leading={28.5}>
      說明：
    </Block>

    <Block x={82.35} y={442.1} size={16.01} leading={28.5} w={432.5} indent={32.03}>
      一、本府獎狀、聘書、感謝狀、證書等是類文書之內容應以中英文呈現，字體大小請依版面自行調整，並請預留蓋用大印之空間；如需掛上發文字號，則應為「府○○字第0000000000號」。
    </Block>

    <Block x={82.35} y={556.1} size={16.01} leading={28.5} w={432.5} indent={32.03}>
      二、獎狀、聘書及感謝狀是類文書，簽奉一層核准後（免會本處文書科），請檢附簽（影本）逕向本處文書科用印；另提醒勿使用光滑面紙張，以免油墨暈開；局處如需借用本府大印及市長中英文簽字章拓模時，須會辦本處文書科，套印完成後，應連同拓模及誤繕之文書一併檢還存參及繳銷。
    </Block>

    <Block x={82.35} y={727.1} size={16.01} leading={28.5} w={432.5} indent={32.03}>
      三、大印顏色為紅色，尺寸為7.5*7.5公分，套印時請騎年蓋月，避免蓋於「中華民國」之上，詳如附件一。
    </Block>

    <PageNo n={1} />
  </div>
);

const Second: DocPage = () => (
  <div style={page}>
    <BindingLine />

    <Block x={82.35} y={68.6} size={16.01} leading={28.5} w={432.5} indent={32.03}>
      四、各局處倘使用特殊格式之證書，請將該證書原稿附於簽後，併陳一層長官核定。
    </Block>

    {/* 第二行的「180」是半形，比同樣字數的全形行窄，行寬要跟著放寬才會斷在原處 */}
    <Block x={82.35} y={125.6} size={16.01} leading={28.5} w={441} indent={32.03}>
      五、本處僅提供少量空白獎狀、聘書予各局處使用，如需大量使用時，請依樣式（如附件二）自行印製，紙張建議180磅象牙卡。
    </Block>

    <Block x={82.35} y={211.1} size={16.01} leading={28.5} w={432.5} indent={32.03}>
      六、旨揭獎狀、聘書、證書是類文書格式，請至本處下載專區─文檔業務下載專區或公文管理系統─下載區下載。
    </Block>

    <Block x={70.35} y={270.9} size={12} leading={15} w={456} indent={36}>
      正本：臺南市政府人事處、臺南市政府主計處、臺南市政府法制處、臺南市政府政風處、臺南市政府研究發展考核委員會、臺南市政府秘書處、臺南市政府新聞及國際關係處、臺南市政府原住民族事務委員會、臺南市政府客家事務委員會、臺南市政府工務局、臺南市政府文化局、臺南市政府水利局、臺南市政府民政局、臺南市政府交通局、臺南市政府地政局、臺南市政府社會局、臺南市政府消防局、臺南市政府教育局、臺南市政府都市發展局、臺南市政府勞工局、臺南市政府財政稅務局、臺南市政府經濟發展局、臺南市政府農業局、臺南市政府衛生局、臺南市政府環境保護局、臺南市政府警察局、臺南市政府觀光旅遊局
    </Block>

    <Block x={70.35} y={390.9} size={12} leading={15}>
      副本：臺南市政府秘書處文書科
    </Block>

    <PageNo n={2} />
  </div>
);

export const meta: DocMeta = {
  title: '南市秘文字第1101558063號（版面重製）',
  subtitle: '臺南市政府秘書處函 — 獎狀、聘書、感謝狀、證書用印格式',
  author: '版面重製自原始 PDF，未含印信與章戳',
  pageSize: 'A4',
  orientation: 'portrait',
  theme: 'tw-official',
  createdAt: '2026-08-16T03:00:00.000Z',
};

export default [First, Second] satisfies DocPage[];
