# 个人 AI 项目梳理

> 更新时间：2026-08-19  
> 数据来源：GitHub (ZeroxZhang)、已上线网站、个人主页、本地项目

---

## 一、GitHub 项目（近 1 年内，按综合重要性排序）

### 排序依据

综合以下维度进行评估：
- **社区认可度**：Star / Fork 数量
- **实用价值**：是否解决真实问题、是否有持续使用场景
- **技术复杂度**：架构设计、工程难度
- **完整度**：文档、可用性和发布状态

---

### Tier 1：核心项目（高 Star + 高影响力）

#### 1. huashu-bookwriter ⭐ 154
- **类型**：Claude Code Skill
- **简介**：花叔风格的书籍创作框架，基于花叔已出版的 3 本技术书籍和开源仓库逆向工程得出的完整创作系统
- **核心能力**：
  - 3 种书籍类型蓝图（从入门到精通、橙皮书、快速指南）
  - 3 种章节模板（概念讲解型、实战教程型、深度分析型）
  - 完整的写作风格 DNA 和质量检查清单
  - PDF 导出支持、多 Agent 协作支持
- **技术栈**：Python + pandoc + XeLaTeX
- **最后更新**：2026-08-16

#### 2. md2book ⭐ 60
- **类型**：Markdown 转 PDF 电子书工具
- **简介**：将 Markdown 格式的技术书籍/教程转换为专业排版的 PDF 电子书
- **核心能力**：
  - 智能分页、自动生成目录、精美封面渲染
  - 3 款视觉主题（minimal 极简科技风 / academic 经典学术风 / playful 活泼插画风）
  - 丰富的 Markdown 支持（GFM、代码高亮、Callout 提示框）
  - 完美中文渲染，精心调校的字体排版与行距
- **技术栈**：Node.js + Playwright
- **最后更新**：2026-07-15

#### 3. flowchart-generator-skill ⭐ 38
- **类型**：Claude Code / OpenClaw / OpenCode Skill
- **简介**：智能流程图生成器，用自然语言描述流程即可生成高质量 SVG 流程图
- **核心能力**：
  - 自然语言输入（段落、列表、伪代码、粗略笔记）
  - 6 阶段 Pipeline（分析→结构化→JSON→线框→SVG→校验）
  - 中英双语自动检测
  - 标准化 Skill 格式，兼容多个 AI Agent 框架
- **技术栈**：Python（Skill 本体）+ SVG 输出
- **最后更新**：2026-07-30

#### 4. onepager ⭐ 11
- **类型**：Claude Agent Skill
- **简介**：将文本/Markdown/PDF 内容转化为高质量单页信息图（OnePage 海报）
- **核心能力**：
  - 4 种尺寸（竖屏滚动 / 横屏 16:9 / 方形 1:1 / 海报 3:4）
  - 9 种设计风格（Dark Editorial、Swiss Precision、Organic Nature 等）
  - 3 档信息密度，自动重写内容适配布局
  - 咨询级内容原则（MECE、金字塔、SCQA）
  - 内容蓝图、可复现项目、两层质量检查
- **技术栈**：HTML/CSS/JS + Playwright 截图
- **最后更新**：2026-08-08

#### 5. paper-to-course ⭐ 6
- **类型**：Claude Code Skill
- **简介**：将学术论文 PDF 或 arXiv 链接转化为独立的、自包含的交互式 HTML 教程网页
- **核心能力**：
  - 生成自包含网页，包含 18 种交互元素类型
  - 逐步数学推导（KaTeX 渲染）、伪代码逐行讲解
  - 研究谱系树、拖拽练习、多选题测验
  - 术语表浮窗、研究对话（群聊模拟）
  - 无需构建工具或服务器，浏览器直接打开
- **技术栈**：HTML + CSS + JS（IIFE，无依赖）+ KaTeX CDN
- **最后更新**：2026-05-25

