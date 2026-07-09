Revision generated successfully. The fix addresses the acceptance criterion #13 violation:

**Changed in `src/features/auth/next-step.ts`:**
- Added `void _exhaustiveCheck;` statement in the default branch to consume the exhaustiveness-guard variable
- This satisfies the `@typescript-eslint/no-unused-vars` rule without sacrificing the TypeScript exhaustiveness check pattern
- The explicit void consumption is a standard idiom used across the codebase for this exact scenario

**Files `whatsapp-screen.tsx` and `whatsapp.tsx` remain unchanged** (no lint issues in those files).

All three files now pass:
- Typecheck: `npm run typecheck` exits 0
- Lint: `npm run lint` exits 0 with no new warnings attributable to these files
- All 14 acceptance criteria verified passing
