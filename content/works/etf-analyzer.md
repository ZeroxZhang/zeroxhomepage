---
schema_version: 2
slug: etf-analyzer
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: ETF Analyzer
title_en: ETF Analyzer
tagline: 别用一条近期收益曲线，决定你是否真的看懂一只 ETF
tagline_en: Evaluate an ETF through its thesis, product structure, and entry conditions—not its latest return chart
summary: 面向 ETF 尽调的 Agent Skill，用主题、产品、时点三张评分卡拆开投资逻辑、产品风险与行动条件。
summary_en: An agent skill for ETF due diligence that separates investment thesis, fund-level risk, and entry conditions into three evidence-aware scorecards.
category: quant-research
type: Agent Skill
type_en: Agent skill
level: compact
status: complete
featured: false
weight: 180
facts_as_of: 2026-08-21
tags:
  - ETF
  - 投资研究
  - Agent Skill
tags_en:
  - ETF
  - Investment research
  - Agent skill
stack:
  - Python
links:
  - label: 安装 ETF Analyzer
    label_en: Install ETF Analyzer
    type: repository
    url: https://github.com/ZeroxZhang/etf-analyzer
    primary: true
related:
  - stock-fund-analyzer
  - invest-signal-kit
---

<!-- locale: zh-CN -->

# ETF Analyzer

名称相似的 ETF 可能跟踪不同指数，采用不同复制方式，也可能暴露于截然不同的行业集中度、汇率与流动性风险。近期涨幅只能描述过去，无法回答“买到的是什么”以及“现在是否适合行动”。ETF Analyzer 是一套面向尽调的 Agent Skill，把这两个问题拆开处理。

## 三张评分卡，避免把研究压成一个分数

主题卡检查投资逻辑、持续条件与证据质量；产品卡比较指数、持仓、费率、规模、流动性和跟踪方式；时点卡观察趋势、波动与入场条件。基础信息、行情、持仓、指数和新闻由不同来源分工采集，结论同时标记证据等级与数据质量。三张卡均越过门槛时，工具才会形成行动候选。

## 从标的到可复查结论

提供 ETF 或主题后，Agent 先确认研究范围，再收集证据、运行评分与技术检查，最后输出适用场景、主要风险和仍需人工确认的问题。MA、MACD、RSI、KDJ、布林带、ATR、OBV、MFI 与策略回测脚本服务于时点研究；报告会提示数据延迟、成本、前视偏差和过拟合风险。

## 公开证据与安装差异

截至 2026-08-21，公开仓库记录 2 Stars，并包含 Skill、scripts 与 references；暂无 README、LICENSE、测试、CI、Release 或公开分析样例。本机安装副本缺少 Skill 引用的 scripts 与 references，无法据此完整运行，安装和审阅应以公开仓库为准。

## 研究辅助的边界

评分卡帮助组织证据，不保证数据完整、模型有效或未来收益。任何候选仍需核对基金公告、指数规则、成交条件与个人风险承受能力；本工具不构成投资建议。

[安装 ETF Analyzer](https://github.com/ZeroxZhang/etf-analyzer)

<!-- locale: en -->

# ETF Analyzer

Two ETFs with similar names can track different indexes, use different replication methods, and carry very different concentration, currency, and liquidity risks. A recent return chart shows what happened; it does not establish what the investor owns or whether current conditions justify an action.

ETF Analyzer is an agent skill for structured ETF due diligence. It keeps the investment case, the specific fund, and market timing separate so that one attractive signal cannot hide weaknesses elsewhere.

## Three scorecards, three different questions

The theme scorecard examines the underlying thesis, the conditions required for it to persist, and the quality of supporting evidence. The product scorecard compares index construction, holdings, costs, size, liquidity, and replication choices. The timing scorecard studies trend, volatility, and potential entry conditions. A candidate advances only when all three clear their respective thresholds.

Market data, fund information, holdings, index documentation, and news are gathered as distinct evidence streams. The output records evidence strength and data quality rather than flattening every input into a single unexplained score.

## A reviewable research path

The user provides an ETF or theme and confirms the research scope. The agent then gathers sources, runs the scorecards and technical checks, and produces a report covering fit, risks, and unresolved questions. MA, MACD, RSI, KDJ, Bollinger Bands, ATR, OBV, MFI, and backtesting scripts support timing analysis. The workflow also calls out latency, transaction costs, look-ahead bias, and overfitting.

## What is publicly verifiable

As of August 21, 2026, the public repository had 2 stars and exposed the skill, scripts, and reference material. It did not include a README, license, test suite, CI configuration, release, or public sample report. The locally installed copy reviewed for this portfolio was incomplete: the scripts and references named by the skill were missing. The public repository should therefore be treated as the installation source.

## Decision support, with explicit limits

The scorecards organize research; they do not guarantee complete data, valid models, suitable execution, or future returns. Any candidate still requires verification against fund disclosures, index rules, current market conditions, and the investor's own risk constraints. ETF Analyzer is a research aid, not investment advice.

[Install ETF Analyzer](https://github.com/ZeroxZhang/etf-analyzer)
