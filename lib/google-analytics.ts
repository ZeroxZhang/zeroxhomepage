import { siteConfig } from "@/lib/site.config";

export const googleAnalyticsId = siteConfig.analytics.googleMeasurementId;

/**
 * 独立作品页由 Route Handler 直接返回静态 HTML，不经过 React 根布局。
 * 在响应层统一注入 Google tag，确保所有作品页与应用页面使用同一衡量 ID。
 */
export function injectGoogleAnalytics(html: string) {
  const scriptUrl = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;

  if (html.includes(scriptUrl)) {
    return html;
  }

  if (!html.includes("</head>")) {
    throw new Error("作品页 HTML 缺少 </head>，无法注入 Google Analytics");
  }

  const googleTag = [
    `  <script async src="${scriptUrl}"></script>`,
    "  <script>",
    "    window.dataLayer = window.dataLayer || [];",
    "    function gtag(){dataLayer.push(arguments);}",
    "    gtag('js', new Date());",
    `    gtag('config', '${googleAnalyticsId}');`,
    "  </script>",
  ].join("\n");

  return html.replace("</head>", `${googleTag}\n</head>`);
}
