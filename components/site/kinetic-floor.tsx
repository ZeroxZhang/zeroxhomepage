"use client";

/**
 * 英雄区底部地面：Kinetic Grid（OriginKit 交付）包裹在透视容器中，
 * 与 Hero 10 原 Prism Grid 相同的倾斜地面构图。
 *
 * 交互模型（2026-08-23 修订）：
 * - 指针监听提升到 window 层：光标在英雄区任意位置移动（包括标题、
 *   按钮等正文内容上方）都会吸引点阵、点亮网格线并留下拖尾，
 *   保证「可感知的交互」，不再被内容层拦截；
 * - 透视逆变换：画布承载 rotateX 倾斜，包围盒线性映射会严重失真
 *   （光标与点阵错位，看起来"不动"）。这里按透视投影公式把屏幕
 *   坐标精确反解到点阵平面，点阵与拖尾跟手 1:1；
 * - prefers-reduced-motion：保留用户驱动的点阵吸引（无自主运动），
 *   仅关闭拖尾；
 * - 性能：离开视口或页面隐藏时卸载 Canvas，停止 rAF。
 *
 * 几何约定：透视容器中心 = 相机目标；平面绕 X 轴倾斜 θ、缩放 s、
 * 相机距离 d。屏幕 qy 反解 ly = d·qy / (s·(d·cosθ + qy·sinθ))。
 * θ=54°、s=1.28、d=1000 时平面底边恰好投影到容器底边（近端不裁切）。
 */
import { useCallback, useEffect, useRef, useState } from "react";
import KineticGrid from "@/components/originkit/ui/kineticgrid";
import { useHydratedReducedMotion } from "@/components/site/use-hydrated-reduced-motion";

const TILT_DEG = 54;
const PLANE_SCALE = 1.28;
const PERSPECTIVE = 1000;

const TILT_STYLE: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  transform: `rotateX(${TILT_DEG}deg) scale(${PLANE_SCALE})`,
  transformOrigin: "50% 50%",
};

export const KineticFloor = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useHydratedReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let visible = false;
    const sync = () => setActive(visible && !document.hidden);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(host);
    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  /** 屏幕坐标 → 点阵平面逻辑坐标（透视投影精确逆变换）。 */
  const mapPointer = useCallback(
    (clientX: number, clientY: number) => {
      const el = planeRef.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return null;

      const ox = rect.left + rect.width / 2;
      const oy = rect.top + rect.height / 2;
      const qx = clientX - ox;
      const qy = clientY - oy;

      const rad = (TILT_DEG * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const d = PERSPECTIVE;
      const s = PLANE_SCALE;

      const denomY = s * (d * cos + qy * sin);
      if (Math.abs(denomY) < 1e-6) return null;
      const ly = (d * qy) / denomY;
      const lx = (qx * (d - ly * s * sin)) / (s * d);

      return { x: lx + rect.width / 2, y: ly + rect.height / 2 };
    },
    [],
  );

  return (
    <div
      id="kinetic-floor"
      ref={hostRef}
      className="absolute inset-x-0 bottom-0 z-[1] h-[54%] ipad:h-[58%] overflow-hidden"
      aria-hidden="true"
    >
      {/* 遮罩：底部淡出（与全页背景网格交叉溶解），中段最醒目，顶部渐隐 */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_top,transparent_0%,rgba(0,0,0,0.8)_10%,black_22%,black_50%,rgba(0,0,0,0.55)_68%,transparent_88%)]">
        <div
          ref={planeRef}
          className="absolute inset-0"
          style={{ perspective: `${PERSPECTIVE}px`, perspectiveOrigin: "50% 50%" }}
        >
          {active ? (
            <KineticGrid
              background="transparent"
              dotColor="#F2EFE4"
              lineColor="#D9B45B"
              trailColor="#EFD38A"
              spacing={44}
              radius={320}
              strength={5}
              trail={!reduceMotion}
              reducedMotion={reduceMotion}
              pointerTarget={typeof window === "undefined" ? null : window}
              mapPointer={mapPointer}
              style={TILT_STYLE}
            />
          ) : null}
        </div>
      </div>

      {/* 地平线暖光：衔接地面与正文，底部同样淡出 */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(217,180,91,0.13)_0%,rgba(217,180,91,0.05)_45%,transparent_70%)] [mask-image:linear-gradient(to_top,transparent_0%,black_26%)]"
        aria-hidden="true"
      />
    </div>
  );
};
