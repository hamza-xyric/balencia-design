---
name: project-source-hierarchy
description: Ordered authority when design docs disagree, plus the tie-breaker rule
metadata:
  type: project
  critical_invariant: true
---

When documents conflict, in order:
1. `CREATIVE-REFERENCE.md`, official logo files, and current `balencia-screens` CSS tokens are canonical.
2. `app_design 3/_shared-patterns.md` is canonical for component specs.
3. `Balencia/Design-System-Overview.md` is supplemental.
4. Any older file describing a teal-primary or three-pillar health palette is stale — ignore it. Current system: warm ink / burnt orange (`#FF5E00`) / forest green (`#34A853`) / royal purple (`#7F24FF`, SIA/AI only, ≤2 elements per screen, 60/30/10 split).

**Why:** the design system evolved past an earlier teal palette; stale docs still reference it in a few places.
**How to apply:** if a spec, wireframe, or Figma node disagrees with the above hierarchy, treat the higher-ranked source as reality and flag the lower one as drift, don't silently follow it.
