# 06 — The "Today Screen" Product Mockup

Near the end of the journey (scene 16), the cinematic city resolves into the **actual product UI**: a phone showing SIA's "Today" screen. This is the most concrete artifact in the whole experience — it's what the abstract "AI life OS" pitch actually looks like as a daily product. For the website, this is a ready-made hero/mockup of the real app.

All strings below are verbatim from the `ProductRealityOverlay` component.

## Layout (top to bottom)

**Status bar**
- Time: `7:42`
- Battery: `82%`

**Header**
- Eyebrow: **Today**
- Greeting: **Good morning.**
- Subtitle: **SIA found 3 connected signals for today.**

**High-leverage insight card** (the single most important readout)
- Eyebrow: **High leverage insight**
- Headline: **Sleep debt plus meeting load**
- Action (emphasized): **Move deep work before 2 PM.**

**Intelligence path** (shows *which domains* combined to produce the insight — animates/activates left-to-right)
- Header: **Intelligence path** · **Live**
- Nodes (in order): **Recovery → Career → Nutrition**

**Recommended action cards** (four, each tinted by its domain mood)
| Card | Value | Tone color |
|------|-------|------------|
| **Move** | Train at 6:20 | green |
| **Focus** | Protect 90 min | orange |
| **Recover** | Wind down at 10 | purple |
| **Connect** | Reply to Maya | gold |

**Bottom navigation** (three tabs)
- **Today** (active) · **City** · **SIA**

## Why this matters for the website

This screen is the **proof of the concept**: the "city of connected domains" idea collapses into one calm, actionable card. The "Intelligence path" element is the visual embodiment of the cross-pillar story (Recovery + Career + Nutrition together → one recommendation) — it directly mirrors the connections content in [`07-connections-and-insights.md`](07-connections-and-insights.md). The three nav tabs (**Today / City / SIA**) also hint at the product's own information architecture: a daily view, the "city" map of domains, and the SIA assistant.
