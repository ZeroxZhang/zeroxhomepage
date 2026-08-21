# OriginKit Hero 10 整站适配评估

- 调研日期：2026-08-21
- 原型页面：[Hero 10](https://www.originkit.dev/sections/hero-10)
- 状态：起步评估；源码已于 2026-08-21 获取，尚未接入应用
- 范围：判断 Hero 10 能否作为 `zeroxzhang.cc` 的视觉与前端起点；不在本阶段确定最终文案、设计 token 或实现细节

## 一、结论

Hero 10 适合成为本站的**首页首屏原型与视觉母题**，不适合直接当成整站模板。

应保留的是深色背景、绿色光域、点阵/透视网格、衬线大标题、克制的按钮与响应指针的细节动效。必须重做的是信息架构、站点导航、About / Portfolio / Blog / 作品详情、内容卡片、Footer、移动端导航和访问计数器。

当前最匹配的建议技术方向是：**Next.js + TypeScript + Tailwind CSS + Motion/Framer Motion**。这是建议方案，不是已定决策。理由是 Hero 10 页面明确面向 Next.js 与 Tailwind，预览运行时使用 React 与 Framer Motion；本站又需要服务端访问计数器，Next.js Route Handler 可以与前端放在同一工程中。

## 二、已核对的原型构成

### 2.1 视觉语言

- 基底：近黑背景，顶部绿色光域向下衰减。
- 空间：上半部点阵，下半部透视网格，形成“数字地平线”。
- 字体：展示标题使用 Instrument Serif 风格，导航与正文使用 Geist / Inter 风格无衬线字体。
- 构图：桌面端居中大标题、短说明、双 CTA；导航贴近顶部。
- 动效：弧形循环文字、像素闪烁/显现、指针响应的 3D 网格，以及文字逐字入场。

这些元素共同表达“精确、数字化、未来感、克制”，适合个人技术品牌，但 demo 的 AI 企业语义不应保留。

### 2.2 Section 使用的组件

| 组件 | 原型中的作用 | 官方描述中的关键行为 | 本站适配注意 |
| --- | --- | --- | --- |
| Curved Marquee | 标题上方的弧形循环短语 | SVG 曲线路径、循环滚动、指针拖拽与惯性、速度/曲率/边缘淡出可调 | 改成个人品牌短语；触摸拖拽不能阻断页面滚动 |
| Pixel Card | 顶部点阵与像素闪烁层 | Canvas 像素网格，支持自动/hover/进入视口触发，多色、速度和尺寸可调；官方声明支持 `prefers-reduced-motion` | 作为背景层时必须限制 DPR、像素数量和不可见时的计算 |
| Prism Grid | 下半部透视网格 | 指针经过时随机点亮单元格，支持 3D 倾斜、颜色、网格尺寸与边框配置 | 触屏没有 hover，必须提供静态/触摸替代；低性能设备需降级 |

### 2.3 运行依赖与交付形态

- 页面标题和交付入口面向 Next.js + Tailwind。
- 预览运行时可确认使用 React、React DOM 与 Framer Motion。
- 官方集成文档说明：Next.js 交付会在 React 版本上增加 `"use client"`；组件源码落入项目，CLI 可自动安装依赖。
- 当前仓库仍没有 `package.json` 或可运行框架。用户确认希望提前保存源码后，已通过一次 Section 交付将原始文件落地；这不代表技术栈已经定案，也不能直接运行页面。

### 2.4 本地交付状态

- OriginKit CLI：`0.2.23`。
- 已消耗：1 次 `hero-10` Section 交付；没有单独获取 Component。
- 组件源码：`components/originkit/`，共 15 个 TSX 文件与 1 个 Section CSS。
- 静态资产：`public/originkit/hero-10/`，包含 logo、菜单图标和按钮噪点纹理。
- 集成辅助文件：`postcss.config.mjs`、`app/originkit-section-theme.css`、`app/originkit-section-themes.css`。
- 来源与原始哈希：[ORIGIN.md](../../components/originkit/ORIGIN.md) 与 [hero-10.manifest.sha256](../../components/originkit/hero-10.manifest.sha256)。
- 语法检查：全部 15 个 TSX 文件已通过 esbuild 独立解析，入口文件的完整本地 import graph 也能成功打包；仓库中未发现 OriginKit API Key。

源码审计发现的集成事项：

1. 真实代码依赖 `react`、`motion/react` 与 `framer-motion`；CLI 还建议 `gsap`，但当前文件没有 `gsap` import，初始化依赖时不应盲目安装。
2. Section 内部同时使用 `motion` 和 `framer-motion` 两个包，正式接入时应评估是否统一，减少重复依赖。
3. Navbar 的链接没有 `href`，移动菜单按钮没有展开逻辑；两个 CTA 回调也是预览用空实现。
4. 多个文件含重复的 `"use client"`，虽不妨碍解析，但应在本地适配层清理。
5. `pixel-background.tsx` 的 `maskStyle()` 把 Tailwind utility 文本写入 CSS `maskImage`，并未使用传入的 side/stops 生成实际渐变；需要在视觉验收时修正，而不是默认它已正确工作。
6. 字体目前通过 Google Fonts 远程 `@import` 加载，生产方案仍需决定自托管、隐私与性能策略。

## 三、对本站的信息映射

| Hero 10 原位置 | 本站建议内容 | 状态 |
| --- | --- | --- |
| Digup AI 品牌 | Zerox / zeroxzhang.cc 的文字标识或正式 logo | 需用户提供/确认 |
| Product / Solutions / Resources / Pricing | About / Work / Blog / GitHub，微信公众号与 Contact 放入次级入口或菜单 | 待导航定稿 |
| AI Without Limits | 一句可循环的个人品牌关键词，如角色、能力、长期主题 | 需先确定“第一眼记住什么” |
| 主标题 | 一句明确的个人定位或价值主张 | 需用户提供素材后共创 |
| 说明文字 | 1–2 句说明做什么、为谁做、作品覆盖什么 | 需用户提供素材 |
| Explore AI / Contact Sales | 查看作品 / 了解我（或联系我） | 待 CTA 决策 |
| 绿色点阵与透视网格 | 作为整站视觉母题，在不同页面派生为不同密度与运动强度 | 设计系统待定 |

## 四、它没有解决的整站问题

采用 Hero 10 之后仍需单独设计和实现：

1. 全站 Header、移动端菜单、Footer 与路由状态。
2. 首页作品模块，以及 `/work/<slug>` 的通用详情模板。
3. `/about` 的叙事结构与时间线/能力信息。
4. `/blog` 的文章列表、文章详情、分类、SEO、RSS 与站点地图。
5. 图像、视频、封面和作品数据的内容模型。
6. 服务端访问计数器与持久化存储。
7. 404、错误态、空状态、加载态和分享卡片。
8. 无障碍、低动效模式、移动端和低性能设备降级。

## 五、尚未通过的风险检查

### 5.1 响应式未知

OriginKit 的详情页在窄屏下把预览固定为一个 **1600 × 1024** 的桌面画布再缩小显示。它能证明详情页本身有移动布局，但不能证明 Hero 10 的源码在 390px 等真实移动视口下已经完成响应式适配。

因此，在正式采用前必须单独验收 390 / 768 / 1024 / 1440px，特别关注标题换行、导航折叠、双 CTA、曲线文字、触摸手势和网格裁切。

### 5.2 性能预算

首屏同时包含 Canvas 像素、SVG/文字运动、3D 变换与逐字动画。建议将以下约束写进动效规范：

- 只有 Hero 在首屏高强度运行，后续 section 不重复堆叠同级背景动效。
- 页面不可见或动画离开视口时暂停循环。
- `prefers-reduced-motion` 下禁用位移、拖拽惯性、连续闪烁与视差，保留静态构图或淡入。
- 移动端和低性能设备减少网格单元、像素数量与动画频率。
- 动效层不得阻塞主标题、CTA、导航的点击和键盘焦点。

### 5.3 视觉同质化

直接保留 demo 的企业 AI 文案、绿色科技感和标准居中 Hero，会让网站看起来像通用 AI 落地页。本站需要至少一个只属于 Zerox 的“记忆钩子”，优先从以下三处产生：独特的首屏一句话、个人作品素材进入网格、或贯穿页面的品牌符号/光标行为。

## 六、OriginKit 配额与获取策略

2026-08-21 已按用户明确授权执行一次 `hero-10` Section 交付。CLI 自动带回了 Section 所需的 companion 源码与三项资产，因此**不再单独获取 Curved Marquee、Pixel Card 或 Prism Grid**。

后续规则：

- 换文案、颜色、布局、响应式或参数全部修改本地源码，不再次请求同一 Section。
- `list`、`search` 可用于未来筛选，但任何新的 live delivery 都应先确认确实需要。
- 组件的本地路径、来源、取得日期与初始哈希已经记录；后续修改通过 Git 追踪。
- 不将取得的组件整理成可对外分发的模板、starter 或组件库。

## 七、授权结论

OriginKit 当前 [Licensing & Usage](https://www.originkit.dev/docs/licensing) 明确允许：

- 在自有或商业项目中使用和修改组件，无需署名。
- 通过 MCP 获得的组件与其他入口适用同一授权。
- 在真实开源应用或网站中包含修改后的组件。
- 合法取得后，在对应项目中的使用权是永久的。

明确不允许：

- 镜像或再发布 OriginKit 目录。
- 把组件作为模板、主题、starter、组件包或设计资产对外分发。
- 用自己的 API、MCP、产品或 Agent 对外提供 OriginKit 目录。

预览中的字体、图片与图标不自动包含在组件授权中，正式实现时需逐项记录第三方许可证。

## 八、起步建议

先做内容和设计基线，再拉源码：

1. 回答本站希望访客第一眼记住的一句话或感受。
2. 准备 Hero 文案、身份/角色、项目清单、个人素材和全部真实链接。
3. 以 Hero 10 为母题完成整站设计系统，而不是只设计首屏。
4. 确认 Next.js + Vercel 是否作为默认技术/部署组合。
5. 建好最小项目骨架和页面路由后，接入已经保存在 `components/originkit/` 的本地 Hero 10，不再访问 OriginKit 获取同一源码。

具体顺序见 [网站启动计划](../plans/2026-08-21-website-kickoff-plan.md)。
