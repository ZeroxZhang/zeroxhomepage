---
schema_version: 2
slug: stock-fund-analyzer
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: Stock & Fund Analyzer
title_en: Stock & Fund Analyzer
tagline: 把估值、质量、周期与趋势放进同一份股票和基金研究备忘录
tagline_en: Bring valuation, quality, cycles, and trends into one stock or fund research memo
summary: 融合价值投资与技术分析的 Agent Skill，配合 yfinance 与 AKShare 参考脚本，组织股票和基金的数据收集、分析框架、公允价值区间与研究标签。
summary_en: An agent skill combining fundamental and technical analysis, with yfinance and AKShare reference scripts for organizing data collection, analytical frameworks, fair-value ranges, and research labels.
category: quant-research
type: Agent Skill
type_en: Agent skill
level: standard
status: complete
featured: false
weight: 170
facts_as_of: 2026-08-21
tags:
  - 股票研究
  - 基金研究
  - 估值
tags_en:
  - Equity research
  - Fund research
  - Valuation
stack:
  - Python
  - yfinance
  - AKShare
  - pandas
  - NumPy
links:
  - label: 安装研究 Skill
    label_en: Install the research skill
    type: repository
    url: https://github.com/ZeroxZhang/stock-fund-analyzer
    primary: true
related:
  - etf-analyzer
  - lingmou
---

<!-- locale: zh-CN -->

# Stock & Fund Analyzer

同一只标的可以同时出现“估值偏低”和“趋势向下”。如果研究报告只给出一个综合分数，读者看不到两种判断依赖的数据、时间尺度和失效条件，也无法判断分歧是否已经被充分处理。

Stock & Fund Analyzer 是一套面向 Agent 的股票与基金研究协议。它把估值、企业质量、行业周期、价格趋势与成交行为组织进结构化备忘录。仓库定义了分析框架与输出形式；事实、估算和解释是否被严格分开，仍取决于执行时的数据校验与提示约束。

## 多种框架进入同一份报告

价值部分可使用 Graham Number、DCF、护城河与周期分析，观察价格和内在价值假设、经营质量及行业位置。技术部分引入道氏理论、艾略特波浪和 CAN SLIM 等视角，描述趋势、量能与市场行为。仓库把这些方法放在同一工作流中，但没有强制实现一套框架冲突处理协议；使用时应显式记录分歧，避免把结果直接平均。

最终输出可包含公允价值区间和 Buy / Hold / Sell 研究标签。为了使标签可复查，使用者应另外记录数据日期、关键假设、风险因素与失效条件；这些属于必要的研究纪律，不是当前仓库已经自动保证的结果。

## Skill 与参考脚本各自承担什么

Python 参考脚本演示股票、ETF 与 A 股数据获取，以及部分指标计算；Skill 定义可选框架、分析顺序与备忘录结构。数据来源包括 yfinance 与 AKShare 等公开接口，其字段、更新频率和资产覆盖存在差异，进入分析前需要校验。

一种更稳妥的使用方式是：先确认标的与时间范围，收集并核对基础数据，再分别完成基本面和技术面分析；随后由使用者比较结论，列出共同指向、主要冲突和需要补证的部分。当前 Skill 提供框架起点，但不会自动保证每次执行都遵守这套额外纪律。

## 当前实现仍是研究起点

截至 2026-08-21，公开仓库的 Skill 已定义数据收集、价值分析、技术分析与备忘录工作流。代码和参考文件规模较小，暂无测试、CI、Release 或完整公开样例。ETF 处理还存在两个估值字段映射到同一 priceToBook 值的问题，这会影响数据语义，使用前必须修正或独立核对。

项目没有经过公开的历史策略验证，也不自动管理组合或执行交易。任何研究标签都受数据质量、模型假设、市场变化和 Agent 解释影响，不构成投资建议。重要结论应回到公司公告、基金文件与可靠行情源交叉确认。

## 适合什么研究任务

它适合希望借助 Agent 组织多角度证据，并愿意审查输入和假设的个人研究者。需要成熟估值平台、合规投顾、可审计生产数据管线或直接交易接口的场景，超出当前项目范围。

[安装研究 Skill](https://github.com/ZeroxZhang/stock-fund-analyzer)

<!-- locale: en -->

# Stock & Fund Analyzer

The same security can appear undervalued while remaining in a persistent downtrend. If a research report compresses both observations into one composite score, the reader loses the data, time horizons, and invalidation conditions behind each view. It also becomes difficult to tell whether the disagreement was examined or simply averaged away.

Stock & Fund Analyzer is an agent-oriented research protocol for stocks and funds. It organizes valuation, business quality, industry cycles, price trends, and trading behavior into a structured memo. The repository defines frameworks and an output format; strict separation of observed facts, estimates, and interpretation still depends on validation and prompting during each run.

## Multiple frameworks in one report

The fundamental side can apply Graham Number, discounted cash flow, moat, and cycle analysis to examine assumptions about intrinsic value, operating quality, and industry position. Technical perspectives include Dow Theory, Elliott Wave, and CAN SLIM for describing trend, volume, and market behavior. The repository places these methods in one workflow but does not enforce a conflict-resolution protocol. Users should record disagreements explicitly instead of averaging them into apparent consensus.

A final document may include a fair-value range and a Buy, Hold, or Sell research label. For the label to remain reviewable, the user should also record the data date, central assumptions, risk factors, and invalidation conditions. That is recommended research discipline rather than an output guarantee enforced by the current repository.

## The roles of the skill and reference scripts

Python reference scripts demonstrate data collection for stocks, ETFs, and China A-shares, together with selected indicator calculations. The skill defines available frameworks, analysis order, and a memo structure. Sources include public interfaces such as yfinance and AKShare, whose fields, update schedules, and asset coverage differ and require validation before use.

A safer operating pattern is to define the security and time horizon, validate the basic data, and perform fundamental and technical analysis separately. The user can then compare findings, identify shared signals, disagreements, and missing evidence. The skill provides a starting framework but does not automatically guarantee that every run follows these additional disciplines.

## The current implementation is a starting point

As of August 21, 2026, the public repository’s skill defines a workflow for data collection, value analysis, technical analysis, and memo preparation. Its code and reference material remain small, with no tests, CI, release, or complete public example. The ETF path also maps two valuation fields to the same priceToBook value. That issue can change the meaning of the analysis and must be fixed or independently checked before use.

The project has no published historical strategy validation and does not manage portfolios or execute trades. Every label depends on data quality, model assumptions, market changes, and agent interpretation. It is not investment advice. Material conclusions should be cross-checked against company filings, fund documents, and dependable market data.

## Intended research use

The skill fits individual researchers who want an agent to organize evidence from several perspectives and are prepared to inspect its inputs and assumptions. A mature valuation platform, regulated advice, a production-grade audited data pipeline, or direct execution is outside its current scope.

[Install the research skill](https://github.com/ZeroxZhang/stock-fund-analyzer)
