---
schema_version: 2
slug: md2book
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: md2book
title_en: md2book
tagline: 用 Markdown 写作，以一本中文书的形态交付
tagline_en: Write in Markdown. Deliver a book designed for Chinese reading.
summary: 面向中文技术内容的 Markdown 出版工具，自动处理封面、目录、主题、代码与分页，输出 A4 PDF。
summary_en: A Markdown publishing tool for Chinese technical content, with covers, tables of contents, themes, code styling, pagination, and A4 PDF output.
category: content-publishing
type: 文档出版工具
type_en: Document publishing tool
level: featured
status: active
featured: true
weight: 30
facts_as_of: 2026-08-21
tags:
  - Markdown
  - PDF
  - 中文排版
tags_en:
  - Markdown
  - PDF
  - Chinese typography
stack:
  - Node.js
  - Playwright
  - HTML
  - CSS
links:
  - label: 用 md2book 出版
    label_en: Publish with md2book
    type: repository
    url: https://github.com/ZeroxZhang/md2book
    primary: true
related:
  - huashu-bookwriter
  - md2pdf-v2
  - epub-pdf-to-txt-converter
---

<!-- locale: zh-CN -->

# md2book

Markdown 很适合持续写作：纯文本、版本友好，也不要求作者在排版界面里反复调整格式。问题通常出现在交付阶段。网页里正常的标题、代码和表格进入固定纸张后，可能出现孤行、断页、目录错位和中文字体不协调。

md2book 为这段“内容完成之后”的工作提供出版层。作者继续维护 Markdown，系统负责把它组织为带封面、目录、主题和阅读节奏的 A4 PDF。

## 格式转换与书籍排版是两件事

直接打印网页可以得到 PDF，却很难得到一本适合连续阅读的书。章节应该从合理位置开始，标题需要和后文保持连接，代码块不能随意断开，中文正文的行高与段距也需要稳定。

md2book 先将 Markdown 转为结构清楚的 HTML，再使用 Chromium 的打印排版能力处理页面。CSS break 规则针对章节、标题、代码块、表格和提示框进行约束。它没有重新发明一套分页引擎，而是把浏览器已有能力调校为适合技术书籍的出版流程。

## 书籍结构随正文一起维护

封面为内容建立入口，自动目录提供全书导航。章节增删后，作者无需手工更新页码或重新排一遍目录。

对长篇技术内容来说，这项能力会直接改变维护成本。Markdown 继续作为单一正文源，导航和页码在输出时生成，减少正文版本与交付版本之间的分叉。

## 三套主题对应三种阅读语境

### Minimal

以留白和清晰层级为主，适合技术手册、内部文档和希望降低视觉干扰的内容。

### Academic

采用更传统的书籍比例与排版气质，适合研究资料、课程讲义和需要正式感的长文。

### Playful

使用更活泼的标题、色彩和提示元素，适合入门教程、面向年轻读者的知识内容。

主题不只是替换颜色。字体、标题比例、段距、装饰和提示框会协同变化。作者可以改变出版气质，而不需要重写正文。

## 中文技术内容是主路径

中文字体、行高、标点节奏和中英文混排都被放在核心排版路径里。GFM、表格、代码高亮和 Callout 也保持一致的视觉层级。

这对于技术书尤其重要。代码和英文术语天然会打断中文文本的节奏，默认浏览器样式很少为这种混排做足准备。md2book 用统一主题规则处理这些元素，使正文、代码和辅助说明更像同一本书里的内容。

## 从源文件到成品

1. 使用 Markdown 组织章节、代码、表格和提示信息。
2. 选择适合读者与内容的主题。
3. 运行转换流程，生成 HTML 中间文档。
4. Playwright 启动 Chromium，按照打印 CSS 输出 A4 PDF。
5. 检查少量特殊页面，必要时调整源内容或主题规则。

浏览器承担成熟的 CSS 渲染，Node.js 组织转换，Playwright 负责稳定输出。这条技术路线也使主题能够继续用熟悉的 HTML/CSS 迭代。

## 选择 md2book，还是 md2pdf_v2

md2book 面向有章节结构的长篇内容，强调主题系统、目录和整体阅读体验。md2pdf_v2 使用 ReportLab，运行面更小，更适合一次性文档和低依赖环境。

