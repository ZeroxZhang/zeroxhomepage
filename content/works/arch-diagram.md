---
schema_version: 2
slug: arch-diagram
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: Architecture Diagram
title_en: Architecture Diagram
tagline: 用可校验的几何规则，生成经得住评审的系统架构图
tagline_en: Give AI-generated architecture diagrams a geometry contract reviewers can trust
summary: 用泳道、端口、路由与校验契约约束 Agent，生成关系清楚、可编辑、可离线使用的 HTML 与 SVG 架构图。
summary_en: A schema-led Agent skill for producing editable HTML and SVG architecture diagrams with explicit lanes, ports, routing, and validation.
category: visual-design
type: Agent Skill
type_en: Agent skill
level: standard
status: active
featured: false
weight: 100
facts_as_of: 2026-08-21
tags:
  - 架构图
  - SVG
  - 确定性布局
tags_en:
  - Architecture diagrams
  - SVG
  - Deterministic layout
stack:
  - Python
  - HTML
  - SVG
links:
  - label: 安装架构图 Skill
    label_en: Install the architecture diagram skill
    type: repository
    url: https://github.com/ZeroxZhang/arch_diagram
    primary: true
related:
  - flowchart-generator-skill
  - onepager
---

<!-- locale: zh-CN -->

# Architecture Diagram

架构图最容易在细节处失去可信度：节点看似整齐，跨层连线却互相遮挡；箭头从含义含混的方向进入；标签压住路径；容器与泳道无法说明组件的归属。评审者需要先猜图，再讨论系统，图也很难随着设计继续演进。

Architecture Diagram 是一套面向 Agent 的架构图生成 Skill。它把拓扑、分层、端口、路由和验收写成明确契约，使一张图从关系模型出发，最终交付为可以阅读、检查和继续编辑的 HTML 与 SVG。

## 先把关系变成可计算的结构

生成前，Agent 会区分拓扑 rank、视觉 lane、容器 group、节点、端口与边，并用稳定 ID 建立布局计划。接入层、应用层和数据层可用泳道表达位置语义，前端、后端、数据库、云服务等组件则通过一致配色表达类别。端口方向和连线通道在节点放置阶段就被预留，减少后期硬塞路径造成的交叉与误读。

布局流程依次处理文本测量、排序、打包、放置、正交避障路由、标签占位和边界计算。节点 bbox、route、lane、group 与 z-order 会保留在语义化 SVG 中，后续脚本可以检查几何关系，而非仅凭截图目测。

## 从需求到两份可继续使用的交付物

一次典型工作从主题、语言、方向、泳道和展示范围开始。Agent 先规范化关系图，再生成稳定 ID 的 ASCII 布局计划，随后输出包含内联 CSS 与 SVG 的完整 HTML。仓库脚本从 HTML 精确提取独立 SVG，并对两份文件执行结构、边界和一致性检查；需要时还可调用本机 Chrome 检查真实字形、响应式溢出与 16:9 裁切。

HTML 适合直接浏览、展示摘要卡片和悬停提示；SVG 可嵌入文档、网页或演示文稿。亮色、暗色与 1280×720 演示模板覆盖常见传播场景，产物不依赖远程字体、图片或脚本，离线也能打开。

当架构发生变化时，可以沿用同一组节点与边的 ID 更新关系，再重新执行提取和校验，减少手工改图后遗漏标签、箭头或边界的风险。

## 公开证据与使用边界

截至 2026-08-21，公开仓库包含模板、布局与设计规范、提取器、静态校验器、可选渲染检查以及通过/失败用例；GitHub 记录为 2 Stars。最近一次公开 Actions 运行在 `layout-contract` 步骤失败，因此不能把仓库中的测试存在等同于当前主分支持续通过。SimHei 与 JetBrains Mono 也未随项目打包，系统字体回退可能改变字宽和排版结果。

这套 Skill 的确定性来自生成契约与检查流程，具体几何仍由宿主 Agent 依约执行；它并非独立的通用自动布局引擎。它更适合需要进入设计评审、技术文档和长期维护的系统图。若需求只是快速制作一张装饰性关系图，完整的语义与校验流程可能显得偏重。

[安装架构图 Skill](https://github.com/ZeroxZhang/arch_diagram)

<!-- locale: en -->

# Architecture Diagram

Architecture diagrams often fail in small, expensive ways. The boxes look aligned, yet cross-layer edges overlap, arrows enter from ambiguous directions, labels sit on top of routes, and groups do not make ownership obvious. Reviewers spend time decoding the picture before they can discuss the system, and the drawing becomes fragile as the design changes.

Architecture Diagram is an Agent skill that turns those drawing decisions into an explicit geometry contract. It starts from topology and hierarchy, carries that structure through placement and routing, and delivers self-contained HTML and SVG that can be inspected, shared, and edited.

## Model the system before drawing it

The workflow separates topology ranks, visual lanes, containing groups, nodes, ports, and edges. Stable IDs connect the planning model to the rendered output. Lanes can establish layer semantics such as access, application, and data, while a consistent color system distinguishes frontend, backend, database, cloud, security, AI/ML, and other component types.

Port direction and routing channels are reserved while nodes are being placed. The documented pipeline then moves through text measurement, ordering, packing, placement, orthogonal obstacle-aware routing, label reservation, and viewBox calculation. Semantic SVG metadata records bounding boxes, routes, lanes, groups, and z-order, giving validation tools something more reliable than pixels to inspect.

## A practical generation and review loop

A typical run begins by resolving theme, language, reading direction, lanes, scope, and presentation mode. The Agent normalizes the graph and writes a stable-ID ASCII layout plan before committing to SVG geometry. It then produces a complete HTML document with embedded CSS and SVG.

Repository scripts extract the exact standalone SVG from that HTML and check structure, bounds, and parity between the two files. An optional rendered check can use a locally installed Chrome or Chromium browser to catch real glyph metrics, responsive overflow, and clipping in the 1280×720 presentation layout.

The two deliverables serve different downstream needs. HTML provides a browsable page with summary cards and native SVG hover titles. SVG can be embedded in documentation, websites, and slide decks or edited as vector content. Light, dark, and presentation templates cover common viewing contexts, and the generated files do not depend on remote scripts, images, styles, or fonts at runtime.

## What the public repository proves

As of August 21, 2026, the repository contains templates, layout and design references, an SVG extractor, a static validator, an optional browser-based render checker, and both passing and failing test fixtures. GitHub showed 2 stars at that date. The latest public Actions run failed in the `layout-contract` job, so the presence of tests should not be presented as a continuously green main branch.

The project documents SimHei and JetBrains Mono in its typography choices but does not bundle those font files. System fallbacks can change text width and therefore the final layout, especially when output moves between machines.

## Where it fits

The deterministic behavior comes from a generation contract plus validation gates. The host Agent still performs the geometry work; this repository is not a standalone general-purpose auto-layout engine. It is best suited to architecture diagrams that will be reviewed, placed in technical documentation, or maintained over time. For a decorative relationship graphic with little need for semantic editing or geometry checks, the process may be more involved than necessary.

[Install the architecture diagram skill](https://github.com/ZeroxZhang/arch_diagram)
