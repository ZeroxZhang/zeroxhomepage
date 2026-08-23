import { siteConfig } from "./site.config.ts";

/**
 * 站点双语词典。默认中文（zh-CN），切换不影响路由与作品 slug。
 * 作品正文/字段的双语来自 content/works（见 lib/works.ts），
 * 界面文案在这里集中管理。
 */
export type Locale = "zh-CN" | "en";
export const DEFAULT_LOCALE: Locale = "zh-CN";
export const LOCALES: Locale[] = ["zh-CN", "en"];

export const isLocale = (value: unknown): value is Locale =>
  value === "zh-CN" || value === "en";

/** 按当前语言取双语文案（缺英文时回退中文）。 */
export const pick = (locale: Locale, zh: string, en: string): string =>
  locale === "en" ? en || zh : zh;

export const copy = {
  "zh-CN": {
    nav: {
      works: "作品",
      blog: "博客",
      about: "关于",
      github: "GitHub",
      contact: "联系我",
      brandTagline: "官方主页",
      menuEmailLabel: "邮箱",
    },
    hero: {
      kicker: "官方主页 · OFFICIAL HOMEPAGE",
      mottoLine: "探索永无止境 · 此行通往群星",
      description: (total: number) =>
        `独立开发者与创作者。长期构建 AI Agent 系统、量化投研工具与内容出版产品——${total} 件作品在此公开归档，从本地脚本到上线产品。`,
      buttons: {
        github: "GitHub",
        blog: "博客",
        wechat: "公众号",
        contact: "联系我",
      },
    },
    works: {
      heading: (categories: number, total: number) =>
        `${categories} 条线索，${total} 件作品`,
      sub: (categories: number, total: number) =>
        `${categories} tracks, ${total} works — 点击任意分类查看完整清单。`,
      allLabel: "全部作品",
      hint: (n: number) => `查看 ${n} 件`,
      countSuffix: "件作品",
      allCount: (n: number) => `${n} 件作品`,
      detailNote: "作品详情页正在建设中 · 联系方式",
    },
    contact: {
      emailNote: "回复通常在 1–2 个工作日内。",
      copyEmail: "复制邮箱",
      copied: "已复制",
      sendEmail: "写邮件",
      qrAlt: (name: string) => `微信公众号 ${name} 二维码`,
      wechatHint: `打开微信 → 搜索「${siteConfig.wechat.name}」→ 关注`,
    },
    footer: {
      brandTagline: `官方主页 · ${siteConfig.domain}`,
      mottoLine: `${siteConfig.hero.mottoLa} — 探索永无止境。`,
      explore: "浏览",
      contact: "联系",
      wechatLabel: "微信公众号：",
    },
    about: {
      metadataTitle: "关于 · About",
      back: "返回首页",
      kicker: "ABOUT · 关于",
      underConstruction: "关于页正在建设中。你可以先浏览",
      works: "作品集",
      blog: "博客",
      or: "或",
    },
    common: {
      close: "关闭",
      mainNav: "主导航",
      footerNav: "页脚导航",
      openMenu: "打开菜单",
      closeMenu: "关闭菜单",
      viewCategory: (label: string) => `查看分类：${label}`,
      langZh: "中文 (Chinese)",
      langEn: "英文 (English)",
    },
  },
  en: {
    nav: {
      works: "Works",
      blog: "Blog",
      about: "About",
      github: "GitHub",
      contact: "Contact",
      brandTagline: "OFFICIAL SITE",
      menuEmailLabel: "Email",
    },
    hero: {
      kicker: "OFFICIAL HOMEPAGE · 官方主页",
      mottoLine: "Thus one journeys to the stars — exploration never ends.",
      description: (total: number) =>
        `Independent developer & creator. I build AI agent systems, quant research tools, and content publishing products — ${total} works archived here, from local scripts to live products.`,
      buttons: {
        github: "GitHub",
        blog: "Blog",
        wechat: "WeChat",
        contact: "Contact",
      },
    },
    works: {
      heading: (categories: number, total: number) =>
        `${categories} tracks, ${total} works`,
      sub: (categories: number, total: number) =>
        `${categories} 条线索，${total} 件作品 — click any category to browse the full list.`,
      allLabel: "All Works",
      hint: (n: number) => `View ${n} works`,
      countSuffix: "works",
      allCount: (n: number) => `${n} Works`,
      detailNote: "Work detail pages are under construction · Contact",
    },
    contact: {
      emailNote: "Replies usually within 1–2 business days.",
      copyEmail: "Copy email",
      copied: "Copied",
      sendEmail: "Send email",
      qrAlt: (name: string) => `${name} WeChat Official Account QR code`,
      wechatHint: `Open WeChat → search “${siteConfig.wechat.name}” → Follow`,
    },
    footer: {
      brandTagline: `Official site · ${siteConfig.domain}`,
      mottoLine: `${siteConfig.hero.mottoLa} — exploration never ends.`,
      explore: "Explore",
      contact: "Contact",
      wechatLabel: "WeChat Official Account:",
    },
    about: {
      metadataTitle: "About · 关于",
      back: "Back to homepage",
      kicker: "ABOUT · 关于",
      underConstruction: "About page is under construction. For now, browse my",
      works: "work archive",
      blog: "blog",
      or: "or",
    },
    common: {
      close: "Close",
      mainNav: "Main navigation",
      footerNav: "Footer navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      viewCategory: (label: string) => `View category: ${label}`,
      langZh: "中文 (Chinese)",
      langEn: "英文 (English)",
    },
  },
} as const;

export type Copy = (typeof copy)[Locale];
