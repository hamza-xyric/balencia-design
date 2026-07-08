---
type: story
id: S15.7.3
title: "AI Style Coach (getStyleProfile)"
epic: E15
epic_name: Document Intelligence, Reflection System & Virtual Try-On
feature: F15.7
feature_name: Virtual Try-On / AI Fashion Studio
product: yhealth-platform
priority: P2
status: Done
created: 2026-07-08
---

# S15.7.3: AI Style Coach (`getStyleProfile`)

## User Story

**As a** Balencia user exploring the AI Fashion Studio,
**I want** SIA to learn my real style preferences over time from what I actually save versus discard,
**So that** I make faster, more confident style decisions — and so that the "AI Style Coach" is a real signal, not an invented score.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [ ] Must Have (P0)
- [ ] Should Have (P1)
- [x] Could Have (P2)
- [ ] Won't Have (P3)

---

## Scope Description

**Why this story exists as its own slice:** `getStyleProfile()` is the concrete evidence that the "AI Style Coach" is **not** a fabricated score — a pattern the epic's "honesty before polish" philosophy requires everywhere it applies a "coach" label. This story isolates the aggregation logic and its consumption by coaching context so its honesty properties (real computed values, `null` when there's no signal yet) are independently verifiable.

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| Light | Style Coach signal is invisible until enough sessions accumulate. |
| Deep | Explicit `GET /style` view: top colors/categories, save rate, sample size — informing future garment suggestions. |

**Technical Foundation:**

- **Route** — `GET /v1/virtual-tryon/style` → `getStyleProfile()`
- **Table: `try_on_preference_signals`:** `action (generated | saved | discarded)`, `garment_category`, `color_tags`, `mode`, per session — the raw material for the Style Coach.

**`getStyleProfile()`** (`server/src/services/virtual-tryon/tryon-preference.service.ts`) aggregates the user's last 50 preference signals into real computed values:
```ts
async getStyleProfile(userId: string): Promise<{
  topColors: string[]; topCategories: string[]; saveRate: number | null; sampleSize: number;
}> {
  // topColors/topCategories: frequency-ranked from actual color_tags/garment_category
  // saveRate: saved / (saved + discarded), or null if no decided sessions yet
  // sampleSize: COUNT(DISTINCT session_id) — NOT raw signal rows, because one
  //             try-on emits multiple signals (generated + saved/discarded);
  //             counting rows would inflate the "based on your last N try-ons" claim
}
```

This is consumed by `comprehensive-user-context.service.ts` (the shared coaching-context assembler) when `env.virtualTryOn.enabled` is true — the same context assembler other pillars feed into, making style preference a real, if narrow, coaching signal.

**Style Coach Query Flow (High-Level):**
```
GET /style -> getStyleProfile(userId)
     - Aggregates last 50 try_on_preference_signals
     - Returns { topColors, topCategories, saveRate, sampleSize }
     - Feeds comprehensive-user-context.service.ts for coaching context
```

---

## Acceptance Criteria

```gherkin
Scenario: Style profile computed from real signals
  Given a user has generated, saved, and discarded several try-on sessions
  When GET /style is called
  Then topColors and topCategories are frequency-ranked from actual color_tags/garment_category values, not placeholder data

Scenario: saveRate is null with no decided sessions
  Given a user has only "generated" signals, no "saved" or "discarded" signals yet
  When getStyleProfile() computes saveRate
  Then saveRate returns null, honestly indicating no signal yet, rather than a fabricated 0 or default value

Scenario: sampleSize counts sessions, not raw signal rows
  Given a single try-on session emitted both a "generated" and a "saved" signal
  When getStyleProfile() computes sampleSize
  Then it counts 1 distinct session, not 2 raw signal rows — avoiding an inflated "based on your last N try-ons" claim

Scenario: Style profile bounded to last 50 signals
  Given a user has more than 50 historical preference signals
  When getStyleProfile() runs
  Then only the most recent 50 signals are aggregated

Scenario: Style profile feeds coaching context when enabled
  Given env.virtualTryOn.enabled is true
  When comprehensive-user-context.service.ts assembles context for a coaching turn
  Then getStyleProfile() output is included as a coaching signal
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Save rate | Tracked as a genuine style signal, not a vanity metric | `try_on_preference_signals` saved/(saved+discarded) — measured by construction |
| Coaching signal integration | `getStyleProfile()` output present in coaching context when the feature flag is on | `comprehensive-user-context.service.ts` inclusion check |
| Honest-null correctness | `saveRate` returns `null` (not 0 or a default) when no saved/discarded sessions exist | Unit test on the zero-decided-sessions path |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Aggregation bounded to the last 50 signals — not an unbounded historical scan | Style profile scoped to `user_id` | No fabricated/placeholder scoring — `saveRate: null` when there's no decided-session signal yet | Style summary is presented as plain text/values, not a chart-only view | Consumed by the same shared coaching-context assembler other pillars use — no parallel context path |

---

## Dependencies

- **Prerequisite Stories:** S15.7.2 (Saved Looks — save/discard actions are the source of `try_on_preference_signals`)
- **Related Stories:** AI Coach context assembly (`comprehensive-user-context.service.ts`)
- **External Dependencies:** `VIRTUAL_TRYON_ENABLED` / `env.virtualTryOn.enabled` flag

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| No preference signals exist yet | `sampleSize = 0` | `topColors`/`topCategories` return empty, `saveRate` returns `null` | Style Coach view shows an honest "not enough data yet" state, not fabricated defaults |
| Only "generated" signals exist (nothing saved or discarded) | No saved/discarded rows | `saveRate` returns `null` | Same honest-null treatment as the zero-signal case |
| Feature flag off | `env.virtualTryOn.enabled === false` | `getStyleProfile()` output excluded from coaching context | No user-facing Style Coach surface when the flag is off |

---

## Open Questions

- None outstanding for the shipped scope — the honest-null design (`saveRate: null`, session-based `sampleSize`) is explicitly documented as deliberate in the source material, not a gap.

---

## Definition of Done

- [x] `getStyleProfile()` is built from real aggregated preference signals — no fabricated or placeholder scoring
- [x] `saveRate` returns `null`, not a fabricated default, when no saved/discarded sessions exist
- [x] `sampleSize` counts distinct sessions, not raw signal rows, to avoid inflating the "based on your last N try-ons" claim
- [x] Aggregation bounded to the last 50 preference signals
- [x] Consumed by `comprehensive-user-context.service.ts` when the feature is enabled

---

*Story S15.7.3 | Epic E15 | Product: Balencia Platform*
