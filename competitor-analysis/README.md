# Competitor UI Reference Library

Visual benchmark of competitor health/wellness app UIs for Balencia design work. **96 genuine phone-app screenshots** across 5 apps, organized per app with source manifests and feature notes. Complements the written gap analysis in [`app_design 3/competitor-analysis.md`](../app_design%203/competitor-analysis.md) with actual visual evidence.

> **Internal reference only.** These are third-party, copyrighted marketing/UI assets collected for competitive analysis — not for redistribution or reuse in the Balencia product.

## Contents

| App | iOS (App Store) | Android (Play) | Community/Reviews | Total | Notes |
|-----|:---:|:---:|:---:|:---:|-------|
| [WHOOP](whoop/) | 10 | 8 | 6 | **24** | Dark, ring-led recovery/strain coach |
| [Oura](oura/) | 9 | 7 | 6 | **22** | Light, calm, score-led smart ring |
| [Garmin Connect](garmin/) | 8 | 8 | 6 | **22** | Dense multi-sport + health widget hub |
| [Bevel](bevel/) | 10 | — | 5 | **15** | AI health coach — closest comp; iOS-only |
| [Apple Health](apple-health/) | 5 | — | 8 | **13** | iOS system aggregator; iOS-only |
| **Total** | **42** | **23** | **31** | **96** | |

Each app folder has: `app-store/`, `google-play/` (where applicable), `community/`, a `sources.md` (store) + `community-sources.md` (file → source URL → screen), and a `README.md` with per-screen feature notes.

## Methodology

Phone apps have no public web UI, so screenshots were harvested from:
1. **App Store pages** — scraped `apps.apple.com` HTML for `mzstatic.com` `PurpleSource`/`Features` CDN URLs, re-requested at full `1284×2778`. Highest-yield, cleanest source. (`-L` to follow Apple's slug redirects; the iTunes lookup API returned empty `screenshotUrls` for most of these apps.)
2. **Google Play pages** — `play-lh.googleusercontent.com` images in DOM order, capped to the app's own carousel (Play pages also embed *recommended* apps' shots).
3. **Community / review sites** — `support.apple.com`, review blogs, store pages, fetched and image-extracted.

All images were dimension-pruned (`sips`): kept portrait phone screens ≥1200px tall; dropped icons, feature banners, landscape composites, and corrupt files. The reproducible harvester is [`_download.sh`](_download.sh) (`./_download.sh [app]`).

**Honest caveats:** counts vary by app (Bevel & Apple Health are iOS-only). A few App-Store marketing slides composite the phone inside a hand/watch frame, but the UI is legible in every kept image. Community sourcing for WHOOP/Oura/Garmin/Bevel converged on App-Store CDN because review-blog images were mostly sub-400px or watermarked — so `community/` partially overlaps `app-store/` for those apps (different curated subset).

## Feature matrix — what competitors display

| Capability | WHOOP | Oura | Garmin | Bevel | Apple Health | **Balencia** |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Recovery / Readiness score | ✅ | ✅ | ◑ (Body Battery) | ✅ | — | ◑ |
| Sleep staging / score | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Strain / training load | ✅ | ◑ | ✅ | ✅ | ◑ | ✅ |
| Stress / energy tracking | ✅ | ✅ | ✅ | ✅ | ◑ (State of Mind) | ✅ |
| **AI coach (chat, data-grounded)** | ✅ Coach | ✅ Advisor | — | ✅ Ask Bevel | — | ✅ **SIA** |
| Nutrition logging | — | — | ◑ | ✅ | ✅ | ✅ |
| Hydration / water | — | — | ✅ | ◑ | ✅ | ✅ |
| Long-term trends hub | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Longevity / "age" framing | ✅ Healthspan | ✅ Cardio age | — | — | — | ◑ (Life Power) |
| Cycle / reproductive health | ◑ | ✅ | ✅ | — | ✅ | — |
| Mood / emotion logging | ◑ (Journal) | — | — | — | ✅ State of Mind | ✅ |
| Medical records / safety (Medical ID) | — | — | — | — | ✅ | — |
| Customizable card/widget feed | ◑ | ◑ | ✅ | ◑ | ✅ (Pin/Browse) | ✅ |
| **Finance / Career / Relationships / Learning / Creativity** | — | — | — | — | — | ✅ **(unique)** |
| RPG gamification / quests / squads | — | — | ◑ (badges) | — | — | ✅ **(unique)** |
| Cross-domain correlation engine | ◑ (1-domain Journal) | ◑ | — | — | — | ✅ **(unique)** |

✅ = clearly shown · ◑ = partial/adjacent · — = not observed

## Takeaways for Balencia

**Where competitors set the bar (match or beat):**
- **Data-grounded AI coach** is now table stakes among premium apps — WHOOP Coach, Oura Advisor, Ask Bevel all surface a personalized *morning narrative* + a persistent "ask" entry point. SIA should match the docked-ask pattern and the "explain this score" CTA (WHOOP).
- **One hero metric per screen** (WHOOP/Oura) reads as more premium than Garmin's everything-at-once density — a guardrail for Balencia's multi-domain dashboards.
- **Trends/longitudinal hubs** ("My Health", Garmin charts) are universal; ensure every Balencia domain has a real long-term view.
- **Pinned + Browse IA** (Apple Health) is the cleanest pattern for scaling to many categories — directly applicable to Balencia's 9 life areas.

**Where Balencia is differentiated (lean in):**
- Every competitor is **health-physiology only**. None touch **Finance, Career, Relationships, Learning, Creativity** — Balencia's whole-life scope is uncontested.
- **RPG gamification** (Missions, Life Power, Domain Stats, Squads) has no analog here.
- The **Life Correlation Matrix** generalizes what WHOOP's Journal does for one domain into a cross-domain engine — a genuine moat.

**Gaps competitors show that Balencia doesn't yet spec:**
- **Medical ID / safety / records layer** (Apple Health).
- **Cycle / reproductive-health** vertical (Oura, Apple, Garmin).
- **Recovery/Readiness as a first-class single score** (WHOOP/Oura/Bevel) — Balencia has the pieces but no equivalent headline metric.
