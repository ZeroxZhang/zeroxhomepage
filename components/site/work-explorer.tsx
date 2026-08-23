"use client";

/**
 * 作品集交互区：持有弹层状态，组装分类磁贴与「全部作品」磁贴。
 * 分类字典与作品数据来自 content/works（服务端加载后传入），
 * 文案与作品字段按当前语言取用（lib/i18n.ts + 双语文案字段）。
 */
import { useState } from "react";
import type { WorksData } from "@/lib/works";
import { copy, pick } from "@/lib/i18n";
import { useLocale } from "@/components/site/locale-provider";
import { WorkGrid, type GridCell } from "@/components/site/work-grid";
import { CategoryTile } from "@/components/site/category-tile";
import { CategoryDialog } from "@/components/site/category-dialog";
import { CATEGORY_GLYPHS, GlyphAll } from "@/components/site/icons";

export const WorkExplorer = ({ data }: { data: WorksData }) => {
  const { locale } = useLocale();
  const c = copy[locale];
  const [activeId, setActiveId] = useState<string | null>(null);

  const cells: GridCell[] = [
    ...data.categories.map((category) => {
      const Glyph = CATEGORY_GLYPHS[category.id] ?? GlyphAll;
      return {
        id: category.id,
        label: pick(locale, category.label, category.label_en),
        node: (
          <CategoryTile
            icon={<Glyph />}
            labelEn={category.label_en}
            label={category.label}
            count={category.count}
            topLines={category.top
              .slice(0, 2)
              .map((w) =>
                `${pick(locale, w.title, w.title_en)} · ${pick(locale, w.type, w.type_en)}`,
              )}
            hint={c.works.hint(category.count)}
          />
        ),
      };
    }),
    {
      id: "all",
      label: c.works.allLabel,
      wideOnMobile: true,
      node: (
        <CategoryTile
          icon={<GlyphAll />}
          labelEn="All Works"
          label={c.works.allLabel}
          count={data.total}
          topLines={[]}
          hint={c.works.hint(data.total)}
          isAll
        />
      ),
    },
  ];

  return (
    <>
      <div className="mt-12 ipad:mt-16">
        <WorkGrid cells={cells} onOpen={setActiveId} />
      </div>
      <CategoryDialog
        categories={data.categories}
        total={data.total}
        activeId={activeId}
        onClose={() => setActiveId(null)}
      />
    </>
  );
};
