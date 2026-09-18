#!/usr/bin/env bash
#
# visitor-countries.sh — count unique visitor IPs per country from web server access logs.
#
# Usage:
#   ./visitor-countries.sh [log_glob] [mmdb_path]
#
# Examples:
#   ./visitor-countries.sh
#   ./visitor-countries.sh "/var/log/nginx/access.log*"
#   ./visitor-countries.sh "/var/log/nginx/access.log*" /usr/share/GeoIP/GeoLite2-Country.mmdb
#
# Country lookup method (auto-detected):
#   1) Local MaxMind GeoLite2-Country.mmdb via `mmdblookup` if available — fast, no rate
#      limits, nothing leaves the server. Install with:
#        sudo apt install -y mmdb-bin
#        # then download GeoLite2-Country.mmdb from a free MaxMind account
#        # https://dev.maxmind.com/geoip/geolite2-free-geolocation-data
#   2) Falls back to the free ip-api.com batch endpoint (no signup needed, but it does
#      send the visitor IPs to a third party for lookup, and is rate-limited).
#
set -euo pipefail

LOG_GLOB="${1:-}"
MMDB_PATH="${2:-}"

# ---- 1. locate log files -----------------------------------------------
if [[ -z "$LOG_GLOB" ]]; then
  CANDIDATES=(
    "/var/log/nginx/access.log*"
    "/var/log/apache2/access.log*"
    "/var/log/httpd/access_log*"
  )
  for c in "${CANDIDATES[@]}"; do
    # shellcheck disable=SC2086
    if compgen -G "$c" > /dev/null 2>&1; then
      LOG_GLOB="$c"
      break
    fi
  done
  if [[ -z "$LOG_GLOB" ]]; then
    echo "Could not auto-detect an access log. Pass the path/glob explicitly, e.g.:" >&2
    echo "  $0 \"/var/log/nginx/access.log*\"" >&2
    exit 1
  fi
fi

echo "Log source: $LOG_GLOB" >&2

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

# ---- 2. extract unique, public IPs --------------------------------------
# NOTE: this assumes the log's first field is the real client IP (nginx/apache default
# "combined" format). If the site sits behind Cloudflare or another proxy/CDN, the first
# field will be the proxy's IP instead — check with `sudo tail -5 <logfile>` and, if
# needed, adjust the log format to record $http_x_forwarded_for / CF-Connecting-IP and
# change the awk field below accordingly.
shopt -s nullglob
FILES=($LOG_GLOB)
if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No files matched: $LOG_GLOB" >&2
  exit 1
fi

: > "$TMP_DIR/ips.txt"
for f in "${FILES[@]}"; do
  if [[ "$f" == *.gz ]]; then
    zcat -f "$f"
  else
    cat "$f"
  fi
done | awk '{print $1}' \
  | grep -E '^([0-9]{1,3}\.){3}[0-9]{1,3}$|^[0-9a-fA-F:]+$' \
  | grep -vE '^(127\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.|0\.0\.0\.0$|::1$|fe80:)' \
  | sort -u > "$TMP_DIR/ips.txt"

TOTAL_IPS=$(wc -l < "$TMP_DIR/ips.txt")
echo "Unique public IPs found: $TOTAL_IPS" >&2

if [[ "$TOTAL_IPS" -eq 0 ]]; then
  echo "Nothing to look up, exiting." >&2
  exit 0
fi

# ---- 3. resolve IP -> country --------------------------------------------
: > "$TMP_DIR/ip_country.tsv"

if [[ -z "$MMDB_PATH" ]]; then
  for candidate in /usr/share/GeoIP/GeoLite2-Country.mmdb /var/lib/GeoIP/GeoLite2-Country.mmdb; do
    [[ -f "$candidate" ]] && MMDB_PATH="$candidate" && break
  done
fi

if command -v mmdblookup >/dev/null 2>&1 && [[ -n "$MMDB_PATH" && -f "$MMDB_PATH" ]]; then
  echo "Using local MaxMind DB: $MMDB_PATH" >&2
  while IFS= read -r ip; do
    country=$(mmdblookup --file "$MMDB_PATH" --ip "$ip" country names en 2>/dev/null \
      | sed -n 's/.*"\(.*\)".*/\1/p')
    [[ -z "$country" ]] && country="Unknown"
    printf '%s\t%s\n' "$ip" "$country" >> "$TMP_DIR/ip_country.tsv"
  done < "$TMP_DIR/ips.txt"
else
  echo "No local MaxMind DB found — falling back to ip-api.com (sends IPs to a third party)." >&2
  command -v curl >/dev/null 2>&1 || { echo "curl is required for the API fallback." >&2; exit 1; }
  command -v python3 >/dev/null 2>&1 || { echo "python3 is required for the API fallback." >&2; exit 1; }

  split -l 100 "$TMP_DIR/ips.txt" "$TMP_DIR/batch_"
  : > "$TMP_DIR/api_raw.txt"
  for batch in "$TMP_DIR"/batch_*; do
    json=$(python3 -c "
import json
with open('$batch') as f:
    print(json.dumps([l.strip() for l in f if l.strip()]))
")
    curl -s -X POST "http://ip-api.com/batch?fields=status,country,query" \
      -H "Content-Type: application/json" -d "$json" >> "$TMP_DIR/api_raw.txt"
    echo >> "$TMP_DIR/api_raw.txt"
    sleep 2   # stay well under ip-api.com's free-tier rate limit
  done

  python3 - "$TMP_DIR/api_raw.txt" "$TMP_DIR/ip_country.tsv" <<'PYEOF'
import json, sys

src, dst = sys.argv[1], sys.argv[2]
with open(src) as f:
    content = f.read().strip()

decoder = json.JSONDecoder()
idx = 0
rows = []
while idx < len(content):
    chunk = content[idx:].lstrip()
    if not chunk:
        break
    obj, end = decoder.raw_decode(chunk)
    idx += (len(content[idx:]) - len(chunk)) + end
    for entry in obj:
        ip = entry.get("query", "")
        country = entry.get("country") if entry.get("status") == "success" else "Unknown"
        rows.append((ip, country or "Unknown"))

with open(dst, "w") as f:
    for ip, country in rows:
        f.write(f"{ip}\t{country}\n")
PYEOF
fi

# ---- 4. aggregate + report -------------------------------------------------
echo
echo "Unique visitors by country"
echo "-----------------------------------"
cut -f2 "$TMP_DIR/ip_country.tsv" | sort | uniq -c | sort -rn | awk '{count=$1; $1=""; printf "%-30s %s\n", substr($0,2), count}'
echo "-----------------------------------"
echo "Total unique IPs: $TOTAL_IPS"

cp "$TMP_DIR/ip_country.tsv" "./ip_country_$(date +%Y%m%d_%H%M%S).tsv" 2>/dev/null || true
