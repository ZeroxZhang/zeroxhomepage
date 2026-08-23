"use client";

/**
 * 作品集交互网格：改编自 OriginKit interactive-grid 的交互机制
 * （hover 抬起 + 邻近联动 + 3D 透视 + 光晕），单元格内容改为
 * 文字与分类符号，支持键盘聚焦等价触发。
 */
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useHydratedReducedMotion } from "@/components/site/use-hydrated-reduced-motion";
import { useLocale } from "@/components/site/locale-provider";
import { copy } from "@/lib/i18n";

export interface GridCell {
  id: string;
  label: string;
  node: ReactNode;
  /** 移动端两列布局时占满整行（用于「全部作品」磁贴）。 */
  wideOnMobile?: boolean;
}

interface WorkGridProps {
  cells: GridCell[];
  onOpen: (id: string) => void;
}

const LEAVE_DELAY = 200;

export const WorkGrid = ({ cells, onOpen }: WorkGridProps) => {
  const reduce = useHydratedReducedMotion();
  const { locale } = useLocale();
  const c = copy[locale];
  const [cols, setCols] = useState(2);
  const [hovered, setHovered] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setCols(mq.matches ? 3 : 2);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(
    () => () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    },
    [],
  );

  const neighbourIds = useMemo(() => {
    if (!hovered) return new Set<string>();
    const index = cells.findIndex((c) => c.id === hovered);
    if (index < 0) return new Set<string>();
    const out = new Set<string>();
    if (index % cols !== 0 && cells[index - 1]) out.add(cells[index - 1].id);
    if (index % cols !== cols - 1 && cells[index + 1]) out.add(cells[index + 1].id);
    if (cells[index - cols]) out.add(cells[index - cols].id);
    if (cells[index + cols]) out.add(cells[index + cols].id);
    return out;
  }, [hovered, cells, cols]);

  const onEnter = (id: string) => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setHovered(id);
  };

  const onLeave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHovered(null), LEAVE_DELAY);
  };

  const cellStyle = (isBig: boolean, isSmall: boolean): CSSProperties => {
    const base: CSSProperties = {
      position: "relative",
      display: "block",
      width: "100%",
      background: "var(--color-ink-card)",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "var(--color-line)",
      borderRadius: 14,
      cursor: "pointer",
      transformStyle: "preserve-3d",
      zIndex: isBig ? 20 : 1,
      transition: reduce
        ? "none"
        : "transform 200ms cubic-bezier(0.215,0.61,0.355,1), border-color 200ms ease",
    };
    if (reduce) return base;
    if (isBig) {
      base.transform = "translateY(-6px) scale(1.035) translateZ(18px)";
      base.borderColor = "var(--color-brass-deep)";
    } else if (isSmall) {
      base.transform = "translateY(-2px) scale(1.012) translateZ(6px)";
      base.borderColor = "var(--color-line)";
    }
    return base;
  };

  return (
    <div style={{ perspective: "1400px", perspectiveOrigin: "50% 18%" }}>
      <div
        className="grid grid-cols-2 gap-3 ipad:grid-cols-3 ipad:gap-4"
        style={{
          transform: reduce ? undefined : "rotateX(3.5deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {cells.map((cell) => {
          const isBig = hovered === cell.id;
          const isSmall = hovered !== null && !isBig && neighbourIds.has(cell.id);
          return (
            <button
              key={cell.id}
              type="button"
              onClick={() => onOpen(cell.id)}
              onPointerEnter={() => onEnter(cell.id)}
              onPointerLeave={onLeave}
              onFocus={() => setHovered(cell.id)}
              onBlur={() => setHovered(null)}
              aria-haspopup="dialog"
              aria-label={c.common.viewCategory(cell.label)}
              className={`group text-left ${cell.wideOnMobile ? "[grid-column:1/-1] ipad:[grid-column:auto]" : ""} ${isBig && !reduce ? "glow-tile" : ""}`}
              style={{
                ...cellStyle(isBig, isSmall),
              }}
            >
              {cell.node}
            </button>
          );
        })}
      </div>
    </div>
  );
};
