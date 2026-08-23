# Agent Entry Point

Read [`CLAUDE.md`](./CLAUDE.md) for shared project context and durable boundaries, then use the nearest relevant README or focused document for the area being changed.

Guidance in this repository is intentionally lightweight and may evolve with the project. Apply local judgment, preserve explicit user intent and hard safety boundaries, and update stale guidance when the work changes its assumptions.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
