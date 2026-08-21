# 个人 AI 项目梳理

> GitHub：https://github.com/ZeroxZhang  
> 梳理时间：2026-08-19

---

## 排序说明

- **明星项目**：zerox-agent 单独拎出，作为核心代表作置顶展示
- **主维度：应用场景 / 项目类型** — 其余项目按解决的问题和所属领域分组
- **次维度：GitHub Stars** — 每组内按社区认可度降序
- **标签**：`[Skill]` 表示以 AI Agent Skill 形式发布，可安装到 Claude Code / OpenClaw / Trae 等框架
- **本地项目**：未发布到 GitHub 的本地系统，单独成章置于末尾

---

## 项目全景

| 分类 | 项目数 | 代表项目 |
|------|--------|----------|
| ★ 明星项目 | 1 | zerox-agent |
| AI 内容创作与出版 | 6 | huashu-bookwriter、md2book、paper-to-course |
| AI 可视化与设计 | 6 | flowchart-generator-skill、onepager、concept_bridge |
| A 股量化投资全链路 | 5 | end-of-day-picker、a-share-tailpicker、invest-signal-kit |
| 教育与知识传播 | 5 | zerox-agent-course、nanobot-course、sonoquest、really |
| 实用工具 | 5 | deepseek-harness-app、hottrend、pdf-watermark-remover |
| 已上线网站与 SaaS | 6+ | 灵眸、Silenzio、Z-Slides、过敏原地图 |
| 本地个人系统 | 1 | IO System |

---

## ★ 明星项目

### zerox-agent — 通用桌面端智能体

- **仓库**：https://github.com/ZeroxZhang/zerox-agent
- **创建时间**：2026-06-07
- **语言**：TypeScript（Electron + React + Vite + SQLite）
- **当前版本**：v3.9.1
- **最近更新**：2026-08-16（**最活跃项目**）
- **定位**：local-first 通用桌面端智能体 —— 面向任意复杂任务，把一句话变成一次可追踪、受权限约束、可恢复的智能体运行。

#### 核心能力

**规划与执行**
- Goal Mode（Direct / Debate 方法）：结构化规划 + 独立评审 + 质量门禁
- 父子多智能体会话（权限继承）
- 自动任务调度：每日 / 工作日 / 每周 / 间隔执行
- 自定义技能加载

**安全与可控**
- 安全沙箱：所有工具经主进程授权层，工作区限制文件路径 / 网络域 / Shell 访问
- 受控权限、可见过程、可恢复状态、有证据的完成判断
- 任务记录：运行结果、失败原因、轨迹、工具、检查点

**数据与存储**
- 统一存储：SQLite 作为运行时权威，目标 / 记忆 / 检查点统一本地数据库
- Token 与上下文管理：自动管理模型上下文窗口，确保系统指令和工具 Schema 在预算内
- Local-first：数据不离开本机

**广泛的 LLM 兼容性**
- 20+ 供应商：OpenAI、Anthropic、Gemini、Bedrock、Vertex AI、智谱GLM、DeepSeek、Kimi、MiniMax、通义千问、xAI、Mistral、Together AI、Fireworks AI、OpenRouter、Ollama 等
- 自定义兼容端点

#### 项目价值

zerox-agent 是目前投入最大、更新最频繁的项目，体现了 **AI Agent 全栈能力**：作为通用桌面端智能体，它向下打通底层运行时（Electron + Node.js 22 LTS + SQLite），向上承载任意领域的任务规划与执行（React + Goal Mode 规划协议）——从单智能体执行到多智能体协作，从本地沙箱到 20+ LLM 供应商的统一接入。

#### 配套生态

