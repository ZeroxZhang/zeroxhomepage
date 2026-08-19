# ZeroxZhang.github.io

个人网站项目 —— 主域名 [zeroxzhang.cc](https://zeroxzhang.cc) 的源代码仓库。

## 项目简介

个人网站，三大板块：

- **个人介绍** — About
- **作品集** — Portfolio
- **博客** — Blog

多级页面结构、多个子页面；前端动效是核心设计元素。

## 当前进度

> 更新于 2026-08-19

**已完成 ✅**
- [x] 复用 2016 年创建的用户主页仓库（`ZeroxZhang.github.io`），转为私有
- [x] 默认分支切换为 `main`（旧 `master` 历史保留后删除）
- [x] 项目骨架与 AI 协作规范：`CLAUDE.md`、`AGENTS.md`、`.gitignore`
- [x] `docs/` 纲领性文档目录（PRD / 调研 / 规划 / 迭代 / 设计规范）

**进行中 🚧**
- 无

**待办 📋**
- [ ] 技术栈选型（约束：多级页面 + 重动效 + GitHub Pages 静态托管）
- [ ] PRD（产品需求文档）
- [ ] 开发规划与里程碑
- [ ] 站点开发
- [ ] 发布：仓库转公开 → 启用 GitHub Pages → 配置自定义域名 → 切换 DNS
  - ⚠️ `zeroxzhang.cc` 当前指向旧页面（托管在别处），切换前需备份旧站内容

## 仓库结构

| 路径 | 说明 |
|------|------|
| `CLAUDE.md` | AI 开发会话入口：项目长期重要信息、维护规则 |
| `AGENTS.md` | 其他 AI 工具（Codex / Cursor）入口，指向 CLAUDE.md |
| `docs/` | 纲领性文档：PRD、调研结论、开发规划、版本迭代、设计规范 |
| `src/` | 站点源码（待技术栈确定后创建） |

## 技术栈

待定。硬性约束：GitHub Pages 纯静态托管 —— 所有动态效果必须是客户端实现，所选框架必须可静态导出。

## 协作开发说明

- 仓库为私有，多设备开发通过 git 同步
- AI 参与开发：先读 `CLAUDE.md`，纲领性结论写入 `docs/`（见 `docs/README.md` 约定）
