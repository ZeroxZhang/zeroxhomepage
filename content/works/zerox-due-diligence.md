---
schema_version: 2
slug: "zerox-due-diligence"
default_locale: "zh-CN"
locales: ["zh-CN", "en"]
title: "zerox-due-diligence"
title_en: "zerox-due-diligence"
tagline: "看懂一家公司，先看清它怎样运转。"
tagline_en: "Understand a company by understanding how it works."
summary: "从官网与原始资料出发，解释业务、财务、营销和竞争，交付图文报告与独立证据底稿。"
summary_en: "Use official and original sources to explain the business, finances, marketing and competition in a visual report with separate evidence files."
category: "quant-research"
type: "Agent 技能"
type_en: "Agent skill"
level: "featured"
status: "maintained"
featured: true
weight: 5
facts_as_of: "2026-10-26"
tags: ["Agent 技能", "开源项目"]
tags_en: ["Agent skills", "Open source"]
stack: ["Python", "HTML"]
links: [{"label": "查看仓库", "label_en": "View repository", "type": "repository", "url": "https://github.com/ZeroxZhang/zerox-skills/tree/main/zerox-due-diligence", "primary": true}]
related: ["zerox-skills", "zerox-deep-research", "consulting-report-forge"]
---

<!-- locale: zh-CN -->

# zerox-due-diligence

看懂一家公司，先看清它怎样运转。

从官网与原始资料出发，解释业务、财务、营销和竞争，交付图文报告与独立证据底稿。

![剖开业务结构：AI 生成的概念插图，不代表实际公司。](/work-assets/2026-projects/diligence.webp)

## 从“它是谁”，走到“它如何赚钱”。

同一个名字可能指集团、品牌、子公司或签约主体。研究先锁定对象与控制关系，再阅读公司、产品、价格、团队、沿革与条款等一手页面；公司宣传作为自述，与独立材料交叉核验。

### 谁在交易

明确公司、客户、供应方与实际付款方。

### 价值怎样交付

解释产品、渠道、经营分工与交易过程。

### 钱怎样形成

拆开收入来源、成本结构、盈利与现金。

## 三个问题，不能因为缺资料就消失。

财务、营销和竞争必须分别回答。可靠数字可以画图；数据缺失则保留具体未知与其影响，不能用虚构趋势填满页面。

### 营收与盈利

规模、构成、毛利率与净利率分别对应哪个主体和期间？

### 营销与增长

客户从哪里来？转化、复购和流失有哪些可核验依据？

### 主要竞争者

为什么选择这些对手？比较是否采用相同市场与口径？

## 读者看报告，复核者查底稿。

主报告按理解公司的路径组织，穿插业务图、时间线、来源明确的图表和真实图片。研究过程放入独立底稿，读者不必先穿过操作记录才能理解公司。

### report.html

离线阅读：公司、业务、财务、营销、竞争与结论。

### report-audit.md

独立底稿：模块、覆盖记录、检索日志与资料请求。

### CSV / JSON

来源、证据、声明与关系台账，可继续追溯。

## 公司研究，不必先有交易意图。

也可按投资、并购、合作、客户授信、供应商准入或竞品研究定制问题。Quick / Standard / Deep 调整覆盖、历史跨度和核验强度，资料权限另行记录。

### 示例任务

用 zerox-due-diligence 研究这家公司的官网与公开资料。目的为公司研究，深度 Standard；讲清业务模式，并逐项回答营收与盈利、营销渠道和主要竞争者，交付离线 HTML 与独立底稿。

## 形式完整，不代表证据充分。

公司研究不发布综合分；商业专项默认也不评分。工具没有内置付费数据库或自动搜索代理，结构检查不能证明事实与推理正确。资料受限时交付有明确缺口的研究，不把未知写成确定结论。

[查看仓库](https://github.com/ZeroxZhang/zerox-skills/tree/main/zerox-due-diligence)

<!-- locale: en -->

# zerox-due-diligence

Understand a company by understanding how it works.

Use official and original sources to explain the business, finances, marketing and competition in a visual report with separate evidence files.

![An exploded business structure: AI-generated conceptual artwork, not a real company.](/work-assets/2026-projects/diligence.webp)

## From identity to business economics.

One name can refer to a group, brand, subsidiary or contracting entity. Resolve the subject and control relationships first, then read official company, product, pricing, team, history and terms pages. Treat promotional statements as company claims and check them independently.

### Who transacts

Identify the company, customers, suppliers and actual payer.

### How value is delivered

Explain products, channels, operating roles and transaction steps.

### How economics work

Separate revenue sources, costs, profitability and cash generation.

## Three questions remain visible, even when evidence is missing.

Finance, marketing and competition each need an answer. Reliable numbers support charts. Missing evidence remains an explicit unknown with its implications; it cannot be replaced with invented trends.

### Revenue and profit

Which entity and period do revenue, mix, gross margin and net margin describe?

### Marketing and growth

Where do customers come from? What supports conversion, retention and churn claims?

### Relevant competitors

Why are these competitors relevant? Are markets and definitions comparable?

## A readable report and an inspectable evidence base.

The report follows the path to understanding the company, using business diagrams, timelines, sourced charts and authentic images. A separate audit file keeps the process reviewable without overwhelming the narrative.

### report.html

Offline reading: company, business, finance, marketing, competition and findings.

### report-audit.md

Audit file: modules, coverage, search records and information requests.

### CSV / JSON

Traceable ledgers of sources, evidence, claims and relationships.

## Company research does not require a transaction.

Tailor the questions for investment, acquisition, partnerships, customer credit, supplier qualification or competitor research. Quick, Standard and Deep adjust coverage, history and verification strength; source access is tracked separately.

### Example brief

Use zerox-due-diligence to research this company using its website and public sources. Purpose: company research. Depth: Standard. Explain its business, finances, marketing and competitors; deliver offline HTML and a separate audit file.

## Complete structure does not prove sufficient evidence.

Company research has no overall score; commercial projects also default to scoring off. The tools include no paid database or automatic research crawler. Structural checks cannot prove facts or reasoning. Limited access must result in explicit gaps, not unwarranted certainty.

[View repository](https://github.com/ZeroxZhang/zerox-skills/tree/main/zerox-due-diligence)
