# Forgeflow Runbook: Wiki Ingest

## Required Context

- The `knowledge-wiki` skill (this is its Ingest operation).
- The new source(s) to ingest, placed in `wiki/raw/`.
- The current `wiki/index.md` and `wiki/log.md`, if the wiki already exists.
- `framework/FRAMEWORK.md` move A7 (Persist) and the `memory/MEMORY.md` honesty rule for handling contradictions.

## Steps

1. **Bootstrap if needed.** If `wiki/` does not exist, create `wiki/`, `wiki/raw/`, a seeded `wiki/index.md` (category headings, empty catalog), and `wiki/log.md`.
2. **Read the source** from `wiki/raw/` in full. For sources with images, read the text first, then view referenced images separately for context. Never modify the raw file.
3. **Discuss key takeaways** with the user before writing — confirm what matters and what to emphasize.
4. **Write or update the source's summary page** in `wiki/`, with a link back to the raw file.
5. **Propagate.** Update every entity, concept, comparison, and synthesis page the source touches (a single source may touch 10–15 pages). Add `[[page-name]]` cross-references in both directions.
6. **Flag contradictions.** Where the source disagrees with an existing page, note it explicitly. Where it disagrees with a live source, resolve in the live source's favor and record the drift.
7. **Update `wiki/index.md`** so every new or renamed page is cataloged with a one-line summary.
8. **Append a `wiki/log.md` entry** with the standard prefix, e.g. `## [2026-04-02] ingest | Source Title`.

## Expected Output

- A summary page for the source, linked from `wiki/index.md`.
- Updated entity / concept / comparison / synthesis pages with two-way cross-references.
- A current `wiki/index.md` and a new `wiki/log.md` entry.
- Unmodified `wiki/raw/` source files.

## Quality Bar

- Cross-references are added in both directions; no new orphan pages.
- Contradictions are surfaced, not silently overwritten.
- The index reflects reality; the log entry uses the standard prefix.
- Raw sources were read and left byte-for-byte unchanged.

## Persistence / Closeout

- Keep the wiki in git; commit the touched pages by explicit path when the user asks to commit.
- Leave `wiki/log.md` as the timeline of what was ingested and when.

## Stop Conditions

- Stop if the named source is not present in `wiki/raw/` or cannot be read.
- Stop and ask if the source's scope is ambiguous enough that the right pages to update are unclear.
- Never resolve a contradiction by editing a raw source; raw is immutable.
