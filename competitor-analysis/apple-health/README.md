# Apple Health — UI Reference

iOS system health aggregator (no wearable required; aggregates all sources). Light, system-native, card-led. **13 screenshots** (`app-store/` 5 · `community/` 8). No Google Play (iOS-only). Sources: `sources.md`, `community-sources.md`.

> Note: contrary to the original assumption, Apple Health **does** have an App Store listing (`id1242545199`), which provided the cleanest official screenshots alongside `support.apple.com`.

## Screens captured & features shown

| Screen | Key UI / features visible |
|--------|---------------------------|
| **Summary tab** | **Pinned** cards (Activity rings, Steps, Walking Steadiness, Sleep Score), Highlights, Edit pinning |
| **Summary — Highlights** | Workout calories, post-workout HR chart, activity trends |
| **Sleep Score detail** | Score (e.g. 97 "Very High"), duration, bedtime, interruptions |
| **Browse / Search** | Full **Health Categories** list (Activity, Body, Heart, Mobility, Nutrition, Respiratory, Sleep, Vitals, Cycle, Mental Wellbeing, etc.) |
| **State of Mind / Emotion logging** | Mood/emotion check-in (Mental Wellbeing) |
| **Heart Rate chart** | Metric drill-down chart |
| **Profile › Health Details** | Editable identity (name, DOB, sex, blood type) |
| **Profile › Health Checklist** | Emergency SOS, **Medical ID**, Crash Detection |

## Patterns relevant to Balencia
- **Pinned + Browse** IA: user-pinned priorities on top, exhaustive searchable category index beneath — a scalable model for Balencia's many life areas.
- **State of Mind / emotion logging** — direct analog to Balencia's Wellbeing/daily-check-in (`45-daily-checkin`, `63-energy-tracking`).
- **Medical ID / Health Checklist** — safety + records layer Balencia doesn't spec; potential differentiator gap.
- System-native **light card aesthetic** — the "neutral baseline" against which Balencia's premium dark warm-ink look should feel elevated.
- Pure **aggregator with minimal coaching** — opposite of Balencia: lots of data, almost no guidance. Balencia's edge = the coaching/intelligence layer on top.
