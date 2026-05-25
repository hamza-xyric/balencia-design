# Screen Design (Applier Mode)

Use this skill when designing a new screen/page or redesigning an existing one. Follows an 8-phase gated process adapted from the design-for-ai APPLIER workflow. Each phase is a mandatory checkpoint — announce which phase you are in as you work.

## Phase 1: Purpose

Before any design work, answer:
- What is this screen's single most important job?
- What user problem does it solve?
- What is the primary action the user should take?
- What data sources does it need? (Check existing `useFetch` / TanStack Query hooks)

Determine the **design register**:
- **Brand Mode**: Landing pages, marketing, public pages (no sidebar). Use large hero type, generous whitespace, ambient blobs, gradient heroes.
- **Product Mode**: Dashboard, authenticated pages (with sidebar). Use compact type (16-20px headings max), dense info display, cards as containers, restrained palette.

## Phase 2: Information Architecture

- List all content items this screen must display (prioritized)
- Define the hierarchy: what do users see first, second, third?
- Identify the user flow: where did they come from, where do they go next?
- Check for existing page patterns in `app/(pages)/` that can be reused

## Phase 3: Layout Grid

**Responsive grid:**
- Desktop (>=1280px): 12-column CSS grid, 24px gutter
- Tablet (768-1279px): 8-column, 16px gutter
- Mobile (<768px): 4-column, 16px gutter

**Product Mode scaffold** (reference: `components/dashboard/`):
```
<DashboardLayout>
  <DashboardSidebar />
  <main className="flex-1 overflow-y-auto">
    <DashboardHeader title="..." />
    <div className="p-6 space-y-6 max-w-[1440px]">
      {/* KPI strip: 3-4 cards across desktop, 2 tablet, 1 mobile */}
      {/* Primary content: 8-col desktop, full tablet/mobile */}
      {/* Secondary content: 4-col desktop sidebar or full below */}
    </div>
  </main>
</DashboardLayout>
```

**Brand Mode scaffold** (reference: `components/landing/`):
```
<main>
  <Nav /> {/* Sticky, backdrop-blur, transitions on scroll */}
  <HeroSection /> {/* Full viewport, gradient glow, CTA */}
  {/* Sections alternate ink-900 and paper-100 backgrounds */}
  <Footer />
</main>
```

All spacing between sections: minimum 48px (`--s-7`), preferred 64-96px (`--s-8` to `--s-9`).

## Phase 4: Typography

Apply the Sora scale from the brand system:
- Define which heading level (h1-h3) each content block uses
- Ensure heading hierarchy: h1 once per page, h2 per section, h3 for subsections, never skip levels
- Apply the register-appropriate scale:
  - Product Mode: max 20px headings, 14px body
  - Brand Mode: large hero headings via `clamp()`, 16px body
- Mark accent words (max 2 per page) that get the brand orange color

## Phase 5: Composition & Visual Hierarchy

**Squint test**: If you blur your eyes, can you still identify:
- The primary CTA (should be most visually prominent — orange, large)
- Headings vs body (distinguished by weight 600-700, not just size)
- Grouped elements (tighter spacing within) vs section breaks (generous gaps between)
- No two adjacent elements share the same visual weight

**Proportional spacing rule**: Space within related groups is tight (8-16px). Space between unrelated groups is generous (32-64px). This creates natural visual rhythm.

**Z-layer system:**
- z-0: Page background (ink-900)
- z-10: Content surfaces (cards, ink-brown-800 with glass border)
- z-20: Elevated cards (hover, `--shadow-2`)
- z-30: Sticky headers, navigation (backdrop-blur)
- z-40: Overlays, dropdowns
- z-50: Modals, sheets
- z-60: Toasts, notifications

## Phase 6: Color Application

Map the 60/30/10 rule to this specific screen:
- **Orange (60%)**: Which elements are orange? (Primary CTA, active tab, progress bar, hero accent)
- **Green (30%)**: Which elements are green? (Success states, health metrics, completion badges, positive trends)
- **Purple (10%)**: Which elements are purple? (AI insights badge, coach messages, projected data line — sparingly)
- **Neutrals**: Background (ink-900), card surfaces (ink-brown-800), text (white at varying opacity)

Verify: Purple should appear on no more than 1-2 elements per screen.

## Phase 7: Interaction Mapping

For EVERY interactive element, define all 8 states:
1. **Default** — resting appearance
2. **Hover** — cursor enter (lift + glow + border accent)
3. **Active/Pressed** — mouse down (settle back + slight scale)
4. **Focus-visible** — keyboard tab (orange ring, 2px, offset 2px)
5. **Disabled** — 0.5 opacity, cursor-not-allowed
6. **Loading** — skeleton shimmer or spinner
7. **Error** — red border accent, error message with `role="alert"`
8. **Success** — brief green glow flash (600ms)

**Touch targets**: Every interactive element minimum 44x44px. Verify buttons have at least `h-11 min-w-[44px]`.

## Phase 8: Self-QA

Before returning the design, verify:
- [ ] All colors are from the brand palette (no strays)
- [ ] 60/30/10 ratio holds visually
- [ ] Typography uses Sora only, correct scale for register
- [ ] Spacing is on 8pt grid
- [ ] Every interactive element has all 8 states defined
- [ ] Responsive behavior specified for all 3 breakpoints
- [ ] Heading hierarchy is correct (h1 > h2 > h3, no skips)
- [ ] Squint test passes (clear hierarchy without reading text)
- [ ] Touch targets are 44px minimum
- [ ] Dark mode is the primary design (light mode secondary)
- [ ] No anti-patterns from the brand system violated

## Output Format

Structure the design as:
```markdown
## Screen Design: [Name]
**Register**: Brand Mode / Product Mode
**Primary action**: [verb + noun]

### Purpose
[1-2 sentences]

### Layout
[Grid specification + section ordering]

### Components
[List each component with: purpose, data source, variant, responsive behavior]

### Color Map
[Which brand color appears where on this screen]

### Interaction States
[Key interactive elements with their 8 states]

### Motion
[Which elements animate, on what trigger, using which tool — defer to animation-motion skill for implementation]

### Responsive Behavior
[Desktop → Tablet → Mobile adaptations]
```

## Cross-References

- Component-level code: use **component-build** skill
- Scroll animations for this page: use **animation-motion** skill
- Charts or metrics on this page: use **data-viz** skill
- Post-build quality check: use **audit** skill
