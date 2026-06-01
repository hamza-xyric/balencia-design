# Screen Design: Data Sources

**Screen**: 84 of 90
**File**: 84-data-sources.md
**Route**: `/tabs/me/data-sources`
**Register**: Intelligence Mode (correlation and source health)
**Primary action**: Connect, review, and refresh external data sources used by SIA
**Tab**: Me
**Navigation**: Stack push from Me Main [17], Connected Services [22], Knowledge Graph [72], Intelligence Dashboard [48], or SIA explanation links. Back returns to origin.

---

## Purpose

Data Sources shows the user which connected services feed Balencia's coaching intelligence and whether each source is healthy. It also translates raw integrations into correlations, making clear that sources become coaching signals rather than clutter. The screen is a trust and control surface for SIA's data context.

---

## Information Architecture

**Hierarchy**:
1. Correlation engine hero
2. Connected sources list
3. Detected correlations list
4. Source health note
5. Connect source bottom action

**User flow**:
- **Arrives from**: Me Main [17], Connected Services [22], Intelligence Dashboard [48], Knowledge Graph [72], SIA Chat [09].
- **Primary exit**: Connect source.
- **Secondary exits**: Tap source -> source detail/refresh, tap correlation -> Knowledge Graph [72] or Intelligence Dashboard [48].

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, fixed bottom action, and visible tab bar.
**Tab bar visible**: Yes, Me active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <        Data sources       |
+-----------------------------+
| Correlation engine       db |
| Every source becomes a      |
| signal, not clutter.        |
| [2 live sources][3 corr.]   |
|                             |
| CONNECTED SOURCES           |
| [ok] WHOOP       Synced 8m  |
|      Recovery, strain...    |
| [ok] Google Calendar Conn.  |
| [!] Spotify      Refresh    |
|                             |
| DETECTED CORRELATIONS       |
| Sleep affects tempo pace 85 |
| [bar]                       |
| Calendar density stress 72  |
| Music tempo consistency 48  |
|                             |
| [activity] Source health... |
+-----------------------------+
|          Connect source     |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Correlation Engine Hero
- **Purpose**: Explain why integrations matter.
- **Visual treatment**: rounded-xl, learning/cyan border at 25%, cyan tint over ink-brown.
- **Content**:
  - Eyebrow "Correlation engine".
  - Title.
  - Database icon tile.
  - Signal pills: 2 live sources, 3 correlations.

### Source Row
- **Purpose**: Show each connected provider and health state.
- **Visual treatment**: 72pt minimum row, rounded-lg ink-brown surface.
- **Content**:
  - Status icon tile: ShieldCheck for active, RefreshCw for needs refresh.
  - Provider name.
  - Data categories.
  - Sync/status text.
- **Behavior**: Tap opens source detail with permissions, sync history, disconnect/refresh.

### Correlation Row
- **Purpose**: Show high-level relationships detected across sources.
- **Visual treatment**: rounded-lg white/4 card, label, strength number, progress bar.
- **Behavior**: Tap opens correlation detail in Knowledge Graph [72] or Intelligence Dashboard [48].

### Source Health Note
- **Purpose**: Clarify that unhealthy sources are checked before coaching use.
- **Visual treatment**: rounded-lg white/4 note with Activity icon.

### Connect Source Button
- **Purpose**: Add a provider.
- **Visual treatment**: Full-width orange CTA with Link2 icon.
- **Behavior**: Opens provider picker. Provider flow may route to Connected Services [22] for OAuth.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card/row surfaces | #211008 | ink-brown-800 | Content cards |
| Primary action | #FF5E00 | brand-orange | Connect/refresh-needed |
| Correlation accent | #06B6D4 | learning/cyan | Hero/progress bars |
| SIA/correlation count | #7F24FF | royal-purple | Correlation signal pill |
| Active source | #34A853 | forest-green | Connected/healthy |
| Text primary | #FFFFFF | white | Labels |
| Text secondary | #FFFFFF at 35-50% | white/50 | Metadata |

**60/30/10 verification**: Orange is action/refresh. Cyan identifies data/correlation. Purple denotes SIA intelligence/correlation count. Green marks healthy connections.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Source row | Active | Green icon tile |
| Source row | Needs refresh | Orange icon tile and muted status |
| Source row | Pressed | border brand-orange/25 |
| Correlation row | Pressed | cyan border, bar brightens |
| Connect source | Loading | Spinner and "Connecting..." |
| Connect source | Success | Green check toast |

---

## Motion

- Hero fades up first.
- Source rows stagger by 70ms.
- Correlation bars animate to strength over 520ms.
- Connect provider picker slides up as standard bottom sheet.

---

## Empty, Loading, Error

- **No sources**: Show hero with "0 live sources" and empty state "Connect your first source".
- **Source expired**: Row remains visible with orange refresh state.
- **Sync failed**: Source detail shows last successful sync and retry.
- **Correlation unavailable**: Correlations section shows "Connect more sources to detect patterns".
- **Loading**: Hero skeleton, three source row skeletons, correlation skeleton bars.

---

## Accessibility

- Source rows announce provider name, data categories, and connection health.
- Correlation bars include numeric strength and plain-language label.
- Connect source button label: "Connect data source".
- Refresh-needed states use text and icon, not color only.
- Disconnect actions in detail sheets require confirmation.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/tabs/me/data-sources/page.tsx`.
- Related controls also exist in Connected Services [22]; this screen focuses on source health and coaching signals.
- Data source use must respect consent from Consent [03c] and settings/privacy controls [21].
- No runtime route/API changes are required.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-10.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U05`
**Prototype route**: `/tabs/me/data-sources`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q17 progress photos are private, encrypted, user-deletable, and AI analysis is premium opt-in.
- Q20 OAuth flows need scope and revocation clarity.
- Q21 Data Sources may be a demo/no-live-sync trust placeholder for prototype acceptance.
- Q39 achievement density adapts for low-motivation users.
- Q43 Knowledge Graph V1 is a guided insight map.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B10-F04 | critical | navigation | Wire Connect source to a provider picker/OAuth flow with success, cancel, loading, and error states. |
| B10-F05 | major | trust-privacy | Make rows/correlations semantic links or buttons, add source detail/refresh/disconnect flows, and make Back a labeled 44px control. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

