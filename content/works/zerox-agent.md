---
schema_version: 2
slug: zerox-agent
default_locale: zh-CN
locales:
  - zh-CN
  - en
title: Zerox Agent
title_en: Zerox Agent
tagline: 把复杂任务交给 Agent，同时保留对过程的控制
tagline_en: Delegate complex work without losing control of the process
summary: 面向 Apple Silicon macOS 的 local-first 桌面 Agent。它把规划、工具、权限、记忆与恢复放进一套可观察的执行环境。
summary_en: A local-first desktop agent for Apple Silicon Macs, bringing planning, tools, permissions, memory, and recovery into one observable runtime.
category: agent-platform
type: macOS 桌面应用
type_en: macOS desktop application
level: flagship
status: active
featured: true
weight: 10
facts_as_of: 2026-08-21
tags:
  - AI Agent
  - Local-first
  - 多智能体
  - macOS
tags_en:
  - AI agents
  - Local-first
  - Multi-agent
  - macOS
stack:
  - TypeScript
  - Electron
  - React
  - Vite
  - SQLite
links:
  - label: 获取 Zerox Agent
    label_en: Get Zerox Agent
    type: repository
    url: https://github.com/ZeroxZhang/zerox-agent
    primary: true
related:
  - zerox-agent-course
  - nanobot-course
  - deepseek-harness-app
---

<!-- locale: zh-CN -->

# Zerox Agent

复杂任务最消耗人的地方，通常不是输入那句话，而是接下来的一连串照看：确认计划有没有跑偏，判断工具调用是否安全，处理失败，补充上下文，最后再核对任务究竟有没有完成。

Zerox Agent 为这段过程提供了一套桌面运行环境。它运行在 Apple Silicon Mac 上，把目标、会话、工具、权限、记忆和检查点放在同一个界面里。你可以把任务交出去，同时保留查看、干预和恢复的能力。

## 从聊天窗口走向完整的 Agent 运行时

普通聊天产品围绕消息组织体验。适合问答，也适合快速生成内容。一旦任务需要读写文件、运行 Shell、访问网络或持续几十分钟，消息记录就很难承担全部状态。

Zerox Agent 将一次运行拆成几个清晰对象：目标定义了要抵达的结果；计划记录当前路径；工具轨迹保存实际动作；权限层决定哪些操作可以发生；记忆和检查点负责跨越中断。最终答案只是交付的一部分，过程本身也可以被检查。

这种设计特别适合代码修改、资料研究、长篇写作和本地文件整理。它们往往没有“一问一答”的捷径，却可以被拆成一条有状态的完成链。

## Goal Mode：把目标写进系统，而不是留在上下文里

Goal Mode 为多步骤任务建立显式生命周期。Direct 模式适合路径较清楚的工作，系统会规划并持续推进。Debate 模式增加独立评审与质量门，用于结论需要被挑战、交付需要额外验收的场景。

目标、剩余工作和完成证据都有独立状态。即使对话已经很长，你仍然可以回到最初目标，查看哪些部分完成、哪些部分仍在进行。任务不会因为模型忘记了前文，就悄悄改变完成标准。

对于简单请求，直接对话仍然保留。Zerox Agent 没有要求所有事情都进入复杂流程；产品会根据任务规模提供不同的工作深度。

## 把大任务拆开，同时保持每个分支可见

父子会话支持将研究、实现、验证等工作交给不同子 Agent。子任务继承受控的上下文与权限，并继续归属于同一棵任务树。

这解决了多 Agent 产品里一个常见问题：并行能力很容易增加，但用户往往看不清每个分支做了什么。Zerox Agent 保留父子关系、消息与工具记录。你可以逐层回看，也能在某个分支出现偏差时单独处理，而无需重启整个任务。

多 Agent 在这里是一种任务组织方式，不是一场不可见的后台表演。

## 工具可以行动，权限需要先说清楚

文件系统、Shell、网络和工作区访问都经过运行时权限层。系统区分“模型知道如何调用工具”和“当前任务被允许执行什么”，并把高风险动作放在明确的授权边界内。

对日常使用者来说，这意味着 Agent 可以处理真实工作，而不需要默认获得整台电脑的无限权限。对开发者来说，工具 schema、路径范围、网络域和错误返回也进入统一的执行协议，便于扩展和审计。

