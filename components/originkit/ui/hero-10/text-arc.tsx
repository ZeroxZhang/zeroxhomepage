// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

import { useEffect, useRef, useState } from "react";
import CircularText from "@/components/originkit/ui/hero-10/text-ring";

/**
 * Upper arc of the site motto above the headline.
 * Edges fade via alpha mask only — no painted overlays — so text blends into bg.
 *
 * 站点适配（2026-08-23）：格言短语、颜色与字体改为本站主题
 * 「黑曜石与黄铜」，详见 components/originkit/ORIGIN.md。
 */

/** Matches `--breakpoint-*` in globals.css */
const IPAD_MIN = 768;
const DESKTOP_SM_MIN = 1280;
const WIDE_LG_MIN = 1600;

/**
 * CircularText diameter per breakpoint:
 * - android-sm (< 768 / --breakpoint-android-sm band): 440
 * - ipad (≥ 768): 750
 * - desktop-sm (≥ 1280): 900
 * - wide-lg (≥ 1600): 1100
 */
const DIAMETER = {
  androidSm: 440,
  ipad: 750,
  desktopSm: 900,
  wideLg: 1100,
} as const;

const getDiameter = (width: number) => {
  if (width >= WIDE_LG_MIN) return DIAMETER.wideLg;
  if (width >= DESKTOP_SM_MIN) return DIAMETER.desktopSm;
  if (width >= IPAD_MIN) return DIAMETER.ipad;
  // android-sm and below
  return DIAMETER.androidSm;
};

const getFontSize = (width: number) =>
  width >= DESKTOP_SM_MIN ? "16px" : "13px";

export const TextArc = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [fontSize, setFontSize] = useState("13px");
  const [diameter, setDiameter] = useState<(typeof DIAMETER)[keyof typeof DIAMETER]>(
    DIAMETER.androidSm,
  );

  useEffect(() => {
    setMounted(true);

    const sync = () => {
      const width = window.innerWidth;
      setDiameter(getDiameter(width));
      setFontSize(getFontSize(width));
    };

    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let visible = false;
    const sync = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0 },
    );
    observer.observe(host);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  // Soft L/R fade: text alpha → 0 into #091009 (no solid bars)
  const edgeMask =
    "linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%)";

  return (
    <div
      ref={hostRef}
      className="pointer-events-none relative mx-auto mb-3 h-[56px] w-full max-w-[316px] overflow-hidden"
      aria-hidden="true"
      style={{
        maskImage: edgeMask,
        WebkitMaskImage: edgeMask,
        maskMode: "alpha",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      {mounted && active ? (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{ width: diameter, height: diameter }}
        >
          <CircularText
            words={["SIC ITUR AD ASTRA", "探索永无止境"]}
            separator=" · "
            diameter={diameter}
            color="rgba(242,239,228,0.82)"
            onHover="pause"
            hoverSpeed={8}
            transition={{ type: "tween", duration: 40, ease: "linear" }}
            font={{
              fontFamily: "Cinzel, Georgia, serif",
              fontWeight: 500,
              fontSize,
              letterSpacing: "0.06em",
              lineHeight: "1em",
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ) : null}
    </div>
  );
};
