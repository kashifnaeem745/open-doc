import {
  type DesignSystem,
  type DocEntry,
  type DocMeta,
  type DocPage,
  flow,
  TableOfContents,
  useDocPageCount,
  useDocPageNumber,
} from '@open-document/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: {
    bg: '#ffffff',
    text: '#16181d',
    muted: '#6b7280',
    accent: '#1a73e8',
    rule: '#e4e7ec',
  },
  fonts: {
    heading:
      '-apple-system, BlinkMacSystemFont, "PingFang TC", "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "PingFang TC", "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif',
    mono: 'ui-monospace, "SF Mono", Menlo, monospace',
  },
  typeScale: { title: 40, h1: 26, h2: 19, h3: 15, body: 14, caption: 10 },
  margin: 76,
  leading: 1.7,
  radius: 6,
};

const warning = '#b06000';

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
  lineHeight: 1.3,
  fontWeight: 650,
  letterSpacing: '-0.01em',
  // Sections run continuously inside the flow, so the space above a section
  // opener is what tells the reader a new one started.
  margin: '40px 0 16px',
};

const h2: CSSProperties = {
  fontFamily: 'var(--od-font-heading)',
  fontSize: 'var(--od-size-h2)',
  lineHeight: 1.35,
  fontWeight: 600,
  margin: '28px 0 8px',
};

const p: CSSProperties = { margin: '0 0 12px' };

const caption: CSSProperties = {
  fontSize: 'var(--od-size-caption)',
  color: 'var(--od-muted)',
  margin: '6px 0 0',
};

const Footer = () => {
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
      <span>在 GCP 上部署安全的 MCP Server · Codelab 整理</span>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>
        {n} / {total}
      </span>
    </div>
  );
};

const Th = ({ children, width }: { children: ReactNode; width?: number | string }) => (
  <th
    style={{
      width,
      textAlign: 'left',
      fontFamily: 'var(--od-font-heading)',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.04em',
      color: 'var(--od-muted)',
      borderBottom: '1px solid var(--od-rule)',
      padding: '0 8px 6px',
    }}
  >
    {children}
  </th>
);

const Td = ({ children, mono = false }: { children: ReactNode; mono?: boolean }) => (
  <td
    style={{
      fontSize: 12,
      lineHeight: 1.55,
      padding: '6px 8px',
      borderBottom: '1px solid var(--od-rule)',
      fontFamily: mono ? 'var(--od-font-mono)' : undefined,
      verticalAlign: 'top',
    }}
  >
    {children}
  </td>
);

const Table = ({ children }: { children: ReactNode }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
    {children}
  </table>
);

const Code = ({ children }: { children: ReactNode }) => (
  <pre
    style={{
      fontFamily: 'var(--od-font-mono)',
      fontSize: 11,
      lineHeight: 1.6,
      background: '#f6f8fa',
      border: '1px solid var(--od-rule)',
      borderRadius: 'var(--od-radius)',
      padding: '10px 12px',
      margin: '0 0 12px',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
    }}
  >
    {children}
  </pre>
);

const Callout = ({
  title,
  tone = 'accent',
  children,
}: {
  title: string;
  tone?: 'accent' | 'warning';
  children: ReactNode;
}) => (
  <div
    style={{
      borderLeft: `3px solid ${tone === 'warning' ? warning : 'var(--od-accent)'}`,
      background: tone === 'warning' ? '#fdf6ec' : '#f2f7fd',
      padding: '10px 14px',
      borderRadius: 'var(--od-radius)',
      fontSize: 12,
      lineHeight: 1.6,
      margin: '0 0 12px',
    }}
  >
    <strong style={{ display: 'block', marginBottom: 2 }}>{title}</strong>
    {children}
  </div>
);

