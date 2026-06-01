# Balencia Creative Opportunities Review

Status: draft for finalization — production tracking in [../../balencia-creatives-production/batches/index.md](../../balencia-creatives-production/batches/index.md); resolved rules in [../../balencia-creatives-production/registry/product-decisions.json](../../balencia-creatives-production/registry/product-decisions.json)  
Purpose: identify where images, video, motion graphics, avatars, illustrations, thumbnails, and richer visual assets should be added before producing final creatives.

## Sources Reviewed

- `balencia-screens/src/data/screens.ts` for the canonical route inventory.
- `balencia-screens-reviewed/batches/*.md` for audited screen quality and visual gaps.
- `balencia-screens-reviewed/findings/findings-ledger.md` for cross-batch launch blockers.
- `app_design 3/Balencia-Design-Direction.md` for brand and screen intent.
- `app_design 3/_shared-patterns.md` for component and empty-state patterns.
- `Balencia/Balencia-Creatives-Reference/design-system/Design-System-Overview.md` for photography and illustration direction.
- `balencia-screens/public` and `balencia-screens/src` for current asset usage.

## Executive Read

The current prototype is visually coherent, but it is mostly built from CSS gradients, icons, cards, and text. The public asset inventory is almost entirely logos plus default Next assets. There are almost no real photos, thumbnails, video posters, provider marks, SIA avatar assets, or content-specific illustrations.

That plainness is not evenly distributed. Many transactional screens should stay quiet. The biggest creative gaps are where Balencia is supposed to feel alive: onboarding, SIA voice, domain content, media surfaces, progress photos, exercise/yoga/recipe libraries, achievements, and empty/system states.

The recommendation is not to add imagery everywhere. Use creatives where they increase trust, clarify content, or make a signature product moment feel premium. Keep auth, legal, settings, and sensitive consent screens restrained.

## Implementation Evidence

- `balencia-screens/public` currently contains logo files and default Next assets, not product media libraries.
- `next/image` is used for the Balencia wordmark, but app routes otherwise rely on icons, CSS gradients, and SVG/chart primitives.
- Media-heavy routes still use placeholders: Image Viewer uses a camera icon, Progress Photos uses camera tiles, Recipes use utensil icons, Exercise Library uses dumbbell icons, Music uses a music icon, and Video Library uses gradient/video-icon cards.
- SIA full-screen voice uses a static `S` inside animated rings instead of the specified 3D avatar or expressive 2D fallback.

## Creative Standards To Apply

- Photography: warm, candid, natural light, real people ages 25-45, slight grain, no cold clinical imagery, no generic gym-bro aesthetic, no wellness-influencer look.
- Illustration: custom for empty states, system explanations, permissions, and low-risk onboarding support.
- Motion: use for state and product meaning, especially SIA, onboarding, breathing, meditation, celebrations, and correlation moments.
- Data visuals: use semantic charts, maps, graph canvases, and timeline visuals. Do not use decorative charts.
- Containers: rounded Balencia shape system, warm overlays on photography, no black photo overlays.
- Restraint: one primary visual idea per screen. Avoid making every card look like a poster.

## Priority Tiers

| Priority | Meaning | Use |
| --- | --- | --- |
| P0 | Signature or credibility-critical creative | Missing asset makes the screen feel unfinished or undermines the product promise. |
| P1 | Strong product-content creative | Asset improves trust, scanability, or emotional differentiation. |
| P2 | Supportive polish | Useful empty-state, permission, system, or micro-illustration. |
| P3 | Avoid or keep minimal | Large creative likely adds clutter or weakens trust. |

## P0 Must-Have Creative Placements

