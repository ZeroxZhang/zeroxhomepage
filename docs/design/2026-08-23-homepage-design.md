# 首页设计与视觉基线（2026-08-23 采用）

- 日期：2026-08-23
- 状态：已采用（首页首版已按本文档实现并验收）
- 范围：首页英雄区、动效地面、作品集入口、导航、弹层与 Footer 的视觉与行为基线；后续 About / Blog / 作品详情页沿用同一套 token 与动效分级
- 依据：[网站结构设计 PRD](../prd/2026-08-21-site-structure-design.md)、[Hero 10 适配评估](../research/2026-08-21-hero-10-adaptation-assessment.md)、用户 2026-08-22 首页开发需求

## 1. 设计母题：「黑曜石与黄铜」Obsidian & Brass

现代数字 × 古典碑刻。黑曜底色、象牙文字、黄铜点缀、苔绿环境光。

- 底色 `--color-ink: #0A0C09`（近黑、带暖调）；卡片 `#12150F`；描边 `#262A1F`
- 文字 `--color-ivory: #F2EFE4`，次级 `rgba(242,239,228,.62)`
- 点缀 `--color-brass: #D9B45B`（亮 `#EFD38A`、深 `#A68F1F`），用于格言、眉标、计数、主按钮渐变与 hover 光晕
- 环境光 `--color-moss: #7C9476`：继承 Hero 10 的顶部光域构图，绿色调转为苔绿并混入黄铜暖调
- 令牌定义见 `app/globals.css` 的 `@theme`

## 2. 字体系统

| 角色 | 字体 | 载入方式 | 用途 |
| --- | --- | --- | --- |
| 展示 Display | **Cinzel**（400–900） | next/font 自托管 | 主标题「ZEROX ZHANG.」、品牌标识、计数、弹层标题 |
| 格言 Quote | **Instrument Serif**（含 Italic） | next/font 自托管 | 拉丁格言、英文短句 |
| 界面 Sans | **Geist**（400–600） | next/font 自托管 | 正文、按钮、导航、标签 |
| 中文 | 系统衬线栈（Songti SC / Noto Serif CJK SC / SimSun） | 系统字体 | 中文标题与正文；后续如需品牌化再引入自托管中文 webfont |

选 Cinzel 的原因：一世纪罗马碑刻风格的全大写展示字，与拉丁格言同源，主标题从原交付的 Instrument Serif 标题升级为更有纪念碑冲击力的组合（黑体大写 + 黄铜句点 + 暖光 text-shadow）。

## 3. 英雄区文案方案

- 眉标：`官方主页 · OFFICIAL HOMEPAGE`（黄铜、宽字距、两侧菱形）
- 主标题：`ZEROX ZHANG.`（Cinzel 900，clamp(2.8rem,10.5vw,8.4rem)，逐字入场，句点为黄铜色）——满足「这是 Zerox Zhang 的官方地址」的第一眼表达
- 弧形循环文字：`SEMPER NOVARUM RERUM CUPIDUS · 探索永无止境 ·`（TextArc，hover 暂停）
- 格言两层结构：拉丁原文 `Semper novarum rerum cupidus`（黄铜斜体）→ 当前语言释义（中文「探索永无止境。」；英文 `Exploration never ends.`）。
- 格言选型：采用用户提供的 `Semper novarum rerum cupidus`，强调持续探索新事物；不展示未经确认的出处署名。
- 说明段：独立开发者与创作者定位；长期构建 AI Agent 系统与工具、量化投研工具与内容输出系统；首页仅展示近期部分作品并邀请合作者联系。

## 4. 动效地面：Kinetic Grid 替换 Prism Grid

