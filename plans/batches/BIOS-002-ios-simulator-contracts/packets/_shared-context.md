## Shared context (read carefully — you cannot browse the repo; everything you need is in this packet)

You are implementing one bounded packet of **Balencia**, a premium AI life-coaching iOS app: Expo SDK 57, Expo Router, React Native 0.86, React 19, TypeScript **strict** (no `any`, no `@ts-ignore`), TanStack Query v5, `expo-secure-store`. Package root is `yhealth-app/mobile`; all paths below are relative to it. Path alias `@/*` → `src/*`.

**Backend wire contract (verified live):** every REST response is enveloped:
```ts
type Envelope<T> = { success: true; message?: string; timestamp?: string; data: T };
type ApiErrorBody = { success: false; message: string; code: string; errors?: unknown[]; timestamp?: string; requestId?: string };
```
Base URL comes from `EXPO_PUBLIC_API_URL` (e.g. `http://127.0.0.1:9090/api`). Auth = `Authorization: Bearer <accessToken>` plus header `X-Client: mobile` on every request (the server only returns raw tokens to mobile clients).

**Non-negotiable rules:**
1. **Honesty invariant (canon §7):** never invent a number. Server `null`/absent → view-model `value: null` with `provenance.kind:'null'` and a designed empty state. No hardcoded metric literals, no derived fake scores.
2. **Naming:** the AI coach is **`Cia`** in ALL visible copy (never `CIA`, never `SIA`). RPG terms: goals are **Missions**, per-domain scores are **Domain Stats**, overall score is **Life Power**.
3. **Design tokens:** use the existing kit — `BalenciaColors` (`orange #FF5E00`, `green #34A853`, `purple #7F24FF` = Cia/AI ONLY, `ink900 #0A0A0F`, `inkBrown800 #211008`, `paper100 #FEFAF3`) via `src/constants/theme.ts`. Minimum touch target 44px. Purple only for Cia/AI surfaces.
4. Components/hooks/services live OUTSIDE `src/app/` (routes only in `src/app/`).
5. No new dependencies unless the packet explicitly lists them.
6. Match existing code style (2-space indent, named exports, StyleSheet.create at file bottom for components).

**OUTPUT FORMAT (mandatory):** Return ONLY complete file contents for every file you create or modify, each delimited exactly like this — no other prose, no diffs, no truncation, no "rest unchanged" ellipses:

=== FILE: src/path/to/file.ts ===
```ts
<entire final content of the file>
```

Every target file listed in the packet MUST appear in your output with its full final content.
