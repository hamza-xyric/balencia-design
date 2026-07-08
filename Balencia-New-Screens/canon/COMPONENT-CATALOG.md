# Balencia Glass Component Catalog (glass-dark v1)

Canonical component names for all hi-fi specs. Specs reference these names verbatim; a component not listed here must be flagged `NEW:` in the spec so it can be promoted into this catalog. Tokens cited from `COMPACT-CANON.md` (CANON).

Format: **Name** — purpose · anatomy · variants · key tokens · states.

---

## 1. Surfaces & structure

**GlassCard** — default container on dark. Anatomy: `.glass-card` (CANON §2), 20–24px inner padding, optional semantic glow (CANON §3). Variants: `default`, `hero` (radius 40, Display type allowed), `interactive` (press scale .98 + glow brighten). States: default / pressed / disabled (40% opacity, no glow).

**FrostCard** — immersive frost for onboarding and over-glow moments. `.glass-frost`. Variants: `choice` (see ChoiceCardFrost), `summary`. Never used on data-dense screens.

**SolidCard** — data-density surface. `--surface-2` bg, radius 28, border `rgba(255,255,255,.06)`, no blur. Used when legibility beats atmosphere (tables, dense lists, charts). Variant: `elevated` (`--surface-3`).

**BentoGrid** — dashboard composition. 2-col base on 390px (gap 12), tiles span 1×1 / 2×1 / 2×2. Tiles are GlassStatCard or SolidCard. Max one `hero` glass tile per viewport-height.

**SectionHeader** — Overline (11 caps, +0.14em, paper-64%) + optional H2 + optional trailing action (ghost, orange). 24px top rhythm.

**TopBar** — screen header. Back chevron (44px target) · H1 or title-on-scroll · up to 2 glyph actions. Transparent over atmosphere; gains `.glass-pill` backdrop once content scrolls under.

**GlassNavBar** — floating bottom pill (CANON §6): 4 tabs Today · CIA · Goals · Me. Active = orange filled icon + label; inactive = outline paper-64%. Sits 16px above home indicator; content scrolls beneath with fade.

**Sheet** — bottom sheet. `.glass-frost` top-radius 28, grabber pill, scrim `rgba(10,10,15,.6)`. Variants: `half`, `full`, `action` (list of ListRow). Spring in 250ms.

**ModalOverlay** — centered FrostCard over scrim; reserved for blocking moments (consent, celebration, crisis).

**SegmentedTabs** — glass pill track, active segment = `--surface-3` + orange label, 150ms slide.

**ListRow** — settings/list unit: 24px leading icon · label (Body) · value/hint (Body-light, paper-64%) · trailing chevron/toggle. 56px min height, hairline separators `rgba(255,255,255,.06)`.

**CalendarStrip** — horizontal 7-day scroller; day pill = glass-pill; today ringed orange; days with completed actions get green dot.

**FABQuickLog** — global quick-log (CANON §8): 56px orange circle, plus glyph, bottom-right above nav. Expands to 3 glass-pill actions (water · meal · mood). Present on Today-tab screens.

## 2. Buttons & inputs

**BtnPrimary** — orange `#FF5E00` fill, paper-50 label (NM Medium 16), radius 999, height 52, press = scale .98 + darken 6%. One per composition.
**BtnSecondary** — `.glass-pill` bg, paper-100 label, 1px border `.10`.
**BtnGhost** — no fill, orange label, 44px target.
**BtnSuccess** — forest green fill; completion confirmations only.
**BtnCoach** — royal purple fill or purple-tinted glass; CIA-initiated actions only.
All: disabled = 40% opacity; loading = label→spinner, width locked.

**GlassPillInput** — `.glass-pill` field, height 52, placeholder paper-40%, focus = 1px orange border + subtle orange glow. Variants: text, email, password (eye toggle), search (leading glyph), multiline (radius 20).

**ChoiceCardFrost** — numbered MCQ selection card (Testosterone-RX style): FrostCard, leading number badge (glass-pill, NM Medium), title Body, sub Body-light. Selected = orange 1.5px border + `glow-you` bleed. Single- and multi-select variants.

**ChipDomainTag** — pill chip, domain color at 16% bg + domain-color label/icon (CANON §4 palette). Tags/icons only, never chrome.

**ChipProvenance** — data-source chip: glass-pill micro (24px), Caption label `via WHOOP` / `you logged` / `estimated`. Mandatory beside real metrics (CANON §7).

**Toggle / Stepper / Slider** — track `--surface-3`; active fill orange; thumb paper-50. Slider value bubble uses tabular-nums.

## 3. Data & honesty

**GlassStatCard** — the workhorse. Anatomy: Overline label · KPI (NM Medium tabular-nums, 28–40) · delta (green ▲ / orange ▼ with meaning, never red-vs-green moralizing) · ChipProvenance · semantic glow (one, meaning-stated). Variants: `metric`, `ring` (embeds ProgressRing), `sparkline`. States: real / low-confidence (KPI at 64%, `estimated · low confidence` Caption) / honest-null (see HonestNullState) / skeleton.

**KPIRow** — 2–3 inline mini-stats sharing one SolidCard; dividers hairline; each mini-stat keeps its own provenance.

**ProgressRing** — stroke 6–8px; fill orange → flips green at 100% with 250ms sweep; center KPI tabular-nums; track `rgba(255,255,255,.08)`.

**ProgressBar** — 8px, radius 999, same fill logic. Variant `segmented` for multi-step flows.

**TrendChart** — line chart per CANON §7: solid orange user line (2px), dashed purple projection, green milestone dots (6px), gridlines `rgba(255,255,255,.05)`, axis Caption paper-40%. No area-fill gradients beyond single-color 12% fade. Empty/insufficient → HonestNullState inside chart frame.

