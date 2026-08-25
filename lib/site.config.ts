/**
 * 站点单一事实来源：品牌、链接与跨语言常量。
 * 界面文案（按语言）集中在 lib/i18n.ts，链接与名称集中在这里。
 */
export const siteConfig = {
  name: "Zerox Zhang",
  nameMark: "ZEROX·ZHANG",
  domain: "zeroxzhang.cc",
  domains: ["zeroxzhang.cc", "zeroxzhang.com"],
  homeUrl: "/",

  analytics: {
    googleMeasurementId: "G-1FSFSSNCQ5",
  },

  email: "shangye_robbie@126.com",

  github: "https://github.com/ZeroxZhang",
  blog: "https://blog.zeroxzhang.cc",

  wechat: {
    /** 公众号名称，弹窗与 footer 均使用。 */
    name: "Zerox在探索",
    /** 公众号二维码图（用户 2026-08-23 提供，430×430，JPEG）。 */
    qrSrc: "/wechat/zerox-wechat-qr.jpg",
  },

  /** 英雄区主标题与格言（双语不敏感）。 */
  hero: {
    headline: "ZEROX ZHANG",
    mottoLa: "Semper novarum rerum cupidus",
    mottoAttribution: null,
  },

  /** 导航（标签文案在 lib/i18n.ts 按语言提供）。 */
  nav: [
    { id: "works", href: "/#work", external: false },
    { id: "blog", href: "https://blog.zeroxzhang.cc", external: true },
    { id: "about", href: "/about", external: false },
    { id: "github", href: "https://github.com/ZeroxZhang", external: true },
  ],

  footer: {
    copyright: "© 2017–2026 zeroxzhang.cc · All rights reserved",
    motto: "SEMPER NOVARUM RERUM CUPIDUS",
  },
} as const;

export type SiteConfig = typeof siteConfig;
