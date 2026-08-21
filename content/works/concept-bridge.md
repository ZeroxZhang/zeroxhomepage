---
schema_version: 2
slug: concept-bridge
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: Concept Bridge
title_en: Concept Bridge
tagline: 输入两个概念，沿着中间推导路径继续探索
tagline_en: Enter two ideas and explore the reasoning steps that connect them
summary: 一个可探索的 3D 概念空间：由 LLM 生成中间节点与逻辑链，并允许你从任意节点继续展开分支。
summary_en: An experimental 3D concept explorer that asks an LLM for intermediate ideas, then lets you branch from any node.
category: visual-design
type: Web 应用
type_en: Web application
level: standard
status: experiment
featured: false
weight: 110
facts_as_of: 2026-08-21
tags:
  - 3D 可视化
  - 概念学习
  - LLM
tags_en:
  - 3D visualization
  - Concept learning
  - LLM
stack:
  - Next.js 16
  - React 19
  - Three.js
  - react-force-graph-3d
links:
  - label: 探索概念路径
    label_en: Explore a concept path
    type: demo
    url: https://concept-bridge-three.vercel.app
    primary: true
  - label: GitHub
    label_en: GitHub
    type: repository
    url: https://github.com/ZeroxZhang/concept_bridge
    primary: false
related:
  - paper-to-course
  - nanobot-course
---

<!-- locale: zh-CN -->

# Concept Bridge

学习中的卡点常出现在两个熟悉概念之间。你可能分别知道“梯度下降”和“神经网络”的定义，却缺少一条能说明它们如何关联、每一步为何出现的路径。词典式答案补充了端点信息，长段解释又很难保留整体方向。

Concept Bridge 是一个实验性的 3D 概念探索应用。输入任意两个概念，服务端会让 LLM 生成起点、终点、3—4 个中间概念及其有序连接，再把结果呈现为可以旋转、拖动、悬停和扩展的粒子网络。

## 把“中间几步”放到可操作的空间里

主路径把推导顺序显式展示出来，端点与中间节点使用不同颜色。悬停节点可查看模型生成的简短定义；点击任意节点，应用会再请求 3 个子概念，并把去重后的新节点合入现有网络。你可以先观察完整路径，再沿某个陌生分支继续追问，而不必在多轮聊天记录中反复寻找上下文。

前端基于 `react-force-graph-3d` 与 Three.js。节点由 100—400 个粒子构成并持续旋转，方向粒子沿连接移动，力导向布局则允许拖拽后回弹。视觉距离和聚类用于组织探索界面，没有被解释为可测量的知识距离。

## 一次探索怎样进行

第一次使用只需填写两个概念并提交。Next.js API 路由通过 OpenAI SDK 调用兼容接口，返回结构化节点和边；浏览器据此建立初始图。遇到值得拆解的概念时，点击节点即可增加一层分支，悬停定义则提供快速回顾。交付物是一张仍可继续生长的会话内概念图，适合头脑风暴、课程预习和寻找研究入口。

当前公开实现没有保存工作区、协作编辑、引用来源或图谱导出功能。刷新页面后能否保留探索结果也没有持久化机制保证，重要路径需要另行记录。

API Key 由服务端环境变量读取，不写入前端代码。仓库默认模型值为 `deepseek-chat`；README 中的 DeepSeek V4 Flash 配置与当前代码默认值不一致，因此公开页面具体使用哪个模型无法仅凭仓库确认。

## 原型状态与认知边界

截至 2026-08-21，公开 Demo 可访问，双概念输入、逻辑链、节点扩展、3D 交互与悬停解释均能在源码中核验。项目未公开测试、CI、Release 或许可证，线上页面仍保留 Create Next App 的默认标题与描述，产品化元数据尚未收尾。

图中的关系来自 LLM 生成，不是 embedding、向量距离或降维计算结果，也可能出现遗漏、跳步和事实错误。它适合用来提出后续问题和浏览可能的连接；考试结论、研究引用与专业决策仍需回到可靠资料逐项核验。

[探索概念路径](https://concept-bridge-three.vercel.app)

<!-- locale: en -->

# Concept Bridge

Some learning gaps sit between two ideas you already recognize. You may know the definitions of “gradient descent” and “neural network” while still lacking a usable account of how one participates in training the other. A glossary gives you the endpoints; a long chat answer can bury the path inside paragraphs.

Concept Bridge is an experimental 3D concept explorer for that missing middle. Enter any two concepts and the server asks an LLM to return the source, the destination, three or four intermediate concepts, and an ordered set of links. The browser turns that response into a particle graph you can rotate, drag, inspect, and extend.

## Keep the reasoning path in view

The main chain makes sequence visible, with different colors for endpoints and intermediate nodes. Hovering over a node reveals a short model-generated definition. Clicking a node requests three related child concepts, removes duplicates, and merges the new branch into the graph. This makes it possible to hold the overall route in view while following one unfamiliar term, without searching back through a long conversation transcript.

The interface uses `react-force-graph-3d` and Three.js. Nodes are rendered as rotating clouds of roughly 100 to 400 particles, directional particles travel along links, and a force-directed layout provides spring-like movement when the graph is dragged. Those visual distances and clusters organize the interface; the product does not calculate or expose a measurable distance between concepts.

## From two terms to an explorable map

The first run requires only a pair of concepts. A Next.js API route calls an OpenAI-compatible endpoint through the OpenAI SDK and returns structured nodes and links. The initial graph becomes the working surface: hover for a quick definition, click to grow a branch, and move between the main route and its surrounding ideas.

The resulting graph is useful as a brainstorming artifact, a course-preview aid, or a way to identify terms that deserve deeper research. It remains tied to the current browser session; the public implementation does not advertise saved workspaces, collaborative editing, citations, or export.

The API key is read from server-side environment variables rather than shipped in frontend code. The repository currently defaults to `deepseek-chat`, while its README describes a DeepSeek V4 Flash setup. Public source alone therefore does not establish which model is configured on the hosted demo.

## Evidence and prototype limits

As of August 21, 2026, the public demo was reachable, and the source verifies two-concept input, an ordered intermediate chain, node expansion, interactive 3D layout, and hover explanations. The repository had no public test suite, CI workflow, release, or license. The deployed page also retained the default Create Next App title and description, which is a visible sign that product metadata is unfinished.

Every relationship in the graph is generated by an LLM. It is not derived from embeddings, vector distances, or dimensionality reduction, despite language in the README that suggests a vector space. Links can omit important steps or state incorrect connections. Concept Bridge works best for generating follow-up questions and surveying possible paths; academic citations, exam answers, and professional decisions still need source-level verification.

[Explore a concept path](https://concept-bridge-three.vercel.app)
