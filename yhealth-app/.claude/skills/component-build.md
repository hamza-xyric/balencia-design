# Component Build

Use this skill when building individual React/TypeScript components. Produces production-ready code with all interaction states, accessibility, and brand compliance.

## Tech Stack

Next.js 16 App Router, React 19, TypeScript strict, TailwindCSS 4, Framer Motion, shadcn/ui + Radix UI primitives. Server Components by default — add `'use client'` only when the component needs interactivity.

## Component File Template

Match the existing pattern from `client/components/ui/`:

```tsx
"use client"; // only if needed

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva("base-classes", {
  variants: { variant: { default: "...", brand: "..." }, size: { default: "...", sm: "..." } },
  defaultVariants: { variant: "default", size: "default" },
});

interface ComponentProps extends ComponentPropsWithoutRef<"div">, VariantProps<typeof componentVariants> {}

const Component = forwardRef<HTMLDivElement, ComponentProps>(({ className, variant, size, ...props }, ref) => (
  <div ref={ref} className={cn(componentVariants({ variant, size }), className)} {...props} />
));
Component.displayName = "Component";

export { Component, componentVariants };
```

Use `cn()` from `@/lib/utils` for conditional class merging.

## 8-State Checklist

Every interactive component MUST implement these states with the exact Tailwind patterns:

**1. Default:**
```
bg-[var(--ink-brown-800)] border border-white/[0.07] rounded-[var(--r-xl)] shadow-[var(--shadow-1)]
```

**2. Hover:**
```
hover:border-[var(--bal-orange)]/30 hover:shadow-[var(--shadow-2)] hover:-translate-y-0.5
transition-all duration-[var(--dur-base)] ease-[var(--ease-flow)]
```

**3. Active/Pressed:**
```
active:translate-y-0 active:shadow-[var(--shadow-1)] active:scale-[0.98]
```

**4. Focus-visible:**
```
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bal-orange)]
focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink-900)]
```

**5. Disabled:**
```
disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
```

**6. Loading:** Show skeleton shimmer (`animate-pulse`) or 16px spinner. For buttons: shrink text, show spinner inline.

**7. Error:**
```
border-red-500/50 shadow-[0_0_16px_rgba(239,68,68,0.15)]
```
Include error message with `role="alert"`.

**8. Success:** Brief green glow flash using Framer Motion:
```tsx
animate={{ boxShadow: ["0 0 0px rgba(52,168,83,0)", "0 0 24px rgba(52,168,83,0.4)", "0 0 0px rgba(52,168,83,0)"] }}
transition={{ duration: 0.6 }}
```

## Button Variants

Extend the existing `client/components/ui/button.tsx` with brand variants:

| Variant | Background | Text | Shape | Use |
|---------|-----------|------|-------|-----|
| `brand` | `--bal-orange` | White | Pill (`--r-pill`) | Primary CTA |
| `brand-ghost` | Glass bg + `backdrop-blur` | `--bal-orange` | Pill | Secondary action |
| `brand-secondary` | `--bal-green` | White | Pill | Success/completion |
| `brand-outline` | Transparent | `--bal-green` | Pill + green border | Tertiary |
| `danger` | `#EF4444` | White | Pill | Destructive |

All buttons: `min-h-[44px]` for touch target compliance.

## Card Variants

Extend the existing `client/components/ui/card.tsx` with `data-variant` attributes:

| Variant | Style | Use |
|---------|-------|-----|
| `surface` | `ink-brown-800` bg, glass border, `--r-xl`, `--shadow-1` | Standard container |
| `elevated` | Stronger shadow, subtle orange border accent on top | Important cards |
| `kpi` | Compact, 2px gradient accent stripe at top | Metric/stat cards |
| `interactive` | Full hover lift, cursor-pointer, press feedback | Clickable cards |

**KPI accent stripe pattern:** `::before` pseudo-element, `h-[2px]`, gradient from `--bal-orange` to `--bal-orange-light`. For multi-card grids, cycle: 1st/4th orange, 2nd/5th green, 3rd/6th purple.

## Glassmorphism Recipe

**Dark mode:**
```
bg-[var(--ink-brown-800)]/80 backdrop-blur-xl border border-white/[0.07] rounded-[var(--r-xl)] shadow-[var(--shadow-1)]
```

**Light mode:**
```
bg-white/70 backdrop-blur-xl border border-black/5 rounded-[var(--r-xl)] shadow-[var(--shadow-1)]
```

## Accessibility Requirements

- Semantic HTML: `<button>` for actions, `<a>` for navigation, `<input>` for forms
- `aria-label` when visual label is absent (icon-only buttons)
- Keyboard navigation: Tab, Enter, Space, Escape for modals
- WCAG 2.1 AA contrast minimums: 4.5:1 body text, 3:1 large text and UI components
- Use `useReducedMotionSafe()` from `@/hooks/use-reduced-motion-safe` for all animations
- Focus must be visible — never `outline: none` without `focus-visible` replacement

**Verified contrast passes:**
- Orange `#FF5E00` on ink-900 `#0A0A0F` = 5.7:1 (AA)
- White on ink-900 = 19.4:1 (AAA)
- White on orange = 3.4:1 (AA Large only — use for headings/buttons, not small text)
- White on purple = 4.6:1 (AA)

## Anti-Patterns

1. Never nest a Card inside a Card
2. Never put gradient text on body copy (headings/display only)
3. Never use `onClick` on `<div>` without `role="button"` + `tabIndex={0}` + `onKeyDown`
4. Never use color alone to convey meaning — add icon or text label
5. Never use `!important` in component styles
6. Never exceed 500 lines per component file — split into subcomponents
7. Never use index as key in dynamic lists
8. Never hardcode hex colors — use CSS variables or Tailwind tokens
9. Never use `border-radius` below `--r-md` (14px) on cards or buttons
10. Never use `linear` easing — use `--ease-flow` or `--ease-out-soft`

## Self-Review Before Returning Code

- [ ] Uses Sora font only (no font-family overrides)
- [ ] All colors from brand tokens (no hardcoded hex)
- [ ] All spacing on 8pt grid
- [ ] All 8 interaction states defined for interactive elements
- [ ] Radii >= 14px on cards and buttons
- [ ] Touch targets >= 44px
- [ ] `focus-visible` ring on all focusable elements
- [ ] `aria-label` on icon-only buttons
- [ ] Reduced motion respected
- [ ] Sentence case on all labels
- [ ] Warm shadows only (brown-tinted)
- [ ] No anti-patterns from the list above
