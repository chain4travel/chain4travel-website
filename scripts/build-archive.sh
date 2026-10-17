#!/usr/bin/env bash
# Full archive build for chain4travel.com:
#   1. builds this Eleventy site into _site/ with the network blocked
#   2. builds the `archive` branch of chain4travel/decode-travel-website
#      (Astro, configured with base: '/decode-travel') and copies its dist/
#      into _site/decode-travel/
#
# Usage:  bash scripts/build-archive.sh        (or: npm run build:archive)
#
# Environment overrides:
#   DECODE_REPO   git URL of the Decode Travel site
#                 (default https://github.com/chain4travel/decode-travel-website.git)
#   DECODE_REF    branch/tag to build (default: archive)
#   DECODE_DIST   path to an already-built Decode dist/ folder: skips clone + build
#   SKIP_DECODE=1 build only chain4travel.com (links to /decode-travel/ will 404)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

DECODE_REPO="${DECODE_REPO:-https://github.com/chain4travel/decode-travel-website.git}"
DECODE_REF="${DECODE_REF:-archive}"
WORK="$ROOT/.cache/decode-travel-website"
OUT="$ROOT/_site/decode-travel"

echo "==> [1/2] chain4travel.com (offline build)"
[ -d node_modules ] || npm ci --no-audit --no-fund
rm -rf _site
npm run build:offline

if [ "${SKIP_DECODE:-0}" = "1" ]; then
  echo "==> [2/2] SKIP_DECODE=1: /decode-travel/ not included"
  exit 0
fi

echo "==> [2/2] Decode Travel archive -> _site/decode-travel/"
if [ -n "${DECODE_DIST:-}" ]; then
  DIST="$DECODE_DIST"
else
  if ! git ls-remote --exit-code --heads "$DECODE_REPO" "$DECODE_REF" >/dev/null 2>&1; then
    echo "ERROR: branch '$DECODE_REF' not found in $DECODE_REPO." >&2
    echo "       Set DECODE_REF / DECODE_DIST, or SKIP_DECODE=1 to build without it." >&2
    exit 1
  fi
  rm -rf "$WORK"
  git clone --depth 1 --branch "$DECODE_REF" "$DECODE_REPO" "$WORK"
  (cd "$WORK" && npm ci --no-audit --no-fund && npm run build)
  DIST="$WORK/dist"
fi

[ -f "$DIST/index.html" ] || { echo "ERROR: $DIST/index.html missing" >&2; exit 1; }
rm -rf "$OUT"
mkdir -p "$OUT"
cp -R "$DIST"/. "$OUT"/
echo "==> done: $(find "$OUT" -type f | wc -l | tr -d ' ') files in _site/decode-travel/"
