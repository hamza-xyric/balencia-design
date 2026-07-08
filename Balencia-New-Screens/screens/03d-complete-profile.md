# 03d-complete-profile - hi-fi glass spec

### 1. Header
- **ID:** 03d
- **Name:** Complete profile
- **Route(s) covered:** No live route; social-auth data-gap step inside the pre-auth onboarding stack.
- **Tab:** None; pre-auth account completion.
- **Source:** `work/briefs/03d.md`, Balencia canon, component catalog.
- **Batch:** 2

### 2. Purpose
Fills the few profile fields that Google or Apple did not return, mainly date of birth and gender, so later health coaching can use age-appropriate and member-declared context. It is optional, skippable, and honest about why the data helps; it never blocks the first CIA value moment.

### 3. Entry & exit
- **Entry:** automatic stack push after social sign-up when DOB, gender, first name, or last name is missing.
- **Primary exit:** save available fields and move to Consent [03c].
- **Secondary exit:** "skip for now" moves to Consent [03c] without storing new profile fields.
- **No back path:** account creation already completed through the provider; the escape hatch is skip, not back.
- **Failure exit:** failed save keeps typed values locally and offers retry or skip.

### 4. Layout anatomy
**Regions, top to bottom:**
1. Status bar over warm atmosphere.
2. Centered Balencia mark, quiet and card-free.
3. Heading and short explanatory line.
4. Small CIA note explaining personalization without claiming certainty.
5. Form group: DOB, gender, and conditional first/last name row.
6. Readiness ProgressBar.
7. Primary action and skip link pinned above safe area.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| 9:41                                  |
|                 Balencia              |
|                                      |
|        A few more *details*           |
|  These help CIA personalize safely.   |
|                                      |
| +----------------------------------+ |
| | CIA will use these only for       | |
| | age-aware and profile-aware care. | |
| | [profile data · you entered]      | |
| +----------------------------------+ |
| [ date of birth                 > ]  |
| [ gender                        > ]  |
| [ first name ] [ last name ]         |
| readiness [#####-----] 1 of 2        |
|                                      |
| [ save details ]                     |
| skip for now                         |
+--------------------------------------+
```

### 5. Components
- **TopBar** - omitted by design; no back control is available.
- **GlassPillInput** - name fields and read-only picker rows.
- **Sheet** - DOB native picker and gender selector.
- **CIAInsightCard** - compact note only, using evidence copy rather than a recommendation.
- **ProgressBar** - readiness count for DOB and gender.
- **ChipProvenance** - "you entered" and "from Google/Apple" labels.
- **ConsentCard** - profile data control sheet from the CIA note.
- **OfflineBanner, SkeletonState, ErrorState, HonestNullState** - state components.

### 6. Visual treatment
- **Atmosphere:** warm `#0A0A0F` base, mandatory orange radial glow, 3-4 percent grain.
- **Glass tiers:** form controls use `.glass-pill`; CIA note uses a quiet GlassCard; picker sheets use `.glass-frost`.
- **Semantic glows:** `--glow-you #FF5E00` on focused fields and readiness progress because the data is member-entered; `--glow-cia #7F24FF` only on the explanatory CIA note; `--glow-done #34A853` only on save success.
- **Type:** Neue Montreal for all UI; heading uses Tiempos italic on *details*.
- **Color discipline:** no red validation chrome; errors rely on copy, icon, and border weight.

### 7. Content & copy
- **Heading:** "A few more *details*"
- **Subtitle:** "These help CIA personalize safely."
- **CIA note:** "I'll use this for age-aware and profile-aware coaching. You can skip and add it later."
- **Fields:** "date of birth", "gender", "first name", "last name"
- **Readiness:** "1 of 2 ready to personalize"
- **Primary CTA:** "save details"
- **Secondary action:** "skip for now"
- **DOB underage:** "Balencia coaching starts at 18."
- **Gender empty:** "Choose a gender option or skip for now."
- **Offline:** "offline - connect to save profile changes"

### 8. Data & honesty states
- **DOB:** real = user-selected date plus `ChipProvenance` "you entered"; low-confidence is not applicable to a direct selection; honest-null = "not provided yet."
- **Gender:** real = selected option; low-confidence is not applicable; honest-null = "prefer not to say" or skipped state, never guessed from provider data.
- **Names:** real = OAuth value with provider chip or typed value with "you entered"; low-confidence = provider value missing confidence from callback, shown editable; honest-null = blank optional fields.
- **Profile controls:** Data category = profile; source = user/OAuth provider; scope = personalization and account identity; retention = until account deletion or field removal; export, revoke provider link, and delete profile fields are available from Settings.

### 9. All states
- **Default:** empty missing fields, save enabled, skip visible.
- **Skeleton:** only provider-prefilled fields shimmer while callback payload resolves; no placeholder values.
- **Empty:** all optional fields missing, readiness at zero, skip remains valid.
- **Error:** inline validation for DOB/field format; network and server failures use ErrorState with retry.
- **Success:** CTA flashes `--glow-done`, values save, then stack pushes to [03c].
- **Disabled:** fields drop to 40 percent only while save is in flight or picker sheet is resolving.
- **Offline:** values stay editable locally; save action explains that connection is needed.

### 10. Motion & interaction
- **Entry:** mark, heading, note, and fields fade up in 200ms steps.
- **Pickers:** DOB and gender open as sheets; swipe down dismisses without changing values.
- **Validation:** underage copy appears inline without alarm color.
- **Save:** CTA scales to .98, spinner locks width, success glow precedes navigation.
- **Reduced-motion:** entry, sheet, progress, and success glow use opacity-only or instant state changes.

### 11. Motivation-tier adaptation
- **Low:** only DOB and gender are visible; name fields collapse behind "more profile fields."
- **Medium:** default layout with conditional name row.
- **High:** shows source chips beside provider-filled fields and a short data-control link under the CIA note.

### 12. Accessibility
- **Contrast:** paper text on warm dark and glass surfaces clears AA+.
- **Targets:** fields, picker rows, CTA, and skip link meet 44px minimum targets.
- **Screen readers:** each field announces current value, optional status, and source.
- **Data controls:** CIA note and provenance chips expose profile category, source, scope, retention, export, revoke, and delete controls.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** profile data is clearly linked to later CIA personalization without claiming current insight.
2. **Honest:** fields are direct, optional, provenance-labeled, and never inferred silently.
3. **Premium:** small form, warm atmosphere, one quiet CIA note, no dashboard chrome.
4. **Consent:** profile data controls are concrete and discoverable.
5. **Safety:** age gate copy is plain and non-shaming.
6. **Semantic glow:** field effort, CIA explanation, and save completion are separated.
7. **States:** default, skeleton, empty, error, success, disabled, and offline covered.
8. **A11y:** contrast, targets, labels, and reduced motion covered.
9. **Voice:** sentence case, calm, no hype, CIA only.
