"use client";

/**
 * 分类作品清单弹层：单个分类或「全部作品」。
 * 作品详情页尚未建设，清单仅展示标题、一句话定位与类型，不产生死链。
 * 文案与作品字段按当前语言取用。
 */
import { siteConfig } from "@/lib/site.config";
import type { CategorySummary, WorkMeta } from "@/lib/works";
import { copy, pick } from "@/lib/i18n";
import { useLocale } from "@/components/site/locale-provider";
import { Dialog } from "@/components/site/dialog";
import { CATEGORY_GLYPHS } from "@/components/site/icons";

interface CategoryDialogProps {
  categories: CategorySummary[];
  total: number;
  activeId: string | null;
  onClose: () => void;
}

const KICKER_CLASS =
  "flex items-center gap-2.5 font-sans text-[10px] uppercase tracking-[0.34em] text-brass";

const WorkRow = ({ work, locale }: { work: WorkMeta; locale: "zh-CN" | "en" }) => (
  <li className="border-t border-line py-3.5 first:border-t-0">
    <div className="flex items-baseline justify-between gap-3">
      <span className="font-display text-[15px] font-semibold text-ivory">
        {pick(locale, work.title, work.title_en)}
      </span>
      <span className="shrink-0 font-sans text-[10.5px] uppercase tracking-[0.08em] text-ivory-dim">
        {pick(locale, work.type, work.type_en) || work.status}
      </span>
    </div>
    <p className="mt-1.5 line-clamp-2 font-sans text-[12.5px] leading-relaxed text-ivory-dim">
      {pick(locale, work.tagline, work.tagline_en)}
    </p>
  </li>
);

const CategoryHeader = ({
  category,
  locale,
  countSuffix,
}: {
  category: CategorySummary;
  locale: "zh-CN" | "en";
  countSuffix: string;
}) => {
  const Glyph = CATEGORY_GLYPHS[category.id] ?? CATEGORY_GLYPHS.all;
  return (
    <header className="flex items-center gap-4">
      <span className="text-brass [&>svg]:size-7">
        <Glyph />
      </span>
      <div>
        <h2
          id="category-dialog-title"
          className="font-display text-[21px] font-bold leading-tight tracking-[0.04em] text-ivory"
        >
          {category.label_en}
        </h2>
        <p className="mt-0.5 font-cjk text-[13px] text-ivory-dim">
          {pick(locale, category.label, category.label_en)} · {category.count}{" "}
          {countSuffix}
        </p>
      </div>
    </header>
  );
};

export const CategoryDialog = ({
  categories,
  total,
  activeId,
  onClose,
}: CategoryDialogProps) => {
  const { locale } = useLocale();
  const c = copy[locale];
  const isAll = activeId === "all";
  const active = isAll ? null : categories.find((cat) => cat.id === activeId) ?? null;

  return (
    <Dialog
      open={activeId !== null}
      onClose={onClose}
      labelledBy="category-dialog-title"
      wide
    >
      {isAll ? (
        <div>
          <p className={KICKER_CLASS}>ALL WORKS · {c.works.allLabel}</p>
          <h2
            id="category-dialog-title"
            className="mt-3 font-display text-[22px] font-bold tracking-[0.06em] text-ivory"
          >
            {c.works.allCount(total)}
          </h2>
          <div className="mt-5 flex flex-col gap-6">
            {categories.map((category) => (
              <section key={category.id}>
                <h3 className="flex items-baseline gap-3 font-cjk text-[14px] tracking-[0.14em] text-brass">
                  {pick(locale, category.label, category.label_en)}
                  <span className="font-display text-[11px] tracking-[0.1em] text-ivory-faint">
                    {String(category.count).padStart(2, "0")}
                  </span>
                </h3>
                <ul>
                  {category.works.map((work) => (
                    <WorkRow key={work.slug} work={work} locale={locale} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      ) : active ? (
        <div>
          <CategoryHeader
            category={active}
            locale={locale}
            countSuffix={c.works.countSuffix}
          />
          <p className="mt-4 font-sans text-[13px] leading-relaxed text-ivory-dim">
            {pick(locale, active.description, active.description_en)}
          </p>
          <ul className="mt-5">
            {active.works.map((work) => (
              <WorkRow key={work.slug} work={work} locale={locale} />
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-6 border-t border-line pt-4 text-center font-sans text-[11.5px] tracking-[0.06em] text-ivory-faint">
        {c.works.detailNote} {siteConfig.email}
      </p>
    </Dialog>
  );
};
