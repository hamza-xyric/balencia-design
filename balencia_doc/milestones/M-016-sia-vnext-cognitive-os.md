---
type: milestone
id: M-016
title: SIA vNext — Cognitive OS & Provenance Overhaul
product: yhealth-platform
status: completed
completed: 2026-07-03
milestone_type: development
---

# [M-016] SIA vNext — Cognitive OS & Provenance Overhaul

## Summary
Full rebrand and architectural overhaul of the AI coach from "Cia" to "SIA," broadened from health-only to whole-life scope. Delivered in Waves 0-2: Wave 0 (evidence & answerability unification), Wave 1 (context assembler — accountability risk, contradictions, personal baselines), Wave 2 (8 intelligence prompt controllers + turn-intelligence contract + 6 new intelligence APIs + client Cognitive OS dashboard). Closed the "compute-but-discard" gap identified in the 2026-06-16 AI intelligence architecture audit — sophisticated engines (LCM, confidence, predictions) are now wired into the live coaching conversation instead of being computed and discarded.

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Rebrand Cia → SIA across server + client | Brand consolidation; "Cia" was a legacy placeholder name |
| Whole-life system-prompt scope (not health-only) | Product thesis: coach reasons across all life domains, pillars are sensors |
| Provenance v2 — never narrate estimates as measured | Fix "fabricated sophistication" audit finding; honesty is a hard requirement |
| Cross-system axis unification (Wave 0) | Eliminate duplicated confidence-axis math between confidence engine and answerability gate |
| Turn Intelligence Contract as a pure auditor | Assert every computed signal played a real role per turn, or is flagged discarded |
| 8 controllers ship flag-gated where safety-relevant | Confidence/Transparency controllers shipped unflagged (rollout-safety gap — tracked in Missing-Features.md) |
| 6 new intelligence APIs (Briefing, Life Map, Root Cause, Ripple, Future Self, Memory Explorer) | Exposes previously-buried LCM/prediction data as first-class, inspectable surfaces |

## Artifacts Created

### Backend Services
- Cross-system axis unification helper (Wave 0)
- Provenance v2 — Daily Health Score app-computed labeling, RiskFlag source tagging
- Context Assembler Slice 1+2 — accountability risk, critical contradictions, personal baselines
- Turn Intelligence Contract — per-turn signal-usage auditor
- 8 intelligence prompt controllers: Confidence, Accountability, Answerability Recovery, Life Correlation, Predictive Response, Transparency, Root-Cause (composer), Turn Intelligence Integration

### API Routes
- `GET /api/v1/intelligence/briefing` — Executive Daily Briefing
- `GET /api/v1/intelligence/life-map` — Life Operating Map
- `GET /api/v1/intelligence/root-cause/:domain` — Root Cause Explorer
- `GET /api/v1/intelligence/ripple/:domain?delta=` — Ripple Simulator
- `GET /api/v1/intelligence/future-self` — Future Self Timeline
- `GET /api/v1/intelligence/memory-explorer` — Memory Explorer

### Frontend
- `CognitiveOperatingSystem` — first-screen client tab unifying all 6 intelligence APIs via `Promise.allSettled` graceful degradation

### Feature Flags
- `ENABLE_GATE_CROSS_SYSTEM` (default OFF)
- `ENABLE_LCM_ROOT_CAUSE` (default ON — flagged as a rollout-safety concern)

## Context

The 2026-06-16 AI Intelligence Architecture Audit scored the platform 5.0/10 and found the single most repeated theme across every quality audit: "compute-but-discard" — sophisticated engines (Life Correlation Matrix, confidence scoring, predictions) were computed and persisted but never reached the live coaching conversation. M-016 is the direct remediation: Waves 0-2 wire every one of those engines into the system prompt and expose them as first-class APIs + a client dashboard. See `docs/sia-coach/SIA-VNEXT-MASTER-TRACKER.md` for the full 19-feature build log and `AUDIT-FINDINGS-AND-GAPS.md §10` for the consolidated feature table.

## Session Reference

| Field | Value |
|-------|-------|
| **Session Date** | 2026-06-23 to 2026-07-03 |
| **Participants** | Hamza |
| **Related Milestones** | M-011 (LangGraph AI Integration) |

---
*Created: 2026-07-08 | Product: yhealth-platform | Milestone: M-016*
