<!-- TEMPLATE — How to use:
  The session-handoff skeleton (FRAMEWORK.md move Persist (A7) / operating system C11). Write this at the END of every
  meaningful session, before /clear, so the next session cold-starts correctly. Overwrite the same
  predictable path each time. The survivability contract: state lives in exactly three places — git
  commits, machine-readable metadata, and this doc + ledgers. No "we decided X earlier" floating in chat.
  Delete this comment when done. -->

# <PROJECT_NAME> — Next-Session Handoff

One-line goal for the next session: **<the single next unit of work>**. Stop for a ✋ checkpoint after it.

## ⚠️ READ FIRST — what changed last session
<the big picture: what got done, and any NEW durable gotcha discovered (give it a stable ID and explain when it bites).>

**Decisions already locked (do NOT re-litigate):** <list FINAL decisions relevant to this work>.

## 🚦 START BY — verify clean state on entry
```bash
cd <repo>
git log --oneline -3        # expect <SHA> (top), <SHA>, <SHA>
git status --short <key files>   # expect <clean / intentionally-dirty: explain>
<command to confirm machine-readable state, e.g. print registry keys>
```
Then load `<required skills/tools>` and read `<the sources for this unit>` before acting.

## ⏭️ THE NEXT UNIT OF WORK
<concrete, bounded description of the one thing to do — inputs, where output goes, how to verify.>

Then: record state in `<registry/metadata>`, append findings to `<findings-ledger>`, **commit by explicit path** (message: "<convention>"), then ✋ checkpoint.

## ❓ DECISIONS TO FLAG (via AskUserQuestion, before irreversible writes)
1. <decision> — Recommended: <option>. Alt: <option>. Reason: <why>.

## 🔒 RULES STILL IN FORCE (do not re-litigate)
- <durable rule, e.g. source-of-truth direction>
- Repo discipline: <branching / staging-by-path / dirty-tree notes>
- Plan-then-apply for anything hard to reverse.

## 🗺️ STATE AT END OF LAST SESSION
- HEAD = `<SHA>` "<message>". Prior: `<SHA>`, `<SHA>`.
- `<key files>` are <committed/clean | intentionally dirty>.
- Open follow-ups: <ledger IDs still open>.

## 🧭 Rehydrate (absolute paths)
1. Memory ledger: `<path>`
2. Master plan: `<path>`
3. Registry / ID map: `<path>`
4. This unit's sources: `<spec + impl paths>`
5. Findings ledger: `<path>`

## 🛑 STOP CONDITIONS
- <unit> done + verified → record + commit → STOP, ✋ checkpoint, then <next unit>.
- Any <new gap / irreversible decision> → STOP + AskUserQuestion. Do NOT improvise.
