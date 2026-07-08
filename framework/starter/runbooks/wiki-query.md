# Forgeflow Runbook: Wiki Query

## Required Context

- The `knowledge-wiki` skill (this is its Query operation).
- `wiki/index.md` — the entry point for finding relevant pages.
- The wiki pages themselves and, where needed, the raw sources behind them.

## Steps

1. **Read `wiki/index.md` first** to locate the pages relevant to the question.
2. **Drill into those pages**, following `[[...]]` links to related context.
3. **Consult raw sources** only where the wiki is thin or you must verify a claim against the source of truth.
4. **Synthesize a cited answer.** Attribute claims to the pages and raw sources they come from. Choose the form that fits the question — a markdown answer, a comparison table, a slide outline, a chart.
5. **Offer to file it back.** A good comparison, analysis, or discovered connection is valuable — propose saving it as a new wiki page so the exploration compounds instead of disappearing into chat.
6. **If filed**, update `wiki/index.md` and append a `wiki/log.md` entry, e.g. `## [2026-04-02] query | Question`.

## Expected Output

- A synthesized, cited answer in the requested form.
- Optionally, a new wiki page (cataloged and logged) capturing the result.

## Quality Bar

- The answer is grounded in named pages and sources, not the model's prior.
- Where pages disagree, the disagreement is surfaced; the live source wins ties.
- Anything worth keeping is offered back to the wiki, not left only in chat.

## Persistence / Closeout

- Filed answers are committed by explicit path when the user asks to commit.
- The log records the query and any page it produced.

## Stop Conditions

- If the index and pages hold nothing relevant, say so and suggest ingesting a new source or running a web search — do not fabricate an answer.
