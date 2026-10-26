---
schema_version: 2
slug: "zerox-thinkcell-charts"
default_locale: "zh-CN"
locales: ["zh-CN", "en"]
title: "zerox-thinkcell-charts"
title_en: "zerox-thinkcell-charts"
tagline: "让数据关系，成为可以继续编辑的图表。"
tagline_en: "Make data relationships visible and editable."
summary: "从表格和 JSON 出发，推荐图型、校验数据，生成可编辑 PPTX、PNG 与离线 HTML。"
summary_en: "Recommend charts, validate table or JSON inputs, and render editable PPTX, PNG and offline HTML."
category: "visual-design"
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
links: [{"label": "查看仓库", "label_en": "View repository", "type": "repository", "url": "https://github.com/ZeroxZhang/zerox-skills/tree/main/zerox-thinkcell-charts", "primary": true}]
related: ["zerox-skills", "consulting-report-forge"]
---

<!-- locale: zh-CN -->

# zerox-thinkcell-charts

让数据关系，成为可以继续编辑的图表。

从表格和 JSON 出发，推荐图型、校验数据，生成可编辑 PPTX、PNG 与离线 HTML。

![真实渲染示例：多图经营看板，使用示意数据。](/work-assets/2026-projects/chart-dashboard.png)

## 图型服务于你要解释的关系。

解释变化的贡献可以用瀑布桥，同时呈现市场规模与结构可以用 Mekko。图表推荐从数据形态和表达意图出发，校验器检查比例、长度、日期、范围和对账关系。

![瀑布图：起点、增减贡献与终点。示意数据。](/work-assets/2026-projects/chart-waterfall.png)

![Mekko：用宽度与份额同时表达结构。示意数据。](/work-assets/2026-projects/chart-mekko.png)

## 一份输入，三种交付。

结构化输入便于修改、重复生成和版本管理。不同格式的可编辑范围并不相同。

### PPTX

柱、线、文字与箭头是可单独修改的 PowerPoint 形状。

### PNG

用来检查排版、快速预览和嵌入文档。

### HTML

原生 SVG 与可编辑文字，离线改字后保存成独立文件。

## 颜色有分工，页面有层级。

八套主题提供可复用的配色，正向、负向、目标和重点各有角色。除单图外，dashboard / facet 支持一页多图、共用横轴、分段与条件着色。

![仓库主题总览，使用同一示例比较不同配色。](/work-assets/2026-projects/chart-themes.png)

## 从已有示例开始，换入真实数据。

安装目录内的 Python 依赖后，可以直接运行 CLI。PPTX 和 HTML 不需要 LibreOffice；PNG 导出另外需要 LibreOffice 与 Poppler。

### 生成离线图表

python3 scripts/tc_render.py examples/waterfall.json --html report.html

## 可编辑形状，不等于数据联动图表。

PPTX 不包含 PowerPoint 原生图表的数据编辑功能；HTML 改字不会重算图形，也不会回写 JSON、PPTX 或 PNG。数据变化后应修改源规格并重新生成。本项目独立实现，与 think-cell 无隶属、授权或背书关系。

[查看仓库](https://github.com/ZeroxZhang/zerox-skills/tree/main/zerox-thinkcell-charts)

<!-- locale: en -->

# zerox-thinkcell-charts

Make data relationships visible and editable.

Recommend charts, validate table or JSON inputs, and render editable PPTX, PNG and offline HTML.

![Actual rendered example: a multi-panel operating dashboard using illustrative data.](/work-assets/2026-projects/chart-dashboard.png)

## Choose the chart for the relationship.

A waterfall explains contributions to change; a Mekko compares market size and composition together. Recommendations use data shape and intent. Validation checks proportions, lengths, dates, ranges and reconciliation.

![Waterfall: starting value, contributions and ending value. Illustrative data.](/work-assets/2026-projects/chart-waterfall.png)

![Mekko: width and share encode composition. Illustrative data.](/work-assets/2026-projects/chart-mekko.png)

## One input, three useful formats.

Structured inputs support revisions, repeatable rendering and version control. Each output has a different editing scope.

### PPTX

Bars, lines, labels and arrows are individually editable PowerPoint shapes.

### PNG

Use images for layout inspection, previews and document embedding.

### HTML

Native SVG with editable text; make text changes offline and save a standalone file.

## Give colors meaning and pages hierarchy.

Eight themes provide reusable palettes with distinct roles for gains, losses, targets and emphasis. Dashboard and facet layouts add multi-panel pages, shared axes, segments and conditional coloring.

![Repository theme overview comparing palettes on a common example.](/work-assets/2026-projects/chart-themes.png)

## Start with an example, then use verified data.

After installing the Python dependencies, run the CLI directly. PPTX and HTML do not need LibreOffice; PNG export additionally requires LibreOffice and Poppler.

### Render offline HTML

python3 scripts/tc_render.py examples/waterfall.json --html report.html

## Editable shapes have a specific scope.

PPTX does not provide native PowerPoint chart-data editing. HTML text changes do not recalculate geometry or update JSON, PPTX or PNG. Change the source specification and rerender when data changes. This independent project has no affiliation with, authorization from or endorsement by think-cell.

[View repository](https://github.com/ZeroxZhang/zerox-skills/tree/main/zerox-thinkcell-charts)
