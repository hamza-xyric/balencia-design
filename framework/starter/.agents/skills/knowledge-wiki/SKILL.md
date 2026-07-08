---
name: knowledge-wiki
description: Build and maintain a persistent, compounding knowledge wiki — interlinked markdown pages the agent writes and keeps current from your sources, instead of re-deriving understanding from raw documents on every question. Use when you are accumulating knowledge over time and want it organized and cross-referenced rather than scattered: deep research, mapping a codebase you are working in, reading a book, due diligence, competitive analysis, course notes. Feed it, ask it, and health-check it with the wiki-ingest, wiki-query, and wiki-lint operations.
---

# Knowledge Wiki

Maintain a persistent, interlinked markdown wiki that sits between you and your raw sources, so knowledge **compounds** instead of being rediscovered on every query. You curate sources and ask questions; the agent does the summarizing, cross-referencing, filing, and bookkeeping. This extends move **A3 · Reference** (give the model the context it needs) and **A7 · Persist** (state survives across sessions) — see `framework/FRAMEWORK.md` Part A.

## The core idea

Most LLM-over-documents setups are RAG: retrieve chunks at query time, answer, forget. The knowledge is re-derived from scratch every time and nothing accumulates. A wiki is different: when a source arrives the agent **reads it once, extracts what matters, and integrates it** — updating entity and concept pages, revising summaries, flagging where new data contradicts old. The cross-references are already there; the contradictions are already flagged; the synthesis already reflects everything read. The human's job is sourcing, exploration, and asking good questions. The agent's job is everything else.

## Operations

Three operations, each with canonical instructions in `runbooks/`:

- **wiki-ingest** — add a source: read it, summarize it, propagate updates, refresh the index, log it. Claude: `/wiki-ingest`. Codex: `forgeflow-wiki-ingest`.
- **wiki-query** — ask the wiki: read the index, drill into pages, synthesize a cited answer, optionally file it back. Claude: `/wiki-query`. Codex: `forgeflow-wiki-query`.
- **wiki-lint** — health-check: contradictions, stale claims, orphans, gaps. Claude: `/wiki-lint`. Codex: `forgeflow-wiki-lint`.

## The three layers

1. **Raw sources** — `wiki/raw/`. Your curated source documents (articles, papers, transcripts, exports; for a codebase, the code and its docs). **Immutable** — the agent reads them, never edits them. This is the source of truth.
2. **The wiki** — `wiki/`. Agent-owned markdown: summaries, entity pages, concept pages, comparisons, an overview, a synthesis, plus `index.md` and `log.md`. You read it; the agent writes it.
3. **The schema** — the project root `CLAUDE.md` / `AGENTS.md` plus this skill. It defines how the wiki is structured and the conventions to follow. You and the agent co-evolve it as you learn what works for your domain.

## Wiki structure & conventions

- **`wiki/index.md`** is content-oriented: a catalog of every page — link, one-line summary, optional metadata — grouped by category (overview, entities, concepts, sources). Updated on every ingest. **Read it first** when answering a query, then drill into pages. At moderate scale (~hundreds of pages) this replaces embedding-based search.
- **`wiki/log.md`** is chronological: an append-only record of ingests, queries, and lint passes. Start each entry with a consistent prefix so the log stays greppable, e.g. `## [2026-04-02] ingest | Source Title` — then `grep "^## \[" wiki/log.md | tail -5` shows recent activity.
- **Page types** — `overview` (the top-level map), `entity` (a person / system / company / place), `concept` (an idea / theme / mechanism), `comparison` (a table or analysis across entities), `synthesis` (the evolving thesis). One page per subject.
- **Cross-references** — link related pages with `[[page-name]]`. Every new page should link in and be linked to; orphans are a lint finding.
- **Frontmatter** — pages may carry optional YAML (tags, date, source count) so downstream tools can query them.

## First-time setup

If `wiki/` does not exist yet, the first wiki-ingest bootstraps it: create `wiki/`, `wiki/raw/`, a seeded `wiki/index.md` (empty catalog with category headings), and a `wiki/log.md` with its first entry. Nothing is pre-shipped — the wiki is built on first use and shaped to your domain.

## Applied to a code repo

When the domain is a codebase you are working in, the wiki becomes a **living map of the system** so you stop re-exploring it every session:

- **Pages** — an architecture overview, one page per subsystem or service, decision pages (ADR-style: what was chosen and why), gotchas and invariants, data-flow, and a glossary.
- **Raw sources** — the code itself, existing docs, PR threads, issues, design docs.
- **Ingest** — after you explore a subsystem, file what you learned as wiki pages, so the next session starts from the map instead of re-grepping.
- **Query** — "how does auth work?" reads the wiki first and drills into code only for the delta.
- **Lint** — flags pages that have drifted from the current code (see the honesty rule below).

## memory/ vs wiki/

They are complementary, not duplicates:

- **`memory/`** — a small set of **always-on** facts, loaded into every session via `@memory/MEMORY.md`. Durable decisions, the source hierarchy, critical invariants. One fact per file.
- **`wiki/`** — a **large, on-demand** knowledge base navigated through its own `index.md`; it is **not** auto-loaded into context.

A wiki page may promote one durable invariant *up into* `memory/` (so future sessions always see it); a memory fact may link *down into* a wiki page for the full treatment. Keep the boundary: facts agents must never violate live in memory; the body of knowledge lives in the wiki.

## The honesty rule

Wiki pages are **point-in-time**. When a page contradicts a live raw source — current code, a newer document — **the live source wins**; update the page and record the drift in `wiki/log.md`. This inherits the `memory/MEMORY.md` honesty rule and non-negotiable #2, *declare which source wins*. wiki-lint is how drift gets caught before it misleads.

## Optional tooling

At small scale `index.md` is enough. As the wiki grows you may want real search over the pages — [`qmd`](https://github.com/tobi/qmd) (local markdown search, CLI + MCP) is a good option, or build a simple search script when the need arises. None of this is required and none ships with this skill.

## Self-check before finishing an operation

- [ ] `wiki/index.md` reflects every page created or renamed.
- [ ] A `wiki/log.md` entry was appended with the standard prefix.
- [ ] New pages link in (`[[...]]`) and are linked to — no orphans.
- [ ] Contradictions with existing pages are flagged, not silently overwritten.
- [ ] Raw sources in `wiki/raw/` were read, never modified.
- [ ] Any contradiction with a live source resolved in the live source's favor, with drift logged.

---

_Pattern adapted from Andrej Karpathy's "LLM Wiki" note; the maintenance-burden insight echoes Vannevar Bush's Memex (1945) — the part Bush could not solve was who does the maintenance. The agent does._
