---
name: reference-verify-commands
description: Canonical verification commands per lane — run before marking any batch complete
metadata:
  type: reference
---

From `balencia-screens/`:
```
npm run check   # lint + typecheck + verify:routes + verify:assets + verify:copy + verify:brand
```

From `yhealth-app/client/`: `npm run dev` (port 3000), `npm run build && npm test`.
From `yhealth-app/server/`: `npm run dev`, `npm run typecheck && npm test`, `npm run db:migrate`.

Forgeflow's own portability check (framework-owned, run after any framework/ or starter/ change):
```
node framework/verify/portability-check.mjs .
```

**How to apply:** [[project-workspace-map]] lists which lane a change touches; run that lane's command before calling a batch done, per Forgeflow's Verify (A6) gate.
