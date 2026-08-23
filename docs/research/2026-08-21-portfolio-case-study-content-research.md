# 作品介绍页内容研究（历史版本）

> 2026-08-22 更新：本文形成的“项目案例 / 开发复盘”写法不再作为正式作品页的写作标准。面向市场的新版逻辑见 [`2026-08-22-market-facing-product-page-copy-research.md`](./2026-08-22-market-facing-product-page-copy-research.md)。本文仅保留早期事实核验与来源记录。

- 调研日期：2026-08-21
- 调研目标：为 35 个个人作品建立统一、有层级、可验证且可被未来前端结构化消费的介绍页内容体系。
- 原始材料：`docs/raw/personal_projects/`（只读）
- 状态：已完成（2026-08-22 收口）

## 关键问题

1. 顶级产品介绍页如何在首屏、叙事、证据、功能与技术深度之间建立层级？
2. 面对 Skill、桌面应用、Web 产品、量化系统、教育内容和本地系统等不同作品，哪些字段应统一，哪些应按类型扩展？
3. 如何从原始仓库和线上项目核验事实，避免把推断写成成果？
4. 在前端框架尚未确定时，内容应采用什么目录与数据契约，才能兼顾可读性、可维护性和后续构建？

## 预期输出

- 顶级产品/案例介绍页的方法结论与来源。
- 统一内容模型、层级规则和文案风格约束。
- 35 个作品的结构化介绍页正文。
- 内容索引、维护说明与前端适配建议。

## 发现

### 第 1 轮：产品页与案例页的一手样本

1. **首屏只回答一个判断题。** Linear、Stripe Payments 与 Notion 都在首屏用“产品类别 + 核心结果/场景”完成定位，再给出 1—2 个主要行动入口；它们没有在第一屏罗列全部功能。
2. **先给读者一张“重点地图”。** Apple 在完整展开参数前先提供 highlights；Linear 先用 purpose-built / agents / speed 三个原则定义产品，再按 Intake → Plan → Build → Review → Monitor 的真实工作流展开。对作品集而言，首屏后应先给 3 个关键看点或一条工作流，而不是直接进入技术栈。
3. **功能必须落到具体行为或场景。** Stripe 直接把可操作的支付界面放进页面；Notion 用“收集知识、找到答案、自动推进工作”三个任务结果组织能力。作品介绍中的功能描述应采用“场景/动作 → 机制 → 结果”，不能只写抽象名词。
4. **证据靠前，细节后置。** Notion 在主叙事之前展示采用度；Vercel 的 Speechify 案例在开头先列页面规模、成本下降、故障影响三个结果，再讲背景、风险与架构。个人项目没有业务数据时，可以用 Star、版本、公开 Demo、自包含交付、已上线状态或可复现质量门作为证据，但必须标注核验时间。
5. **顶级案例页写“冲突与取舍”，不只写成功。** Speechify 案例用安全事故、动态页面成本和快速发布风险作为三段冲突，每段再解释方案与结果。这比平铺功能更能说明作者为何做出某项设计。
6. **技术深度采用渐进披露。** Apple 先讲用户结果，再在后段展开芯片、续航、连接、安全与环境；Stripe 先讲增长结果，再分别展开支付方式、优化、集成和定价。作品集正文也应先服务非技术读者，再把架构、流水线与质量门放进后半段。

### 本轮对统一内容模型的直接约束

- L1（首页卡片/首屏）：作品名、类别、结果导向的一句话、主链接。
- L2（快速理解）：起点/问题、核心洞察、3 个关键设计、公开证据。
- L3（深度阅读）：工作流或架构、关键取舍、限制与当前状态、相关项目。
- 同一大结构允许三种内容密度：`flagship`、`standard`、`compact`；差别只在段落深度，不改变字段语义和章节顺序。

### 第 2 轮：内容层级与可访问性

1. W3C WAI 将标题结构视为内容组织本身，而不只是视觉样式：标题要准确概括后续内容、按层级嵌套，并允许读者和辅助技术把标题列表当作页面目录。
2. 因此，作品正文只保留一个 H1（作品名），固定章节用 H2，章节内部的能力/取舍用 H3；不得靠加粗段落伪装标题，也不得跳级。
3. 标题要用读者能判断内容的语义短语，例如“为什么要做”“关键设计”“如何实现”“结果与状态”，避免“更多”“亮点”等脱离上下文的空标题。
4. 移动端即使折叠部分深度内容，也要保持与桌面端相同的语义顺序；内容源不为响应式布局复制两套正文。

### 第 3 轮：内容与未来前端的边界

