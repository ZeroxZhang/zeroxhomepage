---
schema_version: 2
slug: text-card-generator
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: Text Card Generator
title_en: Text Card Generator
tagline: 在浏览器中完成中文排版、纸张选择与高分辨率文字卡片导出
tagline_en: Compose, style, and export high-resolution text cards directly in the browser
summary: 所见即所得的文字卡片编辑器，提供多种纸张背景、中文字体与细粒度排版控制。预览与导出共享同一套 DOM 样式，并以 4 倍 scale 生成 PNG。
summary_en: A WYSIWYG text-card editor with paper backgrounds, Chinese fonts, and detailed typography controls. Preview and export share the same DOM styles, with PNG output rendered at 4× scale.
category: visual-design
type: Web 应用
type_en: Web application
level: standard
status: complete
featured: false
weight: 260
facts_as_of: 2026-08-21
tags:
  - 文字卡片
  - 所见即所得
  - 图片导出
tags_en:
  - Text cards
  - WYSIWYG editing
  - Image export
stack:
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - Zustand
  - html2canvas
links:
  - label: 制作文字卡片
    label_en: Create a text card
    type: demo
    url: https://cards.zeroxzhang.cc
    primary: true
  - label: GitHub
    label_en: GitHub
    type: repository
    url: https://github.com/ZeroxZhang/text_card_generator
    primary: false
related:
  - minimalism-note-card-generator
  - x-card
---

<!-- locale: zh-CN -->

# Text Card Generator

一段摘录直接发成纯文字，往往缺少阅读边界；放进通用海报模板，又容易让装饰压过内容。文字卡片需要处理的细节更接近编辑设计：行长、行距、字体、纸张纹理和留白共同决定读者是否愿意停下来读完。

Text Card Generator 是一个在浏览器中运行的所见即所得编辑器。左侧负责输入与排版，右侧实时显示最终卡片。用户可以从便签、纯色、横线、网格与点阵纸张中选择，再根据内容调整字体、间距、缩进与对齐，完成后导出高清 PNG。

## 预览与导出使用同一个视觉对象

卡片预览不是单独绘制的近似图。导出通过 html2canvas 捕获同一份预览 DOM，使背景、排版和装饰尽可能保持一致。导出 scale 设为 4，在高分屏或社交平台二次压缩后，为文字边缘保留更多分辨率余量。

这种方案仍会受到浏览器渲染、字体加载和 html2canvas 支持范围影响。不同操作系统、浏览器版本或远程字体状态可能造成行宽和换行差异，因此关键成品应在实际下载图片中确认。

## 为中英文文字提供具体排版控制

编辑器支持字号、行高、字间距、段间距、首行缩进和对齐方式。纸张样式可以表达不同内容语境：横线更接近手写笔记，网格和点阵适合结构化摘录，纯色则减少背景干扰；便签折角与明暗模式提供更明确的物理质感。

字体列表包含 14 个 Google Fonts family、3 个随项目托管的中文字体，以及 2 个系统 fallback 选择。pinyin-pro 可以根据中文作者名生成拼音辅助信息。字体数量提供选择空间，但字体授权、网络加载与跨设备一致性仍需要在具体使用环境中检查。

## 三步完成一张卡片

输入摘录、短文或自己的句子；选择纸张和字体，并通过实时预览调整行距与留白；最后下载 PNG。编辑和预览在同一页面完成，不要求先注册账号，也不需要把内容交给生成模型。

适合的内容包括读书摘录、短笔记、文章片段和社交平台文字图。长文、复杂图文混排、批量模板生产与多人品牌资产管理并非当前产品目标。

## 当前状态

截至 2026-08-21，在线应用可访问，已经形成编辑、实时预览、多纸张、多字体与高清导出的完整闭环。项目采用 React 18、TypeScript、Vite、Tailwind CSS 3 和 Zustand；公开仓库没有自动化测试、CI 或 Release，跨浏览器和跨字体环境的像素一致性尚无系统验证结果。

[制作文字卡片](https://cards.zeroxzhang.cc)

<!-- locale: en -->

# Text Card Generator

A quotation posted as plain text often has no visual boundary. Put the same passage inside a general poster template and decoration can overwhelm the words. A useful text card is closer to editorial design: line length, leading, typeface, paper texture, and whitespace determine whether a reader can enter and finish the passage.

Text Card Generator is a WYSIWYG editor that runs in the browser. Editing and typography controls sit beside a live view of the final card. Users can choose sticky-note, solid, ruled, grid, or dotted paper, tune the typography for the content, and export the result as a high-resolution PNG.

## One visual object for preview and export

The preview is not a separate approximation of the final image. Export uses html2canvas to capture the same preview DOM, keeping backgrounds, typography, and decoration aligned with what the user edited. A scale factor of four preserves additional edge detail for high-density displays and later compression by social platforms.

The method still depends on browser rendering, font availability, and the CSS features supported by html2canvas. Operating systems, browser versions, and remote font loading can change line width and wrapping. Important results should be checked in the downloaded image itself.

## Detailed controls for Chinese and English text

The editor exposes font size, line height, letter spacing, paragraph spacing, first-line indentation, and alignment. Paper styles communicate different contexts: ruled backgrounds resemble a handwritten note, grids and dots suit structured excerpts, and solid paper removes visual interference. A folded corner and light or dark modes add a restrained physical reference.

The font list includes 14 Google Fonts families, three Chinese font files hosted with the project, and two system fallback options. pinyin-pro can derive pinyin for a Chinese author name. The range is useful, while licensing, network loading, and consistency across devices should still be verified for a specific publishing context.

## A three-step workflow

Enter a quotation, short note, article passage, or original sentence. Select paper and type, then adjust spacing while watching the live preview. Download the PNG when the composition is ready. The flow requires no account and does not send the text to a generative model.

The product fits reading excerpts, short notes, article fragments, and social text graphics. Long-form documents, complex image-and-text layouts, large-scale template automation, and collaborative brand asset management are outside its present scope.

## Current status

As of August 21, 2026, the live application is accessible and provides a complete loop from editing and preview through paper and font selection to high-resolution export. It is built with React 18, TypeScript, Vite, Tailwind CSS 3, and Zustand. The public repository has no automated tests, CI, or release, and pixel consistency across browsers and font environments has not been systematically demonstrated.

[Create a text card](https://cards.zeroxzhang.cc)
