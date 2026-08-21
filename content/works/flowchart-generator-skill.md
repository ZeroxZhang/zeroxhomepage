---
schema_version: 2
slug: flowchart-generator-skill
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: Flowchart Generator Skill
title_en: Flowchart Generator Skill
tagline: 在画布出现之前，先把流程的逻辑整理清楚
tagline_en: Clarify the logic before the diagram reaches the canvas
summary: 面向 Agent 的流程图 Skill，通过结构化分析、JSON、ASCII 线框和 SVG 校验，将自然语言转为可编辑流程图。
summary_en: An agent skill that turns natural language into editable flowcharts through structured analysis, JSON, ASCII wireframes, SVG generation, and validation.
category: visual-design
type: Agent Skill
type_en: Agent skill
level: featured
status: active
featured: true
weight: 40
facts_as_of: 2026-08-21
tags:
  - 流程图
  - SVG
  - 信息架构
tags_en:
  - Flowcharts
  - SVG
  - Information architecture
stack:
  - Python
  - SVG
  - JSON
links:
  - label: 安装流程图 Skill
    label_en: Install the flowchart skill
    type: repository
    url: https://github.com/ZeroxZhang/flowchart-generator-skill
    primary: true
related:
  - arch-diagram
  - onepager
---

<!-- locale: zh-CN -->

# Flowchart Generator Skill

流程图的返工往往从一个很早的错误开始：输入里的步骤没有拆清楚，分支条件缺少结果，节点粒度也不一致。直接进入视觉生成后，这些问题会被颜色和布局暂时遮住，直到评审时才暴露。

Flowchart Generator Skill 把理解、结构和渲染分成不同阶段。自然语言先被整理为可检查的中间表示，逻辑确认后再进入 SVG。成图因此拥有清楚的来路，也保留继续修改的空间。

## 接受真实世界里的不规整输入

用户可以提交段落、列表、伪代码、会议记录或粗略 SOP，不需要预先学习 Mermaid 或绘图语法。

Skill 会识别步骤、判断、循环、并行关系和终止条件，并对过长节点、模糊动词和重复路径进行内容整理。它首先解决“这段话到底描述了什么流程”，然后才讨论图应该长什么样。

## 六个阶段，逐步降低修改成本

### 分析输入

识别流程目标、参与角色、起点、终点和异常路径。信息不足时，应先提出问题，不用视觉猜测填补业务逻辑。

### 优化内容

统一节点粒度，缩短标签，明确分支条件。这个阶段只改表达和结构，不处理颜色、字体与形状。

### 建立 JSON 结构

节点、边和关系进入 schema。JSON 是模型与验证器共享的契约，也是人能够精确修改的接口。

### 生成 ASCII 线框

文本线框快速暴露方向、分组和分支。此时改动成本很低，适合在进入视觉设计前确认整体布局。

### 设计视觉语言

根据流程类型选择方向、节点类型、颜色和层级。语言识别与排版规则分别处理，中英文内容都能获得合适的节点尺寸和字体策略。

### 输出并校验 SVG

最终交付为可编辑 SVG。验证器检查节点、边、连通性、XML、viewBox、字体和基础结构，使明显错误在交付前被发现。

## 中间表示为何重要

从原文一步跳到成图，任何理解错误都会和版式绑定在一起。修改一个分支，可能需要重新生成整张图。

在这套工作流中，结构问题回到 JSON 或 ASCII 修正，视觉问题留在 SVG 层处理。内容、关系和样式可以分别迭代。对于需要多轮评审的 SOP、业务流程和 Agent 工作流，这种分层会显著减少“整张重来”的次数。

## 交付物可以继续进入下一环

SVG 保留文本、节点和颜色的可编辑性，可用于网页、文档和演示稿。它也比位图更适合版本管理和后续自动处理。

仓库包含提示协议、JSON schema、静态模板和两个 Python 验证器。验证器能够检查结构与文件质量，但不能证明业务语义完全正确，也无法替代人工审美判断。

## 适用范围

