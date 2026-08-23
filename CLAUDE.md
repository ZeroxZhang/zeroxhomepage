# Project Guidance

This is the shared entry point for agents working in this repository. It should stay short and describe durable project context, not prescribe every implementation detail.

## How Guidance Works

- The user's latest explicit direction has priority. Existing documents record prior decisions; they do not prevent those decisions from changing.
- Repository behavior is the authority for what the project currently does. When code and documentation diverge, determine whether the code or the intended decision should change, then reconcile both.
- Use the most local relevant guidance: this file covers the whole project, a directory README covers that area, and a focused PRD, design note, or spec owns its topic.
- Treat patterns, proposed stacks, plans, and checklists as defaults unless they protect security, privacy, data integrity, licensing, accessibility, or an explicit product requirement.
- Prefer links over copied rules. Update only the documents materially affected by a change.
- If two active sources conflict in a consequential way, surface the conflict instead of silently choosing whichever wording is stricter.

These files are living project tools. Refine, merge, or retire guidance when it stops helping the work.

## Product Direction

This repository contains Zerox's personal website for `zeroxzhang.cc`, organized around About, Portfolio, and Blog experiences. It is intended to support multiple levels of content and a strong visual and motion identity.

Rich interaction is a product goal, not a commitment to a particular library. Choose technology according to the experience, maintainability, performance, accessibility, and the surrounding implementation.

## Current Context

- The repository is private and the canonical remote is `github.com/ZeroxZhang/ZeroxZhang.github.io`.
- The app scaffold is live: Next.js App Router + TypeScript + Tailwind CSS v4 + Motion/Framer Motion, with a completed homepage (`/`), 35 same-domain `/work/<slug>` entries, and an `/about` placeholder. Commands and state live in `README.md`.
- `content/works/` contains the current bilingual portfolio source for 35 works; the homepage consumes it through `lib/works.ts`, while the delivered portfolio showcases are mounted as static pages. About, Blog, and most portfolio media are still incomplete.
- OriginKit Hero 10 is a locally preserved visual reference and source baseline, adapted into the site (typography, Kinetic Grid floor, portfolio grid); provenance lives in `components/originkit/ORIGIN.md`. The homepage visual baseline is documented in `docs/design/2026-08-23-homepage-design.md`.
- Hosting must support the server-side visit-counter behavior described in the product documents; the platform and persistence mechanism remain open decisions.

Current status and next steps belong in [README.md](./README.md) and active plans rather than being duplicated here.

## Durable Boundaries

- Never commit or expose credentials, private content, personal identifiers, or local machine paths without explicit user approval. [`docs/raw/subpages/subpages_address.md`](./docs/raw/subpages/subpages_address.md) is an explicitly approved raw-handoff exception (2026-08-23); it is not a portable project reference. OriginKit credential and provenance details are documented in [`components/originkit/ORIGIN.md`](./components/originkit/ORIGIN.md).
- Preserve source provenance and license information for third-party assets. Adapt local vendor/reference code deliberately rather than treating it as unexplained project code.
- Re-check and back up the existing site and relevant DNS state before switching `zeroxzhang.cc`; do not rely on a durable document for the domain's current external state.
- Preserve user-authored briefs and raw source material as evidence. Derived interpretation belongs in active project documents or content files.
- Keep structured content internally consistent. The local README and active content spec define the current contract; change the contract intentionally when a better model is needed.

## Project Map

| Area | Role |
| --- | --- |
| [`README.md`](./README.md) | Human-facing overview and current state |
| [`docs/`](./docs/) | Decisions, evidence, designs, plans, and project history |
| [`content/`](./content/) | Visitor-facing source content |
| [`components/originkit/`](./components/originkit/) | Preserved OriginKit source and provenance |
| [`public/originkit/`](./public/originkit/) | Assets associated with that source delivery |

Read only the local documents needed for the task. Add durable documentation when a decision will matter across sessions or areas; routine implementation details can remain in code and tests.

## Evolving Decisions

Research informs choices but does not make them binding. PRDs describe desired outcomes, design documents shape the experience, specs capture important technical contracts, and plans coordinate temporary work. Implementation and validation reveal when any of them should change.

When a decision changes:

1. Update the document that owns the decision.
2. Adjust affected code, content, or dependent documents.
3. Preserve superseded material only when its history remains useful.

The goal is coherence, not documentary completeness.