| 项目 | 说明 |
|------|------|
| [zerox-agent-course](https://github.com/ZeroxZhang/zerox-agent-course) | Zerox Agent 源码交互式教程 |
| [nanobot-course](https://github.com/ZeroxZhang/nanobot-course) | nanobot AI Agent 框架内部架构中文教程 |
| [llm-space](https://github.com/ZeroxZhang/llm-space) | fork of deer-flow/llm-space，用于原型验证 Agent 想法、检查每个 harness 步骤 |

---

## 一、AI 内容创作与出版

> 覆盖书籍、文档、教程、报纸等多种内容形态的 AI 辅助创作。从写作方法论逆向工程到出版级排版。

### 1. huashu-bookwriter ⭐154 `[Skill]`
- **仓库**：https://github.com/ZeroxZhang/huashu-bookwriter
- **创建时间**：2026-04-10
- **语言**：Python 3.8+
- **最近更新**：2026-08-16
- **项目简介**：自动化技术书籍生成框架，逆向工程了某位中文技术作者的出版方法论，转化为 AI 驱动的写作 Skill。**Stars 最高的个人项目。**
- **核心能力**：
  - 3 种书籍格式蓝图（从入门到精通、橙皮书、快速指南）
  - 3 种章节模板（概念讲解型、实战教程型、深度分析型）
  - 严格的风格 DNA：短句、第一人称、精确数字引用、禁用特定过渡词
  - 自动化质量检查清单（单章 + 全局）
  - PDF 导出（Pandoc + XeLaTeX）、多 Agent 协作编排

### 2. md2book ⭐60 `[独立工具]`
- **仓库**：https://github.com/ZeroxZhang/md2book
- **创建时间**：2026-04-10
- **语言**：JavaScript (Node.js + Playwright)
- **最近更新**：2026-07-15
- **项目简介**：将 Markdown 转换为高质量排版 PDF 电子书。
- **核心能力**：
  - 智能分页、自动生成目录、精美封面渲染
  - 3 款视觉主题：minimal / academic / playful
  - 完整 GFM 支持（代码高亮、Callout 提示框）
  - 中文字体与间距专项优化

### 3. paper-to-course ⭐6 `[Skill]`
- **仓库**：https://github.com/ZeroxZhang/paper-to-course
- **创建时间**：2026-05-10
- **语言**：HTML / CSS / JavaScript（零依赖）
- **最近更新**：2026-05-25
- **项目简介**：将学术论文 PDF 或 arXiv 链接转化为自包含的交互式 HTML 教程。
- **核心能力**：
  - 5 阶段流水线：深度阅读→知识扩展→课程设计→构建→评审
  - 18 种交互元素：逐步数学推导（KaTeX）、伪代码逐行高亮、研究谱系树、拖拽练习、选择题测验、双语术语表浮窗等
  - 面向"好奇的从业者"：直觉先于形式、背景先于贡献
  - 浏览器直接打开，无需构建工具
- **项目价值**：已有社区 fork（KaguraTart/paper-to-course）

### 4. newspaper-demo `[Skill]`
- **仓库**：https://github.com/ZeroxZhang/newspaper-demo
- **创建时间**：2026-03-17
- **最近更新**：2026-03-18
- **项目简介**：AI Agent Skill，生成复古报纸版式的完整自包含 HTML 页面。
- **核心能力**：
  - 严格 4:3 比例 + 多栏文本布局，还原真实印刷美学
  - 乳白色背景 + 微妙纸张纹理
  - 数据可视化和流程图用纯 HTML/CSS/SVG 构建
  - 单文件输出：所有 CSS/脚本内联

### 5. md2pdf_v2 `[Skill]`
- **仓库**：https://github.com/ZeroxZhang/md2pdf_v2
- **创建时间**：2026-04-14
- **语言**：Python（唯一外部依赖 reportlab）
- **最近更新**：2026-04-14
- **项目简介**：AI Agent Skill，告诉 AI 助手"转 PDF"即可得到出版级文档。
- **核心能力**：
  - 一个 Python 文件、零配置、零模板
  - 处理所有 CJK/Latin 边缘情况
  - 交互式工作流：AI 询问设计风格、扉页、水印、封底
  - 10 种视觉主题、跨 OS 自动检测系统字体

### 6. editor — 启发式审稿助手 `[Skill]`
- **仓库**：https://github.com/ZeroxZhang/editor
- **创建时间**：2026-04-30
- **最近更新**：2026-04-30
- **项目简介**：Claude Code 启发式审稿 Skill，通过结构化工作流评估草稿。
- **核心能力**：
  - 5 步审稿：苏格拉底式提问 + 并行子 Agent 评估
  - "冷读"检查 + "AI 味扫描"
  - 支持自定义画像和平台规则（Twitter/微信/小红书）
  - 草稿自动版本化

---

## 二、AI 可视化与设计

> 流程图、架构图、信息图、卡片——将抽象信息转化为视觉表达。

### 7. flowchart-generator-skill ⭐38 `[Skill]`
- **仓库**：https://github.com/ZeroxZhang/flowchart-generator-skill
- **创建时间**：2026-03-11
- **语言**：Python
- **最近更新**：2026-07-30
- **项目简介**：用自然语言生成干净、样式化的 SVG 流程图。**原创最高星 Skill 项目。**
- **核心能力**：
  - 接受段落、列表、伪代码、粗略笔记等自然语言输入
  - 6 阶段流水线：输入分析→内容优化→结构分解→文本线框(ASCII)→视觉设计→SVG 生成
  - 结构化中间输出（JSON + ASCII 线框），可验证后再渲染
  - 中英双语支持
  - 兼容 OpenClaw、Claude Code、OpenCode、Cursor、Trae 等框架

### 8. onepager ⭐11 `[Skill]`
- **仓库**：https://github.com/ZeroxZhang/onepager
- **创建时间**：2026-03-20
- **语言**：HTML / Python + Playwright
- **最近更新**：2026-08-08
- **项目简介**：将文本/Markdown/PDF 转化为单页视觉信息图（OnePage 海报）。
- **核心能力**：
  - 4 种尺寸（竖屏滚动 / 16:9 横屏 / 1:1 方屏 / 3:4 竖屏，适配小红书/微信）
  - 9 种设计风格，各含中文专用字体配对
  - 3 档信息密度，自动内容改写适配布局
  - 咨询框架：MECE、金字塔原理、SCQA 重构输入
  - 双层质量检查：静态契约验证 + Playwright 渲染几何检查
  - 可复现构建：蓝图持久化、SHA-256 哈希

### 9. arch_diagram ⭐2 `[Skill]`
- **仓库**：https://github.com/ZeroxZhang/arch_diagram
- **创建时间**：2026-04-14
- **语言**：HTML / SVG / Python
- **最近更新**：2026-08-08
- **项目简介**：专业架构图生成器，输出自包含 HTML + SVG。
- **核心能力**：
  - 双主题（亮/暗），按组件类型语义化配色
  - 泳道/分层支持（接入层/应用层/数据层）
  - 演示模式（16:9 适配幻灯片）
  - 确定性布局流水线：文本尺寸→排序→通道打包→端口分配→避障正交路由→标签放置→动态 viewBox
  - 运行时独立：输出文件离线可用

### 10. concept_bridge — 概念之桥 `[Web 应用]`
- **仓库**：https://github.com/ZeroxZhang/concept_bridge
- **创建时间**：2026-05-15
- **语言**：TypeScript（Next.js 15 + React 19 + Three.js）
- **最近更新**：2026-05-15
- **在线 Demo**：concept-bridge-three.vercel.app
- **项目简介**：在 3D 环境中可视化概念之间的语义与向量空间关系。
- **核心能力**：
  - 概念桥接：输入两个概念 → LLM 生成中间概念连接路径 → 3D 渲染
  - 无限扩展：点击任意节点触发 LLM 查询子概念
  - 科幻视觉：动态宇宙星空背景、节点为旋转 3D 粒子云
  - 物理引擎：力导向图 + 悬停 AI 生成定义

### 11. text_card_generator — 阅读卡片生成器 `[Web 应用]`
- **仓库**：https://github.com/ZeroxZhang/text_card_generator
- **创建时间**：2026-01-05
- **语言**：TypeScript（React + Vite + Tailwind + Zustand）
- **最近更新**：2026-01-05
- **项目简介**：将文字转化为美观图片卡片。
- **核心能力**：
  - "便利贴"美学：折角效果 + 多种纸张背景
  - 14+ 款 Google Fonts 中文字体 + 拼音自动转换
  - 4 倍超高清 PNG 导出

### 12. x_card — X 风格卡片生成器 v2 `[Web 应用]`
- **仓库**：https://github.com/ZeroxZhang/x_card
- **创建时间**：2026-07-24
- **语言**：HTML / CSS / JavaScript
- **最近更新**：2026-08-06
- **项目简介**：X (Twitter) 风格帖子卡片生成器。
- **核心能力**：
  - 隐私优先（数据仅本地处理）
  - 认证标识、浅色/深色主题、2x/3x 清晰度 PNG 导出

---

## 三、A 股量化投资全链路

> 个人量化投研工具链，覆盖**选股→风控→信号验证→分析→决策平台**完整闭环。

### 13. end-of-day-picker `[Python 系统]`
- **仓库**：https://github.com/ZeroxZhang/end-of-day-picker
- **创建时间**：2026-06-01
- **语言**：Python 3.9+（akshare/pandas/numpy）
- **最近更新**：2026-06-01
- **项目简介**：A 股尾盘自动化选股系统，14:30–14:55 运行，基于 V3 七层漏斗量化方法论。
- **核心能力**：
  - 七层漏斗：从 ~5000 只标的逐步筛选至最多 5 只
  - 3-4 个独立免费 API 冗余数据获取
  - 动态阈值：基于个股 60 日历史表现百分位
  - 四条件投票市场环境分类器（牛市/震荡/熊市）
  - 紧急熔断 + 二次验证 + 7 级梯度卖出矩阵

### 14. a-share-tailpicker `[Skill]`
- **仓库**：https://github.com/ZeroxZhang/a-share-tailpicker
- **创建时间**：2026-06-02
- **语言**：Python 3
- **最近更新**：2026-06-29
- **项目简介**：命令行 A 股尾盘筛选 Skill，C 版尾盘交易方法论自动化。
- **核心能力**：
  - 仅筛选沪市主板"60"系列
  - 多因子评分：日内价格形态、量价、资金流、均线、板块共振、交叉验证
  - 两阶段工作流：14:20 预选 → 14:50 最终确认
  - 次日退出回测（保守成交模型 + 显式成本）
  - 组合级风控：行业集中度限制、熊市收紧

### 15. invest-signal-kit `[Python + Web]`
- **仓库**：https://github.com/ZeroxZhang/invest-signal-kit
- **创建时间**：2026-05-23
- **语言**：Python 标准库（零外部依赖）+ 静态 HTML
- **最近更新**：2026-05-25
- **项目简介**：本地隐私优先的 A 股/ETF 投资检查助手。**仅提供风险检查，不提供投资建议。**
- **核心能力**：
  - 买前检查 + 持仓体检
  - 标记：集中度风险、亏损接近风险线、理由漂移
  - 检查记录仅存浏览器 localStorage
  - 内置本地服务：`python3 -m invest_signal_kit serve --port 8765`

### 16. stock-fund-analyzer `[Skill]`
- **仓库**：https://github.com/ZeroxZhang/stock-fund-analyzer
- **创建时间**：2026-03-28
- **语言**：Python（yfinance/akshare/pandas/numpy）
- **最近更新**：2026-03-28
- **项目简介**：融合价值投资与技术分析评估股票与基金。
- **核心能力**：
  - 价值投资：Graham Number + DCF + 护城河 + 周期评估
  - 技术分析：道氏理论 + 艾略特波浪 + CAN SLIM
  - 加权公允价值区间 → 投资备忘录（Buy/Hold/Sell）

### 17. etf-analyzer ⭐2 `[Skill]`
- **仓库**：https://github.com/ZeroxZhang/etf-analyzer
- **创建时间**：2026-05-13
- **语言**：Python
- **最近更新**：2026-05-20
- **项目简介**：ETF 分析 Skill，辅助 ETF 投资决策。

---

## 四、教育与知识传播

> 将知识转化为可交互、可学习的形态——源码教程、游戏化学习、财商教育、思维方法论。

### 18. zerox-agent-course `[HTML 互动教程]`
- **仓库**：https://github.com/ZeroxZhang/zerox-agent-course
- **创建时间**：2026-07-13
- **语言**：HTML / CSS / JavaScript / Shell
- **最近更新**：2026-07-13
- **项目简介**：Zerox Agent 源码交互式教程（zerox-agent 配套项目）。

### 19. nanobot-course `[HTML 互动教程]`
- **仓库**：https://github.com/ZeroxZhang/nanobot-course
- **创建时间**：2026-07-13
- **语言**：HTML / CSS / JavaScript
- **最近更新**：2026-07-13
- **项目简介**：中文交互式教程，讲解 nanobot AI Agent 框架内部架构。
- **核心能力**：代码翻译练习、数据流动画、拖拽匹配、群聊模拟、测验、Bug 狩猎挑战。

### 20. sonoquest-ultrasound-play-lab `[Web 游戏]`
- **仓库**：https://github.com/ZeroxZhang/sonoquest-ultrasound-play-lab
- **创建时间**：2026-07-21
- **语言**：TypeScript（Next.js + Vite + Drizzle）
- **最近更新**：2026-07-21
- **在线体验**：https://zeroxzhang.github.io/sonoquest-ultrasound-play-lab/
- **项目简介**：家庭向高保真超声探索游戏，模拟医学扫描 Web 应用。
- **核心能力**：
  - 目标选择：手动或随机生成（微生物/寄生虫/零食等）
  - 探头机制：圆形范围标记 + 旋转波束 + 同心距离环
  - 调节：信号增强、扫描深度、对比度范围
  - 工具：暂停图像、测量、拍照、生成趣味诊断文档

### 21. money_education_whitebook — 财商教育白皮书 `[文档]`
- **仓库**：https://github.com/ZeroxZhang/money_education_whitebook
- **创建时间**：2026-07-05
- **最近更新**：2026-07-05
- **项目简介**：金融素养教育系统化文档。
- **核心能力**：多章节 Markdown、多格式版本（MD/DOCX/HTML 电子书）、SVG 配图、Agent 生成版本。

### 22. really ⭐3 `[Skill]`
- **仓库**：https://github.com/ZeroxZhang/really
- **创建时间**：2026-04-22
- **语言**：Markdown（纯 Prompt 工程）
- **最近更新**：2026-04-26
- **项目简介**：跨学科深度诊断 Agent Skill。Slogan：帮你判断"你的问题是否真的是个问题"。
- **核心能力**：
  - 10 学科诊断：5 个必选镜头（心理学、社会学、哲学、营销学、管理学）+ 5 个条件触发（经济学、复杂科学、人类学&符号学、决策科学、认知神经科学）
  - 40+ 框架，每个从 5 个维度分析
  - 适用场景：创业决策、职业困境、关系冲突、产品定位、系统性卡点

---

## 五、实用工具

> 解决具体痛点的小而美工具，以及提升 Agent 可达性的包装工具。

### 23. deepseek-harness-app ⭐2 `[macOS 原生应用]`
- **仓库**：https://github.com/ZeroxZhang/deepseek-harness-app
- **创建时间**：2026-08-13
- **语言**：Swift / Objective-C
- **最近更新**：2026-08-13
- **项目简介**：原生 macOS 应用，封装 DeepSeek Harness（AI 编程助手框架），省去 Node.js 22+、pnpm、克隆仓库等部署复杂度。
- **核心能力**：
  - 零配置启动：双击即可运行，所有依赖打包在 ~1.5GB 内
  - 原生 macOS 窗口体验（非浏览器）
  - BYOK（自带 Key）：设置面板配置 API Key
  - 本地数据存储：`~/.dsh/`，无外部上传
  - 仅 Apple Silicon，macOS 14.0+

### 24. epub-pdf_2_txt_converter ⭐5 `[Python GUI]`
- **仓库**：https://github.com/ZeroxZhang/epub-pdf_2_txt_converter
- **创建时间**：2025-02-16
- **最近更新**：2025-02-16
- **项目简介**：PDF / EPUB 转 TXT 工具。
- **核心能力**：单文件 / 批量文件夹转换、自动保持段落结构、简洁 GUI + 实时进度。

### 25. hottrend — TrendRadar `[Python 系统]`
- **仓库**：https://github.com/ZeroxZhang/hottrend
- **创建时间**：2025-12-29
- **语言**：Python（SQLite/S3、Docker）
- **最近更新**：2025-12-29
- **项目简介**：轻量级可自托管热点新闻聚合器，11+ 中文平台。
- **核心能力**：
  - 关键词过滤：`+`（必含）/ `!`（排除）/ `@`（计数限制）
  - 三种推送模式：daily / current / incremental（零重复）
  - 多渠道通知：企业微信、飞书、钉钉、Telegram、Email、ntfy、Bark、Slack
  - MCP AI 分析：独立 MCP 服务器，支持 Claude Desktop/Cherry Studio 对话式查询
  - 灵活部署：GitHub Actions / Docker / 本地 Python

### 26. pdf-watermark-remover `[Python]`
- **仓库**：https://github.com/ZeroxZhang/pdf-watermark-remover
- **创建时间**：2026-06-09
- **语言**：Python 3 + PyMuPDF
- **最近更新**：2026-06-09
- **项目简介**：轻量工具，去除 PDF 中的平铺图案背景水印。
- **核心能力**：消除平铺图案 Form XObject 水印、保留所有内容（文本/图片/表格/图表/字体/注释/书签）。

### 27. indian-workplace-methodology `[HTML 文档]`
- **仓库**：https://github.com/ZeroxZhang/indian-workplace-methodology
- **创建时间**：2026-08-12
- **最近更新**：2026-08-12
- **项目简介**：职场方法论，结构化呈现职场价值、沟通与组织执行策略。

---

## 六、已上线网站与 SaaS

> 已部署到公网、可访问的在线服务。

### 28. 灵眸 LingMou — A 股量化交易决策平台
- **网址**：https://zrcfzy.top
- **发布时间**：2026-01-22
- **项目简介**：面向个人投资者的 A 股量化决策平台，定位为"冷静的第二意见"。
- **核心能力**：四维评估（技术面/基本面/资金面/情绪面）、完全可追溯的量化规则、带置信度的投资建议。
- **关联项目**：与第三章的量化工具集构成完整投研体系。

### 29. 大音希声 SILENZIO — 播客转文字
- **网址**：https://silenzio.cn
- **上线时间**：2026-02-07
- **项目简介**：音频转文字服务，专注播客内容。Slogan：「最惊人的声音，是听不见的」。
- **核心能力**：仅支持小宇宙播客链接、游客 3 次免费、需注册续用。

### 30. Z-Slides — AI PPT 专家
- **网址**：https://slides.zeroxzhang.cc
- **上线时间**：2026-03-11
- **项目简介**：AI 驱动的 HTML 演示文稿生成器。
- **核心能力**：输入内容+选择风格→AI 生成富动画演示文稿、零依赖自包含 HTML、一键下载。

### 31. 过敏原地图 — 中国各省过敏原分布
- **网址**：https://alg.zeroxzhang.cc
- **仓库**：https://github.com/ZeroxZhang/algmap
- **创建时间**：2025-04-06
- **项目简介**：展示中国 7 大区域各省过敏原分布。
- **核心能力**：吸入性（25 种）/ 食物型（15 种）、交互式地图、区域数据表、症状患病率指标。

### 32. Minimalism Note Card Generator — 文字转精美卡片
- **网址**：https://card.zeroxzhang.cc
- **上线时间**：2026-01-22
- **项目简介**：将文字转化为精美卡片。
- **核心能力**：中英双语+自动语言识别、3 套配色、实时预览、署名栏、导出 PNG。

### 33. 个人主页 & 博客
- **网址**：https://www.zeroxzhang.cc（主页）/ https://blog.zeroxzhang.cc（博客）
- **仓库**：https://github.com/ZeroxZhang/zeroxhomepage
- **创建时间**：2018-10-21
- **项目简介**：极简个人门户，含 Blog、GitHub、Instagram、小红书入口。
- **博客主题**：数字化营销、数据分析、产品运营等。

---

## 七、本地个人系统

> 未发布到 GitHub、运行在本机（iCloud Drive 同步）的个人系统。

### 34. IO System — iCloud 跨设备个人内容管理系统

- **位置**：本地项目（iCloud Drive 同步，Mac / iPhone 跨设备访问）
- **启动时间**：2026-04-02（v1.0.0）
- **当前版本**：v1.6.0（2026-04-15）
- **技术栈**：Markdown + YAML frontmatter 文件系统 + Python 标准库 CLI（`scripts/io_system.py` 约 2000 行，零外部依赖）+ 双 Agent 规范（CLAUDE.md / AGENTS.md）
- **项目简介**：依托 iCloud 的跨设备信息管理个人内容管理系统，覆盖「素材输入 → 内容输出 → 灵感再发现」的完整创作闭环。
- **核心能力**：
  - **意图识别路由**：自然语言前缀判定六大意图（输入 / 输出 / 灵感 / 摄入 / 归档 / 系统命令），意图模糊时强制询问澄清
  - **输入流程**：`input/{idea|material|snippet|spark}/{topic}/`，统一 YAML frontmatter（ISO 8601 精确到秒）
  - **输出流程**：`output/{tweet|xiaohongshu|blog|analysis}/`，`sources` 引用链支持复用输入和历史输出，形成「推文 → 博客」的创作链条
  - **Spark 灵感发现**：6 策略加权随机（空白发现 25% / 随机考古 20% / 跨主题链接 15% / 标签扩展 10% / 时间脉冲 8% / 矛盾发现 7%），权重动态浮动，采纳率统计闭环
  - **Clippings 剪藏摄入**：Obsidian Clipper 采集 → 噪音清理 → 摘要提炼 → 规范化归档
  - **公众号 HTML**：blog 同步生成微信兼容 inline CSS HTML
  - **主题治理**：10 个规范主题注册表（含别名映射），写入强制使用规范主题名
  - **风格文件库**：6 种写作风格，输出前必须由用户显式选择
  - **系统治理**：自动索引（rebuild-index）、audit 巡检（0 错误 0 告警）、操作日志、semver 升级记录
- **当前规模**：10 个规范主题、90 份剪藏、42 条输入素材、20 篇输出内容（2026-08 索引快照）
- **项目价值**：把个人内容管理「产品化」——不是散落的笔记，而是带 CLI、索引、版本管理和质量门禁的系统。iCloud 实现跨设备随时记录，双 Agent 规范让 Claude Code / Codex 均可操作同一套系统，灵感发现机制让存量内容资产可持续再加工。

---

## 核心能力画像

基于上述 34 个项目（+ zerox-agent 明星项目），可提炼出 6 条核心能力主线：

### 1. AI Agent 全栈（以 zerox-agent 为代表）
从通用桌面端智能体到可安装技能（Skill）生态，覆盖智能体运行、编排、技能开发。兼容 20+ LLM 供应商，多框架互通（Claude Code / OpenClaw / Trae / Cursor）。

### 2. 内容自动化
将写作方法论、论文、Markdown 等系统转化为书籍 / 课程 / 海报 / 流程图 / 架构图 / 报纸等可复用产出。对中文排版有极致追求（字体、间距、CJK 边缘情况）。

### 3. 量化投研闭环
选股（end-of-day-picker / a-share-tailpicker）→ 风控（invest-signal-kit）→ 分析（stock-fund-analyzer / etf-analyzer）→ 决策平台（灵眸），完整工具链已上线。

### 4. 知识传播与可视化
论文转交互教程（paper-to-course）、源码转互动课程（zerox-agent-course / nanobot-course）、概念转 3D 网络（concept_bridge），降低知识获取门槛。

### 5. 产品化落地
6+ 个已上线网站/SaaS（灵眸、Silenzio、Z-Slides、过敏原地图、卡片生成器、个人主页），从 GitHub 仓库到公网服务的完整交付能力。

### 6. 个人内容系统化
IO System 把个人内容管理工程化为「文件系统 + CLI + 索引 + 版本管理」的完整系统：跨设备（iCloud 同步）、跨 Agent（Claude Code / Codex 双规范）、跨流程（输入 → 灵感发现 → 输出 → 归档），与内容自动化（主线 2）形成「素材积累 → 内容产出」的前后闭环。

---

## 附录：按 Stars 排序速查

| 排名 | 项目 | Stars | 应用场景 |
|------|------|-------|----------|
| ★ | zerox-agent | 5 | 明星项目 |
| 1 | huashu-bookwriter | 154 | AI 内容创作 |
| 2 | md2book | 60 | AI 内容创作 |
| 3 | flowchart-generator-skill | 38 | AI 可视化 |
| 4 | onepager | 11 | AI 可视化 |
| 5 | paper-to-course | 6 | AI 内容创作 |
| 6 | epub-pdf_2_txt_converter | 5 | 实用工具 |
| 7 | really | 3 | 教育与知识传播 |
| 8 | deepseek-harness-app | 2 | 实用工具 |
| 9 | arch_diagram | 2 | AI 可视化 |
| 10 | etf-analyzer | 2 | 量化投资 |
