---
schema_version: 2
slug: x-card
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: X Card
title_en: X Card
tagline: 不截真实账号，也能做出干净、可控的 X 风格文字卡片
tagline_en: Create a clean X-style post card without exposing a live account or platform interface
summary: 隐私优先的单页卡片工具，在浏览器本地编辑资料、正文、主题与尺寸，并导出 2x / 3x PNG。
summary_en: A privacy-minded single-page tool for composing profile details, post text, themes, and canvas dimensions locally before exporting a 2x or 3x PNG.
category: visual-design
type: Web 应用
type_en: Web application
level: compact
status: complete
featured: false
weight: 270
facts_as_of: 2026-08-21
tags:
  - 社交卡片
  - 隐私优先
  - 单页应用
tags_en:
  - Social cards
  - Privacy-minded
  - Single-page application
stack:
  - HTML
  - CSS
  - JavaScript
links:
  - label: 制作 X 风格卡片
    label_en: Create an X-style card
    type: demo
    url: https://zeroxzhang.github.io/x_card/
    primary: true
  - label: GitHub
    label_en: GitHub
    type: repository
    url: https://github.com/ZeroxZhang/x_card
    primary: false
related:
  - text-card-generator
  - minimalism-note-card-generator
---

<!-- locale: zh-CN -->

# X Card

直接截取社交平台帖子，会把导航、推荐内容、压缩痕迹和真实账号信息一起带走。X Card 把帖子视觉从平台界面中拆出来，适合制作引用卡、演示样稿或经授权的社交内容预览；姓名、头像信息、正文、时间与视觉选项都由使用者明确填写。

## 在本地完成一张可控的卡片

打开页面后，先编辑资料与正文，再选择浅色或深色主题、边框和模拟认证标识。画布宽度可在 420—900px 之间调整，也能设置最小高度；正文支持重点加粗。确认预览后，可按 2x 或 3x 清晰度导出 PNG，减少真实平台截图中的无关元素。

## 轻量实现与网络条件

页面以原生 HTML、CSS 和 JavaScript 构建，并部署在 GitHub Pages。输入内容在浏览器本地参与排版，没有业务后端负责保存正文。PNG 导出依赖从 jsDelivr 加载的第三方库，因此首次导出需要网络；若库尚未缓存，离线打开页面不能保证完成导出。

## 当前证据与使用边界

截至 2026-08-21，在线页面与公开仓库均可访问；仓库暂无兼容性 CI、自动测试或正式版本 tag。不同浏览器、字体与长文本下的渲染仍需使用者检查。模拟认证标识和可编辑资料不应被用于伪造真实发言，成品应根据发布语境标注为设计稿、引用卡或重制内容。

## 从空白卡片开始

它适合需要控制构图和隐私的单张文本内容，也保留了一个无需账号即可复用的静态工具样本。

[制作 X 风格卡片](https://zeroxzhang.github.io/x_card/) · [查看 GitHub](https://github.com/ZeroxZhang/x_card)

<!-- locale: en -->

# X Card

A screenshot of a social post carries more than the message: navigation, recommendations, compression artifacts, and often a real account identity. X Card separates the familiar post-card format from the live platform. It is intended for quote cards, presentation mockups, and authorized social content previews, with profile details, body text, time, and visual treatment entered deliberately by the user.

## Compose the card locally

Start by editing the profile and post copy. Choose a light or dark theme, toggle the border and simulated verification mark, and set a canvas width between 420 and 900 pixels with an adjustable minimum height. Selected phrases can be emphasized in bold. Once the preview is ready, export the card as a 2x or 3x PNG.

The workflow removes unrelated platform interface from the composition while keeping the author in control of what appears in the image. It does not require signing into a social account.

## A lightweight browser implementation

The application uses native HTML, CSS, and JavaScript and is deployed on GitHub Pages. Text and profile inputs are laid out in the browser; there is no application backend responsible for storing the post body.

PNG export relies on a third-party library delivered through jsDelivr. The first export therefore requires a network connection. If that dependency has not already been cached, opening the page offline does not guarantee that an image can be produced.

## Verified status and responsible use

As of August 21, 2026, both the live page and public repository were accessible. The repository did not include compatibility CI, automated tests, or a formal version tag. Users should inspect the output across browsers, fonts, and unusually long text before publication.

Editable identities and a simulated verification mark can also create misleading artifacts. Cards should be labeled according to context—as a design mockup, recreated quote, or illustrative post—and must not be presented as evidence that a real person published something.

X Card remains useful as a focused, account-free tool and as an archived example of a small client-side publishing workflow.

[Create an X-style card](https://zeroxzhang.github.io/x_card/) · [View GitHub](https://github.com/ZeroxZhang/x_card)