#### 6. zerox-agent ⭐ 5
- **类型**：macOS 桌面应用（Local-first Agent 控制台）
- **简介**：把一句话变成一次可追踪、受权限约束、可恢复的本地 Agent 运行
- **核心能力**：
  - 会话（Chat / Goal Mode / 技能选择 / 工作区选择）
  - 任务记录（运行结果、失败原因、轨迹、工具、检查点）
  - 自动任务（每日 / 工作日 / 每周 / 间隔执行）
  - 受控权限、可见过程、可恢复状态、有证据的完成判断
  - 多 Agent 协作（parent/child sessions）
- **技术栈**：TypeScript（Electron 推测）
- **当前版本**：v3.9.1
- **最后更新**：2026-08-16

---

### Tier 2：专业工具与技能（近期发布、有特定用途）

#### 7. really ⭐ 3
- **类型**：Claude Agent Skill
- **简介**：跨学科深度诊断 Agent Skill，不直接给答案，而是通过 10 个学科透镜帮助看清问题本质
- **核心能力**：
  - 10 个学科透镜诊断系统（心理学、社会学、经济学、博弈论等）
  - 核心公理：症状 ≠ 根因、单透镜 = 盲人摸象、无提升 = 失败
  - 帮助识别"你的问题是否真的是一个问题"
- **最后更新**：2026-04-26

#### 8. deepseek-harness-app ⭐ 2
- **类型**：macOS 原生应用
- **简介**：DeepSeek Harness 的 macOS 原生客户端，让普通人也能用上 DeepSeek 官方 AI 编程助手框架
- **核心价值**：
  - 内置 Node.js 运行时和所有依赖（~1.5GB）
  - 双击即可运行，无需任何配置
  - 原生窗口体验（非浏览器）
- **技术栈**：Swift
- **最后更新**：2026-08-13

#### 9. etf-analyzer ⭐ 2
- **类型**：Python 工具
- **简介**：ETF 分析工具
- **最后更新**：2026-05-20

#### 10. arch_diagram ⭐ 2
- **类型**：Claude Agent Skill
- **简介**：专业架构图生成器，创建美观的系统架构图（HTML + SVG）
- **核心能力**：
  - 明暗主题切换、语义化颜色编码
  - 泳道/分层支持（接入层/应用层/数据层）
  - 交互式工具提示、演示模式（16:9）
  - 确定性布局 Pipeline、语义化 SVG 契约
  - 可执行质量门禁、零依赖输出
- **最后更新**：2026-08-08

#### 11. epub-pdf_2_txt_converter ⭐ 5
- **类型**：Python 工具（GUI）
- **简介**：PDF/EPUB 转 TXT 工具
- **核心能力**：
  - 支持 PDF 和 EPUB 格式
  - 单个文件和批量文件夹转换
  - 自动保持文本段落结构
  - 简洁图形界面 + 实时进度显示
- **最后更新**：2025-02-16

---

### Tier 3：A 股投资工具集（个人量化研究）

#### 12. a-share-tailpicker
- **类型**：Codex Skill
- **简介**：C 版 A 股沪主板尾盘选股 Skill，支持 14:20 预选、14:50 最终确认、观察池输出和次日回测
- **核心能力**：
  - 只筛选默认 C 版沪主板 `60` 系列标的
  - 分时形态、量价、资金代理、均线状态、板块共振和交叉验证评分
  - 三层结果：正式可买、建议观察、市场说明
  - 多源数据（iFinD 优先于 Kimi Code / AKShare / 东财 HTTP）
  - 次日条件退出回测（保守成交模型 + 显式成本）
- **最后更新**：2026-06-29

#### 13. end-of-day-picker
- **类型**：Python 系统
- **简介**：基于 V3 七层漏斗方法论的 A 股主板尾盘自动选股系统
- **核心能力**：
  - 七层漏斗筛选（~5000 只标的 → 最多 5 只推荐）
  - 多源数据备份（akshare / 东方财富 / 新浪 / 腾讯）
  - 市场状态感知（牛市/震荡/熊市四条件投票）
  - 熔断保护（大跌 / 跌停潮 / 连续亏损自动暂停）
  - 7 级梯度卖出矩阵 + 移动止盈 + 强制平仓时间表
- **最后更新**：2026-06-01

#### 14. invest-signal-kit
- **类型**：Python + Web 工具
- **简介**：A 股投资检查助手，买前/持仓风险检查
- **核心能力**：
  - 买前检查：输入代码、理由、投入金额、风险承受度，输出结论和风险线
  - 持仓体检：检查仓位集中度、信息来源可靠性、风险线明确性
  - 检查记录本地保存
