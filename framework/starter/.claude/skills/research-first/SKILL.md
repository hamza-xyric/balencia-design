---
name: research-first
description: Research industry best practice, competitors, and prior art before any strategic or architectural decision, and ground every recommendation in 3+ cited, recent sources instead of assumptions. Use before business plans, architecture decisions (ADRs), technology selection, market or pricing analysis, and product feature planning — any decision where being wrong is expensive.
---

# Research-First Workflow

Ground decisions in real sources before committing. AI models confidently pattern-match to plausible-but-wrong defaults; forcing independent, recent, credibility-rated sources converts a guess into a defensible decision and surfaces contradictions early, when they are cheap to fix. This is move **A0 · Ground** of the Production Framework (see `framework/FRAMEWORK.md` §A0).

## When to use
- A **strategic** decision: business plan, pricing, go-to-market, positioning.
- A **technical** decision: architecture (ADR), technology/library selection, data model, protocol.
- A **market / competitive** question: who else solves this, and how.
- A **product** decision: which feature, which flow, which default.

If the decision is trivial or fully reversible, you may skip — but never skip for "obvious" calls that actually matter.

## The method — Query → Execute → Synthesize → Apply (announce each phase)

1. **Query** — formulate targeted, specific search queries for the decision. List the sub-questions a good answer must cover.
2. **Execute** — search. Prioritize recent sources (prefer < 12 months for fast-moving topics). Gather **3+ independent sources per major claim**.
3. **Synthesize** — compile structured findings with citations; note where sources agree and where they disagree. Rate each source's credibility (table below).
4. **Apply** — connect the findings to *this* project's specific context and state the recommendation. The deliverable of A0 is always **a cited findings doc**, not a conclusion pulled from the air.

## Citation format

```
"Finding statement"
- Source: [Name]
- Date: [Month Year]
- Confidence: [High / Medium / Low]
```

## Source quality

| Level | Source type | Trust |
|-------|-------------|-------|
| Primary | Official reports, academic papers, primary documentation | ⭐⭐⭐⭐⭐ |
| Secondary | Industry publications, reputable technical blogs | ⭐⭐⭐⭐ |
| Tertiary | News articles, company announcements | ⭐⭐⭐ |

## Rules

**Must include:** 3+ independent sources per major claim · publication dates (prefer < 12 months) · a credibility assessment per source · explicit limitations of the research.

**Must avoid:** single-source conclusions · outdated data presented without noting its age · unverifiable claims · treating correlation as causation · skipping research for "common knowledge."

## Self-check before finishing
- [ ] Every strategic recommendation carries citations.
- [ ] Multiple independent sources corroborate each major claim.
- [ ] Sources are recent enough for the topic's pace of change.
- [ ] Limitations and open questions are stated explicitly.
- [ ] Findings are connected to this project's context, not left generic.
