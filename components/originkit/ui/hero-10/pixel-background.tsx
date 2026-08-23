// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

import { useEffect, useState, type CSSProperties } from "react";
import PixelCard from "@/components/originkit/ui/hero-10/pixel-card";

/** Matches `--breakpoint-ipad` / `--breakpoint-desktop-sm` */
const IPAD_MIN = 768;
const DESKTOP_SM_MIN = 1280;

type MaskStops = {
  /** Stay fully opaque until this % of the ellipse */
  solid: number;
  /** Fully transparent by this % — lower = stronger (more) mask */
  fade: number;
};

/**
 * Gap ↑ → mask ↓ (softer fade, more of each panel stays visible).
 * Mirrors flex gaps: mobile 20 · ipad 0 · desktop-sm 169.
 */
const MASK_BY_GAP = {
  /** gap-5 — tighter layout, stronger corner fade */
  mobile: { solid: 18, fade: 58 } satisfies MaskStops,
  /** ipad:gap-0 — no flex gap, strongest mask so center stays clear */
  ipad: { solid: 12, fade: 52 } satisfies MaskStops,
  /** desktop-sm:gap-[169px] — wide flex gap, lightest mask */
  desktop: { solid: 42, fade: 88 } satisfies MaskStops,
} as const;

type GapTier = keyof typeof MASK_BY_GAP;

const getGapTier = (width: number): GapTier => {
  if (width >= DESKTOP_SM_MIN) return "desktop";
  if (width >= IPAD_MIN) return "ipad";
  return "mobile";
};

const maskStyle = (side: "left" | "right", stops: MaskStops): CSSProperties => {
  // 站点适配（2026-08-23）：原交付把 Tailwind 工具类名直接写入 maskImage
  // （无效 CSS）。改为真实 radial-gradient 遮罩，语义与注释一致：
  // 至 solid% 完全不透明，到 fade% 完全透明。
  const at = side === "left" ? "0% 0%" : "100% 0%";
  const img = `radial-gradient(farthest-corner at ${at}, rgba(0,0,0,1) ${stops.solid}%, rgba(0,0,0,0) ${stops.fade}%)`;
  return {
    maskImage: img,
    WebkitMaskImage: img,
    maskSize: "100% 100%",
    WebkitMaskSize: "100% 100%",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
  };
};

const PIXEL_PROPS = {
  // 站点适配（2026-08-23）：绿色 #5AF5A3 改为黄铜 #D9B45B，匹配整站主题。
  colors: ["#F2EFE4", "#F2EFE4CC", "#F2EFE499", "#D9B45B"],
  appearFrom: "top" as const,
  trigger: "auto" as const,
  position: "top" as const,
  replay: false,
  gap: 8,
  pixelSize: 3,
  speed: 70,
  backgroundColor: "transparent",
  padding: 0,
  borderWidth: 0,
  borderColor: "transparent",
  radius: 0,
  showLabel: false,
  transition: { type: "tween" as const, duration: 0.65, ease: "easeOut" },
  style: {
    width: "100%",
    height: "100%",
    minWidth: 0,
    minHeight: 0,
    isolation: "auto" as const,
  },
};

/**
 * Twin pixel washes flush to page top-left / top-right.
 * Flex gap + mask strength stay in sync (more gap → less mask).
 * max-w 1512 matches navbar; dropped at wide-lg (full bleed).
 */
export const PixelBackground = () => {
  const [tier, setTier] = useState<GapTier>("mobile");

  useEffect(() => {
    const sync = () => setTier(getGapTier(window.innerWidth));
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const stops = MASK_BY_GAP[tier];

  return (
    <div
      className="pointer-events-none absolute top-0 left-1/2 z-[1] flex h-[48%] w-full max-w-[1512px] -translate-x-1/2 gap-10 overflow-hidden ipad:h-[42%] ipad:gap-10 desktop-sm:gap-[50px] wide-lg:max-w-none"
      aria-hidden="true"
    >
      <div className="relative h-full min-w-0 flex-1 mask-ellipse mask-radial-farthest-corner mask-radial-at-top-left mask-radial-from-30% mask-radial-to-60%">
        <PixelCard
          key={`pixel-left-${tier}`}
          {...PIXEL_PROPS}
          canvasStyle={maskStyle("left", stops)}
        />
      </div>
      <div className="relative h-full min-w-0 flex-1 mask-ellipse mask-radial-farthest-corner mask-radial-at-top-right ipad:mask-radial-from-30% mask-radial-to-60% mask-radial-from-50%">
        <PixelCard
          key={`pixel-right-${tier}`}
          {...PIXEL_PROPS}
          canvasStyle={maskStyle("right", stops)}
        />
      </div>
    </div>
  );
};
