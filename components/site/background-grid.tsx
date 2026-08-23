"use client";

/**
 * 全页背景动效网格：固定视口、平面（无倾斜）、低对比度，
 * 铺在整个首页之后（作品区与页脚透过透明背景可见）。
 *
 * 与英雄区倾斜地面的自然过渡（2026-08-23）：
 * - 英雄区倾斜地面在自身底部通过 mask 淡出；
 * - 英雄区背景色在底部 13% 渐隐为透明；
 * - 本固定网格由此透出，两套网格在英雄区底缘交叉溶解，无硬边。
 *
 * 交互：监听 window（pointerTarget），光标在页面任意位置移动都会
 * 吸引点阵；容器 pointer-events:none，绝不拦截页面点击。
 * prefers-reduced-motion：保留用户驱动的吸引，关闭拖尾。
 */
import KineticGrid from "@/components/originkit/ui/kineticgrid";
import { useHydratedReducedMotion } from "@/components/site/use-hydrated-reduced-motion";

export const BackgroundGrid = () => {
  const reduceMotion = useHydratedReducedMotion();

  return (
    <div
      id="background-grid"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    >
      <KineticGrid
        background="transparent"
        dotColor="rgba(242,239,228,0.55)"
        lineColor="rgba(217,180,91,0.45)"
        trailColor="rgba(239,211,138,0.5)"
        spacing={56}
        radius={240}
        strength={4}
        trail={!reduceMotion}
        reducedMotion={reduceMotion}
        pointerTarget={typeof window === "undefined" ? null : window}
      />
    </div>
  );
};
