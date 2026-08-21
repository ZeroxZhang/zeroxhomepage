---
schema_version: 2
slug: onepager
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: OnePager
title_en: OnePager
tagline: 把长内容重新编辑成一页可以读完的视觉叙事
tagline_en: Edit long-form content into a visual story that works on one page
summary: 将文本、Markdown 或 PDF 转为单页信息图的 Agent Skill，覆盖内容重写、版式蓝图、渲染与几何验收。
summary_en: An agent skill that turns text, Markdown, or PDF into single-page information graphics through editorial rewriting, layout blueprints, rendering, and geometric QA.
category: visual-design
type: Agent Skill
type_en: Agent skill
level: featured
status: active
featured: true
weight: 50
facts_as_of: 2026-08-21
tags:
  - 信息图
  - 内容重构
  - 视觉质量
tags_en:
  - Information graphics
  - Content restructuring
  - Visual QA
stack:
  - HTML
  - CSS
  - JavaScript
  - Python
  - Playwright
links:
  - label: 安装 OnePager
    label_en: Install OnePager
    type: repository
    url: https://github.com/ZeroxZhang/onepager
    primary: true
related:
  - flowchart-generator-skill
  - arch-diagram
  - newspaper-demo
---

<!-- locale: zh-CN -->

# OnePager

把长文放进一张海报，最直接的做法是缩小字号、压紧间距、继续塞入更多段落。结果通常信息齐全，却没有人愿意读完。

OnePager 从编辑开始。它先判断读者需要记住什么，再重组论点、删减重复、设计阅读顺序，最后才进入画布。输出是一页信息图，但工作内容同时包含编辑、视觉设计和工程验收。

## 一页内容需要重新写，而不是简单压缩

社交传播、汇报和移动端阅读都在有限空间里发生。原文的铺垫、论证顺序和段落长度通常为连续阅读设计，直接搬到单页会产生过高密度，也会把结论埋在角落。

OnePager 使用 MECE、金字塔原理与 SCQA 整理内容。工具会识别核心结论、证据、冲突和行动信息，并为不同层级分配视觉权重。删掉一部分内容并不代表损失；当页面目标明确后，取舍本身就是编辑质量。

## 内容蓝图连接文案与版式

在生成 HTML/CSS 前，系统先建立 Blueprint 与中间表示。它们记录页面目标、内容模块、重要性、画布条件和视觉方向。

这层契约使文案与布局能够分别修改。标题不够清楚，可以先改内容；层级已经成立但画面拥挤，再调整网格和比例。设计迭代不必每次回到原始长文重做。

## 为不同观看环境重新分配内容

### 四种画布

竖屏长图适合移动端滚动；16:9 服务演示与横屏展示；1:1 适合社交平台；3:4 更接近海报与图文封面。切换画布时，系统会重排信息，不采用机械裁切。

### 三档信息密度

快速传播保留最少结论，标准摘要平衡解释与速度，高密度报告承载更多证据。密度变化会同步影响文案和版式，不只是字号大小。

### 九种视觉方向

Dark Editorial、Swiss Precision、Organic Nature 等风格共同约束中文字体、色彩、图形和留白。风格被视为完整视觉语言，避免只换背景色或装饰。

## 质量检查发生在真实渲染之后

第一层检查文件结构与静态契约。第二层由 Playwright 实际渲染页面，检查文本溢出、元素遮挡和画布边界。

Blueprint、IR、Manifest 与 SHA-256 记录使配置、文件和检查结果保持可追踪。这里的可复现指生产信息与验收记录能够回看，不代表模型每次会生成完全相同的文案。

与直接使用图像模型相比，这条路线需要更多中间步骤。它换来的是清晰文字、可修改布局、稳定品牌样式和可自动检查的成品。

## 一次典型制作过程

1. 提供文本、Markdown 或 PDF，并说明用途与受众。
2. 选择画布、信息密度和视觉方向。
3. 审核内容蓝图，确认哪些信息进入页面。
4. 生成 HTML/CSS 页面，并运行静态与几何检查。
5. 根据检查结果调整，导出最终交付物。

人在第三步仍可改变叙事重点。系统不会把“生成成功”直接等同于“页面合格”。

## 适合需要被快速理解的复杂内容

