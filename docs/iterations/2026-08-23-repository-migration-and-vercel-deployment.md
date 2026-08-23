# 仓库迁移与 Vercel 部署复盘

> 日期：2026-08-23
>
> 状态：已完成，本文是历史复盘，不代替 GitHub、Vercel 或 DNS 控制台的实时状态。

## 目标与边界

本次工作的目标是把个人网站完整迁移到公开仓库 [`ZeroxZhang/zeroxhomepage`](https://github.com/ZeroxZhang/zeroxhomepage)，改用 Vercel 部署，并让以下两个域名形成唯一、稳定的访问入口：

- `https://www.zeroxzhang.cc`：正式网站
- `https://zeroxzhang.cc`：308 永久跳转到 `https://www.zeroxzhang.cc`

同时遵守两个边界：

1. 原仓库 `ZeroxZhang/ZeroxZhang.github.io` 的内容和历史保持不变。
2. 目标仓库迁移前的内容可以被替换，但先保存为备份分支。

## 最终结果

截至本文写作时，实际状态如下：

| 项目 | 结果 |
| --- | --- |
| 部署仓库 | `ZeroxZhang/zeroxhomepage`，默认分支为 `main`，公开仓库 |
| 原仓库 | `ZeroxZhang/ZeroxZhang.github.io`，内容未被迁移操作改写 |
| 目标仓库旧内容 | 保存在 `backup/pre-migration-2026-08-23/*` 分支 |
| 本地默认远端 | `origin` 指向 `ZeroxZhang/zeroxhomepage`；旧仓库保留为 `legacy` |
| 部署平台 | Vercel，项目名 `zeroxhomepage`，框架识别为 Next.js |
| GitHub Pages | 已关闭，不再参与生产访问链路 |
| `www` 域名 | 连接 Vercel 生产部署，HTTP 200 |
| 裸域名 | 由 Vercel 返回 HTTP 308，跳转到 `www` |
| DNS 托管 | 继续使用阿里云 DNS，不切换到 Vercel Nameservers |

生产访问链路：

```text
zeroxzhang.cc
  └─ A @ → Vercel
       └─ 308 Permanent Redirect
            └─ www.zeroxzhang.cc
                 └─ CNAME → Vercel
                      └─ Next.js production deployment
```

目标仓库 `main` 的网站迁移基线是原仓库提交 `ade56c6`。GitHub Pages 配置阶段又在目标仓库生成了一个 `Create CNAME` 提交，因此目标仓库最终 HEAD 比迁移基线多一个 `CNAME` 提交。这不影响 Vercel 部署，但以后比较两个仓库时不能只看 HEAD 是否完全相同。

## 关键决定

### 1. 备份目标仓库，再迁移完整历史

目标仓库原有分支没有直接丢弃，而是保存为以下备份分支：

- `backup/pre-migration-2026-08-23/master`
- `backup/pre-migration-2026-08-23/css`
- `backup/pre-migration-2026-08-23/dependabot-npm-and-yarn-body-parser-1.20.6`

这样既能让 `main` 承载迁移后的网站，又保留了迁移前状态的追溯入口。

需要注意：这些备份分支位于公开仓库中，不是私密备份。如果旧内容包含秘密或个人信息，应改用私有归档仓库或本地 Git bundle。

### 2. 原仓库保持不变

迁移采用“复制到新远端”的方式，不重写原仓库。迁移完成并验证部署后，本地远端调整为：

```text
origin → https://github.com/ZeroxZhang/zeroxhomepage.git
legacy → https://github.com/ZeroxZhang/ZeroxZhang.github.io.git
```

这样，后续执行 `git push origin main` 会更新实际部署仓库并触发 Vercel；原仓库仍可通过 `legacy` 读取，但暂时不再作为开发和发布目标。操作远端前仍应运行 `git remote -v`，避免误推到 `legacy`。

### 3. 不继续使用 GitHub Pages 部署 Next.js 源码

最初把 GitHub Pages 指向 `main` 后，域名显示的是 README，而不是 Next.js 网站。根因不是 DNS，而是部署模型不匹配：

- `main` 存放的是 Next.js 源码，不是已经导出的静态站点。
- GitHub Pages 的分支部署会按静态站点/Jekyll 方式处理仓库内容。
- 没有专门的构建与产物发布流程时，它不会自动运行完整的 Next.js 生产构建。

本项目还计划包含服务端能力，因此 Vercel 比直接发布源码到 GitHub Pages 更匹配。GitHub Pages 最终被关闭，避免两个平台同时争夺同一域名。

### 4. 使用 `www` 作为规范域名

最终选择：

- `www.zeroxzhang.cc` 直接连接生产部署。
- `zeroxzhang.cc` 只负责 308 跳转。

308 是永久跳转，并会保留请求方法和路径。例如：

```text
https://zeroxzhang.cc/about
  → https://www.zeroxzhang.cc/about
```

这一结构让搜索引擎、缓存和外部链接都收敛到同一个规范域名，也避免裸域名和 `www` 同时提供内容造成重复入口。

### 5. DNS 继续由阿里云托管

没有把域名的 Nameservers 改到 Vercel。阿里云继续作为权威 DNS，只添加 Vercel 要求的记录。

本文写作时的记录快照如下，未来应始终以 Vercel Domains 页面实时给出的值为准：

| 作用 | 类型 | 主机记录 | 当前记录值 |
| --- | --- | --- | --- |
| 裸域名接入 Vercel | A | `@` | `216.198.79.1` |
| `www` 接入 Vercel | CNAME | `www` | `d9721fa30c23e0f7.vercel-dns-017.com` |

Vercel 正在扩展 IP 范围，界面曾同时提到新地址和旧地址 `76.76.21.21`。不要把文档中的 IP 当成永久常量；新增或修复域名时，应复制当前项目 Domains 页面显示的推荐值。

## 主要问题与根因

### GitHub Pages 显示 README

**表象：** 域名可以打开，但展示的是仓库 README。

**根因：** Pages 成功读取了仓库，却没有得到可发布的 Next.js 构建产物。问题发生在构建/托管层，不在 DNS 层。

**经验：** 域名可解析、页面可打开，只能证明网络链路存在，不能证明应用部署正确。需要继续检查平台实际发布的产物和响应内容。

### Vercel 连接器无法直接上传项目

**表象：** 连接器的内联部署受到约 4 MB 的请求限制，而项目编码后的上传体积约为 10.5 MB。

**处理：** 改用 Vercel 官方 CLI 完成部署，再连接 GitHub 仓库用于后续自动部署。

**经验：** 平台支持某种部署方式，不代表该入口适用于所有项目体积。连接器失败后应切换到同平台的官方 CLI 或 Git 集成，不要为了适配传输限制而删减项目内容。

### 裸域名长期显示 Invalid Configuration

**表象：** 阿里云控制台中能看到 A 记录且显示启用，但 Vercel 一直报告配置无效；直接查询 `zeroxzhang.cc` 也没有 A 记录。

**根因：** 阿里云的“主机记录”误填成了完整域名 `zeroxzhang.cc`。在 `zeroxzhang.cc` 这个 DNS Zone 中，这会生成：

```text
zeroxzhang.cc.zeroxzhang.cc
```

查询这个错误地址时能看到 A 记录，而真正的裸域名没有记录。这证明问题不是传播延迟，而是记录名称错误。

**修复：** 裸域名的主机记录必须填写 `@`，不能填写完整域名。

**经验：** “控制台里有记录”不等于“记录发布在预期名称上”。排查时同时查询预期域名和可能被拼接的错误域名，可以快速区分传播延迟与配置错误。

### Vercel CLI 显示 Nameservers 不一致

Vercel CLI 会列出 Vercel Nameservers 作为 intended nameservers，并把当前阿里云 Nameservers 标为不一致。只要明确采用外部 DNS 托管，这个提示本身不代表故障。

真正的验收条件是：

1. 阿里云权威 DNS 返回 Vercel 要求的 A/CNAME。
2. Vercel Domains 页面显示域名有效。
3. 实际 HTTPS 请求返回正确的 308/200。

## 可复用的迁移顺序

以后进行类似迁移时，建议按这个顺序执行：

1. **只读盘点**：检查源仓库、目标仓库、分支、标签、Git LFS、子模块、仓库可见性和现有 DNS。
2. **扫描公开风险**：公开目标仓库前，检查完整 Git 历史中是否存在凭据、私密文件或不应公开的大文件。
3. **备份目标状态**：在覆盖目标默认分支前，为所有需要保留的分支创建明确、带日期的备份。
4. **迁移历史与内容**：把源仓库的提交历史、分支和必要标签复制到目标仓库；不要改写源仓库。
5. **验证迁移**：比较提交、父子关系、文件树、分支和标签，而不只检查首页是否能看到文件。
6. **先部署临时域名**：在 Vercel 的 `.vercel.app` 域名上完成构建、路由和资源验证。
7. **连接 GitHub 自动部署**：确认 Vercel 监听的是目标仓库的 `main`，不是保留不变的源仓库。
8. **先接入 `www`**：配置 CNAME，验证 HTTPS 和全站路由。
9. **再配置裸域名跳转**：添加 `A @`，在 Vercel 设置 308 跳转到 `www`。
10. **最后停用旧托管**：新链路通过验证后再关闭 GitHub Pages，减少停机和回滚压力。
11. **端到端验收**：从权威 DNS、公共解析、TLS、HTTP 状态码、跳转目标和页面内容逐层检查。

这套顺序的核心是“先建立新链路，再移除旧链路”。不要先关闭旧站点，再开始调试新平台和 DNS。

## 验证命令

### 检查本地仓库准备推送到哪里

```bash
git status --short
git remote -v
git branch --show-current
```

### 检查权威 DNS

```bash
dig +short A zeroxzhang.cc @dns31.hichina.com
dig +short CNAME www.zeroxzhang.cc @dns31.hichina.com
```

预期分别返回 Vercel 当前要求的 A 地址和项目专属 CNAME。

如果裸域名没有结果，而怀疑阿里云主机记录误填了完整域名，可以检查：

```bash
dig +short A zeroxzhang.cc.zeroxzhang.cc @dns31.hichina.com
```

### 检查跳转与生产页面

```bash
curl -sSIL https://zeroxzhang.cc
curl -sSI https://www.zeroxzhang.cc
```

验收重点：

- 裸域名第一跳是 `HTTP/2 308`。
- `Location` 是 `https://www.zeroxzhang.cc/`，路径请求应保留路径。
- `www` 返回 `HTTP/2 200`。
- 响应由 Vercel 提供，页面内容是实际网站而不是 README。

### 检查 Vercel 项目

```bash
npx vercel project inspect zeroxhomepage --scope <team-slug>
npx vercel domains inspect zeroxzhang.cc --scope <team-slug>
```

这些命令需要已登录的 Vercel CLI。`<team-slug>` 应替换为当前账户中项目所属团队的 slug，不要把账户 ID 或访问令牌写进仓库。

### 检查 GitHub Pages 是否已关闭

```bash
gh api repos/ZeroxZhang/zeroxhomepage/pages
```

本次关闭后，该接口返回 404。未来如果重新启用 Pages，这个结果会变化。

## 以后最容易忘记的事项

- 阿里云裸域名的主机记录是 `@`，不是完整域名。
- Vercel 页面给出的 DNS 值可能更新，配置时不要依赖旧截图或旧文档。
- 外部 DNS 模式下，不必因为 Vercel 显示 Nameservers 不一致就切换 NS。
- 域名显示“已添加”不等于已经可用，必须验证权威 DNS 和真实 HTTP 响应。
- 先验证 Vercel，再关闭 GitHub Pages。
- 备份分支位于公开仓库时，备份内容同样公开。
- 当前本地 `origin` 已指向 `ZeroxZhang/zeroxhomepage`；旧仓库仅保留为 `legacy`，不要作为日常推送目标。

## 本次验收快照

本文写作时已实际确认：

```text
zeroxzhang.cc A     → 216.198.79.1
www CNAME           → d9721fa30c23e0f7.vercel-dns-017.com
https://zeroxzhang.cc      → HTTP 308 → https://www.zeroxzhang.cc/
https://www.zeroxzhang.cc  → HTTP 200
GitHub Pages API           → 404（已关闭）
```

外部服务状态会变化。后续排查应重新运行验证命令，不要把这份快照当成永久事实。
