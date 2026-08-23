import assert from "node:assert/strict";
import test from "node:test";

import { copy } from "../lib/i18n.ts";

test("作品区标题由分类数和作品数生成", () => {
  const heading = copy["zh-CN"].works.heading;
  assert.equal(typeof heading, "function");
  assert.equal(heading(8, 36), "8大类，36件近期作品。");
});

test("英雄区说明提供中英文版本", () => {
  assert.equal(
    copy["zh-CN"].hero.description(36),
    "独立开发者与创作者。长期构建 AI Agent 系统与工具、量化投研工具与内容输出系统。首页仅呈现近期部分作品，欢迎合作者与我联系。",
  );
  assert.equal(
    copy.en.hero.description(36),
    "Independent developer and creator. I build AI agent systems and tools, quantitative research tools, and content production systems. The homepage presents only a selection of recent work. Collaborators are welcome to get in touch.",
  );
});
