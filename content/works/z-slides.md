---
schema_version: 2
slug: z-slides
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: Z-Slides
title_en: Z-Slides
tagline: 把长演示拆成可恢复的生成流程，交付带动画、可下载的独立 HTML
tagline_en: A recoverable generation workflow for animated, downloadable HTML presentations
summary: Z-Slides 先建立内容结构与视觉规范，再以每批 2—3 页生成和合并长演示，减少响应截断与后半段风格漂移。成品支持交互播放，并可导出 HTML 与图片 ZIP。
summary_en: Z-Slides defines the narrative and visual system first, then generates long decks in batches of two to three slides. The staged process limits truncation and visual drift, and delivers an interactive presentation exportable as HTML or an image ZIP.
category: web-products
type: Web 产品
type_en: Web product
level: featured
status: active
featured: true
weight: 85
facts_as_of: 2026-08-21
tags:
  - AI 演示文稿
  - HTML Slides
  - 动画
tags_en:
  - AI presentations
  - HTML slides
  - Motion design
stack:
  - React
  - Vite
  - tRPC
  - OpenAI-compatible API
links:
  - label: 开始制作演示
    label_en: Create a presentation
    type: website
    url: https://slides.zeroxzhang.cc
    primary: true
related:
  - onepager
  - newspaper-demo
---

<!-- locale: zh-CN -->

# Z-Slides

生成一张漂亮的幻灯片已经不难，稳定完成一整份演示仍然困难。长响应可能在中途截断，前后页面的视觉规则逐渐漂移，失败后重新生成又会推翻已经满意的部分。结果看起来像一次快速产出，实际却把大量时间转移到补页、统一风格和重新导出。

Z-Slides 把演示生成设计为一条分阶段的生产流程：先梳理叙事结构，再建立视觉规范，随后每批生成 2—3 页，最后合并为一份带动画、可全屏播放并能下载带走的 HTML 演示。每个阶段都有明确产物，局部失败也不必从封面重新开始。

## 长演示需要流程控制，而不只是更长的提示词

演示文稿同时处理两种一致性。内容上，每页要推进同一条论述；视觉上，字体、色彩、网格、组件与动效需要遵守共同规则。一次请求直接生成全部页面，等于要求模型在不断增长的上下文中同时维持两套约束。

Z-Slides 将问题拆开。大纲先回答“讲什么、按什么顺序讲”，视觉规范再回答“用什么系统呈现”，页面批次只负责落实局部内容。拆分后的流程更容易观察、重试和扩展，也为后续人工调整保留清晰边界。

## 四个阶段组成一份完整演示

### 内容进入结构化大纲

用户提供主题、原始材料或要表达的内容。系统先组织叙事顺序与页面职责，使封面、论点、证据、转折和结尾有明确位置。页面生成开始前，整份演示已经拥有可检查的骨架。

### 视觉方向成为共同约束

产品提供 12 种以上风格选择，用于确定色彩、排版、装饰语言与整体气质。视觉决定在具体页面之前完成，后续批次都基于同一组规则工作，减少前几页精致、后几页失控的情况。

### 每批生成 2—3 页

小批量控制单次响应长度，降低长内容被截断的风险。某批页面失败时，可以针对这一段重新处理，已完成的部分仍然保留。生成过程因此具备局部恢复能力，而不再是一场不可中断的单次请求。

### 合并、播放与导出

完成的页面被组装为统一文稿，内含键盘、触摸和滚轮导航，支持响应式显示、动画与全屏预览。用户可以下载独立 HTML，也可以导出图片 ZIP，用于分享、归档或进入其他制作流程。

## 模型选择属于产品控制面

公开页面提供 6 种以上模型服务，并支持自定义 OpenAI-compatible 接口。用户可以根据视觉表现、响应稳定性、成本和已有账号选择后端，而不必固定在单一供应商上。

这也意味着实际生成会依赖所选模型的能力与可用性。相同输入在不同模型上可能产生不同结构、代码质量和视觉结果；Z-Slides 提供生产流程和交付形式，但不会消除模型本身的差异。

## 一次典型生成

准备一场产品复盘时，用户放入项目背景、关键决策和结果材料，选择适合复盘场景的视觉方向与模型。系统先给出叙事骨架，再依次生成页面批次。用户可以观察进度，在某个批次需要调整时集中重试，完成后进入全屏预览并下载 HTML。

历史记录和登录前输入恢复进一步减少重复劳动。重要判断仍由用户完成：哪些信息应该进入演示、叙事是否准确、数据是否有依据，以及最终视觉是否适合真实场合。

## 交付物为何选择 HTML

HTML 可以把布局、动效与导航放在同一个文件形态中，浏览器即可播放，也便于部署到网页。相比只返回图片，文本和交互结构仍有继续编辑的空间；相比把成品锁在在线编辑器里，下载文件为用户保留了归档和迁移能力。

它同样有明确边界：HTML 不等同于 PowerPoint 源文件，不保证进入传统 PPT 编辑流程后仍能逐元素修改。导出文档是否引用外部字体、脚本或其他网络资源，也会影响离线使用，需要在具体成品中检查。

## 当前状态与数据边界

Z-Slides 于 2026-03-11 上线。截至 2026-08-21，公开网站可访问，输入、风格选择、分阶段生成、预览和导出路径均可见。产品目前处于在线运行状态，但尚未公开跨模型成功率、生成耗时分布或大规模用户效果数据。

