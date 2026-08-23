import assert from "node:assert/strict";
import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { WORK_SLUGS } from "../lib/work-slugs.ts";
import { getWorksData } from "../lib/works.ts";

const createHomepageLinkFixture = (linkLines) => {
  const root = mkdtempSync(path.join(tmpdir(), "portfolio-links-"));
  const worksDir = path.join(root, "works");
  const indexFile = path.join(worksDir, "index.yaml");
  mkdirSync(worksDir);
  writeFileSync(
    indexFile,
    [
      "schema_version: 2",
      "categories:",
      "  - id: utilities",
      "    label: 实用工具",
      "    label_en: Utilities",
      "    description: 测试分类",
      "    description_en: Test category",
      "works:",
      "  - fixture",
      "",
    ].join("\n"),
  );
  writeFileSync(
    path.join(worksDir, "fixture.md"),
    [
      "---",
      "schema_version: 2",
      "slug: fixture",
      "default_locale: zh-CN",
      "locales: [zh-CN, en]",
      "title: 测试作品",
      "title_en: Fixture",
      "tagline: 中文定位",
      "tagline_en: English tagline",
      "summary: 中文摘要",
      "summary_en: English summary",
      "category: utilities",
      "type: 工具",
      "type_en: Utility",
      "level: standard",
      "status: private",
      "featured: false",
      "weight: 1",
      "tags: []",
      "tags_en: []",
      "stack: []",
      "links:",
      ...linkLines,
      "related: []",
      "---",
      "",
      "<!-- locale: zh-CN -->",
      "",
      "# 中文标题",
      "",
      "<!-- locale: en -->",
      "",
      "# English title",
      "",
    ].join("\n"),
  );

  return { root, worksDir, indexFile };
};

test("首页作品按精选优先、权重升序、标题稳定排序", () => {
  const data = getWorksData();
  const publishing = data.categories.find((item) => item.id === "content-publishing");
  const liveProducts = data.categories.find((item) => item.id === "web-products");

  assert.deepEqual(
    publishing?.works.slice(0, 3).map((work) => work.slug),
    ["huashu-bookwriter", "md2book", "paper-to-course"],
  );
  assert.deepEqual(
    liveProducts?.works.slice(0, 3).map((work) => work.slug),
    ["lingmou", "silenzio", "z-slides"],
  );
});

test("所有注册作品都有同域静态详情页", () => {
  const works = getWorksData().categories.flatMap((category) => category.works);
  const knownSlugs = new Set(works.map((work) => work.slug));

  assert.equal(works.length, 35);
  assert.deepEqual(
    [...knownSlugs].sort(),
    [...WORK_SLUGS].sort(),
    "部署路由清单必须与内容注册表一致",
  );
  for (const work of works) {
    const pagePath = path.join(process.cwd(), "public", "work", work.slug, "index.html");
    assert.ok(existsSync(pagePath), `${work.slug} 缺少静态详情页`);

    const page = readFileSync(pagePath, "utf8");
    assert.doesNotMatch(page, /\/Volumes\/Out\//, `${work.slug} 包含本机绝对路径`);
    assert.match(page, /href="\/#work"/, `${work.slug} 缺少返回首页作品区链接`);
    assert.match(
      page,
      new RegExp(`rel="canonical" href="https://zeroxzhang\\.cc/work/${work.slug}"`),
      `${work.slug} 缺少正式 canonical 地址`,
    );
    const promotedWebsite = work.links.find((link) => link.show_on_homepage);
    if (promotedWebsite) {
      assert.ok(
        page.includes(`href="${promotedWebsite.url}"`),
        `${work.slug} 静态页官网地址与内容源不一致`,
      );
    }

    const renderedSource = page.replace(/<!--[\s\S]*?-->/g, "");
    for (const match of renderedSource.matchAll(/(?:href|src)="(\/work-assets\/[^"]+)"/g)) {
      assert.ok(
        existsSync(path.join(process.cwd(), "public", match[1].slice(1))),
        `${work.slug} 引用了缺失资源 ${match[1]}`,
      );
    }
    for (const match of renderedSource.matchAll(/href="\/work\/([a-z0-9-]+)"/g)) {
      assert.ok(knownSlugs.has(match[1]), `${work.slug} 引用了未知详情页 ${match[1]}`);
    }
  }
});

