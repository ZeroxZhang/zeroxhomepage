---
schema_version: 2
slug: hottrend
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: Hottrend / TrendRadar Integration
title_en: Hottrend / TrendRadar Integration
tagline: 把分散热点汇成一条可筛选、可推送、也能被 Agent 查询的信息流
tagline_en: Bring scattered trend feeds into a filterable, push-ready stream that agents can query
summary: 基于开源 TrendRadar 的部署与接入实践，验证多平台聚合、关键词规则、通知和 MCP 查询如何进入个人工作流。
summary_en: A deployment and integration study built on the upstream TrendRadar project, connecting multi-platform aggregation, keyword rules, notifications, and MCP queries to a personal workflow.
category: utilities
type: 上游项目集成实践
type_en: Upstream integration study
level: compact
status: legacy
featured: false
weight: 290
facts_as_of: 2026-08-21
tags:
  - 热点聚合
  - MCP
  - 开源集成
tags_en:
  - Trend aggregation
  - MCP
  - Open-source integration
stack:
  - Python
  - SQLite
  - Docker
  - GitHub Actions
links:
  - label: 查看集成实践
    label_en: View the integration study
    type: repository
    url: https://github.com/ZeroxZhang/hottrend
    primary: true
  - label: TrendRadar 上游项目
    label_en: Upstream TrendRadar project
    type: repository
    url: https://github.com/sansan0/TrendRadar
    primary: false
related: []
---

<!-- locale: zh-CN -->

# Hottrend / TrendRadar Integration

每天依次打开多个平台，只会增加刷新动作，很难形成稳定的信息判断。Hottrend 记录了一次个人集成实践：把跨平台热点接入统一工作流，按关键词缩小范围，再通过通知或 Agent 查询进入后续研究。

> **上游归属说明：** 热点聚合、关键词规则、daily / current / incremental 模式、通知渠道与 MCP 服务均来自开源项目 [TrendRadar](https://github.com/sansan0/TrendRadar)。此处展示的是个人仓库中的导入、配置、部署和接入记录，不是对 TrendRadar 核心产品的原创声明。

## 从榜单到可处理的信息流

上游系统先聚合多个平台，再用必含、排除和计数规则过滤内容。daily 模式生成每日汇总，current 保留当前榜单，incremental 只提示新增变化；历史数据可由 MCP 服务继续查询。企业微信、飞书、钉钉、Telegram、Email、ntfy、Bark、Slack 等通知能力也属于 TrendRadar 上游范围。

## 这份仓库记录了什么

个人仓库保留环境配置、定时任务、通知接入与 Agent 查询的实践痕迹，适合观察一个成熟开源信息产品如何进入私人工作流，以及部署后会暴露哪些凭证管理、通知噪声和持续维护问题。它不提供独立品牌产品、原创抓取器或另行验证的数据服务。

## 公开状态与归档价值

截至 2026-08-21，个人仓库没有独立 Pages，最近的定时 GitHub Action 存在失败，因此状态标记为 legacy。运行记录不能证明热点完整性、排序质量或通知及时性。它作为归档案例，保留了上游能力、个人配置与 Agent 接入之间的边界。

[查看集成实践](https://github.com/ZeroxZhang/hottrend) · [访问 TrendRadar 上游](https://github.com/sansan0/TrendRadar)

<!-- locale: en -->

# Hottrend / TrendRadar Integration

Opening several platforms in sequence creates more refresh work without creating a dependable way to judge what matters. Hottrend documents a personal integration exercise: route cross-platform trend feeds into one workflow, narrow them with keyword rules, and make the resulting stream available through notifications or agent queries.

> **Attribution:** Trend aggregation, keyword rules, daily/current/incremental modes, notification channels, and the MCP service are capabilities of the open-source [TrendRadar](https://github.com/sansan0/TrendRadar) project. The Hottrend repository records personal import, configuration, deployment, and workflow integration. It is not the original TrendRadar product and does not claim authorship of its core features.

## From rankings to a workable feed

The upstream system aggregates multiple platforms and filters items through required terms, exclusions, and count rules. Daily mode produces a digest, current mode preserves the current ranking, and incremental mode focuses on new changes. Historical trend records can also be queried through MCP.

Notification support for WeCom, Feishu, DingTalk, Telegram, email, ntfy, Bark, and Slack belongs to TrendRadar as well. In this case, those capabilities provide the infrastructure for a personal information routine rather than evidence of a separate product implementation.

## What the personal repository contributes

The repository preserves the integration layer: environment configuration, scheduled execution, notification setup, and an agent-facing query path. It is useful for examining how an established open-source information product enters an individual workflow and where operational concerns appear—credentials, notification noise, failed schedules, and ongoing maintenance.

It does not provide an independently branded trend service, an original crawler, or separately validated trend data.

## Public status and archival value

As of August 21, 2026, the personal repository had no standalone Pages deployment, and its recent scheduled GitHub Action showed failures. It is therefore marked as a legacy integration study. The available run history does not prove completeness of coverage, ranking quality, or delivery speed.

Its portfolio value is documentary: it makes the boundary between upstream capability, personal configuration, and agent access explicit, while preserving the maintenance lessons of a real deployment attempt.

[View the integration study](https://github.com/ZeroxZhang/hottrend) · [Visit the upstream TrendRadar project](https://github.com/sansan0/TrendRadar)