const Cover: DocPage = () => (
  <div
    style={{ ...page, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--od-accent)' }} />
      <span style={{ fontSize: 12, fontWeight: 600 }}>Google Cloud Codelab · 內容整理</span>
    </div>

    <div>
      <p
        style={{
          fontSize: 12,
          letterSpacing: '0.16em',
          color: 'var(--od-accent)',
          margin: '0 0 14px',
        }}
      >
        MCP SERVER · CLOUD RUN · GKE AUTOPILOT
      </p>
      <h1
        data-od-outline="skip"
        style={{ ...h1, fontSize: 'var(--od-size-title)', margin: '0 0 14px', maxWidth: 540 }}
      >
        在 Google Cloud 上部署安全的 MCP Server
      </h1>
      <p style={{ ...p, fontSize: 15, color: 'var(--od-muted)', maxWidth: 480 }}>
        從 FastMCP 開發、容器化，到 Cloud Run 與 GKE Autopilot 兩條部署路徑的身分驗證設計，最後接上
        Agent Platform 工具目錄。
      </p>
    </div>

    <div
      style={{
        display: 'flex',
        gap: 40,
        borderTop: '1px solid var(--od-rule)',
        paddingTop: 12,
        fontSize: 11,
        color: 'var(--od-muted)',
      }}
    >
      <div style={{ maxWidth: 300 }}>
        <div style={{ color: 'var(--od-text)', fontWeight: 600 }}>來源</div>
        codelabs.developers.google.com/secure-mcp-server-gcp
      </div>
      <div>
        <div style={{ color: 'var(--od-text)', fontWeight: 600 }}>整理日期</div>
        2026-08-15
      </div>
      <div>
        <div style={{ color: 'var(--od-text)', fontWeight: 600 }}>適用對象</div>
        平台／後端工程師
      </div>
    </div>
  </div>
);

const Contents: DocPage = () => (
  <div style={page}>
    <h1 style={h1} data-od-outline="skip">
      目錄
    </h1>
    <TableOfContents maxLevel={2} />
    <p style={{ ...p, marginTop: 20, fontSize: 12, color: 'var(--od-muted)' }}>
      本文是該 codelab 的重點整理與導讀，非逐字翻譯；實際指令與程式碼請以官方原文為準。
    </p>
    <Footer />
  </div>
);

const Body = flow(
  <>
    <h1 style={h1}>概觀與前置需求</h1>
    <p style={p}>
      這份 codelab 帶你把一個 MCP（Model Context Protocol）伺服器從本機開發推到 Google Cloud
      上，重點不在「跑起來」，而在<strong>兩種托管方式各自的身分驗證模型</strong>：Cloud Run 用 IAM
      加 OIDC ID token 擋在最前面，GKE 則用 Workload Identity 讓 Pod 不必帶任何金鑰檔就能呼叫 Google
      API。
    </p>

    <h2 style={h2}>完成後你會有</h2>
    <Table>
      <thead>
        <tr>
          <Th width={150}>產出</Th>
          <Th>說明</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>FastMCP 伺服器</Td>
          <Td>四個實際呼叫 Google Cloud 的工具，Streamable HTTP 傳輸、JSON-RPC 2.0</Td>
        </tr>
        <tr>
          <Td>容器映像</Td>
          <Td>多階段 Docker build，推送至 Artifact Registry</Td>
        </tr>
        <tr>
          <Td>Cloud Run 服務</Td>
          <Td>強制驗證（--no-allow-unauthenticated）＋ Google 代管 TLS</Td>
        </tr>
        <tr>
          <Td>GKE Autopilot 部署</Td>
          <Td>Workload Identity ＋ Gateway API ＋ 代管 SSL 憑證</Td>
        </tr>
        <tr>
          <Td>Agent Platform 註冊</Td>
          <Td>讓企業代理程式能動態發現這些工具</Td>
        </tr>
      </tbody>
    </Table>

    <h2 style={h2}>前置需求</h2>
    <Table>
      <thead>
        <tr>
          <Th width={150}>項目</Th>
          <Th>需求</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>GCP 專案</Td>
          <Td>
            已啟用計費；需開啟 Cloud Run、GKE、Vertex AI、Artifact Registry、Cloud
            Logging、Storage、Compute Engine、IAM 等 API
          </Td>
        </tr>
        <tr>
          <Td>本機工具</Td>
          <Td mono>gcloud CLI · Python 3.10+ · uv · Docker · kubectl</Td>
        </tr>
        <tr>
          <Td>本機憑證</Td>
          <Td mono>gcloud auth login · gcloud auth application-default login</Td>
        </tr>
      </tbody>
    </Table>

    <h1 style={h1}>整體架構</h1>
    <p style={p}>
      同一個容器映像會被送到兩個執行環境。差別只在「誰來擋門」與「Pod／服務怎麼拿到 Google Cloud
      的身分」。
    </p>

    <svg width={TEXT_WIDTH} height={286} role="img" aria-label="MCP Server 在 GCP 上的部署架構">
      <title>MCP Server 在 GCP 上的部署架構</title>
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,1 L7,4 L0,7 z" fill="#9aa0a6" />
        </marker>
      </defs>

      <rect x="0" y="20" width="150" height="56" rx="6" fill="#f1f3f4" />
      <text x="75" y="44" textAnchor="middle" fontSize="12" fill="#16181d">
        本機開發
      </text>
      <text x="75" y="62" textAnchor="middle" fontSize="10" fill="#6b7280">
        FastMCP · uv · ADC
      </text>

      <line x1="150" y1="48" x2="205" y2="48" stroke="#9aa0a6" markerEnd="url(#arrow)" />

      <rect x="208" y="20" width="176" height="56" rx="6" fill="#f1f3f4" />
      <text x="296" y="44" textAnchor="middle" fontSize="12" fill="#16181d">
        Cloud Build → Artifact Registry
      </text>
      <text x="296" y="62" textAnchor="middle" fontSize="10" fill="#6b7280">
        secure-mcp-server:latest
      </text>

      <line x1="296" y1="76" x2="296" y2="104" stroke="#9aa0a6" />
      <line x1="150" y1="104" x2="442" y2="104" stroke="#9aa0a6" />
      <line x1="150" y1="104" x2="150" y2="128" stroke="#9aa0a6" markerEnd="url(#arrow)" />
      <line x1="442" y1="104" x2="442" y2="128" stroke="#9aa0a6" markerEnd="url(#arrow)" />

      <rect x="20" y="132" width="260" height="96" rx="6" fill="#ffffff" stroke="#1a73e8" />
      <text x="150" y="156" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1a73e8">
        Cloud Run
      </text>
      <text x="150" y="178" textAnchor="middle" fontSize="10" fill="#16181d">
        IAM 強制驗證 · OIDC ID token
      </text>
      <text x="150" y="196" textAnchor="middle" fontSize="10" fill="#16181d">
        GFE 終結 TLS
      </text>
      <text x="150" y="214" textAnchor="middle" fontSize="10" fill="#6b7280">
        服務帳戶 mcp-server-cr-sa
      </text>

      <rect x="312" y="132" width="260" height="96" rx="6" fill="#ffffff" stroke="#1a73e8" />
      <text x="442" y="156" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1a73e8">
        GKE Autopilot
      </text>
      <text x="442" y="178" textAnchor="middle" fontSize="10" fill="#16181d">
        Workload Identity（免金鑰）
      </text>
      <text x="442" y="196" textAnchor="middle" fontSize="10" fill="#16181d">
        Gateway API · 代管 SSL
      </text>
      <text x="442" y="214" textAnchor="middle" fontSize="10" fill="#6b7280">
        KSA ↔ GSA mcp-gke-sa
      </text>

      <line x1="150" y1="228" x2="150" y2="252" stroke="#9aa0a6" markerEnd="url(#arrow)" />
      <line x1="442" y1="228" x2="442" y2="252" stroke="#9aa0a6" markerEnd="url(#arrow)" />
      <rect x="140" y="254" width="360" height="30" rx="6" fill="#f1f3f4" />
      <text x="320" y="273" textAnchor="middle" fontSize="11" fill="#16181d">
        Agent Platform 工具目錄（Agent Registry）
      </text>
    </svg>
    <p style={caption} data-od-keep-with-previous>
      圖 1 — 一份映像、兩條部署路徑，最後都登記到同一個工具目錄。
    </p>

    <Callout title="讀這份文件的順序">
      步驟 1–2 是共同基礎；步驟 3 與步驟 4 可以擇一實作，但兩者的驗證模型正是這份 codelab
      的核心對照組，建議都看過。
    </Callout>

    <h1 style={h1}>1. 用 FastMCP 建立 MCP Server</h1>
    <p style={p}>
      以 Python FastMCP 框架搭配 uv 管理相依，透過 Uvicorn 在 8080 埠提供 Streamable HTTP 傳輸（符合
      MCP Spec 2026-07-28），對外端點為 <code>/mcp</code>，另外自訂 <code>/healthz</code> 供
      Kubernetes 探針使用。
    </p>

    <h2 style={h2}>四個工具</h2>
    <Table>
      <thead>
        <tr>
          <Th width={170}>工具</Th>
          <Th>用途</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>Vertex AI Gemini</Td>
          <Td>產生內容，驗證模型呼叫路徑可通</Td>
        </tr>
        <tr>
          <Td>Cloud Storage</Td>
          <Td>檢視 bucket，驗證資料面權限</Td>
        </tr>
        <tr>
          <Td>Cloud Logging</Td>
          <Td>讀取稽核紀錄</Td>
        </tr>
        <tr>
          <Td>Health checker</Td>
          <Td>靜態回應，不打任何 API，用來確認傳輸層本身正常</Td>
        </tr>
      </tbody>
    </Table>
    <p style={caption} data-od-keep-with-previous>
      表 1 — 前三個是真的呼叫 Google Cloud SDK，最後一個刻意保持輕量。
    </p>

    <h2 style={h2}>主要檔案與指令</h2>
    <Code>{`mcp-server/
  pyproject.toml              # fastmcp, google-genai, google-cloud-storage,
                              # google-cloud-logging, uvicorn
  src/mcp_server/server.py    # FastMCP 伺服器與四個工具
  src/mcp_server/test_client.py
  src/mcp_server/test_gcs_tool.py
  src/mcp_server/test_vertex_tool.py

uv init --lib
uv sync
uv run python -m src.mcp_server.server`}</Code>

    <p style={p}>
      本機驗證有兩種方式：用 MCP SDK 的測試用戶端連線，或直接對 <code>/mcp</code> 送 JSON-RPC 2.0 的
      HTTP POST（curl 即可）。此階段身分來自 Application Default Credentials。
    </p>

    <h1 style={h1}>2. 容器化並推上 Artifact Registry</h1>
    <p style={p}>
      Dockerfile 採多階段建置：builder 階段用 uv 解析並安裝相依，runtime 階段換成{' '}
      <code>python:3.11-slim</code>，只留執行期需要的檔案，建置產物不會殘留在最終映像層。
    </p>

    <Code>{`gcloud artifacts repositories create mcp-servers \\
  --repository-format=docker --location=us-central1

gcloud builds submit --tag="\${IMAGE_URI}"

# IMAGE_URI 形如：
# us-central1-docker.pkg.dev/\${PROJECT_ID}/mcp-servers/secure-mcp-server:latest`}</Code>

    <h2 style={h2}>執行期環境變數</h2>
    <Table>
      <thead>
        <tr>
          <Th width={180}>變數</Th>
          <Th>值與用途</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td mono>PORT</Td>
          <Td>8080，Cloud Run 與 GKE 探針都以此為準</Td>
        </tr>
        <tr>
          <Td mono>PYTHONUNBUFFERED</Td>
          <Td>1，讓日誌即時進 Cloud Logging，不被緩衝吃掉</Td>
        </tr>
        <tr>
          <Td mono>GOOGLE_CLOUD_PROJECT</Td>
          <Td>SDK 解析預設專案用</Td>
        </tr>
      </tbody>
    </Table>

    <Callout title="為什麼用 Cloud Build 而不是本機 docker push">
      Cloud Build 在雲端建置，映像直接落在 Artifact Registry，省掉本機推送的頻寬與跨平台 CPU
      架構問題，也讓建置紀錄留在專案裡可追。
    </Callout>

    <h1 style={h1}>3. 部署到 Cloud Run（IAM ＋ HTTPS）</h1>
    <p style={p}>
      Cloud Run 的安全模型是<strong>把驗證擋在應用程式之前</strong>：以{' '}
      <code>--no-allow-unauthenticated</code> 部署後，未帶 Google OIDC ID token 的請求在 Google
      Front End 就被擋下，根本不會進到容器；TLS 也由 Google 代管憑證終結。
    </p>

    <h2 style={h2}>最小權限服務帳戶</h2>
    <Table>
      <thead>
        <tr>
          <Th width={210}>角色</Th>
          <Th>給它的原因</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td mono>roles/aiplatform.user</Td>
          <Td>呼叫 Vertex AI Gemini</Td>
        </tr>
        <tr>
          <Td mono>roles/logging.logWriter</Td>
          <Td>寫入應用日誌</Td>
        </tr>
        <tr>
          <Td mono>roles/storage.objectViewer</Td>
          <Td>唯讀存取 bucket 內容</Td>
        </tr>
      </tbody>
    </Table>
    <p style={caption} data-od-keep-with-previous>
      表 2 — 服務帳戶 mcp-server-cr-sa 只拿這三個角色，不使用預設的編輯者權限。
    </p>

    <Code>{`gcloud iam service-accounts create mcp-server-cr-sa

gcloud run deploy secure-mcp-server \\
  --image="\${IMAGE_URI}" \\
  --service-account=mcp-server-cr-sa@\${PROJECT_ID}.iam.gserviceaccount.com \\
  --no-allow-unauthenticated --region=us-central1

# 呼叫時附上 ID token
curl -H "Authorization: Bearer $(gcloud auth print-identity-token \\
  --audiences=\${SERVICE_URL})" \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' \\
  \${SERVICE_URL}/mcp`}</Code>

    <p style={p}>
      驗證方式很直接：不帶 token 應該拿到{' '}
      <strong style={{ color: warning }}>401 Unauthorized</strong>
      ，帶了正確 audience 的 token 才會拿到工具清單。
    </p>

    <h1 style={h1}>4. 部署到 GKE Autopilot（Workload Identity ＋ TLS）</h1>
    <p style={p}>
      GKE 這條路線的重點是 <strong>Workload Identity</strong>：Kubernetes 服務帳戶（KSA）綁定 Google
      服務帳戶（GSA），Pod 不需要掛載任何金鑰檔就能以 GSA 身分呼叫 Google API。
    </p>

    <h2 style={h2}>Workload Identity 的三個綁定動作</h2>
    <Table>
      <thead>
        <tr>
          <Th width={54}>順序</Th>
          <Th>動作</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>1</Td>
          <Td>建立 GSA（mcp-gke-sa）並授予與 Cloud Run 相同的三個最小權限角色</Td>
        </tr>
        <tr>
          <Td>2</Td>
          <Td>
            建立 KSA（mcp-server-ksa），加上註解 <code>iam.gke.io/gcp-service-account</code> 指向
            GSA
          </Td>
        </tr>
        <tr>
          <Td>3</Td>
          <Td>
            在 GSA 上授予該工作負載主體 <code>roles/iam.workloadIdentityUser</code>
          </Td>
        </tr>
      </tbody>
    </Table>

    <h2 style={h2}>對外流量與憑證</h2>
    <p style={p}>
      服務本身是 ClusterIP，對外經 Gateway API 的全域外部負載平衡器；靜態 IP 搭配 nip.io
      萬用網域省去自備 DNS，憑證用 Google 代管 SSL（<code>pre-shared-certs</code>
      ），簽發約需 5–15 分鐘。由於 Streamable HTTP 有連線狀態，需以 <code>GCPBackendPolicy</code>{' '}
      設定 <code>CLIENT_IP</code> 工作階段親和性。
    </p>

    <Code>{`gcloud container clusters create-auto mcp-gke-cluster --region=us-central1
gcloud compute addresses create mcp-server-ip --global
gcloud compute ssl-certificates create mcp-server-cert --domains=mcp.\${IP}.nip.io

kubectl apply -f deployment.yaml   # Deployment(2 replicas) + Service
kubectl apply -f gateway.yaml      # Gateway + HTTPRoute + HealthCheckPolicy
                                   # + GCPBackendPolicy`}</Code>

    <Callout title="這裡有個安全落差" tone="warning">
      GKE 的公開端點<strong>本身沒有驗證</strong>——不像 Cloud Run 有 IAM
      擋在前面。正式環境要自己補上 Identity-Aware Proxy（IAP）或 OAuth 2.0
      反向代理，否則等於把工具公開在網際網路上。
    </Callout>

    <h1 style={h1}>5. 註冊到 Agent Platform</h1>
    <p style={p}>
      把 MCP 伺服器登記進 Agent Registry 之後，企業代理程式就能動態發現這些工具，而不必把端點寫死在
      程式裡。兩種部署方式的註冊路徑不同。
    </p>

    <h2 style={h2}>Cloud Run：手動註冊</h2>
    <p style={p}>
      先用 JSON-RPC 的 <code>initialize</code> 與 <code>tools/list</code> 把工具規格抓成{' '}
      <code>toolspec.json</code>，再連同 Cloud Run 服務網址建立目錄項目。
    </p>
    <Code>{`gcloud agent-registry services create secure-mcp-server \\
  --mcp-server-spec-type=tool-spec \\
  --mcp-server-spec-content=toolspec.json`}</Code>

    <h2 style={h2}>GKE：自動探索</h2>
    <p style={p}>
      GKE 控制器會掃描帶有特定標籤與註解的 Deployment 並自動註冊，省去手動抽取規格的步驟，且
      Kubernetes 上的中繼資料異動會同步回目錄。
    </p>
    <Table>
      <thead>
        <tr>
          <Th width={250}>標籤／註解</Th>
          <Th>作用</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td mono>registry.gke.io/functional-type: MCP_SERVER</Td>
          <Td>標記為可被探索的 MCP 伺服器</Td>
        </tr>
        <tr>
          <Td mono>modelcontextprotocol.info/urls</Td>
          <Td>宣告對外端點網址</Td>
        </tr>
        <tr>
          <Td mono>modelcontextprotocol.info/capabilities</Td>
          <Td>宣告支援的傳輸協定</Td>
        </tr>
      </tbody>
    </Table>

    <Code>{`gcloud agent-registry mcp-servers list
gcloud agent-registry mcp-servers describe mcp-server-deployment`}</Code>

    <h1 style={h1}>兩種部署方式怎麼選</h1>

    <Table>
      <thead>
        <tr>
          <Th width={110}>面向</Th>
          <Th>Cloud Run</Th>
          <Th>GKE Autopilot</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>入口驗證</Td>
          <Td>IAM 強制，未帶 OIDC token 直接 401</Td>
          <Td>預設無，需自行加 IAP／OAuth 代理</Td>
        </tr>
        <tr>
          <Td>取得雲端身分</Td>
          <Td>指定服務帳戶</Td>
          <Td>Workload Identity（KSA ↔ GSA）</Td>
        </tr>
        <tr>
          <Td>TLS</Td>
          <Td>GFE 自動代管</Td>
          <Td>代管 SSL 憑證，需等簽發</Td>
        </tr>
        <tr>
          <Td>擴縮</Td>
          <Td>依請求自動，可縮到零</Td>
          <Td>依 Pod 副本數，節點常駐</Td>
        </tr>
        <tr>
          <Td>計費</Td>
          <Td>依請求</Td>
          <Td>依節點與 Pod 資源</Td>
        </tr>
        <tr>
          <Td>目錄註冊</Td>
          <Td>手動送 toolspec</Td>
          <Td>控制器自動探索</Td>
        </tr>
        <tr>
          <Td>適合場景</Td>
          <Td>流量起伏大、要最小維運面</Td>
          <Td>已有叢集、需要細緻網路與側車控制</Td>
        </tr>
      </tbody>
    </Table>
    <p style={caption} data-od-keep-with-previous>
      表 3 — 若沒有既有叢集需求，Cloud Run 是預設較安全的起點。
    </p>

    <h2 style={h2}>安全檢查清單</h2>
    <ul style={{ margin: '0 0 12px', paddingLeft: 20 }}>
      <li>服務帳戶只給實際用到的三個角色，不套用預設編輯者。</li>
      <li>
        Cloud Run 一律 <code>--no-allow-unauthenticated</code>；ID token 的 audience 要對。
      </li>
      <li>GKE 端點上線前先確認 IAP 或反向代理已就位。</li>
      <li>不在映像或 ConfigMap 中放金鑰檔——這正是 Workload Identity 要解掉的問題。</li>
      <li>日誌寫進 Cloud Logging，確保工具呼叫可稽核。</li>
    </ul>

    <h1 style={h1}>成本與資源清理</h1>
    <p style={p}>
      這份 codelab 會產生持續計費的資源，其中 <strong>GKE Autopilot 叢集與靜態 IP</strong>{' '}
      即使閒置也在收費，做完務必清乾淨。
    </p>

    <Table>
      <thead>
        <tr>
          <Th width={200}>資源</Th>
          <Th>計費方式</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>Cloud Run</Td>
          <Td>依請求數與執行時間，閒置縮到零</Td>
        </tr>
        <tr>
          <Td>GKE Autopilot</Td>
          <Td>依節點與 Pod 資源，常駐計費</Td>
        </tr>
        <tr>
          <Td>Artifact Registry</Td>
          <Td>儲存空間與流出流量</Td>
        </tr>
        <tr>
          <Td>Vertex AI／Storage／Logging</Td>
          <Td>依實際用量</Td>
        </tr>
      </tbody>
    </Table>

    <h2 style={h2}>清理指令</h2>
    <Code>{`gcloud run services delete secure-mcp-server --quiet
gcloud container clusters delete mcp-gke-cluster --region=us-central1 --quiet
gcloud agent-registry services delete secure-mcp-server --quiet
gcloud artifacts repositories delete mcp-servers --location=us-central1 --quiet
gcloud compute ssl-certificates delete mcp-server-cert --quiet
gcloud compute addresses delete mcp-server-ip --global --quiet
gcloud iam service-accounts delete mcp-server-cr-sa@\${PROJECT_ID}.iam.gserviceaccount.com --quiet
gcloud iam service-accounts delete mcp-gke-sa@\${PROJECT_ID}.iam.gserviceaccount.com --quiet
gcloud storage rm --recursive gs://\${BUCKET_NAME}`}</Code>

    <Callout title="別忘了 IAM 綁定">
      刪掉服務帳戶不會自動移除專案層級的角色繫結，記得一併{' '}
      <code>gcloud projects remove-iam-policy-binding</code>，否則會留下指向已刪帳戶的殘留設定。
    </Callout>

    <h2 style={h2}>參考</h2>
    <p style={{ ...p, fontSize: 12, color: 'var(--od-muted)' }}>
      原始 codelab：codelabs.developers.google.com/secure-mcp-server-gcp（Google LLC）。本文為個人
      閱讀整理，指令與參數以官方原文與當前 gcloud 版本為準。
    </p>
  </>,
  { footer: Footer },
);

export const meta: DocMeta = {
  title: '在 Google Cloud 上部署安全的 MCP Server',
  subtitle: 'Codelab 重點整理',
  author: 'Codelab 整理',
  pageSize: 'A4',
  orientation: 'portrait',
  theme: 'corporate-neutral',
  createdAt: '2026-08-15T14:53:28.015Z',
};

export default [Cover, Contents, Body] satisfies DocEntry[];
