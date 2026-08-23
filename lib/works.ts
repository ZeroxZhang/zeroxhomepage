import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";

/**
 * 作品内容加载器（服务端）。
 * 数据源：content/works/index.yaml（注册表 + 分类字典）与 content/works/<slug>.md（frontmatter）。
 * 依据 docs/specs/2026-08-21-portfolio-content-model.md 的 schema v2。
 */

const DEFAULT_WORKS_DIR = path.join(process.cwd(), "content", "works");
const DEFAULT_INDEX_FILE = path.join(DEFAULT_WORKS_DIR, "index.yaml");

const LEVELS = new Set(["flagship", "featured", "standard", "compact"]);
const STATUSES = new Set([
  "active",
  "maintained",
  "private",
  "experiment",
  "complete",
  "legacy",
]);
const REQUIRED_TEXT_FIELDS = [
  "title",
  "title_en",
  "tagline",
  "tagline_en",
  "summary",
  "summary_en",
  "category",
  "type",
  "type_en",
] as const;

export interface CategoryInfo {
  id: string;
  label: string;
  label_en: string;
  description: string;
  description_en: string;
}

export interface WorkLink {
  label: string;
  label_en: string;
  type: string;
  url: string;
  primary: boolean;
  /** 在首页作品清单中额外展示为独立外链入口。 */
  show_on_homepage: boolean;
}

export interface WorkMeta {
  slug: string;
  title: string;
  title_en: string;
  tagline: string;
  tagline_en: string;
  summary: string;
  summary_en: string;
  category: string;
  type: string;
  type_en: string;
  level: string;
  status: string;
  featured: boolean;
  weight: number;
  links: WorkLink[];
}

export interface CategorySummary extends CategoryInfo {
  count: number;
  weight: number;
  /** 分类内按 featured、weight、title 排序的前几名作品（首页磁贴预览用）。 */
  top: WorkMeta[];
  /** 分类内全部作品（分类弹层用）。 */
  works: WorkMeta[];
}

export interface WorksData {
  categories: CategorySummary[];
  total: number;
  featured: WorkMeta[];
}

interface IndexYaml {
  schema_version?: number;
  categories?: CategoryInfo[];
  works?: string[];
}

interface WorksDataOptions {
  worksDir?: string;
  indexFile?: string;
}

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function fail(slug: string, message: string): never {
  throw new Error(`[works] ${slug}.md ${message}`);
}

const requiredText = (
  fm: Record<string, unknown>,
  slug: string,
  field: (typeof REQUIRED_TEXT_FIELDS)[number],
): string => {
  const value = fm[field];
  if (typeof value !== "string") {
    fail(slug, `缺少必填字段 ${field}`);
  }
  if (value.trim() === "") {
    fail(slug, `缺少必填字段 ${field}`);
  }
  return value.trim();
};