权限控制不会消除所有风险，但它把风险从一条隐藏的 Prompt 约定，提升为可以被产品界面表达和执行的规则。

## 中断之后，从已知位置继续

应用关闭、模型请求失败或工具执行报错，并不意味着已经完成的步骤必须丢失。Zerox Agent 将运行结果、工具轨迹、失败原因和检查点写入本地状态，使任务能够从已知位置恢复。

SQLite 是运行时的权威数据源，承载目标、记忆与检查点。Local-first 在这里有具体含义：任务状态优先保存在用户自己的电脑上，能够长期积累，也方便离线审计。

如果选择外部模型供应商，完成请求所需的上下文仍会发送到相应服务。Zerox Agent 对本地持久化与远程推理做了明确区分，没有把 local-first 包装成“所有计算完全离线”。

## 连接你已经在使用的模型

公开版本注册了 19 类内置模型连接，并支持兼容端点。不同供应商被放进一致的消息、工具和错误处理边界，用户无需为每个模型重新理解一套 Agent 工作方式。

模型选择因此可以服务于任务：快速模型处理日常工作，更强的模型负责复杂推理，兼容端点用于接入自有或新出现的服务。运行时保持稳定，模型可以随需求更换。

## 一次典型任务如何展开

1. 连接模型服务，并选择需要操作的工作区。
2. 直接发起请求，或为多步骤任务创建 Goal。
3. 查看计划和任务分支，在关键工具调用前确认权限。
4. 让系统持续执行；遇到中断时检查原因并从检查点恢复。
5. 在完成前查看交付物、工具轨迹和完成证据。

这条路径减少的是持续盯守 Agent 的注意力。人仍然负责目标和关键判断，运行时承担重复推进、状态保存和执行记录。

## 已公开的工程证据

截至 2026-08-21，Zerox Agent 的公开版本为 v3.9.1，面向 Apple Silicon macOS。该版本发布记录包含 2,985 项测试、26/26 Agent eval、2/2 Memory eval 与 6/6 runtime stress；最新公开验证工作流成功。

代码、Release 与验证记录均可在公开仓库查看。项目还衍生出 Zerox Agent Course，用互动页面解释从界面到运行时的关键链路；Nanobot Course 则提供另一个 Agent 框架的中文源码学习路径。

当前发行包尚未完成 Apple notarization，首次安装需要留意 macOS 的安全提示。不同模型的工具能力、复杂任务的完成判断和自主执行边界也仍在持续迭代。

## 适合把 Agent 当作工作环境的人

如果你只需要偶尔问一个问题，聊天窗口已经足够。Zerox Agent 面向的是另一类需求：任务会跨越多个步骤和工具，需要留下记录，失败后还要继续，用户也希望知道系统正在做什么。

它尝试建立一种更稳健的人机分工：你定义目标、掌握权限并验收结果；Agent 在可观察的运行时里推进工作。

