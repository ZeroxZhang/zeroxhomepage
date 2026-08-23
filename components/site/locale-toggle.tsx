"use client";

/**
 * 语言切换：两枚等距键帽（OriginKit keycap-button / DesignPass IsometricButton，
 * MIT，版权注释见交付文件）。激活键帽黄铜发光，未激活键帽苔绿低光。
 * 点击经内层真实按钮冒泡到外层 onClick；内层按钮负责键盘可达，
 * 并通过 effect 补充 aria-label / aria-pressed。
 */
import { useEffect, useRef } from "react";
import IsometricButton from "@/components/originkit/ui/keycap-button";
import { setLocale, useLocale } from "@/components/site/locale-provider";
import { copy } from "@/lib/i18n";

const CAP_FONT: Record<string, string | number> = {
  fontFamily: "var(--font-sans)",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.05em",
};

const CAP_BASE = {
  showText: true,
  padding: "10px 13px",
  rounded: 38,
  font: CAP_FONT,
  prism: { thickness: 9, float: 8, hoverFloat: 6 },
  camera: { tilt: 49, rotate: -37 },
  style: { minWidth: 46, minHeight: 30 },
};

const capTheme = (active: boolean) => {
  return {
    colors: {
      fill: active ? "#16130A" : "#0E110C",
      textColor: active ? "#D9B45B" : "rgba(242,239,228,0.5)",
      hoverTextColor: "#F2EFE4",
    },
    prism: {
      ...CAP_BASE.prism,
      color: active ? "#D9B45B" : "#7C9476",
      intensity: active ? 100 : 30,
    },
  };
};

export const LocaleToggle = () => {
  const { locale } = useLocale();
  const groupRef = useRef<HTMLDivElement>(null);
  const c = copy[locale];

  useEffect(() => {
    const root = groupRef.current;
    if (!root) return;
    const buttons = root.querySelectorAll("button");
    const zh = buttons[0];
    const en = buttons[1];
    if (zh) {
      zh.setAttribute("aria-label", c.common.langZh);
      zh.setAttribute("aria-pressed", String(locale === "zh-CN"));
    }
    if (en) {
      en.setAttribute("aria-label", c.common.langEn);
      en.setAttribute("aria-pressed", String(locale === "en"));
    }
  }, [locale, c]);

  return (
    <div
      ref={groupRef}
      data-locale-toggle
      className="flex shrink-0 translate-y-2 items-center gap-2"
    >
      <div onClick={() => setLocale("zh-CN")}>
        <IsometricButton label="中" {...CAP_BASE} {...capTheme(locale === "zh-CN")} />
      </div>
      <div onClick={() => setLocale("en")}>
        <IsometricButton label="EN" {...CAP_BASE} {...capTheme(locale === "en")} />
      </div>
    </div>
  );
};
