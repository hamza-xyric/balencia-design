# Screen Design: Reports Center

**Screen**: 78 of 90
**File**: 78-reports-center.md
**Route**: `/features/reports`
**Register**: AI Mode (SIA summary + privacy)
**Primary action**: Build, review, share, and export structured life reports
**Tab**: Me
**Navigation**: Stack push from Me Main [17], Intelligence Dashboard [48], Data Sources [84], Help Center [25], or SIA deep-link. Back returns to origin.

---

## Purpose

Reports Center turns Balencia data into clean, shareable summaries without exposing private notes by default. It supports weekly life reports, doctor summaries, and mission progress exports, with SIA translating metrics into plain-language context. This is a review/export surface, not a raw data dump.

---

## Information Architecture

**Hierarchy**:
1. SIA report-builder hero
2. Recent report cards
3. This-week insight rows
4. Share and Export PDF bottom actions

**User flow**:
- **Arrives from**: Me Main [17], Intelligence Dashboard [48], Data Sources [84], SIA Chat [09].
- **Primary exit**: Export PDF or Share.
- **Secondary exits**: Tap report card -> report detail/preview, back to origin.

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, fixed dual bottom actions, and visible tab bar.
**Tab bar visible**: Yes, Me active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <          Reports          |
+-----------------------------+
| Report builder           *  |
| Turn your data into a clean |
| shareable summary.          |
| SIA prepares context...     |
| [SIA summary][Private][PDF] |
|                             |
| RECENT REPORTS              |
| [doc] Weekly life report    |
|       Fitness, sleep...Ready|
| [doc] Doctor summary   Draft|
| [doc] Mission progress Ready|
|                             |
| THIS WEEK                   |
| Sleep consistency       +18%|
| Workout adherence        72%|
| Stress load             -11%|
+-----------------------------+
| Share        Export PDF     |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Report Hero
- **Purpose**: Frame reports as SIA-assisted, private-by-default summaries.
- **Visual treatment**: rounded-xl, royal-purple/20 border, purple linear accent over ink-brown.
- **Content**: Eyebrow "Report builder", title, privacy explanation, SIA sparkles icon, signal pills.
- **Signal pills**: SIA summary, Private by default, PDF ready.

### Report Card
- **Purpose**: Resume a report or preview its status.
- **Visual treatment**: Small card, rounded-lg, 16pt padding, document icon tile.
- **Content**:
  - Title: Weekly life report, Doctor summary, Mission progress export.
  - Meta: included domains/data categories.
  - Status pill: Ready or Draft.
- **Gesture**: Tap opens report detail/preview.

### This Week Summary
- **Purpose**: Show a compact report preview and reinforce value.
- **Visual treatment**: rounded-lg ink-brown card, 16pt padding.
- **Rows**: Label left, value right. Positive values forest-green, neutral/action values brand-orange.

### Bottom Actions
- **Purpose**: Primary report outputs.
- **Visual treatment**: 2-column grid.
- **Actions**:
  - Share: ghost button.
  - Export PDF: orange primary button.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Hero/card surfaces | #211008 | ink-brown-800 | Content containers |
| Primary action | #FF5E00 | brand-orange | Export PDF, selected metrics |
| SIA summary | #7F24FF | royal-purple | Hero and summary pill |
| Positive trends | #34A853 | forest-green | Improvements |
| Text primary | #FFFFFF | white | Titles |
| Text secondary | #FFFFFF at 45-55% | white/55 | Metadata |
| Borders | #FFFFFF at 6-8% | white/8 | Card outlines |

**60/30/10 verification**: Purple is SIA/report-builder signal only. Orange is export/action and attention values. Green is positive trend data.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Report card | Pressed | scale(0.98), border brand-orange/25 |
| Status pill | Draft | Muted white border/text |
| Status pill | Ready | forest-green/10 bg, forest-green text |
| Share | Pressed | ghost bg white/8 |
| Export PDF | Loading | Spinner replaces download icon |
| Export PDF | Success | Check icon, label "Exported" for 900ms |

---

## Motion

- Hero enters with fade-up.
- Report cards stagger by 70ms.
- Export uses progress spinner and completion check.
- Share sheet uses native presentation.

---

## Empty, Loading, Error

- **No reports**: Show hero and empty card "No reports yet" with "Create weekly report".
- **Draft only**: Recent reports section remains, ready actions disabled for drafts.
- **Export failed**: Inline toast "PDF export failed. Try again."
- **Share unavailable**: Fallback to export file first.
- **Loading**: Hero skeleton, three report skeleton rows, bottom actions disabled.

---

## Accessibility

- Report cards announce title, metadata, status, and "double tap to open".
- Trend rows include direction in text, not color only.
- Export button announces loading and success states.
- Share button uses native accessible share sheet.
- PDF privacy note is included in hero accessibility hint.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/features/reports/page.tsx`.
- This screen intentionally avoids broad raw data export. It exports structured, user-reviewed reports.
- Privacy defaults: private notes are excluded unless explicitly selected inside report detail.
- No runtime route/API changes are required for this docs addition.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-18.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U09`
**Prototype route**: `/features/reports`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q02 system overlays may be QA fixtures but production needs native trigger/dismiss/API states.
- Q05 music/video use honest demo recommendations without implying live provider sync.
- Q18 progress-photo sharing is disabled in V1.
- Q22 accountability partners see only opted-in contract/proof/check-in data; SIA reads with consent.
- Q42 reports remain in-app with screenshot-level sharing only.
- Q48 app rating uses non-coercive prompt fixtures.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B18-F01 | critical | product-sense | Recast this as an in-app report preview with screenshot-level sharing guidance only; remove PDF/data-export promises for V1. |
| B18-F02 | critical | navigation | Wire report preview/detail, report creation/resume, in-app review states, screenshot guidance, and disabled/removed export states for V1. |
| B18-F03 | major | trust-privacy | Add an in-app review step listing included domains, excluded private notes, and edit/remove controls without promising external export. |

### Prototype Implications

- Treat 2 critical findings as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

