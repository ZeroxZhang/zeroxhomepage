# OriginKit 免费性、MCP 配额与可持续使用方案调研

- 调研日期：2026-08-21
- 调研对象：[OriginKit](https://www.originkit.dev/) 及其托管 MCP、CLI
- 原始需求：[brief_research_on_originkit.md](../user_original_briefs/brief_research_on_originkit.md)
- 结论适用范围：OriginKit 公开 beta 阶段；定价与限额可能随时调整

## 一、结论摘要

| 问题 | 结论 |
| --- | --- |
| 是否纯免费 | **当前公开能力不收费，但不是不限量。** 官网把组件库定义为 free，模板也全部标为 Free；未发现公开价格、订阅或结账入口。不过，源码交付受日限额和周限额约束，且需要登录或 API Key。 |
| MCP 超限后购买什么 | **截至调研日，没有公开可购买的套餐、额度包或 Pro 计划。** API Key 只是认证凭证，不是付费扩容凭证。公开可行做法只有等待额度重置，或联系运营方申请提高额度、白名单或未公开的定制方案。 |
| 能否绕开限制无限使用 | **不能合规地把官方托管服务变成无限交付。** 最可行的方案是只获取一次已选定的组件，把合法取得的源码保存在项目或私有组件库中，此后由本地代码、本地目录或自建私有 MCP 重复提供。这样可以实现已取得内容的近似无限复用，但获取新组件仍受官方额度限制。 |

## 二、免费不等于无限

### 2.1 免费范围

官方公开信息支持以下判断：

1. [Introduction](https://www.originkit.dev/intro) 将 OriginKit 描述为免费的动画组件库。
2. [Templates](https://www.originkit.dev/templates) 中当前展示的模板均标记为 `Free`。
3. 官网允许通过 Code、Framer、CLI 和 MCP 获取组件源码；官方称源码复制后归用户使用，且不会留下 OriginKit 运行时依赖。
4. 官方 npm 包 `originkit@0.2.23` 标记为 MIT，但该许可证明确覆盖 CLI 软件包，**不能据此推断整个组件目录、模板或托管 MCP 服务均采用 MIT 许可证**。

因此，“免费”的准确含义是：目前没有公开收费门槛，取得源码后也没有按运行次数计费；它不代表可以无限次从官方服务拉取源码。

### 2.2 当前公开配额

[Integrations 页面](https://www.originkit.dev/integrations) 当前给出的 beta 配额如下：

| 交付类型 | 每日上限 | 每周上限 |
| --- | ---: | ---: |
| Component | 10 | 25 |
| Section | 5 | 10 |
| Template | 3 | 7 |

这些额度由以下入口共享：

- MCP 的实时源码获取
- CLI 的 `originkit add`
- 网站的 Code 复制
- 网站的 Framer 复制

官方明确说明：

- 复制 CLI 命令、AI Prompt 或 MCP Prompt 本身不扣额度。
- 真正执行实时 registry 源码交付才扣额度。
- 每次成功的 CLI `add` 计作一次交付。

MCP 的 `list_components` 和 `search` 主要返回索引或搜索结果；`get_component` 和 `fetch` 会返回源码。公开文档没有提供逐工具计费矩阵，因此应把后两者视为确定会消耗交付额度的操作，并以登录后的额度页面或服务端响应为最终依据。

### 2.3 官方文档存在版本漂移

最新 npm CLI `0.2.23` 的 README 仍写着旧限额：

- Component：10/日、30/周
- Section：10/日、无周上限

这与当前官网的 10/日、25/周和 5/日、10/周冲突。CLI README 还称额度按 IST 的下一日或周一重置，但当前官网没有重复这一说明。

**执行时应采用当前官网的更严格口径，并以服务端实际响应为准。** 这个差异也说明 beta 规则变化很快，不宜把任一限额视为长期承诺。

## 三、超限后是否有付费扩容

截至 2026-08-21，未找到以下公开能力：

- OriginKit 服务定价页
- Free、Pro、Team 或 Enterprise 套餐
- 额度包或按量付费
- Billing、Subscription、Upgrade 或 Checkout 入口

[公开站点地图](https://www.originkit.dev/sitemap.xml) 中的 `pricing` 路径都是可复制的“定价区块”组件，不是 OriginKit 自身的服务定价页。`/terms` 和 `/privacy` 在调研时均返回 404。

因此，不能建议购买一个目前并不存在于公开页面的产品。超限后的合理路径是：

1. 等待日额度或周额度重置。
2. 联系 npm 包维护者 `dev@lander.studio`，或 Lander Studio 的公开联系邮箱 `hello@lander.studio`。
3. 明确询问是否提供提高 quota、白名单、团队额度或定制付费方案。
4. 同时询问复制组件能否提交到公开 GitHub 仓库，以及组件本体采用什么许可证。

联系时建议提供账号邮箱、用途、预计每日和每周的 Component/Section/Template 交付量，以及是否需要 CI 或多成员共享。当前没有证据表明联系后一定能获得扩容。

## 四、合规的近似无限复用方案

### 方案 A：一次交付，本地长期复用

这是最适合本项目的方案。

1. 先在官网浏览预览、API Reference 和组件说明，完成候选筛选。
2. 只对最终选中的组件执行一次 Code、CLI 或 MCP 源码交付。
3. 将源码、必要资产和依赖版本纳入项目版本控制。
4. 后续直接修改本地 props、样式和实现，不再重复请求同一组件或不同 preset。
5. 记录来源 URL、取得日期、原始许可证、依赖许可证和本地修改。

组件进入本地代码库后，开发、构建、部署和运行均不需要再次调用 OriginKit，因而没有运行次数限制。

### 方案 B：建立私有组件目录或私有 MCP

如果未来有多个项目或多个 Agent 需要复用：

1. 把已合法取得的组件整理到私有 Git 仓库、私有 npm 包或 monorepo package。
2. 保存组件元数据、预览图、依赖和适配说明。
3. 让 Agent 优先搜索本地目录；确有需要时，再用一个自建私有 MCP 暴露这些本地副本。
4. 只有本地目录缺少目标组件时才访问 OriginKit。

该方案把重复读取从官方服务转移到自己的存储，可以让已取得组件在内部近似无限调用。它不应演变为自动批量抓取整个 OriginKit 目录，也不应在许可未明确时公开再分发。

### 方案 C：对官方额度做预算

- 先搜索和预览，后交付源码，避免把额度用于试错。
- 不要先在网页复制 Code，再让 MCP 或 CLI 获取同一组件。
- 尽量在本地派生主题和样式，不为每个 preset 重复交付。
- 以周上限作为主要预算，因为即使某天未达到日上限，也可能先触发周上限。
- 对无法等待的新需求，改用许可证清晰的开源组件库或自行实现。

### 方案 D：申请官方授权或扩容

如果需求是持续获得大量新组件，而不是重复使用已有组件，唯一稳妥的长期路径是获得 OriginKit 明确批准的高额度账号、团队方案或数据授权。当前只能联系运营方确认，不能预设其存在。

## 五、不建议的规避方式

以下行为不属于可持续方案，也不应实施：

- 注册或轮换多个账号、API Key、身份或 IP 来规避账号配额
- 共享、购买或盗用他人的凭证
- 直接调用未公开 API、重放认证请求或绕过 OAuth
- 从页面脚本、CDN 或受保护接口批量抽取源码
- 自动化镜像整个组件库并公开分发

原因包括：

1. MCP 根端点明确声明 `authRequired: true`。
2. 官网的 [robots.txt](https://www.originkit.dev/robots.txt) 明确禁止抓取 `/api`，并将 AI 内容使用限定为 reference，而不是完整内容收集或训练。
3. 限额跨 MCP、CLI、Code 和 Framer 共享，说明它是服务端账号策略，不是客户端开关。
4. OriginKit 尚未公开完整的服务条款和组件许可证，批量复制或再分发存在账号、版权和后续维护风险。

## 六、对本项目的建议

本仓库尚未确定前端框架，现在获取 OriginKit 组件容易浪费额度。建议按以下顺序执行：

1. 先确定 React/Next.js/Framer 等技术路线和页面组件清单。
2. 用官网预览建立短名单，不在探索阶段请求源码。
3. 每个确定采用的组件只交付一次，并立即纳入本地代码管理。
4. 在本地建立来源与许可证记录，之后让 Agent 优先复用本地版本。
5. 本项目未来需要把 GitHub Pages 仓库转为公开仓库。首次采用 OriginKit 组件前，应书面确认组件源码能否随公开仓库再分发；CLI 的 MIT 许可证不足以自动覆盖交付的组件源码。

## 七、证据与可信度

### 一手来源

- [OriginKit Introduction](https://www.originkit.dev/intro)：免费定位、源码复制模式、MCP 用途
- [OriginKit Integrations](https://www.originkit.dev/integrations)：当前配额、共享入口、认证方式和 CLI 行为
- [OriginKit Templates](https://www.originkit.dev/templates)：模板当前均标记为 Free
- [OriginKit MCP 根端点](https://mcp.originkit.dev/)：认证要求、工具列表和 REST API 描述
- [OriginKit npm 包](https://www.npmjs.com/package/originkit)：CLI 版本、MIT 许可证、旧配额说明和维护者信息
- [OriginKit robots.txt](https://www.originkit.dev/robots.txt)：抓取和 AI 使用限制
- [OriginKit sitemap.xml](https://www.originkit.dev/sitemap.xml)：公开路由核验
- [Lander Studio 联系页](https://lander.studio/booking)：公开联系邮箱

### 可信度判断

- 当前免费状态和官网配额：高
- 当前没有公开付费扩容入口：高
- 未来是否推出付费套餐：未知
- 日/周额度的精确重置时区：中低，旧 CLI 文档与当前官网存在版本差异
- 组件源码的公开再分发权：未知，需运营方或组件交付文件中的明确许可证确认
