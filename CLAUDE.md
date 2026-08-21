# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`AGENTS.md` (for other agent tools such as Codex/Cursor) points here — keep this file as the single source of truth.

## Keeping This File Current

This file holds the project's **long-term, important information** — decisions, constraints, deployment facts, and architecture notes that persist beyond any single session. It is not documentation of transient state.

Update it **in the same change** that makes it outdated, and commit the update with that change:

- When a decision is made (framework, animation tech, deploy method), record it here and update the status line.
- When deployment setup changes (visibility, Pages config, DNS), update the Deployment section.
- When scaffolding lands, fill in the Architecture Notes section (route map, animation architecture).
- Bump the date in "Project Status" whenever its content changes.

If you notice this file contradicts reality, fix the file — it is the source of truth, not a snapshot.

## Project Overview

Personal website for **Zerox** at `zeroxzhang.cc`. Three content pillars:

- **个人介绍 (About)** — personal introduction
- **作品集 (Portfolio)** — project showcase
- **博客 (Blog)** — articles

The site is intentionally multi-level with many sub-pages. The user wants rich frontend animations/effects — the animation tech stack is **not yet decided** (candidates to discuss: GSAP, Anime.js, Lottie, Three.js, CSS-only, or a framework-specific solution). This is a deliberate, prominent part of the design, not an afterthought.

## Governing Docs (`docs/`)

All programmatic conclusions (PRD, research, dev plans, design/tech specs, iterations) live in `docs/`, never in a session only. See `docs/README.md` for per-directory conventions.

**Document flow** — documents move through the directories in this direction:

`raw/`（素材）→ `research/`（调研结论）→ `prd/`（需求）+ `specs/`（技术方案）→ `plans/`（规划）→ `iterations/`（迭代记录）

- `user_original_briefs/`（用户原始需求与 brief）存放用户写给 Agent 的阶段性 Prompt 与需求原文，是需求源头；Agent 只读不改，过程对话不落盘
- `ideas/`（想法池）随时供给任何环节；想法被采纳后移出 ideas/，落入对应的正式文档
- 作废文档移入 `archive/`（仅归档、不修改，复活需复制回原目录）
- `raw/` 是只读素材：引用时保持原样，不重新格式化、不重命名
- 正式文档遵循命名 `YYYY-MM-DD-<主题>.md`，`raw/` 与 `archive/` 豁免

## Project Status (as of 2026-08-19)

- Git repo: `github.com/ZeroxZhang/ZeroxZhang.github.io` (user-site repo, originally created 2016 with a placeholder README; reused for this project). **Private** (chosen deliberately — see deployment note below). Default branch: `main` (old `master` history preserved in it, then deleted).
- Multi-device workflow: this is the canonical remote. Clone from GitHub on other machines rather than copying the directory.
- **No framework chosen yet.** No `package.json`, build tooling, linter, or tests exist. Do not invent build/lint/test commands — add them to this file once the stack is chosen.
- Site content does not exist yet; nothing has been migrated from any prior site.

## Deployment: GitHub Pages + custom domain

This is static hosting — there is no server runtime. All "dynamic effects" must be client-side JS/CSS/WebGL, and any framework must be statically exportable.

- Custom domain: `zeroxzhang.cc` (apex), `www.zeroxzhang.cc`.
- **Important:** the domain currently points to an *old* page. Before switching, capture/save anything worth keeping from the old site; the DNS flip is the irreversible step. The old page is **not** hosted in this repo (it had no `cname` configured) — it lives elsewhere.
- The repo is **private**, and GitHub Pages is disabled on free private repos. The publish path later: flip repo to public → enable Pages (source: `main`, root) → configure custom domain → update DNS. Do not waste effort "deploying" while the repo is private.
- Custom domain on GitHub Pages requires a `CNAME` file (containing `zeroxzhang.cc`) in the root of whatever is deployed — either the repo root (user site or `main` branch project site), the `docs/` directory, or the `gh-pages` branch. A deploy that removes the `CNAME` file silently resets the custom domain in repo Settings.
- DNS requirements when migrating: apex `zeroxzhang.cc` → A/ALIAS records to GitHub Pages IPs, `www` → CNAME to `<user>.github.io`.
- Deploy options (decide with the user once the stack is chosen): GitHub Actions build→deploy (`pages` artifact, recommended for SSGs), build-to-branch (`gh-pages`), or `docs/` folder for plain static files.

## Architecture Notes (to be filled in as the stack lands)

- Route map for the multi-level structure (about / portfolio / blog / sub-pages) will live here once scaffolding exists.
- Animation architecture (how effects are organized, reused, and kept performant across many pages) belongs here once the animation tech is chosen.
