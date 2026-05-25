# Design Audit (Checker Mode)

Use this skill to audit an existing screen or component against the Balencia brand system and design quality standards. Produces a structured pass/fail report across 29 rules.

Activate when: "audit", "review the design", "check this page", "what's wrong with this UI", "brand compliance check".

## Audit Protocol

1. Read all target component files completely
2. Score against the 29-rule checklist below
3. Output a structured report with severity levels
4. Provide specific line references for each violation

## 29-Rule Anti-Pattern Checklist

### Color Violations (8 rules)

| # | Rule | Severity |
|---|------|----------|
| C1 | Purple (`#7F24FF`) used as background fill (>10% surface area) — accent only | Critical |
| C2 | Purple gradient used as section/page background | Critical |
| C3 | Gradient applied to body text (non-heading) | Critical |
| C4 | Pure black (`#000`, `#000000`) used as background — use `ink-900` `#0A0A0F` | Critical |
| C5 | Cold/blue-tinted shadows (no warm brown hue) — must use `rgba(33, 16, 8, ...)` | Warning |
| C6 | Hardcoded hex values in JSX instead of CSS variables or Tailwind tokens | Warning |
| C7 | Non-brand colors used for primary actions (not orange or green) | Critical |
| C8 | Low-contrast text below 4.5:1 ratio (check: orange on ink-900 = 5.7:1 pass, white on orange = 3.4:1 large only) | Critical |

### Layout Violations (6 rules)

| # | Rule | Severity |
|---|------|----------|
| L1 | Nested cards (card inside card) — use sections or dividers | Critical |
| L2 | Spacing values not on 8pt grid (4,8,12,16,24,32,48,64,96,128) | Warning |
| L3 | Touch targets below 44x44px on interactive elements | Critical |
| L4 | No responsive breakpoint handling (missing mobile/tablet adaptation) | Warning |
| L5 | Fixed pixel widths on layout containers | Warning |
| L6 | Content wider than max-width 1440px without constraint | Warning |

### Typography Violations (6 rules)

| # | Rule | Severity |
|---|------|----------|
| T1 | Font other than Sora used in component code | Critical |
| T2 | Heading size exceeding 20px in Product Mode (dashboard) pages | Warning |
| T3 | Body text below 13px | Warning |
| T4 | Title Case used in UI labels, buttons, or tabs — must be sentence case | Warning |
| T5 | Exclamation marks in UI copy | Warning |
| T6 | Line length exceeding 75 characters without `max-width` constraint | Warning |

### Component Violations (6 rules)

| # | Rule | Severity |
|---|------|----------|
| K1 | Interactive element missing `focus-visible` styles | Critical |
| K2 | Button without hover state defined | Warning |
| K3 | Missing disabled state on interactive element | Warning |
| K4 | Missing loading state for async actions | Warning |
| K5 | Using `<div>` as button without `role="button"`, `tabIndex={0}`, `onKeyDown` | Critical |
| K6 | Missing `aria-label` on icon-only buttons | Critical |

### Motion Violations (3 rules)

| # | Rule | Severity |
|---|------|----------|
| M1 | `linear` easing used on any UI transition | Warning |
| M2 | Animation that does not respect `prefers-reduced-motion` | Critical |
| M3 | `setTimeout`/`setInterval` used for animation timing instead of GSAP/Framer | Warning |

## Output Format

```markdown
## Design Audit: [Page/Component Name]
**Date**: [date]  **Register**: [Brand Mode / Product Mode]

### Critical (must fix before shipping)
- [RULE-ID] Description — `file.tsx:line`

### Warnings (should fix)
- [RULE-ID] Description — `file.tsx:line`

### Summary
- **Score**: X/29 rules passing
- **Critical issues**: N
- **Warnings**: N

### Recommended Fixes (priority order)
1. [Specific code change for highest-severity item]
2. ...
```

## Regression Detection

When auditing changes to an existing file (e.g., reviewing a diff), additionally flag if:
- Contrast ratio decreased from previous version
- Touch target became smaller
- Animation added without reduced-motion check
- Brand color replaced with non-brand color
- Border radius decreased
- Shadow warmth lost (brown hue `rgba(33,16,8,...)` replaced with cold `rgba(0,0,0,...)`)
- Font changed from Sora to anything else

## Contrast Reference Table

| Combination | Ratio | WCAG |
|-------------|-------|------|
| White on ink-900 | 19.4:1 | AAA |
| Burnt Orange on ink-900 | 5.7:1 | AA |
| White on Burnt Orange | 3.4:1 | AA Large only |
| White on Forest Green | 3.9:1 | AA Large only |
| White on Royal Purple | 4.6:1 | AA |
| ink-900 on paper-100 | 18.3:1 | AAA |
