# Design Review

Use this skill for post-implementation design review. Combines the audit checklist with regression detection and implementation-to-spec comparison. Run after components are built, before merging.

Activate when: "review my changes", "check the design before merge", "design review", "does this match the spec".

## Review Protocol

1. Read all changed `.tsx`, `.css`, `.ts` files in the diff
2. Compare against the brand system (brand.mdc rules)
3. If a screen-design spec exists, compare implementation against spec
4. Flag regressions from the previous version
5. Output a structured review

## What to Check

### Brand Fidelity
- Are all colors from the Balencia palette? (orange `#FF5E00`, green `#34A853`, purple `#7F24FF`, ink/paper neutrals)
- Is the 60/30/10 ratio visually maintained?
- Are shadows warm-tinted (`rgba(33, 16, 8, ...)`)?
- Is Sora the only font used?
- Are border-radii using brand tokens (minimum `--r-md` 14px on cards/buttons)?

### Visual Quality
- Does the squint test pass? (clear hierarchy without reading text)
- Are hover/focus/active states implemented on all interactive elements?
- Is there visual rhythm? (tight spacing within groups, generous between)
- Are cards using glassmorphism recipe correctly?
- Are data visualizations using brand chart theme?

### Animation Polish
- Are animations using brand easing (`--ease-flow` or `--ease-out-soft`)?
- Are durations within brand tiers (160ms / 280ms / 520ms)?
- Is `prefers-reduced-motion` respected?
- Are scroll reveals using `GSAPScrollReveal` from `@/components/landing/shared/`?
- Are transitions GPU-friendly (transform + opacity only)?

### Responsive Completeness
- Does the layout adapt at all 3 breakpoints (mobile <768, tablet 768-1279, desktop >=1280)?
- Are touch targets 44px minimum on mobile?
- Do cards stack properly on narrow viewports?
- Is text readable at all sizes?

### Accessibility
- Semantic HTML (`<button>`, `<a>`, `<input>` — not `<div>` for interactions)
- `aria-label` on icon-only buttons
- `focus-visible` ring on all focusable elements
- Color contrast meets WCAG 2.1 AA
- Keyboard navigation works (Tab, Enter, Space, Escape)

### Code Quality
- Components under 500 lines? (split if larger)
- No hardcoded hex values in JSX?
- Using `cn()` for class merging?
- CVA variants for multi-variant components?
- No `!important` in styles?

## Regression Detection

Flag if any change introduces:
- A non-brand color that wasn't there before
- Cold shadow replacing warm shadow
- Font other than Sora
- Reduced touch target size
- Removed hover/focus state
- `linear` easing added
- Animation without reduced-motion check
- Decreased contrast ratio
- Removed `aria-label` from interactive element

## Spec Comparison Mode

When a screen-design spec exists, verify:
- [ ] All components listed in spec are implemented
- [ ] Color mapping matches spec (which elements are orange/green/purple)
- [ ] Layout matches grid specification
- [ ] Responsive behavior matches spec for all breakpoints
- [ ] Interaction states match (all 8 states where specified)
- [ ] Motion matches spec (which elements animate, on what trigger)

## Output Format

```markdown
## Design Review: [Component/Page Name]

### Score: X/10

### Issues
**Critical** (blocks merge):
- [Issue description] — `file.tsx:line`

**Warning** (fix soon):
- [Issue description] — `file.tsx:line`

**Suggestions** (nice to have):
- [Suggestion]

### Regressions
- [Any regressions detected, or "None found"]

### Spec Compliance
- [If spec exists: compliance percentage and gaps]

### What's Done Well
- [Positive callouts — reinforce good patterns]
```
