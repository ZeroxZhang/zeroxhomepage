---
schema_version: 2
slug: zerox-agent-course
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: Zerox Agent Course
title_en: Zerox Agent Course
tagline: 沿着一次任务的运行路径，读懂桌面 Agent 的关键边界
tagline_en: Follow one task through the runtime instead of getting lost in the repository tree
summary: Zerox Agent 的互动源码课程，用数据流、动画与练习解释输入如何穿过会话、工具、权限、存储和恢复机制。
summary_en: An interactive source course that traces a request across conversation state, tools, permissions, storage, and recovery in Zerox Agent.
category: learning
type: 互动源码教程
type_en: Interactive source-code course
level: standard
status: complete
featured: false
weight: 190
facts_as_of: 2026-08-21
tags:
  - 源码学习
  - AI Agent
  - 互动教程
tags_en:
  - Source-code learning
  - AI agent
  - Interactive course
stack:
  - HTML
  - CSS
  - JavaScript
  - Shell
links:
  - label: 开始课程
    label_en: Start the course
    type: demo
    url: https://zeroxzhang.github.io/zerox-agent-course/
    primary: true
  - label: GitHub
    label_en: GitHub
    type: repository
    url: https://github.com/ZeroxZhang/zerox-agent-course
    primary: false
related:
  - zerox-agent
  - nanobot-course
  - paper-to-course
---

<!-- locale: zh-CN -->

# Zerox Agent Course

大型桌面 Agent 仓库同时包含界面进程、后台服务、模型适配器、工具执行、权限判断和持久化。若阅读从目录树或入口文件开始，很快会遇到大量名词，却仍说不清用户按下回车后，消息经过了谁、在哪里暂停、失败后如何恢复。

Zerox Agent Course 是一门浏览器内运行的中文互动源码课。它以一次任务的生命周期为主线，把 Zerox Agent 的界面、Electron 进程边界、Agent Loop、授权、扩展能力和存储恢复串成一张运行地图，再把每个概念带回具体文件与代码片段。

## 六个模块按理解依赖逐层展开

课程从“认识 Zerox Agent”和消息全链路开始，随后介绍 Electron 三层角色、Preload 白名单与依赖注入装配。第三模块进入 Think—Act—Observe 循环、统一模型接口和上下文压缩；第四模块聚焦 Shell 命令分析、Permission Engine、审批与 Goal Mode。最后两章覆盖内置工具、Skill、MCP、子智能体，以及 JSON/JSONL、SQLite、Checkpoint、事件总线和执行轨迹。

这些主题没有被压成一张静态总览。可步进的数据流动画显示消息如何移动，角色扮演式聊天展示模块协作，架构组件可点击查看职责。选择题、拖拽匹配、权限漏洞挑战和结业测验要求读者在继续前作出判断，使“看过代码”和“理解调用关系”能够被区分。

## 一条低摩擦的学习工作流

打开在线课程后，先跟随第一章追踪一条消息，再用导航点按模块推进；遇到关键机制时操作动画或完成练习，最后带着页面给出的文件名与调用链回到源码核验。课程由分模块 HTML、共享 CSS 与原生 JavaScript 构成，`build.sh` 将各章节组装成一个静态 `index.html`，无需安装 Electron 或启动 Zerox Agent 即可学习。

直接交付的是一套可以反复浏览的系统心智模型：谁持有状态、谁能执行工具、审批在哪发生、恢复依赖哪些记录。它适合第一次阅读 Agent 工程的开发者，也适合希望理解桌面 Agent 安全与可恢复设计的产品和技术人员。

每个模块都可以独立返回重看，单页结构也便于在分享讨论时指向同一套上下文。

## 已发布的学习快照

截至 2026-08-21，六个模块与互动脚本已在公开仓库中提供，GitHub Pages 部署记录成功，在线页面可直接访问。项目没有公开 Release、自动内容同步或针对课程行为的独立测试套件；仓库也未锁定所讲解的 Zerox Agent 上游 commit。

因此课程应被视为 2026 年 7 月发布的源码学习快照，不能代替最新 API 文档或当前分支的逐行说明。源码发生变化时，文件路径和实现细节可能漂移，但按任务流、信任边界和状态恢复建立阅读地图的方法仍可作为进入仓库的起点。

[开始课程](https://zeroxzhang.github.io/zerox-agent-course/)

<!-- locale: en -->

# Zerox Agent Course

A desktop agent repository can contain a renderer, background services, model adapters, tool execution, permission decisions, and several forms of persistence at once. Starting with the file tree exposes plenty of names, but it rarely answers the useful question: after a user presses Enter, which components touch the request, where can execution pause, and what allows the task to recover after failure?

Zerox Agent Course is a browser-based interactive source course built around that runtime path. It connects the interface, Electron process boundaries, the agent loop, authorization, extension mechanisms, and recovery into one operating map, then points each concept back to concrete files and code excerpts.

## Six modules in dependency order

The first module introduces Zerox Agent and follows one message from the UI to the final reply. The second explains Electron’s three execution contexts, the Preload allowlist, and dependency-injection assembly. Module three moves into the Think–Act–Observe loop, a shared model-provider interface, tool-call messages, and context compression. Module four covers shell-command analysis, the Permission Engine, approval decisions, and Goal Mode.

The final two modules explain built-in tools, Skills, MCP, and child agents before moving into JSON and JSONL files, SQLite, checkpoints, the kernel event bus, and execution traces. The sequence gives readers enough context for each later mechanism instead of treating architecture as a flat catalog of components.

## Interaction as a comprehension check

The material goes beyond a static architecture overview. Step-controlled flow diagrams show messages moving between actors. Simulated conversations reveal how modules cooperate. Clickable architecture components expose responsibilities in place. Multiple-choice questions, drag-and-drop matching, a permission-bug challenge, and a final assessment ask the learner to make a prediction before seeing the explanation.

A practical study session starts by tracing the message flow in module one, advances through the navigation dots, and pauses to run each animation or exercise. The learner can then return to the Zerox Agent source with specific filenames, boundaries, and calls to inspect. That makes the course useful for developers entering an agent codebase and for technical product practitioners who want a concrete account of permission and recovery behavior.

## Static delivery with no setup requirement

The course is assembled from module-level HTML, shared CSS, and vanilla JavaScript. A short shell build script concatenates the parts into one `index.html`. The hosted version therefore runs as a static page: learners do not need to install Electron, configure a model provider, or launch Zerox Agent to build the initial mental model.

The deliverable is a repeatable map of the system: who owns state, who can execute a tool, where authorization occurs, and which records support resumption. It is educational content rather than a live instrumented view of a running agent.

## Evidence and version limits

As of August 21, 2026, all six modules and their interaction scripts were available in the public repository. The GitHub Pages deployment had completed successfully, and the hosted course was reachable. The project did not publish releases, automated content synchronization, or a separate behavioral test suite for the learning interactions. It also did not pin the upstream Zerox Agent commit used for the explanations.

The course should therefore be treated as a source-learning snapshot published in July 2026, not as current API documentation or a permanent line-by-line match for the latest branch. File paths and implementation details can drift as Zerox Agent evolves. Its task-flow, trust-boundary, and recovery-oriented reading strategy remains a useful starting point, but code-level claims should be checked against the current repository.

[Start the course](https://zeroxzhang.github.io/zerox-agent-course/)