| Screen | Route | Creative needed | Why |
| --- | --- | --- | --- |
| 01 Splash screen | `/auth/splash` | Symbol-first logo reveal and continuous-stroke animation. | This is the first brand moment. The audit notes the live screen uses the full wordmark where the spec expects a symbol-led reveal. |
| 02 Motion carousel | `/auth/carousel` | Four real-time motion graphics: life domains, SIA presence, correlation insight, RPG progress. | The spec calls this the 5-10 second visual hook. It should feel premium before the first form field. |
| 07 SIA onboarding | `/auth/sia-onboarding` | Large animated brainstorming area with all core domains, goal examples, and stage-based motion. | The audit says the current visual panel is small and static, weakening the first "SIA gets me" moment. |
| 11 Voice mode full-screen | `/tabs/sia/voice-fullscreen` | 3D SIA avatar or polished 2D animated fallback with idle, listening, thinking, speaking, muted, and error states. | This is the most intimate SIA experience and a subscription-justifying moment. Current route uses a static `S` in rings. |
| 42 Celebration overlay | `/features/celebration` | Badge artwork, XP burst, continuous-stroke reward motion, share-card creative. | Gamification should feel premium and earned, not just text plus particles. |
| 49 Progress photos | `/tabs/me/progress-photos` | Secure photo thumbnails, comparison visuals, upload/camera states, AI-analysis provenance state. | Current screen shows camera placeholders while claiming AI body analysis. This is high trust risk. |
| 67 Image viewer | `/features/image-viewer` | Actual full-resolution media with loading, blurred preview, error state, gallery swipes, zoom/pan. | Audit found `imageElementCount: 0`; the viewer is currently a camera placeholder. |
| 70 Exercise library | `/domains/exercise-library` | Exercise thumbnails, form illustrations, or short-loop video posters for each exercise/detail. | Current cards use generic dumbbell placeholders and a 532-count claim with six cards. |
| 55 Yoga sessions | `/features/yoga` | Pose illustrations or video thumbnails, active pose visual, calm session artwork. | Yoga without pose visuals feels generic and less useful. |
| 56 Recipes | `/features/recipes` | Recipe photos, detail hero images, fallback food illustration, photo picker states. | Current recipe cards use utensil icons/gradients, but the spec expects photo-present and no-photo variants. |
| 80 Music coach | `/features/music` | Playlist/album art, provider artwork area, waveform or equalizer state, Spotify connection states. | Music UI without artwork reads like a settings card rather than a media surface. |
| 81 Video library | `/features/videos` | Featured video poster, row thumbnails, playable modal/fullscreen player states. | A video library needs visible video content; current surface uses gradients/icons. |
| 72 Knowledge graph | `/tabs/me/knowledge-graph` | Guided interactive insight-map as the hero visual, with graph-like relationships used only where they clarify the path. | This is a commercial differentiator. Q43 resolved against a raw force graph, so the creative should guide explainability instead of foregrounding complex graph manipulation. |

## P1 Strong Product-Content Creative

| Area | Screens | Creative direction |
| --- | --- | --- |
| Guest and plan reveal | 06, 08 | Lightweight preview/demo visual, small personalized data snapshots, plan-generation motion, subtle success reveal. |
| SIA chat and calls | 09, 10, 51, 74, 75, 76, 77, 79 | Small SIA avatar states, voice waveforms, call summary waveform, contact avatars, media thumbnails, protected-media previews. |
| Goals and missions | 13, 14, 15, 59, 73, 85 | Mission-type badge system, streak flame/trophy artwork, mission journal photo memories, obstacle-coach illustration. |
| Me identity | 16, 17, 18, 19, 20, 71 | Life-area radar/wheel, avatar/profile photo system, RPG character art, personal wiki memory map, achievement badge set, Explore module thumbnails. |
| Data and integrations | 84, 22, 78 | Provider logos, source-health visuals, in-app report preview thumbnails, reviewed-summary states, and demo/no-live-sync states. |
| Fitness/nutrition | 26, 27, 28, 29, 31 | Workout/meal thumbnails, active exercise form visuals, food/photo states, receipt photo support, barcode/photo scan imagery. |
| Finance/career/relationships | 30, 32, 33, 83 | Money-map visualization, career-path diagram, relationship avatars, buddy profile image/visibility visuals. |
| Spirituality/learning/creativity | 34, 35, 36, 37 | Respectful faith/adaptive motifs, book/course covers, portfolio/project thumbnails, journal attachment thumbnails. |
| Social/accountability | 40, 46, 47, 82 | Friends/private-first room avatars, challenge badges, partner avatars, proof thumbnails, locked-preview states, private challenge variants, contract signature/proof states. |
| Intelligence | 48 | Correlation cards, insight diagrams, projected-vs-past data visuals, explainability visuals. |
| Paywall | 43 | Blurred premium feature preview should use recognizable Balencia product content, not abstract skeleton blocks. |

## P2 Supportive Polish Opportunities