1. Next.js 官方文档确认 Markdown/MDX 可作为本地内容源并转成结构化 HTML，也能通过动态路由生成作品详情页；但其内置 MDX 对 YAML frontmatter 不做默认解析，需要后续选定解析器或构建层。
2. 为避免在框架未定时把内容锁进 React，当前内容源应使用 **纯 Markdown + YAML frontmatter**，正文内不写 JSX、不导入组件、不放布局类名；交互演示、图库和视频只在 frontmatter 中登记媒体引用，渲染权交给前端。
3. 首页卡片、SEO、筛选与排序依赖 frontmatter；详情页长文依赖 Markdown AST。这样同一份内容既能被 Next.js、Astro、Hugo 等常见构建链消费，也能在 GitHub 直接阅读。
4. 内容层需要版本字段与事实核验日期。Stars、版本号、在线状态等易变数据不应散落在叙事段落中，而应集中到可校验字段，或仅写“已有社区采用/已上线”等稳定事实。

### 阶段摘要（第 3 轮）

- 统一模板不等于统一篇幅：所有作品共享相同语义章节，重点项目加深“冲突—取舍—证据”，小项目保持紧凑。
- 页面阅读顺序固定为：**一句话判断 → 问题/起点 → 核心解法 → 关键设计 → 实现与取舍 → 结果/状态 → 项目入口**。
- 内容源坚持框架无关；视觉层可以决定哪些章节变成横向卡片、时间线、架构图或折叠面板，但不能反向污染文案源。
- 每项可验证声明都应能回到原始材料、官方仓库、线上产品或本地系统快照；无法核实的商业成效和主观“最好/完美”表述不进入正式正文。

### 第 4 轮：35 个项目的一手事实核验

1. **数量口径修正。** 原始梳理把 `zerox-agent` 单独置顶，后续项目又从 1 编到 34；真实唯一作品数为 35。正式注册表以 `content/works/index.yaml` 为准，原始材料保持只读。
2. **GitHub 更新时间需要重新解释。** 多个原始条目把 API 的 `updated_at` 当作代码更新时间，但社区活动也会改变它。正式内容不再把这一字段写成“最近开发”；如未来展示活跃度，应优先用 latest commit / `pushed_at` 并注明口径。
3. **公开证据强度不均。** `zerox-agent` 有 Release 与成功验证工作流；`onepager` 有成功 CI 和示例产物；两套源码课程、SonoQuest、职场方法论及多项 Web 产品有可访问在线页面。多数小型 Skill 没有测试、CI 或 Release，因此只写已核验规则和代码结构。
4. **金融项目没有公开业绩证据。** 五项量化/投研工具均未发现可独立核验的实盘收益或稳定胜率。正式文案统一定位为研究、筛选、检查或决策辅助，并明确不构成投资建议。
5. **原型边界必须可见。** `end-of-day-picker` 的 live 板块映射与部分 fallback 仍有缺口；`arch_diagram` 最新公开 CI 失败；`concept-bridge` 没有 embedding/向量计算；`过敏原地图` 当前颜色强度使用随机示意数据。这些项目均按原型或受限工具表述。
6. **开源归属必须澄清。** `hottrend` 是 `sansan0/TrendRadar` 的一次性导入与部署实践，不能把上游功能、品牌和社区成果算作个人原创；正式页面显著署名上游并标为 `legacy` 集成实践。
7. **“本地优先”不等于“完全离线”。** Zerox Agent 与 DeepSeek Harness App 会把模型请求发送给用户选择的供应商；X Card 等静态工具也可能从 CDN 加载导出库。正文分别说明本地持久化与网络边界。
8. **私有系统只展示脱敏证据。** IO System 可公开架构、规则和汇总快照，但不得展示真实标题、来源、正文、账号、本机路径或其他个人信息。

### 第 5 轮：案例页结构补充

对 Linear × OpenAI、Stripe × Anthropic、Vercel、Figma 与 ustwo 官方案例的比较进一步确认：成熟案例页通常使用“结果标题 → 证据条 → 旧状态/冲突 → 机制与取舍 → 结果 → 限制/下一步”，并让截图或架构图承担证据，而不是装饰。

迁移到本作品集后的规则：

- 每个作品只保留一个核心命题；首页卡片不承载完整功能表。
- 有真实数字时写清时间、来源和口径；没有数字时使用 Release、CI、Demo、公开状态、文件结构等事实。
- 长页面未来提供目录；每张媒体都需要回答“这张图证明什么”。
- 建议前端显示证据标签：`Live verified`、`Source inspected`、`Local only`、`Product claim`，区分实测、源码核验、私有快照和产品自述。

## 来源列表

