---
schema_version: 2
slug: io-system
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: IO System
title_en: IO System
tagline: 一套以本地文件为事实源、持续连接素材与创作的个人内容系统
tagline_en: A local-first content system that keeps sources, ideas, and published work connected over time
summary: IO System 用 Markdown、YAML 与 Python CLI 组织输入、来源、输出和再发现机制。内容保存在用户可直接读取的文件中，索引可以重建，Agent 也通过同一套规则参与工作。
summary_en: IO System organizes inputs, sources, outputs, and rediscovery through Markdown, YAML, and a Python CLI. Content remains in human-readable local files, indexes can be rebuilt, and AI agents operate under the same explicit rules.
category: personal-system
type: 本地个人内容系统
type_en: Local-first personal content system
level: featured
status: private
featured: true
weight: 90
facts_as_of: 2026-08-21
tags:
  - Personal OS
  - Local-first
  - 内容工作流
tags_en:
  - Personal OS
  - Local-first
  - Content workflow
stack:
  - Markdown
  - YAML
  - Python 标准库
  - iCloud Drive
links: []
related:
  - huashu-bookwriter
  - silenzio
  - editor
---

<!-- locale: zh-CN -->

# IO System

收藏工具解决了“先存下来”，却很少解决“以后怎么用”。链接进入稍后读，摘录散落在不同应用，灵感写下后缺少上下文；等到开始创作，人仍要靠记忆寻找来源、重建关系，并判断哪些旧材料值得重新打开。

IO System 是一套运行在本地文件与 iCloud 上的个人内容系统。它把输入、来源、主题、输出和再发现连接成同一条工作流，使素材有来路、成品可追溯、旧内容能够再次参与创作。Markdown 保存正文，YAML 描述关系，Python CLI 执行约束；文件系统始终是唯一事实源。

## 从收藏仓库转向可持续的内容循环

笔记数量并不等于知识积累。缺少结构时，新增内容只会扩大检索范围：一条材料属于哪个主题、是否被引用过、和既有观点有什么冲突，都要等到写作时临时判断。

IO System 把这些判断前移，并以明确的数据结构保存下来。系统以内容在不同阶段之间的流动为核心：一段输入如何成为观点，一份输出如何保留证据，完成的文章又如何变成下一轮创作的材料。单篇笔记只是这条链路中的一个载体。

## 五个相互衔接的层次

### 输入有类型，也有归属

idea、material、snippet、spark 等类型描述内容当前所处的状态；规范主题与别名表决定它被放到哪里。六类自然语言意图覆盖输入、输出、灵感、剪藏、归档和系统命令。遇到含糊指令时，Agent 必须先询问，避免替用户猜测并写入错误位置。

### 来源关系随内容一起保存

每份输出通过 sources 字段连接原始材料、历史输出和外部来源。成品可以一路追溯到依据，旧文章也能成为新项目的输入。这些关系不依赖某个应用的私有数据库，可以直接检查，也可以由脚本审计。

### 主题词表控制长期漂移

主题注册表统一规范名称和常见别名，避免同一概念因大小写、缩写或中文表达不同而形成多个孤岛。随着内容增长，分类依据保持稳定，搜索和跨主题连接也更可靠。

### Spark 负责再发现

搜索要求用户仍然记得关键词。Spark 采用随机考古、跨主题连接、标签扩展、时间脉冲和矛盾发现等策略，从旧材料中寻找新的组合，并根据采纳结果调整策略权重。它把“偶然翻到一条旧笔记”变成系统内可重复的动作。

### 审计维护系统健康

rebuild-index 可以从文件重建索引，audit 检查元数据、引用关系和目录结构。索引属于可重建的派生视图；即使工具发生变化，作为事实源的正文和关系仍留在可读文件中。

## Agent 如何进入这套系统

IO System 不把 AI 当成拥有独立记忆的黑箱。Claude Code、Codex 或其他执行环境需要遵守同一套目录、schema、命名和确认规则。Agent 可以帮助归档、建立来源关系、生成 Spark 或执行审计，但内容边界和事实源不会因为更换模型而改变。

风格文件则把“写成什么样”从单次提示词中抽离出来。开始生成前先选择对应语气和用途，减少不同工具接入后造成的表达漂移。规则本身与内容一起版本化，能够被检查和修订。

## 一条真实的内容流

一段播客先由 SILENZIO 转成文字，其中值得保留的观点以 material 进入 IO System，并记录节目来源与主题。后来准备文章时，Spark 找到它与另一份旧摘录之间的矛盾；两者共同进入草稿。文章完成后，输出文件仍保留 sources，日后还可以被拆成短内容或成为新研究的入口。

系统价值由这条链路能否连续运转来衡量，界面里保存了多少卡片只是表面规模。

## 已经运行的私人基础设施

IO System 从 2026-04-02 的 v1.0.0 演进到原始材料记录的 v1.6.0。2026 年 8 月的脱敏快照包含 10 个规范主题、90 份剪藏、42 条输入素材与 20 篇输出；已有审计快照为 0 错误、0 告警。