OnePager 可用于研究摘要、产品介绍、项目复盘、课程提要和社交传播。它擅长把已有内容重新组织，不负责凭空补齐缺失数据和证据。

如果材料本身没有清晰结论，内容阶段会先暴露这个问题。对只有一句话的内容，完整生产流程也可能过重，轻量文字卡片工具更合适。

## 公开状态

截至 2026-08-21，OnePager 版本为 v1.5.0，记录 11 Stars。项目覆盖 4 种尺寸、9 种风格、3 档密度、Blueprint、IR、Manifest、SHA-256 和双层质量检查；公开 CI 在 Python 3.9 与 3.12 均成功。

[安装 OnePager](https://github.com/ZeroxZhang/onepager)

<!-- locale: en -->

# OnePager

The most obvious way to fit a long article onto a poster is to reduce the type size, tighten the spacing, and keep adding paragraphs. The page may contain everything, yet still fail to hold attention.

OnePager starts with editing. It decides what the reader should retain, restructures the argument, removes repetition, and designs a reading order before the content reaches a canvas. The deliverable is a one-page information graphic; the workflow combines editorial judgment, visual design, and engineering QA.

## One page requires a new edit

Social posts, presentations, and mobile reading all operate under tight spatial limits. Source material is usually written for continuous reading, with its own setup, argument, and paragraph rhythm. Moving it directly into a fixed page creates density and buries the conclusion.

OnePager uses MECE, the pyramid principle, and SCQA to identify the core claim, evidence, tension, and action. Each element receives a visual priority. Removing material is part of the editorial decision: once the page has a clear purpose, inclusion is no longer the default.

## A content blueprint connects writing and layout

Before HTML and CSS are generated, the system creates a Blueprint and intermediate representation. These describe the page objective, content modules, relative importance, canvas constraints, and visual direction.

The contract allows copy and layout to evolve separately. If the headline is unclear, the content can be corrected first. If the hierarchy works but the page is crowded, the grid and proportions can change without reopening the entire source document.

## Recompose the story for its viewing environment

### Four canvases

A vertical page supports mobile scrolling, 16:9 works for presentations and landscape screens, 1:1 fits social platforms, and 3:4 serves poster-like formats. Changing the canvas triggers a new composition rather than a mechanical crop.

### Three density levels

A fast social piece keeps only the central takeaway. A standard summary balances explanation and speed. A dense report preserves more evidence. Density changes affect the copy and structure, not only the font size.

### Nine visual directions

Styles such as Dark Editorial, Swiss Precision, and Organic Nature coordinate Chinese typography, color, graphics, and whitespace. A style is treated as a visual system instead of a background treatment.

## Quality control happens after real rendering

The first QA layer checks files and static contracts. The second uses Playwright to render the page and inspect text overflow, element collisions, and canvas boundaries.

Blueprints, IR, manifests, and SHA-256 records keep configuration, files, and checks traceable. Reproducibility here means that the production inputs and QA record can be reviewed; it does not mean a model will produce identical copy from the same prompt.

Compared with direct image generation, this workflow introduces more intermediate steps. In return, it preserves sharp text, editable layout, consistent brand treatment, and measurable output checks.

## A typical production path

1. Provide text, Markdown, or PDF together with the audience and use case.
2. Select the canvas, information density, and visual direction.
3. Review the content blueprint and approve what belongs on the page.
4. Generate the HTML/CSS document and run static and geometric checks.
5. Revise from the findings and export the deliverable.

The editorial decision remains visible before rendering. A successful generation is not automatically considered an approved page.

Each stage remains open to review.

## Where OnePager fits

OnePager works well for research summaries, product introductions, project retrospectives, course overviews, and social content. It restructures available material; it cannot manufacture missing evidence.

When the source has no clear conclusion, the content stage will surface that weakness. For a single short quote, the workflow may be excessive, and a focused text-card tool is likely a better choice.

## Public status

As of August 21, 2026, OnePager was at v1.5.0 with 11 stars. It includes four canvas formats, nine visual styles, three density levels, Blueprint, IR, manifest and SHA-256 tracking, and two-layer QA. Public CI passed on Python 3.9 and 3.12.

[Install OnePager](https://github.com/ZeroxZhang/onepager)