| Screens | Creative direction |
| --- | --- |
| 03e WhatsApp enrollment | WhatsApp/provider mark plus light channel-benefit illustration. Keep trust copy dominant. |
| 05 Forgot password, 05b Reset password | Optional small email/security illustration. Do not distract from recovery. |
| 12 Home screen | Very restrained SIA insight motif or mini data visual. Avoid turning Today into a marketing poster. |
| 24 Notification history | Category icons and warm empty state for no notifications. |
| 25 Help center | SIA support illustration or help-topic icons. |
| 41 Schedule/calendar | Empty-day illustration and calendar-sync/provider marks. |
| 44 Water intake | Water ring animation, droplet fill state, target celebration. |
| 45 Daily check-in | Mood visual system, gentle check-in state changes. |
| 52 Stress management | Stress/recovery visualizer, calming state illustration. |
| 53 Breathing exercises | Animated breathing visual as the core surface. |
| 54 Meditation | Session artwork, ambient timer state, completion artwork. |
| 57 Shopping list | Ingredient/source thumbnails only where helpful; keep checklist utility first. |
| 58 Sleep tracking | Sleep-stage chart and calm ambient sleep motif. |
| 60 Medication tracking | Medication icon set, pill shapes, safety state visuals. Avoid real pill photography unless verified and useful. |
| 61 Reminders & tasks | Source icons and lightweight empty state. |
| 62 Quick notes | Empty archive illustration and attachment-type icons. |
| 63 Energy tracking | Energy/mood visual scale and trend motif. |
| 64 Report/block | Neutral safety illustration only; keep serious and non-playful. |
| 65 Force update | App icon/update illustration to soften the hard gate. |
| 66 Notification permission | Bell/benefit illustration with native-prompt state variants. |
| 68 Universal search | Category icons and no-results illustration. Keep search itself fast and plain. |
| 69 App rating | Star/rating micro-visuals and non-coercive prompt-state variants only. Avoid coercive prefilled positive artwork. |

## P3 Keep Minimal

These screens should not receive big images or decorative hero art. They need polish through spacing, controls, provider marks, state, and copy.

| Screens | Reason |
| --- | --- |
| 03 Sign up, 04 Sign in | Account creation should stay low-friction. Use official Google/Apple marks, not decorative imagery. |
| 03b OTP verification | OTP needs input clarity, numeric keyboard, resend states. Large creative would add friction. |
| 03c Consent | Legal consent must feel explicit and trustworthy. Avoid decorative art competing with terms/privacy. |
| 03d Complete profile | Sensitive DOB/gender ask needs clear reasoning, not visual flourish. |
| 21 Settings | Utility surface. Use icons and provider/status rows only. |
| 50 Profile edit | Avatar/photo controls matter, but the form itself should stay quiet. |
| 64 Report/block | Serious safety flow. Use neutral system visuals only. |

## Screen-By-Screen Placement Matrix

