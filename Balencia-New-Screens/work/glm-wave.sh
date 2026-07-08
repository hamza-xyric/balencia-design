#!/bin/bash
# GLM wave driver: runs glm-stage.sh for a list of screens with bounded parallelism.
# usage: glm-wave.sh <wave-name> <parallelism> <<'EOF'
# id|srcPrefix-or-NEW:focus|outName|batch
# ...
# EOF
set -u
NS="/Users/hamza/Desktop/balencia-design/Balencia-New-Screens"
WAVE="$1"; PAR="$2"
echo "=== wave $WAVE start ===" >> "$NS/work/glm-status.log"
while IFS='|' read -r id src out batch; do
  [ -z "$id" ] && continue
  printf '%s\0%s\0%s\0%s\0' "$id" "$src" "$out" "$batch"
done | xargs -0 -n4 -P "$PAR" "$NS/work/glm-stage.sh"
echo "=== wave $WAVE done ===" >> "$NS/work/glm-status.log"
echo "WAVE_DONE $WAVE"
