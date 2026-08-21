---
schema_version: 2
slug: really
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: Really
title_en: Really
tagline: 先拆开症状、结构与假设，再决定这个问题该怎么问
tagline_en: Examine the assumptions beneath a difficult question before committing to an answer
summary: 一个跨学科问题重构 Skill，用十种学科透镜比较成因与冲突解释，把开放难题改写成更有行动价值的问题。
summary_en: A cross-disciplinary inquiry skill that compares ten analytical lenses, surfaces conflicting explanations, and reframes open-ended problems into more useful questions.
category: learning
type: Agent Skill
type_en: Agent skill
level: standard
status: maintained
featured: false
weight: 120
facts_as_of: 2026-08-21
tags:
  - 问题诊断
  - 跨学科
  - 决策
tags_en:
  - Problem framing
  - Cross-disciplinary inquiry
  - Decision making
stack:
  - Markdown
  - Prompt Engineering
links:
  - label: 安装 Really
    label_en: Install Really
    type: repository
    url: https://github.com/ZeroxZhang/really
    primary: true
related:
  - editor
  - indian-workplace-methodology
---

<!-- locale: zh-CN -->

# Really

“怎么提高转化？”“要不要离职？”“团队为什么总在同一个地方争论？”这类问题往往同时包含事实、情绪、身份、资源与制度约束。若 AI 直接给建议，答案很容易只优化一句表面提问，把隐含前提和相互冲突的原因留在原处。

Really 是一个跨学科深度询问 Agent Skill。它先把输入拆成现象、结构和假设，再从多个学科角度寻找能够解释更多现象的成因，最后重写问题并生成一份完整分析报告。它服务于开放式思考与决策准备，而非替用户作出决定。

## 十种透镜，各自负责看见不同约束

心理学、社会学、哲学、营销学和管理学是流程中的五个核心视角，分别检查动机与防御、群体与制度、概念与价值前提、需求与定位、激励与系统结构。涉及价格、复杂系统、文化身份、高风险选择或生理状态时，经济学、复杂性科学、人类学与符号学、决策科学、认知神经科学按条件加入。

仓库中的参考资料整理了 10 个学科、40 多个框架，每个框架均包含核心命题、作用机制、诊断操作、适用边界和交叉视角。流程不会要求不同学科投票得出平均结论；当两个解释相互冲突时，冲突会成为下一轮提问的线索。

## 六个阶段，把分析停在需要选择的地方

一次使用从简洁描述情境开始。Really 先确认输入，再做表层审计；核心五镜批量运行，扩展透镜依据语境触发；随后合成主要成因、提升观察层级并交付完整报告。六个阶段只在关键决策点暂停，并用选择题让用户确认方向，减少连续开放追问造成的疲劳。

典型交付物包括：被区分开的症状与约束、各学科的解释、解释之间的支持或张力、一个重构后的问题，以及值得继续收集的证据。它适合创业与产品判断、职业选择、合作冲突和反复出现的系统性卡点，也适合在进入方案讨论前做一次问题审查。

## 证据、适用对象与限制

截至 2026-08-21，公开仓库包含 Skill 主流程、分析报告模板和完整框架参考，采用 Apache-2.0 许可证，GitHub 记录为 3 Stars。公开证据能证明方法结构与材料规模，不能证明它在所有场景都能找到单一根因，也没有公开用户研究或效果数据。

输出质量取决于输入情境、模型能力与框架是否适配。这里的“诊断”指问题分析方法，不构成心理治疗、医疗建议、法律意见或组织咨询。高风险情境仍应由相应专业人士结合可验证事实处理；个人也需要保留对价值取舍和最终行动的责任。

[安装 Really](https://github.com/ZeroxZhang/really)

<!-- locale: en -->

# Really

“How do we improve conversion?” “Should I leave my job?” “Why does our team keep having the same argument?” Questions like these often combine facts, emotion, identity, incentives, and institutional constraints. When an AI responds with advice immediately, it can optimize the wording of the prompt while leaving its assumptions untouched.

Really is a cross-disciplinary inquiry skill for examining the shape of an open-ended problem before choosing a solution. It separates symptoms, structures, and assumptions, compares explanations from several disciplines, and then reframes the question into something more useful for action. The output supports thinking and decision preparation; it does not make the decision for the user.

## Ten lenses with different jobs

Five disciplines form the core pass. Psychology looks at motivation, defenses, and emotional undercurrents. Sociology examines roles, reference groups, status, and institutions. Philosophy checks categories, evidence, and value assumptions. Marketing tests demand, positioning, and perceived exchange. Management focuses on incentives, feedback loops, constraints, and organizational capability.

Five additional lenses are triggered when the context calls for them: economics for prices and resource allocation, complexity science for nonlinear systems and uncertainty, anthropology and semiotics for culture and identity, decision science for consequential choices under incomplete information, and cognitive neuroscience for questions involving regulation, rumination, or physiological state.

The repository’s reference guide covers 10 disciplines and more than 40 frameworks. Each framework is described through its core proposition, causal mechanism, diagnostic operation, boundaries, and connections or tensions with other perspectives. The method does not average conflicting lenses into a bland consensus. A disagreement between explanations becomes evidence about what the next question should examine.

## A six-phase inquiry with deliberate pauses

A run begins with a concise account of the situation and a confirmation of scope. Really then audits the surface question, runs the five core lenses as a batch, adds conditional lenses, synthesizes likely causes, raises the level of analysis, and produces a complete report. It pauses at selected decision points and uses multiple-choice prompts to confirm direction, rather than asking the user to answer an open question after every framework.

The deliverable can include separated symptoms and constraints, lens-specific explanations, agreements and conflicts among them, a reframed question, and evidence worth collecting next. The method is relevant to startup and product decisions, career choices, collaboration problems, positioning work, and recurring systemic bottlenecks. It can also serve as a structured review before a team starts discussing solutions.

## What is established, and what is not

As of August 21, 2026, the public repository included the main skill workflow, its report structure, and the full framework reference. It used the Apache-2.0 license and showed 3 GitHub stars. These materials verify the design and documented scope of the method. They do not establish that every situation has one generative cause, and the repository does not publish user research or outcome measurements.

Results depend on the context supplied, the model running the skill, and whether the chosen frameworks fit the situation. “Diagnosis” here describes a method of inquiry. It is not psychotherapy, medical care, legal advice, or professional organizational consulting. High-stakes cases require qualified practitioners and independently verified evidence, while values and final choices remain with the person or team using the analysis.

[Install Really](https://github.com/ZeroxZhang/really)
