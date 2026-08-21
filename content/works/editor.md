---
schema_version: 2
slug: editor
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: Editor
title_en: Editor
tagline: 在改写句子之前，先定位论点、读者与表达究竟在哪一层失效
tagline_en: Locate the failure in argument, audience, or language before rewriting the sentences
summary: 一个由作者决策驱动的审稿 Skill。它先确认受众与意图，再并行执行读者冷读和 AI 语言扫描，把结构、论证、表达与平台适配建议交给作者选择，最后生成保留原稿的新版本。
summary_en: An author-directed editing skill. It establishes audience and intent, runs a reader drop-off review and AI-language scan in parallel, presents structural and platform-specific recommendations for selection, and creates a new version without overwriting the original.
category: content-publishing
type: Agent Skill
type_en: Agent skill
level: standard
status: complete
featured: false
weight: 250
facts_as_of: 2026-08-21
tags:
  - 审稿
  - 写作质量
  - 多智能体
tags_en:
  - Editing
  - Writing quality
  - Multi-agent workflow
stack:
  - Markdown
  - Agent Workflow
links:
  - label: 安装 Editor
    label_en: Install Editor
    type: repository
    url: https://github.com/ZeroxZhang/editor
    primary: true
related:
  - huashu-bookwriter
  - really
---

<!-- locale: zh-CN -->

# Editor

“帮我润色”通常把注意力拉到句子表面。用词变得顺滑，原稿里的核心问题却可能保持不变：标题没有承诺清晰价值，开头缺少继续阅读的理由，论点与证据脱节，或者作者想说的话被常见的 AI 表达覆盖。

Editor 是一套在 Claude Code 等 Agent 环境中运行的审稿流程。它先确认作者意图，再通过并行冷读与语言扫描定位读者流失点，最后把修改选择交回作者。原稿不会被覆盖；被接受的建议进入 v2、v3 等后续版本。

## 审稿从作者与读者的约束开始

流程首先选择或建立 persona，记录目标读者、表达语气、常用词与禁用表达。随后依次追问文章让谁受益、标题制造了什么预期差、开头承载什么具体场景。这些问题用于确定修改边界，避免 Agent 在不理解写作目的时自行重构观点。

如果受众、平台或不可牺牲的表达仍不清楚，流程会继续询问。作者可以保留有意为之的不规则句式、个人语气或立场，不需要为了统一而接受全部建议。

## 两个并行视角减少单一审稿偏差

一个冷读 Agent 以目标读者身份通读，标记三个最可能划走的位置，并说明信息、节奏或可信度上的原因。另一个 Agent 扫描绝对化句式、破折号滥用、过度比喻、重复结构和空泛抽象词等常见 AI 痕迹。

两组结果与结构、论证、语言及平台适配检查汇总后，作者可以逐条接受、跳过或要求重写。修改发生在判断之后，避免一次自动重写同时改变事实、逻辑和语气，却无法解释具体动了什么。

## 一次完整使用

当前入口采用“/editor 文件路径”的方式接收草稿。用户指定平台或目标读者，回答关于意图的关键问题，阅读并行审稿结果，再选择要进入下一版的修改。系统计算新的版本路径并写出派生文件，原始稿件保留用于比较和回退。

这种流程适合文章、社交媒体长文和需要明确读者反应的内容。它关注标题、钩子、结构、表达模式与平台语境，不承担事实核查、语法工具或发布系统的全部职责。

## 当前实现与限制

项目核心由 SKILL.md、persona、平台规则和多 Agent 调度约定组成，没有独立可执行程序。它依赖宿主环境具备文件读写和并行子 Agent 能力。截至 2026-08-21，仓库提供完整 spec 与 plan，但没有测试、CI 或 Release。

Twitter、微信、小红书等四个平台参考文件已经建立结构，其中多项“典型反例”和渠道经验仍等待补充。输出质量也取决于 persona 是否具体、原稿信息是否充分，以及作者有没有对建议作出判断。Editor 不会替作者证明事实，也无法用固定规则保证文章表现。

## 适合谁

Editor 适合希望保留作者权、愿意参与取舍，又需要一个稳定审稿顺序的人。若目标只是自动改写一段文字，或需要多人在线批注、校对和发布管理，应选择更直接的编辑工具。

[安装 Editor](https://github.com/ZeroxZhang/editor)

<!-- locale: en -->

# Editor

“Polish this” directs attention to the surface of a draft. The prose may become smoother while the underlying problem remains: the title makes no clear promise, the opening provides no reason to continue, the argument is detached from its evidence, or the author’s voice has been replaced by familiar AI phrasing.

Editor is a review workflow for agent environments such as Claude Code. It establishes authorial intent, uses parallel cold reading and language analysis to locate drop-off points, and returns modification choices to the author. The original file is preserved; accepted changes are written into subsequent v2, v3, and later versions.

## Begin with author and reader constraints

The flow first selects or creates a persona containing the target reader, intended tone, preferred expressions, and language to avoid. It then asks who should benefit from the piece, what expectation the title disrupts, and what concrete scene the opening establishes. These questions define the editing boundary before an agent begins rearranging the work.

When audience, platform, or non-negotiable intent remains unclear, the workflow continues asking. Deliberate irregularities, a personal cadence, and a strong position can be retained. The author is not required to accept uniformity as an editing goal.

## Two parallel perspectives

A cold-reading agent reads as the intended audience and identifies the three points most likely to lose attention, explaining the informational, pacing, or credibility issue at each point. A second agent scans for absolute constructions, excessive em dashes, overextended metaphors, repeated patterns, and abstract filler associated with generic AI prose.

The findings are combined with structural, argumentative, linguistic, and platform-fit review. The author can accept, skip, or request a rewrite for each recommendation. Rewriting therefore follows a visible decision instead of changing facts, logic, and voice in one opaque pass.

## A complete editing run

The current entry point accepts a file through the “/editor file-path” command. The user identifies a platform or audience, answers the intent questions, reviews both parallel reports, and selects the changes for the next version. The system derives a new versioned path and writes the file while retaining the source for comparison or recovery.

The method fits articles, long-form social posts, and work where reader response needs to be examined explicitly. It focuses on titles, hooks, structure, repeated language, and platform context. It is not a complete fact-checker, grammar suite, or publishing system.

## Implementation and limitations

The project is centered on SKILL.md, personas, platform references, and a multi-agent coordination protocol. It has no standalone executable and depends on a host with file operations and parallel sub-agent support. As of August 21, 2026, the repository includes a detailed specification and plan but no tests, CI, or release.

Reference structures exist for four platforms including Twitter, WeChat, and Xiaohongshu, while several sections for channel patterns and counterexamples still await real editorial material. Output quality also depends on the specificity of the persona, the completeness of the draft, and the author’s decisions. Editor cannot prove claims or guarantee content performance through fixed rules.

## Who it is for

Editor fits writers who want to retain authorship, participate in tradeoffs, and use a consistent review sequence. People who only need automatic paraphrasing—or a collaborative environment for comments, proofreading, and publication—will need a different tool.

[Install Editor](https://github.com/ZeroxZhang/editor)
