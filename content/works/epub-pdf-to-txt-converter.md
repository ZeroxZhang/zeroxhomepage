---
schema_version: 2
slug: epub-pdf-to-txt-converter
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: EPUB/PDF to TXT Converter
title_en: EPUB/PDF to TXT Converter
tagline: 一批电子书放进去，带走可以搜索、分析和继续整理的纯文本
tagline_en: Turn a folder of text-based ebooks into plain text ready for search, analysis, and reuse
summary: 带图形界面的 Python 转换工具，支持单文件与文件夹批量处理 PDF / EPUB，并尽量保留段落。
summary_en: A Python desktop utility for converting individual files or folders of text-based PDF and EPUB books into reusable TXT while preserving paragraphs where possible.
category: utilities
type: Python 桌面工具
type_en: Python desktop utility
level: compact
status: complete
featured: false
weight: 280
facts_as_of: 2026-08-21
tags:
  - EPUB
  - PDF
  - 文本转换
tags_en:
  - EPUB
  - PDF
  - Text conversion
stack:
  - Python
links:
  - label: 获取转换工具
    label_en: Get the converter
    type: repository
    url: https://github.com/ZeroxZhang/epub-pdf_2_txt_converter
    primary: true
related:
  - md2book
  - md2pdf-v2
---

<!-- locale: zh-CN -->

# EPUB/PDF to TXT Converter

全文搜索、语料分析和二次整理更需要稳定文本，而非原书的复杂版面。逐本复制既慢，也容易把段落打散。EPUB/PDF to TXT Converter 用一个桌面界面处理文本型 PDF 与 EPUB，把单本书或整批资料转换成更通用的 TXT。

## 从文件选择到批量输出

用户可以选择一个文件，也可以递归扫描整个文件夹。转换过程中显示实时进度，同名输出存在时会跳过，适合处理不希望反复覆盖的长任务。工具尝试清理页面与章节内容并保留段落，使结果能够继续进入检索、脚本分析、笔记整理或其他文本工作流。

## 实现足够直接，范围也足够明确

项目由 Python、Tkinter、PyPDF2、ebooklib 与 BeautifulSoup 构成。它提取已有文本，不重建原书视觉结构，也不包含 OCR。因此，扫描版 PDF、复杂多栏排版、公式和图片文字不属于可靠处理范围；Unicode BMP 之外字符会被删除，段落保留依赖启发式清理，输出仍需抽查。

## 可核验状态

截至 2026-08-21，公开仓库记录 5 Stars、1 Fork，暂无自动测试、CI 或正式 Release。不同出版物的内部结构差异较大，当前数字只能证明项目被公开关注，不能证明转换准确率或兼容范围。

## 适合有权处理的文本资料

该工具适合自有、公版或已获授权的文本型电子书。转换不会自动赋予复制、分析或再发布权利；处理前应确认版权与隐私要求，并保留原文件作为校对依据。

[获取转换工具](https://github.com/ZeroxZhang/epub-pdf_2_txt_converter)

<!-- locale: en -->

# EPUB/PDF to TXT Converter

Full-text search, corpus analysis, and note-making need dependable text more than they need the original page design. Copying books one at a time is slow and frequently damages paragraph structure. EPUB/PDF to TXT Converter provides a desktop interface for turning individual text-based PDF or EPUB files—or an entire folder—into a more portable TXT collection.

## Convert one title or a folder

The user can select a single file or recursively process a directory. Progress remains visible during longer jobs, and an existing output with the same name is skipped rather than silently overwritten. The converter cleans extracted page or chapter content and attempts to preserve paragraph breaks, producing text that can move into search, scripts, note systems, or other analysis workflows.

The aim is practical reuse, not a visual reconstruction of the source publication.

## A direct implementation with a defined scope

The application is built with Python, Tkinter, PyPDF2, ebooklib, and BeautifulSoup. It extracts text already present in the document. It does not include OCR and does not recreate typography, page geometry, illustrations, or complex layout.

Scanned PDFs are therefore outside its supported path. Multicolumn pages, formulas, unusual EPUB structures, and text embedded in images may produce incomplete or incorrectly ordered output. Characters outside the Unicode Basic Multilingual Plane are removed, and paragraph preservation depends on heuristic cleanup. Every converted collection should be sampled before it becomes an input to further automation.

## Public evidence

As of August 21, 2026, the public repository had 5 stars and 1 fork. It did not include automated tests, CI, or a formal release. Because ebook internals vary widely, those repository counts do not establish extraction accuracy or broad compatibility.

## Use only material you may process

The converter is suited to books you own, public-domain material, and documents you are authorized to transform. Conversion does not grant permission to copy, analyze, distribute, or republish copyrighted or private content. Keep the original files for comparison and confirm the relevant rights before using the output in another system.

[Get the converter](https://github.com/ZeroxZhang/epub-pdf_2_txt_converter)
