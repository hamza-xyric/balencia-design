# Balencia Website

Premium **cinematic-scrollytelling** marketing site for Balencia. The USP hero is the live, interactive **Life Correlation Matrix**.

- **What is true / what we're building:** [`brief/`](./brief/) (start at `brief/README.md`).
- **Art direction + PoC status:** [`DESIGN-DIRECTION.md`](./DESIGN-DIRECTION.md).
- **Agent rules:** [`AGENTS.md`](./AGENTS.md).
- Approved plan: `~/.claude/plans/users-hamza-desktop-balencia-design-web-wobbly-cat.md`.

## Run

```bash
npm install
npm run dev        # → http://localhost:3000  (open /poc or /)
npm run build      # static production build
npm run typecheck  # tsc --noEmit
npm run lint
```

`/` and `/poc` render the same Phase-1 vertical slice: the cinematic scroll-scrub hero → the live Life Correlation Matrix (graph + radar + example story) → closing. Try: scroll the hero, hover the **Wellbeing** node, switch clusters, flip **showing: the average human → as SIA learns you**, and tab through the graph with the keyboard. Toggle OS reduced-motion to see the static fallback.

## Stack
Next.js 16.2.6 · React 19.2.4 · Tailwind 4 · Framer Motion 12 · Lenis. The LCM graph is SVG-first (R3F can be layered later). Production frame-scrub is the `<canvas>` `SequenceCanvas` (single placeholder still now; AVIF beat sequences in Phase 2).