它适合产品流程、操作规范、系统行为、决策树和中等规模 Agent 工作流。README 建议单张图控制在 30 个节点以内。超过这个规模时，优先拆分为总览和子流程，通常比继续压缩节点更容易阅读。

如果输入本身存在严重争议，Skill 也无法替团队做业务决定。它提供的是一条更容易讨论和验收的制图过程。

## 公开状态

截至 2026-08-21，项目记录为 38 Stars、2 Forks，并提供多个 Agent 环境的安装说明。仓库没有跨宿主自动化测试，输出仍会受到宿主模型和运行环境影响。

[安装 Flowchart Generator Skill](https://github.com/ZeroxZhang/flowchart-generator-skill)

<!-- locale: en -->

# Flowchart Generator Skill

Flowchart rework often begins with an early mistake: the steps were never separated clearly, branch conditions lack outcomes, or nodes operate at inconsistent levels of detail. Once visual generation starts, color and layout can hide those problems until review.

Flowchart Generator Skill separates interpretation, structure, and rendering. Natural language is converted into intermediate representations that can be inspected before the SVG is produced. The final diagram has a traceable structure and remains open to revision.

## Work with the input people actually have

Users can provide paragraphs, lists, pseudocode, meeting notes, or a rough SOP. There is no requirement to learn Mermaid or another diagram syntax first.

The skill identifies actions, decisions, loops, parallel paths, and end states. It also shortens long labels, replaces vague verbs, and looks for duplicated routes. The first task is to understand the process being described; visual design comes later.

## Six stages with progressively higher fidelity

### Analyze the input

Identify the objective, participants, start and end states, and exception paths. When important information is missing, the workflow should ask for clarification rather than inventing business logic through layout.

### Improve the content

Normalize node granularity, shorten labels, and make branch conditions explicit. This stage changes language and structure without making visual decisions.

### Create the JSON structure

Nodes, edges, and relationships enter a schema. JSON becomes a shared contract for the model and validators, as well as a precise editing surface for people.

### Produce an ASCII wireframe

A text wireframe exposes direction, grouping, and branches at low cost. Teams can approve the overall shape before time is spent on visual treatment.

### Define the visual language

Direction, node types, colors, and hierarchy are selected for the process. Language detection and layout rules are handled separately so both Chinese and English diagrams receive appropriate sizing and font choices.

### Generate and validate the SVG

The final deliverable is an editable SVG. Validators inspect nodes, edges, connectivity, XML, viewBox, fonts, and basic structure, catching common file and topology errors before delivery.

## Why intermediate representations matter

When a workflow moves directly from prose to a finished image, any misunderstanding becomes entangled with the layout. Correcting one branch can require regenerating the entire diagram.

Here, structural issues can be corrected in JSON or ASCII, while visual issues stay in the SVG layer. Content, relationships, and style evolve independently. That division is useful for SOPs, product processes, and agent workflows that require several review rounds.

## A deliverable that can continue downstream

SVG preserves editable text, nodes, and colors. It can move into a website, document, or presentation and is better suited than a bitmap for version control and later automation.

A representative run starts with an unstructured process note, produces a normalized list of actions and decisions, and then pauses at the JSON and wireframe stages for review. A missing exception can be added before visual work begins. Once the structure is accepted, the SVG layer handles hierarchy and presentation without reopening every content decision.

The source remains editable afterward.

The repository includes the prompt protocol, JSON schema, static templates, and two Python validators. These tools can verify file and structural properties. They cannot prove that the business meaning is correct or that the visual design meets every audience's needs.

## Where it fits

The skill is intended for product flows, operating procedures, system behavior, decision trees, and medium-sized agent workflows. The README recommends keeping a diagram below 30 nodes. Larger systems are usually clearer when divided into an overview and focused subflows.

A diagram workflow cannot settle a disputed business process on behalf of the team. It provides a clearer way to discuss and approve that process.

## Public status

As of August 21, 2026, the project had 38 stars and 2 forks, with installation guidance for several agent environments. There is no cross-host automated test suite, so results still depend on the host model and runtime.

[Install Flowchart Generator Skill](https://github.com/ZeroxZhang/flowchart-generator-skill)
