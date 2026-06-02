# Screen Classification & Batch Roster — all 90 specs

Assigns each screen a **grading profile** (which weight column of `RUBRIC.md` applies) and a **batch**. Seeds the roadmap.

**Scope:** 90 specs = **85 numbered** screens + **5 lettered sub-screens** (03b, 03c, 03d, 03e, 05b). The founder's headline is "85 screens"; sub-screens ride under their parent's batch.

**Profiles** (one rubric, two weight columns):
- **Data-profile** — the **54** screens that carry a `## Visualization` section (viz-audit HIGH+MEDIUM). All 14 dims; dims 1/5 carry full data weight; the existing `## Visualization` is the data baseline we build *up* from.
- **Content-profile** — the **36** remaining specs (auth/onboarding/SIA voice/settings/chat/community/celebration/modals/media/search/utilities). Data-viz dims down-weighted; microcopy/layout/typography/depth/state/motion/a11y/anti-generic carry full weight. These are **first-time craft reviews** (the viz-audit marked them N/A).

> Boundary notes: **62 Quick Notes** is data-profile but near-content (restraint-led); **64 Report/Block** is content-profile (moderation modal — reclassified LOW by the viz-audit). Profile is a weighting choice, not a quality ceiling — both profiles are graded to the same A++ bar.

---

## Batch roster (hero-first, then R01–R18 clusters)

**Batch H — Hero / identity (foundation pilot)** — locks `CRAFT-KIT.md` + `CONSISTENCY.md` + ratifies `RUBRIC.md`; founder checkpoint after.

| # | Screen | Profile | Has `## Visualization` | Pulled from |
|---|---|---|---|---|
| 12 | Home / Today | data | ✅ | R03 |
| 16 | Life Areas Overview | data | ✅ | R07 |
| 19 | RPG Character | data | ✅ | R08 |
| 09 | SIA Chat | data | ✅ | R04 |
| 17 | Me Main | data | ✅ | R07 |
| 28 | Nutrition & Diet | data | ✅ | R10 |

**Cluster batches B01–B18** map 1:1 to the prior R01–R18 themes (hero screens removed — done in H). ~5 screens each, product-flow order, for cross-screen consistency.

| Batch | Theme (from R-pass) | Screens | Profiles |
|---|---|---|---|
| B01 | Auth entry & consent | 01, 02, 03, 03b, 03c | all content |
| B02 | Profile & account recovery | 03d, 03e, 04, 05, 05b | all content |
| B03 | Guest, SIA onboarding, today | 06, 07, 08, 41 | content: 06,07 · data: 08,41 |
| B04 | Daily actions & SIA voice | 44, 45, 10, 11 | data: 44,45 · content: 10,11 |
| B05 | Conversation suite | 51, 74, 75, 76, 77 | data: 51 · content: 74,75,76,77 |
| B06 | Call summary & missions | 79, 13, 14, 15, 59 | all data |
| B07 | Mission support & Me entry | 73, 85, 18 | data: 73,18 · content: 85 |
| B08 | Identity, settings, billing | 20, 21, 22, 23 | data: 20,23 · content: 21,22 |
| B09 | Me utilities & achievements | 24, 25, 49, 50, 71 | data: 24,49,50,71 · content: 25 |
| B10 | Data & first domains | 72, 84, 26, 27 | all data |
| B11 | Core domain details | 29, 30, 31, 32, 33 | all data |
| B12 | More domains & journal | 34, 35, 36, 70, 37 | data: 34,35,36,70 · content: 37 |
| B13 | Habits, social, rewards, paywall | 38, 39, 40, 42, 43 | data: 38,39,43 · content: 40,42 |
| B14 | Accountability & recovery tools | 46, 47, 48, 52, 53 | all data |
| B15 | Mindfulness, food, shopping, sleep | 54, 55, 56, 57, 58 | data: 54,55,56,58 · content: 57 |
| B16 | Health utilities & reporting | 60, 61, 62, 63, 64 | data: 60,61,62,63 · content: 64 |
| B17 | System overlays & search | 65, 66, 67, 68, 69 | all content |
| B18 | Reports, media, accountability, social | 78, 80, 81, 82, 83 | data: 78 · content: 80,81,82,83 |

Then the **final cross-screen QA pass** (the viz-audit's RB1–RB6 analog) re-reviews all 90 against the locked kit before DoD.

---

## Full profile index

**Data-profile (54)** — carry `## Visualization`:
`08 09 12 13 14 15 16 17 18 19 20 23 24 26 27 28 29 30 31 32 33 34 35 36 38 39 41 43 44 45 46 47 48 49 50 51 52 53 54 55 56 58 59 60 61 62 63 70 71 72 73 78 79 84`

**Content-profile (36)** — first-time craft reviews:
`01 02 03 03b 03c 03d 03e 04 05 05b 06 07 10 11 21 22 25 37 40 42 57 64 65 66 67 68 69 74 75 76 77 80 81 82 83 85`

> The data/content split mirrors the viz-audit's HIGH+MEDIUM vs LOW exactly (54 vs the rest), so the two programs stay aligned: a data screen's `## Premium Craft` section builds *on top of* its existing `## Visualization` section; a content screen gets craft intent for the first time.