- **最后更新**：2026-05-25

#### 15. stock-fund-analyzer
- **类型**：Claude/Trae Skill
- **简介**：综合股票和基金分析技能，结合价值投资（Graham、Buffett、Howard Marks）和技术分析（道氏理论、Elliott Wave、CAN SLIM）
- **核心能力**：
  - 实时财务、市场、机构预期、资金流、宏观/行业数据
  - Graham Number、DCF、护城河分析、周期评估
  - 道氏理论、Elliott Wave、CAN SLIM 模型
  - 加权公允价值区间 + 投资备忘录（Buy/Hold/Sell）
- **最后更新**：2026-03-28

#### 16. money_education_whitebook
- **类型**：HTML 文档
- **简介**：财商教育白皮书
- **内容**：财商教育相关文档（Markdown + DOCX + SVG 配图）
- **最后更新**：2026-07-05

---

### Tier 4：交互式教程与概念可视化

#### 17. zerox-agent-course
- **类型**：HTML 互动教程
- **简介**：Zerox Agent 源码互动教程
- **结构**：与 paper-to-course 类似的模块化教程结构（modules/ + styles.css + main.js）
- **最后更新**：2026-07-13

#### 18. nanobot-course
- **类型**：HTML 互动教程
- **简介**：nanobot 工作原理交互式中文教程，解释 nanobot AI Agent 框架的内部架构
- **核心能力**：
  - 代码翻译、数据流动画、拖拽匹配
  - 群聊模拟、测验和找 Bug 挑战
- **最后更新**：2026-07-13

#### 19. concept_bridge
- **类型**：Next.js Web 应用
- **简介**：Concept Bridge（概念之桥），在 3D 环境中可视化不同概念之间的"语义网络"和"向量空间关系"
- **核心能力**：
  - 概念桥接：输入两个概念，LLM 生成 3-4 个中间概念的逻辑推导路径
  - 无限扩展：点击节点自动生成 3 个核心子概念
  - 科幻视觉：深空星空背景、旋转 3D 粒子云节点
  - 物理引擎（Force-Directed graph）
- **技术栈**：Next.js 15 + React 19 + Tailwind CSS + react-force-graph-3d + Three.js + DeepSeek-V4-Flash
- **最后更新**：2026-05-15

---

### Tier 5：内容创作与可视化工具

#### 20. text_card_generator
- **类型**：React + TypeScript Web 应用
- **简介**：阅读卡片生成器，将文字转化为精美图片
- **核心能力**：
  - 所见即所得编辑器 + 实时预览
  - Sticky Note 风格（亮色/暗色模式，折角效果）
  - 多种经典纸张纹理（纯色、线条、网格、点阵）
  - 14+ 款 Google Fonts 中文字体
  - 4 倍超高清 PNG 导出
- **技术栈**：React + TypeScript + Vite + Tailwind CSS + Zustand + html2canvas
- **最后更新**：2026-01-05

#### 21. x_card
- **类型**：单页 Web 应用
- **简介**：Postcard — X 风格卡片生成器
- **核心能力**：
  - 隐私优先（数据仅在本地处理）
  - 编辑个人资料、正文（支持加粗）、发布信息
  - 可调节卡片宽度（420-900px）、最小高度
  - 认证标识、浅色/深色主题、边框控制
  - 2 倍与 3 倍清晰度 PNG 导出
- **技术栈**：HTML + CSS + JS
- **最后更新**：2026-08-06

#### 22. newspaper-demo
- **类型**：Trae Skill
- **简介**：报纸风格演示技能，生成复古报纸版式的完整 HTML 页面
- **核心能力**：
  - 严格 4:3 比例、多栏文本布局
  - 日式极简风格（乳白背景 + 微妙纸张纹理）
  - 自动生成图表（Line、Bar、Pie）、流程图、SVG 图
  - 自包含单文件输出
- **最后更新**：2026-03-18

