# Screen Coverage Matrix

Generated for audit batch `2026-07-08` from `balencia-screens/src/data/screens.ts`, `BUILD-LEDGER.md`, and `visual-104-pass-strict.json`.

Legend: `Review-only` means implemented in the hifi review shell but not mapped to a production app route. `Source-only` means source-design coverage exists but no live app route is currently represented. `W-007` marks batches whose independent third-party review was deferred in the build ledger. `A11y` means the strict browser pass reported a visible semantic/touch-target/text-density warning. `Feature` means product docs show a readiness gap or flag-gated capability that the screen represents visually.

| ID | Screen | Section | Hifi Route | Live/Source Route Truth | Build Evidence | Audit Flags | Disposition |
|---|---|---|---|---|---|---|---|
| 01 | Splash Screen | Auth & onboarding | `/screens/01` | review-route only | complete; 2026-07-08 npm run check; screenshots/B1/01.png | Review-only; Asset | Pass for hifi coverage |
| 02 | Motion Carousel | Auth & onboarding | `/screens/02` | review-route only | complete; 2026-07-08 npm run check; screenshots/B1/02.png | Review-only; Asset | Pass for hifi coverage |
| 03 | Welcome Sign Up | Auth & onboarding | `/screens/03` | /auth/signup | complete; 2026-07-08 npm run check; screenshots/pilot/03.png | None | Pass for hifi coverage |
| 03b | OTP Verification | Auth & onboarding | `/screens/03b` | /auth/verify | complete; 2026-07-08 npm run check; screenshots/B1/03b.png | None | Pass for hifi coverage |
| 03c | Consent | Auth & onboarding | `/screens/03c` | /onboarding | complete; 2026-07-08 npm run check; screenshots/B1/03c.png | A11y | Pass for hifi coverage; accessibility polish |
| 03d | Complete Profile | Auth & onboarding | `/screens/03d` | review-route only | complete; 2026-07-08 npm run check; screenshots/B1/03d.png | Review-only; Asset | Pass for hifi coverage |
| 03e | WhatsApp Enrollment | Auth & onboarding | `/screens/03e` | /onboarding | complete; 2026-07-08 npm run check; screenshots/B1/03e.png | Asset; Feature: WhatsApp go-live | Pass with product-readiness caveat |
| 04 | Sign In | Auth & onboarding | `/screens/04` | /auth/signin | complete; 2026-07-08 npm run check; screenshots/B1/04.png | A11y | Pass for hifi coverage; accessibility polish |
| 05 | Forgot Password | Auth & onboarding | `/screens/05` | /auth/forgot-password | complete; 2026-07-08 npm run check; screenshots/B1/05.png | None | Pass for hifi coverage |
| 05b | Reset Password | Auth & onboarding | `/screens/05b` | /auth/reset-password, /reset-password | complete; 2026-07-08 npm run check; screenshots/B1/05b.png | None | Pass for hifi coverage |
| 06 | Guest Mode Preview | Auth & onboarding | `/screens/06` | review-route only | complete; 2026-07-08 npm run check; screenshots/B1/06.png | Review-only | Pass for hifi coverage |
| 07 | CIA Onboarding Conversation | Auth & onboarding | `/screens/07` | /onboarding | complete; 2026-07-08 npm run check; screenshots/pilot/07.png | None | Pass for hifi coverage |
| 08 | Initial Plan Summary | Auth & onboarding | `/screens/08` | /onboarding | complete; 2026-07-08 npm run check; screenshots/B1/08.png | None | Pass for hifi coverage |
| 09 | CIA Chat | CIA, voice & chat | `/screens/09` | /ai-coach | complete; 2026-07-08 baseline; - | Asset | Pass for hifi coverage |
| 10 | CIA Voice In Chat | CIA, voice & chat | `/screens/10` | review-route only | complete; 2026-07-08 npm run check; screenshots/B2/10.png | Review-only; Asset; Feature: Voice/PSTN | Pass with product-readiness caveat |
| 11 | CIA Voice Full Screen | CIA, voice & chat | `/screens/11` | /voice-assistant, /voice-call | complete; 2026-07-08 npm run check; screenshots/B2/11.png | Feature: Voice/PSTN | Pass with product-readiness caveat |
| 12 | Home Screen | Today & missions | `/screens/12` | /dashboard, /activity-status | complete; 2026-07-08 baseline; - | Asset | Pass for hifi coverage |
| 13 | Mission Board | Today & missions | `/screens/13` | /goals | complete; 2026-07-08 baseline; - | Feature: Proactive loop | Pass with product-readiness caveat |
| 14 | Mission detail | Today & missions | `/screens/14` | review-route only | complete; 2026-07-08 npm run check; screenshots/B3/14.png | Review-only; Feature: Proactive loop | Pass with product-readiness caveat |
| 15 | Create or edit mission | Today & missions | `/screens/15` | review-route only | complete; 2026-07-08 npm run check; screenshots/B3/15.png | Review-only; A11y; Feature: Proactive loop | Pass with product-readiness caveat; accessibility polish |
| 16 | Life Areas Overview | Life intelligence | `/screens/16` | /life-areas | complete; 2026-07-08 baseline; - | None | Pass for hifi coverage |
| 17 | Me Main | Profile & settings | `/screens/17` | /profile | complete; 2026-07-08 npm run check; screenshots/B4/17.png | None | Pass for hifi coverage |
| 18 | Explore Section | Profile & settings | `/screens/18` | review-route only | complete; 2026-07-08 npm run check; screenshots/B6/18.png | Review-only; W-007 | Pass with independent-review waiver |
| 19 | RPG Character | Profile & settings | `/screens/19` | /life-world | complete; 2026-07-08 npm run check; screenshots/B4/19.png | None | Pass for hifi coverage |
| 20 | Personal wiki and CIA memory | Life intelligence | `/screens/20` | /wiki | complete; 2026-07-08 npm run check; screenshots/B4/20.png | Feature: Trust/compliance, Doc intelligence | Pass with product-readiness caveat |
| 21 | Settings | Profile & settings | `/screens/21` | /settings, /preferences | complete; 2026-07-08 npm run check; screenshots/B7b/21.png | W-007 | Pass with independent-review waiver |
| 22 | Connected Services | Profile & settings | `/screens/22` | /auth/whoop/callback, /calendar/connected | complete; 2026-07-08 npm run check; screenshots/B7b/22.png | W-007; A11y | Pass with independent-review waiver; accessibility polish |
| 23 | Subscription Billing | Profile & settings | `/screens/23` | /settings/billing, /settings/billing/credits | complete; 2026-07-08 npm run check; screenshots/B7b/23.png | W-007; A11y | Pass with independent-review waiver; accessibility polish |
| 24 | Notification History | Profile & settings | `/screens/24` | /notifications | complete; 2026-07-08 npm run check; screenshots/B7b/24.png | W-007 | Pass with independent-review waiver |
| 25 | Help Center | Profile & settings | `/screens/25` | /help, /help/[slug] | complete; 2026-07-08 npm run check; screenshots/B7b/25.png | W-007 | Pass with independent-review waiver |
| 26 | Fitness Workouts Dashboard | Health & wellbeing | `/screens/26` | /activity, /workouts | complete; 2026-07-08 npm run check; screenshots/pilot/26.png | Asset | Pass for hifi coverage |
| 27 | Workout Detail Active | Health & wellbeing | `/screens/27` | review-route only | complete; 2026-07-08 npm run check; screenshots/B5a/27.png | Review-only; Asset | Pass for hifi coverage |
| 28 | Nutrition Diet Dashboard | Health & wellbeing | `/screens/28` | /nutrition | complete; 2026-07-08 npm run check; screenshots/pilot/28.png | None | Pass for hifi coverage |
| 29 | Meal Detail Food Logger | Health & wellbeing | `/screens/29` | review-route only | complete; 2026-07-08 npm run check; screenshots/B5a/29.png | Review-only; Asset; Feature: Barcode nutrition | Pass with product-readiness caveat |
| 30 | Finance Money Map | Domains & money | `/screens/30` | /money-map | complete; 2026-07-08 npm run check; screenshots/B6/30.png | W-007; A11y; Feature: Finance maturity, Trust/compliance | Pass with independent-review waiver; product caveat; accessibility polish |
| 31 | Transaction Budget Detail | Domains & money | `/screens/31` | review-route only | complete; 2026-07-08 npm run check; screenshots/B6/31.png | Review-only; W-007; Feature: Finance maturity, Trust/compliance | Pass with independent-review waiver; product caveat |
| 32 | Career Work Dashboard | Domains & money | `/screens/32` | /career | complete; 2026-07-08 npm run check; screenshots/B6/32.png | W-007 | Pass with independent-review waiver |
| 33 | Relationships Dashboard | Domains & money | `/screens/33` | /people | complete; 2026-07-08 npm run check; screenshots/B6/33.png | W-007 | Pass with independent-review waiver |
| 34 | Spirituality Dashboard | Domains & money | `/screens/34` | No live app route; source-only spirituality surface. | complete; 2026-07-08 npm run check; screenshots/B6/34.png | Source-only; W-007; A11y | Pass with independent-review waiver; accessibility polish; no live app route |
| 35 | Learning Growth Dashboard | Domains & money | `/screens/35` | review-route only | complete; 2026-07-08 npm run check; screenshots/B6/35.png | Review-only; W-007 | Pass with independent-review waiver |
| 36 | Creativity Dashboard | Domains & money | `/screens/36` | review-route only | complete; 2026-07-08 npm run check; screenshots/B6/36.png | Review-only; W-007 | Pass with independent-review waiver |
| 37 | Journal | Domains & money | `/screens/37` | /wellbeing/journal | complete; 2026-07-08 npm run check; screenshots/B6/37.png | W-007 | Pass with independent-review waiver |
| 38 | Habits | Domains & money | `/screens/38` | /wellbeing/habits | complete; 2026-07-08 npm run check; screenshots/B6/38.png | W-007 | Pass with independent-review waiver |
| 39 | Leaderboard | Social & community | `/screens/39` | /leaderboard | complete; 2026-07-08 npm run check; screenshots/B7a/39.png | W-007; A11y; Asset | Pass with independent-review waiver; accessibility polish |
| 40 | Community Chat Rooms | Social & community | `/screens/40` | /community, /community/[slug] | complete; 2026-07-08 npm run check; screenshots/B7a/40.png | W-007; A11y; Asset | Pass with independent-review waiver; accessibility polish |
| 41 | Schedule Calendar | Today & missions | `/screens/41` | /schedule, /wellbeing/schedule, /wellbeing/schedule/[date] | complete; 2026-07-08 npm run check; screenshots/B3/41.png | A11y; Feature: Proactive loop | Pass with product-readiness caveat; accessibility polish |
| 42 | Celebration Overlay | Profile & settings | `/screens/42` | /subscription/success | complete; 2026-07-08 npm run check; screenshots/B7a/42.png | W-007 | Pass with independent-review waiver |
| 43 | Paywall upgrade | Profile & settings | `/screens/43` | /subscription, /upgrade, /locked/[pageKey] | complete; 2026-07-08 npm run check; screenshots/B7b/43.png | W-007 | Pass with independent-review waiver |
| 44 | Water Intake | Today & missions | `/screens/44` | review-route only | complete; 2026-07-08 npm run check; screenshots/B3/44.png | Review-only | Pass for hifi coverage |
| 45 | Daily Checkin | Today & missions | `/screens/45` | /wellbeing/emotional-checkin | complete; 2026-07-08 npm run check; screenshots/B3/45.png | A11y | Pass for hifi coverage; accessibility polish |
| 46 | Accountability | Social & community | `/screens/46` | review-route only | complete; 2026-07-08 npm run check; screenshots/B7a/46.png | Review-only; W-007 | Pass with independent-review waiver |
| 47 | Competitions | Social & community | `/screens/47` | /competitions | complete; 2026-07-08 npm run check; screenshots/B7a/47.png | W-007; Asset | Pass with independent-review waiver |
| 48 | Intelligence Dashboard | Life intelligence | `/screens/48` | /wellbeing/insights | complete; 2026-07-08 baseline; - | Feature: Proactive loop | Pass with product-readiness caveat |
| 49 | Progress Photos | Health & wellbeing | `/screens/49` | review-route only | complete; 2026-07-08 npm run check; screenshots/B5a/49.png | Review-only; A11y; Asset | Pass for hifi coverage; accessibility polish |
| 50 | Profile Edit | Profile & settings | `/screens/50` | /profile/edit | complete; 2026-07-08 npm run check; screenshots/B4/50.png | Asset | Pass for hifi coverage |
| 51 | Voice Call History | CIA, voice & chat | `/screens/51` | /voice-call | complete; 2026-07-08 npm run check; screenshots/B2/51.png | A11y; Feature: Trust/compliance, Voice/PSTN | Pass with product-readiness caveat; accessibility polish |
| 52 | Stress Management | Health & wellbeing | `/screens/52` | /wellbeing/stress | complete; 2026-07-08 npm run check; screenshots/B5b/52.png | W-007 | Pass with independent-review waiver |
| 53 | Breathing Exercises | Health & wellbeing | `/screens/53` | /wellbeing/breathing | complete; 2026-07-08 npm run check; screenshots/B5b/53.png | W-007; Asset | Pass with independent-review waiver |
| 54 | Meditation Mindfulness | Health & wellbeing | `/screens/54` | No live app route; source-only mindfulness surface. | complete; 2026-07-08 npm run check; screenshots/B5b/54.png | Source-only; W-007 | Pass with independent-review waiver; no live app route |
| 55 | Yoga Sessions | Health & wellbeing | `/screens/55` | /yoga | complete; 2026-07-08 npm run check; screenshots/B5b/55.png | W-007; Asset | Pass with independent-review waiver |
| 56 | Recipes | Health & wellbeing | `/screens/56` | review-route only | complete; 2026-07-08 npm run check; screenshots/B5a/56.png | Review-only; Asset | Pass for hifi coverage |
| 57 | Shopping List | Health & wellbeing | `/screens/57` | review-route only | complete; 2026-07-08 npm run check; screenshots/B5a/57.png | Review-only; A11y | Pass for hifi coverage; accessibility polish |
| 58 | Sleep Tracking | Health & wellbeing | `/screens/58` | review-route only | complete; 2026-07-08 npm run check; screenshots/B5b/58.png | Review-only; W-007 | Pass with independent-review waiver |
| 59 | Streak Details | Today & missions | `/screens/59` | review-route only | complete; 2026-07-08 npm run check; screenshots/B3/59.png | Review-only | Pass for hifi coverage |
| 60 | Medication Tracking | Health & wellbeing | `/screens/60` | No live app route; source-only medication surface. | complete; 2026-07-08 npm run check; screenshots/B5b/60.png | Source-only; W-007; A11y | Pass with independent-review waiver; accessibility polish; no live app route |
| 61 | Reminders Tasks | Today & missions | `/screens/61` | review-route only | complete; 2026-07-08 npm run check; screenshots/B3/61.png | Review-only; A11y; Feature: Proactive loop | Pass with product-readiness caveat; accessibility polish |
| 62 | Quick Notes | Health & wellbeing | `/screens/62` | /quick-notes | complete; 2026-07-08 npm run check; screenshots/B5b/62.png | W-007 | Pass with independent-review waiver |
| 63 | Energy Tracking | Health & wellbeing | `/screens/63` | /wellbeing/energy | complete; 2026-07-08 baseline; - | None | Pass for hifi coverage |
| 64 | Report Block | Social & community | `/screens/64` | review-route only | complete; 2026-07-08 npm run check; screenshots/B7b/64.png | Review-only; W-007 | Pass with independent-review waiver |
| 65 | Force Update | Auth & onboarding | `/screens/65` | review-route only | complete; 2026-07-08 npm run check; screenshots/B1/65.png | Review-only | Pass for hifi coverage |
| 66 | Notification Permission | Auth & onboarding | `/screens/66` | review-route only | complete; 2026-07-08 baseline; - | Review-only | Pass for hifi coverage |
| 67 | Image Viewer | System & media | `/screens/67` | review-route only | complete; 2026-07-08 npm run check; screenshots/B7b/67.png | Review-only; W-007; Asset | Pass with independent-review waiver |
| 68 | Universal Search | Profile & settings | `/screens/68` | review-route only | complete; 2026-07-08 npm run check; screenshots/B4/68.png | Review-only | Pass for hifi coverage |
| 69 | App Rating | System & media | `/screens/69` | review-route only | complete; 2026-07-08 npm run check; screenshots/B7b/69.png | Review-only; W-007 | Pass with independent-review waiver |
| 70 | Exercise Library | Health & wellbeing | `/screens/70` | /exercises, /exercises/[id] | complete; 2026-07-08 npm run check; screenshots/B5a/70.png | Asset | Pass for hifi coverage |
| 71 | Achievement Gallery | Profile & settings | `/screens/71` | /achievements | complete; 2026-07-08 npm run check; screenshots/B7a/71.png | W-007 | Pass with independent-review waiver |
| 72 | Knowledge Graph | Life intelligence | `/screens/72` | /knowledge-graph | complete; 2026-07-08 npm run check; screenshots/B4/72.png | Feature: Trust/compliance, Doc intelligence | Pass with product-readiness caveat |
| 73 | Mission Journal | Today & missions | `/screens/73` | review-route only | complete; 2026-07-08 npm run check; screenshots/B3/73.png | Review-only | Pass for hifi coverage |
| 74 | Conversations Hub | CIA, voice & chat | `/screens/74` | /chat-history, /chat | complete; 2026-07-08 npm run check; screenshots/B2/74.png | None | Pass for hifi coverage |
| 75 | Direct Chat | CIA, voice & chat | `/screens/75` | /messages | complete; 2026-07-08 baseline; - | Asset | Pass for hifi coverage |
| 76 | Group Chat | CIA, voice & chat | `/screens/76` | /chat | complete; 2026-07-08 npm run check; screenshots/B2/76.png | Asset | Pass for hifi coverage |
| 77 | Message Actions | CIA, voice & chat | `/screens/77` | review-route only | complete; 2026-07-08 npm run check; screenshots/B2/77.png | Review-only; Asset | Pass for hifi coverage |
| 78 | Reports Center | Social & community | `/screens/78` | review-route only | complete; 2026-07-08 npm run check; screenshots/B7b/78.png | Review-only; W-007; Feature: Trust/compliance | Pass with independent-review waiver; product caveat |
| 79 | Call Summary | CIA, voice & chat | `/screens/79` | review-route only | complete; 2026-07-08 npm run check; screenshots/B2/79.png | Review-only; Feature: Voice/PSTN | Pass with product-readiness caveat |
| 80 | Music Coach | System & media | `/screens/80` | /soundscape | complete; 2026-07-08 npm run check; screenshots/B7b/80.png | W-007; A11y; Asset | Pass with independent-review waiver; accessibility polish |
| 81 | Video Library | System & media | `/screens/81` | review-route only | complete; 2026-07-08 npm run check; screenshots/B7b/81.png | Review-only; W-007; A11y; Asset | Pass with independent-review waiver; accessibility polish |
| 82 | Accountability Contract | Social & community | `/screens/82` | /contracts | complete; 2026-07-08 npm run check; screenshots/B7a/82.png | W-007 | Pass with independent-review waiver |
| 83 | Social Buddy Profile | Profile & settings | `/screens/83` | /profile/[id] | complete; 2026-07-08 npm run check; screenshots/B4/83.png | Asset | Pass for hifi coverage |
| 84 | Data Sources | Life intelligence | `/screens/84` | review-route only | complete; 2026-07-08 npm run check; screenshots/B4/84.png | Review-only; Feature: Trust/compliance | Pass with product-readiness caveat |
| 85 | Obstacle Coach | System & media | `/screens/85` | /obstacles/[id] | complete; 2026-07-08 npm run check; screenshots/B7b/85.png | W-007 | Pass with independent-review waiver |
| 86 | Virtual Tryon | Health & wellbeing | `/screens/86` | /wellbeing/virtual-tryon | complete; 2026-07-08 npm run check; screenshots/B5a/86.png | Asset; Feature: Trust/compliance | Pass with product-readiness caveat |
| 87 | Tryon History | Health & wellbeing | `/screens/87` | /wellbeing/virtual-tryon/history | complete; 2026-07-08 npm run check; screenshots/B5a/87.png | Asset | Pass for hifi coverage |
| 88 | Vision Suite | Health & wellbeing | `/screens/88` | /wellbeing/vision | complete; 2026-07-08 npm run check; screenshots/B5a/88.png | Asset | Pass for hifi coverage |
| 89 | Wellbeing Hub | Health & wellbeing | `/screens/89` | /wellbeing | complete; 2026-07-08 baseline; - | None | Pass for hifi coverage |
| 90 | Progress Measurements | Life intelligence | `/screens/90` | /progress | complete; 2026-07-08 npm run check; screenshots/B4/90.png | A11y; Asset | Pass for hifi coverage; accessibility polish |
| 91 | Social Feed | Social & community | `/screens/91` | /feed | complete; 2026-07-08 baseline; - | Asset | Pass for hifi coverage |
| 92 | Reputation | Life intelligence | `/screens/92` | /reputation | complete; 2026-07-08 npm run check; screenshots/B4/92.png | None | Pass for hifi coverage |
| 93 | Mood Trends | Life intelligence | `/screens/93` | /wellbeing/mood | complete; 2026-07-08 npm run check; screenshots/B4/93.png | A11y | Pass for hifi coverage; accessibility polish |
| 94 | Webinars | Social & community | `/screens/94` | /webinars, /webinars/[slug] | complete; 2026-07-08 npm run check; screenshots/B7a/94.png | W-007; Asset | Pass with independent-review waiver |
| 95 | Pods Hub | Social & community | `/screens/95` | /groups | complete; 2026-07-08 npm run check; screenshots/B7a/95.png | W-007; Asset | Pass with independent-review waiver |
| 96 | Health Data View | Life intelligence | `/screens/96` | /whoop | complete; 2026-07-08 npm run check; screenshots/B4/96.png | Asset | Pass for hifi coverage |
| 97 | Plans Library | Today & missions | `/screens/97` | /plans | complete; 2026-07-08 npm run check; screenshots/B3/97.png | A11y; Feature: Proactive loop | Pass with product-readiness caveat; accessibility polish |
| 98 | System States | System & media | `/screens/98` | /offline, /maintenance, /forbidden, /unauthorized, /coming-soon | complete; 2026-07-08 npm run check; screenshots/B7b/98.png | W-007; Feature: PWA/offline | Pass with independent-review waiver; product caveat |
| 99 | WhatsApp Inbox | CIA, voice & chat | `/screens/99` | /whatsapp | complete; 2026-07-08 npm run check; screenshots/B2/99.png | Asset; Feature: WhatsApp go-live, Trust/compliance | Pass with product-readiness caveat |
