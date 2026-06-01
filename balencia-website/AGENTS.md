# balencia-website — agent rules

The **Balencia marketing website**: a premium **cinematic-scrollytelling** site (pre-rendered concept-art-fidelity frames scrubbed to scroll, with interactive overlays) whose USP hero is the live, interactive **Life Correlation Matrix**. Separate sibling workspace to `balencia-screens` (the app prototype) — this is the public marketing site, not the product app.

## Read first
- [`brief/README.md`](./brief/README.md) → `brief/BRAND-AND-CONTEXT.md` (what is true) + `brief/WEBSITE-VISION.md` (what we're building) + `brief/lcm-matrix.json` (the data).
- Approved plan: `~/.claude/plans/users-hamza-desktop-balencia-design-web-wobbly-cat.md`.

## Stack
Next.js 16.2.6 (App Router) · React 19.2.4 · Tailwind 4 · Framer Motion 12 · Lenis. The LCM graph is the **one** live-interactive moment, built **SVG-first** (an R3F layer can be added later behind the same interface). Production frame-scrub is a `<canvas> drawImage` sequence player.

> **Heads-up:** This is Next.js **16** — APIs/conventions differ from older training data. Check `node_modules/next/dist/docs/` before writing framework code, and heed deprecation notices.

## Rules
- **Brand is law.** Use canonical tokens (mirrored in `brief/BRAND-AND-CONTEXT §5`; source = `balencia-screens/src/app/globals.css`). 60/30/10 per surface; CTAs orange; SIA/AI cues purple (sparingly); cross-domain connection lines gold `#F59E0B`. Never pure black/white. Add a `prefers-reduced-motion` block (the prototype lacks one).
- **Voice is law.** Sentence case everywhere; **zero exclamation marks**; the brand period is sacred; active voice; SIA = first person, brand = second person; ≤1 italic emotional word per section; no hype, no shame. Full QA checklist in `WEBSITE-VISION §7`.
- **The "one of many" constraint.** Any LCM example insight must be framed as one of thousands SIA finds — never as the whole product. Always pair with a visible breadth device (the "1,000+" counter / "see five more").
- **No unvalidated stats as fact.** Percentages are illustrative — ship qualitative or `~`-prefixed with a "not product claims" footnote.
- **Reuse, don't regenerate.** Copy tokens/fonts/components from `balencia-screens` (RadarChart, the knowledge-graph interaction, PhoneFrame, domains.ts). Never regenerate the logo — use official assets in `Balencia/Balencia-Creatives-Reference/logos/`.
- **Copy in, never bake out.** All load-bearing copy is real DOM layered over frames (SEO + a11y). Frames carry no load-bearing text.
- **10 canonical domains only** (Fitness, Sleep, Career, Nutrition, Finance, Faith, Productivity, Relationships, Wellbeing, Meditation); SIA is the core, not a domain. The old 11-district set is reconciled away (BRAND-AND-CONTEXT §2).

## Layout
```
balencia-website/
  brief/                  # the source of truth (above)
  DESIGN-DIRECTION.md     # art direction + condensed storyboard + token/motion mapping
  src/app/                # Next App Router (/, /poc, …)
  src/lib/                # lcm-matrix.ts (typed loader), beats, copy
  src/components/         # hero scroll shell, LCM graph, radar, story, overlays
  public/                 # hero placeholder still, logo, posters
```
