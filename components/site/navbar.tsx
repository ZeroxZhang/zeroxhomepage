"use client";

/**
 * 首页导航：品牌标识 + 站内/外链 + 语言切换（右上角键帽）+ 移动端菜单。
 * 文案按当前语言来自 lib/i18n.ts。
 */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site.config";
import { copy } from "@/lib/i18n";
import { useLocale } from "@/components/site/locale-provider";
import { LocaleToggle } from "@/components/site/locale-toggle";
import { MenuIcon, CloseIcon, ArrowUpRightIcon } from "@/components/site/icons";

const LINK_CLASS =
  "inline-flex min-h-11 items-center gap-1 font-sans text-[14px] leading-none text-ivory/70 transition-colors duration-200 hover:text-ivory";

const Logo = () => {
  const { locale } = useLocale();
  const c = copy[locale];
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} ${c.nav.brandTagline}`}
      className="flex min-w-0 flex-col items-start gap-1 leading-none"
    >
      <span className="font-display text-[15px] font-bold tracking-[0.08em] text-ivory min-[360px]:text-[17px] min-[360px]:tracking-[0.14em]">
        {siteConfig.nameMark}
      </span>
      <span className="hidden font-sans text-[9.5px] tracking-[0.34em] text-ivory-faint min-[360px]:block">
        {c.nav.brandTagline}
      </span>
    </Link>
  );
};

export const SiteNavbar = () => {
  const { locale } = useLocale();
  const c = copy[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onClickOutside);
    };
  }, [menuOpen]);

  const navLabel = (id: (typeof siteConfig.nav)[number]["id"]): string =>
    c.nav[id];

  return (
    <nav aria-label={c.common.mainNav} className="relative z-40 w-full" ref={menuRef}>
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-1 px-2 py-5 min-[360px]:gap-2 min-[360px]:px-5 ipad:px-8">
        <Logo />

        {/* 桌面端链接 */}
        <ul className="hidden ipad:flex items-center gap-9">
          {siteConfig.nav.map((item) => (
            <li key={item.id}>
              {item.external ? (
                <a href={item.href} className={LINK_CLASS}>
                  {navLabel(item.id)}
                  <ArrowUpRightIcon className="size-3 opacity-60" />
                </a>
              ) : (
                <Link href={item.href} className={LINK_CLASS}>
                  {navLabel(item.id)}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden ipad:flex items-center gap-4">
          <LocaleToggle />
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-ink-card px-4 font-sans text-[13px] text-ivory/80 transition-colors hover:text-ivory"
          >
            {c.nav.contact}
          </a>
        </div>

        {/* 移动端：语言切换 + 菜单按钮 */}
        <div className="flex shrink-0 items-center gap-1 min-[360px]:gap-3 ipad:hidden">
          <LocaleToggle />
          <button
            type="button"
            aria-label={menuOpen ? c.common.closeMenu : c.common.openMenu}
            aria-expanded={menuOpen}
            aria-controls="site-mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ivory"
          >
            {menuOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {/* 移动端菜单面板 */}
      {menuOpen ? (
        <div
          id="site-mobile-menu"
          className="absolute inset-x-4 top-full z-50 flex flex-col gap-1 rounded-2xl border border-line bg-ink-soft/95 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-md ipad:hidden"
        >
          {siteConfig.nav.map((item) =>
            item.external ? (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center justify-between rounded-lg px-3 font-sans text-[15px] text-ivory/85 hover:bg-ink-card hover:text-ivory"
              >
                {navLabel(item.id)}
                <ArrowUpRightIcon className="size-3.5 text-ivory-faint" />
              </a>
            ) : (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center justify-between rounded-lg px-3 font-sans text-[15px] text-ivory/85 hover:bg-ink-card hover:text-ivory"
              >
                {navLabel(item.id)}
              </Link>
            ),
          )}
          <div className="mt-2 border-t border-line pt-3 text-center font-sans text-[12px] text-ivory-faint">
            {c.nav.menuEmailLabel} {siteConfig.email}
          </div>
        </div>
      ) : null}
    </nav>
  );
};
