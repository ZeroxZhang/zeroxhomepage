---
schema_version: 2
slug: "zerox-skills"
default_locale: "zh-CN"
locales: ["zh-CN", "en"]
title: "zerox-skills"
title_en: "zerox-skills"
tagline: "把反复打磨的方法，变成可以复用的技能。"
tagline_en: "Practical methods, ready to reuse."
summary: "从研究取证到图表与报告，11 个可独立调用的 Agent 技能，在同一个仓库持续维护。"
summary_en: "Eleven independently callable agent skills for research, reasoning, charts, learning and reports, maintained in one repository."
category: "agent-platform"
type: "Agent 技能合集"
type_en: "Agent skill collection"
level: "flagship"
status: "maintained"
featured: true
weight: 5
facts_as_of: "2026-10-26"
tags: ["Agent 技能", "开源项目"]
tags_en: ["Agent skills", "Open source"]
stack: ["Markdown", "Python"]
links: [{"label": "查看仓库", "label_en": "View repository", "type": "repository", "url": "https://github.com/ZeroxZhang/zerox-skills", "primary": true}]
related: ["consulting-report-forge", "zerox-thinkcell-charts", "zerox-due-diligence", "zerox-deep-research"]
---

<!-- locale: zh-CN -->

# zerox-skills

把反复打磨的方法，变成可以复用的技能。

从研究取证到图表与报告，11 个可独立调用的 Agent 技能，在同一个仓库持续维护。

![模块化工具组：AI 生成的概念插图，不是软件界面。](/work-assets/2026-projects/suite.webp)

## 从一个任务，找到合适的工具。

这套合集把实际项目中反复使用的方法、模板和脚本整理到一起。每个技能都有自己的入口和交付物：你可以只选一个，也可以在明确边界后组合使用。

### 复杂问题研究

`zerox-deep-research`: 保留来源、数据和推理过程，交付可复核的研究包。

### 公司研究与尽调

`zerox-due-diligence`: 讲清业务、客户、财务、营销和竞争，交付离线报告与底稿。

### 把材料组织成论证

`zerox-storyline`: 从信息卡片到内容稿、故事板和逐页内容，保留覆盖审计。

### 可编辑商业图表

`zerox-thinkcell-charts`: 表格与 JSON 转成 PPTX、PNG 和可离线改字的 HTML。

### 单页信息图与海报

`zerox-onepager`: 重新编辑长内容，保留蓝图与可续改项目。

### 论文变成交互课程

`zerox-paper-to-course`: 补齐前置知识、推导、实验与练习反馈。

### 追问机制与根因

`zerox-really`: 跨学科拆解问题、前提与行动方向。

### 图片备份

`zerox-ins-photo-downloader`: 使用本机已登录会话，按发布时间备份 Instagram 图片。

### 架构图

`zerox-architecture-diagram`: 处理布局与连线，输出 HTML/SVG 并检查结构。

### 精简报告工作流

`zerox-consulting-deck-skill-concise`: 原始材料转成自包含 HTML 与同版 PDF。

### 咨询研究与报告

`zerox-consulting-report-forge`: 从业务问题出发，完成研究、建模、叙事和视觉交付。

## 研究、论证、呈现，各自有明确交付。

报告能力按阶段积累，但并不是一条已经自动串联的流水线。研究包可以作为后续内容组织的输入；内容稿可以指导选图；需要完整报告时，可以直接使用 Forge。

### 研究取证

zerox-deep-research：报告、原文快照与可复用数据。

### 论证成线

zerox-storyline：信息卡、主线、稿件与分页内容。

### 视觉表达

zerox-thinkcell-charts：可编辑图表与预览。

## 看得见的交付物。

这里展示的是成员项目公开的实际产物。图表使用示意数据；报告是历史成稿快照，用于展示表达方式。

![图表技能：一页多图拼版示例，数据为示意。](/work-assets/2026-projects/chart-dashboard.png)

![Forge：TikTok 商业化报告历史选页总览。](/work-assets/2026-projects/forge-overview.png)

## 选一个技能，给它一份清楚的任务。

