#!/usr/bin/env bash
# Competitor store-listing screenshot harvester (v2).
# - App Store: official iOS screenshots (PurpleSource/Features dirs), retried.
# - Google Play: the app's OWN carousel only — keep first N portrait shots in
#   DOM order (Play pages also embed *recommended* apps' screenshots further down).
# Prunes non-screenshots by image dimensions. Re-runnable. macOS (uses `sips`).
set -uo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"
PLAY_MAX=12   # cap Google Play to the app's own carousel

log() { printf '  %s\n' "$*"; }

# curl a store page with retries until we get a sizeable body
fetch_page() {
  local url="$1" body="" try
  for try in 1 2 3 4; do
    body=$(curl -sL --max-time 25 -A "$UA" "$url")
    [ "${#body}" -gt 50000 ] && { printf '%s' "$body"; return 0; }
    sleep 2
  done
  printf '%s' "$body"
}

fetch_appstore() {
  local app="$1" id="$2" slug="$3"
  local out="$ROOT/$app/app-store" src="$ROOT/$app/sources.md"
  log "App Store: $app (id$id)"
  local html; html=$(fetch_page "https://apps.apple.com/us/app/$slug/id$id")
  local urls
  urls=$(printf '%s' "$html" \
    | grep -oE 'https://[a-z0-9.-]*mzstatic\.com/image/thumb/[^"]+\.(png|jpg|jpeg|webp)' \
    | grep -iE 'PurpleSource|Features' \
    | grep -viE 'AppIcon|Placeholder|\.mill' \
    | sed -E 's#(\.(png|jpg|jpeg|webp))/[0-9{][^"]*$#\1#' \
    | awk '!seen[$0]++')          # order-preserving dedup
  local n=0
  while IFS= read -r u; do
    [ -z "$u" ] && continue
    n=$((n+1)); local f; f=$(printf '%02d-%s-appstore.png' "$n" "$app")
    curl -s --max-time 30 -A "$UA" "$u/1290x2796bb.png" -o "$out/$f"
    printf -- '- `%s` — %s\n' "app-store/$f" "$u" >> "$src"
  done <<< "$urls"
  log "  downloaded $n candidate(s)"
}

fetch_play() {
  local app="$1" pkg="$2"
  [ "$pkg" = "-" ] && return 0
  local out="$ROOT/$app/google-play" src="$ROOT/$app/sources.md"
  log "Google Play: $app ($pkg)"
  local html; html=$(fetch_page "https://play.google.com/store/apps/details?id=$pkg&hl=en_US&gl=US")
  # DOM-order, deduped; take only the first PLAY_MAX (the app's own carousel)
  local urls
  urls=$(printf '%s' "$html" \
    | grep -oE 'https://play-lh\.googleusercontent\.com/[A-Za-z0-9_-]+' \
    | awk '!seen[$0]++' | head -n "$PLAY_MAX")
  local n=0
  while IFS= read -r u; do
    [ -z "$u" ] && continue
    n=$((n+1)); local f; f=$(printf '%02d-%s-googleplay.png' "$n" "$app")
    curl -s --max-time 30 -A "$UA" "$u=w1080" -o "$out/$f"
    printf -- '- `%s` — %s\n' "google-play/$f" "$u" >> "$src"
  done <<< "$urls"
  log "  downloaded $n candidate(s)"
}

# Keep only portrait phone screenshots (h>w & h>=1200); drop icons/feature graphics/junk.
prune() {
  local dir="$1"; [ -d "$dir" ] || return 0
  for f in "$dir"/*.png; do
    [ -e "$f" ] || continue
    if ! sips -g pixelWidth -g pixelHeight "$f" >/dev/null 2>&1; then
      log "  drop(not-img): $(basename "$f")"; rm -f "$f"; continue
    fi
    local w h
    w=$(sips -g pixelWidth "$f" 2>/dev/null | awk '/pixelWidth/{print $2}')
    h=$(sips -g pixelHeight "$f" 2>/dev/null | awk '/pixelHeight/{print $2}')
    case "$w$h" in ''|*[!0-9]*) log "  drop(bad-dims): $(basename "$f")"; rm -f "$f"; continue;; esac
    if [ "$h" -lt 1200 ] || [ "$h" -le "$w" ]; then
      log "  drop ${w}x${h}: $(basename "$f")"; rm -f "$f"
    fi
  done
}

# app | appstore_id | appstore_slug | play_pkg   ("-" = none)
APPS=(
  "whoop|933944389|whoop|com.whoop.android"
  "oura|1043837948|oura-ring|com.ouraring.oura"
  "garmin|583446403|garmin-connect|com.garmin.android.apps.connectmobile"
  "bevel|6456176249|bevel-ai-health-coach|-"
  "apple-health|1242545199|apple-health|-"
)

# allow running a single app:  ./_download.sh oura
ONLY="${1:-}"
for row in "${APPS[@]}"; do
  IFS='|' read -r app id slug pkg <<< "$row"
  [ -n "$ONLY" ] && [ "$ONLY" != "$app" ] && continue
  echo "=== $app ==="
  : > "$ROOT/$app/sources.md"
  printf '# %s — official store screenshot sources\n\n' "$app" >> "$ROOT/$app/sources.md"
  fetch_appstore "$app" "$id" "$slug"
  fetch_play "$app" "$pkg"
  prune "$ROOT/$app/app-store"
  prune "$ROOT/$app/google-play"
done
echo "=== DONE ==="
