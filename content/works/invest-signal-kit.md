---
schema_version: 2
slug: invest-signal-kit
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: Invest Signal Kit
title_en: Invest Signal Kit
tagline: 用一份本地检查单，在买入前记录理由、仓位与风险边界
tagline_en: A local checklist for recording rationale, position size, and risk boundaries before a trade
summary: 面向 A 股与国内场内 ETF 个人决策的本地检查工具，提供买前检查和持仓体检两条流程，帮助暴露单笔仓位、单一持仓集中风险、信息来源与持有理由的变化。
summary_en: A local decision-checking tool for China A-shares and domestic exchange-traded ETFs. Pre-trade and holding-review workflows expose position sizing, single-position concentration, source quality, and changes in the holding rationale.
category: quant-research
type: Python + Web 工具
type_en: Python and web utility
level: standard
status: complete
featured: false
weight: 160
facts_as_of: 2026-08-21
tags:
  - 风险检查
  - 隐私优先
  - A 股
tags_en:
  - Risk checks
  - Privacy-first
  - China A-shares
stack:
  - Python 标准库
  - HTML
  - localStorage
links:
  - label: 获取检查工具
    label_en: Get the checklist tool
    type: repository
    url: https://github.com/ZeroxZhang/invest-signal-kit
    primary: true
related:
  - end-of-day-picker
  - a-share-tailpicker
  - lingmou
---

<!-- locale: zh-CN -->

# Invest Signal Kit

不少交易错误发生在分析开始之前：买入理由只存在于脑中，仓位没有和风险承受能力对应，信息来源未经核对，风险线与放弃条件则等到价格下跌后才临时决定。市场工具通常继续增加行情与指标，却很少要求用户把这些基础判断写清楚。

Invest Signal Kit 是一个在本地运行的 A 股与国内场内 ETF 决策检查工具。它提供买前检查与持仓体检两条路径，通过结构化问题记录行动依据，并在下单或继续持有之前指出可见的风险缺口。工具不产生推荐标的，也不尝试预测价格。

## 买前检查：把冲动转换成可阅读的记录

买前流程要求填写标的、计划金额、可承受风险、入场理由和信息来源。系统据此检查单笔仓位占比、单一持仓集中风险、理由完整性和风险边界。提示的用途是迫使决策者重新阅读自己的判断，而非用另一个综合分数替代判断。

一次检查可能得到“继续补充来源”“降低金额”或“先不行动”等结论。选择仍由用户作出；历史最多保存最近 20 条检查的结论、风险线、下一步与关键原因，而不是完整表单和全部原始理由。

## 持仓体检：检查最初理由是否仍成立

持仓流程关注当前亏损、单一持仓占比、预设风险线和继续持有的理由。用户在同一次体检中分别填写原始理由与当前理由，系统据此提示理由漂移；它不会自动从历史记录恢复并比对完整原始表单。

买前与持仓共享同一套原则——记录可核对的信息，暴露未回答的问题，再由人作出决策。检查单不能消除损失，但可以减少理由漂移和无意中扩大风险。

## 本地运行与隐私边界

前端历史保存在浏览器 localStorage，本地 Python 服务仅使用标准库运行。默认路径不要求远程账户，也不需要把持仓数据上传到项目方服务器。用户仍需自行保护设备、浏览器资料和备份；清除站点数据可能同时删除本地历史。

启动后选择买前检查或持仓体检，填写真实数据，阅读风险提示，再决定继续、调整或放弃。整个流程刻意保持短小，使检查能够发生在行动前，而不是变成一份无人愿意完成的长报告。

## 已完成范围与证据

项目已经覆盖两条核心路径、本地历史和风险提示，最新公开 GitHub Actions 核验成功。仓库还包含结构化验证、组合、回测和 Monte Carlo 等进阶研究内容；这些实验不会改变默认产品的定位，也不构成预测效果证明。

Invest Signal Kit 不接入券商，不自动执行交易，不评估个人全部财务状况，也不提供投资建议。输出取决于用户输入，遗漏或粉饰理由会直接降低检查价值。市场风险、滑点和突发事件仍由使用者承担。

## 适合的用户

它适合已经独立作出投资决策，希望留下可复盘记录并在行动前增加一道约束的个人研究者。需要实时行情终端、自动组合管理或个性化资产配置建议的用户，应使用相应的专业服务。

[获取检查工具](https://github.com/ZeroxZhang/invest-signal-kit)

<!-- locale: en -->

# Invest Signal Kit

Many trading errors begin before analysis. The rationale exists only in memory, position size is disconnected from risk capacity, sources have not been checked, and risk boundaries or abandonment conditions are invented only after the price falls. Market products tend to add more charts and indicators while leaving these basic decisions undocumented.

Invest Signal Kit is a local decision checklist for China A-shares and domestic exchange-traded ETFs. It provides two workflows—a pre-trade check and a holding review—to record the basis for an action and expose visible risk gaps before buying or continuing to hold. It does not recommend securities or attempt to predict prices.

## Pre-trade check: make the impulse readable

The pre-trade flow asks for the security, planned amount, acceptable risk, entry rationale, and information sources. It checks the size of one position, single-holding concentration risk, the completeness of the rationale, and declared risk boundaries. A prompt is intended to make the decision-maker reread their own case, not replace it with another composite score.

A check may lead to gathering another source, reducing the amount, or taking no action. The user retains the decision. Local history keeps up to 20 recent entries containing the conclusion, risk line, next step, and as many as three key reasons; it does not preserve the complete original form or rationale.

## Holding review: test whether the original case still holds

The holding workflow examines current losses, the size of one holding, the stated risk line, and the reason for continuing to hold. The user enters the original and current rationales in the same review, allowing the tool to flag possible drift. It does not automatically recover and compare a complete earlier form from history.

Both workflows follow the same principle: record inspectable information, reveal unanswered questions, and leave the decision to the person. A checklist cannot eliminate losses, but it can make rationale drift and unintended risk expansion easier to see.

## Local operation and privacy boundaries

History is stored in browser localStorage, and the local Python service uses only the standard library. The default path requires no remote account and does not send portfolio entries to a server operated by the project. Users remain responsible for device security, browser profiles, and backups. Clearing site data may also remove the local history.

After launching the tool, users choose a pre-trade or holding review, enter real information, read the resulting risk prompts, and decide whether to continue, adjust, or stop. The flow remains intentionally short enough to be completed before an action rather than becoming a report that is consistently skipped.

## Completed scope and evidence

The project covers both core workflows, local history, and risk prompts. Its latest public GitHub Actions run was successful. The repository also includes advanced experiments involving structured validation, portfolios, backtesting, and Monte Carlo methods. Those research components do not change the default product’s checking role and are not evidence of predictive performance.

Invest Signal Kit does not connect to a broker, execute trades, or evaluate a user’s complete financial circumstances. This is not investment advice. The output depends on honest and complete input; omitted or embellished rationale directly reduces its usefulness. Market risk, slippage, and unexpected events remain with the user.

## Who it is for

The tool fits individual researchers who already make their own investment decisions and want a reviewable record plus a small constraint before acting. Users who need a real-time market terminal, automated portfolio management, or personalized allocation advice should use an appropriate professional service.

[Get the checklist tool](https://github.com/ZeroxZhang/invest-signal-kit)
