---
schema_version: 2
slug: md2pdf-v2
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: md2pdf_v2
title_en: md2pdf_v2
tagline: 一句话确认风格，把 Markdown 交付成中文友好的 PDF
tagline_en: Turn Markdown into a CJK-aware PDF with one design conversation
summary: 低依赖的 Agent PDF Skill：以一个 ReportLab 转换器处理 CJK 字体、混排换行、目录、页眉页脚和品牌化页面。
summary_en: A low-dependency Agent skill built around one ReportLab converter, with CJK font handling, mixed-script wrapping, navigation, and branded page options.
category: content-publishing
type: Agent Skill
type_en: Agent skill
level: standard
status: complete
featured: false
weight: 240
facts_as_of: 2026-08-21
tags:
  - PDF
  - CJK
  - 文档自动化
tags_en:
  - PDF
  - CJK typography
  - Document automation
stack:
  - Python
  - ReportLab
links:
  - label: 安装 PDF Skill
    label_en: Install the PDF skill
    type: repository
    url: https://github.com/ZeroxZhang/md2pdf_v2
    primary: true
related:
  - md2book
  - pdf-watermark-remover
---

<!-- locale: zh-CN -->

# md2pdf_v2

把 Markdown 变成一份可交付 PDF，困难通常不在“导出”按钮。中英文混排会遇到字体缺失、英文单词被拆行、中文日期在 Canvas 区域显示为方框；封面、目录、页眉页脚、水印和封底又分散在不同工具或模板中。为了临时报告安装完整 TeX 环境，维护成本也可能超过文档本身。

md2pdf_v2 是一套低依赖 Agent Skill，仓库 README 使用产品名 any2pdf。它把交互式需求确认和一个 Python 转换器放在同一流程里，运行时核心依赖为 ReportLab。用户先用自然语言提出“转 PDF”，Agent 确认设计选择后执行脚本并交付文件。

## CJK 排版从字体与换行层开始处理

转换器会在 macOS、Windows 和 Linux 的常见字体目录中查找衬线体、无衬线体、等宽字体与 CJK 字体，并为中英文片段切换合适字族。中文可按字符边界换行，连续拉丁文本尽量保持单词完整；过长单词会缩放以避免越界。封面、页眉、页脚等直接绘制到 Canvas 的区域也使用 CJK 字体注册逻辑，减少正文正常、装饰页面乱码的情况。

脚本同时处理合并在同一行的异常标题、Markdown 层级、代码块与基本文档结构。它没有调用 LaTeX、浏览器或远程排版服务，转换边界集中在一个约 67 KB 的 Python 文件中，便于 Agent 在本地执行和定位错误。

## 一次对话确定版式，一次运行生成整份文档

典型工作流先确认主题、扉页、水印与封底，再提供标题、作者、版本等元数据并调用 CLI。输出可包含封面、可点击目录与 PDF 书签、整页扉页、章节页眉、作者或品牌页脚、页码、日期、斜向水印和带图片或文字的封底。生成后应先查看封面、目录、中文密集页、代码页和末页，再决定是否交付。

代码中可核验 14 个主题标识，覆盖学术、期刊、书籍、中式、水墨和开发者风格；README 目前只展示并称为 10 个主题。这里按转换器实现记录 14 种，同时保留文档与实现尚未同步的事实。需要浏览器级 CSS 自由度、复杂分页或长篇书籍工作流时，`md2book` 更合适。

## 已有回归材料与环境限制

截至 2026-08-21，仓库包含 10 个 Markdown 回归 fixture、Shell test runner、主题预览与长篇示例，采用 MIT 许可证；没有公开 CI 或 Release。测试材料覆盖多类输入，但不能证明所有 Markdown 扩展、字体组合和分页边界均已处理。

系统必须安装 Python、ReportLab 与可用字体。字体自动发现依赖各平台的实际文件；缺少合适 CJK 字体时仍可能出现方框或字宽变化，新机器交付前需要预览。它适合报告、提案、教程和内部文档的快速本地生成；对严格印刷规范、无障碍 PDF、复杂数学公式或出版级色彩管理，应使用专门排版与预检工具。

[安装 PDF Skill](https://github.com/ZeroxZhang/md2pdf_v2)

<!-- locale: en -->

# md2pdf_v2

Turning Markdown into a deliverable PDF is rarely just an export problem. Mixed Chinese and Latin text can expose missing fonts, split English names across lines, or render dates as empty squares in directly drawn page elements. Covers, tables of contents, running furniture, watermarks, and back covers often require separate templates. Installing and maintaining a full TeX distribution can also be disproportionate for a report that needs to ship today.

md2pdf_v2 is a low-dependency Agent skill presented as any2pdf in the repository README. It combines a short design conversation with a single Python conversion engine whose runtime dependency is ReportLab. The user asks for a PDF, the Agent confirms the relevant design choices, and the script generates the document locally.

## CJK handling begins below the template layer

The converter searches common font locations on macOS, Windows, and Linux for serif, sans-serif, monospaced, and CJK families. It can switch fonts between Chinese and Latin runs instead of relying on one accidental fallback. Chinese wraps at character boundaries, continuous Latin text is kept together when possible, and exceptionally long words can be reduced to avoid overflow.

The same font-registration logic is used for content drawn directly on the PDF canvas, including covers, headers, and footers. That addresses a common failure mode where body paragraphs render correctly but dates or labels outside the main story flow do not. The parser also contains recovery for merged headings and handles the document structures supported by its own Markdown pipeline.

There is no LaTeX engine, browser renderer, or remote layout service in the conversion path. The core is concentrated in one Python file of roughly 67 KB, which gives an Agent a comparatively small execution surface and a direct place to inspect failures.

## From design choices to a reviewable file

A typical run confirms the theme, frontispiece, watermark, and back-cover treatment, then supplies metadata such as title, author, and version to the CLI. The resulting PDF can include a cover, a clickable table of contents with PDF bookmarks, a full-page frontispiece, chapter-aware running headers, branded footers, page numbers, dates, a diagonal watermark, and an image or text treatment on the back cover.

The file still needs a visual review. A useful acceptance pass checks the cover, navigation, a CJK-dense page, code or long Latin strings, and the final page before delivery. For browser-level CSS freedom, intricate pagination, or a full book-production workflow, the related `md2book` approach has a broader layout surface.

The converter defines 14 theme identifiers spanning academic, journal, book, Chinese, ink-wash, and developer-oriented styles. The README currently previews and describes only 10. The implementation therefore supports a larger theme set than the public documentation enumerates, and that documentation drift should remain visible rather than being silently resolved in marketing copy.

## Evidence and operating limits

As of August 21, 2026, the repository included 10 Markdown regression fixtures, a shell test runner, theme previews, and long-form examples. It used the MIT license and had no public CI workflow or GitHub release. Those fixtures demonstrate several input classes; they do not establish complete support for every Markdown extension, font combination, or pagination edge case.

The machine still needs Python, ReportLab, and suitable fonts. Automatic discovery depends on the files installed on each operating system. Missing CJK fonts can produce square glyphs or different text metrics, so a new environment requires a preview before delivery. The skill fits reports, proposals, tutorials, and internal documents that benefit from fast local generation. Strict press specifications, accessible tagged PDFs, complex mathematical typesetting, and publication color management require specialized production and preflight tools.

[Install the PDF skill](https://github.com/ZeroxZhang/md2pdf_v2)
