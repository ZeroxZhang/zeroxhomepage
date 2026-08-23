# ZeroxZhang.github.io

个人网站 [zeroxzhang.cc](https://zeroxzhang.cc) 的源代码仓库。

## 项目方向

网站围绕三个内容板块展开：

- **个人介绍** — About
- **作品集** — Portfolio
- **博客** — Blog

它会是一套多层级、内容驱动的个人表达与作品展示系统。视觉和动效是体验的重要部分，但具体技术、页面结构和表现方式会随着设计与实现验证继续调整。

## 当前状态

> 更新于 2026-08-23

- **首页首版已完成**：英雄区（Hero 10 基线 + Cinzel 主标题 + 格言「Semper novarum rerum cupidus」+ GitHub/博客/公众号/联系我按钮组）、Kinetic Grid 倾斜动效地面（替换 Prism Grid）、按 8 条分类组织的 Interactive Grid 作品集入口（9 宫格 + 分类弹层）、导航与 Footer。
- 应用脚手架已落地：Next.js App Router + TypeScript + Tailwind CSS v4 + Motion/Framer Motion，`/`、`/about`（双语占位）静态预渲染；`npm run dev/build/start/lint/typecheck/test` 可用，另有 Playwright 首页与关键回归验收脚本。
- 35 个作品的中英文介绍已整理到 `content/works/`，首页由 `lib/works.ts` 加载器消费；分类、计数与排序来自内容源，构建时校验双语字段、正文结构、链接、关联和枚举。
- 设计基线已定稿：见 [`docs/design/2026-08-23-homepage-design.md`](./docs/design/2026-08-23-homepage-design.md)。
- 待办：作品详情页 `/work/<slug>`、About 正式页、Blog 板块、作品媒体、访问计数器后端与部署平台决策。

更细的阶段安排见 [`docs/plans/2026-08-21-website-kickoff-plan.md`](./docs/plans/2026-08-21-website-kickoff-plan.md)。计划会随验证结果调整，不代表不可变的实施顺序。

## 仓库结构

| 路径 | 说明 |
| --- | --- |
| `CLAUDE.md` | 跨项目上下文、协作原则和少量长期边界 |
| `AGENTS.md` | 通用 Agent 入口 |
| `docs/` | 需求、证据、设计、技术方案、计划和历史 |
| `content/` | 网站将直接消费的正式内容 |
| `components/originkit/` | Hero 10 的本地来源基线与来源记录 |
| `public/originkit/` | Hero 10 的本地静态资产 |

## 开发方式

技术选择应服务于内容结构、动效体验、可维护性、性能和无障碍，而不是被早期候选方案锁定。当前研究与建议在 `docs/research/` 和 `docs/plans/` 中。

常用命令：

```bash
npm run dev          # 开发服务器
npm run build        # 生产构建（Turbopack）
npm run start        # 生产服务器
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm test             # 内容排序、schema 与动态文案单元测试
npm run qa:install   # 安装 Playwright Chromium（首次）
npm run qa:homepage  # 首页自动化验收（需生产服务器运行，PLAYWRIGHT_BROWSERS_PATH 按需设置）
npm run qa:regressions # 关键缺陷回归（同样需要生产服务器）
```

访问计数器包含服务端逻辑，因此部署目标需要函数运行时和持久化能力。正式部署与 DNS 切换仍待完成；操作前需重新核对公开解析，备份现有站点和 DNS 状态，并准备回滚。

## 文档协作

项目文档是可演化的工作材料。根文件负责全局方向，目录 README 负责局部边界，专题文档负责具体决策；遇到现实变化时更新相应层级，而不是继续维护已经失效的规则。详细约定见 [`CLAUDE.md`](./CLAUDE.md) 与 [`docs/README.md`](./docs/README.md)。
