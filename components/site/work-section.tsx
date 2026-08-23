"use client";

import type { WorksData } from "@/lib/works";
import { copy } from "@/lib/i18n";
import { useLocale } from "@/components/site/locale-provider";
import { WorkExplorer } from "@/components/site/work-explorer";

/**
 * 首页作品集分区：标题 + 分类交互网格（数据由服务端加载器提供，文案按语言）。
 */
export const WorkSection = ({ data }: { data: WorksData }) => {
  const { locale } = useLocale();
  const c = copy[locale];

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      data-category-count={data.categories.length}
      data-work-count={data.total}
      className="relative"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-20 ipad:px-8 ipad:py-28">
        <header className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 font-sans text-[10.5px] uppercase tracking-[0.36em] text-brass">
            <span className="inline-block size-1.5 rotate-45 border border-brass bg-brass/40" aria-hidden="true" />
            PORTFOLIO · 作品集
            <span className="inline-block size-1.5 rotate-45 border border-brass bg-brass/40" aria-hidden="true" />
          </p>
          <h2
            id="work-heading"
            className={
              locale === "en"
                ? "mt-5 font-display text-[30px] font-bold tracking-[0.02em] text-ivory text-pretty ipad:text-[40px]"
                : "mt-5 font-cjk text-[28px] tracking-[0.06em] text-ivory text-pretty ipad:text-[38px]"
            }
          >
            {c.works.heading(data.categories.length, data.total)}
          </h2>
          <p className="mt-3 max-w-[560px] font-quote text-[15px] italic text-ivory-dim">
            {c.works.sub(data.categories.length, data.total)}
          </p>
        </header>

        <WorkExplorer data={data} />
      </div>
    </section>
  );
};
