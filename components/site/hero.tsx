"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { siteConfig } from "@/lib/site.config";
import { copy } from "@/lib/i18n";
import { useLocale } from "@/components/site/locale-provider";
import { TextArc } from "@/components/originkit/ui/hero-10/text-arc";
import { PixelBackground } from "@/components/originkit/ui/hero-10/pixel-background";
import { KineticFloor } from "@/components/site/kinetic-floor";
import { SiteNavbar } from "@/components/site/navbar";
import { SiteButton } from "@/components/site/button";
import { ContactDialog } from "@/components/site/contact-dialog";
import { useHydratedReducedMotion } from "@/components/site/use-hydrated-reduced-motion";
import {
  GitHubIcon,
  MailIcon,
  PenIcon,
  WeChatIcon,
} from "@/components/site/icons";

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

/** 顶部氛围光：苔绿向下衰减，混入黄铜暖调（与 Hero 10 同构图、同曲线遮罩）。 */
const CURVE_MASK =
  "radial-gradient(ellipse 130% 100% at 50% 0%, #000 0%, #000 42%, rgba(0,0,0,0.55) 62%, transparent 78%)";

const Atmosphere = () => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
    <div
      className="absolute inset-x-0 top-0 h-[360px] desktop-sm:h-[420px]"
      style={{
        background:
          "linear-gradient(to bottom, #8FA87F 0%, #6E8466 30%, #3E4A38 62%, #0A0C09 100%)",
        opacity: 0.34,
        maskImage: CURVE_MASK,
        WebkitMaskImage: CURVE_MASK,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
    <div
      className="absolute top-[-40px] left-1/2 h-[280px] w-[160%] max-w-none -translate-x-1/2 blur-[70px] desktop-sm:h-[340px] desktop-sm:blur-[100px]"
      style={{
        background:
          "radial-gradient(ellipse 85% 90% at 50% 0%, rgba(143,168,127,0.55) 0%, rgba(110,132,102,0.35) 35%, rgba(217,180,91,0.16) 58%, transparent 76%)",
        opacity: 0.5,
      }}
    />
    <div className="absolute top-[200px] left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(217,180,91,0.10)_0%,transparent_70%)] blur-[40px]" />
  </div>
);

/** 主标题逐字入场：Cinzel 黑体 + 黄铜句点。 */
const Headline = ({ reduce }: { reduce: boolean }) => {
  const words = siteConfig.hero.headline.split(" ");
  let charIndex = 0;
  return (
    <h1 className="mt-5 font-display text-[clamp(2.8rem,10.5vw,8.4rem)] font-black leading-[0.96] tracking-[0.02em] text-ivory text-glow-brass text-pretty">
      {words.map((word, wi) => (
        <span key={word} className="inline-block whitespace-nowrap">
          {word.split("").map((ch) => {
            const index = charIndex++;
            return (
              <motion.span
                key={index}
                className="inline-block will-change-[transform,opacity,filter]"
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: "0.32em", filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.45,
                  delay: reduce ? 0 : 0.15 + index * 0.03,
                  ease: EASE_OUT,
                }}
              >
                {ch}
              </motion.span>
            );
          })}
          <motion.span
            aria-hidden="true"
            className="inline-block text-brass"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: "0.32em", filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.45,
              delay: reduce ? 0 : 0.15 + charIndex * 0.03,
              ease: EASE_OUT,
            }}
          >
            {wi === words.length - 1 ? "." : ""}
          </motion.span>
          {wi < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </h1>
  );
};

type DialogMode = "email" | "wechat" | null;

export const Hero = ({ total }: { total: number }) => {
  const reduce = useHydratedReducedMotion();
  const { locale } = useLocale();
  const c = copy[locale];
  const [dialog, setDialog] = useState<DialogMode>(null);

  const restReveal = (delay: number) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay: reduce ? 0 : delay, ease: EASE_OUT },
  });

  return (
    <section
      aria-label={
        locale === "en" ? "Zerox Zhang official homepage" : "Zerox Zhang 官方主页"
      }
      className="relative isolate flex min-h-screen flex-col overflow-hidden"
      style={{
        // 底部 13% 渐隐为透明，让全页背景网格透过，与倾斜地面交叉溶解
        background:
          "linear-gradient(to bottom, var(--color-ink) 0%, var(--color-ink) 87%, transparent 100%)",
      }}
    >
      <Atmosphere />
      <PixelBackground />
      <KineticFloor />
      <SiteNavbar />

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center px-5 pb-20 pt-24 ipad:pt-28">
        <div className="pointer-events-auto flex w-full flex-col items-center">
          <TextArc />

          <div className="mt-6 flex w-full flex-col items-center text-center ipad:mt-9">
            {/* 眉标 */}
            <motion.p
              {...restReveal(0.2)}
              className="flex items-center gap-3 font-sans text-[10.5px] uppercase tracking-[0.36em] text-brass ipad:text-[11px]"
            >
              <span className="inline-block size-1.5 rotate-45 border border-brass bg-brass/40" aria-hidden="true" />
              {c.hero.kicker}
              <span className="inline-block size-1.5 rotate-45 border border-brass bg-brass/40" aria-hidden="true" />
            </motion.p>

            <Headline reduce={reduce} />

            {/* 格言：拉丁原文 → 本地语言 → 出处 */}
            <div className="mt-6 flex flex-col items-center gap-1.5 ipad:mt-8">
              <motion.p
                {...restReveal(0.55)}
                className="font-quote text-[clamp(1.45rem,3.4vw,2.4rem)] leading-tight italic text-brass text-glow-brass"
              >
                {siteConfig.hero.mottoLa}
              </motion.p>
              <motion.p
                {...restReveal(0.66)}
                className={
                  locale === "en"
                    ? "mt-1 font-quote text-[14px] italic text-ivory/85 ipad:text-[16px]"
                    : "mt-2 font-cjk text-[15px] tracking-[0.3em] text-ivory/90 ipad:text-[17px]"
                }
              >
                {c.hero.mottoLine}
              </motion.p>
              {siteConfig.hero.mottoAttribution ? (
                <motion.p
                  {...restReveal(0.74)}
                  className="font-sans text-[9.5px] uppercase tracking-[0.34em] text-ivory-faint"
                >
                  {siteConfig.hero.mottoAttribution}
                </motion.p>
              ) : null}
            </div>

            <motion.p
              {...restReveal(0.85)}
              className="mt-6 max-w-[600px] font-sans text-[14px] leading-[1.75] text-ivory/60 text-pretty ipad:text-[15.5px]"
            >
              {c.hero.description(total)}
            </motion.p>

            {/* 按钮组 */}
            <motion.div
              {...restReveal(0.95)}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <SiteButton
                variant="secondary"
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                aria-label={c.hero.buttons.github}
                icon={<GitHubIcon />}
              >
                {c.hero.buttons.github}
              </SiteButton>
              <SiteButton
                variant="secondary"
                href={siteConfig.blog}
                target="_blank"
                rel="noreferrer"
                aria-label={c.hero.buttons.blog}
                icon={<PenIcon />}
              >
                {c.hero.buttons.blog}
              </SiteButton>
              <SiteButton
                variant="secondary"
                onClick={() => setDialog("wechat")}
                aria-label={c.hero.buttons.wechat}
                icon={<WeChatIcon />}
              >
                {c.hero.buttons.wechat}
              </SiteButton>
              <SiteButton
                variant="primary"
                onClick={() => setDialog("email")}
                aria-label={c.hero.buttons.contact}
                icon={<MailIcon />}
              >
                {c.hero.buttons.contact}
              </SiteButton>
            </motion.div>
          </div>
        </div>
      </div>

      <ContactDialog
        mode={dialog}
        onClose={() => setDialog(null)}
      />
    </section>
  );
};

export default Hero;