| ID | Screen | Priority | Recommended creative placement |
| --- | --- | --- | --- |
| 01 | Splash screen | P0 | Symbol reveal, continuous stroke, brand glow. |
| 02 | Motion carousel | P0 | Motion-graphic panels, not a pre-recorded video. |
| 03 | Sign up | P3 | Official OAuth marks only. |
| 03b | OTP verification | P3 | None beyond input/state polish. |
| 03c | Consent | P3 | Legal/status icons only. |
| 03d | Complete profile | P3 | Tiny SIA/trust marker only if needed. |
| 03e | WhatsApp enrollment | P2 | WhatsApp mark, channel-benefit mini illustration. |
| 04 | Sign in | P3 | Official OAuth marks only. |
| 05 | Forgot password | P2 | Optional small email/security illustration. |
| 05b | Reset password | P3 | Minimal security iconography. |
| 06 | Guest preview | P1 | Lightweight preview/demo visual and sample app data. |
| 07 | SIA onboarding | P0 | Animated domain brainstorming canvas. |
| 08 | Initial plan | P1 | Plan reveal motion and mission card polish. |
| 09 | SIA chat | P1 | SIA avatar, rich card charts/media thumbnails. |
| 10 | Voice mode in-chat | P1 | Reactive waveform and mic-state visuals. |
| 11 | Voice mode full | P0 | 3D or premium 2D SIA avatar. |
| 12 | Home screen | P2 | Subtle insight/data visual, no big hero image. |
| 13 | Mission board | P2 | Mission badges and status visuals. |
| 14 | Mission detail | P2 | Mission identity/progress hero. |
| 15 | Create mission | P1 | SIA planning/generation state visuals. |
| 16 | Life areas overview | P1 | Life-area wheel/radar or domain constellation. |
| 17 | Me main | P1 | Avatar/character glimpse and profile visual. |
| 18 | Explore section | P1 | Module thumbnails/icons per domain. |
| 19 | RPG character | P1 | Character/avatar art and reward visuals. |
| 20 | Personal wiki | P1 | Memory map, node visuals, source cards. |
| 21 | Settings | P3 | Icons only. |
| 22 | Connected services | P2 | Provider logos and status visuals. |
| 23 | Subscription & billing | P1 | Premium feature preview, plan comparison visuals, restore/trial/error states. |
| 24 | Notification history | P2 | Category icons and empty state. |
| 25 | Help center | P2 | SIA support illustration/topic icons. |
| 26 | Fitness dashboard | P1 | Workout thumbnail, recovery visual, exercise cue. |
| 27 | Workout detail | P1 | Exercise form visual/video poster and active-state visuals. |
| 28 | Nutrition dashboard | P1 | Meal thumbnails, macro visuals, water states. |
| 29 | Meal detail | P1 | Meal photo, barcode/photo scan states. |
| 30 | Finance dashboard | P1 | Money-map visualization and category visuals. |
| 31 | Budget detail | P1 | Receipt photo and category visuals. |
| 32 | Career dashboard | P2 | Career-path visual and project icons. |
| 33 | Relationships dashboard | P1 | Real/profile avatars, relationship state visuals. |
| 34 | Spirituality dashboard | P1 | Respectful belief-adaptive motifs, configured/unconfigured states, source/status visuals. |
| 35 | Learning dashboard | P1 | Book/course cover art and study progress visuals. |
| 36 | Creativity dashboard | P1 | Portfolio/project thumbnails and prompt artwork. |
| 37 | Journal | P2 | Empty writing illustration and attachment thumbnails. |
| 38 | Habits | P2 | Habit icons, streak visuals, empty state. |
| 39 | Leaderboard | P1 | Friends/private-first avatars, podium/badge visuals, no global-rank emphasis. |
| 40 | Community | P1 | Friends/private-first room avatars and community cover chips. |
| 41 | Schedule/calendar | P2 | Empty-day illustration and sync/provider marks. |
| 42 | Celebration overlay | P0 | Badge artwork, XP burst, share-card visual. |
| 43 | Paywall | P1 | Blurred premium preview from real product surfaces. |
| 44 | Water intake | P2 | Water fill/ring animation and goal celebration. |
| 45 | Daily check-in | P2 | Mood visual system and check-in states. |
| 46 | Accountability | P1 | Partner avatars, proof thumbnails, commitment visuals. |
| 47 | Competitions | P1 | Challenge badges/covers, locked previews, self-only/private challenge visuals. |
| 48 | Intelligence dashboard | P1 | Correlation/forecast visual system. |
| 49 | Progress photos | P0 | Actual photo thumbnails, compare, privacy states. |
| 50 | Profile edit | P3 | Avatar/photo picker only. |
| 51 | Voice call history | P2 | Waveform thumbnails and call status visuals. |
| 52 | Stress management | P2 | Stress/recovery visualizer. |
| 53 | Breathing exercises | P1 | Animated breathing visual. |
| 54 | Meditation | P1 | Session artwork, ambient active state. |
| 55 | Yoga sessions | P0 | Pose illustrations or video thumbnails. |
| 56 | Recipes | P0 | Recipe photos and fallback food illustrations. |
| 57 | Shopping list | P2 | Ingredient/source thumbnails, sparingly. |
| 58 | Sleep tracking | P2 | Sleep-stage chart and calm ambient motif. |
| 59 | Streak details | P1 | Flame/trophy/reward visuals. |
| 60 | Medication tracking | P2 | Medication icon set and safety states. |
| 61 | Reminders & tasks | P2 | Source icons and empty state. |
| 62 | Quick notes | P2 | Empty-note illustration and attachment icons. |
| 63 | Energy tracking | P2 | Energy scale and trend visual. |
| 64 | Report/block | P3 | Neutral safety icon only. |
| 65 | Force update | P2 | App icon/update illustration. |
| 66 | Notification permission | P2 | Bell/benefit illustration and prompt states. |
| 67 | Image viewer | P0 | Actual media viewer with zoom/pan/gallery. |
| 68 | Universal search | P2 | Category icons and no-results state. |
| 69 | App rating | P3 | Star micro-interactions and non-coercive prompt-state variants only. |
| 70 | Exercise library | P0 | Exercise thumbnails/form illustrations/video posters. |
| 71 | Achievement gallery | P1 | Earned, near-next, progress, and motivation-adaptive hidden/locked badge variants. |
| 72 | Knowledge graph | P0 | Guided interactive insight-map with explainable relationship visuals. |
| 73 | Mission journal | P1 | Mission photo memories and journal thumbnails. |
| 74 | Conversations hub | P1 | Contact avatars and thread media previews. |
| 75 | Direct chat | P1 | Contact avatar and shared-media thumbnails. |
| 76 | Group chat | P1 | Group avatars and mission/media cards. |
| 77 | Message actions | P1 | Protected media preview and reaction visuals. |
| 78 | Reports center | P1 | Report preview thumbnails and data-review visuals. |
| 79 | Call summary | P1 | Waveform, transcript highlight, action conversion visuals. |
| 80 | Music coach | P0 | Album/playlist artwork and player visual states. |
| 81 | Video library | P0 | Video thumbnails/posters and player states. |
| 82 | Accountability contract | P1 | Signature/proof/partner permission visuals. |
| 83 | Social buddy profile | P1 | Profile avatar, shared mission visuals, privacy-state artwork. |
| 84 | Data sources | P1 | Provider logos, source-health, demo/no-live-sync, and connection-placeholder visuals. |
| 85 | Obstacle coach | P2 | Coaching/obstacle illustration and recovery-state visuals. |

