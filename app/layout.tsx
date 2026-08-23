import type { Metadata } from "next";
import { fontDisplay, fontQuote, fontSans } from "@/lib/fonts";
import { siteConfig } from "@/lib/site.config";
import { LocaleProvider } from "@/components/site/locale-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: {
    default: `${siteConfig.name} — 官方主页`,
    template: `%s · ${siteConfig.name}`,
  },
  description:
    "Zerox Zhang 的官方网站：独立开发者与创作者，构建 AI Agent 系统、量化投研工具与内容出版产品。Sic itur ad astra — 探索永无止境。",
  keywords: [
    "Zerox Zhang",
    "AI Agent",
    "量化投研",
    "内容出版",
    "独立开发者",
    "作品集",
  ],
  openGraph: {
    title: `${siteConfig.name} — 官方主页`,
    description: "Sic itur ad astra — 探索永无止境。",
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.domain,
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontQuote.variable}`}
    >
      <body className="min-h-screen bg-ink font-sans text-ivory antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
