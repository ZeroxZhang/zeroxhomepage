/**
 * 作品路由的部署清单。
 *
 * 与 content/works/index.yaml 的一致性由 tests/works.test.mjs 强制校验。
 * 独立于内容加载器，避免 Next.js 为路由追踪内容目录时把无关仓库文件打包。
 */
export const WORK_SLUGS = [
  "zerox-agent",
  "huashu-bookwriter",
  "md2book",
  "flowchart-generator-skill",
  "onepager",
  "paper-to-course",
  "lingmou",
  "silenzio",
  "io-system",
  "arch-diagram",
  "concept-bridge",
  "really",
  "deepseek-harness-app",
  "end-of-day-picker",
  "a-share-tailpicker",
  "invest-signal-kit",
  "stock-fund-analyzer",
  "etf-analyzer",
  "zerox-agent-course",
  "nanobot-course",
  "sonoquest-ultrasound-play-lab",
  "money-education-whitebook",
  "newspaper-demo",
  "md2pdf-v2",
  "editor",
  "text-card-generator",
  "x-card",
  "epub-pdf-to-txt-converter",
  "hottrend",
  "pdf-watermark-remover",
  "indian-workplace-methodology",
  "z-slides",
  "allergen-map",
  "minimalism-note-card-generator",
  "zerox-homepage",
] as const;

export type WorkSlug = (typeof WORK_SLUGS)[number];
