"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { copy } from "@/lib/i18n";
import { useLocale } from "@/components/site/locale-provider";
import { ArrowUpRightIcon, GitHubIcon, MailIcon } from "@/components/site/icons";

const FOOTER_LINK =
  "inline-flex min-h-11 items-center gap-1.5 font-sans text-[13px] text-ivory-dim transition-colors hover:text-ivory";

export const SiteFooter = () => {
  const { locale } = useLocale();
  const c = copy[locale];

  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-14 ipad:px-8">
        <div className="grid gap-10 ipad:grid-cols-[1.5fr_1fr_1fr]">
          {/* 品牌 */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex flex-col items-start gap-1 leading-none">
              <span className="font-display text-[18px] font-bold tracking-[0.14em] text-ivory">
                {siteConfig.nameMark}
              </span>
              <span className="font-sans text-[10px] tracking-[0.34em] text-ivory-faint">
                {c.footer.brandTagline}
              </span>
            </Link>
            <p className="font-quote text-[13px] italic text-ivory-dim">
              {c.footer.mottoLine}
            </p>
          </div>

          {/* 链接 */}
          <nav aria-label={c.common.footerNav} className="flex flex-col gap-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ivory-faint">
              {c.footer.explore}
            </span>
            <Link href="/#work" className={FOOTER_LINK}>
              {c.nav.works}
            </Link>
            <a
              href={siteConfig.blog}
              target="_blank"
              rel="noreferrer"
              className={FOOTER_LINK}
            >
              {c.nav.blog}
              <ArrowUpRightIcon className="size-3 opacity-60" />
            </a>
            <Link href="/about" className={FOOTER_LINK}>
              {c.nav.about}
            </Link>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className={FOOTER_LINK}
            >
              <GitHubIcon className="size-3.5" />
              {c.nav.github}
              <ArrowUpRightIcon className="size-3 opacity-60" />
            </a>
          </nav>

          {/* 联系 */}
          <div className="flex flex-col gap-2.5">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ivory-faint">
              {c.footer.contact}
            </span>
            <a href={`mailto:${siteConfig.email}`} className={FOOTER_LINK}>
              <MailIcon className="size-3.5" />
              {siteConfig.email}
            </a>
            <p className="font-sans text-[13px] text-ivory-dim">
              {c.footer.wechatLabel}
              {siteConfig.wechat.name}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-center sm:flex-row">
          <p className="font-sans text-[11.5px] text-ivory-faint">
            {siteConfig.footer.copyright}
          </p>
          <p className="font-display text-[10px] tracking-[0.32em] text-brass/70">
            {siteConfig.footer.motto}
          </p>
        </div>
      </div>
    </footer>
  );
};
