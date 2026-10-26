---
schema_version: 2
slug: "zerox-deep-research"
default_locale: "zh-CN"
locales: ["zh-CN", "en"]
title: "zerox-deep-research"
title_en: "zerox-deep-research"
tagline: "每个关键判断，都能回到它的来源。"
tagline_en: "Follow each key conclusion back to its sources."
summary: "围绕复杂问题迭代研究，保留原文、数据、推理与检索记录，交付可继续复用的研究包。"
summary_en: "Investigate complex questions iteratively and retain sources, data, reasoning and search records in a reusable research package."
category: "quant-research"
type: "Agent 技能"
type_en: "Agent skill"
level: "featured"
status: "maintained"
featured: true
weight: 8
facts_as_of: "2026-10-26"
tags: ["Agent 技能", "开源项目"]
tags_en: ["Agent skills", "Open source"]
stack: ["Markdown", "Python"]
links: [{"label": "查看仓库", "label_en": "View repository", "type": "repository", "url": "https://github.com/ZeroxZhang/zerox-skills/tree/main/zerox-deep-research", "primary": true}]
related: ["zerox-skills", "zerox-due-diligence", "consulting-report-forge"]
---

<!-- locale: zh-CN -->

# zerox-deep-research

每个关键判断，都能回到它的来源。

围绕复杂问题迭代研究，保留原文、数据、推理与检索记录，交付可继续复用的研究包。

![从分散资料到完整论证：AI 生成的概念插图。](/work-assets/2026-projects/research.webp)

## 研究不是把搜索结果排成长文。

先定义问题、受众与决策用途，再拆解子问题和待检验假设。每轮研究都回看已有证据、冲突与缺口，主动寻找可能推翻主要结论的反例。

### 定题与计划

确定边界、预算、资料策略和数据交付标准。

### 研究与反证

读原文、存快照、提取数据、比较解释，再决定下一轮。

### 综合与封包

整理判断、局限和方法，完成机器检查与实质复核。

## 结论与数据，各有一条回溯路径。

引用号指向原文快照；数据记录指向输入与计算方法。定性研究同样可以沉淀为文献编码、政策事件或竞品矩阵，不强迫所有问题变成数字表。

### 证据链

报告引用 → 来源 ID → 原文快照与定位

### 数据链

报告记录 → 数据表 → 输入与方法 → 来源定位

## 交付后，还能继续使用。

研究包同时面向阅读、数据复用与证据核验。材料无法取得或数据不适用时记录原因，不用空目录冒充成果。

### report.md + sources.md

主报告与来源索引，保留结论的置信度和限制。

### data/ + analysis/

提取与整理数据、字段字典、计算和复跑方法。

### raw/ + notes/

原始材料、证据摘录、冲突与解释。

### work/ + qa/

任务约定、检索过程、验收与内容指纹。

## 先说明问题，再决定研究深度。

适合全景、对比选型、技术深潜、尽调、文献综述、政策法规与事实核查。开题时说明你需要做什么决定，哪些证据会改变答案，以及愿意投入多少研究。

### 示例任务

用 zerox-deep-research 研究开源知识库工具的迁移成本。比较三条候选路线，保留原始资料与竞品矩阵，区分事实、推断和信息缺口。

## 把未知留在结果里。

自动检查核验结构、引用和数据关系，不能代替判断来源真实性、口径可比性和计算正确性。研究不绕过访问限制，交付止于研究报告与研究包；视觉展项和报告排版交由后续工具完成。

[查看仓库](https://github.com/ZeroxZhang/zerox-skills/tree/main/zerox-deep-research)

<!-- locale: en -->

# zerox-deep-research

Follow each key conclusion back to its sources.

Investigate complex questions iteratively and retain sources, data, reasoning and search records in a reusable research package.

![From separate sources to a coherent argument: AI-generated conceptual artwork.](/work-assets/2026-projects/research.webp)

## Research goes beyond collecting search results.

Define the question, audience and decision before breaking it into subquestions and hypotheses. Each iteration revisits evidence, conflicts and gaps, and actively seeks counterevidence that could change the conclusion.

### Scope and plan

Define boundaries, budget, source strategy and data-delivery requirements.

### Research and challenge

Read originals, archive snapshots, extract data and compare explanations before the next iteration.

### Synthesize and package

Present findings, limitations and methods; complete automated checks and substantive review.

## Trace claims and data through separate paths.

Citations lead to original snapshots. Data records lead to inputs and calculation methods. Qualitative research can produce literature coding, policy events or competitor matrices without forcing everything into numerical tables.

### Evidence chain

Report citation → source ID → original snapshot and location

### Data chain

Report record → dataset → inputs and method → source location

## Useful beyond the first report.

The package supports reading, data reuse and evidence review. Record why material is unavailable or data inapplicable; empty directories are not research results.

### report.md + sources.md

Main report and source index, retaining confidence and limitations.

### data/ + analysis/

Extracted and curated data, field dictionaries, calculations and rerun methods.

### raw/ + notes/

Original materials, evidence excerpts, conflicts and interpretation.

### work/ + qa/

Brief, search process, review records and content fingerprints.

## Let the question determine the depth.

Supports landscape research, comparisons, technical deep dives, due diligence, literature reviews, policy analysis and fact-checking. State the decision, the evidence that could change it and the research budget.

### Example brief

Use zerox-deep-research to investigate migration costs for open-source knowledge tools. Compare three options, retain source material and a comparison matrix, and distinguish facts, inferences and gaps.

## Keep uncertainty visible.

Automated checks validate structure, citations and data relationships, not source authenticity, comparability or calculation correctness. Research respects access restrictions and ends at the report and research package. Visual exhibits and page layouts belong to subsequent tools.

[View repository](https://github.com/ZeroxZhang/zerox-skills/tree/main/zerox-deep-research)
