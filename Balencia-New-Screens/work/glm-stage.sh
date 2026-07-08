#!/bin/bash
# GLM stage runner — brief + draft for ONE screen. Called by glm-wave.sh.
# usage: glm-stage.sh <id> <srcPrefix|NEW:focus> <outName> <batch>
# Writes work/briefs/<id>.md and work/drafts/<id>.md; appends status to work/glm-status.log
set -u
ROOT="/Users/hamza/Desktop/balencia-design"
NS="$ROOT/Balencia-New-Screens"
ID="$1"; SRC="$2"; OUT="$3"; BATCH="$4"
LOG="$NS/work/glm-status.log"
cd "$ROOT"

brief() {
  {
    cat "$NS/work/prompts/brief-instr.txt"
    if [[ "$SRC" == NEW:* ]]; then
      echo ""
      echo "THIS IS A NEW SCREEN with no legacy spec. Screen: $OUT. Build the functional brief ONLY for the feature '${SRC#NEW:}' using the live-app inventory documents that follow. Infer sensible mobile IA from the web feature; note inferences as such."
      echo ""
      cat "$ROOT/Archive/2026-07-06/features.md" "$ROOT/Archive/2026-07-06/design-context-overview.md"
    else
      echo ""
      cat "$ROOT/app_design 3/$SRC"*.md 2>/dev/null
      cat "$ROOT/ascii_wireframes/$ID-"*.md 2>/dev/null
    fi
  } | ./scripts/glm-worker.sh -t 9000 > "$NS/work/briefs/$ID.md" 2>>"$LOG"
}

draft() {
  {
    sed -e "s/{{ID}}/$ID/g" -e "s/{{OUT}}/$OUT/g" -e "s/{{BATCH}}/$BATCH/g" "$NS/work/prompts/draft-instr.txt"
    echo ""
    cat "$NS/canon/COMPACT-CANON.md" "$NS/canon/COMPONENT-CATALOG.md" "$NS/work/briefs/$ID.md"
  } | ./scripts/glm-worker.sh -t 15000 > "$NS/work/drafts/$ID.md" 2>>"$LOG"
}

for attempt in 1 2; do
  brief
  B=$(wc -c < "$NS/work/briefs/$ID.md" | tr -d ' ')
  [ "$B" -ge 2500 ] && break
  echo "$ID brief thin ($B) attempt $attempt" >> "$LOG"
done
if [ "$B" -lt 2500 ]; then echo "$ID BRIEF_FAIL $B" >> "$LOG"; echo "$ID BRIEF_FAIL"; exit 1; fi

for attempt in 1 2; do
  draft
  D=$(wc -c < "$NS/work/drafts/$ID.md" | tr -d ' ')
  [ "$D" -ge 6000 ] && break
  echo "$ID draft thin ($D) attempt $attempt" >> "$LOG"
done
if [ "$D" -lt 6000 ]; then echo "$ID DRAFT_FAIL brief=$B draft=$D" >> "$LOG"; echo "$ID DRAFT_FAIL"; exit 1; fi

echo "$ID OK brief=$B draft=$D" >> "$LOG"
echo "$ID OK brief=$B draft=$D"
