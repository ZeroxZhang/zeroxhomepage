import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { getWorksData } from "../lib/works.ts";

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