- 采用 OriginKit `kineticgrid`（Canvas 点阵 + 指针吸引 + 网格线 + 光标拖尾），交付文件仅做两处最小适配（`components/originkit/ui/kineticgrid.tsx`）：新增可选 `pointerTarget`（指针监听目标）与 `mapPointer`（屏幕→平面的坐标映射）prop
- 倾斜透视在站点包装层 `components/site/kinetic-floor.tsx` 实现：`perspective:1000px`（origin 50% 50%）容器 + `rotateX(54deg) scale(1.28)`，与 Hero 10 原 Prism Stage 相同的「底部倾斜地面 + 顶部遮罩渐隐」构图；此参数下平面底边恰好投影到容器底边，近端不被裁切
- 配色：点阵象牙 `#F2EFE4`、网格线黄铜 `#D9B45B`、拖尾亮黄铜 `#EFD38A`，spacing 44 / radius 320 / strength 5
- **交互模型（2026-08-23 修订）**，两个真实缺陷的修复：
  1. 指针监听提升到 window 层——此前默认监听地面容器，英雄区中央内容列（`pointer-events-auto`）拦截了可视网格区域的鼠标事件，交互不可感知；
  2. 透视精确逆变换——画布承载 `rotateX` 倾斜后，包围盒线性映射会让光标与点阵错位（看起来"不动"）。现按投影公式 `ly = d·qy / (s·(d·cosθ + qy·sinθ))` 把屏幕坐标反解到点阵平面，点阵吸引与拖尾跟手 1:1。
  验收：Playwright 光标移动后 Canvas 像素哈希显著变化，且亮度变化聚集在光标附近（+10.27），远离区域无变化
- 降级与性能（对照启动计划性能预算）：
  - `prefers-reduced-motion`：仍渲染真实 Kinetic Grid，保留用户驱动的点阵吸引（无自主运动），关闭拖尾
  - IntersectionObserver（threshold 0）+ `document.hidden`：离开视口或切后台即卸载 Canvas，停止 rAF

## 4.1 全页背景网格与英雄区过渡（2026-08-23 增补）

动效网格从英雄区延伸到整页，但强度分层：

- **英雄区**：倾斜透视地面（上文 §4），醒目、高对比；
- **作品区与页脚**：`components/site/background-grid.tsx` 渲染第二个 KineticGrid——固定视口、平面（无倾斜）、低对比度（点阵/网格线/拖尾均半透明）、spacing 56 / radius 240 / strength 4，作为整页背景，仍可交互（window 层监听，容器 `pointer-events:none` 绝不拦截点击）；
- **层级**：背景网格 `z-0`，主内容与页脚 `z-10`，英雄区自身 `isolate` 且背景在底部 13% 渐隐为透明；
- **自然过渡（交叉溶解）**：① 英雄区倾斜地面在自身底部通过 mask 淡出（transparent 0% → black 22%）；② 英雄区背景色在底部渐隐透明；③ 固定背景网格从英雄区底缘透出。两套网格在同一区域此消彼长，无硬边；
- **验收**：接缝上下亮度比 1.48、空白区相邻 10px 带最大亮度跳变仅 2（阈值 5）；作品区光标移动时背景网格 Canvas 哈希显著变化；磁贴点击不受影响。

配套调整：作品区顶部分隔线（border-t）移除，避免在过渡带上制造硬边；英雄区地平线暖光同步在底部淡出。

## 5. 作品集入口：分类 Interactive Grid（9 宫格）

组织方案决策：不按作品逐条平铺 35 张卡（视觉拥挤、无叙事），而是「**8 条分类线索 + 1 个全部作品**」的 3×3 网格（移动端 2 列，全部作品磁贴整行通栏）。分类字典与计数、排序全部来自 `content/works/index.yaml` 与各作品 frontmatter（`lib/works.ts` 服务端加载），组件不复制文案。

- 交互机制改编自 OriginKit `interactive-grid`（交付文件未改）：hover 抬起 + 上下左右邻近联动 + `perspective 1400px / rotateX 3.5°` 微倾 + 黄铜光晕；键盘聚焦等价触发
- 磁贴内容（文字 + 可视化元素，不使用未确定的媒体素材）：分类符号（24px 线框 SVG）→ 计数（Cinzel 黄铜）→ 英文分类名 → 中文分类名 → 前两名代表作品预览（桌面）
- 点击分类 → 弹层列出该分类全部作品（标题 + 一句话定位 + 类型）；点击「全部作品」→ 按分类分组的 35 件清单
- 作品详情页尚未建设，弹层不产生死链；详情页链接待 `/work/<slug>` 落地后接入
- 分类顺序与文案沿用 index.yaml 字典，未做主观重排