**ConfidenceMeter** — 3-dot or thin-bar indicator (low/med/high) + Caption label; purple when AI-derived.

**HonestNullState** — designed empty for missing data: quiet glyph, Body-light line (`Not enough data yet — 3 more days`), optional BtnGhost action. Never a fabricated number, never an error tone.

**MomentumBar / ChargeMeter** — energy/momentum visual (per ascii_wireframes `_LEGEND.md` rule): MomentumBar for cumulative progress, ChargeMeter for depletable capacity. Warm-glow fill, tabular-nums value.

## 4. CIA (coach) components

**CIAPresenceOrb** — breathing purple-core orb over warm atmosphere; reacts to voice amplitude; idle breathe 4s ease; listening = ring pulse; thinking = slow rotation shimmer. Hero of onboarding + full-screen voice.

**CIAInsightCard** — purple-tinted glass (`glow-cia`), leading spark glyph, insight copy in CIA voice with one Tiempos-italic emphasis word, optional evidence row (ChipProvenance ×n), actions: BtnCoach + BtnGhost. Cross-pillar insights cite both domains via ChipDomainTag pair.

**IntelligenceTimeline** — live "working" trace inside CIA surfaces: staged Caption lines (`checking your sleep…` → `comparing to last month…`), purple dot pulses per stage; collapses to summary line when done.

**CIAChatBubble** — user = orange fill bubble (paper-50 text, radius 20/4 tail); CIA = purple-tinted glass bubble (radius 20/4). Timestamps Caption paper-40% on long-press.

**InlineArtifactCard** — rich card inside chat: mini GlassStatCard / goal card / plan summary embedded in a CIA bubble; tap expands to full screen. Max width = bubble width.

**VoiceMicGlow** — mic button: glass-pill circle 64px, orange core glow while recording, amplitude ring; tap-and-hold or tap-to-toggle variants.

**ChatComposer** — glass-pill input + VoiceMicGlow + send (BtnPrimary circle 44). Attachment row expands as Sheet.

## 5. Gamification & social

**CelebrationOverlay** — full-screen moment: continuous-stroke line motif draws (hero/celebration only per CANON §6), green→orange particle restraint, XP line in tabular-nums, single BtnPrimary. Respects reduced-motion (fade-only variant).

**XPToast** — compact top toast: `+40 XP · Fitness` with ChipDomainTag; auto-dismiss 2.5s.

**StreakCard** — flame glyph + day count (tabular-nums) + `glow-you`; freeze/recovery state shows green `recovered` chip (honest about breaks — no fake streaks).

**BadgeTile** — achievement cell: emblem in domain color, locked = 24% opacity + lock glyph (no blur-tease for earned-able items), earned date Caption.

**LeaderboardRow** — rank (tabular-nums) · avatar · name · score; self-row = orange 1px border; top-3 get subtle metal accents (gold/silver/bronze at 24%).

**AvatarStack** — overlapping 28px avatars, +N pill.

**FeedPostCard** — SolidCard: author row (avatar, name, time Caption) · body · optional embedded GlassStatCard proof · action row (kudos, comment — outline glyphs, orange when active).

**PodCard** — group unit: name H3 · AvatarStack · shared-goal ProgressBar · activity Caption. Variant `browse` (join CTA) / `member` (streak strip).

**ReputationDial** — trust-score arc (orange fill, tabular-nums center) + tier label; breakdown rows use KPIRow.

## 6. System & compliance

**PaywallLock** — locked-feature gate (CANON §8): module renders as blurred glass preview (`blur 20px` over real layout, never a gray box) + lock glyph + one-line value copy + BtnPrimary `Unlock with premium`. Variants: full-screen (route gate) / inline tile.

**ConsentCard** — FrostCard stating what data, why, retention; BtnPrimary accept + BtnGhost decline (equal prominence); revoke path named in sub-copy. Required for health data, photos, voice, third-party sources.

**SafetyResourceCard** — crisis resources entry: calm `--surface-2` card, teal-free, no gamification, one-tap call/text actions, always reachable from mood/check-in/journal surfaces.

**EmptyState** — first-use empty (distinct from HonestNullState): illustration-free, Display-small line with one emphasis word, Body-light sub, BtnPrimary starter action.

**ErrorState** — quiet failure: glyph, Body line (plain language, no codes), BtnSecondary retry. Never blames the user.

**SkeletonState** — shimmer blocks (`--surface-3` base, 1.2s sweep) matching real layout geometry; charts skeleton as axis + ghost line.

**OfflineBanner / SyncStatus** — glass-pill banner: `offline — showing last sync 2h ago` (honest staleness labeling).

**NotificationCard** — ListRow variant with unread orange dot, domain tag, relative time; swipe actions (done/archive).

**SearchOverlay** — universal search (screen 68): full-screen scrim + GlassPillInput autofocus + grouped results (SectionHeader per type); recent queries as ChipChoice row.

---

## Usage rules

1. One semantic glow per card; the spec states the color **and the meaning** (CANON §3).
2. Solid vs glass: data-dense = SolidCard; hero/nav/overlay = glass (CANON §2 rule).
3. Every metric renders through GlassStatCard/KPIRow states — real / low-confidence / honest-null (CANON §7). No exceptions.
4. One BtnPrimary per composition; one Display moment per screen; one Tiempos-italic emphasis word per moment.
5. Locked features always use PaywallLock — never hide, never dead-end.
6. New components: flag `NEW:` in spec + one-line rationale; promoted here at consistency barriers.
