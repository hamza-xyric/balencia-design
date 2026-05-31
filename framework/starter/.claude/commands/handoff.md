---
description: Generate a kickoff prompt for the next session based on current state, then save it for /clear + /start-handoff
---

You are generating a high-quality kickoff prompt that a FRESH session will use to resume this work from where it stands right now.

The point of this two-step workflow is to preserve quality on both sides:
- THIS session has rich working memory of what was just completed, the gotchas hit, the conventions established — generate the prompt while that context is fresh.
- The NEXT session will execute the work with clean context, so it doesn't drag turn-clutter, half-explored branches, or stale assumptions into precise execution.

## Your task in THIS session

1. **Inspect current state.** Run in parallel where possible:
   - `git log --oneline -20` and `git status` — see what's committed and what's dirty.
   - Read the project memory: `memory/MEMORY.md` and any topic-specific fact files it indexes.
   - Check the active task list (if your harness has one) — note pending and in-progress items.
   - Look for recent plan files in `.claude/plans/`.

2. **Identify the next logical unit of work.** Use any user hint after the command name; otherwise infer from the most recent commits, the memory ledger, and unfinished tasks. If there are multiple plausible next steps, briefly ask the user which one to write the prompt for — don't guess across alternatives.

3. **Generate a verbose, self-contained kickoff prompt.** Mirror the structure of the prompt that kicked off THIS session if one exists in conversation:
   - One-sentence summary of what the next session is resuming.
   - **Context (rehydrate from repo + memory)** block — the exact files to read first, with paths.
   - **State at end of last session** block — expected commit hashes + messages so the new session can verify clean state.
   - Any layout snapshots, node IDs, token IDs, or other concrete identifiers the new session will need to reference.
   - **SCOPE — what "done" means** block — the next concrete work unit.
   - **Decisions to flag via AskUserQuestion BEFORE any writes** — each option, a recommendation, the reason.
   - Per-step workflow with the conventions and gotchas that apply (pull verbatim from memory where applicable).
   - **RULES STILL IN FORCE** block — do not re-litigate; just list them.
   - **START BY:** block — the first 2–3 commands to verify state on entry.
   - **STOP CONDITIONS** block.

   (Template: `framework/templates/next-session-handoff.md`.)

4. **Write the prompt to `.claude/plans/next-session-handoff.md`** (overwrite if it exists; create the `.claude/plans/` directory if needed).

5. **Print a short confirmation** — exactly this format:

   ```
   ✅ Handoff prompt saved to .claude/plans/next-session-handoff.md

   Next steps:
     1. /clear
     2. /start-handoff
   ```

## DO NOT

- Do NOT execute the work yourself in this session. The whole point is the next session does it from a clean state.
- Do NOT update memory or files beyond the handoff prompt itself (memory updates belong to the session that did the work, which has presumably already happened).
- Do NOT create the handoff prompt in a timestamped file — always overwrite `next-session-handoff.md` so `/start-handoff` has a single, predictable path to read from.

User hint (may be empty): $ARGUMENTS
