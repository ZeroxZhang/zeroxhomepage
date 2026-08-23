# 作品内容模型与前端适配方案

- 日期：2026-08-21
- 状态：schema v2 已采用；首页清单与同域静态作品页路由已落地
- 适用范围：首页作品列表、作品筛选、`/work/<slug>` 详情页、SEO/分享元数据

## 1. 决策

作品内容采用仓库内的 **纯 Markdown + YAML frontmatter**，存放于 `content/works/`。内容文件不依赖 React、MDX 组件、CSS 类名或具体路由框架。

选择这一方式的原因：

- 文案与样式解耦：同一正文可被不同页面布局和动效系统消费。
- 人与工具都可维护：Markdown 可直接评审，frontmatter 可被构建程序读取。
- 框架可迁移：未来无论选择 Next.js、Astro 或其他静态/混合渲染框架，都只需要替换解析和渲染适配层。
- 首页与详情页共享事实：卡片摘要、排序、分类、链接和详情正文来自同一个作品文件。

## 2. 数据边界

```text
docs/raw/personal_projects/   原始输入，只读
            ↓
docs/research/                事实核验与方法结论
            ↓
content/works/<slug>.md       网站正式内容源
            ↓
内容加载器 / schema 校验      未来前端适配层
            ↓
首页卡片 + /work/<slug>       展现层
```

- `content/works/index.yaml` 是作品注册表与分类字典。
- `<slug>.md` frontmatter 提供中英文结构化字段，正文用 locale marker 提供两套完整详情页叙事。
- `links[].show_on_homepage: true` 可把一个 `type: website` 链接提升为首页独立官网入口；每个作品最多一个。
- 媒体资源不嵌入正文；未来在 frontmatter 增加 `media` 引用，前端根据资源类型选择组件。
- 易变外部数据不在客户端临时抓取。若未来需要实时 Stars/版本，应在构建时或服务端更新，并保留失败回退值。

## 3. 页面层级契约

| 层级 | 内容 | 前端典型消费方式 |
| --- | --- | --- |
| L1 五秒判断 | 当前 locale 的 `title`、结果型 `tagline`、`summary`、主链接 label | 首页卡片、详情页 Hero、SEO description、首屏 CTA |
| L2 建立欲望 | 高压场景、新方式、结果型能力、第一次成功路径 | 详情页主滚动区域、产品演示、页面目录 |
| L3 消除疑虑 | 证据、工作机制、适配人群、风险边界、相关项目 | 指标/证明区、技术展开区、FAQ、关联推荐 |

作品共享“承诺 → 场景 → 转变 → 能力 → 开始 → 信任 → CTA”的决策顺序，但不共享固定标题。中英文允许采用各自自然的章节命名与段落节奏，信息、事实和风险边界必须对等。按 `level` 控制内容密度。

### 3.1 双语字段与正文解析

- schema v2 的默认语言为 `zh-CN`，可用语言为 `zh-CN`、`en`。
- 中文字段沿用无后缀名称；英文字段使用 `_en` 后缀，包括 `title_en`、`tagline_en`、`summary_en`、`type_en`、`tags_en` 与 `links[].label_en`。
- 正文以 `<!-- locale: zh-CN -->` 和 `<!-- locale: en -->` 分段。加载器必须先切分 locale，再解析各自 Markdown；不能先把整份文件渲染后用 CSS 隐藏另一种语言。
- 语言切换只替换内容，不改变 slug 和 canonical route。未来可由 cookie、URL locale segment 或用户设置决定当前语言，具体路由策略留待框架选型后确定。
- 缺失请求语言时回退到 `default_locale`；构建时仍将缺失英文内容视为错误，不能依赖生产回退掩盖翻译遗漏。

正文中的技术、架构与创作过程只有在能证明产品价值或建立信任时才进入主叙事。完整工程细节未来应由可折叠技术区、仓库或独立文章承载，不能阻断主要 CTA。

## 4. 路由与构建建议

框架确定后实现一个单向内容加载器：

1. 读取 `index.yaml`，校验 slug 唯一且对应文件存在。
2. 解析每个 Markdown 的 YAML frontmatter 与正文 AST。
3. 校验双语必填字段、locale marker、枚举值、链接协议、唯一主 CTA、`related` 引用和每种语言的标题层级。
4. 按 `featured`、`weight`、`title` 生成首页列表。
5. 按 slug 生成 `/work/<slug>` 路径；当前实现通过经测试同步的 `lib/work-slugs.ts` 部署清单，将其连接到同域 `public/work/<slug>/index.html` 静态交付页，避免路由追踪无关仓库文件。
6. 按当前 locale 从标题、摘要和未来的 `media.hero` 生成 SEO 与 Open Graph 元数据。

不建议让作品文件直接成为框架路由文件。应由 `app/work/[slug]` 或等价适配层读取内容，这样路由、布局和正文可以独立演进。

## 5. 媒体扩展契约（预留）

前端开始制作前，可在 schema v3 增加：

```yaml
media:
  hero:
    src: /works/example/hero.webp
    alt: 描述画面表达的信息，而不是重复作品名
  gallery:
    - src: /works/example/workflow.webp
      alt: 从输入到 SVG 校验的六阶段流程
      caption: 可选说明
  demo_video:
    src: /works/example/demo.mp4
    poster: /works/example/demo-poster.webp
```

媒体字段出现前，不在正文中插入占位图和空组件。

## 6. 验证门禁

前端脚手架落地时至少加入以下内容测试：

- 注册表数量等于 Markdown 文件数量，slug 与文件名一一对应。
- schema v2 中英文必填字段与枚举合法，所有 `links` 同时提供 `label` 与 `label_en`。
- 每个文件恰好包含 `zh-CN`、`en` 两个正文块，顺序固定且都非空。
- 每个有公开入口的作品恰好有一个 `links[].primary: true`，供首屏直接渲染主 CTA。
- `weight` 唯一性仅做告警，同权重允许按标题稳定排序。
- 每个 locale 正文各有且仅有一个 H1，H2/H3 不跳级。
- 内部 related slug、相对媒体路径、外部 URL 均可解析。
- 首页卡片摘要不超过约定长度，不能包含 Markdown 块元素。
- 金融项目含风险边界；私有项目不出现本机绝对路径和私人内容。
- 中英文中的数字、版本、发布日期、限制和风险声明一致；英文不允许缩成摘要版。
- 正文不得使用“为什么做 / 项目价值 / 结果与状态”作为整站固定模板；标题应直接表达对应产品给用户的利益或变化。

## 7. 后续开放项

- 框架选型后确定 Markdown 解析器、schema 校验库和语法高亮方案。
- 视觉设计开始后确定媒体宽高比、首图与 OG 图生成规则。
- 是否在构建期自动同步 GitHub Stars/Release 信息，需在可靠性、速率限制和内容稳定性之间另行决策。