## 6. 按钮组与联系弹层

- 英雄区四按钮：GitHub（外链 github.com/ZeroxZhang）、博客（外链 blog.zeroxzhang.cc）、公众号（弹层）、联系我（弹层，主按钮黄铜渐变）
- 邮箱弹层：展示 `shangye_robbie@126.com`，支持复制（剪贴板失败回退 mailto）与直接写邮件
- 公众号弹层：名称 **Zerox在探索** + 黄铜角标框内展示真实二维码图（用户 2026-08-23 提供，430×430 JPEG，存放 `public/wechat/zerox-wechat-qr.jpg`，`next/image` 优化加载）；未提供图时回退为占位框
- 按钮视觉沿用 Hero 10 交付 Button（胶囊、渐变、噪点纹理、hover 沉降），主按钮渐变重着色为黄铜

## 7. 无障碍与降级约定

- 弹层：`role=dialog` + `aria-modal` + `aria-labelledby`，Escape/遮罩关闭，打开时焦点移入、关闭后还原
- 全部动画尊重 `prefers-reduced-motion`（主标题逐字、弧线旋转、网格抬起、弹层入场均降级为即时呈现）
- 焦点可见：全站 `:focus-visible` 黄铜描边；磁贴键盘聚焦与 hover 等价
- 触屏：动效地面支持 touchmove；菜单与弹层均为原生按钮

## 8. 已验证的验收结果（2026-08-23）

- `npm run lint` / `typecheck` / `build` 通过（Next.js 16 + Turbopack，3 条静态路由）
- Playwright 自动化验收 `scripts/qa-homepage.mjs`：**44/44 通过**（1440/768/390 三尺寸：无横向溢出、字体加载、主标题/格言/按钮/9 磁贴、Canvas 动效层、邮箱/公众号/分类/全部弹层交互、移动菜单、/about、零控制台错误；Kinetic Grid 挂载与内容区/地面区光标交互、背景网格挂载/交互/不拦截点击、英雄区→作品区过渡平滑；语言切换：默认中文、切换英文、作品区英文标题、英文按钮/磁贴文案、刷新持久化、切回中文）
- 像素级渲染抽查：底色、标题亮区、环境光与地面点阵均正常；过渡带亮度分布平滑

## 9. 开放项

- ✅ 公众号二维码图（2026-08-23 已提供并接入）
- ✅ 中英语言切换（2026-08-23 已交付，见 §10）
- 作品详情页 `/work/<slug>`（弹层清单届时接链）
- 访问计数器后端（部署平台决策后实现，禁止前端模拟）
- 中文 webfont 自托管评估、OG 图、favicon

## 10. 语言切换（2026-08-23 增补）

- **交互**：右上角两枚等距键帽（OriginKit keycap-button / DesignPass IsometricButton，MIT），「中 / EN」分段式切换，激活键帽黄铜发光、未激活苔绿低光；桌面与移动端导航各渲染一份
- **默认中文**（zh-CN），切换后可切换英文；`useSyncExternalStore` + localStorage 持久化，刷新后保持；`<html lang>` 同步更新；水合期固定中文避免不一致
- **数据流**：界面文案集中在 `lib/i18n.ts`（`copy` 词典 + `pick` 双语字段选择器）；作品字段沿用 content/works 的 `*_en` 双语文案（标题、一句话定位、类型、分类名/描述），语言切换不改变路由与作品 slug（符合内容模型规范）
- **覆盖范围**：导航、英雄区（眉标/格言行/描述/按钮）、作品区（标题/副题/磁贴代表作品/分类弹层清单）、联系弹层（邮箱/公众号文案）、Dialog 无障碍标签、Footer；拉丁格言、主标题「ZEROX ZHANG.」与品牌标识保持双语不敏感
- **无障碍**：键帽内层真实按钮承载键盘操作，aria-label（中文 (Chinese) / 英文 (English)）与 aria-pressed 由组件同步
