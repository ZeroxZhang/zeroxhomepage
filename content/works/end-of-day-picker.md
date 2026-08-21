---
schema_version: 2
slug: end-of-day-picker
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: End-of-day Picker
title_en: End-of-day Picker
tagline: 把尾盘筛选写成一条包含数据校验、市场状态、熔断与退出规则的研究流程
tagline_en: An end-of-day research pipeline with data checks, market regimes, circuit breakers, and exit rules
summary: 实验性的 A 股尾盘七层筛选系统，从全市场逐步缩小候选，并把数据冗余、动态阈值、环境分类、暂停条件和次日退出纳入同一个研究框架。
summary_en: An experimental seven-stage screening system for China A-shares. It narrows the full market into a small candidate set while keeping data redundancy, adaptive thresholds, market regimes, stop conditions, and next-day exits inside one research framework.
category: quant-research
type: Python 量化研究系统
type_en: Python quantitative research system
level: standard
status: experiment
featured: false
weight: 140
facts_as_of: 2026-08-21
tags:
  - A 股
  - 量化筛选
  - 风险控制
tags_en:
  - China A-shares
  - Quantitative screening
  - Risk controls
stack:
  - Python
  - AKShare
  - pandas
  - NumPy
links:
  - label: 查看筛选系统
    label_en: View the screening system
    type: repository
    url: https://github.com/ZeroxZhang/end-of-day-picker
    primary: true
related:
  - a-share-tailpicker
  - invest-signal-kit
  - lingmou
---

<!-- locale: zh-CN -->

# End-of-day Picker

尾盘信号容易被当日涨幅放大。一只股票临近收盘走强，可能代表趋势延续，也可能来自流动性、短时情绪或数据异常。只按排名挑出“最强的几只”，无法回答当天是否适合开仓、入选依据是否可靠，以及判断出错后如何退出。

End-of-day Picker 是一套实验性的 A 股尾盘研究系统。它从约五千只标的开始，经过七层规则逐步缩小范围，最终最多保留五只候选。筛选、拒绝、暂停和次日退出被放在同一条流程中，使每次结果都能回到数据和规则复盘。

## 七层漏斗解决的是决策顺序

系统先处理全市场数据的可用性，再进入基础条件、个股相对特征、市场环境与候选确认等阶段。每一层只承担有限职责，报告呈现各层筛选结果、排除统计与最终候选依据。最终输出因此不只有一个排名，还保留筛选过程和市场说明。

部分阈值依据个股近 60 日分布计算百分位，减少用同一绝对标准衡量不同波动特征的偏差。市场状态被划分为牛市、震荡或熊市，并据此调整筛选强度；大跌、跌停潮或连续亏损等条件出现时，熔断规则允许系统停止给出候选。

## 数据异常不能自动变成交易信号

免费市场数据存在延迟、字段变化和短时不可用。实现中配置 AKShare、东方财富、新浪与腾讯等来源，按优先级承担主备与 fallback；候选判断另有交叉验证规则。数据冗余提高的是研究连续性，不代表不同来源已经完成同字段一致性比对；进入真实决策前仍要检查时间戳、字段口径和异常值。

## 进入规则从一开始就连接退出计划

候选还要经过二次验证，并附带移动止盈、梯度退出和强制平仓时间表。这样可以在信号出现时同步记录风险边界，避免第二天再临时决定如何处理亏损或冲高回落。

一次典型运行会先检查当天数据与市场状态，再执行七层过滤，输出候选、各层排除统计和风险提示。次日根据预先写下的退出规则复盘，而不是只统计是否上涨。系统保留的是可复查的筛选结果，不是逐标的完整审计日志。

## 当前证据与已知缺口

公开代码已经覆盖全市场数据、七层筛选、市场分类、数据冗余、熔断与退出矩阵。截至 2026-08-21，live 板块映射仍为空，部分特殊 fallback 别名（包括新闻、扫描和现货回退）尚未注册；仓库没有公开测试、CI、系统回测或实盘业绩。这些缺口意味着当前版本更适合阅读、修改规则和开展方法实验，不能直接视为生产交易系统。

历史数据中的可用信号也不等于未来可成交结果。滑点、涨跌停、流动性、数据延迟和突发事件都可能改变执行。项目不连接券商，不构成投资建议，也不提供收益承诺。

## 适合谁

End-of-day Picker 适合希望研究筛选顺序、拒绝条件和风险控制如何共同工作的开发者或个人研究者。若目标是获得一份可直接跟单的股票清单，当前证据和工程成熟度都不足以支持这一用途。

[查看筛选系统](https://github.com/ZeroxZhang/end-of-day-picker)

<!-- locale: en -->

# End-of-day Picker

Late-session price strength is easy to overinterpret. A stock rising near the close may reflect persistent demand, but it may also be driven by temporary liquidity, short-lived sentiment, or a data anomaly. A ranking of the “strongest” names cannot by itself explain whether the market is suitable for entry, whether the underlying data is dependable, or how an incorrect decision should be exited.

End-of-day Picker is an experimental research system for China A-shares. It starts with roughly 5,000 securities and applies a seven-stage funnel to retain no more than five candidates. Selection, rejection, suspension, and next-day exit logic are kept in one workflow so that each result can be reviewed against its data and rules.

## The funnel establishes decision order

The system handles market-wide data availability before moving through eligibility rules, relative stock characteristics, market conditions, and candidate confirmation. Each stage has a bounded responsibility. The report presents stage-level results, exclusion statistics, and the basis for final candidates. It is therefore more than a ranking, while stopping short of a complete per-security audit log.

Some thresholds are calculated from a security’s percentile over the previous 60 trading days, reducing the distortion caused by applying one absolute threshold to instruments with different volatility profiles. The broader market is classified as bullish, range-bound, or bearish, and screening strength changes with that regime. Conditions such as a sharp market decline, a wave of limit-down moves, or consecutive strategy losses can trigger a circuit breaker that returns no candidates.

## Data failures are not signals

Free market feeds can be delayed, change field definitions, or become temporarily unavailable. The implementation configures sources including AKShare, Eastmoney, Sina, and Tencent in priority-based primary and fallback roles; candidate evaluation has separate cross-checking rules. Redundancy supports continuity, but it is not a field-by-field consistency check across providers. Timestamps, field semantics, and outliers still require inspection before any real decision.

## Entry and exit belong to the same record

Candidates proceed through a second validation step and carry plans for trailing profit protection, staged exits, and a forced liquidation timetable. Risk boundaries are written when a signal is created instead of being improvised the next day after a loss or reversal.

A representative run checks data health and the market regime, applies the seven stages, and produces candidates together with stage-level exclusions and risk notes. The following day is reviewed against the predeclared exit logic, not only against whether the price rose. The output supports review without claiming a complete per-security decision trace.

## Evidence and current gaps

The public code covers market-wide collection, seven-stage screening, regime classification, redundant sources, circuit breakers, and an exit matrix. As of August 21, 2026, the live sector mapping is empty and some special fallback aliases—including news, scan, and spot fallbacks—are not registered. The repository publishes no automated tests, CI, systematic backtest, or live performance record. The current version is appropriate for studying and modifying a method, not for operating as a production trading system.

Signals observed in historical data do not guarantee executable future results. Slippage, price limits, liquidity, delayed feeds, and unexpected events can all change an outcome. The project does not connect to a broker or promise returns. This is not investment advice.

## Who it is for

End-of-day Picker is for developers and individual researchers examining how screening order, rejection rules, and risk controls can work together. It does not have the evidence or operational maturity required to serve as a list of trades to follow.

[View the screening system](https://github.com/ZeroxZhang/end-of-day-picker)