const validateBody = (raw: string, slug: string) => {
  const markers = [...raw.matchAll(/<!--\s*locale:\s*(zh-CN|en)\s*-->/g)];
  if (
    markers.length !== 2 ||
    markers[0]?.[1] !== "zh-CN" ||
    markers[1]?.[1] !== "en"
  ) {
    fail(slug, "正文必须按顺序包含且仅包含 zh-CN、en 两个 locale 块");
  }

  const zhMarker = markers[0]!;
  const enMarker = markers[1]!;
  const bodies = [
    raw.slice((zhMarker.index ?? 0) + zhMarker[0].length, enMarker.index),
    raw.slice((enMarker.index ?? 0) + enMarker[0].length),
  ];
  for (const [index, body] of bodies.entries()) {
    const locale = index === 0 ? "zh-CN" : "en";
    const headings = [...body.matchAll(/^(#{1,6})\s+\S.*$/gm)].map(
      (match) => match[1].length,
    );
    if (headings.filter((level) => level === 1).length !== 1) {
      fail(slug, `${locale} 正文必须恰好包含一个 H1`);
    }
    for (let headingIndex = 1; headingIndex < headings.length; headingIndex += 1) {
      if (headings[headingIndex] > headings[headingIndex - 1] + 1) {
        fail(slug, `${locale} 正文标题层级不能跳级`);
      }
    }
  }
};

function parseWorkFile(slug: string, worksDir: string): WorkMeta {
  const raw = readFileSync(path.join(worksDir, `${slug}.md`), "utf8");
  const match = FRONTMATTER_RE.exec(raw);
  if (!match) {
    throw new Error(`[works] ${slug}.md 缺少 YAML frontmatter`);
  }
  const fm = parseYaml(match[1]) as Record<string, unknown>;
  if (!fm || typeof fm !== "object" || Array.isArray(fm)) {
    fail(slug, "frontmatter 必须是对象");
  }
  if (fm.schema_version !== 2) fail(slug, "schema_version 必须为 2");
  if (fm.slug !== slug) fail(slug, `slug 必须与文件名一致（当前为 ${String(fm.slug)}）`);
  if (fm.default_locale !== "zh-CN") fail(slug, "default_locale 必须为 zh-CN");
  if (
    !Array.isArray(fm.locales) ||
    fm.locales.length !== 2 ||
    fm.locales[0] !== "zh-CN" ||
    fm.locales[1] !== "en"
  ) {
    fail(slug, "locales 必须为 [zh-CN, en]");
  }

  const text = Object.fromEntries(
    REQUIRED_TEXT_FIELDS.map((field) => [field, requiredText(fm, slug, field)]),
  ) as Record<(typeof REQUIRED_TEXT_FIELDS)[number], string>;
  if (!LEVELS.has(String(fm.level))) fail(slug, `level 非法：${String(fm.level)}`);
  if (!STATUSES.has(String(fm.status))) fail(slug, `status 非法：${String(fm.status)}`);
  const featured = fm.featured;
  const weight = fm.weight;
  if (typeof featured !== "boolean") fail(slug, "featured 必须是布尔值");
  if (typeof weight !== "number" || !Number.isFinite(weight)) {
    fail(slug, "weight 必须是有限数字");
  }

  for (const field of ["tags", "tags_en", "stack", "links", "related"] as const) {
    if (!Array.isArray(fm[field])) fail(slug, `${field} 必须是数组`);
  }
  if ((fm.tags as unknown[]).length !== (fm.tags_en as unknown[]).length) {
    fail(slug, "tags 与 tags_en 数量必须一致");
  }
  const links = fm.links as Record<string, unknown>[];
  for (const [index, link] of links.entries()) {
    if (!link || typeof link !== "object" || Array.isArray(link)) {
      fail(slug, `links[${index}] 必须是对象`);
    }
    for (const field of ["label", "label_en", "type", "url"] as const) {
      if (typeof link[field] !== "string" || link[field].trim() === "") {
        fail(slug, `links[${index}].${field} 必须是非空字符串`);
      }
    }
    if (typeof link.primary !== "boolean") {
      fail(slug, `links[${index}].primary 必须是布尔值`);
    }
    let url: URL;
    try {
      url = new URL(String(link.url));
    } catch {
      fail(slug, `links[${index}].url 不是有效 URL`);
    }
    if (url.protocol !== "https:") fail(slug, `links[${index}].url 必须使用 https`);
    if (
      link.show_on_homepage !== undefined &&
      typeof link.show_on_homepage !== "boolean"
    ) {
      fail(slug, `links[${index}].show_on_homepage 必须是布尔值`);
    }
    if (link.show_on_homepage === true && link.type !== "website") {
      fail(slug, `links[${index}] 只有 website 链接可以展示在首页`);
    }
  }
  if (
    fm.status !== "private" &&
    links.filter((link) => link.primary === true).length !== 1
  ) {
    fail(slug, "公开作品必须恰好包含一个 primary 链接");
  }
  if (links.filter((link) => link.show_on_homepage === true).length > 1) {
    fail(slug, "最多只能有一个链接展示在首页");
  }
  validateBody(raw.slice(match[0].length), slug);

  return {
    slug,
    ...text,
    level: String(fm.level),
    status: String(fm.status),
    featured,
    weight,
    links: links.map((link) => ({
      label: String(link.label),
      label_en: String(link.label_en),
      type: String(link.type),
      url: String(link.url),
      primary: link.primary === true,
      show_on_homepage: link.show_on_homepage === true,
    })),
  };
}

const byHomepagePriority = (a: WorkMeta, b: WorkMeta) =>
  Number(b.featured) - Number(a.featured) ||
  a.weight - b.weight ||
  a.title.localeCompare(b.title, "zh-CN");

export function getWorksData(options: WorksDataOptions = {}): WorksData {
  const worksDir = options.worksDir ?? DEFAULT_WORKS_DIR;
  const indexFile = options.indexFile ?? DEFAULT_INDEX_FILE;
  const indexRaw = readFileSync(indexFile, "utf8");
  const index = parseYaml(indexRaw) as IndexYaml;
  if (index.schema_version !== 2) {
    throw new Error("[works] index.yaml schema_version 必须为 2");
  }
  const categories = index.categories ?? [];
  const slugs = index.works ?? [];
  if (new Set(slugs).size !== slugs.length) {
    throw new Error("[works] index.yaml 包含重复 slug");
  }
  if (new Set(categories.map((category) => category.id)).size !== categories.length) {
    throw new Error("[works] index.yaml 包含重复分类 id");
  }
  for (const category of categories) {
    for (const field of ["id", "label", "label_en", "description", "description_en"] as const) {
      if (typeof category[field] !== "string" || category[field].trim() === "") {
        throw new Error(`[works] 分类 ${String(category.id)} 缺少 ${field}`);
      }
    }
  }

  // 注册表与实际文件一一对应（README.md 为目录说明，非作品文件）
  const files = readdirSync(worksDir)
    .filter((f) => f.endsWith(".md") && f !== "README.md")
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
  const registrySet = new Set(slugs);
  for (const f of files) {
    if (!registrySet.has(f)) {
      throw new Error(`[works] ${f}.md 未在 index.yaml 注册`);
    }
  }
  for (const s of slugs) {
    if (!files.includes(s)) {
      throw new Error(`[works] index.yaml 中的 ${s} 缺少对应 md 文件`);
    }
  }

  const works = slugs.map((slug) => parseWorkFile(slug, worksDir));
  const knownCategories = new Set(categories.map((c) => c.id));
  const knownSlugs = new Set(slugs);
  for (const w of works) {
    if (!knownCategories.has(w.category)) {
      throw new Error(`[works] ${w.slug} 使用了未定义分类 ${w.category}`);
    }
    const raw = readFileSync(path.join(worksDir, `${w.slug}.md`), "utf8");
    const fm = parseYaml(FRONTMATTER_RE.exec(raw)?.[1] ?? "") as Record<string, unknown>;
    for (const related of fm.related as unknown[]) {
      if (typeof related !== "string" || !knownSlugs.has(related)) {
        throw new Error(`[works] ${w.slug}.md related 引用了未知 slug ${String(related)}`);
      }
    }
  }

  const summaries: CategorySummary[] = categories.map((c) => {
    const inCategory = works.filter((w) => w.category === c.id).sort(byHomepagePriority);
    return {
      ...c,
      count: inCategory.length,
      weight: inCategory.reduce((sum, w) => sum + w.weight, 0),
      top: inCategory.slice(0, 3),
      works: inCategory,
    };
  });

  return {
    categories: summaries,
    total: works.length,
    featured: works.filter((w) => w.featured).sort(byHomepagePriority),
  };
}