#### 23. md2pdf_v2 (any2pdf)
- **类型**：Python Agent Skill
- **简介**：告诉 AI 助手"转 PDF"即可得到出版级文档，无需配置、模板或 LaTeX
- **核心能力**：
  - 一个 Python 文件、一个依赖（reportlab）、零配置
  - 处理所有 CJK/Latin 边缘情况
  - 混合文本换行、Canvas CJK、书籍级字体
  - 交互式工作流（AI 助手询问设计风格、扉页、水印、封底）
- **最后更新**：2026-04-14

---

### Tier 6：实用工具

#### 24. pdf-watermark-remover
- **类型**：Python 工具
- **简介**：轻量级 PDF 平铺图案背景水印去除工具
- **核心能力**：
  - 移除平铺图案 Form XObject 水印
  - 剥离每页的 `/Xxx Do` 水印层调用
  - 保留真实页面内容（文本、图片、表格、图表等）
- **技术栈**：Python + PyMuPDF
- **最后更新**：2026-06-09

#### 25. indian-workplace-methodology
- **类型**：HTML 文档
- **简介**：职场价值、沟通和组织执行的结构化方法论
- **最后更新**：2026-08-12

#### 26. sonoquest-ultrasound-play-lab
- **类型**：TypeScript Web 游戏（Next.js）
- **简介**：SonoQuest 超声探索室 — 面向亲子互动的仿真 B 超检查网页游戏
- **核心能力**：
  - 自由选择或随机生成目标（细菌、虫类、食物）
  - 动态目标、雷达探头、同心距离环和旋转扫线
  - 增益、深度、动态范围控制
  - 冻结、测量、截图、趣味检查报告
  - 在线体验：https://zeroxzhang.github.io/sonoquest-ultrasound-play-lab/
- **最后更新**：2026-07-21

---

## 二、已上线网站

### 1. 灵眸 — A 股量化交易决策平台
- **网址**：https://zrcfzy.top
- **简介**：A 股量化交易决策平台，辅助量化交易决策
- **关联项目**：a-share-tailpicker、end-of-day-picker、invest-signal-kit、stock-fund-analyzer、etf-analyzer

### 2. 大音希声 SILENZIO — 播客转文字工具
- **网址**：https://silenzio.cn/
- **简介**：将播客音频转录为文字的应用，支持小宇宙（xiaoyuzhoufm.com）链接
- **核心功能**：
  - 用户登录/注册
  - 播客链接转文字服务
  - 免费层（3 次）+ 付费层
- **哲学**：「大音希声」— 最 astounding 的声音是不可闻的

### 3. Zerox Zhang 个人主页
- **网址**：https://www.zeroxzhang.cc
- **简介**：个人主页，包含 GitHub 和 Blog 链接
- **特点**：极简设计、外部 API 访问追踪

---

## 三、本地项目

### 1. IO System — iCloud 跨设备个人内容管理系统
- **位置**：本地（iCloud Drive 同步，Mac / iPhone 跨设备访问）
- **类型**：个人内容管理系统（文件系统 + Python CLI + 双 Agent 规范）
- **简介**：依托 iCloud 的跨设备信息管理个人内容管理系统，覆盖「素材输入 → 内容输出 → 灵感再发现」的完整创作闭环
- **核心能力**：
  - 意图识别路由：自然语言前缀判定输入 / 输出 / 灵感 / 摄入 / 归档 / 系统命令六大意图，意图模糊时强制询问澄清
  - 规范化存储：`input/{idea|material|snippet|spark}/{topic}/` 与 `output/{tweet|xiaohongshu|blog|analysis}/`，统一 YAML frontmatter（ISO 8601 精确到秒）
  - 输出复用链：`sources` 字段引用输入或历史输出，支持「推文 → 博客」的创作链条
  - Spark 灵感发现：6 种策略加权随机（空白发现、随机考古、跨主题链接、标签扩展、时间脉冲、矛盾发现），权重动态浮动，采纳率统计闭环
  - Clippings 剪藏摄入：Obsidian Clipper 采集 → 噪音清理 → 摘要提炼 → 规范化归档
  - 公众号 HTML：blog 同步生成微信兼容 inline CSS HTML
  - 系统治理：自动索引（rebuild-index）、audit 巡检（0 错误 0 告警）、操作日志、semver 版本升级记录
  - 主题治理：10 个规范主题注册表（含别名映射），写入强制使用规范主题名
  - 风格文件库：6 种写作风格，输出前必须由用户显式选择
