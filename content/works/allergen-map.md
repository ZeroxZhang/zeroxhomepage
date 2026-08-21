---
schema_version: 2
slug: allergen-map
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: 过敏原地图
title_en: Allergen Map
tagline: 以地区作为健康信息入口的一次交互可视化实验
tagline_en: An interactive visualization experiment using location as the entry point to allergy information
summary: 按地区浏览吸入性、食物与接触类过敏原的信息可视化原型。地图交互、详情面板和数据表已经上线，但当前强度值由随机数生成，只能用于界面演示，不能代表实际医学风险。
summary_en: A visualization prototype for browsing inhalant, food, and contact allergens by region. The map, detail panels, and tables are live, but current intensity values are randomly generated for interface demonstration and do not represent medical risk.
category: web-products
type: 信息可视化原型
type_en: Information visualization prototype
level: standard
status: experiment
featured: false
weight: 330
facts_as_of: 2026-08-21
tags:
  - 地图可视化
  - 健康信息
  - ECharts
tags_en:
  - Map visualization
  - Health information
  - ECharts
stack:
  - HTML
  - ECharts
  - Tailwind CSS
  - GSAP
links:
  - label: 探索地图原型
    label_en: Explore the map prototype
    type: website
    url: https://alg.zeroxzhang.cc
    primary: true
  - label: GitHub
    label_en: GitHub
    type: repository
    url: https://github.com/ZeroxZhang/algmap
    primary: false
related:
  - sonoquest-ultrasound-play-lab
---

<!-- locale: zh-CN -->

# 过敏原地图

全国性健康资料通常从一张长表或一组分类开始，普通读者还要先找出和所在地区有关的部分。过敏原地图尝试调换阅读顺序：先在中国地图上选择地区，再进入吸入性、食物与接触类信息，观察空间入口是否能降低浏览成本。

这是一个信息架构与交互呈现原型。它验证地图、地区详情、分类面板和数据表怎样协同工作，不提供经过验证的地区风险数据，也不承担诊断功能。

## 从全国视图进入地区详情

ECharts 提供中国地图、地区悬停与点击交互。颜色图例用于表达界面中的相对强度，详情面板按类型列出相关项目和说明，地区表格则提供不依赖地图操作的文字入口。用户可以在全国概览与单个地区之间往返，而无需在一份完整资料中手动搜索地名。

Tailwind CSS 组织页面结构，GSAP 与轻量动效用于切换反馈。动效的职责是提示当前选择和层级变化，不改变数据本身。整体实现部署为静态单页，适合验证阅读路径和展示形式。

## 当前地图强度是示意数据

源码使用随机数生成地区“过敏原强度”。这意味着同一地区的颜色没有可追溯测量依据，也不代表发病率、暴露水平或就医风险。页面提及 2020—2023 年监测和医院统计，但没有提供可复核的数据集、文献清单、采样方法或更新时间，因此这些表述不能作为数据证据。

这一限制决定了作品的准确定位：可交互的健康信息界面实验，而非医学风险地图。颜色、排名和地区差异只能用于体验界面；任何人都不应据此改变用药、饮食、出行或就医计划。

## 要成为数据产品，还缺什么

下一阶段需要接入具备来源、地区覆盖、采样口径和时间范围的可信数据；为每个指标说明单位、缺失值和更新频率；把来源与方法直接连接到地图；再由医学或公共卫生专业人员复核分类和解释。视觉层也需要清晰区分“无数据”“低数值”和“不适用”。

只有在这些工作完成后，地图颜色才可能承担事实表达。目前公开页面应持续保留醒目的示意数据与非医疗用途说明。

## 当前状态与适用范围

截至 2026-08-21，在线原型可正常访问，地区选择、三类信息、详情面板、数据表和免责声明已经完成。它适合用于讨论地图如何改变健康信息的阅读顺序，也可作为数据接入前的交互验证载体。

过敏症状、检测与治疗应咨询合格医疗专业人员，并使用专业机构提供的可追溯资料。本项目不用于诊断、风险预测或医疗决策。

[探索地图原型](https://alg.zeroxzhang.cc)

<!-- locale: en -->

# Allergen Map

National health information often begins with a long table or a collection of categories. A general reader must first isolate the entries relevant to their location. Allergen Map tests a different reading order: select a region on a map of China, then browse inhalant, food, and contact allergens to see whether a geographic entry point makes the material easier to approach.

This is an information-architecture and interaction prototype. It examines how a map, regional detail, category panels, and a data table can work together. It does not provide validated regional risk data and has no diagnostic function.

## From a national view to regional detail

ECharts supplies the China map together with regional hover and click interactions. A color legend represents relative intensity inside the interface. Detail panels group items by type, while a regional table offers a text-based route that does not depend on map interaction. Users can move between national context and one region without manually searching a complete document for a place name.

Tailwind CSS organizes the page, and GSAP plus lightweight motion provide selection feedback. Motion indicates the current state and navigation level; it does not change the meaning of the data. The implementation is deployed as a static single page, making it suitable for testing reading paths and presentation choices.

## Current intensity values are illustrative

The source code generates regional “allergen intensity” with random numbers. A region’s color therefore has no traceable measurement behind it and does not represent prevalence, exposure, or likelihood of seeking medical care. The page mentions monitoring and hospital statistics from 2020 to 2023, but publishes no reviewable dataset, bibliography, sampling method, or update date. Those statements cannot be treated as data evidence.

This constraint defines the honest scope of the work: an interactive health-information interface experiment, not a medical risk map. Colors, rankings, and regional differences are available only to demonstrate the interface. They should never be used to change medication, diet, travel, or care decisions.

## What a data product would require

A future version would need dependable datasets with named sources, geographic coverage, sampling definitions, and time ranges. Every indicator would need a unit, missing-data treatment, and update frequency. Sources and methodology should be linked directly from the map, with classification and interpretation reviewed by medical or public-health specialists. The visual system must also distinguish “no data,” “low value,” and “not applicable.”

Only after that work could map color carry a factual claim. Until then, the public page should retain prominent notices that the data is illustrative and the product is not for medical use.

## Current status and appropriate use

As of August 21, 2026, the live prototype is accessible and includes regional selection, three information categories, detail panels, a data table, and a disclaimer. It is useful for discussing how geography changes the reading order of health information and as an interaction test bed before a real data integration.

Allergy symptoms, testing, and treatment should be discussed with a qualified medical professional using traceable information from appropriate institutions. This project is not for diagnosis, risk prediction, or medical decisions.

[Explore the map prototype](https://alg.zeroxzhang.cc)
