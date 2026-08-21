---
schema_version: 2
slug: zerox-homepage
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: 旧个人主页与博客
title_en: Legacy Homepage and Blog
tagline: 从 2018 到现在，一段仍然可以被访问的个人数字足迹
tagline_en: A public digital trail from 2018 that still connects identity, writing, and earlier web experiments
summary: 曾经的个人门户与长期博客，连接社交入口、文章归档、搜索和 RSS，也是这次网站重建要继承的内容起点。
summary_en: A legacy personal gateway and long-running blog that connect social profiles, searchable writing, and RSS—and provide the content foundation for the current rebuild.
category: web-products
type: 个人网站
type_en: Personal website archive
level: compact
status: legacy
featured: false
weight: 350
facts_as_of: 2026-08-21
tags:
  - 个人网站
  - 博客
  - 数字档案
tags_en:
  - Personal website
  - Blog
  - Digital archive
stack:
  - HTML
  - JavaScript
  - GitHub Pages
  - GitBook
links:
  - label: 访问旧主页
    label_en: Visit the legacy homepage
    type: website
    url: https://www.zeroxzhang.cc
    primary: true
  - label: 博客
    label_en: Read the blog
    type: website
    url: https://blog.zeroxzhang.cc
    primary: false
  - label: GitHub
    label_en: GitHub
    type: repository
    url: https://github.com/ZeroxZhang/zeroxhomepage
    primary: false
related: []
---

<!-- locale: zh-CN -->

# 旧个人主页与博客

个人网站既是当下入口，也会逐渐成为时间档案。从 2018 年开始，这套主页与博客持续连接公开身份、社交账号和长文内容。它们记录了早期视觉偏好、关注主题与发布方式，也是新网站重建时需要继承和重新整理的内容基础。

## 一个入口，两套长期独立的系统

旧主页以极简门户连接 Blog、GitHub、Instagram 与小红书，矩阵画布和鼠标轨迹构成主要视觉识别。博客保存数字营销、数据分析和产品运营等长期文章，并提供归档、搜索、RSS 与 Markdown 输出。访客可以从轻量身份页进入更完整的内容记录。

## 仍可访问，但不再代表当前技术方向

主页运行在 GitHub Pages，以静态 HTML 与 JavaScript 为主；博客采用 GitBook / Next.js 体系。两者在视觉、导航与部署上长期分离，也保留了固定桌面布局、过时版权年份和偏重鼠标输入的交互。截至 2026-08-21，主页与博客均可公开访问，但更适合作为历史档案，不是新站的技术基线。

## 访问统计的已知故障

主页源码会请求 `/api/visit`，该接口当前返回 404，页面中也没有对应的 `visit-count` 目标节点。可见访问数字实际依赖第三方“不蒜子”统计。因此，旧代码中的自建访问接口不能写成已运行能力；统计连续性和第三方依赖也应在迁移时重新评估。

## 重建需要保留什么

新网站会重新统一个人介绍、作品与博客入口，同时保存旧页面和文章的可访问历史。这个项目页的价值在于交代迁移起点：哪些公开链接与内容应被继承，哪些交互和失效代码应停止沿用。

[访问旧主页](https://www.zeroxzhang.cc) · [阅读博客](https://blog.zeroxzhang.cc) · [查看 GitHub](https://github.com/ZeroxZhang/zeroxhomepage)

<!-- locale: en -->

# Legacy Homepage and Blog

A personal website begins as a current point of entry and gradually becomes a record of time. Since 2018, this homepage and blog have connected a public identity, social profiles, and long-form writing. They preserve earlier visual preferences, subject interests, and publishing choices—and now provide the content baseline for a new portfolio site.

## One doorway, two independent systems

The legacy homepage is a minimal gateway to the blog, GitHub, Instagram, and Xiaohongshu. A matrix canvas and mouse-trail animation define much of its visual character. The blog holds longer material on digital marketing, data analysis, product operations, and adjacent topics, with archives, search, RSS, and Markdown access.

Together they allow a visitor to move from a compact identity page into a more durable record of writing, but they were not designed as one coherent product.

## Still online, no longer the technical direction

The homepage runs as a static HTML and JavaScript site on GitHub Pages. The blog uses a GitBook and Next.js delivery stack. Their visual systems, navigation, and deployments remain separate. The homepage also carries a fixed desktop-oriented layout, an outdated copyright year, and interactions that depend heavily on pointer movement.

As of August 21, 2026, both sites were publicly accessible. Their status is intentionally marked as legacy: they are historical surfaces to preserve, not the implementation baseline for the rebuild.

## A known failure in visit counting

The homepage source requests `/api/visit`, but that endpoint currently returns 404, and the page does not contain the expected `visit-count` target element. The visible traffic number is supplied by the third-party Busuanzi counter instead. The custom API must therefore be described as broken, not as an operating feature. Any migration should reconsider both continuity of the count and reliance on an external tracking service.

## What the rebuild should carry forward

The new site can unify biography, work, and writing while retaining the accessible history of the old pages. This archive establishes the migration boundary: preserve public content and useful links, document the earlier visual experiments, and retire interactions or code paths that no longer work.

[Visit the legacy homepage](https://www.zeroxzhang.cc) · [Read the blog](https://blog.zeroxzhang.cc) · [View GitHub](https://github.com/ZeroxZhang/zeroxhomepage)
