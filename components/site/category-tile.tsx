/**
 * 分类磁贴内容（表现层，供交互网格按钮内渲染）。
 * 视觉元素：分类符号 + 计数 + 双语标签 + 代表作品预览。
 */
import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "@/components/site/icons";

interface CategoryTileProps {
  icon: ReactNode;
  labelEn: string;
  label: string;
  count: number;
  /** 代表作品预览（标题 · 类型），最多两条。 */
  topLines: string[];
  /** hover 提示（按语言由调用方传入）。 */
  hint: string;
  isAll?: boolean;
}

export const CategoryTile = ({
  icon,
  labelEn,
  label,
  count,
  topLines,
  hint,
  isAll = false,
}: CategoryTileProps) => (
  <div className="flex h-full min-h-[168px] flex-col justify-between gap-4 p-4 ipad:min-h-[190px] ipad:p-5">
    <div className="flex items-start justify-between gap-3">
      <span className="text-brass [&>svg]:size-6">{icon}</span>
      <span className="font-display text-[15px] font-semibold leading-none text-brass/90 tabular-nums">
        {String(count).padStart(2, "0")}
      </span>
    </div>

    <div className="flex flex-col gap-1.5">
      <div className="font-display text-[17px] font-semibold leading-tight text-ivory ipad:text-[19px]">
        {labelEn}
      </div>
      <div className="font-cjk text-[13.5px] text-ivory-dim">{label}</div>
      {!isAll && topLines.length > 0 ? (
        <ul className="mt-2 hidden flex-col gap-1 border-t border-line pt-2.5 ipad:flex">
          {topLines.map((line) => (
            <li key={line} className="truncate font-sans text-[11.5px] text-ivory-dim">
              {line}
            </li>
          ))}
        </ul>
      ) : null}
    </div>

    <div className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.22em] text-brass opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
      {hint}
      <ArrowUpRightIcon className="size-3" />
    </div>
  </div>
);