按名称安装所需技能，再说明输入材料、目标读者、需要回答的问题和期望交付。运行依赖以各成员说明为准，不需要一次配置全部技能。

### 安装一个技能

npx skills add ZeroxZhang/zerox-skills --skill zerox-deep-research

### 示例任务

用 zerox-deep-research 比较向量数据库，为 10 人团队的 RAG 项目提出选型建议，保留来源与可复用的竞品矩阵。

## 一个仓库，不抹平每个作品的个性。

迁入的技能保留原工作流；Consulting Report Forge 在本站继续作为独立作品展示。当前请直接调用各技能，统一 /zerox 路由及其余场景流水线仍在规划。许可证按成员目录分别查看，不存在覆盖全套的统一许可。自动检查帮助发现结构问题，事实与结论仍需实质复核。

[查看仓库](https://github.com/ZeroxZhang/zerox-skills)

<!-- locale: en -->

# zerox-skills

Practical methods, ready to reuse.

Eleven independently callable agent skills for research, reasoning, charts, learning and reports, maintained in one repository.

![A modular toolkit: AI-generated conceptual artwork, not a software interface.](/work-assets/2026-projects/suite.webp)

## Start with the work you need to do.

The collection brings together methods, templates and scripts developed through practical projects. Each skill has its own entry point and deliverables. Choose one, or combine them with clear handoffs.

### Open-ended research

`zerox-deep-research`: Deliver a reviewable research package with sources, data and reasoning.

### Company due diligence

`zerox-due-diligence`: Explain the business, customers, finances, marketing and competitors in an offline report.

### Structure the argument

`zerox-storyline`: Turn information cards into a manuscript, storyboard and slide content with coverage checks.

### Editable business charts

`zerox-thinkcell-charts`: Turn tables and JSON into PPTX, PNG and offline text-editable HTML.

### One-page infographics

`zerox-onepager`: Edit long material into a single page, retaining the blueprint and editable project.

### Papers into courses

`zerox-paper-to-course`: Build prerequisites, derivations, experiments and learning checks.

### Investigate root causes

`zerox-really`: Use multidisciplinary inquiry to examine assumptions, mechanisms and actions.

### Image backups

`zerox-ins-photo-downloader`: Back up Instagram images by publication time using an existing local login.

### Architecture diagrams

`zerox-architecture-diagram`: Produce HTML/SVG with layout, connector routing and structural checks.

### Concise report workflow

`zerox-consulting-deck-skill-concise`: Turn source material into self-contained HTML and matching PDF.

### Consulting reports

`zerox-consulting-report-forge`: Take a business question through research, modeling, narrative and visual delivery.

## Research, argument and presentation have distinct outputs.

The reporting capabilities support different stages, but are not an automatically connected pipeline. Research can inform a manuscript; the manuscript can guide chart selection. Forge provides a separate full-report workflow.

### Research

zerox-deep-research: report, source snapshots and reusable data.

### Narrative

zerox-storyline: information cards, argument, manuscript and slide content.

### Visualization

zerox-thinkcell-charts: editable charts and previews.

## See what the tools produce.

These are published outputs from member projects. Charts use illustrative data; the report is a historical snapshot showing presentation quality.

![Chart skill: a multi-panel example with illustrative data.](/work-assets/2026-projects/chart-dashboard.png)

![Forge: selected pages from a historical TikTok monetization report.](/work-assets/2026-projects/forge-overview.png)

## Choose a skill and give it a clear brief.

Install the skill you need, then specify the materials, audience, question and expected output. Runtime dependencies are documented per skill; you do not need every tool at once.

### Install a skill

npx skills add ZeroxZhang/zerox-skills --skill zerox-deep-research

### Example brief

Use zerox-deep-research to compare vector databases for a 10-person RAG team. Retain sources and a reusable comparison matrix.

## One repository, independent workflows.

Migrated skills retain their workflows, and Consulting Report Forge remains an independent portfolio entry. Invoke skills directly: the unified /zerox router and further pipelines are still planned. Licenses are specified per member. Automated checks help with structure; facts and conclusions still require substantive review.

[View repository](https://github.com/ZeroxZhang/zerox-skills)
