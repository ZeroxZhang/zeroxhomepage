import assert from "node:assert/strict";
import test from "node:test";

import { copy } from "../lib/i18n.ts";

test("作品区标题由分类数和作品数生成", () => {
  const heading = copy["zh-CN"].works.heading;
  assert.equal(typeof heading, "function");
  assert.equal(heading(8, 36), "8 条线索，36 件作品");
});

test("英雄区说明由作品数生成", () => {
  const description = copy.en.hero.description;
  assert.equal(typeof description, "function");
  assert.equal(description(36).includes("thirty-five"), false);
  assert.equal(description(36).includes("36 works"), true);
});
