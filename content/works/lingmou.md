---
schema_version: 2
slug: lingmou
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: 灵眸 LingMou
title_en: LingMou
tagline: 把分散的市场信号整理成一份可以追溯的研究判断
tagline_en: Turn fragmented market signals into a research view you can trace
summary: 面向 A 股、ETF、LOF 与基金的量化决策辅助平台，综合技术、基本面、资金和情绪，并保留置信度与风险提示。
summary_en: A quantitative decision-support platform for China A-shares, ETFs, LOFs, and funds, combining technical, fundamental, capital-flow, and sentiment signals with confidence and risk context.
category: web-products
type: Web 产品
type_en: Web product
level: featured
status: active
featured: true
weight: 70
facts_as_of: 2026-08-21
tags:
  - 量化分析
  - 决策辅助
  - PWA
tags_en:
  - Quantitative analysis
  - Decision support
  - PWA
stack:
  - React
  - Express
  - tRPC
  - React Query
  - Cloudflare
links:
  - label: 打开灵眸
    label_en: Open LingMou
    type: website
    url: https://zrcfzy.top
    primary: true
related:
  - end-of-day-picker
  - a-share-tailpicker
  - invest-signal-kit
  - stock-fund-analyzer
  - etf-analyzer
---

<!-- locale: zh-CN -->

# 灵眸 LingMou

市场信息一直在增加。价格形态、财务指标、资金流向和情绪消息同时出现，却很少指向完全一致的结论。对个人投资者来说，困难往往不在于找到更多数据，而在于把不同证据放到同一套判断框架里。

灵眸是一款面向 A 股、ETF、LOF 与场外基金的量化决策辅助产品。它将多类信号组织成可解释评分，并提供研究标签、置信度、历史变化和风险提示。产品不代替用户做交易决定，重点是把判断依据变得可见。

## 同一标的，通常存在四种不同叙述

技术指标描述价格和成交行为，基本面关注企业或资产质量，资金面反映参与者变化，情绪面捕捉市场预期。单独看其中一类信息，很容易得到片面的答案。

灵眸保留四个维度的独立计算，再按照资产类型进入综合评分。用户既能看到最后的 BUY、SELL 或 HOLD 研究标签，也可以回到构成标签的具体信号，理解结论为何形成。

这套结构降低了单一指标带来的确定感。一个强烈的技术信号，如果缺少其他维度支持，会在置信度和风险说明中留下痕迹。

## 多维分析如何工作

### 技术面

MA、RSI、MACD、KDJ 与布林线等指标用于描述趋势、动量和波动状态。它们提供规则化视角，不把某个金叉或超卖值直接写成交易指令。

### 基本面

个股与基金需要关注的基本信息不同。产品根据资产类型选择指标和权重，使财务、估值或产品结构进入相应分析。

### 资金面

资金变化被作为一类独立证据，与价格走势相互核对。它可以增强或削弱技术信号，但不会单独决定最终标签。

### 情绪面

市场情绪与公开信息提供背景，帮助解释短期变化。情绪信号天然噪声较高，因此在综合判断中保留边界。

### AI 补充解释

模型可生成补充建议与文字说明，位置排在规则、置信度和风险之后。AI 用于帮助阅读，不负责为概率结论盖章。

## 不同资产使用不同权重

个股、ETF、LOF 与场外基金具有不同的收益来源和风险结构。灵眸没有用同一套分数强行覆盖所有品类。

个股会更关注企业与交易行为，ETF 与 LOF 需要考虑指数、产品结构和流动性，场外基金的频率和数据条件也不同。差异化权重使统一界面仍能保留资产特性。

## 从一次查询变成持续观察

自选、批量添加、历史记录和信号变化提醒，使分析可以被持续跟踪。用户能够比较同一标的在不同日期的判断变化，观察哪些维度发生了改变。

这种历史视角比保存一张当日截图更有价值。它帮助用户区分“原来的理由仍然成立”和“结论已经因为新数据改变”，也为后续复盘提供基础。

## 第一次使用

1. 选择一只正在研究的股票、ETF、LOF 或基金。
2. 阅读多维评分、研究标签、置信度与风险提示。
3. 展开信号来源，检查结论依赖哪些指标。
4. 加入自选，在后续日期比较信号变化。
5. 将结果作为研究输入，与自己的仓位和风险规则一起判断。

灵眸适合希望建立固定研究节奏的个人用户。它不会连接券商替你下单，也不适合寻找一条无需理解的买卖口令。

## 从研究脚本走向在线产品

