# 25-help-center - hi-fi glass spec

### 1. Header
- **ID:** 25
- **Name:** Help center
- **Route(s) covered:** /help, /help/[slug]
- **Tab:** Me / Public support
- **Source:** app_design 3/25-help-center.md plus ascii_wireframes/25-help-center.md
- **Batch:** 21

### 2. Purpose
Help center provides search, article categories, article detail, CIA help handoff, and contact support escalation. It leads with self-service and a helpful CIA route, then offers browsable FAQ and human support without hiding privacy or account recovery paths.

### 3. Entry & exit
- **Entry paths:** Me quick link, public route /help, article deep link /help/[slug], system-state support link, and search result.
- **Primary exit:** Ask CIA opens coach with help context; article rows push to /help/[slug]; contact support opens support request sheet.
- **Secondary exits:** back to source, terms/privacy webview, support email/form, or system-state retry.
- **Failure exit:** if article search fails, keep categories visible and offer Ask CIA plus Contact support.

### 4. Layout anatomy
**Regions, top to bottom:**
1. **TopBar** with back, Help center title, and optional support status.
2. **SearchOverlay / search field** for help topics and articles.
3. **Ask CIA GlassCard** as the focal help path.
4. **FAQ categories** for Getting started, CIA and AI coach, Goals and tracking, Billing and subscription, Privacy and data, Troubleshooting.
5. **Article detail view** at /help/[slug] with title, body, updated date, related articles, and contact support.
6. **Contact support card** with support request, response expectation, and privacy note.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| <  Help center                       |
+--------------------------------------+
| [ Search help topics              ]  |
|                                      |
| +----------------------------------+ |
| | Ask CIA                          | |
| | Get instant answers from your    | |
| | coach. CIA knows Balencia help.  | |
| | [Ask CIA]                        | |
| +----------------------------------+ |
|                                      |
| FAQ                                  |
| +----------------------------------+ |
| | Getting started               >  | |
| | CIA and AI coach              >  | |
| | Goals and tracking            >  | |
| | Billing and subscription      >  | |
| | Privacy and data              >  | |
| | Troubleshooting               >  | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Still need help? Contact support | |
| +----------------------------------+ |
+--------------------------------------+
```

### 5. Components
- **TopBar** - title, back, and support status.
- **SearchOverlay** - focused help search with grouped article results.
- **GlassCard** - Ask CIA focal card.
- **ListRow** - category rows, article rows, related article links.
- **SolidCard** - FAQ group and contact support card.
- **CIAInsightCard** - optional article-help explanation inside coach handoff.
- **BtnPrimary / BtnSecondary / BtnGhost** - Ask CIA, Contact support, open article.
- **ChipProvenance** - article updated date, support status, search source.
- **ErrorState / SkeletonState / HonestNullState** - catalog states.

### 6. Visual treatment
- **Atmosphere:** warm dark `#0A0A0F` with soft radial and grain; support stays calm.
- **Glass tiering:** Ask CIA uses GlassCard; FAQ and article rows use SolidCard on `#211008`.
- **Semantic glows:** Ask CIA action uses `--glow-you #FF5E00`; solved support state uses `--glow-done #34A853`; CIA identity/evidence uses `--glow-cia #7F24FF`.
- **Type:** Neue Montreal; focal card can read `Ask *CIA*` with Tiempos italic emphasis.
- **60/30/10:** orange primary help action, green solved state, purple AI identity only.

### 7. Content & copy
- **H1:** Help center
- **Search placeholder:** Search help topics
- **Focal card:** Ask *CIA*; Get instant answers from your coach. CIA knows Balencia help.
- **FAQ categories:** Getting started; CIA and AI coach; Goals and tracking; Billing and subscription; Privacy and data; Troubleshooting.
- **Article detail metadata:** Updated date; article provenance; related articles.
- **Primary CTAs:** Ask CIA; Contact support
- **Secondary CTAs:** Open article; Search again; View related article
- **Empty copy:** No matches found. Try asking CIA instead, or contact support.
- **Error copy:** Couldn't load help topics. Categories stay available.

### 8. Data & honesty states
- **Search results:** real = indexed article matches plus ChipProvenance; low-confidence = partial index; honest-null = no matches.
- **Article content:** real = title, body, updated date; low-confidence = stale article; honest-null = missing article route with support fallback.
- **Support status:** real = submitted/open/closed ticket; low-confidence = support service delayed; honest-null = no ticket.
- **CIA handoff:** real = help topic passed with user consent; low-confidence = query only; honest-null = opens blank help context.
- **Contact copy:** real = current SLA if available; low-confidence = service degraded; honest-null = no promised response time.

### 9. All states
- **Default:** search, Ask CIA card, FAQ categories, contact support, and route-ready article links.
- **Skeleton:** search remains live; article/category rows shimmer with exact heights.
- **Empty:** HonestNullState for no search results with Ask CIA and Contact support.
- **Error:** categories and contact card remain; failed search or article explains retry path.
- **Success:** support request submitted or article opened; success uses `--glow-done` and provenance.
- **Disabled:** Ask CIA, search, or contact dims to 40% with reason when offline, signed-out restriction, or support outage applies.

### 10. Motion & interaction
- **Load:** search appears first, Ask CIA card fades next, FAQ rows stagger 40ms.
- **Search:** focused SearchOverlay replaces FAQ group with results; clear restores categories.
- **Article:** /help/[slug] pushes with title-on-scroll header and related links.
- **Contact:** support request opens Sheet and preserves typed issue on failure.
- **Reduced-motion:** disables row stagger and card lift.

### 11. Motivation-tier adaptation
- **Low:** search, Ask CIA, top FAQ categories, contact support.
- **Medium:** default categories, article metadata, related articles, support card.
- **High:** show article freshness, support ticket state, and privacy/account recovery links.

### 12. Accessibility
- **Contrast:** text/controls clear AA+ on dark and solid surfaces.
- **Targets:** search, clear, category rows, article links, Ask CIA, and Contact support are 44px minimum.
- **Screen readers:** article rows announce title, category, updated date, and route; search results announce count.
- **Consent/data:** support requests explain what account/contact information is attached.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Source-specific:** /help, /help/[slug], search, article, Ask CIA, and Contact support are present.
2. **Honest:** real, low-confidence, honest-null states cover search, articles, support, CIA handoff, and SLA.
3. **Premium:** support IA is clear and source-specific.
4. **Warm-dark:** glass focal card and solid rows specified.
5. **Semantic glow:** orange Ask CIA, green solved, purple identity.
6. **60/30/10:** support stays calm.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **All states:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high variants.
10. **Accessibility:** 44px targets, labels, contrast, reduced-motion.
11. **Consent:** support-data disclosure included.
12. **Catalog:** canon components reused.
13. **CIA voice:** helpful, concise, support-specific.

