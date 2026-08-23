# OriginKit Hero 10 来源记录

- 来源：[Hero 10](https://www.originkit.dev/sections/hero-10)
- 取得日期：2026-08-21
- 取得方式：OriginKit CLI `0.2.23`，Next.js + Tailwind 交付
- 配额：消耗 1 次 Section delivery；未单独获取任何 Component
- 本地入口：`components/originkit/hero-10.tsx`
- 静态资产：`public/originkit/hero-10/`
- 初始文件哈希：`hero-10.manifest.sha256`

## 获取与目录说明

源码最初通过 CLI 的 `--path vendor/originkit --no-deps` 写入，以隔离尚未初始化的应用。CLI 仍生成了 `@/components/originkit/...` imports，因此交付完成后只做了一次目录级机械移动：`vendor/` → `components/`。组件 TSX、Section CSS、SVG 与 PNG 内容未改动；集成辅助 CSS 中的一条来源路径注释同步为新目录。

CLI 同时生成了以下集成辅助文件：

- `postcss.config.mjs`
- `app/originkit-section-theme.css`
- `app/originkit-section-themes.css`

这些文件只是 Tailwind v4 接入素材，不代表项目框架已经初始化。正式脚手架落地后，应将 theme 文件接入全局 CSS，并按实际项目配置检查 PostCSS。

## 实际依赖

源码 imports 可确认需要：

- `react`
- `motion`（通过 `motion/react`）
- `framer-motion`
- Tailwind CSS v4 与 PostCSS

CLI 还建议安装 `gsap`，但本次交付文件没有 `gsap` import。没有验证需求前不要安装。

## 凭证规则

OriginKit API Key 不在仓库中。它保存在获取机器的 macOS Keychain，服务名为 `dev.originkit.api-key`。不得将密钥写入 `.env`、文档、脚本、命令参数或 Git；其他机器需独立配置凭证。

## 授权边界

本源码受 [OriginKit Licensing & Usage](https://www.originkit.dev/docs/licensing) 约束，可用于本个人网站并进行修改，也可随真实开源应用/网站发布。不得作为模板、starter、组件库、设计资产或自建 MCP 目录再分发。

预览字体、图片和图标可能有独立授权。本次交付的三个资产已本地保存，但正式发布前仍需完成第三方许可核对。

## 初始校验

- 15 个 TSX 文件通过 esbuild 独立语法解析。
- `hero-10.tsx` 已在将 React/Motion 标记为外部依赖的条件下完成整棵本地 import graph 打包，未发现缺失的本地模块。
- SVG 未发现脚本、事件处理器、外部链接或 `foreignObject`。
- 仓库扫描未发现 OriginKit API Key 或账户邮箱。
- 代码尚未在真实 Next.js 应用中构建或运行；集成缺口见项目 Hero 10 适配评估。

## 2026-08-23 新增交付与站点适配

### 新增组件

| 组件 | 来源 | 本地文件 | 说明 |
| --- | --- | --- | --- |
| Kinetic Grid | [kineticgrid](https://www.originkit.dev/components/kineticgrid) | `components/originkit/ui/kineticgrid.tsx` | cursor 类，无新增 npm 依赖 |
| Interactive Grid | [interactive-grid](https://www.originkit.dev/components/interactive-grid) | `components/originkit/ui/interactive-grid.tsx` | animation 类，无新增 npm 依赖 |
| Keycap Button | [keycap-button](https://www.originkit.dev/components/keycap-button) | `components/originkit/ui/keycap-button.tsx` | button 类，无新增 npm 依赖；上游为 DesignPass.dev 的 IsometricButton（MIT，版权注释保留在文件头），官方要求衍生代码注明 DesignPass.dev 与 Ernest Liu |

- 取得方式：OriginKit CLI `add`（AI Prompt 通道，`--no-deps`），各消耗 1 次 Component delivery。
- 组件源码为纯 React 客户端组件，交互机制已用于首页；未再获取同一组件。

### 对交付文件的站点适配（Git 追踪）

| 文件 | 修改 | 原因 |
| --- | --- | --- |
| `ui/hero-10/text-arc.tsx` | 弧形文字改为「SEMPER NOVARUM RERUM CUPIDUS · 探索永无止境」；颜色/字体改本站主题；离开视口或页面隐藏时卸载旋转实例 | 移除 demo 品牌文案并暂停离屏帧循环 |
| `ui/hero-10/pixel-background.tsx` | 修复 `maskStyle()` 把 Tailwind 工具类名写入 `maskImage` 的无效 CSS；像素色 `#5AF5A3` → `#D9B45B` | 交付缺陷修复 + 主题统一 |
| `ui/hero-10/pixel-card.tsx` | `auto` 入场完成后停止逐像素闪烁；减少动态模式使用静态帧；离屏和页面隐藏时停止 rAF | 避免装饰 Canvas 永久占用 CPU/GPU |
| `ui/kineticgrid.tsx` | 新增 `pointerTarget`、`mapPointer`、`reducedMotion`；网格稳定后休眠、输入时唤醒、页面隐藏时暂停；Canvas DPR 上限设为 1.5 | 保留交互的同时消除空闲永久重绘和高 DPR 放大成本 |
| `ui/interactive-grid.tsx` | 未修改 | 交互机制改编进 `components/site/work-grid.tsx`（单元格改为文字与符号内容） |
| `ui/keycap-button.tsx` | 未修改 | 用于右上角语言切换（`components/site/locale-toggle.tsx`），配色/尺寸经 props 调为主题色 |

其余 hero-10 文件（`section-16-hero`、`hero-content`、`navbar`、`button` 等）保留为来源基线，
站点实现位于 `components/site/`。设计决策见 `docs/design/2026-08-23-homepage-design.md`。