灵眸于 2026-01-22 上线。截至 2026-08-21，公开网站可以正常访问。产品将尾盘筛选、风险检查、股票与基金研究、ETF 分析等方法收拢到一个入口，并通过 React、Express、tRPC、React Query 与 Cloudflare 组织公开服务。

当前公开信息尚不足以独立验证回测准确率、实盘收益或完整数据来源清单。登录后的提醒、模型调用与真实分析链路也没有在本次核验中完成端到端测试。

因此，页面只描述可以观察到的产品和规则设计。灵眸用于研究与决策辅助，不构成投资建议，不承诺任何收益。

## 给决定增加依据，而不是增加冲动

市场很难因为多看一个指标就变得确定。灵眸提供的价值，是把证据放在一起，保留来源、分歧和风险，使每次行动之前多一层可以复查的判断。

[打开灵眸](https://zrcfzy.top)

<!-- locale: en -->

# LingMou

Market information keeps expanding. Price patterns, financial metrics, capital flows, and sentiment arrive at the same time, but rarely point to one clean conclusion. For an individual investor, the challenge is often not finding more data; it is placing different forms of evidence inside one decision framework.

LingMou is a quantitative decision-support product for China A-shares, ETFs, LOFs, and off-exchange funds. It organizes several signal families into explainable scores and presents research labels, confidence, historical changes, and risk context. The product does not make the trading decision for the user. Its purpose is to make the basis of a judgment visible.

## One asset can tell four different stories

Technical indicators describe price and volume behavior. Fundamentals address the quality of the company or asset. Capital-flow data reflects changes in participation. Sentiment provides context about expectations and public attention.

LingMou calculates these dimensions separately before applying asset-specific weighting. A user can see the resulting BUY, SELL, or HOLD research label and then return to the signals that produced it.

This structure reduces the false certainty of a single indicator. A strong technical signal with weak support elsewhere should remain visible as a lower-confidence or higher-risk view.

## How the analysis is assembled

### Technical

Indicators such as moving averages, RSI, MACD, KDJ, and Bollinger Bands describe trend, momentum, and volatility. They provide consistent rules without turning an isolated crossover or oversold reading into an instruction.

### Fundamental

Stocks and funds require different forms of fundamental context. The product selects metrics and weights by asset type so that financial, valuation, or product-structure data enters the appropriate analysis.

### Capital flow

Changes in capital participation form a separate evidence layer and can confirm or weaken a price signal. They do not determine the final label on their own.

### Sentiment

Market sentiment and public information help explain short-term changes. Because sentiment data is inherently noisy, it retains a bounded role in the combined score.

### AI explanation

A model can provide supporting commentary after the rules, confidence, and risk context. AI helps interpret the analysis; it is not used to turn probabilities into certainty.

## Weighting follows the asset

Stocks, ETFs, LOFs, and off-exchange funds have different return drivers and risk structures. LingMou does not apply one scorecard to every category.

Stocks place more emphasis on company and trading behavior. ETFs and LOFs require index, product structure, and liquidity context. Off-exchange funds operate with different data frequency and constraints. Asset-specific weighting keeps those differences inside a consistent interface.

## Move from a single query to an ongoing view

Watchlists, batch add, analysis history, and signal-change reminders turn a one-time result into something that can be monitored. Users can compare the same asset across dates and see which dimensions changed.

That history is more useful than saving a screenshot. It helps distinguish a thesis that still holds from a conclusion that has changed with the evidence, and it creates material for later review.

## Getting started

1. Choose a stock, ETF, LOF, or fund you are already researching.
2. Read the multidimensional score, research label, confidence, and risk notes.
3. Open the signal details to understand which rules support the result.
4. Add the asset to a watchlist and compare future signal changes.
5. Treat the output as research input alongside your own position and risk rules.

LingMou is intended for individuals who want a repeatable research rhythm. It does not connect to a broker to place trades and is not designed to provide an unexplained buy or sell command.

## From research scripts to a live product

LingMou launched on January 22, 2026. As of August 21, 2026, the public website was accessible. It brings together methods from end-of-day screening, risk checks, stock and fund research, and ETF analysis in a single product, built with React, Express, tRPC, React Query, and Cloudflare.

The public information does not provide independently verifiable backtest accuracy, live returns, or a complete data-source inventory. Authenticated alerts, model calls, and the full analysis path were not tested end to end during the content review.

The page therefore describes the visible product and its rule design. LingMou is for research and decision support. It is not investment advice and does not promise returns.

## Add evidence to a decision, not pressure to act

No extra indicator can make a market certain. LingMou brings the evidence together while preserving its source, disagreement, and risk, giving each decision a view that can be inspected later.

[Open LingMou](https://zrcfzy.top)