两者服务不同交付条件。作者可以根据内容长度、环境限制和版式要求选择，不需要把所有 PDF 任务塞进同一种工具。

## 公开状态

截至 2026-08-21，仓库记录为 60 Stars、47 Forks，已提供封面、自动目录、三套主题、GFM 与中文排版支持。项目没有公开测试、CI 或正式 Release，因此不同输入仍可能需要人工检查，尤其是超长代码、复杂表格和特殊字体环境。

md2book 提供的是一个更可靠的成书起点，不对所有 Markdown 承诺零调整输出。

[用 md2book 出版](https://github.com/ZeroxZhang/md2book)

<!-- locale: en -->

# md2book

Markdown is a strong writing format: portable, version-friendly, and free from constant formatting decisions. The difficulty usually appears at delivery. Headings, code blocks, and tables that look fine on the web can produce orphaned lines, awkward page breaks, broken navigation, and inconsistent Chinese typography on paper.

md2book adds a publishing layer after the writing is done. Authors keep the manuscript in Markdown; the tool turns it into an A4 PDF with a cover, table of contents, visual theme, and a more deliberate reading rhythm.

## Conversion is not the same as book design

Printing a web page produces a PDF, but it does not automatically produce a readable book. Chapters need sensible starting points. Headings should stay connected to the text that follows. Code should not break at arbitrary lines, and Chinese body copy needs stable line height and spacing.

md2book first converts Markdown into structured HTML, then uses Chromium's print layout. CSS break rules address chapters, headings, code blocks, tables, and callouts. The project does not attempt to build a new pagination engine; it configures a mature browser layout system for technical publishing.

## Navigation stays in sync with the manuscript

A generated cover gives the document a clear entry point, while the table of contents provides navigation through long material. When chapters move or change, the author does not need to recalculate page numbers by hand.

This matters as a manuscript evolves. Markdown remains the single source, and the delivery structure is generated during export, reducing the chance that the working version and the published version drift apart.

## Three themes for different editorial settings

### Minimal

A restrained theme focused on whitespace and clear hierarchy, suitable for technical manuals, internal documentation, and content that should keep visual noise low.

### Academic

More traditional proportions and typography for research notes, course material, and long-form documents that need a formal tone.

### Playful

A more expressive treatment of headings, color, and callouts for introductory guides and learning material aimed at a broader audience.

Themes change typography, spacing, heading scale, decoration, and callout treatment together. Authors can change the publication's character without rewriting the manuscript.

## Chinese technical content is a primary use case

Chinese fonts, line height, punctuation rhythm, and mixed Chinese-English text are handled as core concerns. GFM, tables, code highlighting, and callouts follow the same hierarchy.

Technical books need this attention because code and English terminology frequently interrupt Chinese prose. Browser defaults rarely account for that reading pattern. md2book uses a shared theme system to keep prose, code, and supporting notes inside one editorial language.

## From source to finished PDF

1. Write chapters, code, tables, and callouts in Markdown.
2. Select a theme appropriate for the audience and subject.
3. Run the conversion to create the intermediate HTML document.
4. Playwright launches Chromium and exports the layout as an A4 PDF.
5. Review exceptional pages and adjust the source or theme rules when needed.

The browser provides CSS layout, Node.js coordinates the pipeline, and Playwright creates the final file. The same architecture keeps visual iteration accessible through HTML and CSS.

The intermediate HTML also remains inspectable.

## md2book or md2pdf_v2

md2book is built for chapter-based, long-form content where navigation, themes, and sustained reading matter. md2pdf_v2 uses ReportLab and a smaller runtime, making it a better fit for one-off documents or constrained environments.

They address different publishing conditions. The choice can follow the manuscript length, deployment environment, and desired level of control.

## Public status

As of August 21, 2026, the repository had 60 stars and 47 forks. It supports covers, generated tables of contents, three themes, GFM, and Chinese typography. There is no public test suite, CI workflow, or formal release, so unusual input still requires review—particularly very long code blocks, complex tables, and uncommon font environments.

md2book provides a stronger starting point for book production. It does not promise a zero-adjustment export for every Markdown file.

[Publish with md2book](https://github.com/ZeroxZhang/md2book)