- **技术栈**：纯 Markdown 文件系统 + Python 标准库 CLI（`scripts/io_system.py` 约 2000 行，零外部依赖）
- **启动 / 版本**：2026-04-02 上线（v1.0.0），当前 v1.6.0（2026-04-15）
- **当前规模**：10 个规范主题、90 份剪藏、42 条输入素材、20 篇输出内容（2026-08 索引快照）

---

## 四、项目分类汇总

### 按类型分类

| 类型 | 项目数 | 代表项目 |
|------|--------|----------|
| **Claude Agent Skill** | 11 | huashu-bookwriter, flowchart-generator-skill, onepager, paper-to-course, arch_diagram, really, stock-fund-analyzer, md2pdf_v2 |
| **Web 应用** | 6 | concept_bridge, text_card_generator, x_card, sonoquest-ultrasound-play-lab, zeroxhomepage |
| **Python 工具** | 7 | md2book, etf-analyzer, pdf-watermark-remover, epub-pdf_2_txt_converter |
| **macOS 应用** | 2 | zerox-agent, deepseek-harness-app |
| **HTML 互动教程** | 3 | zerox-agent-course, nanobot-course, money_education_whitebook |
| **投资工具集** | 5 | a-share-tailpicker, end-of-day-picker, invest-signal-kit, stock-fund-analyzer, etf-analyzer |
| **个人内容管理系统** | 1 | IO System |

### 按领域分类

| 领域 | 项目数 | 代表项目 |
|------|--------|----------|
| **AI Agent 技能框架** | 12 | huashu-bookwriter, onepager, paper-to-course, flowchart-generator-skill, arch_diagram, really, md2pdf_v2, newspaper-demo |
| **内容创作与排版** | 6 | md2book, huashu-bookwriter, onepager, newspaper-demo, text_card_generator, x_card |
| **A 股量化投资** | 5 | a-share-tailpicker, end-of-day-picker, invest-signal-kit, stock-fund-analyzer, etf-analyzer |
| **交互式教程** | 3 | paper-to-course, zerox-agent-course, nanobot-course |
| **文档转换工具** | 4 | md2book, md2pdf_v2, epub-pdf_2_txt_converter, pdf-watermark-remover |
| **可视化与图表** | 3 | arch_diagram, flowchart-generator-skill, concept_bridge |
| **桌面应用** | 2 | zerox-agent, deepseek-harness-app |
| **亲子/教育** | 2 | sonoquest-ultrasound-play-lab, money_education_whitebook |
| **个人内容管理** | 1 | IO System |

---

## 五、关键观察

### 技术特点
1. **Skill 化趋势**：大量项目以 Claude Agent Skill 形式发布，兼容 OpenClaw、Trae 等多个 AI Agent 框架
2. **本地优先**：zerox-agent 强调 local-first、隐私优先、可审计
3. **中文优先**：几乎所有项目都完美支持中文排版和中文内容
4. **自包含输出**：偏好单文件 HTML + 内联 CSS/JS，无需服务器或构建工具
5. **文件系统即数据库**：IO System 用纯 Markdown + YAML frontmatter + Python 标准库构建个人内容系统，零外部依赖，iCloud 同步实现跨设备

### 核心主题
1. **AI + 内容创作**：从书籍写作到流程图、信息图、架构图，覆盖多种内容形态
2. **AI + 投资研究**：系统化的 A 股量化研究工具集
3. **知识传播**：论文转教程、源码转互动教程，降低知识获取门槛
4. **排版美学**：从 md2book 到 onepager，对中文排版有极致追求
5. **个人内容系统化**：IO System 把散落的笔记变成带索引、版本管理、灵感再发现的个人内容管理系统，与内容创作工具链形成闭环

### 活跃度
- **高频更新**：huashu-bookwriter、zerox-agent、md2book、flowchart-generator-skill
- **持续维护**：大部分项目在 2026 年仍在活跃更新
- **新方向**：2026 年新增投资工具集、互动教程系列