| 来源 | URL | 发布日期/访问日期 | 可信度 |
| --- | --- | --- | --- |
| Linear 产品首页 | https://linear.app/ | 访问于 2026-08-21 | 高（产品官方一手页面） |
| Stripe Payments | https://stripe.com/payments | 访问于 2026-08-21 | 高（产品官方一手页面） |
| Notion Product | https://www.notion.com/product | 访问于 2026-08-21 | 高（产品官方一手页面） |
| Apple MacBook Pro | https://www.apple.com/macbook-pro/ | 访问于 2026-08-21 | 高（产品官方一手页面） |
| Vercel × Speechify 客户案例 | https://vercel.com/customers/how-speechify-serves-50000-dynamic-pages-to-60-million-users-on-vercel | 2026-07-15 | 高（供应商官方案例；量化结果来自受访客户，仍需视为案例口径） |
| W3C WAI Page Structure Tutorial | https://www.w3.org/WAI/tutorials/page-structure/ | 更新于 2026-04-08 | 高（Web 标准组织） |
| W3C WAI Headings Tutorial | https://www.w3.org/WAI/tutorials/page-structure/headings/ | 更新于 2017-05-04 | 高（Web 标准组织） |
| W3C WAI Writing for Web Accessibility | https://www.w3.org/WAI/tips/writing/ | 访问于 2026-08-21 | 高（Web 标准组织） |
| Next.js 官方 MDX 指南 | https://nextjs.org/docs/app/guides/mdx | 更新于 2026-02-27 | 高（框架官方文档） |
| Next.js 官方动态路由/页面指南 | https://nextjs.org/docs/app/getting-started/layouts-and-pages | 更新于 2026-03-25 | 高（框架官方文档） |
| Linear × OpenAI | https://linear.app/customers/openai | 访问于 2026-08-21 | 高（官方客户案例） |
| Stripe × Anthropic | https://stripe.com/customers/anthropic | 访问于 2026-08-21 | 高（官方客户案例） |
| Vercel × General Intelligence | https://vercel.com/customers/how-general-intelligence-used-agents-to-build-an-agent-platform-on-vercel | 访问于 2026-08-21 | 高（官方客户案例） |
| Figma × Plaid | https://www.figma.com/customers/from-silos-to-speed-how-plaid-unified-product-and-brand-design-in-figma/ | 访问于 2026-08-21 | 高（官方客户案例） |
| ustwo × iShares | https://ustwo.com/work/ishares/ | 访问于 2026-08-21 | 高（设计方官方案例） |
| Zerox Agent 仓库/Release | https://github.com/ZeroxZhang/zerox-agent | 核验于 2026-08-21 | 高（个人官方仓库） |
| huashu-bookwriter 仓库 | https://github.com/ZeroxZhang/huashu-bookwriter | 核验于 2026-08-21 | 高（个人官方仓库） |
| OnePager 仓库 | https://github.com/ZeroxZhang/onepager | 核验于 2026-08-21 | 高（个人官方仓库） |
| 量化项目仓库集合 | https://github.com/ZeroxZhang?tab=repositories | 核验于 2026-08-21 | 高（个人官方仓库；具体仓库链接已进入对应内容文件） |
| 灵眸 | https://zrcfzy.top/ | 用户于 2026-08-23 确认为现行官网 | 中高（官网地址来自项目所有者；认证与真实分析未端到端测试） |
| SILENZIO | https://silenzio.cn | 核验于 2026-08-21 | 中高（公开产品页实测；真实转录未测试） |
| Z-Slides | https://slides.zeroxzhang.cc | 核验于 2026-08-21 | 中高（公开产品页实测；真实模型生成未测试） |
| 过敏原地图 | https://github.com/ZeroxZhang/algmap | 核验于 2026-08-21 | 高（源码一手证据，确认随机示意数据） |
| TrendRadar 上游 | https://github.com/sansan0/TrendRadar | 核验于 2026-08-21 | 高（上游官方仓库） |

## 调研结论

### 关键事实

1. 正式内容范围是 35 个唯一作品，每个作品都有独立 Markdown 详情页；同一语义结构按 `flagship`、`featured`、`standard`、`compact` 控制深度。
2. 内容层采用纯 Markdown + YAML frontmatter，首页卡片、筛选、SEO、路由和详情页共享同一事实源；框架适配规则另见 `docs/specs/2026-08-21-portfolio-content-model.md`。
3. 作品的可信度不能依赖统一营销语气。Release、CI、在线 Demo、源码、私有快照和产品声明必须被区分，限制与失败状态也属于案例内容。
4. 作品主线可归纳为：可信 Agent 运行时、内容与出版自动化、可验证视觉生成、量化研究与风控、互动知识传播、已上线产品、个人内容基础设施。

### 待确认问题

- 用户本人在每个团队型/线上项目中的具体角色、投入周期和协作者边界，目前原始材料不足，正式正文没有自行编造。
- 各作品首图、流程图、截图、视频与用户反馈尚未进入内容源；应在视觉设计阶段按证据目的补齐。
- SILENZIO 的音频/文本保存与删除规则、Z-Slides 的 BYOK 密钥处理、灵眸的数据来源和回测口径，需要产品侧补充后才能写更强证明。
- 过敏原地图需替换为可追溯数据并公开方法，才适合从“探索原型”升级为健康信息产品。
- 前端框架确定后再选择 Markdown 解析器与 schema 校验库，不在内容阶段提前锁定。

### 写作建议

- 继续维护“一个项目一个核心命题”，功能只选择能支撑命题的 3—5 项。
- 版本、Stars、测试数与数据规模等动态事实更新时同步修改 `facts_as_of`。
- 优先补充“做出什么取舍、失败过什么、怎样验证”，而不是继续增加形容词。
- 首页只消费 `title`、`tagline`、`summary`、`category`、`level`、主链接；详情页再渐进展开技术与限制。
