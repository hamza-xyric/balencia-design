#!/usr/bin/env bash
# verify-asc-state.sh — read-only App Store Connect state check via a locally
# signed ES256 JWT (BIOS-004 amendment A3). eas-cli has no submissions-list
# command (memory/reference_asc-testflight-verification.md), so build/processing
# state is verified against the ASC API directly.
#
# Usage:
#   ./scripts/verify-asc-state.sh builds   # recent builds + processingState (default)
#   ./scripts/verify-asc-state.sh groups   # beta groups for the app
#
# Credentials: key path / key id / issuer id / app id are read from
# yhealth-app/mobile/eas.json (submit.production.ios). The .p8 key and the JWT
# are NEVER printed. Read-only: only GET requests.

set -euo pipefail

MODE="${1:-builds}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MOBILE_DIR="$(cd "$SCRIPT_DIR/../yhealth-app/mobile" && pwd)"
EAS_JSON="$MOBILE_DIR/eas.json"

if [[ ! -f "$EAS_JSON" ]]; then
  echo "ERROR: $EAS_JSON not found" >&2
  exit 1
fi

read_ios_key() {
  python3 -c "import json,sys;print(json.load(open(sys.argv[1]))['submit']['production']['ios'][sys.argv[2]])" "$EAS_JSON" "$1"
}

KEY_ID="$(read_ios_key ascApiKeyId)"
ISSUER_ID="$(read_ios_key ascApiKeyIssuerId)"
APP_ID="$(read_ios_key ascAppId)"
KEY_REL="$(read_ios_key ascApiKeyPath)"
KEY_PATH="$MOBILE_DIR/${KEY_REL#./}"

if [[ ! -f "$KEY_PATH" ]]; then
  echo "ERROR: ASC API key file missing at $KEY_PATH (shape check only — value never read into logs)" >&2
  exit 1
fi

b64url() { openssl base64 -A | tr '+/' '-_' | tr -d '='; }

HEADER="$(printf '{"alg":"ES256","kid":"%s","typ":"JWT"}' "$KEY_ID" | b64url)"
NOW="$(date +%s)"
EXP=$((NOW + 1200)) # ASC max 20 min
PAYLOAD="$(printf '{"iss":"%s","iat":%d,"exp":%d,"aud":"appstoreconnect-v1"}' "$ISSUER_ID" "$NOW" "$EXP" | b64url)"

# ES256 JWT signatures are raw r||s (64 bytes), openssl emits DER — convert.
SIG="$(printf '%s.%s' "$HEADER" "$PAYLOAD" \
  | openssl dgst -sha256 -sign "$KEY_PATH" -binary \
  | python3 -c '
import sys, base64
der = sys.stdin.buffer.read()
assert der[0] == 0x30, "not a DER sequence"
i = 2 + ((der[1] & 0x7F) if der[1] >= 0x80 else 0)
vals = []
for _ in range(2):
    assert der[i] == 0x02, "expected DER integer"
    ln = der[i + 1]
    vals.append(int.from_bytes(der[i + 2:i + 2 + ln], "big"))
    i += 2 + ln
raw = vals[0].to_bytes(32, "big") + vals[1].to_bytes(32, "big")
print(base64.urlsafe_b64encode(raw).rstrip(b"=").decode())
')"

TOKEN="$HEADER.$PAYLOAD.$SIG"
API="https://api.appstoreconnect.apple.com"

asc_get() {
  curl -sS -H "Authorization: Bearer $TOKEN" "$API$1"
}

case "$MODE" in
  builds)
    asc_get "/v1/builds?filter%5Bapp%5D=$APP_ID&sort=-uploadedDate&limit=6" | python3 -c '
import json, sys
d = json.load(sys.stdin)
if "errors" in d:
    for e in d["errors"]:
        print("ASC ERROR:", e.get("status"), e.get("title"), e.get("detail"))
    sys.exit(1)
rows = d.get("data", [])
if not rows:
    print("no builds found")
for b in rows:
    a = b["attributes"]
    print("build %s  processingState=%s  uploaded=%s  expired=%s" % (a.get("version"), a.get("processingState"), a.get("uploadedDate"), a.get("expired")))
'
    ;;
  groups)
    asc_get "/v1/betaGroups?filter%5Bapp%5D=$APP_ID" | python3 -c '
import json, sys
d = json.load(sys.stdin)
if "errors" in d:
    for e in d["errors"]:
        print("ASC ERROR:", e.get("status"), e.get("title"), e.get("detail"))
    sys.exit(1)
for g in d.get("data", []):
    a = g["attributes"]
    print("group %r  internal=%s  publicLink=%s" % (a.get("name"), a.get("isInternalGroup"), bool(a.get("publicLink"))))
'
    ;;
  *)
    echo "usage: $0 [builds|groups]" >&2
    exit 2
    ;;
esac
