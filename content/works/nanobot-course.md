---
schema_version: 2
slug: nanobot-course
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: Nanobot Course
title_en: Nanobot Course
tagline: 用六章互动练习，重建一次 Agent 从消息到工具的执行过程
tagline_en: Rebuild an agent loop through six interactive chapters
summary: 面向中文读者的 nanobot 源码课程，通过数据流动画、拖拽、群聊模拟、测验和 Bug 挑战解释框架内部。
summary_en: A Chinese-language interactive source course using data-flow animations, matching exercises, chat simulations, quizzes, and bug hunts to explain nanobot.
category: learning
type: 互动源码教程
type_en: Interactive source-code course
level: standard
status: complete
featured: false
weight: 200
facts_as_of: 2026-08-21
tags:
  - AI Agent
  - 源码学习
  - 中文教程
tags_en:
  - AI agent
  - Source-code learning
  - Chinese tutorial
stack:
  - HTML
  - CSS
  - JavaScript
links:
  - label: 开始 Nanobot 课程
    label_en: Start the Nanobot course
    type: demo
    url: https://zeroxzhang.github.io/nanobot-course/
    primary: true
  - label: GitHub
    label_en: GitHub
    type: repository
    url: https://github.com/ZeroxZhang/nanobot-course
    primary: false
related:
  - zerox-agent-course
  - paper-to-course
---

<!-- locale: zh-CN -->

# Nanobot Course

“Agent 等于模型加工具”可以概括零件，却没有交代系统怎样运转：来自不同渠道的消息在哪里汇合，模型何时决定调用工具，工具结果如何回到上下文，记忆何时读取，错误又会在哪一层暴露。直接阅读源码时，这些关系散落在多个文件和抽象中。

Nanobot Course 是一套面向中文读者的浏览器互动课程。它把 nanobot 的执行流拆成六章，通过动画、模拟和练习建立组件之间的因果关系，再把读者带回代码结构。无需先安装框架或配置模型，即可从一次消息的移动开始理解 Agent。

## 从演员表走到完整执行链

六章依次是“认识 nanobot”“剧组成员”“消息是如何流动的”“与外部世界对话”“巧妙的设计”和“当系统出问题时”。前两章建立框架定位与角色分工；中间章节追踪消息、Agent Loop、渠道、模型与工具的协作；后两章讨论设计取舍、状态与故障排查。顺序按理解依赖组织，使调试建立在运行机制之上。

课程把抽象组件改写为可观察的行为。数据流动画逐步移动消息包，架构图允许点击角色查看职责，群聊模拟把协调过程放入同一对话窗口。拖拽匹配要求读者区分消息、模块与能力边界，选择题提供即时解释，Bug 挑战则要求定位出错环节并判断修复方向。

## 打开网页，边操作边形成阅读地图

典型学习路径从第一章的全局介绍开始，随后跟着一条消息进入循环，再观察系统如何调用外部能力。每章结束时用练习检验理解；遇到薄弱点可返回相应动画重放。完成六章后，读者得到的交付物是一张带执行顺序的源码地图，以及一组可用于阅读上游实现的具体问题。

课程由六个模块化 HTML 片段、共享 CSS 和原生 JavaScript 组成，Shell 构建脚本将它们合并为单页。静态交付同时覆盖桌面与触控浏览，学习过程不依赖后端账户、API Key 或正在运行的 nanobot 实例。

## 公开状态与版本边界

截至 2026-08-21，六章内容、互动脚本与构建文件已在公开仓库提供；GitHub Pages 部署记录成功，在线课程可访问。项目没有公开 Release、测试套件或许可证，也没有在页面中锁定所讲解的 nanobot 上游 commit。

这是一份 2026 年 7 月发布的第三方源码学习快照，不代表 nanobot 官方文档，也不会自动跟随上游变化。它适合初次接触 Agent 框架的开发者、需要向团队解释执行流的人，以及想通过故障场景巩固理解的学习者。要核对当前接口、安装方式或安全行为，仍需查阅 nanobot 最新源码与官方资料。

[开始 Nanobot 课程](https://zeroxzhang.github.io/nanobot-course/)

<!-- locale: en -->

# Nanobot Course

“An agent is a model plus tools” names the parts but leaves out the motion. It does not show where messages from different channels meet, when the model chooses a tool, how a result returns to context, when memory is read, or which layer exposes a failure. In a source repository, those relationships are usually distributed across files and abstractions.

Nanobot Course is a Chinese-language interactive course that reconstructs nanobot through its execution flow. Six browser-based chapters use animation, simulation, and exercises to make causal relationships between components visible, then give the learner a map for returning to the source. No framework installation or model configuration is required to begin.

## From the cast to the runtime

The chapters translate to “Meet nanobot,” “The cast,” “How messages flow,” “Talking to the outside world,” “Clever designs,” and “When the system fails.” The opening chapters establish the framework’s role and component responsibilities. The middle of the course follows messages through the agent loop, channels, model, and tools. The closing chapters examine design choices, state, and debugging.

That order is intentional: failure cases are easier to reason about once the normal runtime path has a shape. Learners encounter each component when it becomes necessary to the flow, rather than receiving a flat glossary at the beginning.

## Exercises that expose misunderstandings

Step-controlled flow animations move message packets between components. Clickable diagrams reveal the responsibility of each actor, while group-chat simulations place coordination inside one observable conversation. Drag-and-drop matching asks learners to distinguish messages, modules, and capability boundaries. Multiple-choice checks provide explanations, and bug-hunt challenges ask the learner to identify the failing layer and reason about a repair.

The interaction has a specific teaching job in each case. A learner can predict the next step, see the system respond, and revisit the relevant explanation when that prediction is wrong. This produces a more testable mental model than reading a diagram once and moving on.

## A browser-first study workflow

A typical session begins with the high-level introduction, follows a single message into the loop, and then watches the system communicate with external capabilities. Exercises at the end of each chapter check the current model; any weak area can be replayed before advancing. After six chapters, the learner has an ordered source-reading map and a set of concrete questions to carry into the upstream implementation.

The course consists of six modular HTML fragments, shared CSS, and vanilla JavaScript. A shell script concatenates them into one static page. The hosted result works without a backend account, API key, or running nanobot instance and is designed for both desktop and touch interaction.

## Publication evidence and limits

As of August 21, 2026, the six chapters, interaction script, and build files were present in the public repository. Its GitHub Pages deployment had completed successfully, and the hosted course was reachable. The repository did not publish releases, a test suite, or a license, and the course did not pin the upstream nanobot commit it explains.

This makes Nanobot Course a third-party source-learning snapshot published in July 2026. It is not official nanobot documentation and does not update automatically when upstream behavior changes. It fits developers approaching an agent framework for the first time, educators explaining execution flow, and learners who prefer to test understanding through failure scenarios. Current APIs, installation instructions, and security behavior should still be verified against the latest nanobot source and official materials.

[Start the Nanobot course](https://zeroxzhang.github.io/nanobot-course/)