## Creative Packages To Request From Design

1. SIA identity package: 3D or 2D avatar, small chat avatar, voice avatar states, waveform/particle style, error/permission states.
2. Onboarding motion package: splash reveal plus four carousel motion scenes and reduced-motion stills.
3. Domain content package: exercise, yoga, recipe, meal, finance, learning, creativity, spirituality, and relationship visual systems.
4. Media/content package: photo thumbnails, video posters, playlist/album art, receipt/photo placeholders, protected media states.
5. Gamification package: achievement badges, XP celebration, streak flame, freeze token, mission-type badges.
6. Empty/system package: no notifications, no journal entries, no schedule, help, permissions, force update, search no-results, app rating.
7. Provider/logo package: Google, Apple, WhatsApp, Spotify, YouTube, WHOOP, calendar/health sources, with official usage constraints.

## Resolved Product Decisions Affecting Creatives

| Decision | Resolution | Creative impact |
| --- | --- | --- |
| SIA avatar direction | Target a proper 3D SIA avatar; use a polished reactive 2D avatar only if 3D is technically infeasible for V1. | Produce the SIA identity package assuming 3D first, with 2D fallback states for performance risk. |
| Guest preview scope | Guest preview can remain an entry-form placeholder for this prototype, labeled as preview/demo. | Do not overproduce a full browsable guest-shell montage for prototype acceptance; use honest preview/demo visuals only. |
| Progress-photo privacy and sharing | Photos are encrypted in transit and at rest, private by default, excluded from human review/model training, user-deletable, and AI body analysis is premium opt-in. Progress-photo sharing is not allowed in V1. | Progress Photos and Image Viewer creatives need secure thumbnails, locked/private states, analysis provenance, delete states, and no share affordance for progress photos. |
| V1 report export scope | Preserve no data export for V1; reports stay in-app with screenshot-level sharing only. | Reports creatives should show in-app previews and reviewed summaries, not PDF export, data package, or external-share promises. |
| Provider integration depth for prototype | Spotify and YouTube can show honest demo recommendations until provider integrations land; Data Sources can remain a clearly marked visual trust placeholder. | Media/provider assets should show demo, connect, provider-mark, and no-live-sync states without implying real playback or sync. |
| Social exposure | Social V1 stays friends/private-first; accountability and competitions can appear as locked previews, and competitions need self-only/private challenge modes. | Avoid global/country ranking, public-room, or public-proof creative as the default V1 visual language. |
| Knowledge Graph shape | V1 should be a guided interactive insight-map, not a raw force graph. | Use map/path/explainability visuals rather than a dense freeform node canvas as the primary creative ask. |
| Motivation-adaptive achievements | Low-motivation users should see earned and near-next achievements, with most locked badges hidden. | Badge artwork needs earned, near-next, progress, and quieter hidden/locked variants instead of a wall of locked trophies. |

## Remaining Creative Production Choices

| Decision | Current leaning |
| --- | --- |
| Use of real photography vs generated illustration vs sourced stock. | Prefer warm, real-feeling photography for people/content surfaces and custom illustration for empty/system states; avoid generic stock. |
| First creative production slice. | Start with P0 onboarding, SIA voice, media/photo surfaces, and Knowledge Graph because those determine premium credibility. |

## Immediate Recommendation

Start with P0, because those are the screens where missing creative is not just visual polish - it changes whether the app feels premium, alive, and credible. After P0, move to P1 by domain so each area gets content credibility without over-decorating utility screens.
