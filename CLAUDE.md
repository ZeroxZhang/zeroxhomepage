# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for **Zerox** at `zeroxzhang.cc`. Three content pillars:

- **个人介绍 (About)** — personal introduction
- **作品集 (Portfolio)** — project showcase
- **博客 (Blog)** — articles

The site is intentionally multi-level with many sub-pages. The user wants rich frontend animations/effects — the animation tech stack is **not yet decided** (candidates to discuss: GSAP, Anime.js, Lottie, Three.js, CSS-only, or a framework-specific solution). This is a deliberate, prominent part of the design, not an afterthought.

## Project Status (as of 2026-08-19)

- Empty directory, **not yet a git repository**. The user plans to create a new GitHub repo to enable multi-device development. Repo initialization (git init, remote setup) is still an open task.
- **No framework chosen yet.** No `package.json`, build tooling, linter, or tests exist. Do not invent build/lint/test commands — add them to this file once the stack is chosen.
- Site content does not exist yet; nothing has been migrated from any prior site.

## Deployment: GitHub Pages + custom domain

This is static hosting — there is no server runtime. All "dynamic effects" must be client-side JS/CSS/WebGL, and any framework must be statically exportable.

- Custom domain: `zeroxzhang.cc` (apex), `www.zeroxzhang.cc`.
- **Important:** the domain currently points to an *old* page. Before switching, capture/save anything worth keeping from the old site; the DNS flip is the irreversible step.
- Custom domain on GitHub Pages requires a `CNAME` file (containing `zeroxzhang.cc`) in the root of whatever is deployed — either the repo root (user site or `main` branch project site), the `docs/` directory, or the `gh-pages` branch. A deploy that removes the `CNAME` file silently resets the custom domain in repo Settings.
- DNS requirements when migrating: apex `zeroxzhang.cc` → A/ALIAS records to GitHub Pages IPs, `www` → CNAME to `<user>.github.io`.
- Deploy options (decide with the user once the stack is chosen): GitHub Actions build→deploy (`pages` artifact, recommended for SSGs), build-to-branch (`gh-pages`), or `docs/` folder for plain static files.

## Architecture Notes (to be filled in as the stack lands)

- Route map for the multi-level structure (about / portfolio / blog / sub-pages) will live here once scaffolding exists.
- Animation architecture (how effects are organized, reused, and kept performant across many pages) belongs here once the animation tech is chosen.
