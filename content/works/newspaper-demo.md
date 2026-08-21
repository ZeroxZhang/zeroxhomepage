---
schema_version: 2
slug: newspaper-demo
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: Newspaper Demo
title_en: Newspaper Demo
tagline: 让 AI 生成的网页，重新拥有报纸式的阅读秩序
tagline_en: Give AI-generated pages the editorial hierarchy of a newspaper
summary: 一套复古报纸设计 Skill，用多栏、标题层级、纸张质感与原生图形生成可独立打开的 4:3 HTML 页面。
summary_en: An agent skill for composing self-contained 4:3 HTML pages with newspaper-style columns, typographic hierarchy, paper texture, and native web graphics.
category: content-publishing
type: Agent Skill
type_en: Agent skill
level: compact
status: complete
featured: false
weight: 230
facts_as_of: 2026-08-21
tags:
  - 编辑设计
  - 单文件 HTML
  - 报纸版式
tags_en:
  - Editorial design
  - Single-file HTML
  - Newspaper layout
stack:
  - HTML
  - CSS
  - SVG
links:
  - label: 安装报纸版式 Skill
    label_en: Install the newspaper layout skill
    type: repository
    url: https://github.com/ZeroxZhang/newspaper-demo
    primary: true
related:
  - onepager
  - z-slides
---

<!-- locale: zh-CN -->

# Newspaper Demo

卡片式布局擅长保持整齐，却容易把头条、证据和补充信息放在同一音量里。Newspaper Demo 是一套交给宿主 Agent 使用的编辑设计协议，以报纸的标题层级、多栏结构和留白关系，帮助专题摘要、报告封面与高密度信息页建立明确的阅读顺序。

## 先分配注意力，再铺设页面

Agent 需要先判断主标题、导语、正文、侧栏和数据图形各自承担什么任务，再决定字号、栏宽、位置和留白。乳白纸张、克制纹理与黑白红配色提供印刷气质，但视觉风格服从信息层级，不用于掩盖内容结构。

## 浏览器可以直接接住的成品

输出采用严格 4:3 多栏版式，并把 CSS 与脚本内联进 HTML。折线图、柱状图、饼图、流程图和插图由 HTML、CSS 或 SVG 原生构建，适合直接打开、归档、继续修改或部署。典型流程是提供材料与页面目标，由 Agent 编辑结构、生成版面，再在浏览器中检查溢出与层级。

## 可核验范围与当前缺口

截至 2026-08-21，公开仓库提供 Skill 规则，但没有示例产物、自动测试、视觉验证器或正式 Release。它本身不是独立网页编辑器，最终质量依赖宿主 Agent 的内容判断及浏览器环境。若页面引用远程字体，文件也不能视为完全离线。

## 适合需要“被编辑”的一页内容

这套协议适合结论、证据与补充信息存在明显优先级的内容；短句卡片或需要自由拖拽的复杂设计并非其强项。仓库保留了一种可复用的版式方法：先决定读者应该看见什么，再决定页面长什么样。

[安装报纸版式 Skill](https://github.com/ZeroxZhang/newspaper-demo)

<!-- locale: en -->

# Newspaper Demo

Card-based layouts are excellent at keeping a page tidy, but they often give the headline, supporting evidence, and secondary detail the same visual weight. Newspaper Demo is an editorial design protocol for a host agent. It applies newspaper conventions—strong headline hierarchy, multicolumn composition, and deliberate whitespace—to topic summaries, report covers, and dense information pages.

## Allocate attention before arranging elements

The agent first decides what each part of the page is doing: headline, standfirst, main story, sidebar, caption, or data graphic. Type scale, column width, position, and spacing then express that judgment. Warm paper tones, restrained texture, and a black-white-red palette create a print reference, but the aesthetic is subordinate to the reading order.

This is the central product idea: visual hierarchy begins with editing. A page should reveal what matters before it asks the reader to process detail.

## A deliverable the browser can keep

The skill produces a strict 4:3 multicolumn HTML page with CSS and scripts inlined. Line charts, bar charts, pie charts, flow diagrams, and illustrations can be built with native HTML, CSS, and SVG. The result can be opened directly, archived, modified, or deployed without adopting a proprietary editor.

A typical use starts with source material and a communication goal. The host agent edits the hierarchy, composes the page, and then inspects the browser rendering for overflow, crowding, and weak emphasis.

## What the repository currently proves

As of August 21, 2026, the public repository documented the skill rules. It did not include sample outputs, automated tests, a visual validator, or a formal release. Newspaper Demo is not a standalone rendering application, so output quality remains dependent on the host agent's editorial judgment and the target browser. A document that loads remote fonts should not be described as fully offline.

## Where the format fits

The protocol works best when conclusions, evidence, and supporting context have a meaningful priority. It is less suitable for a single short quote or for designs that require freeform manual placement. As an archive, the repository preserves a reusable layout argument: decide what the reader should notice first, then build the page around that decision.

[Install the newspaper layout skill](https://github.com/ZeroxZhang/newspaper-demo)