这些数字说明系统已经承载真实内容，但不等同于通用效率结论。当前实现为私人本地系统，不提供公开仓库、在线演示或安装包。本页只展示匿名架构、汇总规模和工作方法，不公开真实标题、正文、来源、本机路径及其他个人数据。

## 适用范围与代价

这套系统适合重视内容所有权、来源追踪、长期复用，并愿意维护目录和元数据的人。它的成本同样明确：用户需要理解 schema、处理偶尔出现的归类问题，并对同步与备份负责。开箱即用的云端笔记体验和多人实时协作均超出当前版本范围。

IO System 是我对 local-first AI 内容工作流的一次持续实践：文件可以离开工具，关系可以接受审计，自动化也必须服从可读、可恢复的内容基础。

<!-- locale: en -->

# IO System

Saving tools solve the immediate problem of “keep this for later,” but rarely answer what happens later. Links enter read-it-later queues, excerpts spread across apps, and ideas lose their original context. When writing begins, the user still has to remember where a claim came from, reconstruct relationships, and decide which older material deserves attention.

IO System is a personal content system built on local files and iCloud. It connects inputs, sources, topics, outputs, and rediscovery in one operating model, so material retains its origin, finished work remains traceable, and older content can participate in future projects. Markdown stores the text, YAML describes relationships, and a Python CLI enforces the rules. The filesystem remains the sole source of truth.

## From a collection archive to a content loop

More notes do not necessarily produce more knowledge. Without a stable structure, every new item expands the search space. Topic assignment, previous use, supporting evidence, and contradictions with existing ideas all have to be rediscovered at writing time.

IO System moves those decisions earlier and records them in an explicit data model. Its primary unit is not the isolated note, but the movement of content between stages: how an input develops into an argument, how an output retains its evidence, and how completed work becomes material for another cycle.

## Five connected layers

### Typed and placed inputs

Types such as idea, material, snippet, and spark describe the current role of an item. A canonical topic registry and its aliases determine where it belongs. Six natural-language intent groups cover inputs, outputs, sparks, clippings, archives, and system commands. When an instruction is ambiguous, an agent must ask before writing instead of silently placing content in the wrong location.

### Source relationships that travel with the work

Each output uses a sources field to connect original materials, previous outputs, and external references. A finished piece can be traced back to its evidence, while an older article can become an input to a new project. These relationships are stored outside any proprietary application database, making them directly inspectable and script-auditable.

### A topic registry that limits long-term drift

The registry normalizes canonical topic names and common aliases. It prevents the same concept from splitting into separate islands because of capitalization, abbreviations, or Chinese and English naming differences. As the collection grows, classification remains consistent and cross-topic discovery becomes more dependable.

### Spark as a rediscovery mechanism

Search assumes that the user still remembers what to ask for. Spark applies strategies including random archaeology, cross-topic linking, tag expansion, time pulses, and contradiction detection to surface useful combinations from older material. Strategy weights can respond to whether suggestions are adopted. Rediscovery becomes an intentional system behavior rather than a lucky encounter with a forgotten note.

### Audits that protect system health

The rebuild-index command reconstructs indexes from files, while audit checks metadata, references, and directory structure. An index is treated as a derived view rather than the content itself. Tools can be replaced without trapping the text or its relationships in an opaque database.

## How AI agents participate

IO System does not treat an AI model as a black box with its own authoritative memory. Claude Code, Codex, and other execution environments must follow the same directory, schema, naming, and confirmation rules. Agents can classify material, create source links, propose Sparks, and run audits, but changing the model does not change the system boundary or source of truth.

Style files also separate writing intent from one-off prompts. A voice and purpose are selected before generation, which reduces tonal drift when multiple tools participate. The operating rules are versioned beside the content and can be inspected, challenged, and revised.

## A representative content flow

A podcast is transcribed through SILENZIO. A useful argument enters IO System as material with its episode source and topic recorded. Months later, Spark surfaces a tension between that passage and an older excerpt. Both become inputs to a draft. When the article is complete, its output file still carries the sources and can later be adapted into shorter formats or used as evidence in another research project.

The value lies in whether that chain continues to operate—not in how many cards a single interface can display.

## Private infrastructure in active use

IO System evolved from v1.0.0 on April 2, 2026, to v1.6.0 in the source material reviewed for this page. An anonymized August 2026 snapshot contained 10 canonical topics, 90 clippings, 42 input items, and 20 outputs. The available audit snapshot reported 0 errors and 0 warnings.

These counts demonstrate real use, but they are not evidence of universal productivity gains. The current implementation is a private local system with no public repository, hosted demo, or installer. This page exposes only anonymized architecture, aggregate scale, and operating principles. Actual titles, text, sources, machine paths, and personal data remain private.

## Fit and tradeoffs

IO System is suited to people who value content ownership, source traceability, long-term reuse, and explicit operating rules—and who are willing to maintain folders and metadata. The costs are equally concrete: users must understand the schema, resolve occasional classification questions, and remain responsible for sync and backup. A turnkey cloud notebook or a real-time collaborative workspace is outside the scope of the current system.

For me, IO System is an ongoing study of local-first, AI-assisted content work: files should outlive the tool, relationships should withstand inspection, and automation should remain subordinate to readable and recoverable content.