[获取 Zerox Agent](https://github.com/ZeroxZhang/zerox-agent)

想先理解系统设计，可以阅读 [Zerox Agent Course](/work/zerox-agent-course)。

<!-- locale: en -->

# Zerox Agent

The expensive part of an agent task is rarely the first prompt. It is everything that follows: checking whether the plan has drifted, deciding which tool calls are safe, recovering from failures, restoring missing context, and verifying that the work is actually complete.

Zerox Agent provides a desktop runtime for that process. Built for Apple Silicon Macs, it brings goals, conversations, tools, permissions, memory, and checkpoints into a single environment. You can delegate the work while keeping the ability to inspect, intervene, and recover.

## From a chat window to an agent runtime

Chat products organize the experience around messages. That works well for questions and quick generations. It becomes harder to manage when a task needs to edit files, run shell commands, access the network, or continue for an extended period.

Zerox Agent models a run as a set of explicit objects. A goal defines the intended outcome. A plan captures the current path. Tool traces preserve what actually happened. Permissions determine which actions may proceed. Memory and checkpoints carry the task across interruptions.

The final answer is only one part of the deliverable. The execution path remains available for review.

This approach is designed for work such as code changes, research, long-form writing, and local file operations. These tasks rarely fit into a single exchange, but they can be organized as a stateful chain of work.

## Goal Mode keeps the objective in the system

Goal Mode gives multi-step tasks an explicit lifecycle. Direct mode is intended for work with a reasonably clear path: the system creates a plan and moves through it. Debate mode adds independent review and quality gates for tasks where the conclusion should be challenged or the output needs a stronger acceptance process.

The goal, remaining work, and completion evidence are stored separately from the conversation. Even after a long session, you can return to the original objective and see what has been completed. The definition of done does not have to depend on the model recalling an early message.

Direct chat remains available for smaller requests. Zerox Agent does not force every interaction into a heavyweight workflow; it offers different levels of structure for different kinds of work.

## Divide the work without losing the thread

Parent and child sessions allow a large goal to be divided into research, implementation, validation, or other focused branches. Each child receives controlled context and permissions while remaining part of the same task tree.

This addresses a practical problem in multi-agent systems. Parallel execution is easy to demonstrate, but it can leave the user with little understanding of what each branch did. Zerox Agent preserves parent-child relationships, messages, and tool traces. You can inspect an individual branch, correct it, or rerun it without discarding the rest of the task.

Multi-agent execution is treated as a way to organize work, not as invisible background theater.

## Tools can act; permissions define the limits

File operations, shell commands, network access, and workspace actions pass through the runtime permission layer. The product separates a model's ability to call a tool from the authority granted to the current task.

For users, this means an agent can work with real files and systems without receiving unrestricted access by default. For developers, tool schemas, workspace boundaries, network domains, and errors live inside a common execution protocol that can be extended and audited.

Permissions cannot remove every risk. They can, however, turn a hidden convention in a prompt into a rule that the product can display and enforce.

## Resume from a known state

Closing the application, receiving a model error, or seeing a tool fail should not erase completed work. Zerox Agent stores results, tool traces, failure details, and checkpoints so a task can resume from a known point.

SQLite acts as the runtime source of truth for goals, memory, and checkpoints. This is what local-first means in the product: execution state is stored on the user's machine by default, where it can accumulate over time and be inspected locally.

When an external model provider is selected, the context required for a completion request is still sent to that service. Zerox Agent makes a clear distinction between local persistence and remote inference rather than presenting local-first as a claim that every computation happens offline.

## Work with the models you already use

The public release registers 19 built-in model connection types and supports compatible endpoints. Providers are normalized behind common message, tool, and error-handling boundaries, so changing a model does not require learning a different agent workflow.

Model choice can follow the task. A faster model may be enough for routine work, while a more capable model can handle complex reasoning. Compatible endpoints provide a path for private or newly available services. The runtime remains consistent as the model changes.

## A typical run

1. Connect a model provider and choose the workspace the task may access.
2. Start with direct chat, or create a Goal for work that spans multiple steps.
3. Review the plan and task branches, approving sensitive tool actions when needed.
4. Let the runtime continue the work; if something stops, inspect the failure and resume from a checkpoint.
5. Review the deliverable, tool traces, and completion evidence before accepting the result.

The purpose is to reduce the attention spent supervising every small step. The user still owns the goal and the important decisions. The runtime handles repeated execution, state persistence, and the record of what happened.

## Public engineering evidence

As of August 21, 2026, the public release is v3.9.1 for Apple Silicon macOS. Its release notes report 2,985 tests, 26/26 Agent evals, 2/2 Memory evals, and 6/6 runtime stress checks. The latest public validation workflow completed successfully.

The source, releases, and validation history are available in the public repository. The project also includes a companion Zerox Agent Course, which explains the path from interface to runtime through interactive lessons. Nanobot Course offers a separate Chinese-language path into another agent framework.

The current distribution has not completed Apple notarization, so first-time installation may require attention to macOS security prompts. Model capability normalization, completion criteria for difficult goals, and the balance between autonomy and control remain active areas of development.

## Built for people who treat agents as a working environment

A chat window is enough for an occasional question. Zerox Agent is intended for work that crosses tools and steps, needs a durable record, may fail and resume, and should remain understandable to the person responsible for the result.

The product proposes a more deliberate division of labor: you define the objective, control permissions, and approve the outcome; the agent moves the work forward inside an observable runtime.

[Get Zerox Agent](https://github.com/ZeroxZhang/zerox-agent)

For a guided look at the system, continue with the [Zerox Agent Course](/work/zerox-agent-course).

