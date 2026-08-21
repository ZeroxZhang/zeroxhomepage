---
schema_version: 2
slug: a-share-tailpicker
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: A-share Tailpicker
title_en: A-share Tailpicker
tagline: 在 14:20 建立预选，再用 14:50 的第二次扫描挑战每一个尾盘信号
tagline_en: Build a watchlist at 14:20, then challenge every late-session signal with a second scan at 14:50
summary: 面向沪市主板 60 系列的尾盘研究 Skill，通过多因子评分、两阶段确认、数据降级和保守次日回测，把一次临盘观察保存为可复查的研究记录。
summary_en: A late-session research skill for Shanghai main-board 60-series stocks. Multi-factor scoring, two-stage confirmation, data fallbacks, and conservative next-day backtesting turn an intraday observation into an inspectable research record.
category: quant-research
type: Agent Skill
type_en: Agent skill
level: standard
status: maintained
featured: false
weight: 150
facts_as_of: 2026-08-21
tags:
  - A 股
  - Agent Skill
  - 回测
tags_en:
  - China A-shares
  - Agent skill
  - Backtesting
stack:
  - Python
links:
  - label: 安装 Tailpicker
    label_en: Install Tailpicker
    type: repository
    url: https://github.com/ZeroxZhang/a-share-tailpicker
    primary: true
related:
  - end-of-day-picker
  - invest-signal-kit
  - lingmou
---

<!-- locale: zh-CN -->

# A-share Tailpicker

尾盘策略经常建立在一张临近收盘的快照上。价格拉升、成交放大或板块异动看起来很有说服力，但二十分钟后，信号可能已经衰减。单次扫描无法区分持续变化与短时噪声，也很容易让研究者只记住成功候选。

A-share Tailpicker 聚焦沪市主板 60 系列，用两个明确时间点组织尾盘研究：14:20 建立预选，14:50 更新行情并重新评估。第二次扫描的任务是淘汰已经失效的候选，并为留下的标的补充收盘前证据。

## 两次扫描承担不同职责

14:20 的预选允许更宽的观察范围，记录分时形态、量价关系、资金代理、均线位置、板块共振与交叉验证信息。14:50 使用更新后的价格和成交状态再次计算，检查先前理由是否仍成立。候选、观察名单和市场说明分开输出，避免把边缘标的塞进同一个强制排名。

评分用于组织多类证据，不代表一个分数足以预测次日表现。系统保留入选理由、数据来源和风险说明，使使用者可以在收盘后检查：到底是哪组条件影响了结果，第二次确认又删除了什么。

## 数据获取适应不同执行环境

工作流可根据环境选择 iFinD、Kimi Code、AKShare 或东方财富 HTTP，并为数据源设置优先级和 fallback 路径；非技术信息的交叉验证属于评分阶段。这样既能利用已有终端，也能在免费接口受限时保留替代方案。降级信息会影响结果可信度，应随报告一起阅读。

## 次日回测采用保守口径

筛选完成后，候选进入次日回测与复盘。实现加入交易成本和保守成交假设，并在组合层限制行业集中度；熊市环境会提高标准。回测关注的不只是涨跌，还包括信号是否能按假设成交、风险规则是否执行，以及初始理由是否经得住次日数据。

一次完整运行通常包括：14:20 生成预选和观察池；14:50 更新数据并确认；收盘后保存报告；次日按统一口径检查结果。两阶段时间点使过程可以被重放和比较。

## 已验证的工程范围

截至 2026-08-21，公开仓库覆盖预选、确认、观察池、市场说明与次日回测闭环，并包含 33 个单元测试。本次核验运行的是含未提交修改的本机副本，结果为 33/33 通过，因此不能视为公共仓库原样构建的可复现 CI 证据。公开项目也没有 CI、Release 或可独立核验的策略业绩；测试结果不能延伸为市场有效性证明。

真实交易还受到滑点、流动性、涨跌停、数据延迟和突发事件影响。该 Skill 不连接券商，用于方法研究和复盘，不构成个性化投资建议或收益承诺。

## 适合的使用方式

它适合希望把尾盘观察固定为可比较流程，并愿意检查数据与假设的研究者。寻找自动买卖指令、实盘托管或已证明超额收益的用户，不属于当前项目覆盖范围。

[安装 Tailpicker](https://github.com/ZeroxZhang/a-share-tailpicker)

<!-- locale: en -->

# A-share Tailpicker

Late-session strategies are often built from a single snapshot near the close. A price surge, expanding volume, or sector move can look persuasive, yet the same signal may have weakened twenty minutes later. One scan cannot reliably separate a persistent change from temporary noise, and it encourages researchers to remember selected winners while forgetting discarded context.

A-share Tailpicker focuses on Shanghai main-board 60-series stocks and organizes research around two explicit times. It creates a preliminary list at 14:20 and reevaluates it with updated market data at 14:50. The second scan is designed to remove candidates whose original conditions have failed and to add closing evidence for those that remain.

## Two scans with different responsibilities

The 14:20 stage maintains a wider observation set. It records intraday shape, price-volume behavior, capital-flow proxies, moving-average position, sector alignment, and cross-checking information. At 14:50, current price and volume conditions are scored again to test whether the earlier rationale still holds. Confirmed candidates, a watchlist, and market commentary are reported separately rather than compressed into one forced ranking.

The score organizes several forms of evidence; it does not imply that one number predicts next-day performance. Selection reasons, source information, and risk notes remain visible so a user can review which conditions drove the result and what the confirmation stage removed.

## Data acquisition across execution environments

The workflow can use iFinD, Kimi Code, AKShare, or Eastmoney HTTP depending on the host environment. Data sources have priority and fallback paths, while non-technical cross-checking belongs to the scoring stage. This supports both existing paid terminals and research environments that depend on public interfaces. A degraded source path reduces confidence and should be read as part of the report, not hidden from the result.

## Conservative next-day backtesting and review

After the final scan, candidates enter a next-day review and backtesting step. The implementation includes transaction costs and conservative fill assumptions, limits sector concentration at the portfolio level, and tightens standards in a bear market. Review covers more than direction: it asks whether the assumed execution was plausible, whether risk rules were followed, and whether the original rationale survived new data.

A complete cycle usually produces a preliminary list and watch pool at 14:20, confirms them at 14:50, saves the closing report, and evaluates the outcome under one consistent method the next day. Explicit timestamps make separate runs easier to replay and compare.

## Verified engineering scope

As of August 21, 2026, the public repository covers preliminary selection, final confirmation, a watch pool, market context, and next-day review, and contains 33 unit tests. Research for this page ran a local copy with uncommitted changes and produced a 33-of-33 pass, so the result is not reproducible CI evidence from an untouched public checkout. The repository has no public CI, release, or independently verifiable performance history. Passing tests is not evidence of market effectiveness.

Live execution remains exposed to slippage, liquidity, price limits, delayed data, and unexpected events. The skill does not connect to a broker. It is provided for method research and review, not as personalized investment advice or a promise of returns.

## Intended use

A-share Tailpicker fits researchers who want to make late-session observations comparable over time and are willing to inspect data quality and assumptions. It is not an automated trading service, a managed execution system, or a strategy with demonstrated excess returns.

[Install Tailpicker](https://github.com/ZeroxZhang/a-share-tailpicker)