实际生成需要登录并配置模型服务，提交内容会发送到用户所选的模型提供方。BYOK 密钥的具体保存方式，以及导出 HTML 对外部资源的依赖范围，仍需要更完整的公开技术说明。处理内部报告、未发布数据或其他敏感材料前，应先确认所选服务和产品端的存储边界。

## 适合哪些演示任务

Z-Slides 适合已经拥有内容，需要快速形成叙事完整、具有动效并可以网页交付的演示。它尤其适用于产品介绍、课程材料、项目复盘和线上分享。需要严格遵循企业母版、多人精细协作或原生 PPTX 深度编辑的场景，仍应评估专用演示工具。

[开始制作演示](https://slides.zeroxzhang.cc)

<!-- locale: en -->

# Z-Slides

Generating one attractive slide is no longer difficult. Completing an entire presentation reliably is. A long response may stop midway, visual rules can drift between the opening and closing pages, and a failed regeneration may replace sections that were already good. What looks like a fast first draft often transfers the work into repairing missing slides, normalizing styles, and exporting again.

Z-Slides treats presentation generation as a staged production workflow. It establishes the narrative, defines a visual system, generates two to three slides per batch, and then assembles the results into an animated HTML presentation that can be previewed full-screen and downloaded. Each stage produces something inspectable, and a local failure does not require restarting from the cover.

## Long decks need process control

A presentation has to maintain two forms of consistency. The content should advance one argument, while typography, color, grid, components, and motion should follow a shared visual language. Asking one model response to produce every page means maintaining both systems across an increasingly long context.

Z-Slides separates those responsibilities. The outline determines what the deck says and in what order. The visual specification determines how it should look. A slide batch implements only a bounded section. This decomposition makes the process easier to inspect, retry, and extend, and it leaves clearer boundaries for human revision.

## Four stages, one deliverable

### Build a structured outline

Users provide a subject, source material, or the content they need to communicate. The system organizes narrative order and assigns a purpose to each slide, giving the opening, claims, evidence, transitions, and conclusion a visible place. Before page generation starts, the deck already has a reviewable skeleton.

### Set a shared visual direction

More than 12 styles are available to establish color, typography, decorative language, and overall tone. The direction is selected before individual slides are produced, allowing later batches to work from the same constraints and reducing the common pattern of polished opening pages followed by an inconsistent second half.

### Generate two to three slides per batch

Small batches control response length and lower the chance that a long output will be truncated. If one section fails, that section can be generated again while completed work remains intact. The pipeline therefore supports local recovery instead of depending on one uninterrupted model call.

### Assemble, present, and export

The completed pages are combined into a coherent document with keyboard, touch, and wheel navigation, responsive layouts, motion, and full-screen preview. The result can be downloaded as standalone HTML or exported as an image ZIP for sharing, archiving, or use in another production workflow.

## Model choice is part of the control surface

The public product exposes more than six model services and accepts custom OpenAI-compatible endpoints. Users can select a backend according to visual quality, response reliability, price, or an account they already maintain instead of being tied to one provider.

The actual result still depends on the selected model. Identical inputs can produce different narrative choices, code quality, and visual execution across providers. Z-Slides supplies the production structure and delivery format; it does not remove the underlying differences between generation models.

## A representative workflow

For a product retrospective, a user enters the project background, key decisions, and outcome material, then selects a suitable visual direction and model. The system proposes the narrative skeleton before working through the slide batches. Progress remains visible, a weak batch can be retried in isolation, and the completed deck can be reviewed full-screen before the HTML is downloaded.

History and pre-login input recovery further reduce repeated work. The important decisions remain human: which information belongs in the presentation, whether the narrative is accurate, whether the numbers are supported, and whether the final visual language suits the actual audience.

## Why the deliverable is HTML

HTML can contain layout, motion, and navigation in one portable format. It plays in a browser and can be deployed directly to the web. Unlike an image-only result, it retains editable text and interactive structure. Unlike a document trapped inside an online editor, a downloaded file can be archived and moved elsewhere.

The format has boundaries. HTML is not a native PowerPoint source file and does not guarantee element-by-element editing in a conventional PPT workflow. A generated document may also reference external fonts, scripts, or network resources, which can affect offline playback and should be checked in the specific export.

## Current status and data boundaries

Z-Slides launched on March 11, 2026. As of August 21, 2026, the public website is accessible and exposes the path from input and style selection through staged generation, preview, and export. The product is live, but it does not yet publish cross-model completion rates, generation-time distributions, or large-scale user outcome data.

Generation requires authentication and a configured model service. Submitted content is sent to the provider selected by the user. The precise storage behavior for bring-your-own API keys and the external dependencies used by exported HTML still need fuller public technical documentation. Before processing internal reports, unreleased data, or other sensitive material, users should verify the storage and processing boundaries of both the product and their chosen model provider.

## Where it fits

Z-Slides is designed for people who already have source material and need to turn it into a coherent, animated presentation for web delivery. Product narratives, course material, project retrospectives, and online talks are natural use cases. Work that requires strict corporate templates, detailed multi-user collaboration, or deep native PPTX editing should still be evaluated in a dedicated presentation tool.

[Create a presentation](https://slides.zeroxzhang.cc)
