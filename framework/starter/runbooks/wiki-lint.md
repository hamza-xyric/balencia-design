# Forgeflow Runbook: Wiki Lint

## Required Context

- The `knowledge-wiki` skill (this is its Lint operation).
- `wiki/index.md`, `wiki/log.md`, and the wiki pages.
- The live raw sources in `wiki/raw/` (and, for a codebase wiki, the current code) to check pages against.

## Steps

1. **Scan for contradictions** between pages, and between pages and their live sources.
2. **Find stale claims** that newer sources have superseded.
3. **Find orphan pages** with no inbound `[[...]]` links, and important concepts mentioned but lacking their own page.
4. **Find missing cross-references** and data gaps that a web search or a new source could fill.
5. **Propose fixes and new questions or sources** to investigate; present them before applying.
6. **Apply approved fixes**, resolving every contradiction in the live source's favor and recording drift.
7. **Append a `wiki/log.md` entry**, e.g. `## [2026-04-02] lint | findings summary`.

## Expected Output

- A lint report: contradictions, stale claims, orphans, missing pages, missing links, data gaps.
- Applied fixes for the items the user approves.
- A logged lint pass.

## Quality Bar

- Every contradiction is resolved toward the live source, never by trusting the older page.
- Drift between a page and its source is recorded, not silently patched.
- Suggested follow-up questions and sources are concrete and actionable.

## Persistence / Closeout

- Commit fixed pages by explicit path when the user asks to commit.
- The log entry leaves a dated record of the health check.

## Stop Conditions

- If `wiki/` is empty or does not exist, report that and suggest running an ingest first.