test("首页只提升三个指定产品的官网入口", () => {
  const works = getWorksData().categories.flatMap((category) => category.works);
  const promoted = works.flatMap((work) =>
    work.links
      .filter((link) => link.show_on_homepage)
      .map((link) => [work.slug, link.url]),
  );

  assert.deepEqual(promoted.sort(), [
    ["lingmou", "https://zrcfzy.top/"],
    ["silenzio", "https://silenzio.cn"],
    ["z-slides", "https://slides.zeroxzhang.cc"],
  ]);
});

test("内容加载器拒绝非法的首页官网入口配置", () => {
  const cases = [
    {
      name: "缺失链接类型",
      links: [
        "  - label: 打开网站",
        "    label_en: Open website",
        "    url: https://example.com",
        "    primary: true",
      ],
      error: /links\[0\]\.type 必须是非空字符串/,
    },
    {
      name: "非布尔值",
      links: [
        "  - label: 打开网站",
        "    label_en: Open website",
        "    type: website",
        "    url: https://example.com",
        "    primary: true",
        "    show_on_homepage: 'yes'",
      ],
      error: /show_on_homepage 必须是布尔值/,
    },
    {
      name: "非官网链接",
      links: [
        "  - label: 打开仓库",
        "    label_en: Open repository",
        "    type: repository",
        "    url: https://example.com/repository",
        "    primary: true",
        "    show_on_homepage: true",
      ],
      error: /只有 website 链接可以展示在首页/,
    },
    {
      name: "重复提升",
      links: [
        "  - label: 打开网站一",
        "    label_en: Open website one",
        "    type: website",
        "    url: https://one.example.com",
        "    primary: true",
        "    show_on_homepage: true",
        "  - label: 打开网站二",
        "    label_en: Open website two",
        "    type: website",
        "    url: https://two.example.com",
        "    primary: false",
        "    show_on_homepage: true",
      ],
      error: /最多只能有一个链接展示在首页/,
    },
  ];

  for (const fixtureCase of cases) {
    const { root, worksDir, indexFile } = createHomepageLinkFixture(fixtureCase.links);
    try {
      assert.throws(
        () => getWorksData({ worksDir, indexFile }),
        fixtureCase.error,
        fixtureCase.name,
      );
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  }
});

test("内容加载器拒绝缺失双语必填字段的作品", () => {
  const root = mkdtempSync(path.join(tmpdir(), "portfolio-content-"));
  const worksDir = path.join(root, "works");
  mkdirSync(worksDir);
  writeFileSync(
    path.join(worksDir, "index.yaml"),
    [
      "schema_version: 2",
      "categories:",
      "  - id: utilities",
      "    label: 实用工具",
      "    label_en: Utilities",
      "    description: 测试分类",
      "    description_en: Test category",
      "works:",
      "  - broken",
      "",
    ].join("\n"),
  );
  writeFileSync(
    path.join(worksDir, "broken.md"),
    [
      "---",
      "schema_version: 2",
      "slug: broken",
      "default_locale: zh-CN",
      "locales: [zh-CN, en]",
      "title: 缺失英文标题",
      "tagline: 中文定位",
      "tagline_en: English tagline",
      "summary: 中文摘要",
      "summary_en: English summary",
      "category: utilities",
      "type: 工具",
      "type_en: Utility",
      "level: standard",
      "status: private",
      "featured: false",
      "weight: 1",
      "links: []",
      "related: []",
      "---",
      "",
      "<!-- locale: zh-CN -->",
      "",
      "# 中文标题",
      "",
      "<!-- locale: en -->",
      "",
      "# English title",
      "",
    ].join("\n"),
  );

  try {
    assert.throws(
      () => getWorksData({ worksDir, indexFile: path.join(worksDir, "index.yaml") }),
      /title_en/,
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
