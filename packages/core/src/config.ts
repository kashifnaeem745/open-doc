export type OpenDocBuildConfig = {
  /** Ship the document browser (`/`) in the static build. Defaults to true. */
  showDocBrowser?: boolean;
  /** Offer the "Export HTML" button in the static build. Defaults to true. */
  allowHtmlExport?: boolean;
};

export type OpenDocConfig = {
  base?: string;
  docsDir?: string;
  themesDir?: string;
  assetsDir?: string;
  port?: number;
  allowedHosts?: string[] | true;
  build?: OpenDocBuildConfig;
};
