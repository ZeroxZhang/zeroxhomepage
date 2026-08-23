"use client";

import Link from "next/link";
import { useLocale } from "@/components/site/locale-provider";
import { copy } from "@/lib/i18n";
import { siteConfig } from "@/lib/site.config";

export const AboutContent = () => {
  const { locale } = useLocale();
  const c = copy[locale].about;
  const punctuation = locale === "en" ? "." : "。";

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-[radial-gradient(ellipse_60%_90%_at_50%_0%,rgba(124,148,118,0.28)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <Link
        href="/"
        className="relative mb-12 inline-flex min-h-11 items-center font-sans text-[12px] tracking-[0.3em] text-ivory-dim transition-colors hover:text-ivory"
      >
        ← {c.back}
      </Link>

      <p className="relative flex items-center gap-3 font-sans text-[10.5px] uppercase tracking-[0.36em] text-brass">
        <span className="inline-block size-1.5 rotate-45 border border-brass bg-brass/40" aria-hidden="true" />
        {c.kicker}
        <span className="inline-block size-1.5 rotate-45 border border-brass bg-brass/40" aria-hidden="true" />
      </p>

      <h1 className="relative mt-5 font-display text-[clamp(1.8rem,6vw,3rem)] font-bold tracking-[0.08em] text-ivory">
        {siteConfig.nameMark}
      </h1>

      <p className="relative mt-6 max-w-[440px] font-sans text-[14px] leading-[1.8] text-ivory-dim">
        {c.underConstruction}{" "}
        <Link href="/#work" className="text-brass underline-offset-4 hover:underline">
          {c.works}
        </Link>
        {locale === "en" ? ", " : "、"}
        <a
          href={siteConfig.blog}
          target="_blank"
          rel="noreferrer"
          className="text-brass underline-offset-4 hover:underline"
        >
          {c.blog}
        </a>{" "}
        {c.or}{" "}
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
          className="text-brass underline-offset-4 hover:underline"
        >
          GitHub
        </a>
        {punctuation}
      </p>
    </main>
  );
};
