# Animation & Motion

Use this skill for scroll animations, micro-interactions, page transitions, and any motion work. All motion must use brand easing curves and respect `prefers-reduced-motion`.

## Motion Philosophy

Motion must feel physical — elements have weight, inertia, and settle gently. Never use `linear` easing for UI transitions. The three timing tiers:

| Tier | Duration | Use |
|------|----------|-----|
| Micro | `--dur-fast` 160ms | Hover glow, button press, toggle flip, chip select |
| Standard | `--dur-base` 280ms | Card reveal, dropdown open, tab switch, tooltip |
| Complex | `--dur-slow` 520ms | Page section reveal, modal enter, hero sequence |
| Signature | `--dur-flow` 1.2s | Continuous line drawing, ambient motion |

## Technology Decision Tree

| Animation Type | Tool | Why |
|----------------|------|-----|
| Hover/focus/press states | Tailwind `transition-*` classes | No JS needed, GPU-composited |
| Component mount/unmount | Framer Motion `motion.*` + `AnimatePresence` | React-aware lifecycle |
| Scroll-triggered reveals | GSAP + ScrollTrigger via `useGSAP` hook | Best performance with Lenis integration |
| Text split/stagger reveal | `GSAPTextReveal` component | Already built |
| Parallax backgrounds | `GSAPParallax` or `useParallax` hook | Two paths exist |
| Scroll-scrubbed (pinned) | GSAP ScrollTrigger `scrub: true` | Only tool for this |
| Page transitions | Framer Motion `AnimatePresence` + `template.tsx` | App Router compatible |
| Infinite marquee/ticker | `GSAPMarquee` component | Already built |
| 3D, particles | React Three Fiber + drei + postprocessing | Existing pattern in `components/preloader/` |
| Smooth scroll | Lenis via `LenisProvider` | Already running globally |

## Existing Infrastructure (Import, Don't Re-create)

```tsx
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { useGSAP, useGSAPReveal } from "@/hooks/use-gsap";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import { useLenis } from "@/components/providers/LenisProvider";
import { useScrollAnimation, useZoomOnScroll, useStickyZoom, useParallax } from "@/hooks/use-scroll-animation";
```

**Ready-made components** at `@/components/landing/shared/`:
- `GSAPScrollReveal` — entrance reveals with direction, distance, stagger
- `GSAPParallax` — parallax layers
- `GSAPMarquee` — infinite horizontal ticker
- `GSAPTextReveal` — split text stagger animation
- `FloatingCard` — hover-responsive floating card
- `MagneticButton` — cursor-magnetic button
- `AnimatedGradientMesh` — ambient gradient background
- `ScrollParticles` — particle effects on scroll
- `ScrollProgressBar` — scroll position indicator

## Scroll Reveal Pattern (Most Common)

Default usage:
```tsx
<GSAPScrollReveal direction="up" distance={60} duration={0.8} start="top 85%" ease="power3.out">
  {content}
</GSAPScrollReveal>
```

Staggered children:
```tsx
<GSAPScrollReveal stagger={0.07} staggerSelector=".reveal-item">
  {items.map(item => <div key={item.id} className="reveal-item">...</div>)}
</GSAPScrollReveal>
```

## Micro-Interaction Patterns

**Button hover glow** (Tailwind classes):
```
transition-all duration-[var(--dur-base)] ease-[var(--ease-flow)]
hover:shadow-[var(--glow-orange)] hover:-translate-y-0.5
active:translate-y-0 active:scale-[0.98]
```

**Card hover lift:**
```
transition-all duration-[var(--dur-base)] ease-[var(--ease-flow)]
hover:-translate-y-1 hover:shadow-[var(--shadow-2)] hover:border-[var(--bal-orange)]/20
```

**Glass shine sweep on hover** — reuse the `::before` pattern with a diagonal gradient that translates across on hover:
```css
.shine-sweep::before {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%);
  transform: translateX(-100%);
  transition: transform var(--dur-slow) var(--ease-flow);
}
.shine-sweep:hover::before { transform: translateX(100%); }
```

## Page Transition Pattern

Create a `template.tsx` in the route group:
```tsx
"use client";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [.65, .05, .36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

## Performance Rules

- Only animate `transform` and `opacity` (GPU-composited). Never animate `width`, `height`, `top`, `left`, `margin`, `padding`, `background-color`.
- Use `will-change: transform` sparingly — only on elements currently animating, remove after.
- Stagger start times at 7ms between children for GSAP (sweet spot for smooth cascade).
- For Framer Motion, prefer `motion.div` layout animations over manual position calculation.
- All GSAP contexts must be cleaned up — `useGSAP` handles `ctx.revert()` automatically.
- Use `useLayoutEffect` for GSAP setup — `useGSAP` already does this.

## Reduced Motion

Every animation MUST be conditional. The `useReducedMotionSafe()` hook returns `true` when reduced motion is preferred:

- GSAP: `useGSAP` hook handles this automatically (skips timelines)
- Framer Motion: `animate={prefersReducedMotion ? {} : variants}`
- CSS transitions: Can remain (subtle enough), but scroll-triggered animations must not fire
- `GSAPScrollReveal` already handles this (renders children without animation)

## Anti-Patterns

1. Never use `setTimeout`/`setInterval` for animation timing — use GSAP timeline or Framer
2. Never animate `left`/`top` — use `transform: translate()`
3. Never add global scroll listeners without cleanup — use the existing hooks
4. Never use `ease: "linear"` for UI transitions (ambient particle loops are the exception)
5. Never create a new `Lenis` instance — use the existing `useLenis` context
6. Never use CSS `@keyframes` for scroll-triggered animations — use GSAP ScrollTrigger
7. Never use `IntersectionObserver` directly for entrance animations — use `GSAPScrollReveal` or `useGSAPReveal`
8. Never skip reduced-motion checks on any animation
